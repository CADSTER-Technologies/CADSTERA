import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Workflow, Boxes, GitBranch, Settings, Layers3, Spline } from "lucide-react";
import { Link } from "react-router-dom";

const ParametricWorkflows = () => {
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
              Design Automation
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground">
              Parametric <span className="gradient-text">Workflows</span>
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Rule-based design systems that adapt automatically to changing requirements and constraints
            </p>
          </motion.div>
        </div>
      </section>

      {/* Technical Details */}
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
              <Workflow size={140} className="text-primary/40 mb-6" />
              <div className="flex flex-wrap gap-6">
                <Boxes size={56} className="text-orange-400" />
                <GitBranch size={56} className="text-teal-400" />
                <Settings size={56} className="text-purple-400" />
                <Layers3 size={56} className="text-blue-400" />
                <Spline size={56} className="text-pink-400" />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-bold mb-6">Constraint-Based Design Engine</h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Build flexible, rule-driven design systems where parameters, constraints, and relationships define geometry
                automatically. Changes propagate instantly through assemblies, drawings, and documentation.
              </p>

              <h3 className="text-2xl font-bold mt-8 mb-4">Technical Features</h3>
              <ul className="list-disc pl-6 space-y-3 text-muted-foreground text-lg">
                <li>
                  <strong>Visual Parameter Editors:</strong> Drag-and-drop interface for defining geometric constraints, equations,
                  and design rules without coding—supports expressions, conditionals, and external data sources.
                </li>
                <li>
                  <strong>Constraint-Based Modeling:</strong> Geometric, dimensional, and assembly constraints with solver algorithms
                  that maintain design intent across complex multi-body systems.
                </li>
                <li>
                  <strong>Dynamic Assemblies:</strong> Intelligent mate conditions, motion studies, and collision detection that update
                  automatically when parameters change—supports 1000+ part assemblies.
                </li>
                <li>
                  <strong>Variant Configuration Systems:</strong> Mass customization engines for product families—generate thousands
                  of design variants from single master model with BOM automation.
                </li>
                <li>
                  <strong>API & Scripting Integration:</strong> Python, JavaScript, and REST API access to parametric engine for
                  external automation, ERP integration, and custom workflows.
                </li>
              </ul>

              <div className="glass-effect p-6 rounded-2xl inline-block mt-8">
                <p className="text-sm text-muted-foreground mb-1">Efficiency Gain</p>
                <p className="text-2xl font-bold gradient-text">90% faster design iteration for configurable products</p>
              </div>

              <Link to="/contact">
                <Button size="lg" className="mt-6">
                  Explore Parametric Solutions
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

export default ParametricWorkflows;
