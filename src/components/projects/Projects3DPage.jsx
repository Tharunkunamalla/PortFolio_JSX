import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Projects3D from "../sections/Projects3D";
import {visibleProjects} from "../sections/Projects";
import spaceSound from "../../assets/space.mp3";

const useSpaceAudio = () => {
  useEffect(() => {
    const audio = new Audio(spaceSound);
    audio.preload = "auto";
    audio.loop = true;
    audio.volume = 0.4;
    audio.load();

    const playAudio = () => {
      if (!audio.paused) return;
      audio.play().catch(() => {
        // Expected on browsers that block autoplay until user gesture.
      });
    };

    const onCanPlay = () => {
      playAudio();
    };

    const onError = () => {
      // Keep a visible console signal for production diagnostics.
      console.error("Space audio failed to load", {src: audio.src});
    };

    // Try once immediately for browsers allowing autoplay.
    playAudio();

    // Ensure playback starts after first user gesture on stricter browsers.
    window.addEventListener("click", playAudio, {once: true});
    window.addEventListener("pointerdown", playAudio, {once: true});
    window.addEventListener("keydown", playAudio, {once: true});
    audio.addEventListener("canplaythrough", onCanPlay);
    audio.addEventListener("error", onError);

    return () => {
      window.removeEventListener("click", playAudio);
      window.removeEventListener("pointerdown", playAudio);
      window.removeEventListener("keydown", playAudio);
      audio.removeEventListener("canplaythrough", onCanPlay);
      audio.removeEventListener("error", onError);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);
};

const Projects3DPage = () => {
  const navigate = useNavigate();
  useSpaceAudio();

  useEffect(() => {
    window.scrollTo(0, 0);
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

      {/* Black hole return control */}
      <div className="fixed bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 pointer-events-auto z-[99999]">
        <button
          type="button"
          onClick={handleReturnTo2D}
          aria-label="Return to the home page"
          title="Return home"
          className="group relative flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-full outline-none focus:ring-2 focus:ring-white/60"
        >
          <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,255,255,0.22),rgba(160,74,255,0.18)_35%,rgba(0,0,0,0.98)_68%)] shadow-[0_0_30px_rgba(160,74,255,0.2),0_0_80px_rgba(0,0,0,0.75)] transition-transform duration-300 group-hover:scale-110" />
          <span className="absolute inset-[10%] rounded-full border border-white/10 bg-black/80" />
          <span className="absolute h-[22%] w-[22%] rounded-full bg-white/70 blur-[2px] opacity-70" />
          <span className="sr-only">Return to home</span>
        </button>
      </div>

      {/* Bottom Blend */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-32 z-10 bg-gradient-to-t from-white/90 to-transparent dark:from-black/80" />
    </section>
  );
};

export default Projects3DPage;
