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
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [projectId]);

  const goBackToProjects = () => {
    navigate("/", {state: {scrollTo: "projects"}});
  };

  if (isLoading) {
    return (
      <div
        ref={loaderRef}
        className="fixed inset-0 z-50 bg-light-100 dark:bg-dark-100 flex items-center justify-center transition-all duration-500"
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
    <div className="bg-light-100 dark:bg-dark-100 min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={goBackToProjects}
          className="text-sm text-purple-500 hover:underline mb-6 inline-block"
        >
          ← Back to Projects
        </button>
        {/* Hero Image */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl mb-10 group transition duration-700">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-[300px] sm:h-[400px] md:h-[450px] object-cover object-center transform group-hover:scale-105 transition duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent p-10 flex flex-col justify-end">
            <h1 className="text-white text-4xl md:text-5xl font-extrabold">
              {project.title}
            </h1>
            <p className="text-gray-300 mt-2 text-lg">
              {project.tagline || "Innovative and impactful project"}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid md:grid-cols-3 gap-12 animate-fade-in">
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
                  className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 text-sm px-4 py-1 rounded-full shadow-sm"
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
            <div className="flex flex-col gap-4">
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold text-lg ${
                  project.liveLink
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } transition`}
              >
                <FaExternalLinkAlt /> Live Demo
              </a>
              <a
                href={project.codeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-gray-900 hover:bg-gray-800 text-white font-semibold text-lg transition"
              >
                <FaGithub /> View Code
              </a>
            </div>
          </div>
        </div>

        {/* More Projects */}
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
                  className="cursor-pointer bg-dark-200 hover:bg-dark-300 transition p-4 rounded-xl shadow-lg"
                >
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-semibold text-white">
                    {proj.title}
                  </h3>
                </div>
              ))}
          </div>
        </div>

        {/* CTA Button Below Footer Area */}
        <div className="mt-16 mb-10 text-center">
          <button
            onClick={goBackToProjects}
            className="inline-block px-6 py-3 rounded-full bg-secondary-500 text-white hover:bg-secondary-600 transition text-lg font-medium"
          >
            ← Back to All Projects
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
