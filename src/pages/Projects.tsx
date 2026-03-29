import { LayoutDashboard, MoreVertical, Plus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_PROJECTS = [
  { id: 1, title: "E-commerce Platform", status: "In Progress", progress: 65, color: "bg-indigo-600" },
  { id: 2, title: "Mobile Fitness App", status: "Planning", progress: 15, color: "bg-amber-500" },
  { id: 3, title: "AI Content Generator", status: "Completed", progress: 100, color: "bg-emerald-500" },
  { id: 4, title: "Portfolio Website", status: "In Progress", progress: 40, color: "bg-indigo-600" },
];

export default function Projects() {
  return (
    <div className="space-y-8 py-8 pt-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <LayoutDashboard className="w-8 h-8 text-indigo-600" />
            My Projects
          </h1>
          <p className="text-gray-500">Manage and track your ongoing ventures.</p>
        </div>
        <Link to="/new-idea" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all flex items-center gap-2 self-start shadow-lg shadow-indigo-100">
          <Plus className="w-5 h-5" />
          New Project
        </Link>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search projects..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-white"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_PROJECTS.map((project) => (
          <Link 
            key={project.id} 
            to={`/projects/${project.id}`}
            className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-all group block"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                project.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 
                project.status === 'Planning' ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'
              }`}>
                {project.status}
              </div>
              <button className="text-gray-400 hover:text-gray-600 p-1" onClick={(e) => e.preventDefault()}>
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-6 group-hover:text-indigo-600 transition-colors">
              {project.title}
            </h3>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="text-gray-500">Progress</span>
                <span className="text-gray-900">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                  className={`${project.color} h-full transition-all duration-500`} 
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
