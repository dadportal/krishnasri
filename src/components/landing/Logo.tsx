import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export function Logo({ size = "md", showText = true, className = "" }: LogoProps) {
  const sizes = {
    sm: { icon: 32, text: "text-lg" },
    md: { icon: 40, text: "text-xl" },
    lg: { icon: 56, text: "text-3xl" },
  };

  const { icon, text } = sizes[size];

  return (
    <motion.div 
      className={`flex items-center gap-2 ${className}`}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg"
        style={{ width: icon, height: icon }}
      >
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          className="w-3/5 h-3/5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round"
            className="text-primary-foreground"
          />
          <path 
            d="M12 8V16M8 12H16" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-primary-foreground"
          />
        </svg>
      </div>
      {showText && (
        <span className={`font-display font-bold ${text}`}>
          <span className="text-foreground">Guide</span>
          <span className="gradient-text">Soft</span>
        </span>
      )}
    </motion.div>
  );
}
