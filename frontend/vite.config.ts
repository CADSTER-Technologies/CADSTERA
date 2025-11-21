import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Replace this with your actual production Railway domain if you redeploy!
// You can also use allowedHosts: ['*'] to allow all, but for security, explicit is better.

const railwayDomain = "frontend-production-9dc9.up.railway.app";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  preview: {
    host: true,
    port: 8080,
    allowedHosts: [railwayDomain], // or ['*'] for all hosts
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
