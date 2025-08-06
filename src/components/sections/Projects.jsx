// src/components/sections/Projects.jsx
import React from "react";
import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {ExternalLink, Github, Code, Monitor} from "lucide-react";
import toast from "react-hot-toast";

gsap.registerPlugin(ScrollTrigger);

// Your project data
const webProjects = [
  {
    id: 1,
    title: "FaceRipple",
    description: "Video Calling Realtime Chat App & Social App",
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
    id: 3,
    title: "Sapphire Skies Resort",
    description:
      "A fully responsive resort booking app with authentication and room management.",
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
    id: 4,
    title: "Tournament Management System",
    description: "Manage tournaments, teams, and schedules online.",
    image: "/assets/TMS_proj.png",
    technologies: ["Php", "SQL", "JS", "CSS", "HTML"],
    liveLink: "",
    codeLink: "https://github.com/Tharunkunamalla/TMS",
  },
  {
    id: 5,
    title: "Portfolio Website",
    description: "My personal portfolio showcasing skills and projects.",
    image: "/assets/portfolio.png",
    technologies: ["Js", "CSS", "HTML"],
    liveLink: "https://tharun-kunamalla.netlify.app/",
    codeLink: "https://github.com/Tharunkunamalla/Portfolio-js",
  },
  {
    id: 6,
    title: "Gemini-AI",
    description: "AI assistant dashboard with clean UI and GPT integration.",
    image: "/assets/gemini.jpg",
    technologies: ["JS", "Css", "OpenAI API"],
    liveLink: "https://gemini-app-chatbot.vercel.app/",
    codeLink: "https://github.com/Tharunkunamalla/Gemini_App",
  },
  {
    id: 7,
    title: "Jarvis -Voice Assistant",
    description: "Real-time voice assistant with Google integration.",
    image: "/assets/jarvis.gif",
    technologies: ["JS", "Google"],
    liveLink: "https://jarvis-responder.vercel.app/",
    codeLink: "https://github.com/Tharunkunamalla/Jarvis",
  },
];

const machineLearningProjects = [
  {
    id: 8,
    title: "Brain Tumor MRI Classification",
    description: "CNN and Transfer Learning to classify MRI brain images.",
    image: "/assets/brain_tumor.png",
    technologies: ["Python", "TensorFlow", "Keras", "Streamlit"],
    liveLink: "",
    codeLink:
      "https://github.com/Tharunkunamalla/Project-3_Labmentix_Brain_Tumor_Img_cls",
  },
  {
    id: 9,
    title: "PhonePe Transactions Insights",
    description:
      "Data analysis of PhonePe transactions using Python and visualization libraries.",
    image: "/assets/phonepe.png",
    technologies: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
    liveLink: "",
    codeLink:
      "https://github.com/Tharunkunamalla/Project-2-Labementix-PhonePe_Transaction_Insights",
  },
];

const allProjects = [...webProjects, ...machineLearningProjects];

const Projects = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const projectRefs = useRef([]);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

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

  projectRefs.current = Array(currentProjects.length)
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
  }, [activeTab]);

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
      className="relative py-20 bg-light-200 dark:bg-dark-200 overflow-hidden"
    >
      {/* Glowing background orbs */}
      <div className="absolute -top-10 -left-10 w-[500px] h-[500px] bg-gradient-to-tr from-secondary-300 via-purple-400 to-pink-300 opacity-30 rounded-full blur-3xl animate-pulse-slow pointer-events-none z-0" />
      <div className="absolute -bottom-16 -right-20 w-[400px] h-[400px] bg-gradient-to-tr from-primary-300 via-cyan-300 to-blue-300 opacity-25 rounded-full blur-3xl animate-pulse-slower pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(#4443_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.02] dark:opacity-5 z-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white"
        >
          My <span className="text-secondary-500">Projects</span>
        </h2>

        <div className="flex flex-wrap md:flex-nowrap justify-center items-center mb-10 gap-4 w-full px-4">
          {["all", "web", "ml"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {currentProjects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (projectRefs.current[index] = el)}
              className="bg-white dark:bg-dark-300 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative h-48 overflow-hidden group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-light-300 dark:bg-dark-400 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={() => handleLiveClick(project.liveLink)}
                    className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 flex items-center gap-1 transition-colors duration-300"
                  >
                    Live Demo <ExternalLink className="h-3 w-3" />
                  </button>
                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex items-center gap-1 transition-colors duration-300"
                  >
                    View Code <Github className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://github.com/Tharunkunamalla"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-800 dark:bg-gray-700 text-white hover:dark:bg-secondary-500 hover:bg-secondary-500 transition-colors duration-300"
          >
            More Projects on GitHub <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
