import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Database, Shield, DollarSign, Globe, Sparkles, Download, Loader2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Architecture {
  title: string;
  description: string;
  services: Array<{ name: string; type: string; provider: string; description: string; monthlyEstimate: number }>;
  databases: Array<{ name: string; type: string; technology: string; purpose: string }>;
  securityLayers: Array<{ name: string; type: string; description: string }>;
  costEstimate: { monthly: number; yearly: number; breakdown: Array<{ category: string; amount: number }> };
  recommendations: string[];
}

export default function AILab() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [industry, setIndustry] = useState("technology");
  const [securityLevel, setSecurityLevel] = useState("standard");
  const [scaleTier, setScaleTier] = useState(50);
  const [isGenerating, setIsGenerating] = useState(false);
  const [architecture, setArchitecture] = useState<Architecture | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({ title: "Please enter a prompt", variant: "destructive" });
      return;
    }
    
    setIsGenerating(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-architecture`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          industry,
          securityLevel,
          scaleTier: scaleTier < 33 ? "startup" : scaleTier < 66 ? "growth" : "enterprise",
          budget: scaleTier < 33 ? "low" : scaleTier < 66 ? "medium" : "high",
        }),
      });
      
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setArchitecture(data.architecture);
      toast({ title: "Architecture generated!" });
    } catch (error) {
      toast({ title: "Generation failed", description: String(error), variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const exportArchitecture = (format: "json" | "markdown") => {
    if (!architecture) return;
    const content = format === "json" 
      ? JSON.stringify(architecture, null, 2)
      : `# ${architecture.title}\n\n${architecture.description}\n\n## Services\n${architecture.services.map(s => `- **${s.name}** (${s.provider}): ${s.description}`).join("\n")}`;
    const blob = new Blob([content], { type: format === "json" ? "application/json" : "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `architecture.${format === "json" ? "json" : "md"}`;
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
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <h1 className="font-display text-3xl font-bold mb-1">
                AI Architecture <span className="gradient-text">Lab</span>
              </h1>
              <p className="text-muted-foreground">Generate production-ready system architectures with AI</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Panel */}
              <div className="glass rounded-xl p-6 space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Describe Your System</label>
                  <Textarea 
                    placeholder="E.g., Build a real-time analytics platform for e-commerce with ML-powered recommendations..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Industry</label>
                    <Select value={industry} onValueChange={setIndustry}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="fintech">Fintech</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                        <SelectItem value="media">Media</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Security Level</label>
                    <Select value={securityLevel} onValueChange={setSecurityLevel}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic</SelectItem>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                        <SelectItem value="military">Military-grade</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Scale & Budget: {scaleTier < 33 ? "Startup" : scaleTier < 66 ? "Growth" : "Enterprise"}</label>
                  <Slider value={[scaleTier]} onValueChange={([v]) => setScaleTier(v)} max={100} step={1} />
                </div>

                <Button onClick={handleGenerate} disabled={isGenerating} className="w-full gap-2">
                  {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  {isGenerating ? "Generating..." : "Generate Architecture"}
                </Button>
              </div>

              {/* Output Panel */}
              <div className="glass rounded-xl p-6">
                {!architecture ? (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <Cpu className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Your architecture will appear here</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="font-display text-xl font-bold">{architecture.title}</h2>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => exportArchitecture("json")}>
                          <Download className="w-3 h-3 mr-1" /> JSON
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => exportArchitecture("markdown")}>
                          <Download className="w-3 h-3 mr-1" /> MD
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{architecture.description}</p>
                    
                    <div>
                      <h3 className="font-medium flex items-center gap-2 mb-3"><Cpu className="w-4 h-4 text-primary" /> Services</h3>
                      <div className="space-y-2">
                        {architecture.services.map((s, i) => (
                          <div key={i} className="p-3 bg-secondary/30 rounded-lg">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{s.name}</span>
                              <Badge variant="secondary">{s.provider}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{s.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-primary/10 rounded-lg">
                      <DollarSign className="w-8 h-8 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Estimated Monthly Cost</p>
                        <p className="font-display text-2xl font-bold">${architecture.costEstimate.monthly.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
