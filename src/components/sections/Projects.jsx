// src/components/sections/Projects.jsx
import React from "react";
import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {Link as RouterLink} from "react-router-dom"; // 👈 add this
import {ExternalLink, Github, Code, Monitor} from "lucide-react";
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
      "A real-time collaborative code editor built with React, Node.js, Express, and Socket.IO. It allows multiple users to edit code simultaneously with live updates and syntax highlighting.",
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
  const [activeTab, setActiveTab] = useState("all");
  const [showMore, setShowMore] = useState(false); // 👈 added state for show more

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

  const currentProjects =
    activeTab === "all"
      ? allProjects
      : activeTab === "web"
        ? webProjects
        : machineLearningProjects;

  // 👇 limit the number of projects shown initially
  const visibleProjects = showMore
    ? currentProjects
    : currentProjects.slice(0, 4);

  projectRefs.current = Array(visibleProjects.length)
    .fill()
    .map((_, i) => projectRefs.current[i] || React.createRef());

  useEffect(() => {
    const ctx = gsap.context(() => {
      projectRefs.current.forEach((project, index) => {
        if (project) {
          gsap.from(project, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: 0.2 * (index % 3),
            scrollTrigger: {
              trigger: project,
              start: "top 95%",
              toggleActions: "play none none reset",
            },
          });
        }
      });
    }, sectionRef);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [activeTab, showMore]); // 👈 re-run animation when toggled

  const visibleProject = showMore
    ? currentProjects
    : currentProjects.slice(0, 4);

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
      className="relative py-24 bg-light-100 dark:bg-gradient-to-br from-[#0f0f14] via-[#12121a] to-[#0c0c10] overflow-hidden"
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
      {/* Glowing background orbs */}
      <div className="absolute top-50 -left-10 w-[500px] h-[500px] bg-gradient-to-tr from-secondary-300 via-purple-400 to-pink-300 opacity-30 rounded-full blur-3xl animate-pulse-slow pointer-events-none z-0" />
      <div className="absolute -bottom-16 -right-20 w-[400px] h-[400px] bg-gradient-to-tr from-primary-300 via-cyan-300 to-blue-300 opacity-25 rounded-full blur-3xl animate-pulse-slower pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(#4443_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.02] dark:opacity-5 z-0 pointer-events-none" />

      {/* Content */}
      {/* Content */}
      <div className="relative z-10 w-full max-w-[95%] 2xl:max-w-[85%] mx-auto px-4">
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white"
        >
          My <span className="text-secondary-500">Projects</span>
        </h2>

        {/* 👇 Project Count */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-8">
          Showing {visibleProject.length} of {currentProjects.length} projects
        </p>

        <div className="flex flex-wrap md:flex-nowrap justify-center items-center mb-10 gap-4 w-full px-4">
          {["all", "web", "ml"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setShowMore(false); // reset to first 4 when switching tabs
              }}
              className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold transition duration-300 transform hover:scale-105 text-sm md:text-base ${
                activeTab === tab
                  ? "bg-secondary-500 text-white shadow-md"
                  : "border-2 border-secondary-500 text-secondary-500 hover:bg-secondary-500 hover:text-white transition-all duration-300"
              }`}
            >
              {tab === "all"
                ? "All Projects"
                : tab === "web"
                  ? "Web Projects"
                  : "Machine Learning"}
            </button>
          ))}
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (projectRefs.current[index] = el)}
              className="bg-white/5 backdrop-blur-md
                  border border-white/10 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative h-48 overflow-hidden group flex-shrink-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="
                      w-full h-full
                      object-cover object-top
                      scale-95
                      transition-transform duration-500 ease-out
                      group-hover:scale-105 rounded-lg
                    "
                />

                <div
                  className={`absolute inset-0 bg-black/70 flex items-center justify-center gap-6 transition-opacity duration-300 ${
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
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-4 flex-grow text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="
                        px-2.5 py-1 
                        text-[11px] font-medium tracking-wide
                        text-gray-700 dark:text-gray-300 
                        bg-gray-100 dark:bg-white/5 
                        border border-gray-200 dark:border-white/10 
                        rounded-md shadow-sm
                        transition-all duration-300
                        hover:bg-secondary-50 hover:text-secondary-600 hover:border-secondary-200 
                        dark:hover:bg-secondary-900/30 dark:hover:text-secondary-300 dark:hover:border-secondary-500/30
                        cursor-default
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700 mt-auto gap-2">
                  <button
                    onClick={() => handleLiveClick(project.liveLink)}
                    className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 flex items-center gap-1 transition-colors duration-300 whitespace-nowrap"
                  >
                    Live Demo <ExternalLink className="h-3 w-3" />
                  </button>
                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex items-center gap-1 transition-colors duration-300 whitespace-nowrap"
                  >
                    View Code <Github className="h-3.5 w-3.5" />
                  </a>
                  <RouterLink
                    to={`/project/${project.id}`}
                    className="text-xs font-medium text-secondary-600 dark:text-secondary-400 hover:text-secondary-800 dark:hover:text-secondary-300 flex items-center gap-1 transition-colors duration-300 whitespace-nowrap"
                  >
                    Details <ExternalLink className="h-3 w-3" />
                  </RouterLink>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 👇 Show More / Show Less Button */}
        {currentProjects.length > 4 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowMore((prev) => !prev)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary-500 text-white hover:bg-secondary-600 transition-all duration-300"
            >
              {/* {showMore ? "Show Less" : "Show More"} */}
              {showMore ? (
                <>
                  Show less <ChevronUp className="h-5 w-5" />
                </>
              ) : (
                <>
                  Show more <ChevronDown className="h-5 w-5" />
                </>
              )}
            </button>
          </div>
        )}

        <div className="text-center mt-16 mb-16 relative">
          {/* Glow background */}
          <div className="absolute inset-0 flex justify-center">
            <div className="w-64 h-14 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 blur-2xl opacity-40 animate-pulse"></div>
          </div>

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
              className="
        h-5 w-5
        transition-transform duration-500
        group-hover:rotate-12 group-hover:scale-110
      "
            />
          </a>
        </div>

        <br />
        {/* <GitHubStats username="Tharunkunamalla" /> */}
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
