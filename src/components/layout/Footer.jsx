import {useState, useEffect, useRef} from "react";
import {createPortal} from "react-dom";
import {useLocation, useNavigate, Link} from "react-router-dom";
import {gsap} from "gsap";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const [isWarping, setIsWarping] = useState(false);
  const buttonRef = useRef(null);
  const videoRef = useRef(null);

  const releasePointerLock = () => {
    window.dispatchEvent(new Event("pause-3d-controls"));
    if (document.pointerLockElement) {
      document.exitPointerLock();
    }
  };

  const handleBlackHoleHover = () => {
    if (isWarping) return;
    setIsWarping(true);

    // Release pointer lock and pause 3D controls if present
    releasePointerLock();

    // Disable body scroll
    document.body.style.overflow = "hidden";

    // Animate page elements spiraling inward (into the center of the screen) like a black hole absorbing them
    gsap.to("main, nav, footer > div:first-child", {
      scale: 0,
      rotation: 1440, // 4 full spins for intense absorption
      opacity: 0,
      filter: "blur(12px)",
      duration: 1.8,
      ease: "power2.in",
      transformOrigin: "center center",
    });

    // Set safety backup redirect timeout (in case video fails to load/play)
    const safetyTimeout = setTimeout(() => {
      triggerRedirect();
    }, 2800);

    // Store timeout ID to clear if needed
    window.blackHoleTimeout = safetyTimeout;
  };

  const triggerRedirect = () => {
    if (window.blackHoleTimeout) {
      clearTimeout(window.blackHoleTimeout);
      window.blackHoleTimeout = null;
    }
    // Navigate home
    navigate("/");
    // Scroll home page to top immediately (hidden under overlay)
    window.scrollTo(0, 0);
  };

  // Trigger video overlay fade-in
  useEffect(() => {
    if (isWarping && !isHomePage) {
      gsap.to(".black-hole-overlay-container", {
        opacity: 1,
        duration: 0.6,
        ease: "power2.inOut",
      });
    }
  }, [isWarping, isHomePage]);

  // Recover page elements and fade out video overlay when returning home
  useEffect(() => {
    if (isHomePage && isWarping) {
      // 1. Instantly clear all GSAP override styles so elements lay out normally
      gsap.set("main, nav, footer > div:first-child", {
        clearProps: "all",
      });

      // 2. Ensure scroll position is at the very top
      window.scrollTo(0, 0);

      // 3. Delay the overlay fade-out slightly to give the homepage time to mount and paint under the cover of the overlay
      const fadeTimeout = setTimeout(() => {
        gsap.to(".black-hole-overlay-container", {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            setIsWarping(false);
            // Restore body scrolling
            document.body.style.overflow = "auto";
          },
        });
      }, 250);

      return () => clearTimeout(fadeTimeout);
    }
  }, [location.pathname, isWarping, isHomePage]);

  // Clean up safety timeout on unmount
  useEffect(() => {
    return () => {
      if (window.blackHoleTimeout) {
        clearTimeout(window.blackHoleTimeout);
      }
    };
  }, []);

  return (
    <footer
      data-cursor-ignore="true"
      onPointerDownCapture={releasePointerLock}
      onMouseDownCapture={releasePointerLock}
      className="bg-[#fafafa] dark:bg-[#09090b] border-t border-zinc-200 dark:border-zinc-800/80 py-10 transition-colors duration-300"
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo / Name */}
          <Link
            data-cursor-ignore="true"
            to="/"
            className="flex items-center gap-2 text-2xl font-display font-extrabold tracking-tight text-white group"
          >
            <span className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-black text-sm shadow-md group-hover:scale-105 transition-transform">
              T
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-300 font-bold">
              harun Kunamalla
            </span>
          </Link>

          {/* Quick Page Links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs font-mono font-bold tracking-widest uppercase text-zinc-400">
            <Link to="/" className="hover:!text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] hover:scale-105 transition-all duration-200">Home</Link>
            <Link to="/about" className="hover:!text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] hover:scale-105 transition-all duration-200">About</Link>
            <Link to="/skills" className="hover:!text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] hover:scale-105 transition-all duration-200">Skills</Link>
            <Link to="/projects" className="hover:!text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] hover:scale-105 transition-all duration-200">Projects</Link>
            <Link to="/contact" className="hover:!text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.9)] hover:scale-105 transition-all duration-200">Contact</Link>
          </div>

          {/* Footer Text */}
          <p className="text-zinc-300 dark:text-zinc-200 text-center text-xs md:text-sm flex flex-col md:flex-row items-center gap-1.5 font-mono">
            <span className="text-zinc-300">&copy; {currentYear} Tharun.</span>
            <span className="text-white font-semibold">
              All rights reserved.
            </span>
          </p>

          {!isHomePage && (
            <div className="flex flex-col items-center gap-1.5 select-none z-30">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-300 dark:text-zinc-300 animate-pulse">
                Event Horizon
              </span>
              <button
                ref={buttonRef}
                type="button"
                onMouseEnter={handleBlackHoleHover}
                className="group relative h-12 w-12 rounded-full flex items-center justify-center pointer-events-auto cursor-pointer focus:outline-none"
                aria-label="Hover to warp back to Home Page"
              >
                {/* Outer glowing border */}
                <span
                  className="absolute inset-0 rounded-full border border-zinc-400/40 dark:border-white/30 transition-all duration-500 group-hover:scale-125"
                  style={{
                    boxShadow: "0 0 16px rgba(255,255,255,0.2), inset 0 0 8px rgba(0,0,0,0.9)",
                  }}
                />
                {/* Swirling space gradient */}
                <span className="absolute inset-1 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(200,200,200,0.9),rgba(30,30,35,0.95)_45%,#000_75%)] animate-black-hole-spin group-hover:scale-115 transition-transform duration-500" />
                {/* Orbital dust rings */}
                <span className="absolute inset-[-4px] rounded-full border border-white/20 animate-black-hole-ring pointer-events-none" />
                <span className="absolute inset-[-8px] rounded-full border border-zinc-400/20 animate-black-hole-ring-delayed pointer-events-none" />
                {/* Core singularity */}
                <span className="absolute w-3 h-3 rounded-full bg-black shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              </button>
            </div>
          )}
        </div>
      </div>
      {isWarping && createPortal(
        <div className="black-hole-overlay-container fixed inset-0 z-[99999] bg-black flex items-center justify-center opacity-0 pointer-events-auto">
          <video
            ref={videoRef}
            src="/assets/blackhole_animation_vid.mp4"
            className="w-full h-full object-cover"
            autoPlay
            muted
            playsInline
            onEnded={triggerRedirect}
          />
        </div>,
        document.body
      )}
    </footer>
  );
};

export default Footer;
