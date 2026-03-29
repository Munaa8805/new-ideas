import { Lightbulb, Search, Filter, Calendar, MessageSquare, Heart } from 'lucide-react';

const MOCK_IDEAS = [
  {
    id: 1,
    title: "Eco-friendly Packaging Solution",
    description: "A biodegradable alternative to plastic bubble wrap using mushroom-based materials.",
    category: "Sustainability",
    date: "2 hours ago",
    likes: 24,
    comments: 5,
    tags: ["GreenTech", "Innovation"]
  },
  {
    id: 2,
    title: "Local Farmer Marketplace",
    description: "Connect local farmers directly with urban consumers through a subscription-based delivery app.",
    category: "AgriTech",
    date: "5 hours ago",
    likes: 18,
    comments: 12,
    tags: ["Marketplace", "Local"]
  },
  {
    id: 3,
    title: "AI-Powered Study Assistant",
    description: "A browser extension that summarizes long research papers and generates flashcards automatically.",
    category: "EdTech",
    date: "1 day ago",
    likes: 56,
    comments: 21,
    tags: ["AI", "Education"]
  },
  {
    id: 4,
    title: "Virtual Reality Meditation",
    description: "Immersive VR environments designed to help people achieve deep relaxation in high-stress workplaces.",
    category: "Health",
    date: "2 days ago",
    likes: 32,
    comments: 8,
    tags: ["VR", "Wellness"]
  }
];

export default function Ideas() {
  return (
    <div className="space-y-8 py-8 pt-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Lightbulb className="w-8 h-8 text-indigo-600" />
            Idea Feed
          </h1>
          <p className="text-gray-500">Explore and get inspired by the latest creative sparks.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
            Most Recent
          </button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search ideas by keyword or tag..."
          className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all bg-white"
        />
      </div>

      <div className="grid gap-6">
        {MOCK_IDEAS.map((idea) => (
          <div key={idea.id} className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider">
                    {idea.category}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    {idea.date}
                  </span>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {idea.title}
                </h2>
                
                <p className="text-gray-600 leading-relaxed text-lg">
                  {idea.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {idea.tags.map(tag => (
                    <span key={tag} className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex md:flex-col justify-between md:justify-center items-center gap-4 md:border-l md:border-gray-100 md:pl-8">
                <button className="flex items-center gap-2 text-gray-500 hover:text-rose-500 transition-colors group/btn">
                  <div className="p-2 rounded-full group-hover/btn:bg-rose-50 transition-colors">
                    <Heart className="w-6 h-6" />
                  </div>
                  <span className="font-bold">{idea.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors group/btn">
                  <div className="p-2 rounded-full group-hover/btn:bg-indigo-50 transition-colors">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <span className="font-bold">{idea.comments}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
