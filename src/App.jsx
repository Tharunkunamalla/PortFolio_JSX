import {useState, useEffect, useRef} from "react";
import {ThemeProvider} from "./context/ThemeContext";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Home from "./components/sections/Home";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import Footer from "./components/Footer";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const sections = ["home", "about", "skills", "projects", "contact"];
  const sectionRefs = useRef({});

  useEffect(() => {
    // Initialize section refs
    sections.forEach((section) => {
      sectionRefs.current[section] = document.getElementById(section);
    });

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for better detection

      // Find which section is currently in view
      for (const section of sections) {
        const element = sectionRefs.current[section];

        if (element) {
          const {offsetTop, offsetHeight} = element;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call initially

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Account for navbar height
        behavior: "smooth",
      });
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-light-100 dark:bg-dark-100 text-gray-800 dark:text-white transition-colors duration-300">
        <Cursor />
        <Navbar
          activeSection={activeSection}
          scrollToSection={scrollToSection}
        />

        <main>
          <Home scrollToSection={scrollToSection} />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;