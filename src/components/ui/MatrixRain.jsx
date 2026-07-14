import {useEffect, useRef} from "react";
import {useTerminal} from "../../context/TerminalContext";

const MatrixRain = () => {
  const canvasRef = useRef(null);
  const {matrixActive} = useTerminal();

  useEffect(() => {
    if (!matrixActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Make canvas full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$#@&%*+=-/<>:;";
    const charArr = chars.split("");
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize) + 1;

    // One drop per column, initialized to a random negative position to stagger entry
    const drops = Array(columns)
      .fill(1)
      .map(() => -Math.floor(Math.random() * 100));

    let animationFrameId;

    const draw = () => {
      // Semi-transparent black to draw trail
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#39ff14"; // neon green matrix
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Draw a random character
        const char = charArr[Math.floor(Math.random() * charArr.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // If drop is on screen, draw it
        if (y > 0) {
          ctx.fillText(char, x, y);
        }

        // Send drop back to top randomly after it crosses screen
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [matrixActive]);

  if (!matrixActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-30 pointer-events-none bg-black/40"
      style={{mixBlendMode: "screen"}}
    />
  );
};

export default MatrixRain;
