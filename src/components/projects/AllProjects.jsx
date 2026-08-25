import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {ExternalLink, Github, Code, Monitor, ArrowRight, ArrowUp, Orbit, Sparkles} from "lucide-react";
import toast from "react-hot-toast";
import BackgroundParticles from "../layout/BackgroundParticles";
import ImageWithSkeleton from "../ui/ImageWithSkeleton";
import {useLenis} from "@studio-freight/react-lenis";

gsap.registerPlugin(ScrollTrigger);

import {
  webProjects,
  machineLearningProjects,
  allProjects,
} from "../../constants/projectsData";

const AllProjects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const lenis = useLenis();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.2,
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const currentProjects =
    activeTab === "all"
      ? allProjects
      : activeTab === "web"
        ? webProjects
        : machineLearningProjects;

  const handleLiveClick = (liveLink) => {
    if (!liveLink) {
      toast.error("Live preview will be updated soon... Stay Tuned!😉");
      return;
    }
    window.open(liveLink, "_blank", "noopener noreferrer");
  };

  const containerRef = useRef(null);
  const projectRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();

      projectRefs.current.forEach((ref) => {
        if (!ref) return;

        gsap.fromTo(
          ref,
          {
            opacity: 0,
            scale: 0.95,
            y: 30,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref,
              start: "top 95%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [currentProjects]);

  projectRefs.current = projectRefs.current.slice(0, currentProjects.length);

  return (
    <div className="relative pt-28 pb-24 min-h-screen bg-white dark:bg-[#09090b] transition-colors duration-300 overflow-hidden">
      {/* Fixed Atmospheric Background Image Layer */}
      <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <img
          src="/assets/projects-bg.jpg"
          alt="Projects Background"
          loading="eager"
          fetchPriority="high"
          className="w-full h-full object-cover opacity-35 dark:opacity-40 filter contrast-125 brightness-95"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/55 to-white/85 dark:from-[#09090b]/85 dark:via-[#09090b]/55 dark:to-[#09090b]/85" />
      </div>

      <BackgroundParticles />

      {/* Monochromatic Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-black/[0.02] dark:bg-white/[0.03] rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-black/[0.02] dark:bg-white/[0.03] rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono font-bold uppercase tracking-widest text-zinc-600 dark:text-zinc-400 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white"></span>
              Selected Works
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-black dark:text-white tracking-tight leading-tight mb-4">
              Featured Projects
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-base font-light leading-relaxed">
              Full-stack web applications, machine learning architectures, and interactive digital experiences.
            </p>
          </div>

          {/* 3D Space Experience Launcher */}
          <button
            onClick={() => navigate("/projects-3d")}
            className="interactive inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-black dark:text-white hover:border-black dark:hover:border-white transition-all duration-300 shadow-sm group self-start md:self-auto"
          >
            <div className="p-2 rounded-xl bg-black dark:bg-white text-white dark:text-black">
              <Orbit className="w-4 h-4 animate-spin" style={{animationDuration: "12s"}} />
            </div>
            <div className="text-left">
              <p className="text-xs font-display font-bold uppercase tracking-wider">3D Space View</p>
              <p className="text-[10px] font-mono text-zinc-500">Explore in WebGL Orbit</p>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform ml-1" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          {[
            {id: "all", label: "All Projects"},
            {id: "web", label: "Web Applications"},
            {id: "ml", label: "Machine Learning"},
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  active
                    ? "bg-black dark:bg-white text-white dark:text-black shadow-md"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {currentProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (projectRefs.current[index] = el)}
              className="bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800/80 rounded-3xl overflow-hidden hover:border-black dark:hover:border-white transition-all duration-500 flex flex-col h-full group shadow-sm hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.08)]"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative h-56 overflow-hidden flex-shrink-0 bg-zinc-100 dark:bg-zinc-900">
                <ImageWithSkeleton
                  src={project.image}
                  alt={project.title}
                  loading="eager"
                  className="w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-105"
                />
                <div
                  className={`absolute inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center gap-3 transition-opacity duration-300 ${
                    hoveredProject === project.id ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <button
                    onClick={() => handleLiveClick(project.liveLink)}
                    className="p-3 rounded-full bg-white text-black hover:scale-110 transition-all duration-300"
                    title="Live Demo"
                  >
                    <Monitor className="h-4 w-4" />
                  </button>
                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white text-black hover:scale-110 transition-all duration-300"
                    title="View Source Code"
                  >
                    <Code className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="p-6 sm:p-7 flex flex-col flex-grow">
                <h3 className="text-xl font-display font-bold mb-2 text-black dark:text-white group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6 flex-grow text-xs sm:text-sm leading-relaxed font-light line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-[10px] font-mono font-semibold tracking-wider text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2.5 py-1 text-[10px] font-mono text-zinc-400">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-zinc-200 dark:border-zinc-800/80 mt-auto text-xs font-mono font-bold uppercase tracking-wider">
                  <button
                    onClick={() => handleLiveClick(project.liveLink)}
                    className="text-black dark:text-white hover:underline flex items-center gap-1"
                  >
                    Live Demo
                    <ExternalLink className="h-3 w-3" />
                  </button>
                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-black dark:hover:text-white flex items-center gap-1 transition-colors"
                  >
                    Code
                    <Github className="h-3.5 w-3.5" />
                  </a>
                  <RouterLink
                    to={`/project/${project.id}`}
                    className="text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white flex items-center gap-1 transition-colors"
                  >
                    Details
                    <ArrowRight className="h-3 w-3" />
                  </RouterLink>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Link */}
        <div className="text-center mt-16">
          <a
            href="https://github.com/Tharunkunamalla"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-mono text-xs uppercase tracking-widest font-bold text-black dark:text-white bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 hover:border-black dark:hover:border-white transition-all duration-300 shadow-sm hover:scale-105"
          >
            <span>Explore More on GitHub</span>
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Floating Scroll to Top Button (Left Side) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 md:bottom-8 md:left-10 z-50 p-3.5 rounded-full bg-black dark:bg-white text-white dark:text-black shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default AllProjects;
