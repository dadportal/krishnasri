import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Job {
  id: string;
  created_by?: string;
  title: string;
  department?: string;
  location?: string;
  type: string;
  description?: string;
  requirements: string[];
  salary_min?: number;
  salary_max?: number;
  status: 'active' | 'paused' | 'closed';
  applicants_count: number;
  posted_at: string;
  closes_at?: string;
  created_at: string;
  updated_at: string;
}

export function useJobs() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const jobsQuery = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('posted_at', { ascending: false });

      if (error) throw error;
      return data as Job[];
    },
  });

  const createJob = useMutation({
    mutationFn: async (job: Omit<Job, 'id' | 'created_at' | 'updated_at' | 'applicants_count' | 'posted_at'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('jobs')
        .insert({ ...job, created_by: user?.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({ title: 'Job posted successfully' });
    },
    onError: (error) => {
      toast({ title: 'Failed to post job', description: error.message, variant: 'destructive' });
    },
  });

  const updateJob = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Job> & { id: string }) => {
      const { data, error } = await supabase
        .from('jobs')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({ title: 'Job updated' });
    },
    onError: (error) => {
      toast({ title: 'Failed to update job', description: error.message, variant: 'destructive' });
    },
  });

  const deleteJob = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({ title: 'Job deleted' });
    },
    onError: (error) => {
      toast({ title: 'Failed to delete job', description: error.message, variant: 'destructive' });
    },
  });

  return {
    jobs: jobsQuery.data || [],
    isLoading: jobsQuery.isLoading,
    error: jobsQuery.error,
    createJob,
    updateJob,
    deleteJob,
    refetch: jobsQuery.refetch,
  };
}
