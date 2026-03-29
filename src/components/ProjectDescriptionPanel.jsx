export default function ProjectDescriptionPanel({ project }) {
  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Details</h3>
      </div>
      <p className="text-gray-600 leading-relaxed">{project.description}</p>
      <p className="text-sm text-gray-400">
        Internal ID:{" "}
        <code className="text-gray-600 bg-gray-50 px-2 py-0.5 rounded">
          {project._id}
        </code>
      </p>
    </div>
  );
}
