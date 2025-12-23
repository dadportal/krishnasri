import { motion } from "framer-motion";

interface MatchScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export function MatchScoreRing({ score, size = 120, strokeWidth = 8, label }: MatchScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (score >= 85) return "stroke-success";
    if (score >= 70) return "stroke-primary";
    if (score >= 50) return "stroke-warning";
    return "stroke-muted-foreground";
  };

  const getGradientId = () => {
    if (score >= 85) return "success-gradient";
    if (score >= 70) return "primary-gradient";
    if (score >= 50) return "warning-gradient";
    return "muted-gradient";
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="success-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--success))" />
            <stop offset="100%" stopColor="hsl(160 84% 50%)" />
          </linearGradient>
          <linearGradient id="primary-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(210 100% 60%)" />
          </linearGradient>
          <linearGradient id="warning-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--warning))" />
            <stop offset="100%" stopColor="hsl(45 100% 60%)" />
          </linearGradient>
          <linearGradient id="muted-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--muted-foreground))" />
            <stop offset="100%" stopColor="hsl(var(--muted))" />
          </linearGradient>
        </defs>
        
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${getGradientId()})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className={`font-display font-bold text-2xl ${getColor().replace("stroke-", "text-")}`}
        >
          {score}%
        </motion.span>
        {label && (
          <span className="text-xs text-muted-foreground mt-1">{label}</span>
        )}
      </div>
    </div>
  );
}
