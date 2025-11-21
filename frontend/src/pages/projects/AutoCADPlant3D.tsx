import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Factory, Wrench, Database, FileCheck, Layers, Ruler } from "lucide-react";
import { Link } from "react-router-dom";

const AutoCADPlant3D = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(234,92,42,0.15),transparent_70%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="glass-effect px-4 py-2 rounded-full text-sm font-medium inline-block mb-6">
              Plant & Infrastructure
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground">
              AutoCAD <span className="gradient-text">Plant3D</span> Implementation
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Comprehensive spec systems with automated piping calculations and intelligent component libraries
            </p>
          </motion.div>
        </div>
      </section>

      {/* Details */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Icons */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-8"
            >
              <Factory size={140} className="text-primary/40 mb-6" />
              <div className="flex flex-wrap gap-6">
                <Wrench size={56} className="text-orange-400" />
                <Database size={56} className="text-teal-400" />
                <FileCheck size={56} className="text-green-400" />
                <Layers size={56} className="text-indigo-400" />
                <Ruler size={56} className="text-pink-400" />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <p className="text-primary font-semibold mb-2">Industrial Engineering Solutions</p>
                <h2 className="text-4xl font-bold mb-6">Project Overview</h2>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Implemented comprehensive specification systems for AutoCAD Plant3D and Civil3D workflows, including custom spec
                databases, automated piping/grading calculations, and intelligent component libraries for process engineering.
              </p>

              <h3 className="text-2xl font-bold mt-8 mb-4">Key Technical Features</h3>
              <ul className="list-disc pl-6 space-y-3 text-muted-foreground text-lg">
                <li>
                  <strong>Custom Plant3D Spec Database Creation:</strong> Industry-standard specs for ASME, ANSI, DIN piping with
                  automated BOM generation and P&ID integration.
                </li>
                <li>
                  <strong>Civil3D Grading Automation Engine:</strong> Terrain modeling with cut/fill analysis, drainage optimization,
                  and slope compliance validation.
                </li>
                <li>
                  <strong>Piping Component Auto-Selection:</strong> AI-driven component picker based on pressure ratings, material
                  compatibility, and cost optimization.
                </li>
                <li>
                  <strong>Material Takeoff Automation:</strong> Real-time quantity extraction, cost estimation, and ERP/procurement
                  system integration via APIs.
                </li>
                <li>
                  <strong>Industry-Standard Compliance Validation:</strong> Built-in rules for ISO 15926, ASME B31.3, and
                  custom corporate engineering standards.
                </li>
              </ul>

              <div className="glass-effect p-6 rounded-2xl inline-block mt-8">
                <p className="text-sm text-muted-foreground mb-1">Project Impact</p>
                <p className="text-2xl font-bold gradient-text">85% spec compliance rate for major petrochemical projects</p>
              </div>

              <Link to="/contact">
                <Button size="lg" className="mt-6">
                  Request Plant3D Consultation
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AutoCADPlant3D;
