import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function FeaturedProjectCard({ project }) {
  return (
    <article className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block aspect-16/10 bg-gray-100 relative group"
      >
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          loading="lazy"
        />
      </a>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full w-fit">
          {project.category}
        </span>
        <h3 className="text-xl font-bold text-gray-900 leading-snug">
          {project.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>
        <Link
          to={`/projects/${project._id}`}
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 mt-2"
        >
          View project <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}
