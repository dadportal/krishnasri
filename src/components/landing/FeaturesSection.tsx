import { motion } from "framer-motion";
import { 
  Mail, 
  Instagram, 
  Facebook, 
  Youtube, 
  Megaphone, 
  Users, 
  BarChart3, 
  Zap 
} from "lucide-react";

const features = [
  {
    icon: Mail,
    title: "Email Generator",
    description: "Create compelling marketing emails, newsletters, and transactional messages with AI.",
    color: "from-primary to-primary/60",
  },
  {
    icon: Instagram,
    title: "Instagram Content",
    description: "Generate engaging posts, stories, and captions tailored for your Instagram audience.",
    color: "from-pink-500 to-purple-500",
  },
  {
    icon: Facebook,
    title: "Facebook Ads",
    description: "Craft high-converting ad copy and post content optimized for Facebook's algorithm.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Youtube,
    title: "YouTube Scripts",
    description: "Generate video scripts, thumbnail ideas, and descriptions that drive views.",
    color: "from-red-500 to-red-600",
  },
  {
    icon: Megaphone,
    title: "Ad Copy Engine",
    description: "Create persuasive advertising copy for any platform with proven frameworks.",
    color: "from-warning to-orange-500",
  },
  {
    icon: Users,
    title: "Lead CRM",
    description: "Capture, score, and manage leads with our integrated CRM system.",
    color: "from-success to-emerald-500",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Track performance across all campaigns with detailed analytics dashboards.",
    color: "from-accent to-blue-400",
  },
  {
    icon: Zap,
    title: "Automation",
    description: "Set up automated workflows to streamline your marketing operations.",
    color: "from-violet-500 to-purple-600",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-secondary/30 relative">
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to <span className="gradient-text">Grow</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A complete suite of AI-powered tools designed to transform your marketing efforts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass rounded-2xl p-6 card-hover group"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
