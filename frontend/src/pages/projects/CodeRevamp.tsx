import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Code, Repeat2, Rocket, Shield, TestTube, GitMerge } from "lucide-react";
import { Link } from "react-router-dom";

const CodeRevamp = () => {
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
                            Software Modernization
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground">
                            Viewer Code <span className="gradient-text">Re-vamp</span>
                        </h1>
                        <p className="text-xl text-primary-foreground/80">
                            Complete legacy system refactor with 300% performance boost and scalable architecture
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
                            <Code size={140} className="text-primary/40 mb-6" />
                            <div className="flex flex-wrap gap-6">
                                <Repeat2 size={56} className="text-blue-400" />
                                <Rocket size={56} className="text-red-400" />
                                <Shield size={56} className="text-green-400" />
                                <TestTube size={56} className="text-purple-400" />
                                <GitMerge size={56} className="text-orange-400" />
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
                                <p className="text-primary font-semibold mb-2">Legacy System Modernization</p>
                                <h2 className="text-4xl font-bold mb-6">Project Overview</h2>
                            </div>

                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Completely refactored and modernized ITC's legacy 3D viewer codebase, improving performance by 300%, adding new
                                features, and establishing scalable architecture for future development and third-party integrations.
                            </p>

                            <h3 className="text-2xl font-bold mt-8 mb-4">Key Technical Features</h3>
                            <ul className="list-disc pl-6 space-y-3 text-muted-foreground text-lg">
                                <li>
                                    <strong>Legacy Code Refactoring & Optimization:</strong> Migrated 50K+ lines from jQuery/vanilla JS to React/TypeScript
                                    with modular component architecture and strict type safety.
                                </li>
                                <li>
                                    <strong>Modern Architecture Implementation:</strong> Event-driven design patterns, dependency injection, Redux state
                                    management, and microservices backend with Docker/Kubernetes deployment.
                                </li>
                                <li>
                                    <strong>Performance Bottleneck Elimination:</strong> GPU-accelerated rendering, lazy loading, virtual scrolling,
                                    memoization, and WebAssembly modules for compute-heavy tasks.
                                </li>
                                <li>
                                    <strong>New Feature Module Development:</strong> Real-time collaboration, version history, markup tools, measurement
                                    systems, and plugin SDK for third-party extensions.
                                </li>
                                <li>
                                    <strong>Comprehensive Testing Framework:</strong> 95% code coverage with Jest/React Testing Library, E2E Cypress tests,
                                    visual regression testing, and automated CI/CD pipelines.
                                </li>
                            </ul>

                            <div className="glass-effect p-6 rounded-2xl inline-block mt-8">
                                <p className="text-sm text-muted-foreground mb-1">Project Impact</p>
                                <p className="text-2xl font-bold gradient-text">300% performance boost + 50+ new enterprise features delivered</p>
                            </div>

                            <Link to="/contact">
                                <Button size="lg" className="mt-6">
                                    Discuss Legacy Modernization
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

export default CodeRevamp;
