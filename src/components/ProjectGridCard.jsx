import { MoreVertical, Sparkles, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { formatShortDate } from "../utils/formatDate";

export default function ProjectGridCard({ project }) {
  return (
    <article className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group">
      <Link
        to={`/projects/${project._id}`}
        className="block aspect-16/10 bg-gray-100 relative"
      >
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          loading="lazy"
        />
      </Link>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-700">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Featured
              </span>
            )}
          </div>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600 p-1 shrink-0"
            aria-label="More options"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
        <Link to={`/projects/${project._id}`}>
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors leading-snug">
            {project.title}
          </h2>
        </Link>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>
        <div className="flex items-center justify-between gap-3 pt-1">
          <span className="text-xs text-gray-400">
            {formatShortDate(project.date || project.createdAt)}
          </span>
          <div className="flex items-center gap-3">
            <Link
              to={`/projects/${project._id}`}
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Details
            </Link>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-800"
            >
              Site <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
