import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Code2, Edit3, Eye, ChevronRight, ChevronLeft } from "lucide-react";
import { RoleCard } from "./RoleCard";
import { Button } from "@/components/ui/button";
import krishnaProfile from "@/assets/krishna-sri-profile.png";

const roles = [
  {
    id: "admin",
    role: "Admin",
    icon: Shield,
    description: "Full system access with complete control over all features and users.",
    responsibilities: [
      "Manage all users and roles",
      "Configure system settings",
      "Access audit logs",
      "Deploy and manage infrastructure",
      "Handle billing and subscriptions",
    ],
    color: "hsl(270, 70%, 60%)",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "developer",
    role: "Developer",
    icon: Code2,
    description: "Technical access for building and deploying features.",
    responsibilities: [
      "Create and modify APIs",
      "Deploy edge functions",
      "Access development tools",
      "Review and merge code",
      "Debug and troubleshoot",
    ],
    color: "hsl(210, 100%, 60%)",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: "editor",
    role: "Editor",
    icon: Edit3,
    description: "Content management and data modification capabilities.",
    responsibilities: [
      "Create and edit content",
      "Manage candidate profiles",
      "Update job listings",
      "Review submissions",
      "Generate reports",
    ],
    color: "hsl(38, 92%, 50%)",
    gradient: "from-orange-500 to-yellow-500",
  },
  {
    id: "viewer",
    role: "Viewer",
    icon: Eye,
    description: "Read-only access to view data and analytics.",
    responsibilities: [
      "View dashboards",
      "Access reports",
      "Monitor analytics",
      "Browse candidates",
      "Read documentation",
    ],
    color: "hsl(160, 84%, 39%)",
    gradient: "from-emerald-500 to-teal-500",
  },
];

export function RolesShowcase() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount
  useState(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  });

  const visibleRoles = isMobile ? [roles[currentIndex]] : roles;

  const nextRole = () => {
    setCurrentIndex((prev) => (prev + 1) % roles.length);
  };

  const prevRole = () => {
    setCurrentIndex((prev) => (prev - 1 + roles.length) % roles.length);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h3 className="font-display text-xl font-semibold gradient-text mb-2">
          User Roles & Permissions
        </h3>
        <p className="text-sm text-muted-foreground">
          Select a role to see detailed responsibilities
        </p>
      </motion.div>

      {/* Mobile carousel controls */}
      {isMobile && (
        <div className="flex items-center justify-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevRole}
            className="rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <div className="flex gap-2">
            {roles.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-muted"
                }`}
                animate={{ scale: index === currentIndex ? 1.2 : 1 }}
              />
            ))}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={nextRole}
            className="rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      )}

      {/* Role cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {visibleRoles.map((role, index) => (
            <RoleCard
              key={role.id}
              {...role}
              profileImage={krishnaProfile}
              isSelected={selectedRole === role.id}
              onClick={() => setSelectedRole(
                selectedRole === role.id ? null : role.id
              )}
              delay={index * 0.1}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Selected role details */}
      <AnimatePresence>
        {selectedRole && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="glass rounded-xl p-4 mt-4">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={krishnaProfile}
                  alt="Krishna Sri"
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                />
                <div>
                  <p className="font-medium">Krishna Sri</p>
                  <p className="text-sm text-muted-foreground">
                    {roles.find(r => r.id === selectedRole)?.role} Access
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                D. H. S. Krishna Sri is assigned to this role with full permissions
                to {roles.find(r => r.id === selectedRole)?.description.toLowerCase()}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
