import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { X, ChevronLeft, ChevronRight, Camera, Download, Loader2, Sparkles, CheckCircle2 } from "lucide-react";

const PhotoLightbox = ({ photo, photos, sourceRect, onClose, onNavigate }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [downloadState, setDownloadState] = useState("idle"); // "idle" | "generating" | "ready"
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
    if (isClosing || downloadState === "generating") return;
    const prevIndex = (currentIndex - 1 + totalPhotos) % totalPhotos;
    onNavigate(photos[prevIndex]);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    if (isClosing || downloadState === "generating") return;
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
  }, [currentIndex, photos, handleClose, downloadState]);

  // Generate downloadable collectible card with photo, photographer name, and github/developer credentials
  const handleDownloadCard = async (e) => {
    e?.stopPropagation();
    if (downloadState === "generating") return;

    setDownloadState("generating");

    try {
      // Load source image
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = photo.src;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => {
          // If cors blocks direct blob access, continue to allow drawing
          resolve();
        };
      });

      // Artificial mini-delay to show the sleek card generation animation
      await new Promise((r) => setTimeout(r, 900));

      // Canvas dimensions for a high-res collector's card
      const cardPadding = 48;
      const cardWidth = 1400;
      const photoWidth = cardWidth - cardPadding * 2;
      const photoHeight = Math.round((photoWidth * (img.naturalHeight || 900)) / (img.naturalWidth || 1400));
      const footerHeight = 220;
      const headerHeight = 90;
      const cardHeight = headerHeight + photoHeight + footerHeight + cardPadding * 2;

      const canvas = document.createElement("canvas");
      canvas.width = cardWidth;
      canvas.height = cardHeight;
      const ctx = canvas.getContext("2d");

      // 1. Sleek Dark Obsidian Glass Background
      const bgGrad = ctx.createLinearGradient(0, 0, cardWidth, cardHeight);
      bgGrad.addColorStop(0, "#08080a");
      bgGrad.addColorStop(0.5, "#0d0e12");
      bgGrad.addColorStop(1, "#050507");
      ctx.fillStyle = bgGrad;

      // Rounded card background
      const radius = 36;
      ctx.beginPath();
      ctx.moveTo(radius, 0);
      ctx.lineTo(cardWidth - radius, 0);
      ctx.quadraticCurveTo(cardWidth, 0, cardWidth, radius);
      ctx.lineTo(cardWidth, cardHeight - radius);
      ctx.quadraticCurveTo(cardWidth, cardHeight, cardWidth - radius, cardHeight);
      ctx.lineTo(radius, cardHeight);
      ctx.quadraticCurveTo(0, cardHeight, 0, cardHeight - radius);
      ctx.lineTo(0, radius);
      ctx.quadraticCurveTo(0, 0, radius, 0);
      ctx.closePath();
      ctx.fill();

      // Outer silver glow border
      ctx.lineWidth = 3;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx.stroke();

      // 2. Top Header inside Card
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.font = "bold 26px 'Plus Jakarta Sans', system-ui, sans-serif";
      ctx.fillText("EXCLUSIVE PHOTOGRAPHY", cardPadding, cardPadding + 36);

      // 3. Render Photo inside clipped rounded rect
      const imgY = cardPadding + headerHeight;
      const imgRadius = 24;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cardPadding + imgRadius, imgY);
      ctx.lineTo(cardPadding + photoWidth - imgRadius, imgY);
      ctx.quadraticCurveTo(cardPadding + photoWidth, imgY, cardPadding + photoWidth, imgY + imgRadius);
      ctx.lineTo(cardPadding + photoWidth, imgY + photoHeight - imgRadius);
      ctx.quadraticCurveTo(cardPadding + photoWidth, imgY + photoHeight, cardPadding + photoWidth - imgRadius, imgY + photoHeight);
      ctx.lineTo(cardPadding + imgRadius, imgY + photoHeight);
      ctx.quadraticCurveTo(cardPadding, imgY + photoHeight, cardPadding, imgY + photoHeight - imgRadius);
      ctx.lineTo(cardPadding, imgY + imgRadius);
      ctx.quadraticCurveTo(cardPadding, imgY, cardPadding + imgRadius, imgY);
      ctx.closePath();
      ctx.clip();

      ctx.drawImage(img, cardPadding, imgY, photoWidth, photoHeight);
      ctx.restore();

      // Photo border
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cardPadding + imgRadius, imgY);
      ctx.lineTo(cardPadding + photoWidth - imgRadius, imgY);
      ctx.quadraticCurveTo(cardPadding + photoWidth, imgY, cardPadding + photoWidth, imgY + imgRadius);
      ctx.lineTo(cardPadding + photoWidth, imgY + photoHeight - imgRadius);
      ctx.quadraticCurveTo(cardPadding + photoWidth, imgY + photoHeight, cardPadding + photoWidth - imgRadius, imgY + photoHeight);
      ctx.lineTo(cardPadding + imgRadius, imgY + photoHeight);
      ctx.quadraticCurveTo(cardPadding, imgY + photoHeight, cardPadding, imgY + photoHeight - imgRadius);
      ctx.lineTo(cardPadding, imgY + imgRadius);
      ctx.quadraticCurveTo(cardPadding, imgY, cardPadding + imgRadius, imgY);
      ctx.closePath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.stroke();
      ctx.restore();

      // 4. Card Details Footer
      const footerY = imgY + photoHeight + 48;

      // Divider line
      ctx.beginPath();
      ctx.moveTo(cardPadding, footerY - 18);
      ctx.lineTo(cardWidth - cardPadding, footerY - 18);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Left Column: Captured By Tharun Kunamalla
      ctx.fillStyle = "#8a8f9d";
      ctx.font = "600 18px 'JetBrains Mono', monospace";
      ctx.fillText("CAPTURED BY", cardPadding, footerY + 12);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 34px 'Plus Jakarta Sans', system-ui, sans-serif";
      ctx.fillText("Tharun Kunamalla", cardPadding, footerY + 54);

      // Right Column: Developed by Tharun Kunamalla & Full-Stack Software Engineer
      ctx.textAlign = "right";
      ctx.fillStyle = "#8a8f9d";
      ctx.font = "600 18px 'JetBrains Mono', monospace";
      ctx.fillText("DEVELOPED BY THARUN KUNAMALLA", cardWidth - cardPadding, footerY + 12);

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 32px 'Plus Jakarta Sans', system-ui, sans-serif";
      ctx.fillText("Full-Stack Software Engineer", cardWidth - cardPadding, footerY + 54);
      ctx.textAlign = "left";

      // Trigger Instant Download
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `tharun-photography-frame-${currentIndex + 1}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadState("ready");
      setTimeout(() => setDownloadState("idle"), 2400);
    } catch (err) {
      console.error("Card generation failed:", err);
      setDownloadState("idle");
    }
  };

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

          {/* Loading overlay when generating card */}
          {downloadState === "generating" && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center gap-3.5 text-white z-30 animate-fadeIn">
              <div className="relative">
                <div className="w-14 h-14 rounded-full border-2 border-white/20 border-t-white animate-spin flex items-center justify-center" />
                <Sparkles className="w-5 h-5 text-amber-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              </div>
              <div className="text-center">
                <h4 className="font-display font-semibold text-base sm:text-lg text-white tracking-wide">
                  Generating Collector Card...
                </h4>
                <p className="text-xs font-mono text-zinc-400 mt-1">
                  Embedding photographer & developer credentials
                </p>
              </div>
            </div>
          )}
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

      {/* Right Bottom Download Floating Action Button */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-5 right-5 sm:bottom-7 sm:right-8 z-40 pointer-events-auto"
      >
        <button
          onClick={handleDownloadCard}
          disabled={downloadState === "generating"}
          type="button"
          aria-label="Download photography card"
          title="Download Collector Card with Credentials"
          className={`flex items-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full font-medium text-xs sm:text-sm shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(255,255,255,0.1)] border transition-all duration-300 cursor-pointer ${
            downloadState === "generating"
              ? "bg-zinc-800 border-zinc-600 text-zinc-300 cursor-wait"
              : downloadState === "ready"
              ? "bg-emerald-500 hover:bg-emerald-400 border-emerald-400 text-black font-semibold"
              : "bg-white/10 hover:bg-white text-white hover:text-black border-white/20 hover:border-white backdrop-blur-xl hover:scale-105 active:scale-95"
          }`}
        >
          {downloadState === "generating" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Creating Card...</span>
            </>
          ) : downloadState === "ready" ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-black" />
              <span>Card Downloaded!</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Download Card</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PhotoLightbox;
