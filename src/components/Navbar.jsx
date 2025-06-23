import {useState, useEffect} from "react";
import {Menu, X, Moon, Sun, Github, Linkedin, Instagram} from "lucide-react";
import {useTheme} from "../context/ThemeContext";

const Navbar = ({activeSection, scrollToSection}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const {theme, toggleTheme} = useTheme();

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
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-light-100/90 dark:bg-dark-100/90 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center py-5 md:py-6">
        <a
          href="#home"
          className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
          onClick={() => handleNavClick("home")}
        >
          <span className="text-secondary-500">T</span>harun
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative text-lg font-medium transition ${
                activeSection === item.id
                  ? "text-secondary-500"
                  : "text-gray-700 dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-400"
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary-500 mt-1" />
              )}
            </button>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-dark-300 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-7 w-7 text-yellow-400" />
            ) : (
              <Moon className="h-7 w-7 text-gray-700" />
            )}
          </button>

          {/* Social Icons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://github.com/Tharunkunamalla"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-secondary-500 transition-colors"
            >
              <Github className="h-7 w-7" />
            </a>
            <a
              href="https://www.linkedin.com/in/tharun-kunamalla-b9b477288/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-secondary-500 transition-colors"
            >
              <Linkedin className="h-7 w-7" />
            </a>
            <a
              href="https://instagram.com/__tharun_0509.__"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-secondary-500 transition-colors"
            >
              <Instagram className="h-7 w-7" />
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

      {/* Mobile Menu Close Icon - outside the menu box */}
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
                activeSection === item.id
                  ? "text-secondary-500"
                  : "text-gray-800 dark:text-gray-200"
              }`}
            >
              {item.label}
            </button>
          ))}

          <div className="pt-4 border-t border-gray-300 dark:border-gray-700 flex space-x-5">
            <a
              href="https://github.com/Tharunkunamalla"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-secondary-500"
            >
              <Github className="h-7 w-7" />
            </a>
            <a
              href="https://www.linkedin.com/in/tharun-kunamalla-b9b477288/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-secondary-500"
            >
              <Linkedin className="h-7 w-7" />
            </a>
            <a
              href="https://instagram.com/__tharun_0509.__"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 hover:text-secondary-500"
            >
              <Instagram className="h-7 w-7" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;