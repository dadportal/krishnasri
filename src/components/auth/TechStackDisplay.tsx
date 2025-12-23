import { motion } from "framer-motion";
import { 
  Code2, Database, Shield, Cpu, Cloud, Layers,
  Palette, Zap, Lock, GitBranch, Globe, Terminal
} from "lucide-react";

const techStack = [
  {
    category: "Frontend",
    color: "from-primary to-accent",
    items: [
      { name: "React 18", icon: Code2, description: "Component-based UI" },
      { name: "TypeScript", icon: Terminal, description: "Type-safe code" },
      { name: "Tailwind CSS", icon: Palette, description: "Utility-first styling" },
      { name: "Framer Motion", icon: Zap, description: "Smooth animations" },
    ],
  },
  {
    category: "Backend",
    color: "from-accent to-success",
    items: [
      { name: "Supabase", icon: Database, description: "PostgreSQL database" },
      { name: "Edge Functions", icon: Cloud, description: "Serverless logic" },
      { name: "Auth", icon: Lock, description: "Secure authentication" },
      { name: "Realtime", icon: Globe, description: "Live updates" },
    ],
  },
  {
    category: "Architecture",
    color: "from-success to-warning",
    items: [
      { name: "Zustand", icon: Layers, description: "State management" },
      { name: "RBAC", icon: Shield, description: "Role-based access" },
      { name: "AI/ML", icon: Cpu, description: "Lovable AI integration" },
      { name: "Git", icon: GitBranch, description: "Version control" },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.2, 0, 0, 1] as const,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.2, 0, 0, 1] as const,
    },
  },
};

export function TechStackDisplay() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h3 className="font-display text-xl font-semibold gradient-text mb-2">
          Built with Modern Tech Stack
        </h3>
        <p className="text-muted-foreground text-sm">
          Enterprise-grade tools for production-ready applications
        </p>
      </motion.div>

      {techStack.map((category, categoryIndex) => (
        <motion.div
          key={category.category}
          variants={categoryVariants}
          className="space-y-3"
        >
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <div className={`h-1 w-8 rounded-full bg-gradient-to-r ${category.color}`} />
            <span className="text-sm font-medium text-foreground/80">
              {category.category}
            </span>
          </motion.div>

          <div className="grid grid-cols-2 gap-2">
            {category.items.map((item, itemIndex) => (
              <motion.div
                key={item.name}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02, 
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                className="group glass rounded-lg p-3 cursor-pointer hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className={`p-1.5 rounded-md bg-gradient-to-br ${category.color} opacity-80`}
                  >
                    <item.icon className="w-3.5 h-3.5 text-primary-foreground" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">
                      {item.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
