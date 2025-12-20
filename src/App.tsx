import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import ScrollToTop from "./components/ScrollToTop";
import About from "./pages/About";
import DayHikes from "./pages/DayHikes";
import Events from "./pages/Events";
import ExperienceDetail from "./pages/ExperienceDetail";
import Experiences from "./pages/Experiences";
import Gallery from "./pages/Gallery";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Stay from "./pages/Stay";
import StayDetail from "./pages/StayDetail";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
     <BrowserRouter>
  <ScrollToTop />
  <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />

  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/about" element={<About />} />
    <Route path="/activities" element={<Experiences />} />
    <Route path="/activities/:id" element={<ExperienceDetail />} />
    <Route path="/day-hikes" element={<DayHikes />} />
    <Route path="/stay" element={<Stay />} />
    <Route path="/stay/:id" element={<StayDetail />} />
    <Route path="/gallery" element={<Gallery />} />
    <Route path="/events" element={<Events />} />
    <Route path="*" element={<NotFound />} />
  </Routes>

  {/* Floating WhatsApp Button */}
  {!isLoading && <FloatingWhatsApp />}
</BrowserRouter>

      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
