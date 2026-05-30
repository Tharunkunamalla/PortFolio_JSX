import React, {useState, useEffect, useRef} from "react";
import {Link as RouterLink} from "react-router-dom";
import {Code, Monitor, ArrowRight} from "lucide-react";
import toast from "react-hot-toast";
import BackgroundParticles from "../layout/BackgroundParticles";
import ImageWithSkeleton from "../ui/ImageWithSkeleton";
import Projects3D from "./Projects3D";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import {EffectCoverflow, Pagination, Keyboard} from "swiper/modules";

// Your project data
const webProjects = [
  {
    id: 0,
    title: "Wavvy",
    description:
      "Wavvy is a real-time watch party platform that lets friends, families, and fandoms watch YouTube videos together in perfect synchronization. Create a room, share the link, and enjoy - no downloads, no plugins, just paste a link and watch.",
    image: "/assets/wavvy.png",
    technologies: [
      "React",
      "Vite",
      "Node.js",
      "Socket.IO",
      "MongoDB",
      "TailwindCSS",
    ],
    liveLink: "https://wavvy-xi.vercel.app/",
    codeLink: "https://github.com/Tharunkunamalla/Wavvy.git",
  },
  {
    id: 1,
    title: "CodeSync",
    description:
      "A real-time collaborative code editor built with Node.js, Express, and Socket.IO. It allows multiple users to edit code simultaneously with live updates and syntax highlighting. Include real-time cursor tracking, built-in code execution with multiple language support, user presence indicators, and collaborative tools",
    image: "/assets/codesync.png",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "Socket.IO",
      "Monaco Editor",
      "piston Api",
    ],
    liveLink: "https://codesync-cs.vercel.app",
    codeLink: "https://github.com/Tharunkunamalla/CodeSync",
  },
  {
    id: 2,
    title: "InstantRoute",
    description:
      "InstantRoute is an interactive map-based route visualization system that finds the shortest path between two locations using graph algorithms. It allows users to select source and destination points directly on the map and visually observe how algorithms explore routes step by step. The system snaps user-selected points to real road nodes to ensure accurate routing. A dynamic speed controller lets users adjust the algorithm execution in real time. The final shortest path is rendered clearly on the map using real-world road data. ",
    image: "/assets/instant-route.png",
    technologies: [
      "React",
      "Tailwind CSS",
      "Leaflet.js",
      "Java",
      "shadcn/ui",
      "Dijkstra's Algorithm",
      "A* Search Algorithm",
      "OSM Data",
      "Graph Theory",
      "JavaScript",
    ],
    liveLink: "https://instant-route.vercel.app/",
    codeLink: "https://github.com/Tharunkunamalla/instant-route-guide.git",
  },
  {
    id: 3,
    title: "FaceRipple",
    description:
      "Video Calling Realtime Chat App & Social App using getStream API for real-time messaging, with MongoDB storing user data and messages.",
    image: "/assets/FaceRipple1.png",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Postman-Api",
      "Tailwind CSS",
      "getStream",
    ],
    liveLink: "https://faceripple.onrender.com/",
    codeLink: "https://github.com/Tharunkunamalla/FaceRipple",
  },
  {
    id: 5,
    title: "Auricare- A Gift to God's child",
    description:
      "A Healthcare platform for Autism patients which includes AI-Chatbot, Appointment booking, Learning-Hub, Scheduler, etc.",
    image: "/assets/auricare.png",
    technologies: [
      "React",
      "Tailwind",
      "Supabase",
      "Node.js",
      "Express",
      "Groq-Api",
    ],
    liveLink: "https://auricare-v2.vercel.app/",
    codeLink: "https://github.com/Tharunkunamalla/Auricare-V2",
  },
  {
    id: 4,
    title: "DSA- Play Visualizer",
    description:
      "A web app to visualize various Data Structures and Algorithms with interactive animations. Supports arrays, linked lists, stacks, queues, trees, sorting algorithms, and pathfinding algorithms, And Creative space for drawing, and for taking notes with saved logs and JWT authentication. ",
    image: "/assets/dsaplay1.png",
    technologies: [
      "React",
      "Tailwind CSS",
      "GSAP",
      "MongoDB",
      "Express",
      "Node.js",
      "JWT",
    ],
    liveLink: "https://dsa-playground-iiitk.vercel.app/",
    codeLink: "https://github.com/Tharunkunamalla/Dsa-playground.git",
  },
  {
    id: 6,
    title: "ResumeGenie Ai",
    description:
      "An AI-powered Resume Tracker which tracks the resume and provides insights. It also generates the ATS score using GPT-3.5 Turbo.",
    image: "/assets/ResumeGenie1.png",
    technologies: [
      "React",
      "Typescript",
      "Puter.js",
      "Tailwind CSS",
      "OpenAI API",
    ],
    liveLink: "https://resume-genie-ai.vercel.app/",
    codeLink: "https://github.com/Tharunkunamalla/ResumeGenie-Ai",
  },
  {
    id: 7,
    title: "Sapphire Skies Resort",
    description:
      "A fully responsive resort booking app with authentication and room management. Users can book rooms, view amenities, and manage reservations.",
    image: "/assets/sapphire.png",
    technologies: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "Clerk",
    ],
    liveLink: "https://sapphire-skies-resort.vercel.app/",
    codeLink: "https://github.com/Tharunkunamalla/Sapphire-skies-resort",
  },
  {
    id: 8,
    title: "Tournament Management System",
    description:
      "Manage tournaments, teams, and schedules online. Full-stack app. Database designed in SQL. Frontend using HTML/CSS/JS and backend logic in PHP.",
    image: "/assets/TMS_proj.png",
    technologies: ["Php", "SQL", "JS", "CSS", "HTML"],
    liveLink: "",
    codeLink: "https://github.com/Tharunkunamalla/TMS",
  },
  {
    id: 9,
    title: "Portfolio Website",
    description:
      "My personal portfolio showcasing skills and projects. Built with modern web technologies and responsive design.",
    image: "/assets/portfolio.png",
    technologies: ["Js", "CSS", "HTML"],
    liveLink: "https://tharun-kunamalla.netlify.app/",
    codeLink: "https://github.com/Tharunkunamalla/Portfolio-js",
  },
  {
    id: 10,
    title: "Gemini-AI",
    description:
      "AI assistant dashboard with clean UI and GPT integration. Provides seamless interaction with AI models for various tasks.",
    image: "/assets/gemini.jpg",
    technologies: ["JS", "Css", "OpenAI API"],
    liveLink: "https://gemini-app-chatbot.vercel.app/",
    codeLink: "https://github.com/Tharunkunamalla/Gemini_App",
  },
  {
    id: 11,
    title: "Jarvis -Voice Assistant",
    description:
      "Real-time voice assistant with Google integration. Supports voice commands, web search, and task automation.",
    image: "/assets/jarvis.gif",
    technologies: ["JS", "Google"],
    liveLink: "https://jarvis-responder.vercel.app/",
    codeLink: "https://github.com/Tharunkunamalla/Jarvis",
  },
];

