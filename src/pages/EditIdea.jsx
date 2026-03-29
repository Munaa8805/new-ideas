import { useState, useEffect } from "react";
import { Pencil, Loader2, Tag, ArrowLeft } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IDEAS_API_URL } from "../constants/api";
import { ACCESS_TOKEN_KEY, useAuth } from "../context/AuthContext";
import { isIdeaOwnedBy } from "../utils/ideaOwnership";

const fieldClass =
  "w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all disabled:opacity-60 disabled:bg-gray-50";

function parseTags(input) {
  return input
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function EditIdea() {
  const { ideaId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loadState, setLoadState] = useState("loading");
  const [ideaDoc, setIdeaDoc] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [featured, setFeatured] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!ideaId) {
      setLoadState("error");
      return;
    }
    let cancelled = false;
    setLoadState("loading");
    setIdeaDoc(null);
    fetch(`${IDEAS_API_URL}/${encodeURIComponent(ideaId)}`)
      .then((res) => {
        if (res.status === 404) return null;
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        if (json?.success && json.data) {
          const d = json.data;
          setIdeaDoc(d);
          setTitle(d.title || "");
          setDescription(d.description || "");
          setSummary(d.summary || "");
          setTagsInput(
            Array.isArray(d.tags) ? d.tags.join(", ") : "",
          );
          setFeatured(Boolean(d.featured));
          setLoadState("success");
        } else if (json === null) {
          setLoadState("notfound");
        } else {
          throw new Error("Invalid payload");
        }
      })
      .catch(() => {
        if (!cancelled) setLoadState("error");
      });
    return () => {
      cancelled = true;
    };
  }, [ideaId]);

  useEffect(() => {
    if (loadState !== "success" || !ideaDoc || !user?._id) return;
    if (!isIdeaOwnedBy(ideaDoc, user)) {
      navigate("/ideas", { replace: true });
    }
  }, [loadState, ideaDoc, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token || !ideaId) {
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

    setSubmitting(true);
    try {
      const res = await fetch(
        `${IDEAS_API_URL}/${encodeURIComponent(ideaId)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );
      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json.success) {
        setFormError(
          typeof json.message === "string"
            ? json.message
            : "Could not update your idea. Try again.",
        );
        return;
      }

      navigate("/ideas");
    } catch {
      setFormError("Network error. Check your connection.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadState === "loading") {
    return (
      <div className="flex items-center justify-center gap-2 py-24 text-gray-500">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span>Loading idea…</span>
      </div>
    );
  }

  if (loadState === "notfound" || loadState === "error") {
    return (
      <div className="max-w-2xl mx-auto py-12 pt-12 text-center space-y-4">
        <p className="text-gray-600">
          {loadState === "notfound"
            ? "This idea could not be found."
            : "Something went wrong loading this idea."}
        </p>
        <Link
          to="/ideas"
          className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to ideas
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-8 pt-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Pencil className="w-8 h-8 text-indigo-600" />
          Edit idea
        </h1>
        <p className="text-gray-500">Update your idea and save changes.</p>
      </div>

      {formError ? (
        <p
          className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3"
          role="alert"
        >
          {formError}
        </p>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6"
      >
        <div className="space-y-2">
          <label
            htmlFor="edit-idea-title"
            className="text-sm font-semibold text-gray-700 uppercase tracking-wider"
          >
            Idea Title
          </label>
          <input
            id="edit-idea-title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={fieldClass}
            required
            disabled={submitting}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="edit-idea-summary"
            className="text-sm font-semibold text-gray-700 uppercase tracking-wider"
          >
            Summary
          </label>
          <textarea
            id="edit-idea-summary"
            name="summary"
            rows={3}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className={`${fieldClass} resize-none`}
            required
            disabled={submitting}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="edit-idea-description"
            className="text-sm font-semibold text-gray-700 uppercase tracking-wider"
          >
            Description
          </label>
          <textarea
            id="edit-idea-description"
            name="description"
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${fieldClass} resize-none`}
            required
            disabled={submitting}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="edit-idea-tags"
            className="text-sm font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-2"
          >
            <Tag className="w-4 h-4 text-gray-500" aria-hidden />
            Tags
          </label>
          <input
            id="edit-idea-tags"
            name="tags"
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="saas, tools, ai (comma-separated)"
            className={fieldClass}
            disabled={submitting}
          />
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/80 px-4 py-3">
          <input
            id="edit-idea-featured"
            name="featured"
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            disabled={submitting}
          />
          <label
            htmlFor="edit-idea-featured"
            className="text-sm text-gray-700 cursor-pointer"
          >
            <span className="font-semibold text-gray-900">Featured</span>
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/ideas"
            className="flex-1 py-4 rounded-xl font-bold border-2 border-gray-200 text-gray-700 text-center hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <Pencil className="w-5 h-5" />
                Save changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
