import React from "react";
import { motion } from "framer-motion";
import { Database, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/* -----------------------------------------
   UNIVERSAL HOVER CARD WRAPPER
------------------------------------------*/
const HoverCard = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    whileHover={{ scale: 1.04 }}
    transition={{ duration: 0.25 }}
    className="relative overflow-hidden bg-[#0e0e0e] border border-white/10 rounded-2xl p-4 shadow-lg"
  >
    {children}
  </motion.div>
);

/* -----------------------------------------
   MAIN COMPONENT
------------------------------------------*/
const DataExtractor: React.FC = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-black px-6 text-white py-20">
      {/* Section Title with Icon */}
      <div className="flex items-center gap-4 mb-10">
        <div className="group p-4 rounded-xl bg-[#FF8A00]/20 border border-[#FF8A00] shadow-[0_0_15px_#FF6A00] w-20 h-20 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_25px_#FF6A00] cursor-pointer">
          <Database className="w-12 h-12 text-[#FF8A00]" />
        </div>
        <h2 className="text-5xl font-bold text-center text-[#FF8A00] drop-shadow-[0_0_20px_#FF6A00]">
          Extractor Tool
        </h2>
      </div>

      {/* Hover Card */}
      <HoverCard>
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full overflow-hidden rounded-2xl">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-70 rounded-2xl"
          >
            <source src="/pdf Extractor.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/60 rounded-2xl"></div>
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 w-60 h-60 flex flex-col justify-between items-center text-center p-3">
          {/* Icon and Title */}
          <div className="flex flex-col items-center">
            <div className="rounded-xl bg-black/40 border border-[#FF8A00]/50 mb-2 backdrop-blur-sm w-20 h-20 flex items-center justify-center">
              <img
                src="/dataextract.png"
                alt="Data Extractor Icon"
                className="w-full h-full object-contain"
              />
            </div>
            <h4 className="text-lg font-semibold text-[#FFB000] drop-shadow-md">
              Extractor
            </h4>
          </div>

          {/* Button */}
          <Link
            to="/tools/DataExtractor"
            className="inline-flex items-center gap-2 bg-[#FF8A00] text-black px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#FFB000] transition"
          >
            Open
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </HoverCard>
    </section>
  );
};

export default DataExtractor;
