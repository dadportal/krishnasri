import { motion } from "framer-motion";
import logoImg from "@/assets/guidesoft-logo.png";

interface LogoProps {
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: { img: "h-8 w-8", text: "text-lg" },
  md: { img: "h-10 w-10", text: "text-xl" },
  lg: { img: "h-14 w-14", text: "text-2xl" },
};

export function Logo({ showText = true, size = "md", className = "" }: LogoProps) {
  return (
    <motion.div 
      className={`flex items-center gap-2 ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <img 
        src={logoImg} 
        alt="GuideSoft" 
        className={`${sizes[size].img} object-contain`}
      />
      {showText && (
        <span className={`font-display font-bold ${sizes[size].text}`}>
          <span className="text-primary">Guide</span>
          <span className="text-foreground">Soft</span>
        </span>
      )}
    </motion.div>
  );
}
