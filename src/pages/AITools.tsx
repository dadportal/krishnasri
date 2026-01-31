import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mail, 
  Instagram, 
  Facebook, 
  Youtube, 
  Megaphone,
  Sparkles,
  Copy,
  Download,
  Loader2,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const contentTypes = [
  { id: "email", name: "Email", icon: Mail, description: "Marketing emails & newsletters" },
  { id: "instagram", name: "Instagram", icon: Instagram, description: "Posts, stories & reels" },
  { id: "facebook", name: "Facebook", icon: Facebook, description: "Posts & ad copy" },
  { id: "youtube", name: "YouTube", icon: Youtube, description: "Titles, descriptions & scripts" },
  { id: "ad_copy", name: "Ad Copy", icon: Megaphone, description: "Compelling advertisements" },
];

export default function AITools() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeType, setActiveType] = useState("email");
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({ title: "Please enter a prompt", variant: "destructive" });
      return;
    }

    setIsGenerating(true);
    setResult("");

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-content`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ type: activeType, prompt }),
      });

      if (!response.ok) throw new Error("Generation failed");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullResult = "";

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        
        for (const line of lines) {
          if (line.startsWith("data: ") && line !== "data: [DONE]") {
            try {
              const json = JSON.parse(line.slice(6));
              const content = json.choices?.[0]?.delta?.content || "";
              fullResult += content;
              setResult(fullResult);
            } catch {}
          }
        }
      }

      // Save to database
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("content_generations").insert({
          user_id: user.id,
          type: activeType,
          prompt,
          result: fullResult,
        });
      }

      toast({ title: "Content generated!" });
    } catch (error) {
      toast({ 
        title: "Generation failed", 
        description: "Please try again later.",
        variant: "destructive" 
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast({ title: "Copied to clipboard!" });
  };

  const downloadContent = () => {
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeType}-content.txt`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 bg-grid-pattern bg-grid opacity-30 pointer-events-none" />
      
      <div className="flex min-h-screen relative">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 flex flex-col lg:ml-0">
          <Header onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1 p-4 lg:p-6 overflow-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <h1 className="font-display text-3xl font-bold mb-1">
                AI Content <span className="gradient-text">Studio</span>
              </h1>
              <p className="text-muted-foreground">
                Generate professional marketing content with AI
              </p>
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Content Type Selector */}
              <div className="xl:col-span-1">
                <div className="glass rounded-xl p-4">
                  <h2 className="font-display font-semibold text-lg mb-4">Content Type</h2>
                  <div className="space-y-2">
                    {contentTypes.map((type) => (
                      <motion.button
                        key={type.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveType(type.id)}
                        className={`w-full flex items-center gap-3 p-4 rounded-xl transition-colors text-left ${
                          activeType === type.id
                            ? "bg-primary/10 border border-primary/30"
                            : "bg-secondary/30 hover:bg-secondary/50"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          activeType === type.id ? "bg-primary text-primary-foreground" : "bg-secondary"
                        }`}>
                          <type.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-medium">{type.name}</div>
                          <div className="text-xs text-muted-foreground">{type.description}</div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Input Panel */}
              <div className="xl:col-span-1">
                <div className="glass rounded-xl p-6 space-y-4">
                  <h2 className="font-display font-semibold text-lg">Describe Your Content</h2>
                  
                  <Textarea
                    placeholder={`Describe the ${contentTypes.find(t => t.id === activeType)?.name.toLowerCase()} content you want to create...`}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[200px]"
                  />

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setPrompt("Write a compelling email for a product launch")}
                    >
                      Product Launch
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setPrompt("Create a promotional post for a sale event")}
                    >
                      Sale Promo
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setPrompt("Write engaging newsletter content about industry trends")}
                    >
                      Newsletter
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setPrompt("Create a testimonial request email")}
                    >
                      Testimonial
                    </Button>
                  </div>

                  <Button 
                    onClick={handleGenerate} 
                    disabled={isGenerating}
                    className="w-full gap-2"
                  >
                    {isGenerating ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    {isGenerating ? "Generating..." : "Generate Content"}
                  </Button>
                </div>
              </div>

              {/* Output Panel */}
              <div className="xl:col-span-1">
                <div className="glass rounded-xl p-6 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display font-semibold text-lg">Generated Content</h2>
                    {result && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" onClick={copyToClipboard}>
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={downloadContent}>
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={handleGenerate}>
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {result ? (
                    <div className="prose prose-sm prose-invert max-w-none">
                      <div className="whitespace-pre-wrap text-sm">{result}</div>
                    </div>
                  ) : (
                    <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Your content will appear here</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
