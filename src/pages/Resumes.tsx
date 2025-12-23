import { motion } from "framer-motion";
import { FileText, Search, Filter, Upload } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { UploadZone } from "@/components/dashboard/UploadZone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface Resume {
  id: string;
  candidateName: string;
  fileName: string;
  uploadDate: string;
  status: "processing" | "processed" | "failed";
  matchScore?: number;
  jobTitle?: string;
}

const mockResumes: Resume[] = [
  { id: "1", candidateName: "Sarah Chen", fileName: "sarah_chen_resume.pdf", uploadDate: "2 hours ago", status: "processed", matchScore: 94, jobTitle: "Senior ML Engineer" },
  { id: "2", candidateName: "Marcus Johnson", fileName: "marcus_j_cv.docx", uploadDate: "5 hours ago", status: "processed", matchScore: 87, jobTitle: "Full Stack Developer" },
  { id: "3", candidateName: "Emily Rodriguez", fileName: "emily_rodriguez.pdf", uploadDate: "1 day ago", status: "processed", matchScore: 82, jobTitle: "Data Scientist" },
  { id: "4", candidateName: "New Upload", fileName: "candidate_45.pdf", uploadDate: "Just now", status: "processing" },
  { id: "5", candidateName: "Unknown", fileName: "corrupted_file.pdf", uploadDate: "2 days ago", status: "failed" },
];

const statusConfig = {
  processing: { color: "bg-warning/20 text-warning", label: "Processing" },
  processed: { color: "bg-success/20 text-success", label: "Processed" },
  failed: { color: "bg-destructive/20 text-destructive", label: "Failed" },
};

export default function Resumes() {
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
                  <h1 className="font-display text-3xl font-bold mb-1">Resumes</h1>
                  <p className="text-muted-foreground">
                    Upload and manage candidate resumes
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Upload section */}
              <div className="xl:col-span-1">
                <div className="glass rounded-xl p-6 sticky top-6">
                  <h2 className="font-display font-semibold text-lg mb-4">Upload Resumes</h2>
                  <UploadZone />
                </div>
              </div>

              {/* Resumes list */}
              <div className="xl:col-span-2">
                <div className="glass rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display font-semibold text-lg">Recent Uploads</h2>
                    <div className="relative w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input placeholder="Search resumes..." className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    {mockResumes.map((resume, index) => (
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
                          <p className="font-medium truncate">{resume.candidateName}</p>
                          <p className="text-sm text-muted-foreground truncate">{resume.fileName}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={statusConfig[resume.status].color}>
                            {statusConfig[resume.status].label}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">{resume.uploadDate}</p>
                        </div>
                        {resume.matchScore && (
                          <div className="text-right">
                            <p className="font-display font-bold text-success">{resume.matchScore}%</p>
                            <p className="text-xs text-muted-foreground">{resume.jobTitle}</p>
                          </div>
                        )}
                      </motion.div>
                    ))}
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
