const priorityOptions = ["All", "High", "Medium", "Low", "Urgent"];
const statusOptions = ["All", "Not Started", "In Progress", "Waiting", "Completed", "Cancelled"];

export type TaskFilters = {
  priority: string;
  status: string;
};

type TaskFilterProps = {
  filters: TaskFilters;
  onChange: (nextFilters: TaskFilters) => void;
};

export function TaskFilter({ filters, onChange }: TaskFilterProps) {
  const updateFilter = (field: keyof TaskFilters, value: string) => {
    onChange({ ...filters, [field]: value });
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Advanced Filters</h2>
        <p className="mt-1 text-sm text-slate-600">
          Refine task listing results by priority and status.
        </p>
      </div>

      <div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Priority</label>
            <select
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
              value={filters.priority}
              onChange={(event) => updateFilter("priority", event.target.value)}
            >
              {priorityOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Status</label>
            <select
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
              value={filters.status}
              onChange={(event) => updateFilter("status", event.target.value)}
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
