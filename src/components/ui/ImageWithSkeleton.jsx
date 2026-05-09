import React, {useState, useEffect} from "react";

export default function ImageWithSkeleton({
  src,
  alt = "",
  className = "",
  style = {},
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);
  const [triedFallback, setTriedFallback] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setImgSrc(src);
    setTriedFallback(false);
  }, [src]);

  const handleError = () => {
    if (!triedFallback) {
      // fallback to a lightweight placeholder shipped in public assets
      setImgSrc("/assets/img.png");
      setTriedFallback(true);
    } else {
      // final fallback: mark loaded so layout shows a neutral background
      setLoaded(true);
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      <img
        src={imgSrc}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={handleError}
        {...props}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-90"}`}
        loading="lazy"
      />
      {!loaded && (
        // keep a tiny low-cost overlay while image decodes, but not the original skeleton
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20" aria-hidden />
      )}
    </div>
  );
}
