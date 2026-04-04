// src/components/sections/Skills.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Cpu,
  Globe,
  Terminal,
} from "lucide-react";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiGreensock,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiFirebase,
  SiGit,
  SiFigma,
  SiGraphql,
  SiPython,
  SiPhp,
  SiRos,
  SiNumpy,
  SiPandas,
  SiPlotly,
  SiOpencv,
  SiLinux,
  SiGooglecloud,
  SiJupyter,
  SiGooglecolab,
  SiPostman,
  SiBootstrap,
  SiVercel,
  SiDocker,
  SiKubernetes,
  SiCplusplus,
  SiC,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { VscCode } from "react-icons/vsc";
import LeetCodeStats from "./LeetCodeStats.jsx";
import BackgroundParticles from "../layout/BackgroundParticles";
import Tilt from "react-parallax-tilt";

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  // Frontend
  { name: "HTML5", icon: <SiHtml5 />, category: "frontend", color: "#E34F26" },
  { name: "CSS3", icon: <SiCss />, category: "frontend", color: "#1572B6" },
  { name: "JavaScript", icon: <SiJavascript />, category: "frontend", color: "#F7DF1E" },
  { name: "TypeScript", icon: <SiTypescript />, category: "frontend", color: "#3178C6" },
  { name: "React.js", icon: <SiReact />, category: "frontend", color: "#61DAFB" },
  { name: "Redux", icon: <SiRedux />, category: "frontend", color: "#764ABC" },
  { name: "Tailwind", icon: <SiTailwindcss />, category: "frontend", color: "#06B6D4" },
  { name: "GSAP", icon: <SiGreensock />, category: "frontend", color: "#88CE02" },

  // Backend
  { name: "Java", icon: <FaJava />, category: "backend", color: "#007396" },
  { name: "Python", icon: <SiPython />, category: "backend", color: "#3776AB" },
  { name: "Node.js", icon: <SiNodedotjs />, category: "backend", color: "#339933" },
  { name: "MongoDB", icon: <SiMongodb />, category: "backend", color: "#47A248" },
  { name: "SQL", icon: <SiMysql />, category: "backend", color: "#4479A1" },
  { name: "C++", icon: <SiCplusplus />, category: "backend", color: "#00599C" },
  { name: "C", icon: <SiC />, category: "backend", color: "#A8B9CC" },

  // Ecosystem & AI
  { name: "Docker", icon: <SiDocker />, category: "ecosystem", color: "#2496ED" },
  { name: "Git", icon: <SiGit />, category: "ecosystem", color: "#F05032" },
  { name: "Postman", icon: <SiPostman />, category: "ecosystem", color: "#FF6C37" },
  { name: "Linux", icon: <SiLinux />, category: "ecosystem", color: "#FCC624" },
  { name: "OpenCV", icon: <SiOpencv />, category: "ecosystem", color: "#5C3EE8" },
  { name: "NumPy", icon: <SiNumpy />, category: "ecosystem", color: "#013243" },
  { name: "Pandas", icon: <SiPandas />, category: "ecosystem", color: "#150458" },
  { name: "Vercel", icon: <SiVercel />, category: "ecosystem", color: "#000000" },
];

const SkillCard = ({ skill }) => {
  return (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      perspective={1000}
      scale={1.05}
      transitionSpeed={1500}
      className="w-full h-full"
    >
      <div 
        className="group relative p-6 rounded-2xl bg-black/5 dark:bg-white/[0.03] border border-black/10 dark:border-white/5 hover:border-transparent transition-all duration-500 overflow-hidden"
        style={{ '--hover-color': skill.color }}
      >
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
          style={{ backgroundColor: skill.color }}
        />
        <div 
          className="absolute inset-0 border-2 border-transparent group-hover:border-[var(--hover-color)] opacity-0 group-hover:opacity-30 transition-all duration-500 rounded-2xl pointer-events-none"
        />

        <div className="relative z-10 flex flex-col items-center justify-center gap-4">
          <div className="p-4 rounded-xl bg-white/5 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">
            <span className="text-4xl" style={{ color: skill.color }}>{skill.icon}</span>
          </div>
          <h4 className="text-gray-600 dark:text-white/70 font-semibold text-lg group-hover:text-gray-900 dark:group-hover:text-white transition-colors text-center">
            {skill.name}
          </h4>
        </div>
      </div>
    </Tilt>
  );
};

