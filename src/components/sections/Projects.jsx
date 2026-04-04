// src/components/sections/Projects.jsx
import React from "react";
import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {Link as RouterLink} from "react-router-dom"; // 👈 add this
import {ExternalLink, Github, Code, Monitor, ArrowRight} from "lucide-react";
import toast from "react-hot-toast";
import BackgroundParticles from "../layout/BackgroundParticles";

// import GitHubStats from "./GitHubStats";

gsap.registerPlugin(ScrollTrigger);

// Your project data
const webProjects = [
  {
    id: 0,
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
    id: 1,
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
    title: "DSA- Play Visualizer",
    description:
      "A web app to visualize various Data Structures and Algorithms with interactive animations.Creative space for drawing, and for taking notes with saved logs Supports arrays, linked lists, stacks, queues, trees, sorting algorithms, and pathfinding algorithms.",
    image: "/assets/dsaplay1.png",
    technologies: [
      "React",
      "Tailwind CSS",
      "GSAP",
      "Express",
      "Node.js",
      "MongoDB",
      "JWT",
    ],
    liveLink: "https://dsa-playground-iiitk.vercel.app/",
    codeLink: "https://github.com/Tharunkunamalla/Dsa-playground.git",
  },
  {
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
    title: "Tournament Management System",
    description:
      "Manage tournaments, teams, and schedules online. Full-stack app. Database designed in SQL. Frontend using HTML/CSS/JS and backend logic in PHP.",
    image: "/assets/TMS_proj.png",
    technologies: ["Php", "SQL", "JS", "CSS", "HTML"],
    liveLink: "",
    codeLink: "https://github.com/Tharunkunamalla/TMS",
  },
  {
    id: 8,
    title: "Portfolio Website",
    description:
      "My personal portfolio showcasing skills and projects. Built with modern web technologies and responsive design.",
    image: "/assets/portfolio.png",
    technologies: ["Js", "CSS", "HTML"],
    liveLink: "https://tharun-kunamalla.netlify.app/",
    codeLink: "https://github.com/Tharunkunamalla/Portfolio-js",
  },
  {
    id: 9,
    title: "Gemini-AI",
    description:
      "AI assistant dashboard with clean UI and GPT integration. Provides seamless interaction with AI models for various tasks.",
    image: "/assets/gemini.jpg",
    technologies: ["JS", "Css", "OpenAI API"],
    liveLink: "https://gemini-app-chatbot.vercel.app/",
    codeLink: "https://github.com/Tharunkunamalla/Gemini_App",
  },
  {
    id: 10,
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
    id: 11,
    title: "Anime Recommendation System",
    description:
      "A content-based anime recommendation system using cosine similarity.Fetches anime data from Jikan API and provides recommendations based on user input.",
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
    id: 12,
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
    id: 13,
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
    id: 14,
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
    id: 15,
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
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const projectRefs = useRef([]);
  const [hoveredProject, setHoveredProject] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          toggleActions: "play reverse play reverse",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const visibleProjects = allProjects.slice(0, 5);

  projectRefs.current = Array(visibleProjects.length)
    .fill()
    .map((_, i) => projectRefs.current[i] || React.createRef());

  useEffect(() => {
    // Apply a 3D perspective to the wrapper for three.js style reveals
    gsap.set(sectionRef.current, { perspective: 1500 });

    const ctx = gsap.context(() => {
      projectRefs.current.forEach((project, index) => {
        if (project) {
          gsap.from(project, {
            y: 120,
            z: -200,
            rotationX: -15,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: project,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });
    }, sectionRef);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [visibleProjects.length]); 

  const handleLiveClick = (liveLink) => {
    if (!liveLink) {
      toast.error("Live preview will be updated soon... Stay Tuned!😉");
      return;
    }
    window.open(liveLink, "_blank", "noopener noreferrer");
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 bg-light-100 dark:bg-gradient-to-br from-[#0f0f14] via-[#12121a] to-[#0c0c10] overflow-clip"
    >
      <BackgroundParticles />
      <div
        className="pointer-events-none absolute top-0 inset-x-0 h-24 z-10 bg-gradient-to-b from-white/80 to-transparent dark:from-black/60"
      />
      
      <div className="absolute top-50 -left-10 w-[500px] h-[500px] bg-gradient-to-tr from-secondary-300 via-purple-400 to-pink-300 opacity-30 rounded-full blur-3xl animate-pulse-slow pointer-events-none z-0" />
      <div className="absolute -bottom-16 -right-20 w-[400px] h-[400px] bg-gradient-to-tr from-primary-300 via-cyan-300 to-blue-300 opacity-25 rounded-full blur-3xl animate-pulse-slower pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(#4443_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.02] dark:opacity-5 z-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[95%] 2xl:max-w-[85%] mx-auto px-4">
        <h2
          ref={headingRef}
          className="text-4xl md:text-6xl font-bold text-center mb-6 text-gray-800 dark:text-white"
        >
          Featured <span className="text-secondary-500">Projects</span>
        </h2>

        <p className="text-center text-sm md:text-base text-gray-600 dark:text-gray-400 mb-16">
          A selection of my best work. See everything on the dedicated projects page.
        </p>

        <div className="flex flex-col gap-[10vh] w-full max-w-5xl mx-auto pb-32">
          {visibleProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (projectRefs.current[index] = el)}
              className="sticky w-full bg-white/10 dark:bg-[#1a1a24]/70 backdrop-blur-2xl border border-white/20 dark:border-white/10 rounded-3xl overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_0_rgba(150,58,235,0.2)] transition-all duration-500 flex flex-col md:flex-row h-[500px] md:h-[450px]"
              style={{
                top: `calc(10vh + ${index * 45}px)`, // Adjusted for clean step visibility
                zIndex: index,
              }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative w-full md:w-[55%] h-[40%] md:h-full overflow-hidden group/image flex-shrink-0 bg-black/5 dark:bg-white/5 border-white/10 dark:border-white/5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/image:scale-110"
                />

                <div
                  className={`absolute inset-0 bg-black/70 flex items-center justify-center gap-6 transition-opacity duration-300 ${
                    hoveredProject === project.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <button
                    onClick={() => handleLiveClick(project.liveLink)}
                    className="p-3 rounded-full bg-white text-gray-800 hover:bg-secondary-500 hover:text-white transition-colors duration-300 shadow-lg"
                  >
                    <Monitor className="h-5 w-5" />
                  </button>
                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white text-gray-800 hover:bg-secondary-500 hover:text-white transition-colors duration-300 shadow-lg"
                  >
                    <Code className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <div className="p-8 md:p-12 flex flex-col w-full md:w-[45%] h-[60%] md:h-full relative overflow-hidden">
                {/* Modern subtle project counter */}
                <div className="absolute top-4 right-8 text-4xl md:text-6xl font-bold text-black/5 dark:text-white/5 pointer-events-none select-none">
                  0{index + 1}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-6 font-heading shrink-0 bg-gradient-to-r from-primary-400 to-secondary-500 bg-clip-text text-transparent">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 md:mb-8 text-sm md:text-base leading-relaxed shrink-0 line-clamp-3 md:line-clamp-5">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2.5 mb-8 md:mb-10 shrink-0">
                  {project.technologies.slice(0, 5).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 text-[10px] md:text-xs font-semibold tracking-wider text-primary-700 dark:text-primary-300 bg-primary-500/5 dark:bg-primary-500/10 border border-primary-500/20 dark:border-primary-500/10 rounded-full transition-all duration-300 hover:border-primary-500/40"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="px-3 py-1.5 text-[10px] md:text-xs font-medium text-gray-500 bg-transparent border border-transparent">
                      +{project.technologies.length - 5}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-6 mt-auto pt-6 border-t border-gray-200/50 dark:border-white/5">
                  <button
                    onClick={() => handleLiveClick(project.liveLink)}
                    className="text-xs md:text-sm font-bold text-primary-600 dark:text-primary-400 flex items-center gap-2 hover:text-primary-800 dark:hover:text-primary-300 transition-colors group/link"
                  >
                    <span className="relative">
                      Live Preview
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover/link:w-full"></span>
                    </span>
                    <ExternalLink className="h-4 w-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                  </button>

                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm font-bold text-gray-600 dark:text-gray-400 flex items-center gap-2 hover:text-gray-900 dark:hover:text-white transition-colors group/link"
                  >
                    <span className="relative">
                      Source
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-500 transition-all duration-300 group-hover/link:w-full"></span>
                    </span>
                    <Github className="h-4.5 w-4.5" />
                  </a>

                  <RouterLink
                    to={`/project/${project.id}`}
                    className="ml-auto p-3 bg-secondary-500/10 hover:bg-secondary-500 text-secondary-500 hover:text-white rounded-xl transition-all duration-500 group/btn"
                  >
                    <div className="flex items-center gap-2 text-xs md:text-sm font-bold">
                      Details
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </div>
                  </RouterLink>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 mb-16 relative">
          <RouterLink
            to="/projects"
            className="
              relative inline-flex items-center gap-3 px-10 py-5
              rounded-full font-bold tracking-wide text-lg
              text-white
              bg-secondary-500 hover:bg-secondary-600
              shadow-lg shadow-secondary-500/30
              transition-all duration-500
              hover:shadow-secondary-500/50
              hover:-translate-y-1
            "
          >
            Explore All Projects &rarr;
          </RouterLink>
        </div>
      </div>
      {/* ===== BOTTOM BLEND (KEY PART) ===== */}
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

export default Projects;
