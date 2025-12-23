import { motion } from "framer-motion";
import { Settings as SettingsIcon, User, Bell, Shield, Database, Cpu } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function Settings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const settingsSections = [
    {
      icon: User,
      title: "Profile Settings",
      description: "Manage your account details and preferences",
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Configure email and push notification settings",
    },
    {
      icon: Shield,
      title: "Security",
      description: "Password, 2FA, and access controls",
    },
    {
      icon: Database,
      title: "Data & Privacy",
      description: "Export data and manage privacy settings",
    },
    {
      icon: Cpu,
      title: "AI Configuration",
      description: "Adjust ML model parameters and thresholds",
    },
  ];

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
              <h1 className="font-display text-3xl font-bold mb-1">Settings</h1>
              <p className="text-muted-foreground">
                Manage your account and application preferences
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Settings navigation */}
              <div className="lg:col-span-1">
                <div className="glass rounded-xl p-4 space-y-2">
                  {settingsSections.map((section, index) => (
                    <motion.button
                      key={section.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                        index === 0 
                          ? "bg-primary/10 text-primary" 
                          : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <section.icon className="w-5 h-5" />
                      <div>
                        <p className="font-medium text-sm">{section.title}</p>
                        <p className="text-xs text-muted-foreground">{section.description}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Settings content */}
              <div className="lg:col-span-2">
                <div className="glass rounded-xl p-6">
                  <h2 className="font-display font-semibold text-lg mb-6">Profile Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-primary-foreground">
                        JD
                      </div>
                      <div>
                        <Button variant="secondary" size="sm">Change Avatar</Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">First Name</label>
                        <Input defaultValue="Jane" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Last Name</label>
                        <Input defaultValue="Doe" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Email</label>
                        <Input defaultValue="jane.doe@company.com" type="email" />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Role</label>
                        <Input defaultValue="HR Manager" disabled />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button>Save Changes</Button>
                      <Button variant="outline">Cancel</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
