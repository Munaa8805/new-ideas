import { useState, useEffect, useMemo, useCallback } from "react";
import { LayoutDashboard, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { PROJECTS_API_URL } from "../constants/api";
import PageHeader from "../components/PageHeader";
import SearchField from "../components/SearchField";
import LoadingState from "../components/LoadingState";
import ProjectGridCard from "../components/ProjectGridCard";
import ProjectsLoadMoreButton from "../components/ProjectsLoadMoreButton";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loadState, setLoadState] = useState("idle");
  const [loadingMore, setLoadingMore] = useState(false);
  const [query, setQuery] = useState("");

  const loadPage = useCallback(async (page, append) => {
    const url =
      page > 1 ? `${PROJECTS_API_URL}?page=${page}` : PROJECTS_API_URL;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Request failed");
    const json = await res.json();
    if (!json?.success || !Array.isArray(json.data)) {
      throw new Error("Invalid payload");
    }
    setProjects((prev) => (append ? [...prev, ...json.data] : json.data));
    setPagination(json.pagination ?? null);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoadState("loading");
    loadPage(1, false)
      .then(() => {
        if (!cancelled) setLoadState("success");
      })
      .catch(() => {
        if (!cancelled) setLoadState("error");
      });
    return () => {
      cancelled = true;
    };
  }, [loadPage]);

  const handleLoadMore = () => {
    if (!pagination?.hasMore || !pagination?.nextPage || loadingMore) return;
    setLoadingMore(true);
    loadPage(pagination.nextPage, true)
      .catch(() => {})
      .finally(() => setLoadingMore(false));
  };

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter((p) => {
      const text = [p.title, p.description, p.category, p.documentId]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return text.includes(q);
    });
  }, [projects, query]);

  const remaining =
    pagination?.total != null
      ? Math.max(0, pagination.total - projects.length)
      : 0;

  return (
    <div className="space-y-8 py-8 pt-12">
      <PageHeader
        icon={LayoutDashboard}
        title="My Projects"
        description="Manage and track your ongoing ventures."
        actions={
          <Link
            to="/new-idea"
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100"
          >
            <Plus className="w-5 h-5" />
            New Project
          </Link>
        }
      />

      <SearchField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search projects..."
      />

      {loadState === "loading" && <LoadingState label="Loading projects…" />}

      {loadState === "error" && (
        <p className="text-center text-red-600 py-8">
          Could not load projects. Please try again later.
        </p>
      )}

      {loadState === "success" && projects.length === 0 && (
        <p className="text-center text-gray-500 py-8">No projects yet.</p>
      )}

      {loadState === "success" &&
        projects.length > 0 &&
        filteredProjects.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No projects match your search.
          </p>
        )}

      {loadState === "success" && filteredProjects.length > 0 && (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectGridCard key={project._id} project={project} />
            ))}
          </div>

          {pagination?.hasMore && (
            <ProjectsLoadMoreButton
              onClick={handleLoadMore}
              disabled={loadingMore}
              loading={loadingMore}
              remaining={remaining}
            />
          )}
        </>
      )}
    </div>
  );
}
