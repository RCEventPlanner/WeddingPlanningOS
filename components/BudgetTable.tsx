type BudgetTableRow = {
  expense: string;
  category: string;
  vendor: string;
  budgeted: string;
  actual: string;
  status: "Paid" | "Pending" | "Over Budget";
};

const rows: BudgetTableRow[] = [
  {
    expense: "Venue Deposit",
    category: "Venue",
    vendor: "The Garden Hall",
    budgeted: "RM 25,000",
    actual: "RM 25,000",
    status: "Paid",
  },
  {
    expense: "Catering Package",
    category: "Catering",
    vendor: "Elegant Feast",
    budgeted: "RM 18,000",
    actual: "RM 20,500",
    status: "Over Budget",
  },
  {
    expense: "Photography Bundle",
    category: "Photography",
    vendor: "Luma Studio",
    budgeted: "RM 8,000",
    actual: "RM 8,000",
    status: "Pending",
  },
  {
    expense: "Floral Decoration",
    category: "Decoration",
    vendor: "Bloom Atelier",
    budgeted: "RM 5,500",
    actual: "RM 5,000",
    status: "Paid",
  },
];

const statusStyles: Record<BudgetTableRow["status"], string> = {
  Paid: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  "Over Budget": "bg-rose-100 text-rose-700",
};

export function BudgetTable() {
  return (
    <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Expense</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Category</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Vendor</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Budgeted</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Actual</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {rows.map((row) => (
              <tr key={row.expense} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{row.expense}</td>
                <td className="px-4 py-3 text-slate-600">{row.category}</td>
                <td className="px-4 py-3 text-slate-600">{row.vendor}</td>
                <td className="px-4 py-3 text-slate-600">{row.budgeted}</td>
                <td className="px-4 py-3 text-slate-600">{row.actual}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[row.status]}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button className="text-sm font-medium text-slate-700 transition hover:text-slate-900">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
