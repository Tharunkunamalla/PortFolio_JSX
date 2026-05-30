import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Projects3D from "../sections/Projects3D";
import { visibleProjects } from "../sections/Projects";

const Projects3DPage = () => {
  const navigate = useNavigate();

  // Handle navbar animation
  useEffect(() => {
    const nav = document.querySelector("nav");
    if (nav) {
      nav.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
      nav.style.transform = "translateY(-100%)";
    }
    
    // Ensure we start at the top
    window.scrollTo(0, 0);

    return () => {
      if (nav) nav.style.transform = "";
    };
  }, []);

  const handleReturnTo2D = () => {
    // Navigate back to home and trigger smooth scroll to projects section
    navigate("/", { state: { scrollTo: "projects" } });
  };

  return (
    <section className="relative w-full h-[100dvh] bg-[#0c0c10] overflow-hidden">
      {/* Top Blend */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-24 z-10 bg-gradient-to-b from-white/80 to-transparent dark:from-black/60" />
      
      <Projects3D projects={visibleProjects} />
      
      {/* Toggle Button overlay */}
      <div 
        className="absolute top-6 right-6 sm:top-8 sm:right-12 flex items-center gap-4 pointer-events-auto"
        style={{ zIndex: 99999 }}
      >
        <div className="text-right hidden sm:block">
          <p className="text-white font-bold text-sm">View Mode</p>
          <p className="text-gray-400 text-xs">Switch between layouts</p>
        </div>
        <button
          onClick={handleReturnTo2D}
          className="relative flex items-center w-20 h-10 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full p-1 transition-all duration-300 backdrop-blur-md"
        >
          <div className="absolute right-1 w-8 h-8 bg-gradient-to-r from-secondary-500 to-purple-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-purple-500/50">
            3D
          </div>
        </button>
      </div>

      {/* Bottom Blend */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-32 z-10 bg-gradient-to-t from-white/90 to-transparent dark:from-black/80" />
    </section>
  );
};

export default Projects3DPage;
