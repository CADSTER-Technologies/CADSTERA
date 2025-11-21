import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Puzzle, Cloud, Zap, Database, GitBranch, ArrowLeftRight } from "lucide-react";
import { Link } from "react-router-dom";

const ModelsIntegration = () => {
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
              BIM Integration
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground">
              Models Integration in <span className="gradient-text">AutoCAD</span>
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Seamless cloud-to-CAD synchronization with real-time collaboration and intelligent data mapping
            </p>
          </motion.div>
        </div>
      </section>

      {/* Details */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Icon Visual */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-8"
            >
              <Puzzle size={140} className="text-primary/40 mb-6" />
              <div className="flex flex-wrap gap-6">
                <Cloud size={56} className="text-blue-400" />
                <Zap size={56} className="text-yellow-400" />
                <Database size={56} className="text-green-400" />
                <GitBranch size={56} className="text-pink-400" />
                <ArrowLeftRight size={56} className="text-purple-400" />
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
                <p className="text-primary font-semibold mb-2">Enterprise Construction Solutions</p>
                <h2 className="text-4xl font-bold mb-6">Project Overview</h2>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Developed seamless integration between cloud platforms and AutoCAD, enabling automated model synchronization,
                real-time multi-user collaboration, and intelligent data mapping for large-scale construction projects.
              </p>

              <h3 className="text-2xl font-bold mt-8 mb-4">Key Technical Features</h3>
              <ul className="list-disc pl-6 space-y-3 text-muted-foreground text-lg">
                <li>
                  <strong>Cloud-to-CAD Synchronization Engine:</strong> Bidirectional sync with AWS S3/Azure Blob storage,
                  version-controlled merge strategies, and conflict resolution for distributed teams.
                </li>
                <li>
                  <strong>Automated Model Update Pipeline:</strong> CI/CD-style automation for drawing updates, change detection,
                  and notification workflows integrated with Slack/Teams.
                </li>
                <li>
                  <strong>Real-time Collaboration Features:</strong> WebSocket-based live cursors, annotation layers, and
                  markup sync across AutoCAD, Revit, and web viewers.
                </li>
                <li>
                  <strong>Custom API Integration Layer:</strong> RESTful and GraphQL endpoints with OAuth 2.0 security,
                  rate limiting, and webhook triggers for external PLM/ERP systems.
                </li>
                <li>
                  <strong>Multi-user Conflict Resolution System:</strong> Intelligent merge algorithms with visual diff tools,
                  attribute-level tracking, and audit logs compliant with ISO 19650.
                </li>
              </ul>

              <div className="glass-effect p-6 rounded-2xl inline-block mt-8">
                <p className="text-sm text-muted-foreground mb-1">Project Impact</p>
                <p className="text-2xl font-bold gradient-text">70% faster model sync across 12 global offices</p>
              </div>

              <Link to="/contact">
                <Button size="lg" className="mt-6">
                  Discuss Your Integration Needs
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

export default ModelsIntegration;
