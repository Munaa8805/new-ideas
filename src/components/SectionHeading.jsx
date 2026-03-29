export default function SectionHeading({ title, description, className = "" }) {
  return (
    <div className={`space-y-2 max-w-2xl ${className}`.trim()}>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
      {description ? (
        <p className="text-gray-600">{description}</p>
      ) : null}
    </div>
  );
}
