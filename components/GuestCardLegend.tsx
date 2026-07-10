type GuestCardLegendItem = {
  label: string;
  colorClassName: string;
};

const legendItems: GuestCardLegendItem[] = [
  {
    label: "Adult - Normal Meal",
    colorClassName: "border-slate-200 bg-slate-100 text-slate-800",
  },
  {
    label: "Adult - Vegetarian Meal",
    colorClassName: "border-cyan-200 bg-cyan-100 text-cyan-800",
  },
  {
    label: "Adult - Halal Meal",
    colorClassName: "border-blue-200 bg-blue-100 text-blue-800",
  },
  {
    label: "Child - Normal Meal",
    colorClassName: "border-pink-200 bg-pink-100 text-pink-800",
  },
];

type GuestCardLegendProps = {
  className?: string;
};

export function GuestCardLegend({ className = "" }: GuestCardLegendProps) {
  return (
    <div className={className}>
      <div>
        <h3 className="text-sm font-semibold text-slate-900">Guest Card Legend</h3>
        <p className="mt-1 text-xs text-slate-600">Each Guest Card represents one individual seat assignment.</p>
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:flex xl:flex-wrap">
        {legendItems.map((item) => (
          <div key={item.label} className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700">
            <span className={`inline-flex h-4 w-4 rounded-full border ${item.colorClassName}`} aria-hidden="true" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}