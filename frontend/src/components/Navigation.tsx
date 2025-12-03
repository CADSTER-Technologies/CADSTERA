import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ProtectedProductLink } from "@/components/ProtectedProductLink";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { Button } from "@/components/ui/button";
 
// Import lucide icons
import {
  Menu,
  Home,
  Boxes,
  Box,
  GitCompare,
  Eye,
  Layers,
  Building2,
  Factory,
  Landmark,
  Cpu,
  Workflow,
  Orbit,
  Rocket,
  Shield,
  Cloud,
  Users,
  Info,
  Contact,
  Database,
  Settings2,
  LayoutTemplate,
  LogOut,
  User,
} from "lucide-react";
 
interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
  submenu?: NavItem[];
}
 
const navLinks: NavItem[] = [
  { name: "Home", path: "/", icon: Home },
 
  {
    name: "Products",
    path: "/products",
    icon: Boxes,
    submenu: [
      { name: "Converter", path: "/products/converter", icon: Box },
      { name: "Comparer", path: "/products/comparer", icon: GitCompare },
      { name: "Viewer", path: "/products/viewer", icon: Eye },
      { name: "Fireworks Twiner", path: "/products/Fireworks Twiner", icon: Orbit },
      { name: "Extractor", path: "/products/extractor", icon: Database },
      { name: "Configurator", path: "/products/configurator", icon: Settings2 },
      { name: "Templator", path: "/products/templator", icon: LayoutTemplate },
    ],
  },

  {
    name: "Projects",
    path: "/projects",
    icon: Layers,
    submenu: [
      { name: "Models Integration", path: "/projects/models-integration", icon: Landmark },
      { name: "AutoCAD Plant3D", path: "/projects/autocad-plant3d", icon: Building2 },
      { name: "Space Chip Re-Design", path: "/projects/space-chip-redesign", icon: Landmark },
      { name: "Digital Twin Viewer", path: "/projects/digital-twin-viewer", icon: Landmark },
      { name: "Code Re-vamp", path: "/projects/code-revamp", icon: Factory },
    ],
  },
 
  {
    name: "Solutions",
    path: "/solutions",
    icon: Box,
    submenu: [
      { name: "AI Automation", path: "/solutions/ai-automation", icon: Cpu },
      { name: "Cloud Infrastructure", path: "/solutions/cloud-infrastructure", icon: Cloud },
      { name: "Enterprise Security", path: "/solutions/enterprise-security", icon: Shield },
      { name: "Parametric Workflows", path: "/solutions/parametric-workflows", icon: Workflow },
      { name: "Rapid Deployment", path: "/solutions/rapid-deployment", icon: Rocket },
      { name: "Team Collaboration", path: "/solutions/team-collaboration", icon: Users },
    ],
  },
 
  { name: "About", path: "/about", icon: Info },
  { name: "Contact", path: "/contact", icon: Contact },
];
 
export const Navigation = () => {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<any>(null);
  const location = useLocation();
 
  // Close submenu when page changes
  useEffect(() => {
    setOpenDropdown(null);
  }, [location.pathname]);
 
  // Handle scroll direction and visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
 
      // Check if scrolled past 50px
      setIsScrolled(currentScrollY > 50);
 
      // Show/hide based on scroll direction
      if (currentScrollY < 10) {
        // Always show at top
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past 100px - hide
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show
        setIsVisible(true);
      }
 
      setLastScrollY(currentScrollY);
    };
 
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
 
  const handleMouseEnter = (name: string) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setOpenDropdown(name);
  };
 
  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setOpenDropdown(null), 250);
    setHoverTimeout(timeout);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
 
  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-2 ${
        isScrolled
          ? "bg-black/95 shadow-[0_5px_30px_rgba(233,92,42,0.3)] border-[#e95c2a]/50"
          : "bg-black/80 border-[#e95c2a]/30"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold text-[#e95c2a] tracking-wide hover:text-[#ff6f3d] transition-colors duration-300 hover:drop-shadow-[0_0_10px_#e95c2a]"
        >
          CADSTER
        </Link>
 
        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative group"
              onMouseEnter={() => link.submenu && handleMouseEnter(link.name)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to={link.path}
                className="flex items-center gap-2 text-sm font-semibold text-white
                           transition-all duration-200 hover:text-[#e95c2a]
                           hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(233,92,42,0.6)]"
              >
                <link.icon size={18} className="text-[#e95c2a] group-hover:text-[#ff6f3d] transition-colors" />
                {link.name}
              </Link>
 
              {/* SUBMENU */}
              {link.submenu && openDropdown === link.name && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-10 left-0 w-56 bg-black
                             border-2 border-[#e95c2a]/40 shadow-[0_0_20px_rgba(233,92,42,0.4)]
                             rounded-xl p-2 z-50"
                  onMouseEnter={() => handleMouseEnter(link.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  {link.submenu.map((item) => (
                    // Use ProtectedProductLink only for Products submenu
                    link.name === "Products" ? (
                      <ProtectedProductLink
                        key={item.path}
                        to={item.path}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                                   text-white transition-all duration-200 hover:bg-[#e95c2a]/10
                                   hover:text-[#e95c2a] hover:translate-x-1
                                   hover:shadow-[0_0_10px_rgba(233,92,42,0.3)]"
                      >
                        <item.icon size={16} className="text-[#e95c2a]" />
                        {item.name}
                      </ProtectedProductLink>
                    ) : (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                                   text-white transition-all duration-200 hover:bg-[#e95c2a]/10
                                   hover:text-[#e95c2a] hover:translate-x-1
                                   hover:shadow-[0_0_10px_rgba(233,92,42,0.3)]"
                      >
                        <item.icon size={16} className="text-[#e95c2a]" />
                        {item.name}
                      </Link>
                    )
                  ))}
                </motion.div>
              )}
            </div>
          ))}

          {/* USER AUTH SECTION */}
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#e95c2a]/10 border border-[#e95c2a]/30">
                <User size={16} className="text-[#e95c2a]" />
                <span className="text-sm text-white/90">
                  {user.displayName || user.email?.split('@')[0]}
                </span>
              </div>
              <Button 
                onClick={handleLogout}
                className="bg-[#e95c2a]/20 hover:bg-[#e95c2a]/40 text-white border border-[#e95c2a]/50 transition-all"
                size="sm"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          ) : null}
        </div>
 
        {/* MOBILE MENU */}
        <div className="md:hidden">
          <Menu size={30} className="text-[#e95c2a] hover:text-[#ff6f3d] cursor-pointer transition-colors" />
        </div>
      </div>
    </motion.nav>
  );
};