const SkillsMarquee = ({ skills }) => {
  return (
    <div className="relative max-w-7xl mx-auto px-4 md:px-0">
      <div className="relative overflow-hidden py-8 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] group/reel transition-all duration-500 hover:border-white/20 hover:bg-white/[0.06]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/reel:animate-shine pointer-events-none" />
        
        <div className="flex whitespace-nowrap animate-marquee">
          {[...skills, ...skills].map((skill, idx) => (
            <div key={idx} className="flex items-center gap-4 px-12 group transition-transform duration-300">
              <span className="text-4xl grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" 
                    style={{ color: skill.color }}>
                {skill.icon}
              </span>
              <span className="text-gray-900/40 dark:text-white/20 group-hover:text-gray-900/90 dark:group-hover:text-white/90 font-black tracking-widest uppercase transition-colors text-[10px]">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-2xl opacity-0 group-hover/reel:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 90%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      const cards = gsap.utils.toArray(".skill-card-anim");
      gsap.from(cards, {
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.04,
        duration: 0.8,
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
      className="relative py-28 bg-light-100 dark:bg-gradient-to-br from-[#0f0f14] via-[#12121a] to-[#0c0c10] transition-colors duration-300 overflow-hidden"
    >
      <BackgroundParticles />
      
      {/* ===== TOP BLEND ===== */}
      <div
        className="
            pointer-events-none absolute top-0 inset-x-0 h-24 z-10
            bg-gradient-to-b
            from-white/80 to-transparent
            dark:from-black/60
          "
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2
            ref={headingRef}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white tracking-tight"
          >
            Technical <span className="text-secondary-500">Skills</span>
          </h2>
        </div>

        <div className="space-y-24">
          {["frontend", "backend"].map((cat) => (
            <div key={cat} className="space-y-10">
              <div className="flex items-center gap-4 opacity-70 px-2">
                 <h3 className="text-sm font-black uppercase tracking-[0.3em] text-gray-500 dark:text-white/40 flex items-center gap-2">
                    {cat === 'frontend' ? <Globe className="w-4 h-4" /> : <Terminal className="w-4 h-4" />}
                    {cat} Development
                 </h3>
                 <div className="h-[1px] flex-1 bg-black/10 dark:bg-white/20" />
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-4 skills-grid">
                {categorizedSkills[cat].map((skill) => (
                  <div key={skill.name} className="skill-card-anim">
                    <SkillCard skill={skill} />
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="space-y-10 pt-10">
              <div className="flex items-center gap-4 opacity-70 px-2">
                 <h3 className="text-sm font-black uppercase tracking-[0.3em] text-gray-500 dark:text-white/40 flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    Tools & Ecosystem
                 </h3>
                 <div className="h-[1px] flex-1 bg-black/10 dark:bg-white/20" />
              </div>
              <SkillsMarquee skills={categorizedSkills.ecosystem} />
          </div>
        </div>

        {/* LeetCodeStats moved inside section to fix background gap */}
        <div className="mt-32 relative z-20">
          <LeetCodeStats />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes shine {
          100% { transform: translateX(100%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .animate-shine {
          animation: shine 1.5s ease-out;
        }
      `}} />

      {/* ===== BOTTOM BLEND ===== */}
      <div
        className="
            pointer-events-none absolute bottom-0 inset-x-0 h-32 z-10
            bg-gradient-to-t
            from-white/90 to-transparent
            dark:from-black/80
          "
      />
    </section>
  );
};

export default Skills;
