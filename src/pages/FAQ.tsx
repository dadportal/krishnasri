import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const faqCategories = [
  {
    name: "General",
    questions: [
      {
        q: "What is GuideSoft?",
        a: "GuideSoft is an AI-powered marketing and branding platform that helps businesses create professional marketing content, manage leads, and grow their brand presence online.",
      },
      {
        q: "How does GuideSoft work?",
        a: "GuideSoft uses advanced AI to help you generate marketing content, design email campaigns, create social media posts, and manage your leads. Simply describe what you need, and our AI will create it for you.",
      },
      {
        q: "Is GuideSoft suitable for my business?",
        a: "GuideSoft is designed for businesses of all sizes—from solopreneurs to enterprises. Whether you're just starting out or managing a large marketing team, our platform scales with your needs.",
      },
    ],
  },
  {
    name: "Pricing & Billing",
    questions: [
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit/debit cards, UPI payments (GuideSoft Pay), net banking, and wire transfers for enterprise customers.",
      },
      {
        q: "Is there a free trial?",
        a: "Yes! All our plans come with a 14-day free trial. No credit card required to start.",
      },
      {
        q: "Can I cancel my subscription anytime?",
        a: "Absolutely. You can cancel your subscription at any time from your account settings. Your access will continue until the end of your billing period.",
      },
      {
        q: "Do you offer refunds?",
        a: "We offer a 30-day money-back guarantee for new subscribers. If you're not satisfied with GuideSoft, contact our support team for a full refund.",
      },
    ],
  },
  {
    name: "Features & AI",
    questions: [
      {
        q: "What AI features are included?",
        a: "GuideSoft includes AI-powered content generation for emails, social media, ads, and blog posts. We also offer AI-driven lead scoring, personalization, and analytics.",
      },
      {
        q: "How accurate is the AI content?",
        a: "Our AI generates high-quality, professional content that typically requires minimal editing. All generated content is reviewed by our quality filters before delivery.",
      },
      {
        q: "Can I customize the AI output?",
        a: "Yes! You can provide detailed prompts, set your brand voice and tone, and refine outputs to match your exact requirements.",
      },
    ],
  },
  {
    name: "Integrations",
    questions: [
      {
        q: "What integrations are available?",
        a: "GuideSoft integrates with Google Workspace (Docs, Sheets, Meet), major social media platforms, email providers, CRM systems, and payment gateways.",
      },
      {
        q: "Do you have an API?",
        a: "Yes, our Pro and Enterprise plans include API access for custom integrations. Check our API documentation for details.",
      },
      {
        q: "Can I connect my existing tools?",
        a: "Most likely, yes! We support integrations through Zapier, webhooks, and direct API connections. Contact us if you need a specific integration.",
      },
    ],
  },
  {
    name: "Security & Privacy",
    questions: [
      {
        q: "Is my data secure?",
        a: "Absolutely. We use bank-grade encryption (AES-256) for all data, both in transit and at rest. Our infrastructure is hosted on enterprise-grade cloud providers with SOC 2 compliance.",
      },
      {
        q: "Who owns the content I create?",
        a: "You do! All content you create with GuideSoft belongs to you. We don't claim any rights to your content.",
      },
      {
        q: "Do you sell my data?",
        a: "Never. We don't sell, share, or monetize your data in any way. Your privacy is our priority.",
      },
    ],
  },
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = faqCategories.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (item) =>
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
          <div className="container mx-auto px-4 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
                Frequently Asked <span className="gradient-text">Questions</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Find answers to common questions about GuideSoft.
              </p>

              {/* Search */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            {filteredCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
                className="mb-12"
              >
                <h2 className="font-display text-2xl font-bold mb-6">{category.name}</h2>
                <div className="glass rounded-2xl">
                  <Accordion type="single" collapsible>
                    {category.questions.map((item, index) => (
                      <AccordionItem key={index} value={`${category.name}-${index}`}>
                        <AccordionTrigger className="px-6 text-left">
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 text-muted-foreground">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </motion.div>
            ))}

            {filteredCategories.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No questions found matching your search.</p>
              </div>
            )}
          </div>
        </section>

        {/* Still have questions */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-12 text-center max-w-2xl mx-auto"
            >
              <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold mb-4">
                Still have questions?
              </h2>
              <p className="text-muted-foreground mb-6">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <Link to="/#contact">
                <Button size="lg">Contact Support</Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
