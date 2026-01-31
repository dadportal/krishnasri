import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Target, Heart, Zap, Users, Globe, Award } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Mission-Driven",
    description: "We're on a mission to democratize professional marketing for businesses of all sizes.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "Every decision we make starts with the question: how does this help our customers?",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We're constantly pushing the boundaries of what's possible with AI and marketing.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Great things happen when talented people work together towards a common goal.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "We serve customers in 50+ countries, making a positive impact worldwide.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We hold ourselves to the highest standards in everything we do.",
  },
];

const team = [
  {
    name: "Krishna Sri",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
    bio: "Visionary leader with 10+ years in marketing tech.",
  },
  {
    name: "Priya Sharma",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300",
    bio: "AI expert building the future of marketing automation.",
  },
  {
    name: "Rahul Verma",
    role: "Head of Product",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300",
    bio: "Product leader focused on user-centric design.",
  },
  {
    name: "Anita Patel",
    role: "Head of Marketing",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300",
    bio: "Marketing strategist driving brand growth.",
  },
];

export default function About() {
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
                About <span className="gradient-text">GuideSoft</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                We're building the future of marketing technology. Our AI-powered platform 
                helps businesses create, manage, and optimize their brand presence at scale.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-4xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    GuideSoft was founded in 2020 with a simple but ambitious goal: to make 
                    professional marketing accessible to every business, regardless of size or budget.
                  </p>
                  <p>
                    Our founder, Krishna Sri, experienced firsthand the challenges small businesses 
                    face when trying to compete with larger companies in the digital space. Traditional 
                    marketing agencies were too expensive, and DIY tools lacked the sophistication 
                    needed for real results.
                  </p>
                  <p>
                    That's when the idea for GuideSoft was born: an AI-powered platform that combines 
                    the expertise of a full marketing team with the accessibility and affordability 
                    of modern software.
                  </p>
                  <p>
                    Today, we serve over 10,000 customers in 50+ countries, helping them grow their 
                    brands and reach new audiences every day.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                  alt="GuideSoft Team"
                  className="rounded-2xl w-full"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                The principles that guide everything we do at GuideSoft.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-2xl p-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-4xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                The passionate people behind GuideSoft.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass rounded-2xl p-6 text-center"
                >
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-display text-lg font-semibold">{member.name}</h3>
                  <p className="text-primary text-sm mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
