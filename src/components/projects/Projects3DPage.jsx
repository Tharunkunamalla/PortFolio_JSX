import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Projects3D from "../sections/Projects3D";
import {visibleProjects} from "../../constants/projectsData";
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
  const [showBlackHole, setShowBlackHole] = useState(false);
  const [blackHoleProgress, setBlackHoleProgress] = useState(0);
  const [isWarping, setIsWarping] = useState(false);
  useSpaceAudio();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const revealStart = 40;
    const revealEnd = 280;

    const handleScroll = () => {
      if (isWarping) return;

      const y = window.scrollY || window.pageYOffset || 0;
      const progress = Math.max(
        0,
        Math.min(1, (y - revealStart) / (revealEnd - revealStart)),
      );

      if (y > revealStart && document.pointerLockElement) {
        document.exitPointerLock();
      }

      setBlackHoleProgress(progress);
      setShowBlackHole(y > revealStart);
    };

    window.addEventListener("scroll", handleScroll, {passive: true});
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isWarping]);

  const handleBlackHoleEnter = () => {
    if (isWarping) return;

    setIsWarping(true);
    window.dispatchEvent(new Event("pause-3d-controls"));

    window.setTimeout(() => {
      navigate("/", {state: {scrollTo: "projects"}});
    }, 900);
  };

  return (
    <section className="relative w-full h-[100dvh] bg-[#0c0c10] overflow-hidden">
      {/* Top Blend */}
      <div className="pointer-events-none absolute top-0 inset-x-0 h-24 z-10 bg-gradient-to-b from-white/80 to-transparent dark:from-black/60" />

      <Projects3D projects={visibleProjects} />

      <div
        className={`pointer-events-none absolute inset-x-0 bottom-28 z-[55] flex justify-center transition-all duration-500 ${
          showBlackHole && !isWarping
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <button
          type="button"
          onClick={handleBlackHoleEnter}
          className="group pointer-events-auto relative h-28 w-28 rounded-full"
          aria-label="Enter black hole to jump to projects section"
        >
          <span
            className="absolute inset-0 rounded-full border border-fuchsia-400/40"
            style={{
              boxShadow:
                "0 0 35px rgba(217,70,239,0.35), inset 0 0 30px rgba(0,0,0,0.95)",
              transform: `scale(${0.9 + blackHoleProgress * 0.2})`,
            }}
          />
          <span className="absolute inset-2 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(138,43,226,0.8),rgba(15,10,30,0.95)_45%,#000_72%)] animate-black-hole-spin" />
          <span className="absolute inset-[-12px] rounded-full border border-fuchsia-400/20 animate-black-hole-ring" />
          <span className="absolute inset-[-24px] rounded-full border border-cyan-300/15 animate-black-hole-ring-delayed" />
        </button>
      </div>

      <div
        className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-500 ${
          isWarping ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="black-hole-warp-layer h-full w-full" />
      </div>

      {/* Bottom Blend */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-32 z-10 bg-gradient-to-t from-white/90 to-transparent dark:from-black/80" />
    </section>
  );
};

export default Projects3DPage;
