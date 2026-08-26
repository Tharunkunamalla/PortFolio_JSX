import {useEffect} from "react";
import Projects3D from "../sections/Projects3D";
import Footer from "../layout/Footer";
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
  useSpaceAudio();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleWheel = (e) => {
      // When scrolling down while pointer lock is engaged, release pointer lock so page can scroll down
      if (e.deltaY > 10 && document.pointerLockElement) {
        document.exitPointerLock();
      }
    };

    window.addEventListener("wheel", handleWheel, {passive: true});
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#0c0c10] flex flex-col">
      {/* 3D Scene Viewport */}
      <section className="relative w-full h-[100dvh] bg-[#0c0c10] overflow-hidden shrink-0">
        {/* Top Blend */}
        <div className="pointer-events-none absolute top-0 inset-x-0 h-24 z-10 bg-gradient-to-b from-black/80 to-transparent" />

        <Projects3D projects={visibleProjects} />

        {/* Bottom Blend to Footer */}
        <div className="pointer-events-none absolute bottom-0 inset-x-0 h-32 z-10 bg-gradient-to-t from-[#0c0c10] to-transparent" />
      </section>

      {/* 3D View Footer containing the Event Horizon Black Hole */}
      <Footer showBlackHole={true} />
    </div>
  );
};

export default Projects3DPage;
