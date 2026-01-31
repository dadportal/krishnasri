import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Brand Strategy",
    description: "Develop a powerful brand identity that resonates with your target audience.",
    features: ["Brand Audit", "Competitor Analysis", "Positioning Strategy", "Visual Identity"],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800",
  },
  {
    title: "Content Marketing",
    description: "Create engaging content that drives traffic, leads, and conversions.",
    features: ["Blog Writing", "Social Media Content", "Video Scripts", "Email Campaigns"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
  },
  {
    title: "Lead Generation",
    description: "Build a predictable pipeline of qualified leads for your business.",
    features: ["Landing Pages", "Lead Magnets", "Email Sequences", "CRM Integration"],
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800",
  },
  {
    title: "Social Media Management",
    description: "Grow your social presence and engage your community effectively.",
    features: ["Content Calendar", "Community Management", "Paid Advertising", "Analytics"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-secondary/30">
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
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive marketing solutions tailored to your business needs.
          </p>
        </motion.div>

        <div className="space-y-24">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
            >
              {/* Image */}
              <div className="flex-1 w-full">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-2xl overflow-hidden aspect-video"
                >
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                </motion.div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-6">
                <h3 className="font-display text-3xl font-bold">{service.title}</h3>
                <p className="text-muted-foreground text-lg">{service.description}</p>
                
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/services">
                  <Button className="gap-2">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
