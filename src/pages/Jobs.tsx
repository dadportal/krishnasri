import { motion } from "framer-motion";
import { Briefcase, Search, Filter, Plus, MapPin, Clock, Users, Loader2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useJobs } from "@/hooks/useJobs";
import { AddJobDialog } from "@/components/dialogs/AddJobDialog";
import { formatDistanceToNow } from "date-fns";

const statusColors: Record<string, string> = {
  active: "bg-success/20 text-success",
  paused: "bg-warning/20 text-warning",
  closed: "bg-muted text-muted-foreground",
};

export default function Jobs() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { jobs, isLoading, createJob } = useJobs();

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (job.department?.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (job.location?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
                  <h1 className="font-display text-3xl font-bold mb-1">Jobs</h1>
                  <p className="text-muted-foreground">
                    Manage job postings and requirements
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="gap-2">
                    <Filter className="w-4 h-4" />
                    Filters
                  </Button>
                  <Button className="gap-2" onClick={() => setDialogOpen(true)}>
                    <Plus className="w-4 h-4" />
                    Post New Job
                  </Button>
                </div>
              </div>

              <div className="relative max-w-md mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search jobs..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </motion.div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-display font-semibold text-lg mb-2">No jobs found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery ? "Try adjusting your search" : "Create your first job posting"}
                </p>
                <Button onClick={() => setDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Post New Job
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filteredJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass rounded-xl p-6 card-hover cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-display font-semibold text-lg mb-1">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.department || 'General'}</p>
                      </div>
                      <Badge className={`${statusColors[job.status || 'active'] || statusColors.active} capitalize`}>
                        {job.status || 'active'}
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {job.description || 'No description provided'}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {(job.requirements || []).slice(0, 3).map((req) => (
                        <Badge key={req} variant="secondary" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                      {(job.requirements || []).length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{(job.requirements?.length || 0) - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex gap-4 text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {job.location || 'Remote'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {job.type || 'Full-time'}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-primary">
                        <Users className="w-4 h-4" />
                        <span className="font-semibold">{job.applicants_count || 0}</span>
                      </span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
                      Posted {formatDistanceToNow(new Date(job.posted_at), { addSuffix: true })}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <AddJobDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
