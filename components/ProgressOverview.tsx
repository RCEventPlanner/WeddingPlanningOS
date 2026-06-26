type ProgressItem = {
  title: string;
  percentage: string;
  description: string;
  accentColor: string;
};

const progressItems: ProgressItem[] = [
  {
    title: "Wedding Planning",
    percentage: "72%",
    description: "Overall wedding preparation progress.",
    accentColor: "bg-rose-500",
  },
  {
    title: "Budget Usage",
    percentage: "48%",
    description: "RM 12,000 of RM 25,000 used.",
    accentColor: "bg-emerald-500",
  },
  {
    title: "RSVP Completion",
    percentage: "41%",
    description: "123 of 300 guests have replied.",
    accentColor: "bg-sky-500",
  },
];

export function ProgressOverview() {
  return (
    <section className="mt-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Progress Overview</h2>
        <p className="mt-1 text-sm text-slate-600">
          Track how your big day planning is coming along.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {progressItems.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
              <span className="text-sm font-semibold text-slate-700">
                {item.percentage}
              </span>
            </div>

            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-2.5 rounded-full transition-all duration-500 ${item.accentColor}`}
                style={{ width: item.percentage }}
              />
            </div>

            <p className="mt-4 text-sm text-slate-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
