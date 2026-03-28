// src/components/sections/Projects.jsx
import React from "react";
import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {Link as RouterLink} from "react-router-dom"; // 👈 add this
import {ExternalLink, Github, Code, Monitor, ArrowRight} from "lucide-react";
import {ChevronDown, ChevronUp} from "lucide-react"; // 👈 import icons
import toast from "react-hot-toast";
import BackgroundParticles from "../BackgroundParticles";

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

const AllProjects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

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
      // Refresh ScrollTrigger to account for dynamic content height changes
      ScrollTrigger.refresh();

      projectRefs.current.forEach((ref, index) => {
        if (!ref) return;

        // Alternate pop direction and rotation for a dynamic feel
        const isOdd = index % 2 !== 0;
        
        gsap.fromTo(
          ref,
          {
            opacity: 0,
            scale: 0.85,
            y: 40,
            rotateX: -10,
            rotateY: isOdd ? 5 : -5,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            duration: 0.7,
            ease: "back.out(1.1)",
            scrollTrigger: {
              trigger: ref,
              start: "top 92%",
              end: "top 40%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [currentProjects]);

  projectRefs.current = projectRefs.current.slice(0, currentProjects.length);

  return (
    <div className="relative pt-32 pb-24 min-h-screen bg-light-100 dark:bg-gradient-to-br from-[#0f0f14] via-[#12121a] to-[#0c0c10]">
      <BackgroundParticles />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="mb-12">
          <RouterLink to="/" className="inline-flex items-center gap-2 text-secondary-500 hover:text-secondary-400 mb-6 font-medium transition-colors">
            <span>&larr; Back to Home</span>
          </RouterLink>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white">
            All <span className="text-secondary-500">Projects</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Showing {currentProjects.length} of {allProjects.length} total projects
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-12">
          {["all", "web", "ml"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 text-sm md:text-base shadow-lg ${
                activeTab === tab
                  ? "bg-secondary-500 text-white shadow-secondary-500/20"
                  : "bg-white/5 border border-white/10 text-gray-600 dark:text-gray-300 hover:bg-white/10"
              }`}
            >
              {tab === "all"
                ? "All Projects"
                : tab === "web"
                  ? "Web Development"
                  : "Machine Learning"}
            </button>
          ))}
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (projectRefs.current[index] = el)}
              className="bg-white/10 dark:bg-[#1a1a24]/60 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:shadow-[0_8px_32px_0_rgba(150,58,235,0.2)] transition-all duration-500 flex flex-col h-full group"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative h-56 overflow-hidden group flex-shrink-0 bg-black/5 dark:bg-white/5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  className={`absolute inset-0 bg-black/70 flex items-center justify-center gap-4 transition-opacity duration-300 ${
                    hoveredProject === project.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <button
                    onClick={() => handleLiveClick(project.liveLink)}
                    className="p-3 rounded-full bg-white text-gray-800 hover:bg-secondary-500 hover:text-white transition-colors duration-300"
                  >
                    <Monitor className="h-5 w-5" />
                  </button>
                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white text-gray-800 hover:bg-secondary-500 hover:text-white transition-colors duration-300"
                  >
                    <Code className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-primary-400 to-secondary-500 bg-clip-text text-transparent font-heading">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-[10px] font-semibold tracking-wide text-primary-700 dark:text-primary-300 bg-primary-500/5 dark:bg-primary-500/10 border border-primary-500/20 dark:border-primary-500/10 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2.5 py-1 text-[10px] font-medium text-gray-500 bg-transparent">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-white/10 mt-auto">
                  <button
                    onClick={() => handleLiveClick(project.liveLink)}
                    className="text-xs font-bold text-primary-600 dark:text-primary-400 flex items-center gap-1 group/link"
                  >
                    <span className="relative">
                      Live Demo
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover/link:w-full"></span>
                    </span>
                    <ExternalLink className="h-3 w-3 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </button>
                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-gray-600 dark:text-gray-400 flex items-center gap-1 group/link"
                  >
                    <span className="relative">
                      Code
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gray-500 transition-all duration-300 group-hover/link:w-full"></span>
                    </span>
                    <Github className="h-3.5 w-3.5" />
                  </a>
                  <RouterLink
                    to={`/project/${project.id}`}
                    className="text-xs font-bold text-secondary-600 dark:text-secondary-400 flex items-center gap-1 group/link"
                  >
                    <span className="relative">
                      Details
                      <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-secondary-500 transition-all duration-300 group-hover/link:w-full"></span>
                    </span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-0.5" />
                  </RouterLink>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 relative">
          <a
            href="https://github.com/Tharunkunamalla"
            target="_blank"
            rel="noopener noreferrer"
            className="
              relative inline-flex items-center gap-3 px-8 py-4
              rounded-full font-medium tracking-wide
              text-white
              bg-gradient-to-r from-[#1f1f2e] via-[#26263a] to-[#1a1a2a]
              border border-white/10
              shadow-lg shadow-purple-500/20
              backdrop-blur-md
              transition-all duration-500
              hover:-translate-y-1
              hover:shadow-purple-500/40
              hover:border-purple-400/40
              group
            "
          >
            <span className="text-sm md:text-base">
              More Projects on GitHub
            </span>

            <Github
              className="h-5 w-5 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110"
            />
          </a>
        </div>
      </div>

      <div
        className="
          pointer-events-none absolute bottom-0 inset-x-0 h-32 z-10
          bg-gradient-to-t
          from-white/90 to-transparent
          dark:from-black/80
        "
      />
    </div>
  );
};

export default AllProjects;
