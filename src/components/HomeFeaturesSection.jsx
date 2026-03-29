import { Lightbulb, Rocket, Shield } from "lucide-react";

const FEATURES = [
  {
    title: "Quick Capture",
    desc: "Instantly jot down ideas before they fade away. Simple, fast, and intuitive.",
    icon: Lightbulb,
    color: "bg-amber-100 text-amber-600",
  },
  {
    title: "Project Tracking",
    desc: "Organize your ideas into actionable projects with clear milestones and progress.",
    icon: Rocket,
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    title: "Secure Storage",
    desc: "Your ideas are private and encrypted. Only you have access to your creative vault.",
    icon: Shield,
    color: "bg-emerald-100 text-emerald-600",
  },
];

export default function HomeFeaturesSection() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {FEATURES.map((feature, i) => (
        <div
          key={i}
          className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow space-y-4"
        >
          <div
            className={`${feature.color} w-12 h-12 rounded-2xl flex items-center justify-center`}
          >
            <feature.icon className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
          <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
        </div>
      ))}
    </section>
  );
}
