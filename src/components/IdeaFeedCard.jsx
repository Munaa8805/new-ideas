import { useState } from "react";
import {
  Calendar,
  MessageSquare,
  Heart,
  Sparkles,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { formatShortDate } from "../utils/formatDate";
import { IDEAS_API_URL } from "../constants/api";
import { ACCESS_TOKEN_KEY, useAuth } from "../context/AuthContext";
import { isIdeaOwnedBy } from "../utils/ideaOwnership";

export default function IdeaFeedCard({ idea, onDeleted }) {
  const { user } = useAuth();
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const isOwner = isIdeaOwnedBy(idea, user);

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Delete this idea? This cannot be undone.",
      )
    ) {
      return;
    }

    setDeleteError("");
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) return;

    setDeleting(true);
    try {
      const res = await fetch(
        `${IDEAS_API_URL}/${encodeURIComponent(idea._id)}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) {
        setDeleteError(
          typeof json.message === "string"
            ? json.message
            : "Could not delete this idea.",
        );
        return;
      }
      onDeleted?.(idea._id);
    } catch {
      setDeleteError("Network error. Try again.");
    } finally {
      setDeleting(false);
    }
  };

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

          {isOwner && deleteError ? (
            <p className="text-sm text-red-600" role="alert">
              {deleteError}
            </p>
          ) : null}

          {isOwner ? (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <Link
                to={`/ideas/${idea._id}/edit`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors"
              >
                <Pencil className="w-4 h-4" />
                Edit
              </Link>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-red-50 text-red-700 hover:bg-red-100 transition-colors disabled:opacity-60"
              >
                {deleting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Delete
              </button>
            </div>
          ) : null}
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
