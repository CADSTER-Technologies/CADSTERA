import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Cone, Microscope, Thermometer, Zap, Boxes, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const SpaceChipReDesign = () => {
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
              Aerospace Engineering
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground">
              Space Chip <span className="gradient-text">Re-Design</span>
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Sub-micron precision engineering with automated thermal analysis and design rule validation
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
              <Cone size={140} className="text-primary/40 mb-6" />
              <div className="flex flex-wrap gap-6">
                <Microscope size={56} className="text-cyan-400" />
                <Thermometer size={56} className="text-red-400" />
                <Zap size={56} className="text-yellow-400" />
                <Boxes size={56} className="text-purple-400" />
                <CheckCircle size={56} className="text-green-400" />
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
                <p className="text-primary font-semibold mb-2">Aerospace Engineering Corp</p>
                <h2 className="text-4xl font-bold mb-6">Project Overview</h2>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Led precision re-design of aerospace-grade microchip components with sub-micron accuracy requirements, including
                automated thermal analysis, design rule checking, and manufacturing optimization for mission-critical space systems.
              </p>

              <h3 className="text-2xl font-bold mt-8 mb-4">Key Technical Features</h3>
              <ul className="list-disc pl-6 space-y-3 text-muted-foreground text-lg">
                <li>
                  <strong>Sub-micron Precision CAD Modeling:</strong> Parametric design down to 0.1µm tolerance using advanced
                  constraint-based algorithms and GD&T annotation systems.
                </li>
                <li>
                  <strong>Automated Thermal Stress Analysis:</strong> FEA integration with ANSYS/COMSOL for radiation, vacuum,
                  and extreme temperature simulation (-270°C to +150°C).
                </li>
                <li>
                  <strong>Design Rule Validation Engine:</strong> Real-time DRC against IPC-2221, JEDEC standards, and custom
                  space-grade manufacturing constraints.
                </li>
                <li>
                  <strong>Manufacturing Constraint Optimization:</strong> Yield analysis, defect prediction, and automated layout
                  adjustments for photolithography compatibility.
                </li>
                <li>
                  <strong>Multi-layer Component Automation:</strong> Stack-up management, via placement optimization, and signal
                  integrity verification across 12+ metal layers.
                </li>
              </ul>

              <div className="glass-effect p-6 rounded-2xl inline-block mt-8">
                <p className="text-sm text-muted-foreground mb-1">Project Impact</p>
                <p className="text-2xl font-bold gradient-text">Mission-critical precision for satellite deployment systems</p>
              </div>

              <Link to="/contact">
                <Button size="lg" className="mt-6">
                  Explore Precision Engineering
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

export default SpaceChipReDesign;
