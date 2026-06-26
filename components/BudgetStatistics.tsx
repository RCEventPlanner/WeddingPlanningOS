type BudgetStatisticsProps = {
  totalBudget?: string;
  totalSpent?: string;
  remainingBudget?: string;
  pendingPayments?: string;
  paidAmount?: string;
  overduePayments?: string;
};

export function BudgetStatistics({
  totalBudget = "RM 120,000",
  totalSpent = "RM 84,500",
  remainingBudget = "RM 35,500",
  pendingPayments = "3",
  paidAmount = "RM 78,000",
  overduePayments = "1",
}: BudgetStatisticsProps) {
  const items = [
    { label: "Total Budget", value: totalBudget },
    { label: "Total Spent", value: totalSpent },
    { label: "Remaining Budget", value: remainingBudget },
    { label: "Pending Payments", value: pendingPayments },
    { label: "Paid Amount", value: paidAmount },
    { label: "Overdue Payments", value: overduePayments },
  ];

  return (
    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Budget Statistics</h2>
        <p className="mt-1 text-sm text-slate-600">
          A quick overview of budget progress and payment status.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 shadow-sm transition hover:shadow-md"
          >
            <p className="text-sm font-medium text-slate-600">{item.label}</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
