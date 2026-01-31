import { motion } from "framer-motion";
import { 
  Sparkles, 
  Mail, 
  Share2, 
  BarChart3, 
  Users, 
  Zap,
  Palette,
  Globe,
  Shield
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI Content Generator",
    description: "Create compelling marketing content in seconds with our advanced AI.",
    gradient: "from-primary to-accent",
  },
  {
    icon: Mail,
    title: "Email Templates",
    description: "Design and send beautiful email campaigns that convert.",
    gradient: "from-accent to-primary",
  },
  {
    icon: Share2,
    title: "Social Media Suite",
    description: "Manage all your social platforms from one unified dashboard.",
    gradient: "from-primary to-success",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track performance with real-time insights and reports.",
    gradient: "from-success to-accent",
  },
  {
    icon: Users,
    title: "Lead Management",
    description: "Capture, score, and nurture leads automatically.",
    gradient: "from-accent to-warning",
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Set up powerful workflows that work while you sleep.",
    gradient: "from-warning to-primary",
  },
  {
    icon: Palette,
    title: "Brand Kit",
    description: "Keep your brand consistent across all channels.",
    gradient: "from-primary to-destructive",
  },
  {
    icon: Globe,
    title: "Multi-Platform",
    description: "Publish content to multiple platforms simultaneously.",
    gradient: "from-destructive to-accent",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security to protect your data and brand.",
    gradient: "from-accent to-success",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to
            <br />
            <span className="gradient-text">Grow Your Brand</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A complete toolkit for modern marketers. From content creation to lead 
            generation, we've got you covered.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative glass rounded-2xl p-6 overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              {/* Content */}
              <h3 className="font-display text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
              
              {/* Hover effect line */}
              <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.gradient} w-0 group-hover:w-full transition-all duration-300`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
