import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Plus, Settings, Sparkles } from "lucide-react";

export default function ProjectDetailsHeader({ project }) {
  const statusLabel = project.featured ? "Featured" : "Active";

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="space-y-4">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-extrabold text-gray-900">{project.title}</h1>
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Featured
              </span>
            )}
            {!project.featured && (
              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider">
                {statusLabel}
              </span>
            )}
          </div>
          <p className="text-lg text-gray-500 max-w-2xl">{project.description}</p>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Open project site <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="p-3 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100"
        >
          <Plus className="w-5 h-5" />
          Visit live
        </a>
      </div>
    </div>
  );
}
