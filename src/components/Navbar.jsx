import {useState, useEffect} from "react";
import {Menu, X, Moon, Sun, Github, Linkedin, Instagram} from "lucide-react";
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
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/60 dark:bg-[#0f0f14]/60 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center py-3 md:py-4">
        <a
          href="#home"
          className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
          onClick={() => handleNavClick("home")}
        >
          <span className="text-secondary-500">T</span>harun
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-3">
          {navItems.map((item) => {
            const isActive = activeSection === item.id && isHomePage;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2 text-lg font-medium rounded-full
          transition-all duration-300 overflow-hidden 
          ${
            isActive
              ? "text-secondary-500"
              : "text-gray-700 dark:text-gray-300 hover:text-secondary-400"
          }
            hover:-translate-y-[3px]
        `}
              >
                {/* Animated background */}
                <span
                  className={`absolute inset-0 rounded-full bg-secondary-500/10
            scale-0 transition-transform duration-300 ease-out
            ${isActive ? "scale-100" : "hover:scale-100"}
          `}
                />

                {/* Text stays above */}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-dark-100 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-7 w-7 text-yellow-400 hover:rotate-90 transition-transform duration-300" />
            ) : (
              <Moon className="h-7 w-7 text-gray-700 hover:rotate-[20deg] transition-transform duration-300" />
            )}
          </button>

          {/* Socials Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://github.com/Tharunkunamalla"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-secondary-500 transition-colors"
            >
              <Github className="h-7 w-7 hover:scale-125 hover:rotate-[6deg] transition-transform" />
            </a>
            <a
              href="https://www.linkedin.com/in/tharun-kunamalla-/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-secondary-500 transition-colors"
            >
              <Linkedin className="h-7 w-7 hover:scale-125 hover:rotate-[6deg] transition-transform" />
            </a>
            <a
              href="https://instagram.com/__tharun_0509.__"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-secondary-500 transition-colors"
            >
              <Instagram className="h-7 w-7 hover:scale-125 hover:rotate-[6deg] transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-1 rounded-full hover:bg-gray-200 dark:hover:bg-dark-300 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="h-8 w-8 text-gray-800 dark:text-white" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Close Icon */}
      {isMenuOpen && (
        <button
          onClick={() => setIsMenuOpen(false)}
          className="fixed top-5 right-5 z-50 p-2 rounded-full bg-white dark:bg-dark-200 shadow-md hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors md:hidden"
          aria-label="Close menu"
        >
          <X className="h-8 w-8 text-gray-800 dark:text-white" />
        </button>
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-screen w-72 bg-light-100 dark:bg-dark-100 rounded-l-2xl shadow-xl z-40 transform transition-transform duration-300 ease-in-out will-change-transform md:hidden overflow-y-auto ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col px-6 py-8 space-y-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-xl font-semibold text-left transition ${
                activeSection === item.id && isHomePage
                  ? "text-secondary-500"
                  : "text-gray-800 dark:text-gray-200"
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-4 border-t border-gray-300 dark:border-gray-700 flex space-x-5">
            <a href="https://github.com/Tharunkunamalla" target="_blank">
              <Github className="h-7 w-7" />
            </a>
            <a
              href="https://www.linkedin.com/in/tharun-kunamalla-/"
              target="_blank"
            >
              <Linkedin className="h-7 w-7" />
            </a>
            <a href="https://instagram.com/__tharun_0509.__" target="_blank">
              <Instagram className="h-7 w-7" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
