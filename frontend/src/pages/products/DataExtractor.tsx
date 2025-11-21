import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Database, FileSearch, Code, TextSearch, Layers3, ScanBarcode } from "lucide-react";

const DataExtractor = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-secondary relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground">
              Data <span className="gradient-text">Extractor</span>
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Multi-format data extraction for engineering, document, and image files—batch ready and API accessible
            </p>
          </motion.div>
        </div>
      </section>

      {/* Technical Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Icons Block */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-8"
            >
              <Database size={120} className="text-primary/40 mb-6" />
              <div className="flex flex-wrap gap-6">
                <FileSearch size={48} className="text-orange-400" />
                <Code size={48} className="text-blue-400" />
                <TextSearch size={48} className="text-green-400" />
                <Layers3 size={48} className="text-pink-400" />
                <ScanBarcode size={48} className="text-indigo-400" />
              </div>
            </motion.div>
            {/* Content Block */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-bold mb-4 text-primary-foreground">
                Advanced Extraction Engine
              </h2>
              <ul className="list-disc pl-6 text-lg text-muted-foreground space-y-4">
                <li>
                  <strong>Support for 20+ Formats:</strong> PDF, DWG, DXF, DICOM, PCB, EDA, SCADA logs, medical scans, and industry data.
                </li>
                <li>
                  <strong>Block Analysis & OCR:</strong> Extract text, blocks, tables, drawings, and images with AI-driven pattern spotting and visual debug overlays.
                </li>
                <li>
                  <strong>Batch & Automation APIs:</strong> Full local and remote batch processing—integrate with Python, REST, or command-line.
                </li>
                <li>
                  <strong>Analytics + Audit:</strong> Build knowledge graphs, usage fingerprints, or compliance checks from extracted datasets.
                </li>
                <li>
                  <strong>Industry Use Cases:</strong> Validated for legal, AEC, biomed, control systems, and financial records.
                </li>
              </ul>
              <div className="glass-effect p-6 rounded-2xl inline-block mt-6">
                <p className="text-sm text-muted-foreground mb-1">Engineering Benefit</p>
                <p className="text-2xl font-bold gradient-text">
                  Enabled fully automated spec extraction for 1M+ engineering documents
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default DataExtractor;
