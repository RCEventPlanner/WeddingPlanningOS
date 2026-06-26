import { DashboardCard } from "../components/DashboardCard";
import { Sidebar } from "../components/Sidebar";
import { TopNav } from "../components/TopNav";
import { WeddingHeader } from "../components/WeddingHeader";

const dashboardCards = [
  {
    title: "Wedding Countdown",
    icon: "💍",
    value: "168 days left",
    subtitle: "Your big day is approaching",
    accentColor: "bg-rose-100 text-rose-600",
  },
  {
    title: "RSVP Summary",
    icon: "📨",
    value: "120 / 300 replied",
    subtitle: "Great response so far",
    accentColor: "bg-amber-100 text-amber-600",
  },
  {
    title: "Budget",
    icon: "💰",
    value: "RM 12,500 / RM 25,000",
    subtitle: "You are halfway there",
    accentColor: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Vendors",
    icon: "🤝",
    value: "8 / 15 confirmed",
    subtitle: "Only a few left to book",
    accentColor: "bg-sky-100 text-sky-600",
  },
  {
    title: "Tasks",
    icon: "✅",
    value: "4 tasks due this week",
    subtitle: "Stay on top of your plan",
    accentColor: "bg-violet-100 text-violet-600",
  },
  {
    title: "Timeline",
    icon: "🕒",
    value: "3 events planned",
    subtitle: "A calm and organized day",
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
      </main>
    </div>
  );
}