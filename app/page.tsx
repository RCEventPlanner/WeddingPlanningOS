import { DashboardCard } from "../components/DashboardCard";
import { QuickActions } from "../components/QuickActions";
import { RecentActivity } from "../components/RecentActivity";
import { Sidebar } from "../components/Sidebar";
import { TopNav } from "../components/TopNav";
import { WeddingHeader } from "../components/WeddingHeader";

const dashboardCards = [
  {
    title: "Guests",
    icon: "👥",
    value: "284 / 300 guests",
    subtitle: "72% have replied",
    accentColor: "bg-rose-100 text-rose-600",
  },
  {
    title: "RSVP Progress",
    icon: "📨",
    value: "72% replied",
    subtitle: "Guest attendance is progressing well",
    accentColor: "bg-amber-100 text-amber-600",
  },
  {
    title: "Budget Summary",
    icon: "💰",
    value: "RM 18,200 / RM 25,000",
    subtitle: "72.8% of overall budget used",
    accentColor: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Vendors",
    icon: "🤝",
    value: "12 confirmed",
    subtitle: "3 pending confirmations",
    accentColor: "bg-sky-100 text-sky-600",
  },
  {
    title: "Tasks",
    icon: "✅",
    value: "5 due this week",
    subtitle: "Planning workload snapshot",
    accentColor: "bg-violet-100 text-violet-600",
  },
  {
    title: "Today's Events",
    icon: "🕒",
    value: "3 events",
    subtitle: "Planned wedding-day activities",
    accentColor: "bg-orange-100 text-orange-600",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-8 lg:ml-72 lg:p-10">
        <TopNav title="Dashboard" />
        <WeddingHeader />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {dashboardCards.map((card) => (
            <DashboardCard
              key={card.title}
              title={card.title}
              value={card.value}
              subtitle={card.subtitle}
              icon={card.icon}
              accentColor={card.accentColor}
            />
          ))}
        </div>

        <section className="mt-6 grid gap-4 xl:grid-cols-[1.6fr_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4">
              <p className="text-sm font-medium text-slate-500">Upcoming Tasks</p>
              <h2 className="text-xl font-semibold text-slate-900">Priority Items</h2>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl border border-slate-200 px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-slate-900">Finalize MC script</span>
                  <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">
                    Due Today
                  </span>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-slate-900">Confirm photographer timing</span>
                  <span className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold text-sky-700">
                    Tomorrow
                  </span>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-slate-900">Review seating plan</span>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    Friday
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <QuickActions />
        <RecentActivity />
      </main>
    </div>
  );
}