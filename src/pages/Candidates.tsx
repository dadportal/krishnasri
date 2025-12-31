import { motion } from "framer-motion";
import { Users, Search, Filter, Plus, Loader2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { CandidateCard } from "@/components/dashboard/CandidateCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCandidates } from "@/hooks/useCandidates";
import { AddCandidateDialog } from "@/components/dialogs/AddCandidateDialog";

export default function Candidates() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { candidates, isLoading } = useCandidates();

  const filteredCandidates = candidates.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.skills?.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Map DB format to component format
  const mappedCandidates = filteredCandidates.map(c => ({
    id: c.id,
    name: c.name,
    role: c.role || 'Unknown',
    location: c.location || 'Unknown',
    experience: c.experience || 'N/A',
    education: c.education || 'N/A',
    matchScore: c.match_score,
    skills: c.skills || [],
    status: c.status,
  }));

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
                    {candidates.length} candidates in database
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                  </Button>
                  <Button className="gap-2" onClick={() => setShowAddDialog(true)}>
                    <Plus className="w-4 h-4" />
                    Add Candidate
                  </Button>
                </div>
              </div>

              <div className="relative max-w-md mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search candidates by name, skill, or role..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </motion.div>

            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : mappedCandidates.length === 0 ? (
              <div className="text-center py-12 glass rounded-xl">
                <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-display text-lg font-semibold mb-2">No candidates found</h3>
                <p className="text-muted-foreground mb-4">Add your first candidate to get started</p>
                <Button onClick={() => setShowAddDialog(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Candidate
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {mappedCandidates.map((candidate, index) => (
                  <CandidateCard key={candidate.id} candidate={candidate} index={index} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <AddCandidateDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  );
}