const machineLearningProjects = [
  {
    id: 12,
    title: "Anime Recommendation System",
    description:
      "A content-based anime recommendation system using cosine similarity.Fetches anime data from Jikan API and provides recommendations based on user input using FastApi.",
    image: "/assets/p3.png",
    technologies: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "Jikan API",
      "Streamlit",
    ],
    liveLink: "https://anime-recommendations-system.streamlit.app/",
    codeLink:
      "https://github.com/Tharunkunamalla/Anime-Recommendations-System.git",
  },
  {
    id: 13,
    title: "Brain Tumor MRI Classification",
    description:
      "CNN and Transfer Learning to classify MRI brain images. Deployed via Streamlit with UI to upload and predict on MRI scans and visualize results.",
    image: "/assets/brain_tumor.png",
    technologies: ["Python", "TensorFlow", "Keras", "Streamlit"],
    liveLink: "",
    codeLink:
      "https://github.com/Tharunkunamalla/Project-3_Labmentix_Brain_Tumor_Img_cls",
  },
  {
    id: 14,
    title: "PhonePe Transactions Insights",
    description:
      "Data analysis of PhonePe transactions using Python and visualization libraries. Extracts trends in transaction volume, types, and geography.",
    image: "/assets/phonepe.png",
    technologies: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
    liveLink: "",
    codeLink:
      "https://github.com/Tharunkunamalla/Project-2-Labementix-PhonePe_Transaction_Insights",
  },
  {
    id: 15,
    title: "Shopper spectrum - Customer Segmentation",
    description:
      "Customer segmentation using K-means clustering to analyze shopping behavior.",
    image: "/assets/shopper1.png",
    technologies: [
      "Python",
      "Scikit-learn",
      "Pandas",
      "Matplotlib",
      "Seaborn",
      "Streamlit",
    ],
    liveLink: "https://shopperspectrum-recommendation-ai.streamlit.app/",
    codeLink:
      "https://github.com/Tharunkunamalla/Project-4-Shopper_spectrum-segmentation",
  },
  {
    id: 16,
    title: "Multi class fish classification",
    description:
      "CNN model to classify different species of fish. Includes data preprocessing, augmentation, and visualization of results.",
    image: "/assets/fish1.png",
    technologies: [
      "Python",
      "TensorFlow",
      "Keras",
      "Streamlit",
      "5 pre-trained models",
    ],
    liveLink: "",
    codeLink:
      "https://github.com/Tharunkunamalla/project-5-Multiclass-fish-classification.git",
  },
];

