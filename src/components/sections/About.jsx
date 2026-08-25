import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import BackgroundParticles from "../layout/BackgroundParticles";
import {aboutData} from "../../constants/aboutData";
import {FileText, ArrowUpRight, Briefcase, GraduationCap, Award, Sparkles, Building2, Calendar} from "lucide-react";

const tabIcons = {
  Experience: Briefcase,
  Education: GraduationCap,
  Certifications: Award,
};

const About = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Experience");
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        {opacity: 0, y: 15},
        {opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power2.out"}
      );
    }
  }, [activeTab]);

  const activeCategory = aboutData.find((section) => section.title === activeTab) || aboutData[2];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen pt-28 pb-20 md:pt-32 md:pb-24 bg-white dark:bg-[#09090b] overflow-hidden transition-colors duration-300"
    >
      <BackgroundParticles />

      {/* Monochromatic background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-black/[0.02] dark:bg-white/[0.03] rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-black/[0.02] dark:bg-white/[0.03] rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">
        {/* Page Header */}
        <div ref={headingRef} className="max-w-3xl mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white"></span>
            Background & Journey
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-black dark:text-white tracking-tight leading-tight mb-4">
            Engineering with Passion,{" "}
            <span className="text-zinc-500 dark:text-zinc-400">
              Building with Purpose.
            </span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg font-light leading-relaxed">
            Full Stack Developer & AI enthusiast focused on building scalable, high-performance web systems and intuitive user experiences.
          </p>
        </div>

        {/* Compact Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Anime Visual + Bio Summary (5 cols) */}
          <div className="lg:col-span-5 bg-zinc-50 dark:bg-zinc-950/80 p-6 sm:p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between h-full space-y-6">
            <div className="mx-auto w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 flex items-center justify-center">
              <img
                src="/assets/about.gif"
                alt="About Animation"
                className="w-full h-full object-contain filter contrast-110"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-black dark:text-white">
                Tharun Kunamalla
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed font-light">
                Computer Science undergraduate at <strong>IIIT Kottayam (2023 - 2027)</strong>. Specialized in building enterprise-grade backend microservices and full-stack solutions using <strong className="text-black dark:text-white font-semibold">Java, Spring Boot</strong>, and the <strong className="text-black dark:text-white font-semibold">MERN Stack</strong> (MongoDB, Express, React, Node.js).
              </p>
              <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed font-light">
                Passionate about clean architecture, high-throughput REST APIs, database optimization, and intelligent machine learning workflows. Research Intern at NIT Warangal and active open-source contributor.
              </p>
            </div>

            {/* Highlights Chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white">
                🎓 IIIT Kottayam '27
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white">
                ☕ Spring Boot & Java
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white">
                ⚛️ MERN Stack
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white">
                🔬 NIT Warangal Intern
              </span>
            </div>

            {/* Resume Button */}
            <div className="pt-2">
              <button
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/tharun-kunamalla-b9b477288/",
                    "_blank",
                  )
                }
                className="interactive w-full sm:w-auto px-6 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-xs uppercase tracking-widest hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
              >
                <FileText className="w-4 h-4" />
                View Full Resume / LinkedIn
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Category Hub (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Category Tab Switcher */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              {["Experience", "Education", "Certifications"].map((tabName) => {
                const Icon = tabIcons[tabName];
                const count = aboutData.find((d) => d.title === tabName)?.items.length || 0;
                const isActive = activeTab === tabName;

                return (
                  <button
                    key={tabName}
                    onClick={() => setActiveTab(tabName)}
                    className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                      isActive
                        ? "bg-white dark:bg-black text-black dark:text-white shadow-sm border border-zinc-200 dark:border-zinc-700"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tabName}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white" : "bg-zinc-200/60 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* List of items in active category */}
            <div
              ref={contentRef}
              className="space-y-3 max-h-[580px] overflow-y-auto pr-1 terminal-scrollbar"
            >
              {activeCategory.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950/90 border border-zinc-200 dark:border-zinc-800/90 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all duration-200 shadow-xs group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-black dark:bg-white shrink-0 group-hover:scale-125 transition-transform" />
                      <h4 className="font-display font-bold text-base sm:text-lg text-black dark:text-white group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition-colors">
                        {item.name}
                      </h4>
                    </div>

                    {item.date && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-zinc-200/70 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-black dark:text-zinc-200 self-start sm:self-auto shrink-0">
                        <Calendar className="w-3 h-3 text-zinc-500" />
                        {item.date}
                      </span>
                    )}
                  </div>

                  {item.description && (
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 font-light pl-5 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
