import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Brand Strategy & Identity",
    description: "Develop a powerful brand that resonates with your audience and stands out in the market.",
    features: [
      "Comprehensive brand audit",
      "Competitor analysis",
      "Brand positioning strategy",
      "Visual identity design",
      "Brand guidelines creation",
      "Messaging framework",
    ],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800",
    price: "Starting at ₹49,999",
  },
  {
    title: "Content Marketing",
    description: "Create engaging content that drives traffic, generates leads, and builds authority.",
    features: [
      "Content strategy development",
      "Blog writing & optimization",
      "Social media content",
      "Video script writing",
      "Email campaigns",
      "Content calendar management",
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    price: "Starting at ₹29,999/month",
  },
  {
    title: "Lead Generation",
    description: "Build a predictable pipeline of qualified leads for your business.",
    features: [
      "Landing page creation",
      "Lead magnet development",
      "Email sequence automation",
      "CRM setup & integration",
      "Lead scoring & qualification",
      "Conversion optimization",
    ],
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800",
    price: "Starting at ₹39,999/month",
  },
  {
    title: "Social Media Management",
    description: "Grow your social presence and engage your community effectively.",
    features: [
      "Platform strategy",
      "Content creation & curation",
      "Community management",
      "Paid advertising campaigns",
      "Influencer partnerships",
      "Performance analytics",
    ],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
    price: "Starting at ₹24,999/month",
  },
  {
    title: "AI-Powered Marketing",
    description: "Leverage cutting-edge AI to automate and optimize your marketing efforts.",
    features: [
      "AI content generation",
      "Predictive analytics",
      "Automated personalization",
      "Smart A/B testing",
      "Chatbot implementation",
      "Marketing automation",
    ],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    price: "Starting at ₹59,999/month",
  },
  {
    title: "Performance Marketing",
    description: "Drive measurable results with data-driven paid advertising campaigns.",
    features: [
      "Google Ads management",
      "Meta Ads campaigns",
      "LinkedIn advertising",
      "Retargeting strategies",
      "ROI optimization",
      "Monthly reporting",
    ],
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800",
    price: "Starting at ₹19,999/month + ad spend",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
                Our <span className="gradient-text">Services</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Comprehensive marketing solutions designed to help your business grow. 
                From strategy to execution, we've got you covered.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="space-y-24">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="rounded-2xl overflow-hidden aspect-video"
                    >
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>

                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <h2 className="font-display text-3xl font-bold">{service.title}</h2>
                    <p className="text-muted-foreground text-lg">{service.description}</p>
                    
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-4 pt-4">
                      <div className="font-display text-xl font-bold text-primary">
                        {service.price}
                      </div>
                      <Link to="/#contact">
                        <Button className="gap-2">
                          Get Started
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-12 text-center max-w-4xl mx-auto"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Marketing?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Let's discuss how we can help you achieve your business goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/#contact">
                  <Button size="lg" className="gap-2">
                    Schedule a Consultation
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/#pricing">
                  <Button size="lg" variant="outline">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
