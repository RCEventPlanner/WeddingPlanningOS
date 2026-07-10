export type BudgetTableRow = {
  id: string;
  expense: string;
  category: string;
  vendor: string;
  actual: string;
  status: "Paid" | "Pending" | "Over Budget";
};

const statusStyles: Record<BudgetTableRow["status"], string> = {
  Paid: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  "Over Budget": "bg-rose-100 text-rose-700",
};

type BudgetTableProps = {
  rows: BudgetTableRow[];
  selectedExpenseId: string;
  onSelectExpense: (expenseId: string) => void;
  onViewExpense: (expenseId: string) => void;
  onEditExpense: (expenseId: string) => void;
  onDeleteExpense: (expenseId: string) => void;
};

export function BudgetTable({
  rows,
  selectedExpenseId,
  onSelectExpense,
  onViewExpense,
  onEditExpense,
  onDeleteExpense,
}: BudgetTableProps) {
  return (
    <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Expense</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Category</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Vendor</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Actual</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-500">
                  No expenses match the current search and filters.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
              <tr
                key={row.id}
                className={`cursor-pointer transition hover:bg-slate-50 ${selectedExpenseId === row.id ? "bg-rose-50/60" : ""}`}
                onClick={() => onSelectExpense(row.id)}
              >
                <td className="px-4 py-3 font-medium text-slate-900">{row.expense}</td>
                <td className="px-4 py-3 text-slate-600">{row.category}</td>
                <td className="px-4 py-3 text-slate-600">{row.vendor}</td>
                <td className="px-4 py-3 text-slate-600">{row.actual}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[row.status]}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onViewExpense(row.id);
                      }}
                      className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-200"
                    >
                      View
                    </button>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onEditExpense(row.id);
                      }}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-slate-300"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onDeleteExpense(row.id);
                      }}
                      className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700 transition hover:bg-rose-100"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
