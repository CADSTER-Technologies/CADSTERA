import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative"
    >
      <div className="glass-effect p-8 rounded-2xl h-full transition-all duration-300 hover:shadow-2xl">
        
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-primary/5 transition-all duration-300" />

        <div className="relative z-10">
          
          {/* Icon */}
          <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
            <Icon className="text-primary" size={28} />
          </div>

          {/* Content */}
          <h3 className="text-2xl font-bold mb-4 text-foreground">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>

          {/* Removed Animated Border */}
          {/* (border div deleted completely) */}
        </div>
      </div>
    </motion.div>
  );
};
