import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { Phone, MapPin } from "lucide-react";
 
export const Footer = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };
 
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.17, 0.67, 0.83, 0.67],
      },
    },
  };
 
  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };
 
  return (
    <footer className="bg-secondary text-primary-foreground py-16 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12"
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.h3
              className="text-2xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              CADSTER
            </motion.h3>
            <p className="text-primary-foreground/70 leading-relaxed">
              Engineering tomorrow. Automating today. Advanced CAD/BIM automation and AI-powered design tools.
            </p>
            <motion.div className="pt-2 space-y-2" whileHover={{ x: 5 }} transition={{ duration: 0.3 }}>
              {/* Email */}
              <a
                href="mailto:services@cadster.in"
                className="text-primary-foreground/70 hover:text-primary transition-colors text-sm flex items-center gap-2"
              >
                <Mail size={16} />
                Email: services@cadster.in
              </a>
              {/* Phone */}
              <a
                href="tel:+919677710287"
                className="text-primary-foreground/70 hover:text-primary transition-colors text-sm flex items-center gap-2"
              >
                <Phone size={16} />
                Phone: +91 9677710287
              </a>
              {/* Address */}
              <div className="text-primary-foreground/60 text-sm flex items-start gap-2 leading-tight">
                <MapPin size={16} className="min-w-[16px] mt-0.5" />
                <span>
                  33, JN Road, Near Karur Vysya Bank, Anakaputhur,<br />
                  Chennai - 600070, Tamil Nadu, India.
                </span>
              </div>
            </motion.div>
          </motion.div>
 
 
          {/* Products */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4 text-lg">Products</h4>
            <motion.ul
              className="space-y-2"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { name: "Comparer", path: "/products/comparer" },
                { name: "Converter", path: "/products/converter" },
                { name: "Viewer", path: "/products/viewer" },
                { name: "Fireworks Twiner", path: "/products/Fireworks Twiner" },
                { name: "Data Extractor", path: "/products/data-extractor" },
                { name: "Configurator", path: "/products/configurator" },
                { name: "Templator", path: "/products/templator" },
              ].map((product, index) => (
                <motion.li
                  key={product.name}
                  variants={linkVariants}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={product.path}
                    className="text-primary-foreground/70 hover:text-primary transition-colors inline-block"
                  >
                    {product.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
 
          {/* Company */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4 text-lg">Company</h4>
            <motion.ul
              className="space-y-2"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { name: "About Us", path: "/about" },
                { name: "Projects", path: "/projects" },
                { name: "Solutions", path: "/solutions" },
                { name: "Contact", path: "/contact" },
              ].map((link, index) => (
                <motion.li
                  key={link.name}
                  variants={linkVariants}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={link.path}
                    className="text-primary-foreground/70 hover:text-primary transition-colors inline-block"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
 
          {/* Social & Resources */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold mb-4 text-lg">Connect</h4>
            <div className="flex space-x-4 mb-6">
              {[
                { icon: Twitter, href: "https://twitter.com/cadster", label: "Twitter" },
                { icon: Linkedin, href: "https://www.linkedin.com/company/cadster/?originalSubdomain=in", label: "LinkedIn" },
                { icon: Github, href: "https://github.com/cadster", label: "GitHub" },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
 
            <div className="mt-6">
              <h5 className="font-semibold mb-2 text-sm">Resources</h5>
              <motion.ul
                className="space-y-2"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {[
                  { name: "Legal", path: "/legal" },
                  { name: "License", path: "/license" },
                ].map((resource, index) => (
                  <motion.li
                    key={resource.name}
                    variants={linkVariants}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to={resource.path}
                      className="text-primary-foreground/70 hover:text-primary transition-colors text-sm inline-block"
                    >
                      {resource.name}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        </motion.div>
 
        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-primary-foreground/60 text-sm">
            © 2025 Cadster Technologies Private Limited. All rights reserved.
          </p>
 
          <motion.div
            className="flex space-x-6 mt-4 md:mt-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            {[
              { name: "Privacy Policy", path: "/privacy-policy" },
              { name: "Terms of Service", path: "/terms-of-service" },
            ].map((link, index) => (
              <motion.div
                key={link.name}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={link.path}
                  className="text-primary-foreground/60 hover:text-primary text-sm transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};
 