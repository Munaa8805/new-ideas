import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function ProjectDetailsFallback({ variant }) {
  const message =
    variant === "notfound"
      ? "This project could not be found."
      : "Something went wrong loading this project.";

  return (
    <div className="space-y-6 py-8 pt-12 text-center max-w-md mx-auto">
      <p className="text-lg text-gray-600">{message}</p>
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:underline"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Projects
      </Link>
    </div>
  );
}
