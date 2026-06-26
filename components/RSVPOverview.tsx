type OverviewCard = {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
};

const overviewCards: OverviewCard[] = [
  { title: "Total Invitations", value: "320", subtitle: "Invitations sent", icon: "📩" },
  { title: "Pending Responses", value: "95", subtitle: "Awaiting replies", icon: "⏳" },
  { title: "Confirmed", value: "185", subtitle: "Confirmed guests", icon: "✅" },
  { title: "Declined", value: "40", subtitle: "Declined guests", icon: "✕" },
];

export function RSVPOverview() {
  return (
    <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {overviewCards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-500">{card.title}</p>
              <p className="mt-2 text-2xl font-semibold text-slate-900">{card.value}</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-xl">
              {card.icon}
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-600">{card.subtitle}</p>
        </div>
      ))}
    </section>
  );
}
