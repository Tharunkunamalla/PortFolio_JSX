const Line = () => {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 pointer-events-none z-30 overflow-hidden"
      aria-hidden="true"
    >
      {/* Ultra-thin 1px laser line: Glowing white on left fading to transparent on right in dark theme */}
      <div className="relative w-full h-[1px] bg-gradient-to-r from-black via-zinc-400/30 to-transparent dark:from-white dark:via-white/30 dark:to-transparent">
        {/* Subtle luminous glow on the sharp left leading end */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-48 sm:w-80 h-[2px] bg-gradient-to-r from-black to-transparent dark:from-white dark:to-transparent opacity-90 blur-[1.5px]" />
      </div>
    </div>
  );
};

export default Line;
