import { useState, useEffect, useMemo } from "react";
import { Lightbulb, Filter } from "lucide-react";
import { IDEAS_API_URL } from "../constants/api";
import PageHeader from "../components/PageHeader";
import SearchField from "../components/SearchField";
import LoadingState from "../components/LoadingState";
import IdeaFeedCard from "../components/IdeaFeedCard";

export default function Ideas() {
  const [ideas, setIdeas] = useState([]);
  const [loadState, setLoadState] = useState("idle");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoadState("loading");
    fetch(IDEAS_API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        if (json?.success && Array.isArray(json.data)) {
          setIdeas(json.data);
          setLoadState("success");
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
  }, []);

  const filteredIdeas = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ideas;
    return ideas.filter((idea) => {
      const text = [
        idea.title,
        idea.description,
        idea.summary,
        ...(Array.isArray(idea.tags) ? idea.tags : []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return text.includes(q);
    });
  }, [ideas, query]);

  return (
    <div className="space-y-8 py-8 pt-12">
      <PageHeader
        icon={Lightbulb}
        title="Idea Feed"
        description="Explore and get inspired by the latest creative sparks."
        actions={
          <>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
            >
              Most Recent
            </button>
          </>
        }
      />

      <SearchField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search ideas by keyword or tag..."
      />

      {loadState === "loading" && <LoadingState label="Loading ideas…" />}

      {loadState === "error" && (
        <p className="text-center text-red-600 py-8">
          Could not load ideas. Please try again later.
        </p>
      )}

      {loadState === "success" && ideas.length === 0 && (
        <p className="text-center text-gray-500 py-8">No ideas yet.</p>
      )}

      {loadState === "success" &&
        ideas.length > 0 &&
        filteredIdeas.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No ideas match your search.
          </p>
        )}

      {loadState === "success" && filteredIdeas.length > 0 && (
        <div className="grid gap-6">
          {filteredIdeas.map((idea) => (
            <IdeaFeedCard key={idea._id} idea={idea} />
          ))}
        </div>
      )}
    </div>
  );
}
