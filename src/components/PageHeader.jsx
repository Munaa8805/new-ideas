export default function PageHeader({
  icon: Icon,
  title,
  description,
  actions,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          {Icon ? <Icon className="w-8 h-8 text-indigo-600 shrink-0" /> : null}
          {title}
        </h1>
        {description ? (
          <p className="text-gray-500">{description}</p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex flex-wrap gap-2 shrink-0 md:justify-end">
          {actions}
        </div>
      ) : null}
    </div>
  );
}
