import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Cloud, Server, Gauge, Globe, HardDrive, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const CloudInfrastructure = () => {
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
              Infrastructure
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground">
              Cloud <span className="gradient-text">Infrastructure</span>
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Scalable GPU-accelerated computing that processes complex models in seconds, not hours
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
              <Cloud size={140} className="text-primary/40 mb-6" />
              <div className="flex flex-wrap gap-6">
                <Server size={56} className="text-blue-400" />
                <Gauge size={56} className="text-green-400" />
                <Globe size={56} className="text-cyan-400" />
                <HardDrive size={56} className="text-purple-400" />
                <Zap size={56} className="text-yellow-400" />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-bold mb-6">Enterprise Cloud Architecture</h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Built on AWS/Azure multi-region infrastructure with GPU-accelerated compute clusters, delivering unlimited
                processing power for rendering, simulation, and batch operations with enterprise-grade reliability.
              </p>

              <h3 className="text-2xl font-bold mt-8 mb-4">Infrastructure Capabilities</h3>
              <ul className="list-disc pl-6 space-y-3 text-muted-foreground text-lg">
                <li>
                  <strong>GPU-Accelerated Processing:</strong> NVIDIA A100/V100 tensor core clusters for real-time ray tracing,
                  FEA simulation, and AI model inference—up to 100x faster than CPU-only processing.
                </li>
                <li>
                  <strong>Auto-Scaling Compute Power:</strong> Kubernetes-orchestrated workloads that scale from 1 to 1000+ nodes
                  automatically based on demand—pay only for actual usage with per-second billing.
                </li>
                <li>
                  <strong>99.9% Uptime SLA:</strong> Multi-AZ deployment with automatic failover, load balancing, health checks,
                  and disaster recovery with RPO .
                </li>
                <li>
                  <strong>Global CDN & Edge Caching:</strong> CloudFront/Azure CDN integration with edge locations in 100+ cities
                  for sub-50ms latency and instant asset delivery worldwide.
                </li>
                <li>
                  <strong>Petabyte-Scale Storage:</strong> S3/Azure Blob tiered storage with lifecycle policies, versioning, and
                  cross-region replication—unlimited capacity with 99.999999999% durability.
                </li>
              </ul>

              <div className="glass-effect p-6 rounded-2xl inline-block mt-8">
                <p className="text-sm text-muted-foreground mb-1">Performance Benchmark</p>
                <p className="text-2xl font-bold gradient-text">Process 10GB CAD assemblies in under 30 seconds</p>
              </div>

              <Link to="/contact">
                <Button size="lg" className="mt-6">
                  Schedule Infrastructure Consultation
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

export default CloudInfrastructure;
