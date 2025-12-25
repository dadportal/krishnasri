import { useEffect, ReactNode } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { initialize, isInitialized, isLoading } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="font-display font-bold text-2xl text-primary-foreground">RS</span>
          </div>
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <p className="text-muted-foreground text-sm">Loading...</p>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}
