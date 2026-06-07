import React, {useState, useEffect, useRef} from "react";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {Code, Monitor, ArrowRight} from "lucide-react";
import toast from "react-hot-toast";
import BackgroundParticles from "../layout/BackgroundParticles";
import ImageWithSkeleton from "../ui/ImageWithSkeleton";

import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import {EffectCoverflow, Pagination, Keyboard} from "swiper/modules";

import {
  webProjects,
  machineLearningProjects,
  allProjects,
  visibleProjects,
} from "../../constants/projectsData";

const Projects = () => {
  const containerRef = useRef(null);
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const activeProject = visibleProjects[activeIndex];

  useEffect(() => {
    // We use a CSS sticky approach for pinning, and just use ScrollTrigger to track progress!
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Add 1 second of interpolation to make the scroll buttery smooth, especially on mobile
        onUpdate: (self) => {
          if (!swiperRef.current) return;
          const totalSlides = visibleProjects.length;
          // Smooth mapping from scroll progress to active index
          const index = Math.min(
            totalSlides - 1,
            Math.floor(self.progress * totalSlides),
          );
          if (swiperRef.current.activeIndex !== index) {
            swiperRef.current.slideTo(index);
          }
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [visibleProjects.length]);

  const handleLiveClick = (liveLink) => {
    if (!liveLink) {
      toast.error("Live preview will be updated soon... Stay Tuned!😉");
      return;
    }
    window.open(liveLink, "_blank", "noopener noreferrer");
  };

  return (
    // Outer container provides scroll height (500vh means scrolling 5 screen heights smoothly)
    <div
      ref={containerRef}
      className="relative w-full"
      style={{height: `${visibleProjects.length * 100}vh`}}
    >
      {/* Inner section stays sticky on the screen perfectly using 100dvh for mobile stability */}
      <section
        id="projects"
        className="sticky top-0 h-[100dvh] w-full bg-light-100 dark:bg-gradient-to-br from-[#0f0f14] via-[#12121a] to-[#0c0c10] overflow-hidden flex flex-col justify-center"
      >
        <BackgroundParticles />
        <div className="pointer-events-none absolute top-0 inset-x-0 h-24 z-10 bg-gradient-to-b from-white/80 to-transparent dark:from-black/60" />

        <div className="absolute top-50 -left-10 w-[500px] h-[500px] bg-gradient-to-tr from-secondary-300 via-purple-400 to-pink-300 opacity-30 rounded-full blur-3xl animate-pulse-slow pointer-events-none z-0" />
        <div className="absolute -bottom-16 -right-20 w-[400px] h-[400px] bg-gradient-to-tr from-primary-300 via-cyan-300 to-blue-300 opacity-25 rounded-full blur-3xl animate-pulse-slower pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(#4443_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.02] dark:opacity-5 z-0 pointer-events-none" />

        <div className="relative z-10 w-full h-full flex flex-col justify-between pt-16 md:pt-24 lg:pt-20 pb-4 lg:pb-6">
          {/* Header Section */}
          <div className="shrink-0 mb-2 lg:mb-4 relative">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-1 md:mb-2 text-gray-800 dark:text-white px-4">
              Featured <span className="text-secondary-500">Projects</span>
            </h2>
            <p className="text-center text-xs md:text-sm text-gray-600 dark:text-gray-400 px-4 hidden sm:block">
              Scroll down or swipe to explore
            </p>
            {/* Toggle Button */}
            <div className="absolute right-4 sm:right-12 top-0 hidden md:flex items-center gap-4 z-50">
              <div className="text-right hidden sm:block">
                <p className="text-gray-800 dark:text-white font-bold text-sm">View Mode</p>
                <p className="text-gray-600 dark:text-gray-400 text-xs">Switch between layouts</p>
              </div>
              <button
                onClick={() => navigate("/projects-3d")}
                className="relative flex items-center w-20 h-10 bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 border border-gray-300 dark:border-white/20 rounded-full p-1 transition-all duration-300"
              >
                <div className="absolute left-1 w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-[10px] font-bold text-gray-800 dark:text-white shadow">
                  2D
                </div>
              </button>
            </div>
          </div>

          {/* Desktop Layout Wrapper */}
          <div className="flex-1 w-full flex flex-col lg:flex-row items-center justify-center relative px-4 md:px-12 max-w-[1600px] mx-auto min-h-[300px] lg:min-h-[400px]">
            {/* Left Text Content (Desktop only) */}
            <div className="hidden lg:flex flex-col w-1/4 pr-8 z-20 justify-center transition-all duration-500">
              <h3
                key={`title-${activeProject.id}`}
                className="text-4xl xl:text-5xl font-bold text-gray-800 dark:text-white font-heading tracking-tight mb-4 animate-fade-in-up"
              >
                {activeProject.title}
              </h3>
              <p
                key={`desc-${activeProject.id}`}
                className="text-gray-600 dark:text-gray-400 font-light text-sm xl:text-base leading-relaxed line-clamp-4 mb-8 animate-fade-in-up"
                style={{animationDelay: "100ms"}}
              >
                {activeProject.description}
              </p>

              <div
                key={`links-${activeProject.id}`}
                className="flex flex-col gap-4 animate-fade-in-up"
                style={{animationDelay: "200ms"}}
              >
                <button
                  onClick={() => handleLiveClick(activeProject.liveLink)}
                  className="group relative flex items-center justify-center gap-3 px-6 py-3.5 w-full rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 transition-all duration-300 font-medium backdrop-blur-md shadow-lg shadow-black/20"
                >
                  <Monitor className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  <span>Live Preview</span>
                </button>
                <a
                  href={activeProject.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 px-6 py-3.5 w-full rounded-2xl bg-black/40 hover:bg-black/60 text-gray-300 hover:text-white border border-transparent hover:border-white/10 transition-all duration-300 font-medium backdrop-blur-md shadow-lg shadow-black/20"
                >
                  <Code className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                  <span>Source Code</span>
                </a>
              </div>
            </div>

            {/* 3D Carousel */}
            <div className="w-full lg:w-2/4 h-[250px] sm:h-[400px] relative z-10 flex items-center justify-center shrink-0">
              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                speed={1000} // Medium smooth animation speed
                coverflowEffect={{
                  rotate: 20,
                  stretch: 0,
                  depth: 300,
                  modifier: 1,
                  slideShadows: false, // Turned off to remove harsh rectangle gradients
                }}
                keyboard={{enabled: true}}
                pagination={{clickable: true, dynamicBullets: true}}
                modules={[EffectCoverflow, Pagination, Keyboard]}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                className="w-full h-full pointer-events-none sm:pointer-events-auto"
                style={{
                  "--swiper-pagination-color": "#a855f7",
                  "--swiper-pagination-bullet-inactive-color": "#4b5563",
                  "--swiper-pagination-bottom": "15px",
                }}
              >
                {visibleProjects.map((project, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <SwiperSlide
                      key={project.id}
                      className="w-[75vw] sm:w-[500px] md:w-[600px] lg:w-[100%] h-[85%] lg:h-[90%] flex items-center justify-center relative mt-4"
                    >
                      <div
                        className={`relative w-full h-full rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 border border-white/10 ${
                          isActive
                            ? "ring-2 ring-secondary-500/50 shadow-secondary-500/20"
                            : ""
                        }`}
                      >
                        <ImageWithSkeleton
                          src={project.image}
                          alt={project.title}
                          loading="eager"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>

            {/* Right Text Content (Desktop only) */}
            <div className="hidden lg:flex flex-col w-1/4 pl-8 z-20 justify-center transition-all duration-500">
              <h4 className="text-xs font-bold text-gray-400 tracking-[0.2em] uppercase mb-6">
                Technologies Used
              </h4>
              <div
                key={`tech-${activeProject.id}`}
                className="flex flex-col gap-3 animate-fade-in-up"
              >
                {activeProject.technologies.slice(0, 5).map((tech, idx) => (
                  <div
                    key={idx}
                    className="group px-6 py-3.5 w-full text-sm font-medium text-gray-400 bg-black/40 border border-transparent hover:border-secondary-500/50 rounded-2xl transition-all duration-300 flex items-center shadow-lg shadow-black/10"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 group-hover:bg-secondary-400 mr-3 transition-colors duration-300" />
                    <span className="transition-colors duration-300 group-hover:text-white">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>

              <RouterLink
                to={`/project/${activeProject.id}`}
                className="mt-8 flex items-center gap-2 text-secondary-500 font-medium hover:text-secondary-400 transition-colors group w-max"
              >
                View Full Details
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
              </RouterLink>
            </div>
          </div>

          {/* Mobile Info Overlay (Visible only on screens < lg) */}
          <div className="lg:hidden w-full px-4 mt-2 flex flex-col gap-2 max-w-[600px] mx-auto z-20 shrink-0">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white font-heading text-center">
              {activeProject.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-light text-xs sm:text-sm text-center line-clamp-2 sm:line-clamp-3">
              {activeProject.description}
            </p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center mb-1">
              {activeProject.technologies.slice(0, 3).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-[10px] sm:text-[11px] font-medium bg-black/40 border border-white/5 rounded-full text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-2 sm:gap-4 justify-center">
              <button
                onClick={() => handleLiveClick(activeProject.liveLink)}
                className="group flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 flex-1 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 transition-all duration-300 font-medium backdrop-blur-md text-xs sm:text-sm"
              >
                <Monitor className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:scale-110" />{" "}
                Live
              </button>
              <a
                href={activeProject.codeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 flex-1 rounded-xl bg-black/40 hover:bg-black/60 text-gray-300 hover:text-white border border-transparent hover:border-white/10 transition-all duration-300 font-medium backdrop-blur-md text-xs sm:text-sm"
              >
                <Code className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:rotate-12" />{" "}
                Source
              </a>
            </div>
          </div>

          {/* Global Explore All Button (Visible on ALL devices) */}
          <div className="w-full text-center mt-4 lg:mt-4 pb-4 relative z-20 shrink-0">
            <RouterLink
              to="/projects"
              className="
                group relative inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-2.5 sm:py-3.5
                rounded-full font-medium tracking-wide text-xs sm:text-sm
                text-white bg-secondary-500 hover:bg-secondary-400
                border border-secondary-400/50 hover:border-secondary-300
                shadow-[0_0_20px_rgba(168,85,247,0.2)]
                transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.5)]
                hover:-translate-y-0.5
              "
            >
              <span>Explore All Projects</span>
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </RouterLink>
          </div>
        </div>

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
    </div>
  );
};

export default Projects;
