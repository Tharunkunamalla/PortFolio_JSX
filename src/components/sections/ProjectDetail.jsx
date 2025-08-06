// import React, {useEffect, useState, useRef} from "react";
// import {useParams, Link} from "react-router-dom";
// import projectsData from "../../data/projects.json";
// import {FaGithub, FaExternalLinkAlt} from "react-icons/fa";

// const ProjectDetail = () => {
//   const loaderRef = useRef(null);
//   const {projectId} = useParams();
//   const [isLoading, setIsLoading] = useState(true);

//   const allProjects = [
//     ...projectsData.webProjects,
//     ...projectsData.machineLearningProjects,
//   ];

//   const project = allProjects.find((p) => p.id === parseInt(projectId));

//   // Fake loading delay to show loader (you can remove or adjust time)
//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 800); // 800ms delay
//     return () => clearTimeout(timer);
//   }, []);

//   if (isLoading) {
//     return (
//       <div
//         ref={loaderRef}
//         className="fixed inset-0 z-50 bg-light-100 dark:bg-dark-100 flex items-center justify-center transition-all duration-500"
//       >
//         <img
//           src="/assets/loader.gif"
//           alt="Loading..."
//           className="w-28 h-28 object-contain"
//         />
//       </div>
//     );
//   }

//   if (!project) {
//     return (
//       <div className="text-center mt-10 text-red-600 text-xl">
//         Project not found 😢
//       </div>
//     );
//   }

//   return (
//     <div className="bg-light-100 dark:bg-dark-100 min-h-screen pt-20 relative">
//       <div className="max-w-6xl mx-auto px-4">
//         {/* Back to Projects */}
//         <Link
//           to="/#projects"
//           className="text-sm text-purple-500 hover:underline mb-4 inline-block"
//         >
//           ← Back to Projects
//         </Link>

//         {/* Banner Image */}
//         <div className="w-full rounded-3xl overflow-hidden shadow-lg mb-6">
//           <img
//             src={project.image}
//             alt={project.title}
//             className="w-full h-72 object-cover object-center"
//           />
//         </div>

//         {/* Title */}
//         <h1 className="text-white text-3xl md:text-4xl font-bold mb-6 text-center">
//           {project.title}
//         </h1>

//         {/* Content */}
//         <div className="grid md:grid-cols-3 gap-8">
//           {/* Description */}
//           <div className="md:col-span-2">
//             <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
//               Project Overview
//             </h2>
//             <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
//               {project.description}
//             </p>

//             {/* Technologies */}
//             <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-800 dark:text-white">
//               Tech Stack
//             </h3>
//             <div className="flex flex-wrap gap-2">
//               {project.technologies.map((tech, idx) => (
//                 <span
//                   key={idx}
//                   className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 text-sm px-3 py-1 rounded-full"
//                 >
//                   {tech}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Links */}
//           <div className="space-y-4">
//             <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
//               Project Links
//             </h3>
//             <div className="flex flex-col gap-3">
//               <a
//                 href={project.liveLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={`flex items-center gap-2 px-5 py-3 rounded-lg ${
//                   project.liveLink
//                     ? "bg-blue-600 hover:bg-blue-700 text-white"
//                     : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 } transition`}
//               >
//                 <FaExternalLinkAlt /> Live Demo
//               </a>
//               <a
//                 href={project.codeLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-2 px-5 py-3 rounded-lg bg-gray-900 hover:bg-gray-800 text-white transition"
//               >
//                 <FaGithub /> View Code
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* More Projects */}
//         <div className="mt-16">
//           <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
//             More Projects
//           </h2>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {allProjects
//               .filter((p) => p.id !== parseInt(projectId))
//               .slice(0, 3)
//               .map((proj) => (
//                 <Link
//                   key={proj.id}
//                   to={`/project/${proj.id}`}
//                   className="block bg-dark-200 hover:bg-dark-300 transition p-4 rounded-xl shadow"
//                 >
//                   <img
//                     src={proj.image}
//                     alt={proj.title}
//                     className="w-full h-40 object-cover rounded-lg mb-4"
//                   />
//                   <h3 className="text-lg font-semibold text-white">
//                     {proj.title}
//                   </h3>
//                 </Link>
//               ))}
//           </div>
//         </div>

//         {/* CTA Back */}
//         <div className="text-center mt-16">
//           <Link
//             to="/#projects"
//             className="inline-block px-6 py-3 rounded-full bg-secondary-500 text-white hover:bg-secondary-600 transition"
//           >
//             ← Back to All Projects
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectDetail;
