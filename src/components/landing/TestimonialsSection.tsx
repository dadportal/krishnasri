import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    content: "GuideSoft transformed our marketing workflow. The AI tools saved us hours every week and the results speak for themselves. Our engagement rates have never been higher!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "CEO",
    company: "StartupXYZ",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    content: "The best investment we made for our brand. Professional results in minutes. The content generator alone is worth 10x the price.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Content Manager",
    company: "MediaHub",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    content: "Finally, an all-in-one platform that actually delivers on its promises. Our team productivity has increased by 200%.",
    rating: 5,
  },
  {
    name: "David Park",
    role: "Growth Lead",
    company: "ScaleUp Inc",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    content: "The lead generation tools are incredible. We've tripled our qualified leads in just 3 months using GuideSoft.",
    rating: 5,
  },
  {
    name: "Jessica Williams",
    role: "Brand Strategist",
    company: "Creative Co",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    content: "As a brand strategist, I'm very particular about tools. GuideSoft exceeded all my expectations with its comprehensive feature set.",
    rating: 5,
  },
  {
    name: "Robert Thompson",
    role: "Founder",
    company: "Digital First",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    content: "We replaced 5 different tools with GuideSoft. It's that comprehensive. And the customer support is outstanding!",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Loved by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See what our customers have to say about GuideSoft.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-6 relative"
            >
              {/* Quote icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-6">{testimonial.content}</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
