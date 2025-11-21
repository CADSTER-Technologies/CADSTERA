import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { FeatureCard } from "@/components/FeatureCard";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Box, Zap, Network, Sparkles, Globe, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Index = () => {
  const location = useLocation();

  // ⭐ Auto-scroll to footer when coming from /?scroll=footer
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const scroll = params.get("scroll");

    if (scroll === "footer") {
      const timeout = setTimeout(() => {
        const footerEl = document.getElementById("footer");
        footerEl?.scrollIntoView({ behavior: "smooth" });
      }, 400);

      return () => clearTimeout(timeout);
    }
  }, [location.search]);

  const features = [
    {
      icon: Box,
      title: "3D Modeling",
      description:
        "Advanced CAD automation that transforms engineering with intelligent 3D modeling capabilities.",
    },
    {
      icon: Zap,
      title: "Instant Automation",
      description:
        "Reduces hours of manual work into seconds with AI-powered automation.",
    },
    {
      icon: Network,
      title: "BIM Integration",
      description:
        "Connects all aspects of your project with seamless BIM integration.",
    },
    {
      icon: Sparkles,
      title: "AI-Powered",
      description:
        "AI that learns from your designs and optimizes every detail automatically.",
    },
    {
      icon: Globe,
      title: "Cloud Sync",
      description:
        "Real-time collaboration and cloud sync for teams anywhere in the world.",
    },
    {
      icon: Layers,
      title: "Multi-Platform",
      description:
        "Works across all major CAD platforms with universal integration.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />

      {/* FEATURES SECTION */}
      <section className="py-32 bg-background relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(234,92,42,0.1),transparent_50%)]" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Why Choose <span className="gradient-text">Cadster</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience next-gen engineering automation with powerful tools
              designed for modern professionals.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(234,92,42,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-[slide_15s_linear_infinite]" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-primary-foreground">
              Ready to Transform Your Workflow?
            </h2>

            <p className="text-xl text-primary-foreground/80 mb-12">
              Join thousands of engineers who trust Cadster to automate and
              accelerate their projects.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="text-lg px-10 animate-pulse-glow">
                Start Free Trial
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="text-lg px-10 bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER WITH ID */}
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
