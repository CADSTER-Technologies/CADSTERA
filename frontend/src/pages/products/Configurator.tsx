import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Settings2, Wrench, Layers3, ListChecks, Clock, Spline } from "lucide-react";

const Configurator = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-secondary relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground">
              Dynamic <span className="gradient-text">Configurator</span>
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Rule-driven configuration for complex CAD, PLM, and industrial engineering workflows
            </p>
          </motion.div>
        </div>
      </section>

      {/* Technical Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Icons Block */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-8"
            >
              <Settings2 size={120} className="text-primary/40 mb-6" />
              <div className="flex flex-wrap gap-6">
                <Wrench size={48} className="text-orange-400" />
                <Layers3 size={48} className="text-teal-400" />
                <ListChecks size={48} className="text-emerald-400" />
                <Clock size={48} className="text-indigo-400" />
                <Spline size={48} className="text-pink-400" />
              </div>
            </motion.div>
            {/* Content Block */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold mb-4 text-primary-foreground">
                Enterprise-grade Configuration Platform
              </h2>
              <ul className="list-disc pl-6 text-lg text-muted-foreground space-y-4">
                <li>
                  <strong>Parametric Assembly Generation:</strong> Automate rule-based assemblies, support CAD/BIM constraints, and variant management for advanced PLM.
                </li>
                <li>
                  <strong>Domain-Specific Validation:</strong> Built-in constraint logic for ISO, IPC, or company proprietary engineering rules.
                </li>
                <li>
                  <strong>Live Digital Twin Integration:</strong> Real-time change propagation for system-of-systems simulation and rapid impact analysis.
                </li>
                <li>
                  <strong>Batch/API-Driven Processing:</strong> Configure fleets of products or facilities through robust SDK and REST/GraphQL API endpoints.
                </li>
                <li>
                  <strong>Deployment Across Domains:</strong> Used in aerospace, power engineering, electronics, HVAC, with file I/O for STEP, DXF, JSON, and more.
                </li>
              </ul>
              <div className="glass-effect p-6 rounded-2xl inline-block mt-6">
                <p className="text-sm text-muted-foreground mb-1">Industry Impact</p>
                <p className="text-2xl font-bold gradient-text">
                  Reduced design cycle time by 80% for modular equipment manufacturers
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Configurator;
