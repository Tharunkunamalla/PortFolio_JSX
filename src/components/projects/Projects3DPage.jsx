import {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import Projects3D from "../sections/Projects3D";
import {visibleProjects} from "../sections/Projects";

const useSpaceAudio = () => {
  useEffect(() => {
    const audio = new Audio("/space.mp3");
    audio.loop = true;
    audio.volume = 0.4; // Adjust volume as needed

    const playAudio = () => {
      audio.play().catch((err) => console.log("Waiting for user interaction to play audio..."));
    };

    playAudio();

    // In case browser blocked autoplay, listen for interaction
    window.addEventListener("click", playAudio);
    window.addEventListener("keydown", playAudio);

    return () => {
      window.removeEventListener("click", playAudio);
      window.removeEventListener("keydown", playAudio);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);
};

const Projects3DPage = () => {
  const navigate = useNavigate();
  useSpaceAudio();

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
    navigate("/", {state: {scrollTo: "projects"}});
  };

  return (
    <section className="relative w-full h-[100dvh] bg-[#0c0c10] overflow-hidden">
      {/* Top Blend */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-24 z-10 bg-gradient-to-b from-white/80 to-transparent dark:from-black/60" />

      <Projects3D projects={visibleProjects} />

      {/* Toggle Button overlay */}
      <div className="fixed top-6 right-6 sm:top-8 sm:right-12 flex items-center gap-3 sm:gap-4 pointer-events-auto z-[99999]">
        <div className="text-right hidden sm:block">
          <p className="text-white font-bold text-sm">View Mode</p>
          <p className="text-gray-400 text-xs">Return to the 2D layout</p>
        </div>
        <button
          type="button"
          onClick={handleReturnTo2D}
          aria-label="Back to 2D projects view"
          title="Back to 2D"
          className="group relative flex items-center justify-between w-28 h-11 rounded-full border border-white/20 bg-white/10 px-1.5 backdrop-blur-md shadow-2xl shadow-black/30 transition-all duration-300 hover:bg-white/20 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/60"
        >
          <span className="pl-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65">
            2D
          </span>
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-secondary-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-purple-500/50 transition-transform duration-300 group-hover:scale-105">
            <span className="sr-only">Switch back to 2D</span>
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
