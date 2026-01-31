import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: "1",
    title: "10 AI Marketing Trends to Watch in 2026",
    excerpt: "Discover the cutting-edge AI technologies that are reshaping the marketing landscape and how you can leverage them for your business.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    author: "Krishna Sri",
    date: "Jan 28, 2026",
    category: "AI & Technology",
    readTime: "5 min read",
  },
  {
    id: "2",
    title: "The Complete Guide to Social Media Marketing",
    excerpt: "Everything you need to know about building a successful social media strategy from scratch.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800",
    author: "Priya Sharma",
    date: "Jan 25, 2026",
    category: "Social Media",
    readTime: "8 min read",
  },
  {
    id: "3",
    title: "How to Generate High-Quality Leads Online",
    excerpt: "Proven strategies for attracting and converting leads in the digital age.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800",
    author: "Rahul Verma",
    date: "Jan 22, 2026",
    category: "Lead Generation",
    readTime: "6 min read",
  },
  {
    id: "4",
    title: "Building a Brand That Customers Love",
    excerpt: "Learn how to create an authentic brand identity that resonates with your target audience.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800",
    author: "Anita Patel",
    date: "Jan 18, 2026",
    category: "Branding",
    readTime: "7 min read",
  },
  {
    id: "5",
    title: "Email Marketing Best Practices for 2026",
    excerpt: "Maximize your email marketing ROI with these proven tactics and strategies.",
    image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800",
    author: "Krishna Sri",
    date: "Jan 15, 2026",
    category: "Email Marketing",
    readTime: "5 min read",
  },
  {
    id: "6",
    title: "Content Marketing: Quality vs Quantity",
    excerpt: "Finding the right balance between producing content consistently and maintaining high quality.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    author: "Priya Sharma",
    date: "Jan 10, 2026",
    category: "Content Marketing",
    readTime: "4 min read",
  },
];

const categories = ["All", "AI & Technology", "Social Media", "Lead Generation", "Branding", "Email Marketing", "Content Marketing"];

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
                Our <span className="gradient-text">Blog</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Insights, tips, and strategies to help you grow your business.
              </p>

              {/* Search */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass rounded-2xl overflow-hidden group"
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <Badge variant="secondary" className="mb-3">
                      {post.category}
                    </Badge>
                    <h2 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                    </div>
                    <Link 
                      to={`/blog/${post.id}`}
                      className="mt-4 inline-flex items-center gap-1 text-primary text-sm hover:underline"
                    >
                      Read more
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No posts found matching your criteria.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
