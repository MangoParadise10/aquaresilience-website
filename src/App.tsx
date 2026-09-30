import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/site/Layout";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import WhyDignoria from "./pages/WhyDignoria.tsx";
import WhatWeDo from "./pages/WhatWeDo.tsx";
import WhoWeServe from "./pages/WhoWeServe.tsx";
import OurApproach from "./pages/OurApproach.tsx";
import Insights from "./pages/Insights.tsx";
import JoinUs from "./pages/JoinUs.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/why-dignoria" element={<WhyDignoria />} />
            <Route path="/what-we-do" element={<WhatWeDo />} />
            <Route path="/who-we-serve" element={<WhoWeServe />} />
            <Route path="/our-approach" element={<OurApproach />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/solution" element={<Navigate to="/what-we-do" replace />} />
            <Route path="/join" element={<JoinUs />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
