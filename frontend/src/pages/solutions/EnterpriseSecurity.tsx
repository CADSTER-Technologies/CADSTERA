import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Key, FileCheck, Eye, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const EnterpriseSecurity = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(234,92,42,0.15),transparent_70%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="glass-effect px-4 py-2 rounded-full text-sm font-medium inline-block mb-6">
              Security & Compliance
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground">
              Enterprise <span className="gradient-text">Security</span>
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Bank-level encryption and compliance with industry standards to protect intellectual property
            </p>
          </motion.div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Icons */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center space-y-8"
            >
              <Shield size={140} className="text-primary/40 mb-6" />
              <div className="flex flex-wrap gap-6">
                <Lock size={56} className="text-green-400" />
                <Key size={56} className="text-blue-400" />
                <FileCheck size={56} className="text-purple-400" />
                <Eye size={56} className="text-orange-400" />
                <AlertTriangle size={56} className="text-red-400" />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-bold mb-6">Military-Grade Security Framework</h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Comprehensive security architecture with defense-in-depth strategy, zero-trust network access, and continuous
                threat monitoring to protect sensitive engineering data and intellectual property.
              </p>

              <h3 className="text-2xl font-bold mt-8 mb-4">Security Infrastructure</h3>
              <ul className="list-disc pl-6 space-y-3 text-muted-foreground text-lg">
                <li>
                  <strong>AES-256 End-to-End Encryption:</strong> Data encrypted at rest and in transit with FIPS 140-2 validated
                  cryptographic modules, hardware security modules (HSM), and secure key management.
                </li>
                <li>
                  <strong>ISO 27001 & SOC 2 Type II Compliance:</strong> Annually audited information security management system
                  with documented controls, risk assessments, and third-party penetration testing.
                </li>
                <li>
                  <strong>GDPR & CCPA Compliant:</strong> Privacy-by-design architecture with data residency controls, right-to-delete
                  workflows, consent management, and automated compliance reporting.
                </li>
                <li>
                  <strong>SSO & MFA Integration:</strong> SAML 2.0, OAuth 2.0, and OpenID Connect support with Okta, Azure AD,
                  Google Workspace integration plus hardware token and biometric authentication.
                </li>
                <li>
                  <strong>Comprehensive Audit Logging:</strong> Immutable audit trails with Splunk/ELK integration, real-time alerts,
                  anomaly detection, and forensic investigation tools for security incidents.
                </li>
              </ul>

              <div className="glass-effect p-6 rounded-2xl inline-block mt-8">
                <p className="text-sm text-muted-foreground mb-1">Security Posture</p>
                <p className="text-2xl font-bold gradient-text">Zero security breaches since platform launch</p>
              </div>

              <Link to="/contact">
                <Button size="lg" className="mt-6">
                  Request Security Audit
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EnterpriseSecurity;
