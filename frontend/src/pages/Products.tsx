import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Box, GitCompare, Eye, Layers, Database, Settings2, LayoutTemplate } from "lucide-react";
import { Link } from "react-router-dom";

const Products = () => {
  const products = [
    {
      icon: Box,
      name: "Converter",
      slug: "converter",
      tagline: "Universal CAD Format Converter",
      description:
        "Transform between 100+ CAD, BIM, and 3D formats with pixel-perfect accuracy. Batch processing, cloud-based conversion, and API-ready for seamless integration into your workflow.",
      features: [
        "100+ Format Support",
        "Batch Conversion Processing",
        "Geometry Validation",
        "Metadata Preservation",
      ],
    },
    {
      icon: GitCompare,
      name: "Comparer",
      slug: "comparer",
      tagline: "Advanced File Comparison Engine",
      description:
        "Compare CAD files, detect changes, and track design evolution with pixel-perfect accuracy. Supports 2D drawings, 3D models, and BIM files with automated comparison reports.",
      features: [
        "Visual Diff Highlighting",
        "Geometry Change Detection",
        "Version Control Integration",
        "Batch File Comparison",
      ],
    },
    {
      icon: Eye,
      name: "Viewer",
      slug: "viewer",
      tagline: "Lightweight 3D Web Viewer",
      description:
        "Zero-install 3D viewer that works in any browser. Perfect for client presentations and team collaboration with measurement tools, annotations, and mobile-responsive design.",
      features: [
        "Browser-Based Viewing",
        "Measurement & Annotation",
        "Collaboration Features",
        "Embeddable Anywhere",
      ],
    },
    {
      icon: Layers,
      name: "Pyrotwin",
      slug: "pyrotwin",
      tagline: "Digital Twin Platform",
      description:
        "Create real-time digital twins of physical assets with automated synchronization, IoT integration, and predictive maintenance capabilities for smart manufacturing and building management.",
      features: [
        "Real-Time Sensor Integration",
        "Automated Model Updates",
        "Performance Simulation",
        "Predictive Maintenance Alerts",
      ],
    },
    {
      icon: Database,
      name: "Data Extractor",
      slug: "data-extractor",
      tagline: "Intelligent CAD Data Mining",
      description:
        "Extract metadata, parameters, and properties from CAD files automatically. Generate comprehensive reports, BOMs, and analytics from your design data with custom field mapping.",
      features: [
        "Automated Metadata Extraction",
        "Custom Data Field Mapping",
        "Batch File Processing",
        "Excel/CSV Export",
      ],
    },
    {
      icon: Settings2,
      name: "Configurator",
      slug: "configurator",
      tagline: "Visual Product Configuration",
      description:
        "Build interactive 3D configurators for products. Enable customers to customize designs in real-time with instant pricing validation, quote generation, and rule-based constraints.",
      features: [
        "Visual Configuration Interface",
        "Real-Time 3D Preview",
        "Rule-Based Validation",
        "Dynamic Pricing Engine",
      ],
    },
    {
      icon: LayoutTemplate,
      name: "Templates",
      slug: "templates",
      tagline: "Smart Design Templates",
      description:
        "Access 200+ pre-built parametric templates for common design tasks. Accelerate workflows with industry-standard templates that adapt to your requirements and enable team sharing.",
      features: [
        "200+ Pre-Built Templates",
        "Parametric Customization",
        "Industry-Specific Libraries",
        "Team Template Sharing",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1e1e_1px,transparent_1px),linear-gradient(to_bottom,#1e1e1e_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground">
              Our <span className="gradient-text">Products</span>
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Complete suite of tools to automate, optimize, and accelerate your engineering workflows
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Link to={`/products/${product.slug}`}>
                  <div className="glass-effect p-10 rounded-3xl h-full hover:shadow-[0_0_20px_#FF6A00] transition-all duration-300 cursor-pointer border border-[#FF6A00]/40">
                    <div className="w-16 h-16 bg-[#FF6A00]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#FF6A00]/20 transition-colors">
                      <product.icon className="text-[#FF8A00]" size={32} />
                    </div>

                    <h3 className="text-3xl font-bold mb-2 text-[#FFB000]">{product.name}</h3>
                    <p className="text-[#FF8A00] mb-4 font-medium">{product.tagline}</p>
                    <p className="text-muted-foreground mb-8 leading-relaxed">{product.description}</p>

                    <div className="space-y-3 mb-8">
                      {product.features.map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-[#FF8A00] rounded-full" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full bg-[#FF6A00] hover:bg-[#FF8A00] text-black font-semibold">
                      Learn More
                    </Button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
