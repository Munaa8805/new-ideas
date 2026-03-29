import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function FeaturedIdeaCard({ idea }) {
  return (
    <article className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4">
      <h3 className="text-xl font-bold text-gray-900 leading-snug">{idea.title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 flex-1">
        {idea.summary || idea.description}
      </p>
      {Array.isArray(idea.tags) && idea.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {idea.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-lg font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      <Link
        to="/ideas"
        className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
      >
        Explore ideas <ArrowRight className="w-4 h-4" />
      </Link>
    </article>
  );
}
