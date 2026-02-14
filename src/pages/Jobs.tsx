import { motion } from "framer-motion";
import { Search, Filter, Plus, MapPin, Clock, Users, Loader2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useJobs } from "@/hooks/useJobs";
import { formatDistanceToNow } from "date-fns";

const statusColors: Record<string, string> = {
  active: "bg-success/20 text-success",
  paused: "bg-warning/20 text-warning",
  closed: "bg-muted text-muted-foreground",
};

export default function Jobs() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { jobs, isLoading } = useJobs();

  const filtered = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      (j.department?.toLowerCase().includes(search.toLowerCase()) ?? false)
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" />
      <div className="flex min-h-screen relative">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 flex flex-col lg:ml-0">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 p-4 lg:p-6 overflow-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="font-display text-3xl font-bold mb-1">Jobs</h1>
                  <p className="text-muted-foreground">Manage job postings and requirements</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="gap-2"><Filter className="w-4 h-4" />Filters</Button>
                  <Button className="gap-2"><Plus className="w-4 h-4" />Post New Job</Button>
                </div>
              </div>
              <div className="relative max-w-md mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search jobs..." className="pl-10" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </motion.div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <p className="text-lg">No jobs found</p>
                <p className="text-sm mt-1">Create a new job posting to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filtered.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass rounded-xl p-6 card-hover cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-display font-semibold text-lg mb-1">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.department || "General"}</p>
                      </div>
                      <Badge className={`${statusColors[job.status || "active"]} capitalize`}>
                        {job.status || "active"}
                      </Badge>
                    </div>
                    {job.description && (
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{job.description}</p>
                    )}
                    {job.requirements && job.requirements.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.requirements.slice(0, 4).map((req) => (
                          <Badge key={req} variant="secondary" className="text-xs">{req}</Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex gap-4 text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />{job.location || "Remote"}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />{job.type || "Full-time"}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-primary">
                        <Users className="w-4 h-4" />
                        <span className="font-semibold">{job.applicants_count || 0}</span>
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
