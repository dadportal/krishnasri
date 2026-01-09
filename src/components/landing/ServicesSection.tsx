import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Content Creation",
    description: "AI-generated marketing content that converts",
    features: [
      "Blog posts & articles",
      "Social media content",
      "Email campaigns",
      "Ad copy & headlines",
    ],
    gradient: "from-primary/20 to-accent/20",
  },
  {
    title: "Brand Strategy",
    description: "Data-driven insights for brand growth",
    features: [
      "Brand voice development",
      "Competitor analysis",
      "Market positioning",
      "Messaging frameworks",
    ],
    gradient: "from-accent/20 to-purple-500/20",
  },
  {
    title: "Lead Generation",
    description: "Capture and nurture high-quality leads",
    features: [
      "Landing page optimization",
      "Lead scoring & qualification",
      "Automated follow-ups",
      "CRM integration",
    ],
    gradient: "from-success/20 to-primary/20",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive marketing solutions powered by artificial intelligence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`glass rounded-2xl p-8 bg-gradient-to-br ${service.gradient} card-hover`}
            >
              <h3 className="font-display font-bold text-2xl mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              
              <ul className="space-y-3 mb-8">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/services">
                <Button variant="outline" className="w-full gap-2 group">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
