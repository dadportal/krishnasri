import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore, UserRole } from '@/stores/authStore';
import { motion } from 'framer-motion';
import { Shield, Lock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRoles?: UserRole[];
  fallback?: ReactNode;
}

export function ProtectedRoute({ 
  children, 
  requiredRoles,
  fallback 
}: ProtectedRouteProps) {
  const { isAuthenticated, user, hasPermission, isInitialized, initialize, isLoading } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  // Show loading while initializing
  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground text-sm">Verifying access...</p>
        </motion.div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check role permissions if required
  if (requiredRoles && requiredRoles.length > 0) {
    const hasAccess = hasPermission(requiredRoles);
    
    if (!hasAccess) {
      // Show access denied page
      if (fallback) return <>{fallback}</>;
      
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-2xl p-8 max-w-md w-full text-center"
          >
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-destructive" />
            </div>
            
            <h1 className="font-display text-2xl font-bold mb-2">Access Denied</h1>
            <p className="text-muted-foreground mb-6">
              You don't have permission to access this page. Required role: {requiredRoles.join(' or ')}.
            </p>
            
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
              <Shield className="w-4 h-4" />
              <span>Your role: <span className="text-foreground font-medium capitalize">{user.role}</span></span>
            </div>
            
            <Button onClick={() => window.history.back()} variant="outline" className="w-full">
              Go Back
            </Button>
          </motion.div>
        </div>
      );
    }
  }

  return <>{children}</>;
}

// Component-level permission check
interface PermissionGateProps {
  children: ReactNode;
  requiredRoles: UserRole[];
  fallback?: ReactNode;
}

export function PermissionGate({ 
  children, 
  requiredRoles, 
  fallback = null 
}: PermissionGateProps) {
  const { hasPermission, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <>{fallback}</>;
  if (!hasPermission(requiredRoles)) return <>{fallback}</>;

  return <>{children}</>;
}
