import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";

const PhotoLightbox = ({ photo, photos, sourceRect, onClose, onNavigate }) => {
  const [isClosing, setIsClosing] = useState(false);
  const closingRef = useRef(false);

  const currentIndex = photos.findIndex((p) => p.id === photo?.id);
  const totalPhotos = photos.length;

  // Calculate coordinates from the clicked thumbnail to the screen center
  const genieVars = useMemo(() => {
    if (!sourceRect || typeof window === "undefined") {
      return {
        "--genie-dx": "0px",
        "--genie-dy": "180px",
        "--genie-sx": "0.25",
        "--genie-sy": "0.25",
        "--genie-skew": "0deg",
      };
    }

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const sourceCenterX = sourceRect.left + sourceRect.width / 2;
    const sourceCenterY = sourceRect.top + sourceRect.height / 2;

    const targetCenterX = windowWidth / 2;
    const targetCenterY = windowHeight / 2;

    const deltaX = sourceCenterX - targetCenterX;
    const deltaY = sourceCenterY - targetCenterY;

    const scaleX = Math.min(Math.max(sourceRect.width / (windowWidth * 0.72), 0.15), 0.45);
    const scaleY = Math.min(Math.max(sourceRect.height / (windowHeight * 0.72), 0.15), 0.45);

    const skewDeg = (deltaX / (windowWidth * 0.5)) * -10;

    return {
      "--genie-dx": `${deltaX.toFixed(1)}px`,
      "--genie-dy": `${deltaY.toFixed(1)}px`,
      "--genie-sx": scaleX.toFixed(3),
      "--genie-sy": scaleY.toFixed(3),
      "--genie-skew": `${skewDeg.toFixed(1)}deg`,
    };
  }, [sourceRect]);

  const handleClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 360);
  }, [onClose]);

  const handlePrev = (e) => {
    e?.stopPropagation();
    if (isClosing) return;
    const prevIndex = (currentIndex - 1 + totalPhotos) % totalPhotos;
    onNavigate(photos[prevIndex]);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    if (isClosing) return;
    const nextIndex = (currentIndex + 1) % totalPhotos;
    onNavigate(photos[nextIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [currentIndex, photos, handleClose]);

  if (!photo) return null;

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-[150] bg-black/92 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-10 select-none ${
        isClosing ? "animate-mac-backdrop-out" : "animate-mac-backdrop-in"
      }`}
      role="dialog"
      aria-modal="true"
    >
      {/* Top macOS-style Status Bar with Title & Close (X) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-5 left-5 right-5 sm:top-6 sm:left-8 sm:right-8 flex items-center justify-between text-white z-40 pointer-events-auto"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-800/90 border border-zinc-700/70 flex items-center justify-center text-zinc-300 shadow-md">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-sm sm:text-base text-zinc-100 tracking-wide">
              Captured by Tharun
            </h3>
            <span className="text-[11px] font-mono text-zinc-400">
              {currentIndex + 1} of {totalPhotos}
            </span>
          </div>
        </div>

        {/* Big high-contrast macOS Close (X) button */}
        <button
          onClick={handleClose}
          type="button"
          aria-label="Close photo preview"
          title="Close (Esc)"
          className="w-10 h-10 rounded-full bg-zinc-800/90 hover:bg-white hover:text-black border border-zinc-600/80 text-zinc-100 flex items-center justify-center transition-all duration-200 shadow-xl cursor-pointer hover:scale-105 active:scale-95 group"
        >
          <X className="w-5 h-5 transition-transform duration-200 group-hover:rotate-90" />
        </button>
      </div>

      {/* Main Image Viewport with macOS genie opening and minimize */}
      <div
        style={genieVars}
        onClick={(e) => e.stopPropagation()}
        className={`relative max-w-5xl max-h-[82vh] w-full flex items-center justify-center z-20 ${
          isClosing ? "animate-genie-close" : "animate-genie-open"
        }`}
      >
        <div className="relative group overflow-hidden rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(255,255,255,0.08)] border border-white/10 bg-zinc-950">
          <img
            src={photo.src}
            alt="Captured by Tharun"
            className="max-h-[76vh] max-w-full object-contain block select-none"
          />
        </div>

        {/* Previous Button - Always visible, high contrast with glowing glass aesthetic */}
        {totalPhotos > 1 && (
          <button
            onClick={handlePrev}
            type="button"
            aria-label="Previous photo"
            className="absolute -left-3 sm:-left-6 lg:-left-7 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-zinc-900/95 hover:bg-white border-2 border-zinc-400 hover:border-white text-white hover:text-black flex items-center justify-center transition-all duration-200 shadow-[0_10px_30px_rgba(0,0,0,0.9)] cursor-pointer hover:scale-110 active:scale-95 z-50 pointer-events-auto"
          >
            <ChevronLeft className="w-7 h-7 stroke-[2.5]" />
          </button>
        )}

        {/* Next Button - Always visible, high contrast with glowing glass aesthetic */}
        {totalPhotos > 1 && (
          <button
            onClick={handleNext}
            type="button"
            aria-label="Next photo"
            className="absolute -right-3 sm:-right-6 lg:-right-7 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-zinc-900/95 hover:bg-white border-2 border-zinc-400 hover:border-white text-white hover:text-black flex items-center justify-center transition-all duration-200 shadow-[0_10px_30px_rgba(0,0,0,0.9)] cursor-pointer hover:scale-110 active:scale-95 z-50 pointer-events-auto"
          >
            <ChevronRight className="w-7 h-7 stroke-[2.5]" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PhotoLightbox;
