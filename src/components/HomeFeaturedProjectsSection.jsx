import { useState, useEffect } from "react";
import { FEATURED_PROJECTS_URL } from "../constants/api";
import SectionHeading from "./SectionHeading";
import LoadingState from "./LoadingState";
import FeaturedProjectCard from "./FeaturedProjectCard";

export default function HomeFeaturedProjectsSection() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loadState, setLoadState] = useState("idle");

  useEffect(() => {
    let cancelled = false;
    setLoadState("loading");
    fetch(FEATURED_PROJECTS_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        if (json?.success && Array.isArray(json.data)) {
          setFeaturedProjects(json.data);
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
    <section className="bg-gray-50 rounded-3xl p-8 md:p-12 space-y-8">
      <SectionHeading
        title="Featured projects"
        description="Highlights from the community—real builds worth exploring."
      />

      {loadState === "loading" && (
        <LoadingState label="Loading projects…" />
      )}

      {loadState === "error" && (
        <p className="text-center text-red-600 py-8">
          Could not load featured projects. Please try again later.
        </p>
      )}

      {loadState === "success" && featuredProjects.length === 0 && (
        <p className="text-center text-gray-500 py-8">No featured projects yet.</p>
      )}

      {loadState === "success" && featuredProjects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProjects.map((project) => (
            <FeaturedProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
