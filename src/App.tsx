import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Candidates from "./pages/Candidates";
import Jobs from "./pages/Jobs";
import Resumes from "./pages/Resumes";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import AILab from "./pages/AILab";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          } />
          <Route path="/candidates" element={
            <ProtectedRoute requiredRoles={['admin', 'developer', 'editor']}>
              <Candidates />
            </ProtectedRoute>
          } />
          <Route path="/jobs" element={
            <ProtectedRoute requiredRoles={['admin', 'developer', 'editor']}>
              <Jobs />
            </ProtectedRoute>
          } />
          <Route path="/resumes" element={
            <ProtectedRoute>
              <Resumes />
            </ProtectedRoute>
          } />
          <Route path="/analytics" element={
            <ProtectedRoute requiredRoles={['admin', 'developer']}>
              <Analytics />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          <Route path="/ai-lab" element={
            <ProtectedRoute requiredRoles={['admin', 'developer']}>
              <AILab />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
