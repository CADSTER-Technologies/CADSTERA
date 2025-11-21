import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { LayoutTemplate, FileCog, BookMarked, CopyCheck, FileText, FileSpreadsheet } from "lucide-react";

const Templates = () => {
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
              Intelligent <span className="gradient-text">Templates</span>
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Dynamically managed engineering and document templates integrated for CAD, PLM, and standards compliance
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
              <LayoutTemplate size={120} className="text-primary/40 mb-6" />
              <div className="flex flex-wrap gap-6">
                <FileCog size={48} className="text-orange-400" />
                <BookMarked size={48} className="text-blue-400" />
                <CopyCheck size={48} className="text-teal-400" />
                <FileText size={48} className="text-pink-400" />
                <FileSpreadsheet size={48} className="text-emerald-400" />
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
                Centralized Template Management System
              </h2>
              <ul className="list-disc pl-6 text-lg text-muted-foreground space-y-4">
                <li>
                  <strong>CAD/BIM Drawing Templates:</strong> DWG, DXF, and IFC-based starter kits for compliant drawing sets.
                </li>
                <li>
                  <strong>Advanced Document Automation:</strong> Generate Word, Excel, and PDF templates with custom branding, logic, and revision protocols.
                </li>
                <li>
                  <strong>Template Version Control:</strong> Git-style change logs, rollback, diff, and secure sharing for all engineering teams.
                </li>
                <li>
                  <strong>Industry Adaptation:</strong> Used by firms in electrical, biomed, mechanical, AEC, and power domains to standardize project deliverables.
                </li>
                <li>
                  <strong>API Integration & Cloud Storage:</strong> Access templates directly in SaaS, web, and desktop workflows, synced with S3, Google Drive, and SharePoint.
                </li>
              </ul>
              <div className="glass-effect p-6 rounded-2xl inline-block mt-6">
                <p className="text-sm text-muted-foreground mb-1">Real-World Impact</p>
                <p className="text-2xl font-bold gradient-text">
                  60% reduction in documentation errors for regulated industries
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

export default Templates;
