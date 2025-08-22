import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppLayout } from "./components/layout/AppLayout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Scheduling from "./pages/Scheduling";
import Clients from "./pages/Clients";
import Financial from "./pages/Financial";
import Store from "./pages/Store";
import Loyalty from "./pages/Loyalty";
import Content from "./pages/Content";
import Admin from "./pages/Admin";
import Subscription from "./pages/Subscription";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <LanguageProvider>
          <SubscriptionProvider>
            <SidebarProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route element={<AppLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/agenda" element={<Scheduling />} />
                    <Route path="/clientes" element={<Clients />} />
                    <Route path="/financeiro" element={<Financial />} />
                    <Route path="/loja" element={<Store />} />
                    <Route path="/fidelidade" element={<Loyalty />} />
                    <Route path="/conteudo" element={<Content />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/assinatura" element={<Subscription />} />
                    <Route path="/perfil" element={<Profile />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </SidebarProvider>
          </SubscriptionProvider>
        </LanguageProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
