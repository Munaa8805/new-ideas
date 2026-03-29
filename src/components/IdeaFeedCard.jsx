import {
  Calendar,
  MessageSquare,
  Heart,
  Sparkles,
} from "lucide-react";
import { formatShortDate } from "../utils/formatDate";

export default function IdeaFeedCard({ idea }) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            {idea.featured && (
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Featured
              </span>
            )}
            {!idea.featured &&
              Array.isArray(idea.tags) &&
              idea.tags[0] && (
                <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider">
                  {idea.tags[0]}
                </span>
              )}
            <span className="flex items-center gap-1 text-sm text-gray-400">
              <Calendar className="w-4 h-4" />
              {formatShortDate(idea.createdAt)}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
            {idea.title}
          </h2>

          <p className="text-gray-600 leading-relaxed text-lg">
            {idea.description || idea.summary}
          </p>

          {Array.isArray(idea.tags) && idea.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {idea.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-lg"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex md:flex-col justify-between md:justify-center items-center gap-4 md:border-l md:border-gray-100 md:pl-8">
          <button
            type="button"
            className="flex items-center gap-2 text-gray-400 hover:text-rose-500 transition-colors group/btn"
            aria-label="Like (coming soon)"
          >
            <div className="p-2 rounded-full group-hover/btn:bg-rose-50 transition-colors">
              <Heart className="w-6 h-6" />
            </div>
          </button>
          <button
            type="button"
            className="flex items-center gap-2 text-gray-400 hover:text-indigo-600 transition-colors group/btn"
            aria-label="Comments (coming soon)"
          >
            <div className="p-2 rounded-full group-hover/btn:bg-indigo-50 transition-colors">
              <MessageSquare className="w-6 h-6" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
