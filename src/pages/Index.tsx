import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Clock,
  Filter,
  Plus,
  Sparkles,
  ArrowUpRight,
  Target
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { CandidateCard, Candidate } from "@/components/dashboard/CandidateCard";
import { JobCard, Job } from "@/components/dashboard/JobCard";
import { UploadZone } from "@/components/dashboard/UploadZone";
import { MatchScoreRing } from "@/components/dashboard/MatchScoreRing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data
const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Senior ML Engineer",
    location: "San Francisco, CA",
    experience: "7 years",
    education: "M.S. Computer Science",
    matchScore: 94,
    skills: ["Python", "TensorFlow", "PyTorch", "AWS", "Kubernetes"],
    status: "shortlisted",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    role: "Full Stack Developer",
    location: "New York, NY",
    experience: "5 years",
    education: "B.S. Software Engineering",
    matchScore: 87,
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    status: "new",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Data Scientist",
    location: "Austin, TX",
    experience: "4 years",
    education: "Ph.D. Statistics",
    matchScore: 82,
    skills: ["Python", "R", "SQL", "Machine Learning"],
    status: "interviewed",
  },
  {
    id: "4",
    name: "David Kim",
    role: "DevOps Engineer",
    location: "Seattle, WA",
    experience: "6 years",
    education: "B.S. Computer Science",
    matchScore: 76,
    skills: ["Docker", "Kubernetes", "Terraform", "AWS"],
    status: "new",
  },
  {
    id: "5",
    name: "Lisa Thompson",
    role: "Product Manager",
    location: "Boston, MA",
    experience: "8 years",
    education: "MBA",
    matchScore: 71,
    skills: ["Agile", "Jira", "Roadmapping", "Analytics"],
    status: "new",
  },
];

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior ML Engineer",
    department: "Engineering",
    location: "San Francisco, CA",
    type: "Full-time",
    applicants: 127,
    posted: "2 days ago",
    status: "active",
  },
  {
    id: "2",
    title: "Full Stack Developer",
    department: "Product",
    location: "Remote",
    type: "Full-time",
    applicants: 89,
    posted: "5 days ago",
    status: "active",
  },
  {
    id: "3",
    title: "Data Scientist",
    department: "Analytics",
    location: "New York, NY",
    type: "Full-time",
    applicants: 64,
    posted: "1 week ago",
    status: "active",
  },
  {
    id: "4",
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Seattle, WA",
    type: "Full-time",
    applicants: 42,
    posted: "3 days ago",
    status: "paused",
  },
];

export default function Index() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<string>("1");

  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex min-h-screen relative">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main content */}
        <div className="flex-1 flex flex-col lg:ml-0">
          <Header onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1 p-4 lg:p-6 overflow-auto">
            {/* Welcome section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-display text-3xl font-bold mb-1">
                    Welcome back, <span className="gradient-text">Jane</span>
                  </h1>
                  <p className="text-muted-foreground">
                    You have <span className="text-primary font-semibold">24 new candidates</span> to review today
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                  </Button>
                  <Button className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                    <Plus className="w-4 h-4" />
                    New Job
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Stats grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard 
                title="Total Candidates" 
                value="1,284" 
                change="+12% from last week"
                changeType="positive"
                icon={Users}
                delay={0}
              />
              <StatCard 
                title="Active Jobs" 
                value="18" 
                change="3 closing soon"
                changeType="neutral"
                icon={Briefcase}
                delay={100}
              />
              <StatCard 
                title="Avg. Match Score" 
                value="78%" 
                change="+5% improvement"
                changeType="positive"
                icon={Target}
                delay={200}
              />
              <StatCard 
                title="Time to Hire" 
                value="12 days" 
                change="-2 days faster"
                changeType="positive"
                icon={Clock}
                delay={300}
              />
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Left column - Jobs */}
              <div className="xl:col-span-1">
                <div className="glass rounded-xl p-4 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display font-semibold text-lg">Active Jobs</h2>
                    <Badge variant="secondary" className="text-xs">
                      {mockJobs.length} open
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {mockJobs.map((job, index) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        index={index}
                        isSelected={selectedJob === job.id}
                        onClick={() => setSelectedJob(job.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Middle column - Candidates */}
              <div className="xl:col-span-1">
                <div className="glass rounded-xl p-4 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <h2 className="font-display font-semibold text-lg">Top Matches</h2>
                      <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                    </div>
                    <Button variant="ghost" size="sm" className="text-xs gap-1">
                      View all
                      <ArrowUpRight className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {mockCandidates.map((candidate, index) => (
                      <CandidateCard
                        key={candidate.id}
                        candidate={candidate}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column - Upload & Score */}
              <div className="xl:col-span-1 space-y-6">
                {/* Upload zone */}
                <div className="glass rounded-xl p-4">
                  <h2 className="font-display font-semibold text-lg mb-4">Quick Upload</h2>
                  <UploadZone onUpload={(files) => console.log("Uploaded:", files)} />
                </div>

                {/* AI Performance */}
                <div className="glass rounded-xl p-6">
                  <h2 className="font-display font-semibold text-lg mb-6">AI Performance</h2>
                  <div className="flex items-center justify-center gap-8">
                    <MatchScoreRing score={89} label="Accuracy" />
                    <div className="space-y-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">Resumes Processed</p>
                        <p className="font-display font-bold text-2xl">2,847</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Avg. Processing Time</p>
                        <p className="font-display font-bold text-xl">1.2s</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Model Version</p>
                        <Badge variant="secondary">v2.4.1</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="glass rounded-xl p-4">
                  <h2 className="font-display font-semibold text-lg mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="secondary" className="h-auto py-4 flex-col gap-2">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      <span className="text-xs">Analytics</span>
                    </Button>
                    <Button variant="secondary" className="h-auto py-4 flex-col gap-2">
                      <Briefcase className="w-5 h-5 text-primary" />
                      <span className="text-xs">Post Job</span>
                    </Button>
                    <Button variant="secondary" className="h-auto py-4 flex-col gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      <span className="text-xs">Candidates</span>
                    </Button>
                    <Button variant="secondary" className="h-auto py-4 flex-col gap-2">
                      <Sparkles className="w-5 h-5 text-accent" />
                      <span className="text-xs">AI Settings</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
