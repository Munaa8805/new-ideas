import { ArrowRight, Lightbulb, Rocket, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import BannerCarousel from '../components/BannerCarousel';

export default function Home() {
  return (
    <div className="space-y-23 pb-12">
      <BannerCarousel />
      
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
          Capture your <span className="text-indigo-600">brilliant</span> ideas.
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          IdeaHub is the simplest way to manage your creative sparks, track project progress, and turn thoughts into reality.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link to="/register" className="bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-200">
            Get Started Free <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/projects" className="bg-white border border-gray-200 text-gray-700 px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-all">
            View Projects
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Quick Capture",
            desc: "Instantly jot down ideas before they fade away. Simple, fast, and intuitive.",
            icon: Lightbulb,
            color: "bg-amber-100 text-amber-600"
          },
          {
            title: "Project Tracking",
            desc: "Organize your ideas into actionable projects with clear milestones and progress.",
            icon: Rocket,
            color: "bg-indigo-100 text-indigo-600"
          },
          {
            title: "Secure Storage",
            desc: "Your ideas are private and encrypted. Only you have access to your creative vault.",
            icon: Shield,
            color: "bg-emerald-100 text-emerald-600"
          }
        ].map((feature, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className={`${feature.color} w-12 h-12 rounded-2xl flex items-center justify-center`}>
              <feature.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </section>

      <section className="bg-indigo-600 rounded-[3rem] p-12 text-white text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold">Ready to start building?</h2>
        <p className="text-indigo-100 text-lg max-w-2xl mx-auto">
          Join thousands of creators who use IdeaHub to organize their workflow and bring their visions to life.
        </p>
        <Link to="/register" className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-full font-bold hover:bg-indigo-50 transition-colors">
          Create Your Account
        </Link>
      </section>
    </div>
  );
}
