type StatCard = {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
};

const stats: StatCard[] = [
  { title: "Total Guests", value: "320", subtitle: "All invited guests", icon: "👥" },
  { title: "Confirmed", value: "185", subtitle: "Guests confirmed", icon: "✅" },
  { title: "Pending", value: "95", subtitle: "Awaiting response", icon: "⏳" },
  { title: "Declined", value: "40", subtitle: "Guests declined", icon: "✕" },
  { title: "Adults", value: "260", subtitle: "Adult guests", icon: "🧑" },
  { title: "Children", value: "60", subtitle: "Children guests", icon: "🧒" },
];

export function GuestStatistics() {
  return (
    <section className="mt-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Guest Statistics</h2>
        <p className="mt-1 text-sm text-slate-600">
          A quick view of guest attendance and planning summary.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{stat.value}</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-xl">
                {stat.icon}
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-600">{stat.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
