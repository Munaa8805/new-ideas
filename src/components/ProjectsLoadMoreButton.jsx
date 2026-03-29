import { Loader2 } from "lucide-react";

export default function ProjectsLoadMoreButton({
  onClick,
  disabled,
  loading,
  remaining,
}) {
  return (
    <div className="flex justify-center pt-4">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="px-6 py-3 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60 flex items-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Loading…
          </>
        ) : (
          `Load more (${remaining} left)`
        )}
      </button>
    </div>
  );
}
