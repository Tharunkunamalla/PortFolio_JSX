import {useState, useEffect} from "react";
import {Menu, X, Moon, Sun, Github, Linkedin, Instagram, Terminal as TerminalIcon} from "lucide-react";
import {FaDiscord} from "react-icons/fa";
import {useNavigate, useLocation, Link} from "react-router-dom";
import {useTheme} from "../../context/ThemeContext";
import {useTerminal} from "../../context/TerminalContext";

const socialLinks = [
  {Icon: Github, href: "https://github.com/Tharunkunamalla", label: "GitHub", hoverColor: "hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"},
  {Icon: Linkedin, href: "https://www.linkedin.com/in/tharun-kunamalla-/", label: "LinkedIn", hoverColor: "hover:text-[#0077b5] hover:bg-[#0077b5]/10"},
  {Icon: Instagram, href: "https://instagram.com/__tharun_0509.__", label: "Instagram", hoverColor: "hover:text-[#E4405F] hover:bg-[#E4405F]/10"},
  {Icon: FaDiscord, href: "https://discord.com/users/751713701425446945", label: "Discord", hoverColor: "hover:text-[#5865F2] hover:bg-[#5865F2]/10"},
];

const navItems = [
  {path: "/", label: "Home"},
  {path: "/about", label: "About"},
  {path: "/skills", label: "Skills"},
  {path: "/projects", label: "Projects"},
  {path: "/contact", label: "Contact"},
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const {theme, toggleTheme} = useTheme();
  const {toggleTerminal} = useTerminal();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const isItemActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={`fixed left-0 w-full z-40 transition-all duration-300 ease-out will-change-transform ${
        isScrolled
          ? "top-4 px-4 md:px-0 flex justify-center"
          : "top-0 bg-transparent"
      }`}
    >
      <div
        className={`flex justify-between items-center transition-all duration-300 ease-out ${
          isScrolled
            ? "w-full max-w-5xl px-8 py-2.5 rounded-full bg-white/80 dark:bg-[#0c0c0e]/80 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 shadow-lg shadow-black/5 dark:shadow-black/40"
            : "w-full container mx-auto px-6 md:px-12 py-5 md:py-7 border border-transparent"
        }`}
      >
        <Link
          to="/"
          className="group relative flex items-center gap-1 text-2xl md:text-3xl font-display font-extrabold tracking-tight text-black dark:text-white shrink-0"
        >
          <span className="w-8 h-8 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-lg transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
            T
          </span>
          <span className="bg-gradient-to-r from-black via-zinc-800 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent transition-all duration-300 group-hover:tracking-wider select-none font-bold">
            harun
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-full border border-black/5 dark:border-white/5 backdrop-blur-md transition-all duration-500">
          {navItems.map((item) => {
            const active = isItemActive(item.path);

            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`relative px-4 py-2 text-xs font-semibold tracking-[0.12em] uppercase transition-all duration-300 rounded-full group ${
                  active
                    ? "text-white dark:text-black font-bold"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                }`}
              >
                <span className="relative z-10">{item.label}</span>

                {/* Active Pill Background */}
                {active && (
                  <span className="absolute inset-0 rounded-full bg-black dark:bg-white shadow-[0_2px_10px_rgba(0,0,0,0.2)] dark:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Socials Desktop */}
          <div className="hidden lg:flex items-center space-x-1 sm:space-x-2">
            {socialLinks.map(({Icon, href, label, hoverColor}, idx) => (
              <a
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`relative p-2.5 text-zinc-600 dark:text-zinc-400 ${hoverColor} rounded-full transition-all duration-300 transform hover:-translate-y-0.5 group`}
              >
                <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-115" />
              </a>
            ))}
          </div>

          <div className="h-6 w-[1px] bg-zinc-300 dark:bg-zinc-800 hidden md:block" />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-all duration-300"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* CLI Terminal Toggle */}
          <button
            onClick={toggleTerminal}
            className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-all duration-300"
            aria-label="Toggle CLI terminal"
            title="Toggle CLI Terminal (` or Ctrl + K)"
          >
            <TerminalIcon className="h-5 w-5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white transition-colors"
            aria-label="Open mobile navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden transition-opacity duration-500 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Container */}
      <div
        className={`fixed top-0 right-0 h-screen w-[80vw] max-w-sm bg-white dark:bg-[#09090b] border-l border-zinc-200 dark:border-zinc-800 z-[60] shadow-2xl transform transition-transform duration-500 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full px-8 py-10">
          <div className="flex justify-between items-center mb-12">
            <span className="text-xl font-display font-bold text-black dark:text-white tracking-wider uppercase">Menu</span>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col space-y-6">
            {navItems.map((item, idx) => {
              const active = isItemActive(item.path);

              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`text-2xl font-display font-bold text-left transition-all duration-300 flex items-center gap-4 group ${
                    active
                      ? "text-black dark:text-white translate-x-2"
                      : "text-zinc-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  <span className="text-xs opacity-40 font-mono">
                    0{idx + 1}
                  </span>
                  <span className="group-hover:translate-x-2 transition-transform">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-auto py-8 border-t border-zinc-200 dark:border-zinc-800">
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-mono font-semibold mb-4">
              Social Links
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({Icon, href, label}, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
