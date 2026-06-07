import {useState, useEffect, useRef} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import {ThemeProvider} from "./context/ThemeContext";
import Cursor from "./components/layout/Cursor";
import Navbar from "./components/layout/Navbar";
import Line from "./components/layout/Line";
import Home from "./components/sections/Home";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import AllProjects from "./components/projects/AllProjects";
import Contact from "./components/sections/Contact";
import Message from "./components/layout/Message";

import {ReactLenis} from "@studio-freight/react-lenis";

import Footer from "./components/layout/Footer";

import {Toaster} from "react-hot-toast";
import ProjectDetail from "./components/projects/ProjectDetail";
import Projects3DPage from "./components/projects/Projects3DPage";
import {useLenis} from "@studio-freight/react-lenis";

function ScrollRouterWrapper() {
  const [activeSection, setActiveSection] = useState("home");
  const sections = ["home", "about", "skills", "projects", "contact"];
  const sectionRefs = useRef({});
  const location = useLocation();
  const lenis = useLenis();

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
      if (lenis) {
        lenis.scrollTo(section, {
          offset: -80,
          duration: 1.2,
        });
      } else {
        window.scrollTo({
          top: section.offsetTop - 80,
          behavior: "smooth",
        });
      }
    }
  };

  const is3DPage = location.pathname === "/projects-3d";

  return (
    <>
      {!is3DPage && (
        <Navbar
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          isHomePage={location.pathname === "/"}
        />
      )}
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home scrollToSection={scrollToSection} />
                <About />
                <Skills />
                <Toaster position="top-right" />
                <Projects />
                <Contact />
              </>
            }
          />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/project/:projectId" element={<ProjectDetail />} />
          <Route path="/projects-3d" element={<Projects3DPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <ReactLenis root>
      <Router>
        <ThemeProvider>
          <div className="min-h-screen bg-light-100 dark:bg-dark-100 text-gray-800 dark:text-white transition-colors duration-300 font-sans">
            <Cursor />
            <ScrollRouterWrapper />
            <Message />
            <Line />
          </div>
        </ThemeProvider>
      </Router>
    </ReactLenis>
  );
}

export default App;
