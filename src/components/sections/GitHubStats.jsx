import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Tilt from "react-parallax-tilt";
import {Github, RefreshCw, AlertCircle, Sparkles, ExternalLink} from "lucide-react";
import GitHubActivityCalendar from "./GitHubActivityCalendar";

gsap.registerPlugin(ScrollTrigger);

const STATS_URLS = [
  "https://github-readme-stats.vercel.app/api?username=Tharunkunamalla&show_icons=true&include_all_commits=true&line_height=20&icon_color=00b3ff&theme=blue-green&title_color=00b3ff&hide_border=true",
  "https://github-readme-stats-fast.vercel.app/api?username=Tharunkunamalla&show_icons=true&include_all_commits=true&line_height=20&icon_color=00b3ff&theme=blue-green&title_color=00b3ff&hide_border=true",
];

const GitHubStats = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  const [statsUrlIndex, setStatsUrlIndex] = useState(0);
  const [hasStatsError, setHasStatsError] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  cardsRef.current = [];

  const handleStatsError = () => {
    if (statsUrlIndex < STATS_URLS.length - 1) {
      setStatsUrlIndex((prev) => prev + 1);
    } else {
      setHasStatsError(true);
    }
  };

  const handleManualRetry = () => {
    setIsRetrying(true);
    setHasStatsError(false);
    setStatsUrlIndex(0);
    setTimeout(() => {
      setIsRetrying(false);
    }, 700);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading Entrance
      gsap.fromTo(
        headingRef.current,
        {y: 20, opacity: 0},
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Cards Grid Entrance
      gsap.fromTo(
        cardsRef.current,
        {y: 30, scale: 0.98, opacity: 0},
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative w-full py-8 z-30">
      <div className="container mx-auto px-0 space-y-10">
        {/* HEADING */}
        <div
          ref={headingRef}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-black dark:text-white">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-black dark:text-white">
                GitHub Metrics & Activity
              </h2>
              <p className="text-xs font-mono text-zinc-500">Live Continuous Synchronization</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-500/20 self-start sm:self-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest leading-none">
              Live Stream
            </span>
          </div>
        </div>

        {/* GITHUB ACTIVITY HEATMAP WITH EXACT NUMBERS */}
        <div ref={(el) => (cardsRef.current[0] = el)} className="w-full">
          <GitHubActivityCalendar />
        </div>

        {/* STATS IMAGES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center justify-center">
          <div
            ref={(el) => (cardsRef.current[1] = el)}
            className="flex justify-center w-full"
          >
            <Tilt
              tiltMaxAngleX={4}
              tiltMaxAngleY={4}
              perspective={1000}
              scale={1.01}
              transitionSpeed={1500}
              className="w-full"
            >
              <div className="rounded-3xl p-4 bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800/80 shadow-sm transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-600 flex items-center justify-center min-h-[200px]">
                <img
                  src="https://streak-stats.demolab.com?user=Tharunkunamalla&theme=blue-green&hide_border=true&date_format=%5BY%20%5DM%20j&mode=daily"
                  alt="GitHub Streak"
                  className="w-full h-auto object-contain max-w-full"
                />
              </div>
            </Tilt>
          </div>

          <div
            ref={(el) => (cardsRef.current[2] = el)}
            className="flex justify-center w-full"
          >
            <Tilt
              tiltMaxAngleX={4}
              tiltMaxAngleY={4}
              perspective={1000}
              scale={1.01}
              transitionSpeed={1500}
              className="w-full"
            >
              <div className="rounded-3xl p-4 bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800/80 shadow-sm transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-600 flex items-center justify-center min-h-[195px] relative overflow-hidden group">
                {!hasStatsError ? (
                  <img
                    key={statsUrlIndex}
                    src={STATS_URLS[statsUrlIndex]}
                    alt="GitHub Stats"
                    onError={handleStatsError}
                    className="w-full h-auto object-contain max-w-full transition-opacity duration-300"
                  />
                ) : (
                  /* Human-written anime-styled fallback card when open-source service is temporarily down */
                  <div className="relative w-full p-6 sm:p-7 flex flex-col justify-between min-h-[200px] overflow-hidden select-none">
                    {/* Animated Cyberpunk / Anime Corner Decors */}
                    <span className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-cyan-500/60" />
                    <span className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-cyan-500/60" />
                    <span className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-cyan-500/60" />
                    <span className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-cyan-500/60" />

                    {/* Subtle Scanline Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,179,255,0.03)_51%)] bg-[length:100%_4px] pointer-events-none" />

                    {/* Top Row: Status Tag & Live Pulse */}
                    <div className="flex items-center justify-between z-10">
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[10px] font-mono font-bold tracking-widest uppercase text-cyan-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                        SYNC_TIMEOUT // RE-ROUTING
                      </div>
                      <span className="font-mono text-[11px] text-zinc-500 tracking-wider">
                        @Tharunkunamalla
                      </span>
                    </div>

                    {/* Middle: Natural human developer note */}
                    <div className="my-3 space-y-1.5 z-10 text-left">
                      <h4 className="text-sm sm:text-base font-display font-extrabold text-black dark:text-white flex items-center gap-2 tracking-wide">
                        <span>Card service taking a quick breather</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-mono font-normal">
                          (429/busy)
                        </span>
                      </h4>
                      <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md">
                        The free public card generator is throttling right now. All my repos, code commits, and commits streak remain 100% live on GitHub!
                      </p>
                    </div>

                    {/* Bottom Action Controls */}
                    <div className="flex items-center justify-between pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 z-10">
                      <button
                        onClick={handleManualRetry}
                        disabled={isRetrying}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black dark:bg-white text-white dark:text-black hover:scale-105 active:scale-95 text-[11px] font-mono font-bold uppercase tracking-wider transition-all duration-200 disabled:opacity-50 shadow-sm"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isRetrying ? "animate-spin" : ""}`} />
                        <span>{isRetrying ? "Pinging..." : "Refresh Card"}</span>
                      </button>

                      <a
                        href="https://github.com/Tharunkunamalla"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-cyan-500 hover:text-cyan-400 transition-colors group"
                      >
                        <span>Inspect on GitHub</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </Tilt>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubStats;
