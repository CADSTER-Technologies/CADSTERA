import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Rocket, Package, Code, Plug, Terminal, Boxes } from "lucide-react";
import { Link } from "react-router-dom";

const RapidDeployment = () => {
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
              Integration & Deployment
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground">
              Rapid <span className="gradient-text">Deployment</span>
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Get started in minutes with plug-and-play integrations for all major CAD platforms
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
              <Rocket size={140} className="text-primary/40 mb-6" />
              <div className="flex flex-wrap gap-6">
                <Package size={56} className="text-orange-400" />
                <Code size={56} className="text-blue-400" />
                <Plug size={56} className="text-green-400" />
                <Terminal size={56} className="text-purple-400" />
                <Boxes size={56} className="text-pink-400" />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-bold mb-6">Developer-First Integration Platform</h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Comprehensive integration toolkit with native plugins, REST APIs, SDKs, and CLI tools that enable deployment
                in minutes—not weeks. Pre-built connectors for 50+ CAD/PLM/BIM platforms.
              </p>

              <h3 className="text-2xl font-bold mt-8 mb-4">Integration Tools</h3>
              <ul className="list-disc pl-6 space-y-3 text-muted-foreground text-lg">
                <li>
                  <strong>Native CAD Plugins:</strong> AutoCAD, SolidWorks, Inventor, Revit, CATIA plugins with ribbon UI,
                  command-line access, and automatic updates—install in under 2 minutes.
                </li>
                <li>
                  <strong>RESTful API & GraphQL:</strong> Complete API coverage with OpenAPI/Swagger docs, rate limiting (10K
                  requests/hour), OAuth 2.0 authentication, and 99.9% uptime SLA.
                </li>
                <li>
                  <strong>Webhooks & Event Streaming:</strong> Real-time notifications via webhooks, Kafka event streams, and
                  WebSocket connections for live data sync and workflow automation.
                </li>
                <li>
                  <strong>CLI & Automation Tools:</strong> Cross-platform command-line tools for batch operations, CI/CD integration,
                  Docker containers, and infrastructure-as-code with Terraform/Ansible.
                </li>
                <li>
                  <strong>SDK Libraries:</strong> Official SDKs for Python (pip install cadster), JavaScript/TypeScript (npm install
                  @cadster/sdk), Go, C#, and Java with comprehensive docs and code examples.
                </li>
              </ul>

              <div className="glass-effect p-6 rounded-2xl inline-block mt-8">
                <p className="text-sm text-muted-foreground mb-1">Time to Value</p>
                <p className="text-2xl font-bold gradient-text">Full deployment in under 15 minutes for most platforms</p>
              </div>

              <Link to="/contact">
                <Button size="lg" className="mt-6">
                  Access Developer Resources
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

export default RapidDeployment;
