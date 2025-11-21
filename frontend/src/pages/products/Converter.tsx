"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileUp,
  GitCompare,
  Zap,
  Box,
  Layers,
  FileCog,
  Database,
  RefreshCw,
  Cpu,
  Gauge,
  ShieldCheck,
  BarChart3,
  CpuIcon,
  Workflow,
  HelpCircle,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

/* -------------------------------------------------------
   UNIVERSAL HOVER CARD WRAPPER
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
   SECTION CARD
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
   MAIN PAGE
--------------------------------------------------------*/
export default function Converter() {
  return (
    <>
      {/* Moving grid background */}
      <style>{`
        @keyframes gridMove {
          from { background-position: 0 0; }
          to   { background-position: 60px 60px; }
        }
      `}</style>

      {/* Neon beams */}
      <div className="fixed inset-0 pointer-events-none z-[0]">
        <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-br from-transparent via-[#FF8A00]/5 to-transparent rotate-12"></div>
        <div className="absolute right-0 bottom-0 w-full h-full bg-gradient-to-tr from-transparent via-[#FF6A00]/5 to-transparent -rotate-12"></div>
      </div>

      {/* MAIN WRAPPER */}
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

          {/* ---------------------------------------------------
            HERO SECTION
          ----------------------------------------------------*/}
          <header className="max-w-6xl mx-auto text-center mb-20">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 mb-4"
            >
              <div className="rounded-full p-4 bg-gradient-to-tr from-[#FF8A00]/40 to-[#FFB000]/20 border border-[#FF6A00] shadow-[0_0_25px_#FF6A00]">
                <FileUp className="w-10 h-10 text-[#FF8A00]" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="
                text-4xl md:text-6xl font-extrabold leading-tight text-[#FF8A00]
                drop-shadow-[0_0_40px_#FF6A00]
              "
            >
               File Converter
            </motion.h1>

            <p className="mt-6 text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
              Convert <strong className="text-[#FFB000]">30+ CAD formats</strong>  
              across mechanical, manufacturing, simulation and AR pipelines  
              — without geometry loss, broken meshes or empty files.
            </p>

            <div className="mt-8 flex items-center justify-center gap-4">
              <Link
                to="/products/converter-tool"
                className="inline-flex items-center gap-3 bg-[#FF8A00] text-black px-6 py-3 rounded-xl font-semibold shadow-[0_8px_40px_#FF6A00] hover:bg-[#FFB000] transition"
              >
                Open Converter Tool
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Format badges */}
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              {[
                "STEP • STP • IGES • SLDPRT",
                "STL • OBJ • FBX • GLB",
                "3MF • AMF • PLY",
                "DWG • DXF • PDF",
                "JT • VRML • X_T • IFC",
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

          <main className="max-w-6xl mx-auto space-y-24">

            {/* ---------------------------------------------------
               WHY ENGINEERS USE THIS
            ----------------------------------------------------*/}
            <section className="grid md:grid-cols-2 gap-12 items-center">
              <HoverCard>
                <div className="h-56 flex items-center justify-center">
                  <RefreshCw className="w-20 h-20 text-[#FF8A00]" />
                </div>
              </HoverCard>

              <div>
                <h3 className="text-3xl font-bold text-[#FF8A00] mb-4">
                  Smart Industrial Conversion Engine
                </h3>

                <p className="text-gray-300 mb-4 text-lg leading-relaxed">
                  Built for manufacturing workflows, it ensures industrial-grade 
                  precision with <strong className="text-[#FFB000]">zero-loss geometry</strong>,  
                  material preservation, assembly structure validation  
                  and clean polygon remeshing.
                </p>

                <ul className="grid gap-4 text-gray-300">
                  <li className="flex gap-3 items-start">
                    <Box className="w-5 h-5 text-[#FF8A00] mt-1" />  
                    Converts solid, surface, mesh & B-Rep models.
                  </li>
                  <li className="flex gap-3 items-start">
                    <Layers className="w-5 h-5 text-[#FF8A00] mt-1" />  
                    Preserves hierarchy, geometry & tolerances.
                  </li>
                  <li className="flex gap-3 items-start">
                    <Database className="w-5 h-5 text-[#FF8A00] mt-1" />  
                    Extracts metadata, BOM & material attributes.
                  </li>
                </ul>
              </div>
            </section>

            {/* ---------------------------------------------------
               SUPPORTED FILE CATEGORIES
            ----------------------------------------------------*/}
            <section>
              <h3 className="text-3xl font-bold text-[#FF8A00] mb-10">
                Supported File Categories
              </h3>

              <div className="grid md:grid-cols-3 gap-8">
                <FeatureCard
                  title="Mechanical CAD"
                  desc="STEP, STP, IGES, SLDPRT, X_T, CATPART"
                  icon={Box}
                />
                <FeatureCard
                  title="Mesh & Visualization"
                  desc="GLB, FBX, OBJ, PLY, VRML, 3MF, AMF"
                  icon={Layers}
                />
                <FeatureCard
                  title="2D Drawings & Docs"
                  desc="DWG, DXF, SVG, PDF (vector-safe)"
                  icon={FileCog}
                />
              </div>
            </section>

            {/* ---------------------------------------------------
               DEEP ENGINEERING FEATURES
            ----------------------------------------------------*/}
            <section className="space-y-16">
              <h3 className="text-3xl font-bold text-[#FF8A00]">Deep Features</h3>

              {/* GEOMETRY ENGINE */}
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <h4 className="text-xl font-semibold text-[#FFB000]">
                    Precision Geometry Processing
                  </h4>
                  <p className="text-gray-300 mt-4">
                    Advanced B-Rep interpretation, manifold correction,
                    watertight sealing, normals fixing and curvature smoothing.
                  </p>
                </div>

                <HoverCard>
                  <div className="h-48 flex items-center justify-center">
                    <CpuIcon className="w-16 h-16 text-[#FF8A00]" />
                  </div>
                </HoverCard>
              </div>

              {/* MATERIAL + METADATA */}
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <HoverCard>
                  <div className="h-48 flex items-center justify-center">
                    <Gauge className="w-16 h-16 text-[#FF8A00]" />
                  </div>
                </HoverCard>

                <div>
                  <h4 className="text-xl font-semibold text-[#FFB000]">
                    Material, Metadata & Assembly Intelligence
                  </h4>
                  <p className="text-gray-300 mt-4">
                    Reads mass, density, color, BOM structure, constraints  
                    and transforms into unified formats.
                  </p>
                </div>
              </div>

              {/* AI OPTIMIZATION */}
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <h4 className="text-xl font-semibold text-[#FFB000]">
                    AI-Based Mesh Optimization
                  </h4>
                  <p className="text-gray-300 mt-4">
                    Auto-repair broken meshes, reduce density,  
                    re-topologize and prepare for AR/VR pipelines.
                  </p>
                </div>

                <HoverCard>
                  <div className="h-48 flex items-center justify-center">
                    <Zap className="w-16 h-16 text-[#FF8A00]" />
                  </div>
                </HoverCard>
              </div>
            </section>

            {/* ---------------------------------------------------
               WORKFLOW
            ----------------------------------------------------*/}
            <section>
              <h3 className="text-3xl font-bold text-[#FF8A00] mb-10">
                Conversion Workflow
              </h3>

              <ol className="space-y-6">
                {[
                  "Upload or drag CAD file",
                  "Smart format detection",
                  "Geometry & metadata analysis",
                  "Conversion engine processing",
                  "Mesh cleanup & validation",
                  "Download final converted file",
                ].map((t) => (
                  <HoverCard key={t}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#FF8A00]/10 border border-[#FF8A00] flex items-center justify-center">
                        <Workflow className="w-6 h-6 text-[#FFB000]" />
                      </div>
                      <div className="text-gray-300 text-lg">{t}</div>
                    </div>
                  </HoverCard>
                ))}
              </ol>
            </section>

            {/* ---------------------------------------------------
               USE CASES
            ----------------------------------------------------*/}
            <section>
              <h3 className="text-3xl font-bold text-[#FF8A00] mb-10">
                Who Uses Converter?
              </h3>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { t: "Manufacturing", d: "CAM-ready formats for production.", i: ShieldCheck },
                  { t: "Design & R&D", d: "Cross-software file movement.", i: Cpu },
                  { t: "Quality Team", d: "Inspection-friendly formats.", i: BarChart3 },
                ].map((u) => (
                  <HoverCard key={u.t}>
                    <div className="text-center">
                      <u.i className="w-10 h-10 text-[#FF8A00] mx-auto" />
                      <h4 className="text-[#FFB000] font-semibold mt-3">
                        {u.t}
                      </h4>
                      <p className="text-gray-300 text-sm mt-2">{u.d}</p>
                    </div>
                  </HoverCard>
                ))}
              </div>
            </section>

            {/* ---------------------------------------------------
               FAQ
            ----------------------------------------------------*/}
            <section className="bg-[#1a0800]/40 border border-[#FF6A00] rounded-2xl p-8">
              <h3 className="text-3xl font-bold text-[#FF8A00] mb-4">FAQ</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <HoverCard>
                  <div>
                    <HelpCircle className="w-5 h-5 text-[#FF8A00]" />
                    <p className="text-gray-300 mt-2">
                      Supports 30+ CAD formats including STEP, IGES,
                      SLDPRT, OBJ, GLB, FBX and more.
                    </p>
                  </div>
                </HoverCard>

                <HoverCard>
                  <div>
                    <Users className="w-5 h-5 text-[#FF8A00]" />
                    <p className="text-gray-300 mt-2">
                      Ideal for teams: manufacturing, design, QC, inspection, AR.
                    </p>
                  </div>
                </HoverCard>
              </div>
            </section>

            {/* ---------------------------------------------------
               CTA
            ----------------------------------------------------*/}
            <section className="text-center py-16">
              <HoverCard>
                <h3 className="text-4xl font-extrabold text-[#FF8A00] mb-6">
                  Start converting CAD files instantly
                </h3>

                <Link
                  to="/products/converter-tool"
                  className="
                    inline-flex items-center gap-3 bg-[#FF8A00] text-black
                    px-7 py-3 rounded-xl font-semibold hover:bg-[#FFB000]
                    transition shadow-[0_10px_40px_#FF6A00]
                  "
                >
                  Open Converter Tool
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </HoverCard>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
