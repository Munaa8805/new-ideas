import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomeHeroSection() {
  return (
    <section className="text-center space-y-6 max-w-3xl mx-auto">
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
        Capture your <span className="text-indigo-600">brilliant</span> ideas.
      </h1>
      <p className="text-xl text-gray-600 leading-relaxed">
        IdeaHub is the simplest way to manage your creative sparks, track project
        progress, and turn thoughts into reality.
      </p>
      <div className="flex justify-center gap-4 pt-4 flex-wrap">
        <Link
          to="/register"
          className="bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-200"
        >
          Get Started Free <ArrowRight className="w-5 h-5" />
        </Link>
        <Link
          to="/projects"
          className="bg-white border border-gray-200 text-gray-700 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-all"
        >
          View Projects
        </Link>
      </div>
    </section>
  );
}
