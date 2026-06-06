import {useEffect, useRef} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Tilt from "react-parallax-tilt";

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
        {y: 30, opacity: 0},
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
        {y: 40, scale: 0.98, opacity: 0},
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.7,
          stagger: 0.2,
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
    <div ref={sectionRef} className="relative w-full py-16 z-30">
      <div className="container mx-auto px-6">
        {/* HEADING */}
        <div
          ref={headingRef}
          className="flex flex-col items-center justify-center gap-4 mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white transition-colors">
            My <span className="text-secondary-500">GitHub Stats</span>
          </h2>

          <div className="flex items-center gap-2 text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-full w-full bg-blue-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest leading-none">
              Live Data
            </span>
          </div>
        </div>

        {/* STATS IMAGES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center justify-center">
          <div
            ref={(el) => (cardsRef.current[0] = el)}
            className="flex justify-center w-full"
          >
            <Tilt
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              perspective={1000}
              scale={1.02}
              transitionSpeed={1500}
              className="w-full"
            >
              <div className="rounded-2xl p-4 bg-white/5 dark:bg-white/[0.03] backdrop-blur-3xl border border-gray-200 dark:border-white/10 shadow-2xl transition-all duration-300 hover:border-blue-500/30 hover:-translate-y-1 flex items-center justify-center min-h-[220px]">
                <img
                  src="https://streak-stats.demolab.com?user=Tharunkunamalla&theme=blue-green&hide_border=true&date_format=%5BY%20%5DM%20j"
                  alt="GitHub Streak"
                  className="w-full h-auto object-contain max-w-full drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                />
              </div>
            </Tilt>
          </div>

          <div
            ref={(el) => (cardsRef.current[1] = el)}
            className="flex justify-center w-full"
          >
            <Tilt
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              perspective={1000}
              scale={1.02}
              transitionSpeed={1500}
              className="w-full"
            >
              <div className="rounded-2xl p-4 bg-white/5 dark:bg-white/[0.03] backdrop-blur-3xl border border-gray-200 dark:border-white/10 shadow-2xl transition-all duration-300 hover:border-blue-500/30 hover:-translate-y-1 flex items-center justify-center min-h-[220px]">
                <img
                  src="https://github-readme-stats-eight-theta.vercel.app/api?username=Tharunkunamalla&show_icons=true&count_private=true&line_height=20&icon_color=00b3ff&theme=blue-green&title_color=00b3ff"
                  alt="GitHub Stats"
                  className="w-full h-auto object-contain max-w-full drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
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
