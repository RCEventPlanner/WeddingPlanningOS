export function TaskSummary() {
  const totalTasks = 24;

  return (
    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Total Tasks</h2>
        <p className="mt-4 text-4xl font-semibold text-slate-900">{totalTasks}</p>
        <p className="mt-2 text-sm text-slate-500">Total tasks tracked for the wedding planning timeline.</p>
      </div>
    </section>
  );
}
