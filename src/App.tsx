import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

// Public pages
import Landing from "./pages/Landing";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import FAQ from "./pages/FAQ";
import Payment from "./pages/Payment";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Protected pages
import Index from "./pages/Index";
import Candidates from "./pages/Candidates";
import Jobs from "./pages/Jobs";
import Resumes from "./pages/Resumes";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import AILab from "./pages/AILab";
import AITools from "./pages/AITools";
import Leads from "./pages/Leads";
import Appointments from "./pages/Appointments";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/login" element={<Login />} />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={
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
              <Route path="/ai-tools" element={
                <ProtectedRoute>
                  <AITools />
                </ProtectedRoute>
              } />
              <Route path="/leads" element={
                <ProtectedRoute requiredRoles={['admin', 'developer', 'editor']}>
                  <Leads />
                </ProtectedRoute>
              } />
              <Route path="/appointments" element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
