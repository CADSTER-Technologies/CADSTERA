import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Cpu, Brain, Zap, TrendingUp, Sparkles, Network } from "lucide-react";
import { Link } from "react-router-dom";

const AiAutomation = () => {
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
              Intelligent Automation
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground">
              AI-Powered <span className="gradient-text">Automation</span>
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Machine learning algorithms that understand design patterns and automate engineering workflows intelligently
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
              <Cpu size={140} className="text-primary/40 mb-6" />
              <div className="flex flex-wrap gap-6">
                <Brain size={56} className="text-purple-400" />
                <Zap size={56} className="text-yellow-400" />
                <TrendingUp size={56} className="text-green-400" />
                <Sparkles size={56} className="text-pink-400" />
                <Network size={56} className="text-blue-400" />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-bold mb-6">Advanced AI Technology Stack</h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Our AI automation platform leverages deep learning, computer vision, and reinforcement learning to understand
                engineering design patterns, predict user intent, and execute complex modeling tasks with minimal human intervention.
              </p>

              <h3 className="text-2xl font-bold mt-8 mb-4">Core Capabilities</h3>
              <ul className="list-disc pl-6 space-y-3 text-muted-foreground text-lg">
                <li>
                  <strong>Pattern Recognition & Learning:</strong> Convolutional neural networks trained on 10M+ CAD drawings to
                  identify design patterns, standard components, and geometric constraints automatically.
                </li>
                <li>
                  <strong>Predictive Design Assistance:</strong> Transformer-based models suggest next design actions, component
                  placements, and parameter values based on historical project data and industry best practices.
                </li>
                <li>
                  <strong>Automated Feature Extraction:</strong> Computer vision algorithms detect holes, slots, edges, and complex
                  surfaces from 2D/3D models with 98%+ accuracy for downstream automation.
                </li>
                <li>
                  <strong>Natural Language Processing:</strong> Voice and text commands for CAD operations—"create a 50mm bolt pattern"
                  or "align components to centerline" executed in real-time.
                </li>
                <li>
                  <strong>Reinforcement Learning Optimization:</strong> AI agents learn optimal design workflows through simulation,
                  reducing modeling time by 80% and eliminating repetitive manual operations.
                </li>
              </ul>

              <div className="glass-effect p-6 rounded-2xl inline-block mt-8">
                <p className="text-sm text-muted-foreground mb-1">Performance Metrics</p>
                <p className="text-2xl font-bold gradient-text">80% reduction in modeling time across enterprise deployments</p>
              </div>

              <Link to="/contact">
                <Button size="lg" className="mt-6">
                  Request AI Demo
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

export default AiAutomation;
