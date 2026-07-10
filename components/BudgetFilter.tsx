const categoryOptions = [
  "All",
  "Venue",
  "Catering",
  "Photography",
  "Decoration",
];

const paymentStatusOptions = [
  "All",
  "Pending",
  "Deposit Paid",
  "Partially Paid",
  "Fully Paid",
  "Overdue",
];

export type BudgetAdvancedFilters = {
  category: string;
  paymentStatus: string;
};

type BudgetFilterProps = {
  filters: BudgetAdvancedFilters;
  onChange: (nextFilters: BudgetAdvancedFilters) => void;
};

export function BudgetFilter({ filters, onChange }: BudgetFilterProps) {
  const updateFilter = (field: keyof BudgetAdvancedFilters, value: string) => {
    onChange({ ...filters, [field]: value });
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Advanced Filters</h2>
        <p className="mt-1 text-sm text-slate-600">
          Refine expense listing results with filters beyond the main header search.
        </p>
      </div>

      <div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Category</label>
            <select
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
              value={filters.category}
              onChange={(event) => updateFilter("category", event.target.value)}
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Payment Status</label>
            <select
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
              value={filters.paymentStatus}
              onChange={(event) => updateFilter("paymentStatus", event.target.value)}
            >
              {paymentStatusOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
