import { useState, useEffect } from "react";
import { FEATURED_IDEAS_URL } from "../constants/api";
import SectionHeading from "./SectionHeading";
import LoadingState from "./LoadingState";
import FeaturedIdeaCard from "./FeaturedIdeaCard";

export default function HomeFeaturedIdeasSection() {
  const [featuredIdeas, setFeaturedIdeas] = useState([]);
  const [loadState, setLoadState] = useState("idle");

  useEffect(() => {
    let cancelled = false;
    setLoadState("loading");
    fetch(FEATURED_IDEAS_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        if (json?.success && Array.isArray(json.data)) {
          setFeaturedIdeas(json.data);
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

  return (
    <section className="space-y-8">
      <SectionHeading
        title="Latest ideas"
        description="Featured sparks from the community—short reads, big possibilities."
      />

      {loadState === "loading" && <LoadingState label="Loading ideas…" />}

      {loadState === "error" && (
        <p className="text-center text-red-600 py-8">
          Could not load featured ideas. Please try again later.
        </p>
      )}

      {loadState === "success" && featuredIdeas.length === 0 && (
        <p className="text-center text-gray-500 py-8">No featured ideas yet.</p>
      )}

      {loadState === "success" && featuredIdeas.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredIdeas.map((idea) => (
            <FeaturedIdeaCard key={idea._id} idea={idea} />
          ))}
        </div>
      )}
    </section>
  );
}
