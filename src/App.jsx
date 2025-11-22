import {useState, useEffect, useRef, lazy, Suspense} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import {ThemeProvider} from "./context/ThemeContext";
import Cursor from "./components/Cursor";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {Toaster} from "react-hot-toast";
import {throttle} from "./utils/performanceHelpers";

// Lazy load sections for better performance
const Home = lazy(() => import("./components/sections/Home"));
const About = lazy(() => import("./components/sections/About"));
const Skills = lazy(() => import("./components/sections/Skills"));
const Projects = lazy(() => import("./components/sections/Projects"));
const Contact = lazy(() => import("./components/sections/Contact"));
const ProjectDetail = lazy(() => import("./components/sections/ProjectDetail"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary-500"></div>
  </div>
);

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

    // Throttle scroll handler to improve performance
    const throttledHandleScroll = throttle(handleScroll, 100);

    window.addEventListener("scroll", throttledHandleScroll, {passive: true});
    handleScroll();

    // Check scroll-to-section state on first load
    if (location.pathname === "/" && location.state?.scrollTo) {
      const section = location.state.scrollTo;
      scrollToSection(section);
    }

    return () => window.removeEventListener("scroll", throttledHandleScroll);
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
        <Suspense fallback={<LoadingFallback />}>
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
        </Suspense>
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
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
