type QuickAction = {
  title: string;
  description: string;
  icon: string;
};

const actions: QuickAction[] = [
  { title: "Add Guest", description: "Create a new guest", icon: "👤" },
  { title: "Add Task", description: "Create a wedding task", icon: "✅" },
  { title: "Add Expense", description: "Record a new expense", icon: "💳" },
  { title: "Add Vendor", description: "Add a wedding vendor", icon: "🏢" },
];

export function QuickActions() {
  return (
    <section className="mt-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Quick Actions</h2>
        <p className="mt-1 text-sm text-slate-600">
          Jump into the most common planning tasks.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {actions.map((action) => (
          <div
            key={action.title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-xl">
                {action.icon}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{action.title}</h3>
                <p className="text-sm text-slate-600">{action.description}</p>
              </div>
            </div>

            <button className="mt-4 rounded-full border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-rose-200 hover:text-rose-600">
              Coming Soon
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
