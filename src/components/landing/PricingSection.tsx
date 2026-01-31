import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    description: "Perfect for individuals and small projects",
    price: { monthly: 29, yearly: 290 },
    features: [
      "5 AI content generations/day",
      "Basic email templates",
      "Social media scheduling",
      "Lead capture forms",
      "Basic analytics",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Pro",
    description: "For growing businesses and teams",
    price: { monthly: 79, yearly: 790 },
    features: [
      "Unlimited AI generations",
      "Advanced email automation",
      "Multi-platform publishing",
      "Lead scoring & CRM",
      "Advanced analytics",
      "Priority support",
      "Team collaboration",
      "Custom integrations",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations with custom needs",
    price: { monthly: 199, yearly: 1990 },
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom AI training",
      "White-label options",
      "SLA guarantees",
      "API access",
      "SSO & advanced security",
      "Custom development",
    ],
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Choose the plan that's right for your business. All plans include a 14-day free trial.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative glass rounded-2xl p-8 ${
                plan.popular ? 'border-2 border-primary scale-105' : ''
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan info */}
              <div className="text-center mb-8">
                <h3 className="font-display text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="flex items-end justify-center gap-1">
                  <span className="text-4xl font-bold">${plan.price.monthly}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  or ${plan.price.yearly}/year (save 17%)
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link to="/login">
                <Button 
                  className="w-full" 
                  variant={plan.popular ? "default" : "outline"}
                >
                  Start Free Trial
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* UPI Payment Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            💳 We accept all major cards, UPI (GuideSoft Pay), and bank transfers.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
