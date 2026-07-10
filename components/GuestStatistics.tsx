type StatCard = {
  title: string;
  value: string;
};

type GuestStatisticsProps = {
  totalGuests?: number;
  confirmedGuests?: number;
  pendingGuests?: number;
};

export function GuestStatistics({
  totalGuests = 320,
  confirmedGuests = 185,
  pendingGuests = 95,
}: GuestStatisticsProps) {
  const stats: StatCard[] = [
    { title: "Total Guests", value: String(totalGuests) },
    { title: "Confirmed", value: String(confirmedGuests) },
    { title: "Pending", value: String(pendingGuests) },
  ];
  return (
    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Guest Statistics</h2>
        <p className="mt-1 text-sm text-slate-600">
          A quick overview of guest list progress.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 shadow-sm transition hover:shadow-md"
          >
            <p className="text-sm font-medium text-slate-600">{stat.title}</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
