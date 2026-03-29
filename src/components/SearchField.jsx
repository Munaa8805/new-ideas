import { Search } from "lucide-react";

export default function SearchField({
  value,
  onChange,
  placeholder,
  id,
  className = "",
}) {
  return (
    <div className={`relative ${className}`.trim()}>
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
        aria-hidden
      />
      <input
        id={id}
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-white"
      />
    </div>
  );
}
