import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, X, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useResumes } from "@/hooks/useResumes";
import { Progress } from "@/components/ui/progress";

interface ResumeUploadZoneProps {
  jobId?: string;
  onUploadComplete?: () => void;
}

interface UploadingFile {
  file: File;
  progress: number;
  status: 'uploading' | 'processing' | 'complete' | 'error';
  error?: string;
}

export function ResumeUploadZone({ jobId, onUploadComplete }: ResumeUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const { uploadResume } = useResumes();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, []);

  const processFiles = async (files: File[]) => {
    const validFiles = files.filter(
      file => file.type === "application/pdf" || 
              file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
              file.type === "application/msword"
    );

    if (validFiles.length === 0) return;

    // Add files to uploading state
    const newUploadingFiles: UploadingFile[] = validFiles.map(file => ({
      file,
      progress: 0,
      status: 'uploading',
    }));

    setUploadingFiles(prev => [...prev, ...newUploadingFiles]);

    // Upload each file
    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      const fileIndex = uploadingFiles.length + i;

      try {
        // Simulate progress
        const progressInterval = setInterval(() => {
          setUploadingFiles(prev => prev.map((f, idx) => 
            idx === fileIndex ? { ...f, progress: Math.min(f.progress + 10, 90) } : f
          ));
        }, 200);

        await uploadResume.mutateAsync({ file, jobId });

        clearInterval(progressInterval);

        setUploadingFiles(prev => prev.map((f, idx) => 
          idx === fileIndex ? { ...f, progress: 100, status: 'complete' } : f
        ));
      } catch (error) {
        setUploadingFiles(prev => prev.map((f, idx) => 
          idx === fileIndex ? { 
            ...f, 
            status: 'error', 
            error: error instanceof Error ? error.message : 'Upload failed' 
          } : f
        ));
      }
    }

    onUploadComplete?.();

    // Clear completed files after delay
    setTimeout(() => {
      setUploadingFiles(prev => prev.filter(f => f.status === 'uploading' || f.status === 'processing'));
    }, 3000);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  }, [jobId]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
    e.target.value = ''; // Reset input
  }, [jobId]);

  const removeFile = (index: number) => {
    setUploadingFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          isDragging 
            ? "border-primary bg-primary/10 scale-[1.02]" 
            : "border-border hover:border-muted-foreground/50 hover:bg-secondary/30"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept=".pdf,.docx,.doc"
          multiple
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-4">
          <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center transition-colors ${
            isDragging ? "bg-primary/20" : "bg-secondary"
          }`}>
            <Upload className={`w-8 h-8 transition-colors ${
              isDragging ? "text-primary" : "text-muted-foreground"
            }`} />
          </div>
          
          <div>
            <p className="font-display font-semibold text-lg mb-1">
              Drop resumes here
            </p>
            <p className="text-sm text-muted-foreground">
              or click to browse • PDF, DOC, DOCX supported
            </p>
          </div>

          <Button variant="secondary" size="sm" className="pointer-events-none">
            Select Files
          </Button>
        </div>
      </motion.div>

      {/* Uploading files list */}
      <AnimatePresence>
        {uploadingFiles.length > 0 && (
          <div className="space-y-2">
            {uploadingFiles.map((uploadFile, index) => (
              <motion.div
                key={`${uploadFile.file.name}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border"
              >
                <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{uploadFile.file.name}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">
                      {(uploadFile.file.size / 1024).toFixed(1)} KB
                    </p>
                    {uploadFile.status === 'uploading' && (
                      <Progress value={uploadFile.progress} className="h-1 w-20" />
                    )}
                  </div>
                </div>
                
                {uploadFile.status === 'uploading' && (
                  <Loader2 className="w-4 h-4 animate-spin text-primary flex-shrink-0" />
                )}
                {uploadFile.status === 'processing' && (
                  <Loader2 className="w-4 h-4 animate-spin text-warning flex-shrink-0" />
                )}
                {uploadFile.status === 'complete' && (
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                )}
                {uploadFile.status === 'error' && (
                  <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                )}
                
                <button
                  onClick={() => removeFile(index)}
                  className="p-1 rounded hover:bg-destructive/20 transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
