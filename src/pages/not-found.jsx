import { Link } from "react-router-dom";
import { Home, Lightbulb, SearchX, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="relative w-full max-w-lg text-center">
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-400/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 right-0 h-48 w-48 rounded-full bg-purple-400/15 blur-3xl"
          aria-hidden
        />

        <div className="relative inline-flex items-center justify-center rounded-3xl bg-white p-5 shadow-lg shadow-indigo-100/80 ring-1 ring-gray-100 mb-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-inner">
            <SearchX className="h-10 w-10" strokeWidth={1.75} />
          </div>
        </div>

        <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600 mb-3">
          Error 404
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
          This page wandered off
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed mb-10 max-w-md mx-auto">
          The URL might be mistyped, or the page may have moved. Head back and
          keep building your next big idea.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-indigo-200/80 hover:bg-indigo-700 transition-colors"
          >
            <Home className="h-5 w-5 shrink-0" />
            Back to home
            <ArrowRight className="h-4 w-4 shrink-0 opacity-90" />
          </Link>
          <Link
            to="/ideas"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-gray-200 bg-white px-8 py-4 text-base font-semibold text-gray-800 hover:border-indigo-200 hover:bg-indigo-50/50 transition-colors"
          >
            <Lightbulb className="h-5 w-5 text-indigo-600 shrink-0" />
            Browse ideas
          </Link>
        </div>
      </div>
    </div>
  );
}
