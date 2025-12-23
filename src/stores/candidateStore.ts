import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Candidate {
  id: string;
  name: string;
  role: string;
  location: string;
  experience: string;
  education: string;
  matchScore: number;
  skills: string[];
  status: 'new' | 'shortlisted' | 'interviewed' | 'rejected' | 'hired';
  email?: string;
  phone?: string;
  resumeUrl?: string;
  appliedAt: string;
  notes?: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  applicants: number;
  posted: string;
  status: 'active' | 'paused' | 'closed';
  description?: string;
  requirements?: string[];
  salary?: { min: number; max: number };
}

interface CandidateState {
  candidates: Candidate[];
  jobs: Job[];
  selectedJobId: string | null;
  isLoading: boolean;
  
  // Candidate actions
  addCandidate: (candidate: Omit<Candidate, 'id' | 'appliedAt'>) => void;
  updateCandidate: (id: string, updates: Partial<Candidate>) => void;
  deleteCandidate: (id: string) => void;
  updateCandidateStatus: (id: string, status: Candidate['status']) => void;
  
  // Job actions
  addJob: (job: Omit<Job, 'id' | 'applicants' | 'posted'>) => void;
  updateJob: (id: string, updates: Partial<Job>) => void;
  deleteJob: (id: string) => void;
  setSelectedJob: (id: string | null) => void;
  
  // Getters
  getCandidatesByJob: (jobId: string) => Candidate[];
  getTopCandidates: (limit?: number) => Candidate[];
}

const generateId = () => Math.random().toString(36).substring(2, 11);

// Initial mock data
const initialCandidates: Candidate[] = [
  {
    id: 'cand_1',
    name: 'Sarah Chen',
    role: 'Senior ML Engineer',
    location: 'San Francisco, CA',
    experience: '7 years',
    education: 'M.S. Computer Science',
    matchScore: 94,
    skills: ['Python', 'TensorFlow', 'PyTorch', 'AWS', 'Kubernetes'],
    status: 'shortlisted',
    email: 'sarah.chen@email.com',
    phone: '+1 (415) 555-0123',
    appliedAt: '2024-01-10T09:30:00Z',
  },
  {
    id: 'cand_2',
    name: 'Marcus Johnson',
    role: 'Full Stack Developer',
    location: 'New York, NY',
    experience: '5 years',
    education: 'B.S. Software Engineering',
    matchScore: 87,
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
    status: 'new',
    email: 'marcus.j@email.com',
    appliedAt: '2024-01-12T14:15:00Z',
  },
  {
    id: 'cand_3',
    name: 'Emily Rodriguez',
    role: 'Data Scientist',
    location: 'Austin, TX',
    experience: '4 years',
    education: 'Ph.D. Statistics',
    matchScore: 82,
    skills: ['Python', 'R', 'SQL', 'Machine Learning'],
    status: 'interviewed',
    email: 'emily.r@email.com',
    appliedAt: '2024-01-08T11:00:00Z',
  },
  {
    id: 'cand_4',
    name: 'David Kim',
    role: 'DevOps Engineer',
    location: 'Seattle, WA',
    experience: '6 years',
    education: 'B.S. Computer Science',
    matchScore: 76,
    skills: ['Docker', 'Kubernetes', 'Terraform', 'AWS'],
    status: 'new',
    email: 'david.kim@email.com',
    appliedAt: '2024-01-14T16:45:00Z',
  },
  {
    id: 'cand_5',
    name: 'Lisa Thompson',
    role: 'Product Manager',
    location: 'Boston, MA',
    experience: '8 years',
    education: 'MBA',
    matchScore: 71,
    skills: ['Agile', 'Jira', 'Roadmapping', 'Analytics'],
    status: 'new',
    email: 'lisa.t@email.com',
    appliedAt: '2024-01-15T10:20:00Z',
  },
];

const initialJobs: Job[] = [
  {
    id: 'job_1',
    title: 'Senior ML Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'full-time',
    applicants: 127,
    posted: '2024-01-10',
    status: 'active',
    description: 'Lead ML initiatives and build production-ready models.',
    requirements: ['5+ years experience', 'Python', 'TensorFlow/PyTorch'],
    salary: { min: 180000, max: 250000 },
  },
  {
    id: 'job_2',
    title: 'Full Stack Developer',
    department: 'Product',
    location: 'Remote',
    type: 'full-time',
    applicants: 89,
    posted: '2024-01-08',
    status: 'active',
    description: 'Build and maintain web applications.',
    requirements: ['3+ years experience', 'React', 'Node.js'],
    salary: { min: 120000, max: 180000 },
  },
  {
    id: 'job_3',
    title: 'Data Scientist',
    department: 'Analytics',
    location: 'New York, NY',
    type: 'full-time',
    applicants: 64,
    posted: '2024-01-05',
    status: 'active',
    description: 'Analyze data and build predictive models.',
    requirements: ['Ph.D. preferred', 'Python', 'SQL'],
    salary: { min: 140000, max: 200000 },
  },
  {
    id: 'job_4',
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    location: 'Seattle, WA',
    type: 'full-time',
    applicants: 42,
    posted: '2024-01-12',
    status: 'paused',
    description: 'Manage cloud infrastructure and CI/CD pipelines.',
    requirements: ['4+ years experience', 'AWS/GCP', 'Kubernetes'],
    salary: { min: 130000, max: 190000 },
  },
];

export const useCandidateStore = create<CandidateState>()(
  persist(
    (set, get) => ({
      candidates: initialCandidates,
      jobs: initialJobs,
      selectedJobId: 'job_1',
      isLoading: false,

      addCandidate: (candidate) => {
        const newCandidate: Candidate = {
          ...candidate,
          id: 'cand_' + generateId(),
          appliedAt: new Date().toISOString(),
        };
        
        set((state) => ({
          candidates: [newCandidate, ...state.candidates],
        }));
      },

      updateCandidate: (id, updates) => {
        set((state) => ({
          candidates: state.candidates.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        }));
      },

      deleteCandidate: (id) => {
        set((state) => ({
          candidates: state.candidates.filter((c) => c.id !== id),
        }));
      },

      updateCandidateStatus: (id, status) => {
        set((state) => ({
          candidates: state.candidates.map((c) =>
            c.id === id ? { ...c, status } : c
          ),
        }));
      },

      addJob: (job) => {
        const newJob: Job = {
          ...job,
          id: 'job_' + generateId(),
          applicants: 0,
          posted: new Date().toISOString().split('T')[0],
        };
        
        set((state) => ({
          jobs: [newJob, ...state.jobs],
        }));
      },

      updateJob: (id, updates) => {
        set((state) => ({
          jobs: state.jobs.map((j) =>
            j.id === id ? { ...j, ...updates } : j
          ),
        }));
      },

      deleteJob: (id) => {
        set((state) => ({
          jobs: state.jobs.filter((j) => j.id !== id),
        }));
      },

      setSelectedJob: (id) => set({ selectedJobId: id }),

      getCandidatesByJob: (jobId) => {
        const { candidates, jobs } = get();
        const job = jobs.find((j) => j.id === jobId);
        if (!job) return [];
        
        // Match candidates by role similarity
        return candidates.filter((c) =>
          c.role.toLowerCase().includes(job.title.toLowerCase().split(' ')[0])
        );
      },

      getTopCandidates: (limit = 5) => {
        const { candidates } = get();
        return [...candidates]
          .sort((a, b) => b.matchScore - a.matchScore)
          .slice(0, limit);
      },
    }),
    {
      name: 'candidate-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
