import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
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
  Rocket,
  Shield,
  Cloud,
  Users,
  Info,
  Contact,
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
    ],
  },

  {
    name: "Projects",
    path: "/projects",
    icon: Layers,
    submenu: [
      { name: "Urban Tower Complex", path: "/projects/urban-tower-complex", icon: Building2 },
      { name: "Manufacturing Facility", path: "/projects/manufacturing-facility", icon: Factory },
      { name: "Residential District", path: "/projects/residential-district", icon: Landmark },
      { name: "Cultural Center", path: "/projects/cultural-center", icon: Landmark },
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

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoverTimeout, setHoverTimeout] = useState<any>(null);
  const location = useLocation();

  // Auto-closing dropdown when route changes
  useEffect(() => {
    setOpenDropdown(null);
    if (hoverTimeout) clearTimeout(hoverTimeout);
  }, [location.pathname]);

  // Scroll styling
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (name: string) => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    setOpenDropdown(name);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setOpenDropdown(null), 250);
    setHoverTimeout(timeout);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-2 ${isScrolled
          ? "shadow-[0_5px_30px_rgba(233,92,42,0.3)] backdrop-blur-md bg-black/95 border-[#e95c2a]/50"
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
              onMouseEnter={() => handleMouseEnter(link.name)}
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
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* MOBILE MENU ICON */}
        <div className="md:hidden">
          <Menu size={30} className="text-[#e95c2a] hover:text-[#ff6f3d] transition-colors cursor-pointer" />
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
