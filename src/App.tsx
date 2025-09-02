import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import AnalyzeHub from "./pages/AnalyzeHub";
import ReportViewer from "./pages/ReportViewer";
import Integrations from "./pages/Integrations";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/analyze" element={<AnalyzeHub />} />
            <Route path="/report/:reportId" element={<ReportViewer />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/dashboard" element={<div className="p-8 text-center text-muted-foreground">Dashboard coming soon...</div>} />
            <Route path="/learn" element={<div className="p-8 text-center text-muted-foreground">Learn section coming soon...</div>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
