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
      className="relative z-30 bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-900 py-8 transition-colors duration-300"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Left: Brand Identity */}
          <Link
            data-cursor-ignore="true"
            to="/"
            className="flex items-center gap-1.5 group shrink-0"
          >
            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-md sm:rounded-lg bg-zinc-800/90 border border-zinc-700/70 text-zinc-300 flex items-center justify-center font-mono font-bold text-xs shadow-inner group-hover:border-zinc-500 transition-colors">
              T
            </span>
            <span className="font-display font-medium text-base text-zinc-400 group-hover:text-zinc-200 transition-colors tracking-wide">
              harun Kunamalla
            </span>
          </Link>

          {/* Right: Copyright & Event Horizon */}
          <div className="flex items-center gap-4 shrink-0">
            <p className="text-zinc-500 text-xs font-mono">
              &copy; {currentYear} Tharun. <span className="text-zinc-400">All rights reserved.</span>
            </p>

            {!isHomePage && (
              <div className="flex items-center gap-2 select-none">
                <button
                  ref={buttonRef}
                  type="button"
                  onMouseEnter={handleBlackHoleHover}
                  className="group relative h-9 w-9 rounded-full flex items-center justify-center pointer-events-auto cursor-pointer focus:outline-none"
                  aria-label="Hover to warp back to Home Page"
                  title="Event Horizon: Warp to Home"
                >
                  {/* Outer glowing border */}
                  <span
                    className="absolute inset-0 rounded-full border border-white/20 transition-all duration-500 group-hover:scale-125"
                    style={{
                      boxShadow: "0 0 10px rgba(255,255,255,0.15), inset 0 0 6px rgba(0,0,0,0.9)",
                    }}
                  />
                  {/* Swirling space gradient */}
                  <span className="absolute inset-0.5 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(200,200,200,0.9),rgba(30,30,35,0.95)_45%,#000_75%)] animate-black-hole-spin group-hover:scale-115 transition-transform duration-500" />
                  {/* Orbital dust rings */}
                  <span className="absolute inset-[-3px] rounded-full border border-white/20 animate-black-hole-ring pointer-events-none" />
                  {/* Core singularity */}
                  <span className="absolute w-2.5 h-2.5 rounded-full bg-black shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                </button>
              </div>
            )}
          </div>
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
