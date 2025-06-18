
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
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCanceled from "./pages/PaymentCanceled";
import { AuthContextProvider } from "./hooks/useAuth";
import { About } from "./pages/About";
import { HelmetProvider } from "react-helmet-async";
import NewsForm from "./pages/NewsForm";
import UserRegister from "./pages/UserRegister";
import { Analytics } from '@vercel/analytics/react';
import UserLogin from "./pages/UserLogin";
import SortitionPage from "./pages/SortitionPage";

const queryClient = new QueryClient();

const App = () => (
  <AuthContextProvider>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Analytics />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/register" element={<BusinessRegistration />} />
                <Route path="/businesses" element={<Businesses />} />
                <Route path="/sorteio" element={<SortitionPage />} />
                <Route path="/business/:slug" element={<BusinessProfile />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/form" element={<NewsForm />} />
                <Route path="/news/:slug" element={<NewsProfile />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/plans" element={<PlansPage />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/payment-canceled" element={<PaymentCanceled />} />
                <Route path="/user/register" element={<UserRegister />} />
                <Route path="/user/login" element={<UserLogin />} />
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
