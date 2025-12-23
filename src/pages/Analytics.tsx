import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, Clock, Target } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { MatchScoreRing } from "@/components/dashboard/MatchScoreRing";
import { useState } from "react";

export default function Analytics() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
              <h1 className="font-display text-3xl font-bold mb-1">Analytics</h1>
              <p className="text-muted-foreground">
                Track hiring metrics and AI performance
              </p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard title="Resumes Processed" value="2,847" change="+234 this week" changeType="positive" icon={Users} delay={0} />
              <StatCard title="Avg. Match Score" value="78%" change="+5% improvement" changeType="positive" icon={Target} delay={100} />
              <StatCard title="Time to Hire" value="12 days" change="-2 days faster" changeType="positive" icon={Clock} delay={200} />
              <StatCard title="Conversion Rate" value="23%" change="+3% from last month" changeType="positive" icon={TrendingUp} delay={300} />
            </div>

            {/* Charts section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="glass rounded-xl p-6">
                <h2 className="font-display font-semibold text-lg mb-6">AI Model Performance</h2>
                <div className="flex items-center justify-around">
                  <MatchScoreRing score={89} size={140} label="Accuracy" />
                  <MatchScoreRing score={94} size={140} label="Precision" />
                  <MatchScoreRing score={86} size={140} label="Recall" />
                </div>
              </div>

              <div className="glass rounded-xl p-6">
                <h2 className="font-display font-semibold text-lg mb-6">Processing Stats</h2>
                <div className="space-y-4">
                  {[
                    { label: "PDF Resumes", value: 1842, total: 2847, color: "bg-primary" },
                    { label: "DOCX Resumes", value: 893, total: 2847, color: "bg-accent" },
                    { label: "Scanned Documents", value: 112, total: 2847, color: "bg-warning" },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-2">
                        <span>{item.label}</span>
                        <span className="text-muted-foreground">{item.value} / {item.total}</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(item.value / item.total) * 100}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full ${item.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top skills */}
            <div className="glass rounded-xl p-6">
              <h2 className="font-display font-semibold text-lg mb-6">Most Common Skills</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                  { skill: "Python", count: 1245 },
                  { skill: "JavaScript", count: 1102 },
                  { skill: "React", count: 892 },
                  { skill: "SQL", count: 756 },
                  { skill: "AWS", count: 634 },
                  { skill: "TypeScript", count: 589 },
                  { skill: "Node.js", count: 523 },
                  { skill: "Docker", count: 478 },
                  { skill: "Machine Learning", count: 412 },
                  { skill: "Kubernetes", count: 367 },
                  { skill: "TensorFlow", count: 298 },
                  { skill: "PostgreSQL", count: 267 },
                ].map((item, index) => (
                  <motion.div
                    key={item.skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 rounded-lg bg-secondary/50 text-center"
                  >
                    <p className="font-medium text-sm mb-1">{item.skill}</p>
                    <p className="text-primary font-display font-bold">{item.count}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
