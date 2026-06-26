type ActivityItem = {
  title: string;
  description: string;
  time: string;
  icon: string;
};

const activities: ActivityItem[] = [
  {
    title: "RSVP Received",
    description: "John Tan confirmed attendance.",
    time: "5 minutes ago",
    icon: "✉️",
  },
  {
    title: "Budget Updated",
    description: "Added RM 2,500 for Photography.",
    time: "30 minutes ago",
    icon: "💰",
  },
  {
    title: "Vendor Added",
    description: "Crystal Studio has been added.",
    time: "1 hour ago",
    icon: "🤝",
  },
  {
    title: "Task Completed",
    description: "Wedding invitation design approved.",
    time: "Today",
    icon: "✅",
  },
];

export function RecentActivity() {
  return (
    <section className="mt-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Recent Activity</h2>
        <p className="mt-1 text-sm text-slate-600">
          A quick view of recent planning updates.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={activity.title} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-lg">
                  {activity.icon}
                </div>
                {index < activities.length - 1 ? (
                  <div className="mt-2 h-full w-px bg-slate-200" />
                ) : null}
              </div>

              <div className="flex-1 pb-2">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-semibold text-slate-900">{activity.title}</h3>
                  <span className="text-sm text-slate-500">{activity.time}</span>
                </div>
                <p className="mt-1 text-sm text-slate-600">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
