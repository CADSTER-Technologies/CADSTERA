"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Layers,
  Cone,
  Orbit,
  Cpu,
  Sparkles,
  Radar,
  Database,
  ClipboardList,
  Box,
  FileSearch,
  Zap,
  HelpCircle,
  Users,
  ShieldCheck,
  MonitorCheck,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";

/* -------------------------------------------------------
   UNIVERSAL HOVER CARD WRAPPER (re-usable)
--------------------------------------------------------*/
const HoverCard = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    whileHover={{ scale: 1.03, y: -6 }}
    transition={{ duration: 0.25 }}
    className={`
      bg-[#0f0600]/60 border border-[#FF6A00] rounded-2xl p-6
      shadow-[0_0_22px_#FF6A00]/18 hover:shadow-[0_0_36px_#FF8A00]/30
      transition-all
    `}
  >
    {children}
  </motion.div>
);

/* -------------------------------------------------------
   FEATURE CARD
--------------------------------------------------------*/
const FeatureCard = ({ title, desc, icon: Icon }: { title: string; desc: string; icon: any; }) => (
  <HoverCard>
    <div className="flex items-start gap-4">
      <div className="p-3 rounded-xl bg-[#FF8A00]/10 border border-[#FF8A00]">
        <Icon className="w-6 h-6 text-[#FF8A00]" />
      </div>
      <div>
        <h4 className="text-lg font-semibold text-[#FFB770]">{title}</h4>
        <p className="text-gray-300 mt-1 text-sm">{desc}</p>
      </div>
    </div>
  </HoverCard>
);

