import {useEffect, useRef} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {Cpu, Globe, Terminal, Layers} from "lucide-react";
import {skillsData} from "../../constants/skillsData";
import LeetCodeStats from "./LeetCodeStats.jsx";
import GitHubStats from "./GitHubStats.jsx";
import BackgroundParticles from "../layout/BackgroundParticles";
import Tilt from "react-parallax-tilt";

gsap.registerPlugin(ScrollTrigger);

const SkillCard = ({skill}) => {
  return (
    <Tilt
      tiltMaxAngleX={8}
      tiltMaxAngleY={8}
      perspective={1000}
      scale={1.03}
      transitionSpeed={1500}
      className="w-full h-full"
    >
      <div className="group relative p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-lg">
        <div className="relative z-10 flex flex-col items-center justify-center gap-3">
          <div className="p-3.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
            <span className="text-3xl" style={{color: skill.color}}>
              {skill.icon}
            </span>
          </div>
          <h4 className="text-zinc-700 dark:text-zinc-300 font-display font-semibold text-xs tracking-wider uppercase group-hover:text-black dark:group-hover:text-white transition-colors text-center">
            {skill.name}
          </h4>
        </div>
      </div>
    </Tilt>
  );
};

const SkillsMarquee = ({skills}) => {
  return (
    <div className="relative max-w-7xl mx-auto px-4 md:px-0">
      <div className="relative overflow-hidden py-6 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-950/60 backdrop-blur-xl shadow-sm group/reel transition-all duration-300 hover:border-zinc-400 dark:hover:border-zinc-600">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...skills, ...skills].map((skill, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-10 group transition-transform duration-300"
            >
              <span className="text-3xl group-hover:scale-110 transition-all duration-300" style={{color: skill.color}}>
                {skill.icon}
              </span>
              <span className="text-zinc-600 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white font-mono font-bold tracking-widest uppercase transition-colors text-xs">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      const cards = gsap.utils.toArray(".skill-card-anim");
      gsap.from(cards, {
        y: 25,
        opacity: 0,
        stagger: 0.03,
        duration: 0.7,
        ease: "power2.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const categorizedSkills = skillsData.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen pt-28 pb-20 md:pt-32 md:pb-24 bg-white dark:bg-[#09090b] transition-colors duration-300 overflow-hidden"
    >
      {/* Fixed Background Video Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed inset-0 w-full h-full object-cover opacity-25 dark:opacity-30 filter contrast-125 brightness-75 -z-10"
        >
          <source src="/assets/skill-vid.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white dark:from-[#09090b]/90 dark:via-[#09090b]/75 dark:to-[#09090b]" />
      </div>

      <BackgroundParticles />

      {/* Monochromatic Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-black/[0.02] dark:bg-white/[0.03] rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-black/[0.02] dark:bg-white/[0.03] rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Page Header */}
        <div ref={headingRef} className="max-w-3xl mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white"></span>
            Technical Arsenal
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-black dark:text-white tracking-tight leading-tight mb-4">
            Skills & Expertise
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg font-light leading-relaxed">
            Technologies, frameworks, and modern tools leveraged across frontend, backend, machine learning, and cloud infrastructure.
          </p>
        </div>

        <div className="space-y-16">
          {["frontend", "backend"].map((cat) => (
            <div key={cat} className="space-y-6">
              <div className="flex items-center gap-4 px-1">
                <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                  {cat === "frontend" ? (
                    <Globe className="w-4 h-4 text-zinc-500" />
                  ) : (
                    <Terminal className="w-4 h-4 text-zinc-500" />
                  )}
                  {cat} Architecture
                </h3>
                <div className="h-[1px] flex-1 bg-zinc-200 dark:bg-zinc-800" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-4 skills-grid">
                {categorizedSkills[cat]?.map((skill) => (
                  <div key={skill.name} className="skill-card-anim">
                    <SkillCard skill={skill} />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Ecosystem / Marquee */}
          <div className="space-y-6 pt-4">
            <div className="flex items-center gap-4 px-1">
              <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-zinc-500" />
                DevOps, AI & Ecosystem
              </h3>
              <div className="h-[1px] flex-1 bg-zinc-200 dark:bg-zinc-800" />
            </div>
            {categorizedSkills.ecosystem && (
              <SkillsMarquee skills={categorizedSkills.ecosystem} />
            )}
          </div>
        </div>

        {/* Live Coding Analytics Section */}
        <div className="mt-24 space-y-16">
          <div className="flex items-center gap-4 px-1">
            <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-zinc-500" />
              Live Coding Metrics
            </h3>
            <div className="h-[1px] flex-1 bg-zinc-200 dark:bg-zinc-800" />
          </div>

          <div className="space-y-12">
            <LeetCodeStats />
            <GitHubStats />
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          --marquee-duration: 22s;
          animation: marquee var(--marquee-duration) linear infinite;
        }
        @media (max-width: 640px) {
          .animate-marquee { --marquee-duration: 12s; }
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `,
        }}
      />
    </section>
  );
};

export default Skills;
