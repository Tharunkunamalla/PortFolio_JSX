import React, {useEffect, useState, useRef} from "react";
import {useParams, useNavigate} from "react-router-dom";
import projectsData from "../../data/projects.json";
import {FaGithub, FaExternalLinkAlt} from "react-icons/fa";

const ProjectDetail = () => {
  const loaderRef = useRef(null);
  const {projectId} = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const allProjects = [
    ...projectsData.webProjects,
    ...projectsData.machineLearningProjects,
  ];

  const [project, setProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const selectedProject = allProjects.find(
      (p) => p.id === parseInt(projectId)
    );
    setProject(selectedProject);
    const timer = setTimeout(() => setIsLoading(false), 700);
    return () => clearTimeout(timer);
  }, [projectId]);

  const goBackToProjects = () => {
    navigate("/", {state: {scrollTo: "projects"}});
  };

  /* ================= LOADER ================= */
  if (isLoading) {
    return (
      <div
        ref={loaderRef}
        className="fixed inset-0 z-50 bg-light-100 dark:bg-[#0b0b0f] flex items-center justify-center"
      >
        <img
          src="/assets/loader.gif"
          alt="Loading..."
          className="w-28 h-28 object-contain"
        />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center mt-10 text-red-600 text-xl">
        Project not found 😢
      </div>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-light-100 dark:bg-[#0b0b0f]">
      {/* ===== TOP BLEND ===== */}
      <div
        className="
        pointer-events-none absolute top-0 inset-x-0 h-24
        bg-gradient-to-b from-white/80 to-transparent
        dark:from-black/60
      "
      />

      <div className="max-w-7xl mx-auto px-4 pt-20 pb-8">
        {/* Back Button */}
        <button
          onClick={goBackToProjects}
          className="mb-6 text-sm font-medium text-secondary-500 hover:underline"
        >
          ← Back to Projects
        </button>

        {/* ===== HERO ===== */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-12 group">
          <img
            src={project.image}
            alt={project.title}
            className="
              w-full h-[320px] sm:h-[400px] md:h-[450px]
              object-cover transition-transform duration-700
              group-hover:scale-105
            "
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-10 flex flex-col justify-end">
            <h1 className="text-white text-4xl md:text-5xl font-extrabold">
              {project.title}
            </h1>
            <p className="text-gray-300 mt-2 text-lg">
              {project.tagline || "Innovative and impactful project"}
            </p>
          </div>
        </div>

        {/* ===== CONTENT ===== */}
        <div className="grid md:grid-cols-3 gap-12">
          {/* Overview */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Project Overview
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {project.description}
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-800 dark:text-white">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="
                    px-4 py-1 rounded-full text-sm
                    bg-purple-100 dark:bg-purple-900/40
                    text-purple-700 dark:text-purple-200
                    backdrop-blur-md
                  "
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Project Links
            </h3>
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                flex items-center justify-center gap-2 px-5 py-3 rounded-xl
                font-semibold text-lg transition
                ${
                  project.liveLink
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }
              `}
            >
              <FaExternalLinkAlt /> Live Demo
            </a>

            <a
              href={project.codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center justify-center gap-2 px-5 py-3 rounded-xl
                bg-gray-900 hover:bg-gray-800 text-white
                font-semibold text-lg transition
              "
            >
              <FaGithub /> View Code
            </a>
          </div>
        </div>

        {/* ===== MORE PROJECTS ===== */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            More Projects
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProjects
              .filter((p) => p.id !== parseInt(projectId))
              .slice(0, 3)
              .map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => {
                    setIsLoading(true);
                    navigate(`/project/${proj.id}`);
                  }}
                  className="
                    group cursor-pointer rounded-2xl overflow-hidden
                    bg-white/5 backdrop-blur-md
                    border border-white/10
                    shadow-lg transition-all duration-300
                    hover:-translate-y-1 hover:shadow-2xl
                  "
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="
                        w-full h-40 object-cover
                        transition-transform duration-500
                        group-hover:scale-110
                      "
                    />
                    <div
                      className="
                      absolute inset-0 bg-black/50
                      opacity-0 group-hover:opacity-100
                      transition
                    "
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white">
                      {proj.title}
                    </h3>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* ===== BOTTOM CTA ===== */}
        <div className="mt-14 text-center">
          <button
            onClick={goBackToProjects}
            className="
              inline-flex px-7 py-3 rounded-full
              bg-secondary-500 text-white
              hover:bg-secondary-600 transition
              text-lg font-medium
            "
          >
            ← Back to All Projects
          </button>
        </div>
      </div>

      {/* ===== BOTTOM BLEND ===== */}
      <div
        className="
          pointer-events-none absolute bottom-0 inset-x-0 h-32
          bg-gradient-to-t
          from-white/90 to-transparent
          dark:from-black/80
        "
      />
    </section>
  );
};

export default ProjectDetail;
