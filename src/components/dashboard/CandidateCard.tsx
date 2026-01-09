import { motion } from "framer-motion";
import { User, MapPin, Briefcase, GraduationCap, Star, ChevronRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Candidate {
  id: string;
  name: string;
  role: string;
  location: string;
  experience: string;
  education: string;
  matchScore: number;
  skills: string[];
  status: "new" | "shortlisted" | "interviewed" | "rejected" | "hired";
  avatar?: string;
}

interface CandidateCardProps {
  candidate: Candidate;
  index: number;
  onClick?: () => void;
}

const statusColors = {
  new: "bg-primary/20 text-primary border-primary/30",
  shortlisted: "bg-success/20 text-success border-success/30",
  interviewed: "bg-warning/20 text-warning border-warning/30",
  rejected: "bg-destructive/20 text-destructive border-destructive/30",
  hired: "bg-accent/20 text-accent border-accent/30",
};

export function CandidateCard({ candidate, index, onClick }: CandidateCardProps) {
  const scoreColor = candidate.matchScore >= 85 
    ? "text-success" 
    : candidate.matchScore >= 70 
    ? "text-primary" 
    : candidate.matchScore >= 50 
    ? "text-warning" 
    : "text-muted-foreground";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onClick={onClick}
      className="glass rounded-xl p-5 cursor-pointer card-hover group"
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center ring-2 ring-border overflow-hidden">
            {candidate.avatar ? (
              <img src={candidate.avatar} alt={candidate.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-6 h-6 text-muted-foreground" />
            )}
          </div>
          {candidate.matchScore >= 90 && (
            <div className="absolute -top-1 -right-1 p-1 bg-success rounded-full">
              <Sparkles className="w-3 h-3 text-success-foreground" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-display font-semibold text-lg truncate group-hover:text-primary transition-colors">
              {candidate.name}
            </h3>
            <div className={`font-display font-bold text-xl ${scoreColor}`}>
              {candidate.matchScore}%
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">{candidate.role}</p>

          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {candidate.location}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="w-3 h-3" />
              {candidate.experience}
            </span>
            <span className="flex items-center gap-1">
              <GraduationCap className="w-3 h-3" />
              {candidate.education}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {candidate.skills.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs px-2 py-0.5 font-normal">
                  {skill}
                </Badge>
              ))}
              {candidate.skills.length > 3 && (
                <Badge variant="secondary" className="text-xs px-2 py-0.5 font-normal">
                  +{candidate.skills.length - 3}
                </Badge>
              )}
            </div>
            <Badge className={`${statusColors[candidate.status]} border text-xs capitalize`}>
              {candidate.status}
            </Badge>
          </div>
        </div>

        {/* Arrow */}
        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </div>
    </motion.div>
  );
}
