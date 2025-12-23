import { motion } from "framer-motion";
import { 
  Code2, Database, Shield, Cpu, Cloud, GitBranch, 
  Layers, Lock, Server, Zap, Globe, Terminal
} from "lucide-react";

const techIcons = [
  { Icon: Code2, delay: 0, x: 20, y: 10 },
  { Icon: Database, delay: 0.5, x: 80, y: 15 },
  { Icon: Shield, delay: 1, x: 15, y: 40 },
  { Icon: Cpu, delay: 1.5, x: 85, y: 45 },
  { Icon: Cloud, delay: 2, x: 50, y: 20 },
  { Icon: GitBranch, delay: 2.5, x: 25, y: 70 },
  { Icon: Layers, delay: 3, x: 75, y: 75 },
  { Icon: Lock, delay: 3.5, x: 60, y: 60 },
  { Icon: Server, delay: 4, x: 40, y: 80 },
  { Icon: Zap, delay: 4.5, x: 10, y: 55 },
  { Icon: Globe, delay: 5, x: 90, y: 30 },
  { Icon: Terminal, delay: 5.5, x: 35, y: 35 },
];

const FloatingIcon = ({ 
  Icon, 
  delay, 
  x, 
  y 
}: { 
  Icon: typeof Code2; 
  delay: number; 
  x: number; 
  y: number;
}) => (
  <motion.div
    className="absolute text-primary/20"
    style={{ left: `${x}%`, top: `${y}%` }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 0.3, 0.3, 0],
      scale: [0.5, 1, 1, 0.5],
      y: [0, -30, -30, 0],
      rotate: [0, 10, -10, 0],
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <Icon className="w-8 h-8 md:w-12 md:h-12" />
  </motion.div>
);

const Particle = ({ index }: { index: number }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full bg-primary/40"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
    }}
    animate={{
      y: [0, -200],
      x: [0, (Math.random() - 0.5) * 100],
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0],
    }}
    transition={{
      duration: 4 + Math.random() * 4,
      delay: index * 0.3,
      repeat: Infinity,
      ease: "easeOut",
    }}
  />
);

const GlowOrb = ({ 
  color, 
  size, 
  x, 
  y, 
  delay 
}: { 
  color: string; 
  size: number; 
  x: number; 
  y: number; 
  delay: number;
}) => (
  <motion.div
    className={`absolute rounded-full blur-3xl ${color}`}
    style={{ 
      width: size, 
      height: size, 
      left: `${x}%`, 
      top: `${y}%`,
      transform: 'translate(-50%, -50%)',
    }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
      x: [0, 30, 0],
      y: [0, -20, 0],
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />
      
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 mesh-gradient opacity-60" />
      
      {/* Animated glow orbs */}
      <GlowOrb color="bg-primary/30" size={400} x={20} y={30} delay={0} />
      <GlowOrb color="bg-accent/20" size={300} x={80} y={60} delay={2} />
      <GlowOrb color="bg-warning/15" size={250} x={50} y={80} delay={4} />
      <GlowOrb color="bg-success/20" size={350} x={70} y={20} delay={1} />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--border) / 0.5) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--border) / 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      {/* Floating tech icons */}
      {techIcons.map((icon, index) => (
        <FloatingIcon key={index} {...icon} />
      ))}
      
      {/* Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Particle key={i} index={i} />
      ))}
      
      {/* Central morphing blob */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96"
        animate={{
          borderRadius: [
            "60% 40% 30% 70% / 60% 30% 70% 40%",
            "30% 60% 70% 40% / 50% 60% 30% 60%",
            "60% 40% 30% 70% / 60% 30% 70% 40%",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-primary/10 via-accent/10 to-success/10 blur-3xl" />
      </motion.div>
      
      {/* Rotating ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-primary/10 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-accent/10 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
