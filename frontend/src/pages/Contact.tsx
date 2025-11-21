import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState, FormEvent } from "react";
import { sendContactEmail } from '@/services/emailService'; // ← ADD THIS IMPORT

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: "",
    website: "", // honeypot for spam protection
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ UPDATED: Handle form submission with EmailJS
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Honeypot check - if website field is filled, it's a bot
      if (formData.website) {
        setSubmitStatus({
          type: "error",
          message: "Invalid submission detected.",
        });
        setIsSubmitting(false);
        return;
      }

      // Combine first and last name
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();

      console.log("📤 Sending email via EmailJS...");

      // Send email via EmailJS
      const result = await sendContactEmail({
        name: fullName,
        email: formData.email,
        company: formData.company,
        message: formData.message,
      });

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: result.message,
        });

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          company: "",
          message: "",
          website: "",
        });

        // Clear success message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus({
          type: "error",
          message: result.message,
        });
      }
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1e1e_1px,transparent_1px),linear-gradient(to_bottom,#1e1e1e_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Let's discuss how Cadster Technologies can automate and customize your CAD/PLM workflows
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl font-bold mb-6">Contact Information</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Have questions? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    title: "Email",
                    content: "services@cadster.in",
                    link: "mailto:services@cadster.in",
                  },
                  {
                    icon: Phone,
                    title: "Phone",
                    content: "+91 9677710287",
                    link: "tel:+919677710287",
                  },
                  {
                    icon: MapPin,
                    title: "Registered Address",
                    content: "33, JN Road Near Karur Vysya Bank, Anakaputhur, Chennai-600070, Tamil Nadu, India.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{item.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-effect p-8 rounded-3xl"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field (hidden from users, catches bots) */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name *</label>
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className="bg-background/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name *</label>
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="bg-background/50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email *</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className="bg-background/50"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Company</label>
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your Company"
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Message *</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows={6}
                    className="bg-background/50 resize-none"
                    required
                  />
                </div>

                {/* Status Message */}
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg ${
                      submitStatus.type === "success"
                        ? "bg-green-500/10 border border-green-500 text-green-500"
                        : "bg-red-500/10 border border-red-500 text-red-500"
                    }`}
                  >
                    <p className="text-sm font-medium">{submitStatus.message}</p>
                  </motion.div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
