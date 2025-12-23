import { motion } from "framer-motion";
import { Users, Search, Filter, Plus } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { CandidateCard, Candidate } from "@/components/dashboard/CandidateCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

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
  {
    id: "6",
    name: "Alex Rivera",
    role: "Backend Developer",
    location: "Chicago, IL",
    experience: "3 years",
    education: "B.S. Computer Science",
    matchScore: 68,
    skills: ["Go", "PostgreSQL", "Redis", "Docker"],
    status: "rejected",
  },
];

export default function Candidates() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" />
      
      <div className="flex min-h-screen relative">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 flex flex-col lg:ml-0">
          <Header onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1 p-4 lg:p-6 overflow-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="font-display text-3xl font-bold mb-1">Candidates</h1>
                  <p className="text-muted-foreground">
                    Manage and review all candidate applications
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                  </Button>
                  <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Candidate
                  </Button>
                </div>
              </div>

              {/* Search bar */}
              <div className="relative max-w-md mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search candidates by name, skill, or role..." className="pl-10" />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {mockCandidates.map((candidate, index) => (
                <CandidateCard key={candidate.id} candidate={candidate} index={index} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
