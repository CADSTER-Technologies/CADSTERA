import { motion } from "framer-motion";
import holographicVideo from "@/assets/holographic-hero.mp4";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#1e1e1e]">

      {/* 🎥 Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      >
        <source src={holographicVideo} type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e1e1e]/40 via-transparent to-[#1e1e1e]/60" />

      {/* Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#e95c2a]/20 rounded-full blur-[120px] animate-pulse-glow" />

      {/* Content — Buttons Removed */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-end min-h-screen pb-32">
      </div>

      {/* Floating */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-[#e95c2a]/20 rounded-lg blur-xl animate-float" />
      <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-[#e95c2a]/10 rounded-lg blur-xl animate-float" style={{ animationDelay: "1s" }} />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-[#e95c2a]/50 rounded-full flex justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-[#e95c2a] rounded-full shadow-[0_0_10px_rgba(233,92,42,0.8)]"
          />
        </div>
      </motion.div>

    </section>
  );
};
