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
              Specialists in CAD and PLM automation and customization, delivering innovative technology solutions to optimize your design and product lifecycle workflows.
            </p>
          </motion.div>
        </div>
      </section>
 
      {/* Story as enhanced 3 points */}
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
              <ul className="list-disc pl-6 text-lg text-muted-foreground leading-relaxed mb-6">
                <li>
                  <strong>Purpose-Driven Innovation:</strong> Cadster Technologies originated from a vision to transform the field of engineering design. Our founders recognized that too much engineering time was lost to repetitive manual CAD tasks. We set out to build solutions that automate these routines, giving engineers and designers back their time and creativity.
                </li>
                <li>
                  <strong>Expertise Across the CAD Spectrum:</strong> Our team develops specialized plugins, scripts, and integrations for major platforms like Creo, SolidWorks, AutoCAD, Revit, and Inventor—plus cutting-edge AR/VR solutions. By tailoring our tools to each client's real-world needs, we minimize errors, improve collaboration, and foster digital transformation in a wide range of industries.
                </li>
                <li>
                  <strong>Balanced Growth and Customer Care:</strong> While client satisfaction and efficiency are at the core of Cadster, we also value our team's well-being and growth. As we expand into new areas like advanced virtual reality, we continually invest in R&D and prioritize agile, cost-conscious project delivery for every customer.
                </li>
              </ul>
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
                description:
                  "Empower engineers and designers to focus on innovation, not repetition. We're building the future of engineering automation.",
              },
              {
                icon: Eye,
                title: "Vision",
                description:
                  "To be the leading provider of CAD/PLM automation and customization services, empowering manufacturing, service, and construction industries with bespoke tools and seamless multi-CAD support.",
              },
              {
                icon: Award,
                title: "Excellence",
                description:
                  "We deliver high-quality, agile solutions across SolidWorks, Creo, Windchill, AutoCAD, and more, ensuring faster turnaround and exceptional value for our clients.",
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
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
 
      {/* Footer */}
      <Footer />
    </div>
  );
};
 
export default About;
 