import { motion } from "framer-motion";
import { FileText, Search, Loader2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { ResumeUploadZone } from "@/components/dashboard/ResumeUploadZone";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useResumes } from "@/hooks/useResumes";
import { formatDistanceToNow } from "date-fns";

const statusConfig = {
  processing: { color: "bg-warning/20 text-warning", label: "Processing" },
  processed: { color: "bg-success/20 text-success", label: "Processed" },
  failed: { color: "bg-destructive/20 text-destructive", label: "Failed" },
};

export default function Resumes() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { resumes, isLoading, refetch } = useResumes();

  const filteredResumes = resumes.filter(r => 
    r.file_name.toLowerCase().includes(searchTerm.toLowerCase())
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
                  <h1 className="font-display text-3xl font-bold mb-1">Resumes</h1>
                  <p className="text-muted-foreground">
                    Upload and manage candidate resumes with AI parsing
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-1">
                <div className="glass rounded-xl p-6 sticky top-6">
                  <h2 className="font-display font-semibold text-lg mb-4">Upload Resumes</h2>
                  <ResumeUploadZone onUploadComplete={() => refetch()} />
                </div>
              </div>

              <div className="xl:col-span-2">
                <div className="glass rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display font-semibold text-lg">Recent Uploads ({resumes.length})</h2>
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search resumes..." 
                        className="pl-10" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  {isLoading ? (
                    <div className="flex items-center justify-center h-32">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                  ) : filteredResumes.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">No resumes uploaded yet</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredResumes.map((resume, index) => (
                        <motion.div
                          key={resume.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
                        >
                          <div className="p-3 rounded-lg bg-primary/10">
                            <FileText className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{resume.file_name}</p>
                            <p className="text-sm text-muted-foreground truncate">
                              {resume.file_size ? `${(resume.file_size / 1024).toFixed(1)} KB` : 'Unknown size'}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge className={statusConfig[resume.status]?.color || statusConfig.processing.color}>
                              {statusConfig[resume.status]?.label || 'Unknown'}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatDistanceToNow(new Date(resume.created_at), { addSuffix: true })}
                            </p>
                          </div>
                          {resume.match_score && (
                            <div className="text-right">
                              <p className="font-display font-bold text-success">{resume.match_score}%</p>
                              <p className="text-xs text-muted-foreground">Match</p>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
