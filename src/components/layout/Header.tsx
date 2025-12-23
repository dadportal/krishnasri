import { Search, Bell, Settings, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="h-16 border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="h-full px-4 lg:px-6 flex items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="font-display font-bold text-sm text-primary-foreground">RS</span>
            </div>
            <span className="font-display font-bold text-lg hidden md:block">ResumeScreen</span>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search candidates, jobs..." 
              className="pl-10 bg-secondary/50 border-border focus:bg-secondary"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Settings className="h-5 w-5" />
          </Button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center ml-2">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
}
