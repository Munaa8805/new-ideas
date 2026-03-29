export default function ProjectHeroImage({ project }) {
  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
      <div className="aspect-21/9 md:aspect-24/9 bg-gray-100 relative">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
}
