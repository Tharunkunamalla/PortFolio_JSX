import React from "react";
import {useParams} from "react-router-dom";
import projectsData from "../../data/projects.json";
import {FaGithub, FaExternalLinkAlt} from "react-icons/fa";

const ProjectDetail = () => {
  const {projectId} = useParams();
  const project = projectsData.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="text-center mt-10 text-red-600 text-xl">
        Project not found 😢
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">{project.title}</h1>

      <img
        src={project.image}
        alt={project.title}
        className="w-full h-auto rounded-2xl shadow-lg mb-6"
      />

      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="flex gap-4">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            <FaExternalLinkAlt /> Live
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition"
          >
            <FaGithub /> GitHub
          </a>
        </div>

        <p className="text-lg md:ml-8 md:mt-0 mt-4 leading-relaxed">
          {project.description}
        </p>
      </div>
    </div>
  );
};

export default ProjectDetail;
