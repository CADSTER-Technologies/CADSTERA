import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { FeatureCard } from "@/components/FeatureCard";
import LogoSlider from "@/components/LogoSlider";
import { Cpu, GitBranch, Cloud, Shield, Rocket, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Solutions = () => {
  const navigate = useNavigate();

  const solutions = [
    {
      icon: Cpu,
      title: "AI-Powered Automation",
      description:
        "Machine learning algorithms that understand your design patterns and automate repetitive tasks intelligently. Reduce modeling time by 80% and eliminate manual errors with predictive design assistance.",
      link: "/solutions/ai-automation",
    },
    {
      icon: GitBranch,
      title: "Parametric Workflows",
      description:
        "Create flexible, rule-based designs that adapt automatically to changing requirements and constraints. Visual parameter editors, constraint-based modeling, and dynamic assemblies for maximum efficiency.",
      link: "/solutions/parametric-workflows",
    },
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description:
        "Scalable cloud computing that processes complex models and renders in seconds, not hours. GPU-accelerated processing with 99.9% uptime SLA and auto-scaling compute power for unlimited performance.",
      link: "/solutions/cloud-infrastructure",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Bank-level encryption and compliance with industry standards to protect your intellectual property. ISO 27001 & SOC 2 compliant with GDPR compliance, SSO integration, and comprehensive audit logging.",
      link: "/solutions/enterprise-security",
    },
    {
      icon: Rocket,
      title: "Rapid Deployment",
      description:
        "Get started in minutes with our plug-and-play integrations for all major CAD platforms. Native plugins, REST API, webhooks, CLI tools, and SDK libraries for Python, JavaScript, and Go.",
      link: "/solutions/rapid-deployment",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Real-time multi-user editing, version control, and communication tools built for engineering teams. Comment system, change tracking, activity feeds, and seamless Slack/Teams integration.",
      link: "/solutions/team-collaboration",
    },
  ];

  // Logo slider data
  const platformLogos = [
    { src: "/logos/autocad.png", alt: "AutoCAD" },
    { src: "/logos/solidworks.png", alt: "SolidWorks" },
    { src: "/logos/unreal.png", alt: "Unreal Engine" },
    { src: "/logos/fusion360.png", alt: "Fusion 360" },
    { src: "/logos/solidedge.png", alt: "Solid Edge" },
    { src: "/logos/revit.png", alt: "Revit" },
    { src: "/logos/windchill.png", alt: "Windchill" },
    { src: "/logos/unity.png", alt: "Unity" },
    { src: "/logos/catia.png", alt: "CATIA" },
    { src: "/logos/rhino.png", alt: "Rhino" },
    { src: "/logos/creo.png", alt: "PTC Creo" },
    { src: "/logos/inventor.png", alt: "Inventor" },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-black relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Advanced <span className="text-[#e95c2a]">Solutions</span>
            </h1>
            <p className="text-xl text-gray-300">
              Enterprise-grade technology powering intelligent automation across engineering workflows
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-white">Comprehensive Technology Stack</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Built on proven technologies with innovative approaches to solve complex engineering challenges and accelerate your design workflows
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div
                key={solution.title}
                onClick={() => navigate(solution.link)}
                className="cursor-pointer transition-all hover:scale-[1.02] hover:shadow-xl rounded-2xl"
              >
                <FeatureCard
                  icon={solution.icon}
                  title={solution.title}
                  description={solution.description}
                  delay={index * 0.1}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logo Slider Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Universal Platform Integration
            </h2>
            <p className="text-xl text-gray-300">
              Seamless compatibility with 50+ major CAD, BIM, game engines, and PLM platforms
            </p>
          </motion.div>
          {/* Logo Slider */}
          <LogoSlider logos={platformLogos} speed={60} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Solutions;
