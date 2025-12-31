-- Create candidates table
CREATE TABLE IF NOT EXISTS public.candidates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  location TEXT,
  role TEXT,
  experience TEXT,
  education TEXT,
  skills TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'shortlisted', 'interviewed', 'hired', 'rejected')),
  match_score INTEGER DEFAULT 0,
  resume_url TEXT,
  resume_parsed JSONB,
  notes TEXT,
  linkedin TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create jobs table
CREATE TABLE IF NOT EXISTS public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  department TEXT,
  location TEXT,
  type TEXT DEFAULT 'Full-time',
  description TEXT,
  requirements TEXT[] DEFAULT '{}',
  salary_min INTEGER,
  salary_max INTEGER,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'closed')),
  applicants_count INTEGER DEFAULT 0,
  posted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  closes_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create resumes table for tracking uploads
CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_id UUID REFERENCES public.candidates(id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  status TEXT DEFAULT 'processing' CHECK (status IN ('processing', 'processed', 'failed')),
  parsed_data JSONB,
  match_score INTEGER,
  job_id UUID REFERENCES public.jobs(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

-- Candidates policies
CREATE POLICY "Authenticated users can view candidates"
  ON public.candidates FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create candidates"
  ON public.candidates FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update candidates"
  ON public.candidates FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete candidates"
  ON public.candidates FOR DELETE
  TO authenticated
  USING (true);

-- Jobs policies
CREATE POLICY "Authenticated users can view jobs"
  ON public.jobs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create jobs"
  ON public.jobs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update jobs"
  ON public.jobs FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete jobs"
  ON public.jobs FOR DELETE
  TO authenticated
  USING (true);

-- Resumes policies
CREATE POLICY "Authenticated users can view resumes"
  ON public.resumes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can upload resumes"
  ON public.resumes FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update resumes"
  ON public.resumes FOR UPDATE
  TO authenticated
  USING (true);

-- Create storage bucket for resumes
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'resumes', 
  'resumes', 
  false, 
  10485760,
  ARRAY['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword']
) ON CONFLICT (id) DO NOTHING;

-- Storage policies for resumes bucket
CREATE POLICY "Authenticated users can upload resumes to storage"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Authenticated users can view resumes from storage"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'resumes');

CREATE POLICY "Authenticated users can delete resumes from storage"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'resumes');

-- Update triggers for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER candidates_updated_at
  BEFORE UPDATE ON public.candidates
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER jobs_updated_at
  BEFORE UPDATE ON public.jobs
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER resumes_updated_at
  BEFORE UPDATE ON public.resumes
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();