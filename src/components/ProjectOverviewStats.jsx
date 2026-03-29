import { Calendar, CheckCircle2, Clock, Hash, LayoutDashboard } from "lucide-react";
import { formatShortDateOrDash } from "../utils/formatDate";

export default function ProjectOverviewStats({ project }) {
  const stats = [
    {
      label: "Launch date",
      value: formatShortDateOrDash(project.date),
      icon: Calendar,
    },
    {
      label: "Added",
      value: formatShortDateOrDash(project.createdAt),
      icon: Clock,
    },
    {
      label: "Category",
      value: project.category,
      icon: LayoutDashboard,
    },
    {
      label: "Document ID",
      value: project.documentId || "—",
      icon: Hash,
    },
  ];

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-indigo-600" />
          Overview
        </h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
        {stats.map((stat, i) => (
          <div key={i} className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
              <stat.icon className="w-3 h-3" />
              {stat.label}
            </div>
            <div className="text-sm font-bold text-gray-900 break-all">{stat.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
