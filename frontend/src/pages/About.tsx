import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Target, Eye, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,92,42,0.15),transparent_70%)]" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground">
              About <span className="gradient-text">Cadster Technologies</span>
            </h1>
            <p className="text-xl text-primary-foreground/80">
              CAD/PLM automation and customization experts since 2023
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none"
            >
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Cadster Technologies was born out of a simple, yet powerful vision: to redefine engineering design through intelligent automation and advanced CAD solutions. Cadster is driven by a team of passionate technologists who believe that CAD should not just be a tool — it should be a force multiplier. We saw a gap were organizations were spending too much time on routine CAD work, leaving little room for creativity, strategic thinking, or growth. What We Do CAD Customization & Automation: We develop plugins and scripts for industry-standard CAD software (like Creo, SolidWorks, AutoCAD, Revit, Inventor), automating repetitive processes to save time and reduce errors. Cadster in Augmented & Virtual Reality: Our capabilities also stretch into immersive design experiences, using AR and VR to bring models to life and improve collaboration. We take time to understand each client’s business use case, and tailor solutions that not only meet but anticipate their needs. Efficiency & Cost-Consciousness : Quality & Balance: For us, client satisfaction is paramount, but we also believe in maintaining a healthy work-life balance for our team. Cadster is committed to growing into a leading technology partner for industries that rely on CAD and PLM. As we scale, we will continue to invest in R&D, expand into new domains (like more advanced AR/VR applications), and help our clients push the boundaries of what’s possible.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              {
                icon: Target,
                title: "Mission",
                description: "Empower engineers and designers to focus on innovation, not repetition. We're building the future of engineering automation.",
              },
              {
                icon: Eye,
                title: "Vision",
                description: "To be the leading provider of CAD/PLM automation and customization services, empowering manufacturing, service, and construction industries with bespoke tools and seamless multi-CAD support.",
              },
              {
                icon: Award,
                title: "Excellence",
                description: "We deliver high-quality, agile solutions across SolidWorks, Creo, Windchill, AutoCAD, and more, ensuring faster turnaround and exceptional value for our clients.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect p-8 rounded-2xl text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="text-primary" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto">
            {[
              { number: "2023", label: "Established" },
              { number: "Multi-CAD", label: "Platform Support" },
              { number: "Chennai", label: "Headquarters" },
              { number: "Active", label: "Company Status" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-primary-foreground/70 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
