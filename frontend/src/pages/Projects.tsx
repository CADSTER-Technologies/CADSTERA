import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Building2, Factory, Eye, Cpu, Code } from "lucide-react";
import { Link } from "react-router-dom";

const Projects = () => {
  const projects = [
    {
      icon: Building2,
      title: "Models Integration in AutoCAD",
      client: "Enterprise Construction Solutions",
      description:
        "Developed seamless integration between cloud platform and AutoCAD, enabling automated model synchronization, real-time collaboration, and intelligent data mapping for construction projects.",
      impact: "70% faster model sync",
      category: "BIM Integration",
      link: "/projects/models-integration",
      points: [
        "Cloud-to-CAD synchronization engine",
        "Automated model update pipeline",
        "Real-time collaboration features",
        "Custom API integration layer",
        "Multi-user conflict resolution system"
      ]
    },
    {
      icon: Factory,
      title: "AutoCAD Plant3D Spec Implementation",
      client: "Industrial Engineering Solutions",
      description:
        "Implemented comprehensive specification systems for AutoCAD Plant3D and Civil3D workflows, including custom spec databases, automated piping/grading calculations, and intelligent component libraries.",
      impact: "85% spec compliance rate",
      category: "Plant & Infrastructure",
      link: "/projects/autocad-plant3d",
      points: [
        "Custom Plant3D spec database creation",
        "Civil3D grading automation engine",
        "Piping component auto-selection",
        "Material takeoff automation",
        "Industry-standard compliance validation"
      ]
    },
    {
      icon: Cpu,
      title: "Space Chip Re-Design",
      client: "Aerospace Engineering Corp",
      description:
        "Led precision re-design of aerospace-grade microchip components with sub-micron accuracy requirements, including thermal analysis automation, design rule checking, and manufacturing optimization.",
      impact: "Mission-critical precision",
      category: "Aerospace Engineering",
      link: "/projects/space-chip-redesign",
      points: [
        "Sub-micron precision CAD modeling",
        "Automated thermal stress analysis",
        "Design rule validation engine",
        "Manufacturing constraint optimization",
        "Multi-layer component automation"
      ]
    },
    {
      icon: Eye,
      title: "Digital Twin Viewer Integration",
      client: "Smart Building Technologies",
      description:
        "Integrated advanced 3D digital twin viewer into WerqWise platform, enabling real-time asset visualization, IoT sensor data overlay, and interactive facility management for smart buildings.",
      impact: "Real-time asset monitoring",
      category: "Digital Twin",
      link: "/projects/digital-twin-viewer",
      points: [
        "Real-time 3D viewer integration",
        "IoT sensor data visualization",
        "Asset tracking & management UI",
        "Interactive facility navigation",
        "Performance analytics dashboard"
      ]
    },
    {
      icon: Code,
      title: "Viewer Code Re-vamp",
      client: "Legacy System Modernization",
      description:
        "Completely refactored and modernized ITC's legacy 3D viewer codebase, improving performance by 300%, adding new features, and establishing scalable architecture for future development.",
      impact: "300% performance boost",
      category: "Software Modernization",
      link: "/projects/code-revamp",
      points: [
        "Legacy code refactoring & optimization",
        "Modern architecture implementation",
        "Performance bottleneck elimination",
        "New feature module development",
        "Comprehensive testing framework"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
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
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground">
              Success <span className="gradient-text">Stories</span>
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Real projects, real impact. Engineering excellence delivered across industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="space-y-24">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Image / Icon Block */}
                <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <div className="relative aspect-video rounded-3xl overflow-hidden glass-effect group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <project.icon
                        className="text-primary/30 group-hover:text-primary/50 transition-colors"
                        size={120}
                      />
                    </div>
                    <div className="absolute top-6 left-6">
                      <span className="glass-effect px-4 py-2 rounded-full text-sm font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                  <div className="space-y-6">
                    <div>
                      <p className="text-primary font-semibold mb-2">{project.client}</p>
                      <h2 className="text-4xl font-bold mb-4">{project.title}</h2>
                    </div>

                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>

                    {/* 5 Points */}
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      {project.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>

                    {/* Impact Box */}
                    <div className="glass-effect p-6 rounded-2xl inline-block">
                      <p className="text-sm text-muted-foreground mb-1">Project Impact</p>
                      <p className="text-2xl font-bold gradient-text">{project.impact}</p>
                    </div>

                    {/* Button */}
                    <Link to={project.link}>
                      <Button size="lg" className="mt-4">
                        View Case Study
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
