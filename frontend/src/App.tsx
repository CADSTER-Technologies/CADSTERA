import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "./components/ScrollToTop";
import { Navigation } from "./components/Navigation";

// Main Pages
import Index from "./pages/Index";
import Products from "./pages/Products";
import Projects from "./pages/Projects";
import Solutions from "./pages/Solutions";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Legal Pages
import License from "./pages/License";
import Legal from "./pages/Legal";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

// Product Detail Pages
import Converter from "./pages/products/Converter";
import Comparer from "./pages/products/Comparer";
import Viewer from "./pages/products/Viewer";
import FireworksTwiner from "./pages/products/Fireworks Twiner";
import Extractor from "./pages/products/Extractor";
import Templator from "./pages/products/Templator";
import Configurator from "./pages/products/Configurator";


// Tools Pages
import PDFComparer from "./pages/tools/PDFComparer";
import DataExtractor from "./pages/tools/DataExtractor";
import Configurator3D from "./pages/tools/Configurator3D";
import Converters from './pages/tools/Converters';
import Converterss from './pages/tools/Converters';
import Viewers from './pages/tools/Viewers';
import Templators from './pages/tools/Templators';
import CrackerVision from './pages/tools/CrackerVision';

// import Viewerss from '.pages/tools/Viewerss';

// Project Case Study Pages
import AutoCADPlant3D from "./pages/projects/AutoCADPlant3D";
import CodeRevamp from "./pages/projects/CodeRevamp";
import DigitalTwinViewer from "./pages/projects/DigitalTwinViewer";
import ModelsIntegration from "./pages/projects/ModelsIntegration";
import SpaceChipReDesign from "./pages/projects/SpaceChipReDesign";

// Solution Pages
import AiAutomation from "@/pages/solutions/AiAutomation";
import ParametricWorkflows from "@/pages/solutions/ParametricWorkflows";
import CloudInfrastructure from "@/pages/solutions/CloudInfrastructure";
import EnterpriseSecurity from "@/pages/solutions/EnterpriseSecurity";
import RapidDeployment from "@/pages/solutions/RapidDeployment";
import TeamCollaboration from "@/pages/solutions/TeamCollaboration";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <BrowserRouter>
        <ScrollToTop />
        <Navigation />

        <main className="pt-16">
          <Routes>
            {/* Main Pages */}
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* Product Detail Pages */}
            <Route path="/products/converter" element={<Converter />} />
            <Route path="/products/comparer" element={<Comparer />} />
            <Route path="/products/viewer" element={<Viewer />} />
            <Route path="/products/Fireworks Twiner" element={<FireworksTwiner />} />
            <Route path="/products/Extractor" element={<Extractor />} />
            <Route path="/products/templator" element={<Templator />} />
            <Route path="/products/configurator" element={<Configurator />} />

            {/* Tools Pages */}

            <Route path="/tools/PDFComparer" element={<PDFComparer />} />
            <Route path="/tools/DataExtractor" element={<DataExtractor />} />
            <Route path="/tools/Configurator3D" element={<Configurator3D />} />
            <Route path="/tools/Viewers" element={<Viewers />} />
            {/* <Route path="/tools/Viewerss" element={<Viewerss />} /> */}
            <Route path="/tools/converters" element={<Converters />} />
            <Route path="/tools/converterss" element={<Converterss />} />
            <Route path="/tools/templators" element={<Templators />} />
            <Route path="/tools/cracker-vision" element={<CrackerVision />} />



            {/* Project Case Study Pages */}
            <Route path="/projects/autocad-plant3d" element={<AutoCADPlant3D />} />
            <Route path="/projects/space-chip-redesign" element={<SpaceChipReDesign />} />
            <Route path="/projects/code-revamp" element={<CodeRevamp />} />
            <Route path="/projects/digital-twin-viewer" element={<DigitalTwinViewer />} />
            <Route path="/projects/models-integration" element={<ModelsIntegration />} />

            {/* Solution Pages */}
            <Route path="/solutions/ai-automation" element={<AiAutomation />} />
            <Route path="/solutions/parametric-workflows" element={<ParametricWorkflows />} />
            <Route path="/solutions/cloud-infrastructure" element={<CloudInfrastructure />} />
            <Route path="/solutions/enterprise-security" element={<EnterpriseSecurity />} />
            <Route path="/solutions/rapid-deployment" element={<RapidDeployment />} />
            <Route path="/solutions/team-collaboration" element={<TeamCollaboration />} />

            {/* Legal Pages */}
            <Route path="/license" element={<License />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/legal" element={<Legal />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;