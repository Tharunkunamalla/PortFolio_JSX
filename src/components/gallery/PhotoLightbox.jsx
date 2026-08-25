import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight, MapPin, Calendar, Camera, Maximize2 } from "lucide-react";

const PhotoLightbox = ({ photo, photos, onClose, onNavigate }) => {
  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);
  const totalPhotos = photos.length;

  const handlePrev = (e) => {
    e?.stopPropagation();
    const prevIndex = (currentIndex - 1 + totalPhotos) % totalPhotos;
    onNavigate(photos[prevIndex]);
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    const nextIndex = (currentIndex + 1) % totalPhotos;
    onNavigate(photos[nextIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [currentIndex, photos]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      {/* Top Navigation & Status Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-6 left-6 right-6 flex items-center justify-between text-white z-20 pointer-events-auto"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-zinc-300">
            <Camera className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm sm:text-base text-white tracking-wide">
              {photo.title}
            </h3>
            <span className="text-[11px] font-mono text-zinc-400">
              Frame {currentIndex + 1} of {totalPhotos}
            </span>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close photo preview"
          className="w-10 h-10 rounded-full bg-zinc-800/80 border border-zinc-700/60 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl max-h-[80vh] w-full flex items-center justify-center select-none"
      >
        <img
          src={photo.src}
          alt={photo.title}
          className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl border border-zinc-800/60 transition-transform duration-300 hover:scale-[1.01]"
        />

        {/* Previous Button */}
        {totalPhotos > 1 && (
          <button
            onClick={handlePrev}
            type="button"
            aria-label="Previous photo"
            className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-zinc-900/90 border border-zinc-700/80 text-white hover:bg-white hover:text-black flex items-center justify-center transition-all duration-200 shadow-xl cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {totalPhotos > 1 && (
          <button
            onClick={handleNext}
            type="button"
            aria-label="Next photo"
            className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-zinc-900/90 border border-zinc-700/80 text-white hover:bg-white hover:text-black flex items-center justify-center transition-all duration-200 shadow-xl cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Metadata Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-6 inset-x-6 flex items-center justify-center gap-4 text-xs font-mono text-zinc-400 pointer-events-auto"
      >
        <div className="px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800/80 flex items-center gap-4 shadow-lg backdrop-blur-md">
          {photo.location && (
            <span className="flex items-center gap-1.5 text-zinc-300">
              <MapPin className="w-3.5 h-3.5 text-zinc-500" />
              {photo.location}
            </span>
          )}
          {photo.date && (
            <span className="flex items-center gap-1.5 text-zinc-400 border-l border-zinc-800 pl-4">
              <Calendar className="w-3.5 h-3.5 text-zinc-500" />
              {photo.date}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoLightbox;
