import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { BlogsRedirect } from "./components/BlogsRedirect";
import { HelmetProvider } from "react-helmet-async";
import { captureTrackingParams } from "@/lib/tracking";
import { Header } from "@/components/Header";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Footer } from "@/components/Footer";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import { ProductRedirect } from "./components/ProductRedirect";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Affiliate from "./pages/Affiliate";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import RefundPolicy from "./pages/RefundPolicy";
import OrderTracking from "./pages/OrderTracking";
import NotFound from "./pages/NotFound";
import Sitemap from "./pages/Sitemap";
import BonusNiches from "./pages/BonusNiches";

const queryClient = new QueryClient();

const App = () => {
  // Capture Everflow tracking parameters on initial page load
  useEffect(() => {
    captureTrackingParams();
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <AnnouncementBar />
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/product/:handle" element={<ProductRedirect />} />
              <Route path="/products/:handle" element={<ProductDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:handle" element={<BlogPost />} />
              <Route path="/affiliate" element={<Affiliate />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/order-tracking" element={<OrderTracking />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/sitemap.xml" element={<Sitemap />} />
              <Route path="/bonus/top-niches" element={<BonusNiches />} />
              {/* Redirect /blogs (plural) to /blog (singular) for SEO */}
              <Route path="/blogs" element={<Navigate to="/blog" replace />} />
              <Route path="/blogs/*" element={<BlogsRedirect />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
