import React from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";
import {
  ArrowRight,
  FileSearch,
  GitCompare,
  Files,
  Scissors,
  Lock,
  Unlock,
  Image,
  FileType,
  Rotate3D,
  SplitSquareHorizontal,
  Droplet,
  ArrowUpDown
} from "lucide-react";
import { Link } from "react-router-dom";

/* -----------------------------------------
   UNIVERSAL HOVER CARD WRAPPER
------------------------------------------*/
const HoverCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.25 }}
      className="relative overflow-hidden bg-[#0e0e0e] border border-white/10 rounded-2xl p-4 shadow-lg"
    >
      {children}
    </motion.div>
  );
};

/* -----------------------------------------
   MAIN COMPONENT
------------------------------------------*/
const PDFToolsSection = () => {
  return (
    <section className="w-full py-20 px-6 bg-[#050505] text-white">
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        {/* Section Title with Icon */}
        <div className="flex items-center gap-4 mb-10">
          <div className="group p-3 rounded-xl bg-[#FF8A00]/20 border border-[#FF8A00] shadow-[0_0_15px_#FF6A00] w-16 h-16 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_25px_#FF6A00] cursor-pointer">
            <ArrowLeftRight className="w-12 h-12 text-[#FF8A00] transition-transform duration-300 group-hover:scale-110" />
          </div>
          <h2 className="text-4xl font-bold text-center text-[#FF8A00] drop-shadow-[0_0_20px_#FF6A00]">
            COMPARER TOOL
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">

          {/* ----------------------------------------------------
    CARD 1 — PDF → PDF Comparer (Video Background)
---------{/* ----------------------------------------------------
    CARD 1 — PDF → PDF Comparer (Video Background)
----------------------------------------------------- */}
<HoverCard>
  {/* Background Video */}
  <div className="absolute inset-0 w-full h-full overflow-hidden rounded-2xl">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover opacity-70"
    >
      <source src="/PDF.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/60"></div>
  </div>

  {/* Foreground */}
 <div className="relative z-10 w-60 h-60 flex flex-col justify-between items-center text-center p-3">
    {/* Logo at TOP - NO MARGIN */}
    <div className="flex flex-col items-center">
      <div className="rounded-xl bg-black/40 border border-[#FF8A00]/50 mb-2 backdrop-blur-sm 
w-20 h-20 flex items-center justify-center">
        <img
          src="/pdflogo.png"
          alt="PDF Compare Icon"
          className="w-full h-full object-contain"
        />
      </div>

      <h4 className="text-lg font-semibold text-[#FFB000] drop-shadow-md">
        AI PDF → PDF Comparer
      </h4>
    </div>

    {/* Button at BOTTOM */}
    <Link
      to="/tools/PDFComparer"
      className="inline-flex items-center gap-2 bg-[#FF8A00] text-black px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#FFB000] transition"
    >
      Open
      <ArrowRight className="w-3 h-3" />
    </Link>
  </div>
</HoverCard>

{/* -----------------------------------------
    CARD 2: DATA EXTRACTOR (Video Background + Custom Image)
------------------------------------------*/}
<HoverCard>
  {/* Background Video */}
  <div className="absolute inset-0 w-full h-full overflow-hidden rounded-2xl">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover opacity-70"
    >
      <source src="/pdf Extractor.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/60"></div>
  </div>

  {/* Foreground */}
   <div className="relative z-10 w-60 h-60 flex flex-col justify-between items-center text-center p-3">
    {/* Logo at TOP - NO MARGIN */}
    <div className="flex flex-col items-center">
      <div className="rounded-xl bg-black/40 border border-[#FF8A00]/50 mb-2 backdrop-blur-sm 
w-20 h-20 flex items-center justify-center">
        <img
          src="/dataextract.png"
          alt="Data Extractor Icon"
          className="w-full h-full object-contain"
        />
      </div>


      <h4 className="text-lg font-semibold text-[#FFB000] drop-shadow-md">
        Data Extractor
      </h4>
    </div>

    {/* Button at BOTTOM */}
    <Link
      to="/tools/PDFText"
      className="inline-flex items-center gap-2 bg-[#FF8A00] text-black px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#FFB000] transition"
    >
      Open
      <ArrowRight className="w-3 h-3" />
    </Link>
  </div>
</HoverCard>



          {/* -----------------------------------------
             CARD 3: MERGE PDFs
          ------------------------------------------*/}
          <HoverCard>
            <div className="w-60 h-60 flex flex-col items-center justify-center text-center p-3">
              <div className="p-3 rounded-xl bg-[#FF8A00]/10 border border-[#FF8A00] mb-3 shadow-[0_0_15px_#FF6A00]/30">
                <Files className="w-10 h-10 text-[#FF8A00]" />
              </div>

              <h4 className="text-lg font-semibold text-[#FFB000]">
                Merge PDFs
              </h4>

              <p className="text-gray-300 mt-2 text-xs px-1 leading-relaxed">
                Combine multiple engineering PDFs into a single clean document.
              </p>

              <Link
                to="/tools/PDFMerge"
                className="mt-3 inline-flex items-center gap-2 bg-[#FF8A00] text-black px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#FFB000] transition"
              >
                Open <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </HoverCard>

          {/* -----------------------------------------
             CARD 4: SPLIT PDF
          ------------------------------------------*/}
          <HoverCard>
            <div className="w-60 h-60 flex flex-col items-center justify-center text-center p-3">
              <div className="p-3 rounded-xl bg-[#FF8A00]/10 border border-[#FF8A00] mb-3 shadow-[0_0_15px_#FF6A00]/30">
                <Scissors className="w-10 h-10 text-[#FF8A00]" />
              </div>

              <h4 className="text-lg font-semibold text-[#FFB000]">
                Split PDF
              </h4>

              <p className="text-gray-300 mt-2 text-xs px-1 leading-relaxed">
                Extract specific pages or split PDF into multiple files easily.
              </p>

              <Link
                to="/tools/PDFSplit"
                className="mt-3 inline-flex items-center gap-2 bg-[#FF8A00] text-black px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#FFB000] transition"
              >
                Open <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </HoverCard>

          {/* -----------------------------------------
             CARD 5: PDF TO IMAGE
          ------------------------------------------*/}
          <HoverCard>
            <div className="w-60 h-60 flex flex-col items-center justify-center text-center p-3">
              <div className="p-3 rounded-xl bg-[#FF8A00]/10 border border-[#FF8A00] mb-3 shadow-[0_0_15px_#FF6A00]/30">
                <Image className="w-10 h-10 text-[#FF8A00]" />
              </div>

              <h4 className="text-lg font-semibold text-[#FFB000]">
                PDF → Image
              </h4>

              <p className="text-gray-300 mt-2 text-xs px-1 leading-relaxed">
                Convert PDF pages to high-quality PNG, JPG, or SVG images.
              </p>

              <Link
                to="/tools/PDFToImage"
                className="mt-3 inline-flex items-center gap-2 bg-[#FF8A00] text-black px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#FFB000] transition"
              >
                Open <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </HoverCard>

          {/* -----------------------------------------
             CARD 6: COMPRESS PDF
          ------------------------------------------*/}
          <HoverCard>
            <div className="w-60 h-60 flex flex-col items-center justify-center text-center p-3">
              <div className="p-3 rounded-xl bg-[#FF8A00]/10 border border-[#FF8A00] mb-3 shadow-[0_0_15px_#FF6A00]/30">
                <SplitSquareHorizontal className="w-10 h-10 text-[#FF8A00]" />
              </div>

              <h4 className="text-lg font-semibold text-[#FFB000]">
                Compress PDF
              </h4>

              <p className="text-gray-300 mt-2 text-xs px-1 leading-relaxed">
                Reduce PDF file size while maintaining quality for easy sharing.
              </p>

              <Link
                to="/tools/PDFCompress"
                className="mt-3 inline-flex items-center gap-2 bg-[#FF8A00] text-black px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#FFB000] transition"
              >
                Open <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </HoverCard>

          {/* -----------------------------------------
             CARD 7: LOCK PDF
          ------------------------------------------*/}
          <HoverCard>
            <div className="w-60 h-60 flex flex-col items-center justify-center text-center p-3">
              <div className="p-3 rounded-xl bg-[#FF8A00]/10 border border-[#FF8A00] mb-3 shadow-[0_0_15px_#FF6A00]/30">
                <Lock className="w-10 h-10 text-[#FF8A00]" />
              </div>

              <h4 className="text-lg font-semibold text-[#FFB000]">
                Lock PDF
              </h4>

              <p className="text-gray-300 mt-2 text-xs px-1 leading-relaxed">
                Add password protection and encryption to secure your PDFs.
              </p>

              <Link
                to="/tools/PDFLock"
                className="mt-3 inline-flex items-center gap-2 bg-[#FF8A00] text-black px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#FFB000] transition"
              >
                Open <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </HoverCard>

          {/* -----------------------------------------
             CARD 8: UNLOCK PDF
          ------------------------------------------*/}
          <HoverCard>
            <div className="w-60 h-60 flex flex-col items-center justify-center text-center p-3">
              <div className="p-3 rounded-xl bg-[#FF8A00]/10 border border-[#FF8A00] mb-3 shadow-[0_0_15px_#FF6A00]/30">
                <Unlock className="w-10 h-10 text-[#FF8A00]" />
              </div>

              <h4 className="text-lg font-semibold text-[#FFB000]">
                Unlock PDF
              </h4>

              <p className="text-gray-300 mt-2 text-xs px-1 leading-relaxed">
                Remove password protection from PDFs you have permission to edit.
              </p>

              <Link
                to="/tools/PDFUnlock"
                className="mt-3 inline-flex items-center gap-2 bg-[#FF8A00] text-black px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#FFB000] transition"
              >
                Open <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </HoverCard>

          {/* -----------------------------------------
             CARD 9: ROTATE PDF
          ------------------------------------------*/}
          <HoverCard>
            <div className="w-60 h-60 flex flex-col items-center justify-center text-center p-3">
              <div className="p-3 rounded-xl bg-[#FF8A00]/10 border border-[#FF8A00] mb-3 shadow-[0_0_15px_#FF6A00]/30">
                <Rotate3D className="w-10 h-10 text-[#FF8A00]" />
              </div>

              <h4 className="text-lg font-semibold text-[#FFB000]">
                Rotate PDF
              </h4>

              <p className="text-gray-300 mt-2 text-xs px-1 leading-relaxed">
                Rotate PDF pages 90°, 180°, or 270° and save the changes.
              </p>

              <Link
                to="/tools/PDFRotate"
                className="mt-3 inline-flex items-center gap-2 bg-[#FF8A00] text-black px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#FFB000] transition"
              >
                Open <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </HoverCard>

          {/* -----------------------------------------
             CARD 10: CONVERT TO PDF
          ------------------------------------------*/}
          <HoverCard>
            <div className="w-60 h-60 flex flex-col items-center justify-center text-center p-3">
              <div className="p-3 rounded-xl bg-[#FF8A00]/10 border border-[#FF8A00] mb-3 shadow-[0_0_15px_#FF6A00]/30">
                <FileType className="w-10 h-10 text-[#FF8A00]" />
              </div>

              <h4 className="text-lg font-semibold text-[#FFB000]">
                Convert to PDF
              </h4>

              <p className="text-gray-300 mt-2 text-xs px-1 leading-relaxed">
                Convert Word, Excel, images, and CAD files to PDF format.
              </p>

              <Link
                to="/tools/ConvertToPDF"
                className="mt-3 inline-flex items-center gap-2 bg-[#FF8A00] text-black px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#FFB000] transition"
              >
                Open <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </HoverCard>

          {/* -----------------------------------------
             CARD 11: PDF WATERMARK
          ------------------------------------------*/}
          <HoverCard>
            <div className="w-60 h-60 flex flex-col items-center justify-center text-center p-3">
              <div className="p-3 rounded-xl bg-[#FF8A00]/10 border border-[#FF8A00] mb-3 shadow-[0_0_15px_#FF6A00]/30">
                <Droplet className="w-10 h-10 text-[#FF8A00]" />
              </div>

              <h4 className="text-lg font-semibold text-[#FFB000]">
                Add Watermark
              </h4>

              <p className="text-gray-300 mt-2 text-xs px-1 leading-relaxed">
                Add text or image watermarks to protect and brand your PDFs.
              </p>

              <Link
                to="/tools/PDFWatermark"
                className="mt-3 inline-flex items-center gap-2 bg-[#FF8A00] text-black px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#FFB000] transition"
              >
                Open <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </HoverCard>

          {/* -----------------------------------------
             CARD 12: PDF ORGANIZE PAGES
          ------------------------------------------*/}
          <HoverCard>
            <div className="w-60 h-60 flex flex-col items-center justify-center text-center p-3">
              <div className="p-3 rounded-xl bg-[#FF8A00]/10 border border-[#FF8A00] mb-3 shadow-[0_0_15px_#FF6A00]/30">
                <ArrowUpDown className="w-10 h-10 text-[#FF8A00]" />
              </div>

              <h4 className="text-lg font-semibold text-[#FFB000]">
                Organize Pages
              </h4>

              <p className="text-gray-300 mt-2 text-xs px-1 leading-relaxed">
                Reorder, delete, or duplicate PDF pages to organize your documents.
              </p>

              <Link
                to="/tools/PDFOrganize"
                className="mt-3 inline-flex items-center gap-2 bg-[#FF8A00] text-black px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#FFB000] transition"
              >
                Open <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </HoverCard>

        </div>
      </div>
    </section>
  );
};

export default PDFToolsSection;
