import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  LayoutDashboard, 
  MessageSquare, 
  MoreVertical, 
  Plus, 
  Settings, 
  Users 
} from 'lucide-react';

const MOCK_PROJECT = {
  id: 1,
  title: "E-commerce Platform",
  description: "A full-featured online store with real-time inventory tracking, secure payments, and an intuitive admin dashboard for small to medium businesses.",
  status: "In Progress",
  progress: 65,
  startDate: "Jan 12, 2026",
  deadline: "May 20, 2026",
  category: "Web Development",
  team: [
    { name: "John Doe", role: "Lead Developer", avatar: "https://picsum.photos/seed/john/100/100" },
    { name: "Jane Smith", role: "UI/UX Designer", avatar: "https://picsum.photos/seed/jane/100/100" },
    { name: "Mike Ross", role: "Backend Engineer", avatar: "https://picsum.photos/seed/mike/100/100" },
  ],
  tasks: [
    { id: 1, title: "Design system implementation", status: "Completed", assignee: "Jane Smith" },
    { id: 2, title: "Payment gateway integration", status: "In Progress", assignee: "Mike Ross" },
    { id: 3, title: "Product catalog API", status: "Completed", assignee: "John Doe" },
    { id: 4, title: "User authentication flow", status: "Pending", assignee: "John Doe" },
  ]
};

export default function ProjectDetails() {
  const { id } = useParams();

  return (
    <div className="space-y-8 py-8 pt-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-4">
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-extrabold text-gray-900">{MOCK_PROJECT.title}</h1>
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
                {MOCK_PROJECT.status}
              </span>
            </div>
            <p className="text-lg text-gray-500 max-w-2xl">{MOCK_PROJECT.description}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-3 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100">
            <Plus className="w-5 h-5" />
            Add Task
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progress Card */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                Project Progress
              </h3>
              <span className="text-2xl font-black text-indigo-600">{MOCK_PROJECT.progress}%</span>
            </div>
            <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-600 h-full transition-all duration-1000" 
                style={{ width: `${MOCK_PROJECT.progress}%` }}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              {[
                { label: "Start Date", value: MOCK_PROJECT.startDate, icon: Calendar },
                { label: "Deadline", value: MOCK_PROJECT.deadline, icon: Clock },
                { label: "Category", value: MOCK_PROJECT.category, icon: LayoutDashboard },
                { label: "Team Size", value: `${MOCK_PROJECT.team.length} Members`, icon: Users },
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <stat.icon className="w-3 h-3" />
                    {stat.label}
                  </div>
                  <div className="text-sm font-bold text-gray-900">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tasks List */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Active Tasks</h3>
              <button className="text-sm font-bold text-indigo-600 hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              {MOCK_PROJECT.tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 rounded-2xl border border-gray-50 hover:bg-gray-50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      task.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' : 
                      task.status === 'In Progress' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{task.title}</h4>
                      <p className="text-xs text-gray-500">Assigned to {task.assignee}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      task.status === 'Completed' ? 'text-emerald-600' : 
                      task.status === 'In Progress' ? 'text-indigo-600' : 'text-gray-400'
                    }`}>
                      {task.status}
                    </span>
                    <button className="text-gray-300 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Team Card */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-6 h-6 text-indigo-600" />
              Team Members
            </h3>
            <div className="space-y-4">
              {MOCK_PROJECT.team.map((member, i) => (
                <div key={i} className="flex items-center gap-4">
                  <img 
                    src={member.avatar} 
                    alt={member.name} 
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{member.name}</h4>
                    <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                </div>
              ))}
              <button className="w-full py-3 rounded-xl border-2 border-dashed border-gray-200 text-gray-400 font-bold text-sm hover:border-indigo-300 hover:text-indigo-500 transition-all flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Invite Member
              </button>
            </div>
          </div>

          {/* Activity Card */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-indigo-600" />
              Recent Activity
            </h3>
            <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
              {[
                { user: "John Doe", action: "completed task", target: "Product catalog API", time: "2h ago" },
                { user: "Jane Smith", action: "uploaded", target: "Design assets", time: "5h ago" },
                { user: "Mike Ross", action: "commented on", target: "Payment flow", time: "1d ago" },
              ].map((activity, i) => (
                <div key={i} className="relative pl-8">
                  <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-white border-4 border-indigo-600 shadow-sm" />
                  <div className="text-sm">
                    <span className="font-bold text-gray-900">{activity.user}</span>
                    <span className="text-gray-500 mx-1">{activity.action}</span>
                    <span className="font-medium text-indigo-600">{activity.target}</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{activity.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