/* -------------------------------------------------------
   MAIN PYROTWIN PAGE
--------------------------------------------------------*/
export default function Pyrotwin() {
  return (
    <div className="min-h-screen bg-[#0a0300] text-white relative overflow-hidden">
      {/* animated grid background */}
      <style>{`
        @keyframes gridMove { from { background-position: 0 0 } to { background-position: 60px 60px } }
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#FF6A00]/6 to-transparent rotate-12" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#FF8A00]/6 to-transparent -rotate-12" />
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-24 py-12">
        <header className="max-w-6xl mx-auto text-center mb-16">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <div className="rounded-full p-4 bg-gradient-to-tr from-[#FF8A00]/40 to-[#FFB000]/20 border border-[#FF6A00] shadow-[0_0_25px_#FF6A00]">
              <Layers className="w-10 h-10 text-[#FF8A00]" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight text-[#FF8A00] drop-shadow-[0_0_40px_#FF6A00]"
          >
            PyroTwin —  Professional Engineers
          </motion.h1>

          <p className="mt-6 text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Real-time twin modeling, simulation and design automation tailored for engineering teams — visualize systems, run what-if simulations and deliver production-ready validation.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link to="/products/pyrotwin-demo" className="inline-flex items-center gap-3 bg-[#FF8A00] text-black px-6 py-3 rounded-xl font-semibold shadow-[0_8px_40px_#FF6A00] hover:bg-[#FFB000] transition">
              Request Demo             <ArrowRight className="w-5 h-5" />
            </Link>

            <Link to="/contact" className="text-sm text-gray-300 underline hover:text-[#FFB000] transition">
              Contact Sales
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            {["Digital Twin", "Simulation", "Parametric Models", "AI Optimization", "BOM & Metadata"].map((b) => (
              <span key={b} className="text-xs px-3 py-1 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00] text-[#FFB770]">{b}</span>
            ))}
          </div>
        </header>

        <main className="max-w-6xl mx-auto space-y-20">
          {/* Overview */}
          <section className="grid md:grid-cols-2 gap-12 items-center">
            <HoverCard>
              <div className="h-56 flex items-center justify-center">
                <Cone className="w-20 h-20 text-[#FF8A00]" />
              </div>
            </HoverCard>

            <div>
              <h3 className="text-3xl font-bold text-[#FF8A00] mb-4">Engineered for Professionals</h3>
              <p className="text-gray-300 mb-4 text-lg leading-relaxed">
                PyroTwin brings engineering rigor to digital twins — precise geometry fidelity, parametric updates, and deterministic simulation so teams can trust results for manufacturing and validation.
              </p>

              <ul className="grid gap-3 text-gray-300">
                <li className="flex gap-3 items-start"><Orbit className="w-5 h-5 text-[#FF8A00] mt-1" /> High-fidelity 3D & parametric synchronization</li>
                <li className="flex gap-3 items-start"><Cpu className="w-5 h-5 text-[#FF8A00] mt-1" /> Deterministic simulation & performance prediction</li>
                <li className="flex gap-3 items-start"><Database className="w-5 h-5 text-[#FF8A00] mt-1" /> BOM-aware twins with metadata lineage</li>
              </ul>
            </div>
          </section>

          {/* Features grid */}
          <section>
            <h3 className="text-3xl font-bold text-[#FF8A00] mb-8">Key Capabilities</h3>

            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard title="Real-Time Simulation" desc="Run transient & steady-state simulations with parameter sweeps." icon={Radar} />
              <FeatureCard title="Parametric Twins" desc="Link CAD parameters to system-level behavior and update models automatically." icon={Orbit} />
              <FeatureCard title="AI Optimization" desc="Automated design space exploration and recommendations for manufacturability." icon={Sparkles} />
              <FeatureCard title="BOM & Metadata" desc="Full traceability for parts, revisions and supplier data." icon={Database} />
              <FeatureCard title="Performance Prediction" desc="Estimate thermal, structural and dynamic behavior before prototyping." icon={BarChart3} />
              <FeatureCard title="Automation & APIs" desc="Integrate into CI/CD and PLM pipelines with secure APIs." icon={Zap} />
            </div>
          </section>

          {/* Deep sections */}
          <section className="space-y-12">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h4 className="text-xl font-semibold text-[#FFB000]">Geometry Fidelity & Alignment</h4>
                <p className="text-gray-300 mt-4">Maintain exact CAD geometry, tolerance-aware alignment and mesh-to-BREP reconciliation so simulation inputs and results remain consistent.</p>
              </div>

              <HoverCard>
                <div className="h-48 flex items-center justify-center"><FileSearch className="w-16 h-16 text-[#FF8A00]" /></div>
              </HoverCard>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              <HoverCard>
                <div className="h-48 flex items-center justify-center"><Cpu className="w-16 h-16 text-[#FF8A00]" /></div>
              </HoverCard>

              <div>
                <h4 className="text-xl font-semibold text-[#FFB000]">Deterministic Simulation</h4>
                <p className="text-gray-300 mt-4">Run repeatable simulations with versioned models, parameter control and enterprise-scale compute orchestration.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h4 className="text-xl font-semibold text-[#FFB000]">Integration & Deployment</h4>
                <p className="text-gray-300 mt-4">Deploy PyroTwin on-prem, in private cloud or hybrid setups. Connect PLM, MES and data historians for continuous validation.</p>
              </div>

              <HoverCard>
                <div className="h-48 flex items-center justify-center"><Sparkles className="w-16 h-16 text-[#FF8A00]" /></div>
              </HoverCard>
            </div>
          </section>

          {/* Workflow */}
          <section>
            <h3 className="text-3xl font-bold text-[#FF8A00] mb-8">Typical Workflow</h3>

            <ol className="space-y-6">
              {["Import CAD / Twin Source","Link BOM & Metadata","Define Simulation Scenarios","Run & Analyze","Iterate & Automate"].map((s) => (
                <HoverCard key={s}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FF8A00]/10 border border-[#FF8A00] flex items-center justify-center"><ClipboardList className="w-6 h-6 text-[#FFB000]" /></div>
                    <div className="text-gray-300 text-lg">{s}</div>
                  </div>
                </HoverCard>
              ))}
            </ol>
          </section>

          {/* Use cases */}
          <section>
            <h3 className="text-3xl font-bold text-[#FF8A00] mb-8">Who Benefits</h3>

            <div className="grid md:grid-cols-3 gap-8">
              {[{ t: "Manufacturing", d: "Validate production readiness and tolerance stack-ups.", i: ShieldCheck }, { t: "R&D", d: "Faster iteration with parametric experiments.", i: MonitorCheck }, { t: "Quality", d: "Automated checks, deviation detection and compliance.", i: BarChart3 }].map((u) => (
                <HoverCard key={u.t}>
                  <div className="text-center">
                    <u.i className="w-10 h-10 text-[#FF8A00] mx-auto" />
                    <h4 className="text-[#FFB000] font-semibold mt-3">{u.t}</h4>
                    <p className="text-gray-300 text-sm mt-2">{u.d}</p>
                  </div>
                </HoverCard>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-[#1a0800]/40 border border-[#FF6A00] rounded-2xl p-8">
            <h3 className="text-3xl font-bold text-[#FF8A00] mb-4">Frequently Asked Questions</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <HoverCard>
                <div>
                  <HelpCircle className="w-5 h-5 text-[#FF8A00]" />
                  <p className="text-gray-300 mt-2">Which CAD formats are supported? STEP, IGES, SLDPRT, STL, OBJ, GLB, FBX and more.</p>
                </div>
              </HoverCard>

              <HoverCard>
                <div>
                  <Users className="w-5 h-5 text-[#FF8A00]" />
                  <p className="text-gray-300 mt-2">Enterprise deployment options available (on-prem, VPC, hybrid).</p>
                </div>
              </HoverCard>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center py-12">
            <HoverCard>
              <h3 className="text-4xl font-extrabold text-[#FF8A00] mb-6">Start building engineer-grade twins today</h3>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact" className="inline-flex items-center gap-3 bg-[#FF8A00] text-black px-7 py-3 rounded-xl font-semibold hover:bg-[#FFB000] transition shadow-[0_10px_40px_#FF6A00]">
                  Request Demo
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link to="/docs/pyrotwin" className="inline-flex items-center justify-center px-7 py-3 rounded-xl border border-[#FF6A00] text-[#FFB770] hover:bg-[#FF6A00]/10 transition">
                  See Docs
                </Link>
              </div>
            </HoverCard>
          </section>
        </main>

        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </div>
  );
}
