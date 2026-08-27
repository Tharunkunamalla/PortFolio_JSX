"use client";

import React, {useEffect, useRef} from "react";

const BackgroundParticles = ({
  count = 35,
  minSize = 0.8,
  maxSize = 2.0,
  speed = "slow-mid", // "slow", "slow-mid", "mid"
  className = "",
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Speed multiplier
    let baseSpeedY = 0.45;
    if (speed === "slow") baseSpeedY = 0.25;
    if (speed === "mid") baseSpeedY = 0.75;

    // Adjust particle count based on screen size for optimal density
    const isMobile = width < 768;
    const effectiveCount = isMobile ? Math.floor(count * 0.6) : count;

    // Create particle collection
    const particles = [];
    for (let i = 0; i < effectiveCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * (maxSize - minSize) + minSize,
        vx: (Math.random() - 0.5) * 0.25, // subtle horizontal drift
        vy: -(Math.random() * 0.4 + baseSpeedY), // moving upwards
        opacity: Math.random() * 0.5 + 0.2,
        fadeSpeed: Math.random() * 0.006 + 0.002,
        fadeDirection: Math.random() > 0.5 ? 1 : -1,
        maxOpacity: Math.random() * 0.35 + 0.45,
        minOpacity: Math.random() * 0.12 + 0.08,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around vertically
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        } else if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
        }

        // Wrap around horizontally
        if (p.x < -10) {
          p.x = width + 10;
        } else if (p.x > width + 10) {
          p.x = -10;
        }

        // Gentle breathing opacity pulse
        p.opacity += p.fadeSpeed * p.fadeDirection;
        if (p.opacity >= p.maxOpacity) {
          p.opacity = p.maxOpacity;
          p.fadeDirection = -1;
        } else if (p.opacity <= p.minOpacity) {
          p.opacity = p.minOpacity;
          p.fadeDirection = 1;
        }

        // Draw refined, tiny glowing white particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.shadowBlur = p.radius * 2.5;
        ctx.shadowColor = "rgba(255, 255, 255, 0.75)";
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, minSize, maxSize, speed]);

  return (
    <div className={`fixed inset-0 pointer-events-none z-10 overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
};

export default BackgroundParticles;
