import {useState, useEffect, useRef} from "react";
import {createPortal} from "react-dom";
import {useLocation, useNavigate} from "react-router-dom";
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
      className="bg-light-200 dark:bg-light-100 dark:bg-gradient-to-br from-[#0f0f14] via-[#12121a] to-[#0c0c10] overflow-hidden py-10 border-t border-gray-300 dark:border-gray-700 shadow-inner"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo / Name */}
          <a
            data-cursor-ignore="true"
            href="#home"
            className="text-gray-900 dark:text-white font-extrabold tracking-tight"
          >
            {/* Mobile */}
            <span className="block md:hidden text-3xl leading-tight">
              <span className="text-secondary-500 drop-shadow text-4xl">T</span>
              <span className="drop-shadow text-2xl">harun Kunamalla</span>
            </span>
            {/* Desktop */}
            <span className="hidden md:block text-4xl leading-tight">
              <span className="text-secondary-500 drop-shadow">T</span>
              harun <span className="text-secondary-500">K</span>
            </span>
          </a>

          {/* Footer Text */}
          <p className="text-gray-600 dark:text-gray-400 text-center text-sm md:text-base flex flex-col md:flex-row items-center gap-1">
            <span>&copy; {currentYear} Tharun. All rights reserved.</span>
            <span className="text-md font-semibold text-secondary-600 dark:text-secondary-400">
              Shinzou wo Sasageyo ✊
            </span>
          </p>

          {!isHomePage && (
            <div className="flex flex-col items-center gap-1.5 select-none z-30">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-fuchsia-400 animate-pulse">
                Event Horizon
              </span>
              <button
                ref={buttonRef}
                type="button"
                onMouseEnter={handleBlackHoleHover}
                className="group relative h-14 w-14 rounded-full flex items-center justify-center pointer-events-auto cursor-pointer focus:outline-none"
                aria-label="Hover to warp back to Home Page"
              >
                {/* Outer glowing border */}
                <span
                  className="absolute inset-0 rounded-full border border-fuchsia-500/30 transition-all duration-500 group-hover:scale-125"
                  style={{
                    boxShadow: "0 0 20px rgba(217,70,239,0.35), inset 0 0 10px rgba(0,0,0,0.9)",
                  }}
                />
                {/* Swirling space gradient */}
                <span className="absolute inset-1 rounded-full bg-[radial-gradient(circle_at_35%_30%,rgba(138,43,226,0.9),rgba(15,10,30,0.95)_45%,#000_75%)] animate-black-hole-spin group-hover:scale-115 transition-transform duration-500" />
                {/* Orbital dust rings */}
                <span className="absolute inset-[-6px] rounded-full border border-fuchsia-500/15 animate-black-hole-ring pointer-events-none" />
                <span className="absolute inset-[-12px] rounded-full border border-cyan-400/10 animate-black-hole-ring-delayed pointer-events-none" />
                {/* Core singularity */}
                <span className="absolute w-3.5 h-3.5 rounded-full bg-black shadow-[0_0_8px_rgba(217,70,239,0.6)]" />
              </button>
            </div>
          )}
        </div>
      </div>
      {isWarping && createPortal(
        <div className="black-hole-overlay-container fixed inset-0 z-[99999] bg-black flex items-center justify-center opacity-0 pointer-events-auto">
          <video
            ref={videoRef}
            src="/assets/blackhole_animation_vid1.mp4"
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
