import { FormEvent, useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

export default function NewIdea() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert('Idea captured! (Mock action)');
    setTitle('');
    setDescription('');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-8 pt-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-indigo-600" />
          Capture New Idea
        </h1>
        <p className="text-gray-500">Don't let that spark fade away. Jot it down now.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Idea Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's the big idea?"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Description
          </label>
          <textarea
            id="description"
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us more about it..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100"
        >
          <Send className="w-5 h-5" />
          Save Idea
        </button>
      </form>
    </div>
  );
}
