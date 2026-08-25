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

      {/* Fixed Atmospheric Background Image Layer */}
      <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <img
          src="/assets/bg-about.jpg"
          alt="About Background"
          className="w-full h-full object-cover opacity-35 dark:opacity-40 filter contrast-125 brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/55 to-white/85 dark:from-[#09090b]/85 dark:via-[#09090b]/55 dark:to-[#09090b]/85" />
      </div>

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
          {/* Left Column: Premium Bento Profile Hub (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Main Profile Bento Card */}
            <div className="bg-zinc-50 dark:bg-zinc-950/80 p-6 sm:p-7 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
              {/* Profile Header with Avatar and Info */}
              <div className="flex items-center gap-5">
                <div className="relative group shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-black border-2 border-zinc-300 dark:border-zinc-700 shadow-xl transition-transform duration-500 group-hover:scale-105 flex items-center justify-center">
                    <img
                      src="/assets/img.png"
                      alt="Tharun K"
                      className="w-full h-full object-contain "
                    />
                  </div>
                </div>

                <div className="min-w-0">
                  <h3 className="text-2xl sm:text-3xl font-sans font-extrabold text-black dark:text-white tracking-tight leading-tight mb-1">
                    Tharun K
                  </h3>
                  <p className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2">
                    Backend & Full-Stack Engineer
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-zinc-200/70 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
                    <span>Open to Roles</span>
                  </div>
                </div>
              </div>

              {/* Engineering Narrative */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800/80 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  <span>// Core Focus</span>
                  <span>IIIT-K '27</span>
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm leading-relaxed font-light">
                  Specialized in architecting high-throughput backend microservices and responsive web applications with <strong className="font-semibold text-black dark:text-white">Java, Spring Boot</strong>, and the <strong className="font-semibold text-black dark:text-white">MERN Stack</strong>. Research intern at NIT Warangal and active open-source contributor.
                </p>
              </div>

              {/* 2x2 Mini Metric Bento Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 block mb-0.5">
                    Institution
                  </span>
                  <p className="font-display font-bold text-xs sm:text-sm text-black dark:text-white">
                    IIIT Kottayam
                  </p>
                  <span className="text-[11px] text-zinc-500 font-mono">2023 - 2027</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 block mb-0.5">
                    Research
                  </span>
                  <p className="font-display font-bold text-xs sm:text-sm text-black dark:text-white">
                    NIT Warangal
                  </p>
                  <span className="text-[11px] text-zinc-500 font-mono">Summer '26</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 block mb-0.5">
                    Backend Core
                  </span>
                  <p className="font-display font-bold text-xs sm:text-sm text-black dark:text-white">
                    Spring Boot & Java
                  </p>
                  <span className="text-[11px] text-zinc-500 font-mono">Microservices</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 block mb-0.5">
                    Web Stack
                  </span>
                  <p className="font-display font-bold text-xs sm:text-sm text-black dark:text-white">
                    MERN Ecosystem
                  </p>
                  <span className="text-[11px] text-zinc-500 font-mono">React · Node · DB</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-1 flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/tharun-kunamalla-b9b477288/",
                      "_blank",
                    )
                  }
                  className="interactive flex-1 px-5 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-xs uppercase tracking-widest hover:scale-102 transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
                >
                  <FileText className="w-4 h-4" />
                  View Resume
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
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
