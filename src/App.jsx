import {useState, useEffect, useRef} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {ThemeProvider} from "./context/ThemeContext";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Line from "./components/Line";
import Home from "./components/sections/Home";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import Footer from "./components/Footer";
import {Toaster} from "react-hot-toast";
import ProjectDetail from "./components/sections/ProjectDetail";

function ScrollRouterWrapper() {
  const [activeSection, setActiveSection] = useState("home");
  const sections = ["home", "about", "skills", "projects", "contact"];
  const sectionRefs = useRef({});
  const location = useLocation();

  useEffect(() => {
    sections.forEach((section) => {
      sectionRefs.current[section] = document.getElementById(section);
    });

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

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
    handleScroll();

    // Check scroll-to-section state on first load
    if (location.pathname === "/" && location.state?.scrollTo) {
      const section = location.state.scrollTo;
      scrollToSection(section);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <Navbar
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        isHomePage={location.pathname === "/"}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home scrollToSection={scrollToSection} />
                <About />
                <Skills />
                <Toaster position="top-center" />
                <Projects />
                <Contact />
              </>
            }
          />
          <Route path="/project/:projectId" element={<ProjectDetail />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <div className="min-h-screen bg-light-100 dark:bg-dark-100 text-gray-800 dark:text-white transition-colors duration-300">
          <Cursor />
          <ScrollRouterWrapper />
          <Line />
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