const allProjects = [...webProjects, ...machineLearningProjects];

const Projects = () => {
  const containerRef = useRef(null);
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [is3DMode, setIs3DMode] = useState(false);
  const [showToggle, setShowToggle] = useState(true);
  const visibleProjects = allProjects.slice(0, 5);
  const activeProject = visibleProjects[activeIndex];

  useEffect(() => {
    if (is3DMode) return;

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
  }, [visibleProjects.length, is3DMode]);

  // Handle navbar animation
  useEffect(() => {
    const nav = document.querySelector("nav");
    if (nav) {
      nav.style.transition = "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
      if (is3DMode) {
        nav.style.transform = "translateY(-100%)";
      } else {
        nav.style.transform = "translateY(0)";
      }
    }
    return () => {
      if (nav) nav.style.transform = "translateY(0)";
    };
  }, [is3DMode]);

  const toggleMode = (enable3D) => {
    setIs3DMode(enable3D);
    setTimeout(() => {
      const section = document.getElementById("projects");
      if (section) {
        window.scrollTo({
          top: section.offsetTop,
          behavior: "instant",
        });
      }
    }, 10);
  };

  const handleLiveClick = (liveLink) => {
    if (!liveLink) {
      toast.error("Live preview will be updated soon... Stay Tuned!😉");
      return;
    }
    window.open(liveLink, "_blank", "noopener noreferrer");
  };

  if (is3DMode) {
    return (
      <section id="projects" className="relative w-full h-[100dvh] bg-[#0c0c10] overflow-hidden">
        {/* Top Blend */}
        <div className="pointer-events-none absolute top-0 inset-x-0 h-24 z-10 bg-gradient-to-b from-white/80 to-transparent dark:from-black/60" />
        
        <Projects3D projects={visibleProjects} />
        
        {/* Toggle Button overlay */}
        <div className="absolute top-6 right-6 sm:top-8 sm:right-12 z-50 flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-white font-bold text-sm">View Mode</p>
            <p className="text-gray-400 text-xs">Switch between layouts</p>
          </div>
          <button
            onClick={() => toggleMode(false)}
            className="relative flex items-center w-20 h-10 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full p-1 transition-all duration-300 backdrop-blur-md"
          >
            <div className="absolute right-1 w-8 h-8 bg-gradient-to-r from-secondary-500 to-purple-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-purple-500/50">
              3D
            </div>
          </button>
        </div>

        {/* Bottom Blend */}
        <div className="pointer-events-none absolute bottom-0 inset-x-0 h-32 z-10 bg-gradient-to-t from-white/90 to-transparent dark:from-black/80" />
      </section>
    );
  }

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
            <div className="absolute right-4 sm:right-12 top-0 flex items-center gap-4 z-50">
              <div className="text-right hidden sm:block">
                <p className="text-gray-800 dark:text-white font-bold text-sm">View Mode</p>
                <p className="text-gray-600 dark:text-gray-400 text-xs">Switch between layouts</p>
              </div>
              <button
                onClick={() => toggleMode(true)}
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
