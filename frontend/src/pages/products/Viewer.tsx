"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Eye,
  Cone,
  Orbit,
  Layers,
  Ruler,
  Cpu,
  ZoomIn,
  ZoomOut,
  Sparkles,
  FileSearch,
  Share,
  Camera,
  Code,
  GitBranch,
  HelpCircle,
  Users,
  MonitorSmartphone,
  ArrowRight,          // ✅ FIXED
} from "lucide-react"; // ❗ Removed invalid icons: Move3D, Box, cube
import { Link } from "react-router-dom";

/* -------------------------------------------------------
   UNIVERSAL HOVER CARD
--------------------------------------------------------*/
const HoverCard = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -4 }}
    transition={{ duration: 0.25 }}
    className="
      bg-[#1a0f00]/60 border border-[#FF6A00] rounded-2xl p-6
      shadow-[0_0_25px_#FF6A00]/20 hover:shadow-[0_0_40px_#FF8A00]
      transition-all
    "
  >
    {children}
  </motion.div>
);

/* -------------------------------------------------------
   FEATURE CARD
--------------------------------------------------------*/
const FeatureCard = ({
  title,
  desc,
  icon: Icon,
}: {
  title: string;
  desc: string;
  icon: any;
}) => (
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
   MAIN VIEWER PAGE
--------------------------------------------------------*/
export default function Viewer() {
  return (
    <>
      {/* Grid animation */}
      <style>{`
        @keyframes gridMove {
          from { background-position: 0 0; }
          to   { background-position: 60px 60px; }
        }
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-[0]">
        <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-br from-transparent via-[#FF8A00]/5 to-transparent rotate-12" />
        <div className="absolute right-0 bottom-0 w-full h-full bg-gradient-to-tr from-transparent via-[#FF6A00]/5 to-transparent -rotate-12" />
      </div>

      <div
        className="
          min-h-screen text-white px-6 md:px-12 lg:px-24 py-12
          bg-[#0a0300] relative overflow-hidden
          before:absolute before:inset-0
          before:bg-[linear-gradient(to_right,rgba(255,120,0,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,120,0,0.10)_1px,transparent_1px)]
          before:bg-[size:60px_60px]
          before:animate-[gridMove_13s_linear_infinite]
          before:opacity-40
        "
      >
        <div className="relative z-10">
          {/* HERO */}
          <header className="max-w-6xl mx-auto text-center mb-20">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 mb-4"
            >
              <div className="rounded-full p-4 bg-gradient-to-tr from-[#FF8A00]/40 to-[#FFB000]/20 border border-[#FF6A00] shadow-[0_0_25px_#FF6A00]">
                <Eye className="w-10 h-10 text-[#FF8A00]" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-extrabold leading-tight text-[#FF8A00]"
            >
               3D Model Viewer
            </motion.h1>

            <p className="mt-6 text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
              Advanced geometry viewer supporting CAD models, meshes,
              assemblies, technical drawings, textures and materials —
              powered by real-time rendering and engineering-grade precision.
            </p>

            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                to="/products/viewer-tool"
                className="inline-flex items-center gap-3 bg-[#FF8A00] text-black px-6 py-3 rounded-xl font-semibold shadow-[0_8px_40px_#FF6A00] hover:bg-[#FFB000] transition"
              >
                Launch Viewer Tool
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/contact"
                className="text-sm text-gray-300 underline hover:text-[#FFB000] transition"
              >
                Contact Support
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              {[
                "STEP • IGES • SLDPRT",
                "STL • OBJ • GLB • FBX",
                "DWG • DXF • SVG",
                "Textures • Materials • UV Maps",
              ].map((b) => (
                <span
                  key={b}
                  className="text-xs px-3 py-1 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00] text-[#FFB770]"
                >
                  {b}
                </span>
              ))}
            </div>
          </header>

          {/* MAIN CONTENT */}
          <main className="max-w-6xl mx-auto space-y-24">

            {/* FEATURES */}
            <section>
              <h3 className="text-3xl font-bold text-[#FF8A00] mb-10">
                Core Viewer Capabilities
              </h3>

              <div className="grid md:grid-cols-3 gap-8">
                <FeatureCard title="360° Orbit & Pan" desc="Engineering camera controller with Free Orbit, Turntable, and FPS modes." icon={Orbit} />
                <FeatureCard title="Precise Measurement" desc="Distance, angle, radius, thickness and section-based accuracy." icon={Ruler} />
                <FeatureCard title="Material & Shading" desc="PBR, wireframe, X-ray, silhouette, curvature, and real-time shadows." icon={Sparkles} />
                <FeatureCard title="Assembly Exploration" desc="Expand, isolate, cross-section and explode animation tools." icon={Layers} />
                <FeatureCard title="Model Metadata" desc="Volume, area, mass-props, materials, hierarchy & feature tree." icon={FileSearch} />
                <FeatureCard title="Screenshot Export" desc="Capture HD renders with custom background & camera presets." icon={Camera} />
              </div>
            </section>

            {/* ADVANCED */}
            <section className="space-y-16">
              <h3 className="text-3xl font-bold text-[#FF8A00]">
                Advanced Engineering Tools
              </h3>

              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <h4 className="text-lg font-semibold text-[#FFB000]">Section Views & Cut Analysis</h4>
                  <p className="text-gray-300 mt-4">
                    Create planar, radial and multi-axis section cuts with automatic silhouette
                    generation and edge detection for manufacturing inspections.
                  </p>
                </div>

                <HoverCard>
                  <div className="h-48 flex items-center justify-center">
                    <Cone className="w-16 h-16 text-[#FF8A00]" />
                  </div>
                </HoverCard>
              </div>

              <div className="grid md:grid-cols-2 gap-10 items-center">
                <HoverCard>
                  <div className="h-48 flex items-center justify-center">
                    <Cpu className="w-16 h-16 text-[#FF8A00]" />
                  </div>
                </HoverCard>

                <div>
                  <h4 className="text-lg font-semibold text-[#FFB000]">
                    AI-Driven Auto-Fix
                  </h4>
                  <p className="text-gray-300 mt-4">
                    Auto-detect mesh errors: non-manifold edges, flipped normals, holes,
                    broken topology, degeneracy and automatic repair operations.
                  </p>
                </div>
              </div>
            </section>

            {/* USE CASES */}
            <section>
              <h3 className="text-3xl font-bold text-[#FF8A00] mb-10">
                Who Uses This Viewer?
              </h3>

              <div className="grid md:grid-cols-3 gap-8">
                <HoverCard>
                  <div className="text-center">
                    <MonitorSmartphone className="w-10 h-10 text-[#FF8A00] mx-auto" />
                    <h4 className="text-[#FFB000] mt-3 font-semibold">Product Engineers</h4>
                    <p className="text-gray-300 text-sm mt-2">
                      Validate models before manufacturing.
                    </p>
                  </div>
                </HoverCard>

                <HoverCard>
                  <div className="text-center">
                    <GitBranch className="w-10 h-10 text-[#FF8A00] mx-auto" />
                    <h4 className="text-[#FFB000] mt-3 font-semibold">R&D Teams</h4>
                    <p className="text-gray-300 text-sm mt-2">
                      Inspect concepts, assemblies and iterations.
                    </p>
                  </div>
                </HoverCard>

                <HoverCard>
                  <div className="text-center">
                    <Users className="w-10 h-10 text-[#FF8A00] mx-auto" />
                    <h4 className="text-[#FFB000] mt-3 font-semibold">Collaboration Teams</h4>
                    <p className="text-gray-300 text-sm mt-2">
                      Share models securely with HD rendering.
                    </p>
                  </div>
                </HoverCard>
              </div>
            </section>

            {/* FAQ */}
            <section className="bg-[#1a0800]/40 border border-[#FF6A00] rounded-2xl p-8">
              <h3 className="text-3xl font-bold text-[#FF8A00] mb-4">FAQ</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <HoverCard>
                  <div>
                    <HelpCircle className="w-5 h-5 text-[#FF8A00]" />
                    <p className="text-gray-300 mt-2">
                      Supports STEP, IGES, SLDPRT, STL, OBJ, GLB, FBX, DWG and more.
                    </p>
                  </div>
                </HoverCard>

                <HoverCard>
                  <div>
                    <Share className="w-5 h-5 text-[#FF8A00]" />
                    <p className="text-gray-300 mt-2">
                      Viewer can export screenshots, metadata and section reports.
                    </p>
                  </div>
                </HoverCard>
              </div>
            </section>

            {/* CTA */}
            <section className="text-center py-16">
              <HoverCard>
                <h3 className="text-4xl font-extrabold text-[#FF8A00] mb-6">
                  Start viewing your 3D models instantly
                </h3>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/products/viewer-tool"
                    className="
                      inline-flex items-center gap-3 bg-[#FF8A00] text-black
                      px-7 py-3 rounded-xl font-semibold hover:bg-[#FFB000]
                      transition shadow-[0_10px_40px_#FF6A00]
                    "
                  >
                    Open Viewer Tool
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  <Link
                    to="/contact"
                    className="
                      inline-flex items-center justify-center px-7 py-3
                      rounded-xl border border-[#FF6A00] text-[#FFB770]
                      hover:bg-[#FF6A00]/10 transition
                    "
                  >
                    Request Enterprise Access
                  </Link>
                </div>
              </HoverCard>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
