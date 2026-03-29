import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { API_BASE } from "../constants/api";
import LoadingState from "../components/LoadingState";
import ProjectDetailsFallback from "../components/ProjectDetailsFallback";
import ProjectDetailsHeader from "../components/ProjectDetailsHeader";
import ProjectOverviewStats from "../components/ProjectOverviewStats";
import ProjectHeroImage from "../components/ProjectHeroImage";
import ProjectDescriptionPanel from "../components/ProjectDescriptionPanel";
import ProjectDetailSidebar from "../components/ProjectDetailSidebar";

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loadState, setLoadState] = useState("idle");

  useEffect(() => {
    if (!id) {
      setLoadState("error");
      return;
    }
    let cancelled = false;
    setLoadState("loading");
    fetch(`${API_BASE}/projects/${encodeURIComponent(id)}`)
      .then((res) => {
        if (res.status === 404) return null;
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        if (json?.success && json.data) {
          setProject(json.data);
          setLoadState("success");
        } else if (json === null) {
          setProject(null);
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
  }, [id]);

  if (loadState === "loading") {
    return (
      <LoadingState
        label="Loading project…"
        className="py-24"
      />
    );
  }

  if (loadState === "notfound" || loadState === "error" || !project) {
    return (
      <ProjectDetailsFallback
        variant={loadState === "notfound" ? "notfound" : "error"}
      />
    );
  }

  return (
    <div className="space-y-8 py-8 pt-12">
      <ProjectDetailsHeader project={project} />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ProjectOverviewStats project={project} />
          <ProjectHeroImage project={project} />
          <ProjectDescriptionPanel project={project} />
        </div>
        <ProjectDetailSidebar />
      </div>
    </div>
  );
}
