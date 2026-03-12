import { motion } from "framer-motion";
import { Logo } from "./Logo";
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube,
  Share2,
  Heart,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/guidesoft", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/guidesoft", label: "Instagram" },
  { icon: Twitter, href: "https://twitter.com/guidesoft", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/guidesoft", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/@guidesoft", label: "YouTube" },
];

const footerLinks = {
  product: [
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "/#pricing" },
    { name: "AI Tools", href: "/ai-tools" },
    { name: "Integrations", href: "/integrations" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/#contact" },
  ],
  resources: [
    { name: "Documentation", href: "/docs" },
    { name: "Help Center", href: "/help" },
    { name: "API Reference", href: "/api" },
    { name: "Status", href: "/status" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
};

export function Footer() {
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "GuideSoft - AI-Powered Marketing Studio",
        text: "Transform your brand with AI-powered marketing tools",
        url: window.location.origin,
      });
    }
  };

  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-xl">
      {/* Newsletter */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto"
        >
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Stay Updated with GuideSoft
          </h3>
          <p className="text-muted-foreground mb-6">
            Get the latest tips, updates, and exclusive offers delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </motion.div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Logo size="lg" className="mb-4" />
            <p className="text-muted-foreground mb-6 max-w-xs">
              AI-Powered Marketing & Branding Studio. Transform your business with intelligent automation.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
              <button
                onClick={handleShare}
                className="w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Share"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-muted-foreground hover:text-foreground transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-4 py-6 border-t border-border">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} GuideSoft. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Designed & Developed by{" "}
            <a
              href="https://www.guideitsol.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium inline-flex items-center gap-1"
            >
              GUIDESOFT <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}