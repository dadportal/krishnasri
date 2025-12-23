import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, Users, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  applicants: number;
  posted: string;
  status: "active" | "paused" | "closed";
}

interface JobCardProps {
  job: Job;
  index: number;
  isSelected?: boolean;
  onClick?: () => void;
}

const statusColors = {
  active: "bg-success/20 text-success",
  paused: "bg-warning/20 text-warning",
  closed: "bg-muted text-muted-foreground",
};

export function JobCard({ job, index, isSelected, onClick }: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onClick={onClick}
      className={`rounded-lg p-4 cursor-pointer transition-all duration-200 group ${
        isSelected 
          ? "bg-primary/10 border border-primary/30" 
          : "hover:bg-secondary/50 border border-transparent"
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className={`font-display font-semibold truncate transition-colors ${
            isSelected ? "text-primary" : "group-hover:text-primary"
          }`}>
            {job.title}
          </h3>
          <p className="text-sm text-muted-foreground">{job.department}</p>
        </div>
        <Badge className={`${statusColors[job.status]} text-xs capitalize ml-2`}>
          {job.status}
        </Badge>
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {job.location}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {job.type}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-sm">
          <Users className="w-4 h-4 text-primary" />
          <span className="font-medium">{job.applicants}</span>
          <span className="text-muted-foreground">applicants</span>
        </span>
        <span className="text-xs text-muted-foreground">{job.posted}</span>
      </div>
    </motion.div>
  );
}
