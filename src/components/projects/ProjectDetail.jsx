import React, {useEffect, useState, useRef} from "react";
import {useParams, useNavigate, Link} from "react-router-dom";
import {allProjects} from "../../constants/projectsData";
import {FaGithub, FaExternalLinkAlt} from "react-icons/fa";
import {ArrowLeft, ExternalLink, Github} from "lucide-react";
import ImageWithSkeleton from "../ui/ImageWithSkeleton";
import BackgroundParticles from "../layout/BackgroundParticles";

const ProjectDetail = () => {
  const loaderRef = useRef(null);
  const {projectId} = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [project, setProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const selectedProject = allProjects.find(
      (p) => p.id === parseInt(projectId),
    );
    setProject(selectedProject);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [projectId]);

  const goBackToProjects = () => {
    navigate("/projects");
  };

  /* ================= LOADER ================= */
  if (isLoading) {
    return (
      <div
        ref={loaderRef}
        data-app-loader="true"
        className="fixed inset-0 z-[100] bg-white dark:bg-[#09090b] flex items-center justify-center"
      >
        <img
          src="/assets/loader.gif"
          alt="Loading..."
          className="w-24 h-24 object-contain filter grayscale dark:invert"
        />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-white dark:bg-[#09090b]">
        <h2 className="text-2xl font-display font-bold text-black dark:text-white mb-4">
          Project Not Found
        </h2>
        <button
          onClick={goBackToProjects}
          className="px-6 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black font-mono text-xs uppercase tracking-widest"
        >
          Return to Projects
        </button>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen pt-28 pb-20 bg-white dark:bg-[#09090b] transition-colors duration-300 overflow-hidden">
      <BackgroundParticles />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Back Button */}
        <button
          onClick={goBackToProjects}
          className="inline-flex items-center gap-2 mb-8 text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 hover:text-black dark:hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to All Projects</span>
        </button>

        {/* ===== HERO ===== */}
        <div className="relative rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800/80 shadow-2xl mb-12 group bg-zinc-100 dark:bg-zinc-900">
          <ImageWithSkeleton
            src={project.image}
            alt={project.title}
            loading="eager"
            className="w-full h-[320px] sm:h-[420px] md:h-[480px] object-cover object-top transition-all duration-700 ease-out group-hover:scale-103"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 sm:p-12 flex flex-col justify-end">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight mb-2">
              {project.title}
            </h1>
            <p className="text-zinc-300 text-sm sm:text-base font-light max-w-2xl">
              {project.tagline || "High-performance full-stack web engineering"}
            </p>
          </div>
        </div>

        {/* ===== CONTENT ===== */}
        <div className="grid md:grid-cols-12 gap-10">
          {/* Overview */}
          <div className="md:col-span-8 bg-zinc-50 dark:bg-zinc-950/70 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800/80">
            <h2 className="text-xl font-display font-bold mb-4 text-black dark:text-white uppercase tracking-wider">
              Project Architecture & Overview
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm sm:text-base font-light mb-8">
              {project.description}
            </p>

            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 mb-4">
              Technologies Utilized
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links Card */}
          <div className="md:col-span-4 space-y-4">
            <div className="bg-zinc-50 dark:bg-zinc-950/70 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800/80 space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500 mb-4">
                Deployment & Repository
              </h3>

              {project.liveLink ? (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-xs uppercase tracking-wider shadow-md hover:scale-102 transition-all duration-300"
                >
                  <ExternalLink className="w-4 h-4" /> Live Deployment
                </a>
              ) : (
                <div className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-500 font-semibold text-xs uppercase tracking-wider cursor-not-allowed">
                  Preview Coming Soon
                </div>
              )}

              <a
                href={project.codeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-zinc-300 dark:border-zinc-700 text-black dark:text-white font-semibold text-xs uppercase tracking-wider hover:border-black dark:hover:border-white hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
              >
                <Github className="w-4 h-4" /> View Source Code
              </a>
            </div>
          </div>
        </div>

        {/* ===== MORE PROJECTS ===== */}
        <div className="mt-20">
          <h2 className="text-2xl font-display font-bold text-black dark:text-white mb-6 uppercase tracking-wider">
            Explore Other Works
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  className="group cursor-pointer rounded-3xl overflow-hidden bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800/80 shadow-sm hover:border-black dark:hover:border-white transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-44 overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                    <ImageWithSkeleton
                      src={proj.image}
                      alt={proj.title}
                      loading="eager"
                      className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-display font-bold text-black dark:text-white group-hover:underline">
                      {proj.title}
                    </h3>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetail;
