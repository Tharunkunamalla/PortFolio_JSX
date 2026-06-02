import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Projects3D from "../sections/Projects3D";
import {visibleProjects} from "../sections/Projects";
import spaceSound from "../../assets/space.mp3";
import { ArrowLeft } from "lucide-react";

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

      {/* Clean Back Button */}
      <div className="fixed top-6 left-6 pointer-events-auto z-[99999]">
        <button
          type="button"
          onClick={handleReturnTo2D}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Return Home</span>
        </button>
      </div>

      {/* Bottom Blend */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-32 z-10 bg-gradient-to-t from-white/90 to-transparent dark:from-black/80" />
    </section>
  );
};

export default Projects3DPage;
