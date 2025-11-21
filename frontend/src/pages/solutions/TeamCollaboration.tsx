import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, GitCompare, Bell, Activity, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

const TeamCollaboration = () => {
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
              Collaboration Platform
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground">
              Team <span className="gradient-text">Collaboration</span>
            </h1>
            <p className="text-xl text-primary-foreground/80">
              Real-time multi-user editing, version control, and communication tools for engineering teams
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
              <Users size={140} className="text-primary/40 mb-6" />
              <div className="flex flex-wrap gap-6">
                <MessageSquare size={56} className="text-blue-400" />
                <GitCompare size={56} className="text-green-400" />
                <Bell size={56} className="text-orange-400" />
                <Activity size={56} className="text-purple-400" />
                <Share2 size={56} className="text-pink-400" />
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-bold mb-6">Distributed Team Engineering Platform</h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Unified collaboration suite with real-time co-editing, Git-style version control, integrated communication,
                and project management tools designed specifically for distributed engineering teams.
              </p>

              <h3 className="text-2xl font-bold mt-8 mb-4">Collaboration Features</h3>
              <ul className="list-disc pl-6 space-y-3 text-muted-foreground text-lg">
                <li>
                  <strong>Real-time Multi-User Editing:</strong> Operational transformation algorithms enable 100+ simultaneous users
                  on same model with live cursors, instant sync, and conflict-free collaborative editing.
                </li>
                <li>
                  <strong>Git-Style Version Control:</strong> Branch/merge workflows, pull requests, code review for CAD models,
                  visual diff tools, and rollback to any historical version with one click.
                </li>
                <li>
                  <strong>Integrated Comment System:</strong> 3D annotation tools with @mentions, threaded discussions, voice notes,
                  screenshot markup, and automatic notification routing.
                </li>
                <li>
                  <strong>Change Tracking & Activity Feeds:</strong> Real-time activity streams showing who changed what and when,
                  with filterable feeds, timeline views, and exportable audit reports.
                </li>
                <li>
                  <strong>Slack/Teams Integration:</strong> Bidirectional sync with Slack channels and Microsoft Teams—get notifications,
                  share models, and trigger workflows without leaving your chat platform.
                </li>
              </ul>

              <div className="glass-effect p-6 rounded-2xl inline-block mt-8">
                <p className="text-sm text-muted-foreground mb-1">Productivity Impact</p>
                <p className="text-2xl font-bold gradient-text">60% reduction in design review cycles for remote teams</p>
              </div>

              <Link to="/contact">
                <Button size="lg" className="mt-6">
                  Start Team Trial
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

export default TeamCollaboration;
