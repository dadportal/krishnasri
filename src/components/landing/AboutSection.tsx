import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800"
                alt="GuideSoft Team"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Stats overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-8 -right-8 glass rounded-2xl p-6"
            >
              <div className="text-4xl font-bold gradient-text">5+</div>
              <div className="text-muted-foreground">Years of Excellence</div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              About <span className="gradient-text">GuideSoft</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              We're a team of passionate marketers, designers, and engineers on a mission 
              to democratize professional marketing. Founded in 2020, we've helped thousands 
              of businesses transform their brand presence.
            </p>
            <p className="text-muted-foreground">
              Our AI-powered platform combines cutting-edge technology with marketing best 
              practices to deliver results that matter. Whether you're a solopreneur or an 
              enterprise, GuideSoft scales with your needs.
            </p>
            
            <div className="grid grid-cols-3 gap-8 py-8">
              <div>
                <div className="font-display text-3xl font-bold gradient-text">10K+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold gradient-text">50+</div>
                <div className="text-sm text-muted-foreground">Countries</div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold gradient-text">99%</div>
                <div className="text-sm text-muted-foreground">Satisfaction</div>
              </div>
            </div>

            <Link to="/about" className="inline-flex items-center gap-2 text-primary hover:underline">
              Learn more about our story
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
