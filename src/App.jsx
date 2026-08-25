import {useEffect} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import {ThemeProvider} from "./context/ThemeContext";
import {TerminalProvider} from "./context/TerminalContext";
import Cursor from "./components/layout/Cursor";
import Navbar from "./components/layout/Navbar";
import Line from "./components/layout/Line";
import Home from "./components/sections/Home";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import AllProjects from "./components/projects/AllProjects";
import Contact from "./components/sections/Contact";
import Message from "./components/layout/Message";
import Error from "./components/layout/Error";
import Terminal from "./components/layout/Terminal";
import MatrixRain from "./components/ui/MatrixRain";
import Footer from "./components/layout/Footer";
import ProjectDetail from "./components/projects/ProjectDetail";
import Projects3DPage from "./components/projects/Projects3DPage";

import {ReactLenis, useLenis} from "@studio-freight/react-lenis";
import {Toaster} from "react-hot-toast";

function ScrollToTop() {
  const {pathname} = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, {immediate: true});
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}

function MainLayout() {
  const location = useLocation();
  const is3DPage = location.pathname === "/projects-3d";

  return (
    <>
      <ScrollToTop />
      {!is3DPage && <Navbar />}
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/project/:projectId" element={<ProjectDetail />} />
          <Route path="/projects-3d" element={<Projects3DPage />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      {!is3DPage && <Footer />}
      <Toaster
        position="top-right"
        toastOptions={{
          className: "dark:bg-zinc-900 dark:text-white border dark:border-zinc-800",
          style: {
            borderRadius: "12px",
            background: "#18181b",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      />
    </>
  );
}

function App() {
  return (
    <ReactLenis root>
      <Router>
        <ThemeProvider>
          <TerminalProvider>
            <div className="min-h-screen bg-[#ffffff] dark:bg-[#09090b] text-[#18181b] dark:text-[#f4f4f5] transition-colors duration-300 font-sans selection:bg-white selection:text-black">
              <Cursor />
              <MainLayout />
              <Message />
              <Line />
              <Terminal />
              <MatrixRain />
            </div>
          </TerminalProvider>
        </ThemeProvider>
      </Router>
    </ReactLenis>
  );
}

export default App;
