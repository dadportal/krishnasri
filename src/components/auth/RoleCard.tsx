import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoleCardProps {
  role: string;
  icon: LucideIcon;
  description: string;
  responsibilities: string[];
  color: string;
  gradient: string;
  isSelected?: boolean;
  onClick?: () => void;
  delay?: number;
  profileImage?: string;
}

export function RoleCard({
  role,
  icon: Icon,
  description,
  responsibilities,
  color,
  gradient,
  isSelected,
  onClick,
  delay = 0,
  profileImage,
}: RoleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.2, 0, 0, 1],
      }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.25 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative group cursor-pointer overflow-hidden rounded-xl",
        "glass border transition-all duration-300",
        isSelected 
          ? "border-primary shadow-lg ring-2 ring-primary/30" 
          : "border-border/50 hover:border-primary/40"
      )}
    >
      {/* Animated gradient background */}
      <motion.div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          `bg-gradient-to-br ${gradient}`
        )}
        style={{ opacity: isSelected ? 0.15 : undefined }}
      />

      {/* Glow effect */}
      <motion.div
        className={cn(
          "absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          "blur-xl"
        )}
        style={{ background: `linear-gradient(135deg, ${color}40, transparent)` }}
      />

      <div className="relative p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
            className={cn(
              "p-3 rounded-xl",
              `bg-gradient-to-br ${gradient}`
            )}
          >
            <Icon className="w-6 h-6 text-primary-foreground" />
          </motion.div>

          {profileImage && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 0.2, type: "spring" }}
              className="relative"
            >
              <div className={cn(
                "absolute inset-0 rounded-full blur-md opacity-60",
                `bg-gradient-to-br ${gradient}`
              )} />
              <img
                src={profileImage}
                alt={role}
                className="relative w-10 h-10 rounded-full object-cover border-2 border-background"
              />
            </motion.div>
          )}
        </div>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.1 }}
          className="font-display text-lg font-semibold mb-1"
        >
          {role}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.15 }}
          className="text-sm text-muted-foreground mb-4"
        >
          {description}
        </motion.p>

        {/* Responsibilities */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.2 }}
          className="space-y-2"
        >
          <p className="text-xs font-medium text-foreground/70 uppercase tracking-wider">
            Responsibilities
          </p>
          <ul className="space-y-1.5">
            {responsibilities.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: delay + 0.25 + index * 0.05 }}
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <motion.span
                  className={cn("w-1.5 h-1.5 rounded-full", `bg-gradient-to-br ${gradient}`)}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                />
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Selection indicator */}
        {isSelected && (
          <motion.div
            layoutId="selection-indicator"
            className="absolute top-3 right-3 w-3 h-3 rounded-full bg-primary"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-primary"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
