import {useState, useEffect} from "react";
import {Menu, X, Moon, Sun, Github, Linkedin, Instagram} from "lucide-react";
import {FaDiscord} from "react-icons/fa";
import {useNavigate, useLocation} from "react-router-dom";
import {useTheme} from "../context/ThemeContext";

const Navbar = ({activeSection, scrollToSection, isHomePage}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const {theme, toggleTheme} = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {id: "home", label: "Home"},
    {id: "about", label: "About"},
    {id: "skills", label: "Skills"},
    {id: "projects", label: "Projects"},
    {id: "contact", label: "Contact"},
  ];

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setIsMenuOpen(false);
    if (location.pathname === "/") {
      scrollToSection(sectionId);
    } else {
      navigate("/", {state: {scrollTo: sectionId}});
    }
  };

  return (
    <nav
      className={`fixed left-0 w-full z-40 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "top-4 px-4 md:px-0 flex justify-center"
          : "top-0 bg-transparent"
      }`}
    >
      <div 
        className={`flex justify-between items-center transition-all duration-500 ease-in-out ${
          isScrolled
            ? "w-full max-w-6xl px-10 py-3 rounded-full bg-white/70 dark:bg-[#0f0f14]/80 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            : "w-full container mx-auto px-6 md:px-12 py-5 md:py-8"
        }`}
      >
        <button
          onClick={() => handleNavClick("home")}
          className="group relative flex items-center gap-1 text-3xl md:text-4xl font-bold tracking-tighter text-gray-900 dark:text-white shrink-0"
        >
          <span className="text-secondary-500 transform transition-transform group-hover:scale-110 group-hover:-rotate-12 select-none">T</span>
          <span className="bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent transition-all duration-300 group-hover:tracking-wider select-none">harun</span>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 bg-gray-500/5 dark:bg-white/5 p-1.5 rounded-full backdrop-blur-sm transition-all duration-500">
          {navItems.map((item) => {
            const isActive = activeSection === item.id && isHomePage;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-7 py-2.5 text-sm font-bold tracking-[0.1em] uppercase transition-all duration-500 group
          ${
            isActive
              ? "text-white"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          }
        `}
              >
                <span className="relative z-10">{item.label}</span>
                
                {/* Active/Hover Background Pill */}
                <span 
                  className={`absolute inset-0 rounded-full bg-secondary-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-500 ${
                    isActive ? "opacity-100 scale-100" : "opacity-0 scale-90 group-hover:opacity-20 group-hover:scale-100"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3 md:space-x-5">
          {/* Socials Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            {[
              { Icon: Github, href: "https://github.com/Tharunkunamalla" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/tharun-kunamalla-/" },
              { Icon: Instagram, href: "https://instagram.com/__tharun_0509.__" },
              { Icon: FaDiscord, href: "https://discord.com/users/751713701425446945" }
            ].map(({ Icon, href }, idx) => (
              <a
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-secondary-500 transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 group"
              >
                <Icon className="h-7 w-7 transition-transform duration-300 group-hover:rotate-12  group-hover:text-secondary-500" />
                {/* <span className="absolute inset-0 rounded-full bg-secondary-500/10 scale-0 transition-transform duration-300 group-hover:scale-100" /> */}
              </a>
            ))}
          </div>

          <div className="h-6 w-[1px] bg-gray-300 dark:bg-gray-700 hidden md:block opacity-50" />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-secondary-500/20 transition-all duration-300 group"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-7 w-7 text-yellow-400 group-hover:rotate-180 transition-transform duration-500" />
            ) : (
              <Moon className="h-7 w-7 text-gray-700 group-hover:rotate-12 transition-transform duration-300" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-white/10 transition-colors"
          >
            <Menu className="h-7 w-7 text-gray-800 dark:text-white" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 md:hidden transition-opacity duration-500 ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Container */}
      <div
        className={`fixed top-0 right-0 h-screen w-[80vw] max-w-sm bg-white dark:bg-[#0f0f14] z-[60] shadow-2xl transform transition-transform duration-500 ease-emphasized md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full px-8 py-10">
          <div className="flex justify-between items-center mb-12">
            <span className="text-2xl font-bold dark:text-white">Menu</span>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-full bg-gray-100 dark:bg-white/10"
            >
              <X className="h-6 w-6 dark:text-white" />
            </button>
          </div>

          <div className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-3xl font-bold text-left transition-all duration-300 flex items-center gap-4 group ${
                  activeSection === item.id && isHomePage
                    ? "text-secondary-500"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span className="text-sm opacity-50 font-mono">0{navItems.indexOf(item) + 1}</span>
                <span className="group-hover:translate-x-2 transition-transform">{item.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-auto py-8 border-t border-gray-200 dark:border-white/10">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 uppercase tracking-widest font-bold">Social Connection</p>
            <div className="flex gap-6">
              {[Github, Linkedin, Instagram, FaDiscord].map((Icon, i) => (
                <Icon key={i} className="h-6 w-6 text-gray-400 hover:text-secondary-500 transition-colors cursor-pointer" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
