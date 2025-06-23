import React, {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {Project} from "../../types";
import {ExternalLink, Github, Code, Monitor} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projectsData: Project[] = [
  {
    id: 1,
    title: "FaceRipple",
    description: "Video Calling Realtime Chat App & Social App",
    image: "/assets/FaceRipple.png",
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
    title: "Sapphire Skies Resort",
    description:
      "A fully responsive web application for a resort booking system, featuring user authentication, room management, and booking functionalities.",
    image: "/assets/sapphire.png",
    technologies: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "Clerk",
      "Prebuilt UI",
    ],
    liveLink: "https://sapphire-skies-resort.vercel.app/",
    codeLink: "https://github.com/Tharunkunamalla/Sapphire-skies-resort",
  },
  {
    id: 3,
    title: "Tournament Management System",
    description:
      "A web application for managing tournaments, including user authentication, team management, and match scheduling.",
    image: "/assets/TMS_proj.png",
    technologies: ["Php", "SQL", "JS", "CSS", "HTML"],
    liveLink: "https://google.com",
    codeLink: "https://github.com/Tharunkunamalla/TMS",
  },
  {
    id: 4,
    title: "Portfolio Website",
    description:
      "A personal portfolio website showcasing my projects, skills, and experience.",
    image: "/assets/portfolio.png",
    technologies: ["Js", "CSS", "HTML"],
    liveLink: "https://tharun-kunamalla.netlify.app/",
    codeLink: "https://github.com/Tharunkunamalla/Portfolio-js",
  },
  // {
  //   id: 5,
  //   title: "Lenz.co- Spectacles webstore",
  //   description:
  //     "A web application for an eyewear store, featuring user authentication, product management, and a shopping cart.",
  //   image: "/assets/Lenz_proj.png",
  //   technologies: ["React", "Next.js", "Tailwind CSS", "Vercel"],
  //   liveLink: "https://google.com",
  //   codeLink: "https://github.com",
  // },
  {
    id: 6,
    title: "Gemini-AI",
    description:
      "An AI assistant dashboard interface integrated with smart modules and a beautiful UI.",
    image: "/assets/gemini.jpg",
    technologies: ["JS", "Css", "OpenAI API"],
    liveLink: "https://gemini-app-chatbot.vercel.app/",
    codeLink: "https://github.com/Tharunkunamalla/Gemini_App",
  },
  {
    id: 7,
    title: "Jarvis -Voice Assistant",
    description:
      "A real-time voice assistant that responds to speech and fetches data from Google.",
    image: "/assets/jarvis.gif",
    technologies: ["JS", "Google"],
    liveLink: "https://jarvis-responder.vercel.app/",
    codeLink: "https://github.com/Tharunkunamalla/Jarvis",
  },
];

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Set up projectRefs with correct length
  projectRefs.current = Array(projectsData.length).fill(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the heading
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          toggleActions: "play none none reset",
        },
      });

      // Animate each project card
      projectRefs.current.forEach((project, index) => {
        if (project) {
          gsap.from(project, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: 0.2 * (index % 3), // Stagger effect based on column position
            scrollTrigger: {
              trigger: project,
              start: "top 95%",
              toggleActions: "play none none reset",
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-20 bg-light-200 dark:bg-dark-200"
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
        >
          My <span className="text-secondary-500">Projects</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
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

                {/* Overlay with actions that appear on hover */}
                <div
                  className={`absolute inset-0 bg-black/70 flex items-center justify-center gap-6 transition-opacity duration-300 ${
                    hoveredProject === project.id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive p-3 rounded-full bg-white text-gray-800 hover:bg-secondary-500 hover:text-white transition-colors duration-300 group"
                    aria-label="View live demo"
                  >
                    <Monitor className="h-5 w-5" />
                  </a>
                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive p-3 rounded-full bg-white text-gray-800 hover:bg-secondary-500 hover:text-white transition-colors duration-300 group"
                    aria-label="View source code"
                  >
                    <Code className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-light-300 dark:bg-dark-400 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive text-sm text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 flex items-center gap-1 transition-colors duration-300"
                  >
                    Live Demo <ExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="interactive text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 flex items-center gap-1 transition-colors duration-300"
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
            className="interactive inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-800 dark:bg-gray-700 text-white hover:dark:bg-secondary-500 hover:bg-secondary-500 transition-colors duration-300"
          >
            More Projects on GitHub <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
