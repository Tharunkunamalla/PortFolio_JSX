import {useEffect, useRef} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Tilt from "react-parallax-tilt";
import {Github} from "lucide-react";
import GitHubActivityCalendar from "./GitHubActivityCalendar";

gsap.registerPlugin(ScrollTrigger);

const GitHubStats = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  cardsRef.current = [];

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
              <div className="rounded-3xl p-4 bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800/80 shadow-sm transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-600 flex items-center justify-center min-h-[200px]">
                <img
                  src="https://github-readme-stats-eight-theta.vercel.app/api?username=Tharunkunamalla&show_icons=true&count_private=true&include_all_commits=true&line_height=20&icon_color=00b3ff&theme=blue-green&title_color=00b3ff"
                  alt="GitHub Stats"
                  className="w-full h-auto object-contain max-w-full"
                />
              </div>
            </Tilt>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubStats;
