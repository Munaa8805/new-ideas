import { MessageSquare, Users } from "lucide-react";

export default function ProjectDetailSidebar() {
  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Users className="w-6 h-6 text-indigo-600" />
          Team
        </h3>
        <p className="text-sm text-gray-500">
          This project doesn&apos;t list collaborators yet. Team features may be
          added when the API supports them.
        </p>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-indigo-600" />
          Activity
        </h3>
        <p className="text-sm text-gray-500">
          No recent activity to show. Check back after updates are synced.
        </p>
      </div>
    </div>
  );
}
