import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import BusinessRegistration from "./pages/BusinessRegistration";
import Businesses from "./pages/Businesses";
import BusinessProfile from "./pages/BusinessProfile";
import News from "./pages/News";
import NewsProfile from "./pages/NewsProfile";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import PlansPage from "./pages/PlansPage";
import { AuthContextProvider } from "./hooks/useAuth";
import { About } from "./pages/About";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const App = () => (
  <AuthContextProvider>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/register" element={<BusinessRegistration />} />
                <Route path="/businesses" element={<Businesses />} />
                <Route path="/business/:id" element={<BusinessProfile />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:id" element={<NewsProfile />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/plans" element={<PlansPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </AuthContextProvider>
);

export default App;
