import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

export function ContactSection() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validatedData = contactSchema.parse(formData);
      
      // Send email via mailto link as fallback (in production, use edge function)
      const mailtoLink = `mailto:pranu21m@gmail.com?subject=${encodeURIComponent(validatedData.subject)}&body=${encodeURIComponent(
        `Name: ${validatedData.name}\nEmail: ${validatedData.email}\n\nMessage:\n${validatedData.message}`
      )}`;
      
      window.open(mailtoLink, '_blank');

      toast({
        title: "Message prepared!",
        description: "Your email client will open to send the message.",
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hi! I'm interested in GuideSoft's marketing platform.");
    window.open(`https://wa.me/918884162999?text=${message}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Name *</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address *</label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Subject *</label>
                <Input
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="How can we help?"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Message *</label>
                <Textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Tell us about your project..."
                />
              </div>

              <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Send Message
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="glass rounded-2xl p-8">
              <Mail className="w-10 h-10 text-primary mb-4" />
              <h3 className="font-display font-semibold text-xl mb-2">Email Us</h3>
              <p className="text-muted-foreground mb-4">
                For general inquiries and support
              </p>
              <a 
                href="mailto:pranu21m@gmail.com" 
                className="text-primary hover:underline font-medium"
              >
                pranu21m@gmail.com
              </a>
            </div>

            <div className="glass rounded-2xl p-8">
              <MessageSquare className="w-10 h-10 text-success mb-4" />
              <h3 className="font-display font-semibold text-xl mb-2">WhatsApp</h3>
              <p className="text-muted-foreground mb-4">
                Quick questions? Chat with us on WhatsApp
              </p>
              <Button variant="outline" onClick={handleWhatsApp} className="gap-2">
                <MessageSquare className="w-4 h-4" />
                Start Chat
              </Button>
            </div>

            <div className="glass rounded-2xl p-8">
              <h3 className="font-display font-semibold text-xl mb-2">Office Address</h3>
              <p className="text-muted-foreground">
                GuideSoft Technologies<br />
                123 Innovation Drive, Suite 456<br />
                Tech Park, Bangalore 560001<br />
                Karnataka, India
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
