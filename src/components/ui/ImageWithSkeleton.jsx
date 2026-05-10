import React, {useState, useEffect} from "react";

export default function ImageWithSkeleton({
  src,
  alt = "",
  className = "",
  style = {},
  loading = "lazy",
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setFailed(false);
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {!failed && (
        <div
          aria-hidden
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${loaded ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        >
          <div className="w-full h-full bg-gray-300 dark:bg-gray-800 animate-pulse" />
        </div>
      )}

      {failed && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-500 dark:text-gray-400 text-sm font-medium px-4 text-center">
          <span className="truncate">{alt || "Image unavailable"}</span>
        </div>
      )}

      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        {...props}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        loading={loading}
      />
    </div>
  );
}
