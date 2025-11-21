import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Monitor, Activity, Layers3, Wifi, BarChart3, Navigation2 } from "lucide-react";
import { Link } from "react-router-dom";

const DigitalTwinViewer = () => {
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
              Digital Twin
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground">
              Digital Twin <span className="gradient-text">Viewer</span> Integration
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Real-time asset visualization with IoT data overlay and interactive facility management
            </p>
          </motion.div>
        </div>
      </section>

      {/* Details */}
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
              <Monitor size={140} className="text-primary/40 mb-6" />
              <div className="flex flex-wrap gap-6">
                <Activity size={56} className="text-green-400" />
                <Layers3 size={56} className="text-blue-400" />
                <Wifi size={56} className="text-purple-400" />
                <BarChart3 size={56} className="text-orange-400" />
                <Navigation2 size={56} className="text-pink-400" />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <p className="text-primary font-semibold mb-2">Smart Building Technologies</p>
                <h2 className="text-4xl font-bold mb-6">Project Overview</h2>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Integrated advanced 3D digital twin viewer into the WerqWise platform, enabling real-time asset visualization,
                IoT sensor data overlay, and interactive facility management for smart buildings and industrial facilities.
              </p>

              <h3 className="text-2xl font-bold mt-8 mb-4">Key Technical Features</h3>
              <ul className="list-disc pl-6 space-y-3 text-muted-foreground text-lg">
                <li>
                  <strong>Real-time 3D Viewer Integration:</strong> WebGL/Three.js rendering with LOD optimization, progressive
                  loading, and mobile-responsive touch controls.
                </li>
                <li>
                  <strong>IoT Sensor Data Visualization:</strong> Live MQTT/WebSocket streams for temperature, occupancy, energy
                  consumption, and equipment status with color-coded heat maps.
                </li>
                <li>
                  <strong>Asset Tracking & Management UI:</strong> Equipment lifecycle tracking, maintenance scheduling, warranty
                  management, and QR/RFID tag integration.
                </li>
                <li>
                  <strong>Interactive Facility Navigation:</strong> Click-to-zoom floor plans, room search, wayfinding algorithms,
                  and augmented reality marker placement.
                </li>
                <li>
                  <strong>Performance Analytics Dashboard:</strong> Historical data trends, energy efficiency KPIs, predictive
                  maintenance alerts, and custom report generation.
                </li>
              </ul>

              <div className="glass-effect p-6 rounded-2xl inline-block mt-8">
                <p className="text-sm text-muted-foreground mb-1">Project Impact</p>
                <p className="text-2xl font-bold gradient-text">Real-time monitoring of 50+ buildings with 10,000+ IoT endpoints</p>
              </div>

              <Link to="/contact">
                <Button size="lg" className="mt-6">
                  Discover Digital Twin Solutions
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

export default DigitalTwinViewer;
