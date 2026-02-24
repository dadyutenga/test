import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/admin/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ProjectsAdmin from "./pages/admin/ProjectsAdmin";
import ServicesAdmin from "./pages/admin/ServicesAdmin";
import ContactAdmin from "./pages/admin/ContactAdmin";
import MessagesAdmin from "./pages/admin/MessagesAdmin";
import TestimonialsAdmin from "./pages/admin/TestimonialsAdmin";
import SettingsAdmin from "./pages/admin/SettingsAdmin";

const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="projects" element={<ProjectsAdmin />} />
              <Route path="services" element={<ServicesAdmin />} />
              <Route path="contact" element={<ContactAdmin />} />
              <Route path="messages" element={<MessagesAdmin />} />
              <Route path="testimonials" element={<TestimonialsAdmin />} />
              <Route path="settings" element={<SettingsAdmin />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
