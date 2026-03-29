import { useState } from "react";
import { Send, Sparkles, Loader2, Tag } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { IDEAS_API_URL } from "../constants/api";
import { ACCESS_TOKEN_KEY, useAuth } from "../context/AuthContext";

const fieldClass =
  "w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all disabled:opacity-60 disabled:bg-gray-50";

function parseTags(input) {
  return input
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function NewIdea() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [featured, setFeatured] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) {
      setFormError("Your session expired. Please sign in again.");
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      summary: summary.trim(),
      tags: parseTags(tagsInput),
      featured: Boolean(featured),
    };
    if (user?._id) {
      payload.user = user._id;
    }

    setSubmitting(true);
    try {
      const res = await fetch(IDEAS_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json.success) {
        setFormError(
          typeof json.message === "string"
            ? json.message
            : "Could not save your idea. Try again.",
        );
        return;
      }

      setTitle("");
      setDescription("");
      setSummary("");
      setTagsInput("");
      setFeatured(false);
      navigate("/ideas");
    } catch {
      setFormError("Network error. Check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-8 pt-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-indigo-600" />
          Capture New Idea
        </h1>
        <p className="text-gray-500">
          Don&apos;t let that spark fade away. Jot it down now.
        </p>
      </div>

      {formError ? (
        <p
          className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3"
          role="alert"
        >
          {formError}{" "}
          {formError.includes("session") || formError.includes("sign in") ? (
            <Link
              to="/login"
              state={{ from: "/new-idea" }}
              className="font-bold underline hover:no-underline"
            >
              Go to login
            </Link>
          ) : null}
        </p>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6"
      >
        <div className="space-y-2">
          <label
            htmlFor="idea-title"
            className="text-sm font-semibold text-gray-700 uppercase tracking-wider"
          >
            Idea Title
          </label>
          <input
            id="idea-title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's the big idea?"
            className={fieldClass}
            required
            disabled={submitting}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="idea-summary"
            className="text-sm font-semibold text-gray-700 uppercase tracking-wider"
          >
            Summary
          </label>
          <textarea
            id="idea-summary"
            name="summary"
            rows={3}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="One or two sentences—what's the hook?"
            className={`${fieldClass} resize-none`}
            required
            disabled={submitting}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="idea-description"
            className="text-sm font-semibold text-gray-700 uppercase tracking-wider"
          >
            Description
          </label>
          <textarea
            id="idea-description"
            name="description"
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us more about it..."
            className={`${fieldClass} resize-none`}
            required
            disabled={submitting}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="idea-tags"
            className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2"
          >
            <Tag className="w-4 h-4 text-gray-500" aria-hidden />
            Tags
          </label>
          <input
            id="idea-tags"
            name="tags"
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="saas, tools, ai (comma-separated)"
            className={fieldClass}
            disabled={submitting}
          />
          <p className="text-xs text-gray-500">
            Stored as a list of strings—separate tags with commas.
          </p>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/80 px-4 py-3">
          <input
            id="idea-featured"
            name="featured"
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            disabled={submitting}
          />
          <label
            htmlFor="idea-featured"
            className="text-sm text-gray-700 cursor-pointer"
          >
            <span className="font-semibold text-gray-900">Featured</span>
            <span className="block text-gray-500">
              Highlight this idea in featured lists (if your account allows it).
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 disabled:opacity-70 disabled:pointer-events-none"
        >
          {submitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving…
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Save Idea
            </>
          )}
        </button>
      </form>
    </div>
  );
}
