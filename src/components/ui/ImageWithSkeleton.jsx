import React, { useState, useEffect } from 'react'

export default function ImageWithSkeleton({ src, alt = '', className = '', style = {}, ...props }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(false)
  }, [src])

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      <div
        aria-hidden
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <div className="w-full h-full bg-gray-300 dark:bg-gray-800 animate-pulse" />
      </div>

      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        {...props}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
      />
    </div>
  )
}
