import { Loader2 } from "lucide-react";

export default function LoadingState({ label, className = "py-16" }) {
  return (
    <div
      className={`flex items-center justify-center gap-2 text-gray-500 ${className}`.trim()}
    >
      <Loader2 className="w-6 h-6 animate-spin" aria-hidden />
      <span>{label}</span>
    </div>
  );
}
