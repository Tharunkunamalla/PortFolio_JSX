import {memo} from "react";
import {Link} from "react-router-dom";

const ProjectCard = ({project}) => (
  <div className="bg-white dark:bg-dark-300 rounded-xl shadow-md p-4">
    <img
      src={project.image}
      alt={project.title}
      loading="lazy"
      className="w-full h-48 object-cover rounded-md mb-4"
    />
    <h3 className="text-xl font-bold">{project.title}</h3>
    <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
      {project.description}
    </p>
    <div className="mt-4">
      <Link
        to={`/project/${project.id}`}
        className="text-blue-600 hover:underline"
      >
        View Details →
      </Link>
    </div>
  </div>
);

export default memo(ProjectCard);
