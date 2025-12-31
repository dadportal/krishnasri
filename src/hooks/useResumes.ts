import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Resume {
  id: string;
  candidate_id?: string;
  uploaded_by?: string;
  file_name: string;
  file_url: string;
  file_size?: number;
  mime_type?: string;
  status: 'processing' | 'processed' | 'failed';
  parsed_data?: Record<string, unknown>;
  match_score?: number;
  job_id?: string;
  created_at: string;
  updated_at: string;
}

export function useResumes() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const resumesQuery = useQuery({
    queryKey: ['resumes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Resume[];
    },
  });

  const uploadResume = useMutation({
    mutationFn: async ({ file, jobId }: { file: File; jobId?: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Upload file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(fileName);

      // Create resume record
      const { data, error } = await supabase
        .from('resumes')
        .insert({
          file_name: file.name,
          file_url: publicUrl,
          file_size: file.size,
          mime_type: file.type,
          uploaded_by: user.id,
          job_id: jobId,
          status: 'processing',
        })
        .select()
        .single();

      if (error) throw error;

      // Trigger AI parsing
      try {
        const response = await supabase.functions.invoke('parse-resume', {
          body: { 
            resumeText: `Resume file: ${file.name}`, // In production, extract text from PDF
            jobDescription: jobId ? 'Job context would be loaded here' : undefined,
          },
        });

        if (response.data?.result) {
          // Update resume with parsed data
          await supabase
            .from('resumes')
            .update({
              status: 'processed',
              parsed_data: response.data.result,
              match_score: response.data.result.matchScore,
            })
            .eq('id', data.id);
        }
      } catch (parseError) {
        console.error('Resume parsing failed:', parseError);
        await supabase
          .from('resumes')
          .update({ status: 'failed' })
          .eq('id', data.id);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      toast({ title: 'Resume uploaded successfully' });
    },
    onError: (error) => {
      toast({ title: 'Failed to upload resume', description: error.message, variant: 'destructive' });
    },
  });

  const deleteResume = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('resumes')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      toast({ title: 'Resume deleted' });
    },
    onError: (error) => {
      toast({ title: 'Failed to delete resume', description: error.message, variant: 'destructive' });
    },
  });

  return {
    resumes: resumesQuery.data || [],
    isLoading: resumesQuery.isLoading,
    error: resumesQuery.error,
    uploadResume,
    deleteResume,
    refetch: resumesQuery.refetch,
  };
}
