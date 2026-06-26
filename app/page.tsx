import { Sidebar } from "../components/Sidebar";
import { TopNav } from "../components/TopNav";

const dashboardCards = [
  {
    title: "Wedding Countdown",
    icon: "💍",
    value: "168 days left",
    note: "Your big day is approaching",
  },
  {
    title: "RSVP Summary",
    icon: "📨",
    value: "120 / 300 replied",
    note: "Great response so far",
  },
  {
    title: "Budget Progress",
    icon: "💰",
    value: "RM 12,500 / RM 25,000",
    note: "You are halfway there",
  },
  {
    title: "Vendor Progress",
    icon: "🤝",
    value: "8 / 15 confirmed",
    note: "Only a few left to book",
  },
  {
    title: "Upcoming Tasks",
    icon: "✅",
    value: "4 tasks due this week",
    note: "Stay on top of your plan",
  },
  {
    title: "Today's Timeline",
    icon: "🕒",
    value: "3 events planned",
    note: "A calm and organized day",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-8 lg:ml-72 lg:p-10">
        <TopNav title="Dashboard" />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {dashboardCards.map((card) => (
            <div
              key={card.title}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{card.title}</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {card.value}
                  </p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-xl">
                  {card.icon}
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-600">{card.note}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}