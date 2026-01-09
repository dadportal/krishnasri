import { motion } from "framer-motion";
import { Target, Heart, Lightbulb, Users } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We're on a mission to democratize AI-powered marketing for businesses of all sizes.",
  },
  {
    icon: Heart,
    title: "Customer-First",
    description: "Every feature we build starts with understanding our customers' real challenges.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We push the boundaries of what's possible with AI and marketing technology.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We believe in growing together with our community of marketers and creators.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-secondary/30 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              About <span className="gradient-text">GuideSoft</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Founded in 2024, GuideSoft was born from a simple idea: great marketing 
              shouldn't require a massive team or budget. Our AI-powered platform puts 
              enterprise-level marketing tools in the hands of every business.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Today, we serve over 10,000 marketers, agencies, and businesses worldwide, 
              helping them create compelling content, generate quality leads, and grow 
              their brands faster than ever before.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="font-display font-bold text-3xl text-primary mb-1">10K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-accent/5 border border-accent/10">
                <div className="font-display font-bold text-3xl text-accent mb-1">5M+</div>
                <div className="text-sm text-muted-foreground">Content Generated</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-success/5 border border-success/10">
                <div className="font-display font-bold text-3xl text-success mb-1">98%</div>
                <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-warning/5 border border-warning/10">
                <div className="font-display font-bold text-3xl text-warning mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-2xl p-6 card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
