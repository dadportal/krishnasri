import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Candidate {
  id: string;
  user_id?: string;
  name: string;
  email?: string;
  phone?: string;
  location?: string;
  role?: string;
  experience?: string;
  education?: string;
  skills: string[];
  status: 'new' | 'shortlisted' | 'interviewed' | 'hired' | 'rejected';
  match_score: number;
  resume_url?: string;
  resume_parsed?: Record<string, unknown>;
  notes?: string;
  linkedin?: string;
  created_at: string;
  updated_at: string;
}

export function useCandidates() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const candidatesQuery = useQuery({
    queryKey: ['candidates'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('candidates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Candidate[];
    },
  });

  const createCandidate = useMutation({
    mutationFn: async (candidate: Omit<Candidate, 'id' | 'created_at' | 'updated_at' | 'resume_parsed'> & { resume_parsed?: unknown }) => {
      const { data, error } = await supabase
        .from('candidates')
        .insert(candidate as any)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
      toast({ title: 'Candidate added successfully' });
    },
    onError: (error) => {
      toast({ title: 'Failed to add candidate', description: error.message, variant: 'destructive' });
    },
  });

  const updateCandidate = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Omit<Candidate, 'resume_parsed'>> & { id: string; resume_parsed?: unknown }) => {
      const { data, error } = await supabase
        .from('candidates')
        .update(updates as any)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
      toast({ title: 'Candidate updated' });
    },
    onError: (error) => {
      toast({ title: 'Failed to update candidate', description: error.message, variant: 'destructive' });
    },
  });

  const deleteCandidate = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('candidates')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['candidates'] });
      toast({ title: 'Candidate deleted' });
    },
    onError: (error) => {
      toast({ title: 'Failed to delete candidate', description: error.message, variant: 'destructive' });
    },
  });

  return {
    candidates: candidatesQuery.data || [],
    isLoading: candidatesQuery.isLoading,
    error: candidatesQuery.error,
    createCandidate,
    updateCandidate,
    deleteCandidate,
    refetch: candidatesQuery.refetch,
  };
}
