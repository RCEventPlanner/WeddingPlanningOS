type BudgetOverviewProps = {
  totalBudget?: string;
  totalSpent?: string;
  remainingBudget?: string;
  budgetUtilization?: string;
};

export function BudgetOverview({
  totalBudget = "RM 120,000",
  totalSpent = "RM 84,500",
  remainingBudget = "RM 35,500",
  budgetUtilization = "70%",
}: BudgetOverviewProps) {
  const items = [
    { label: "Total Budget", value: totalBudget },
    { label: "Total Spent", value: totalSpent },
    { label: "Remaining Budget", value: remainingBudget },
    { label: "Budget Utilization", value: budgetUtilization },
  ];

  return (
    <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p className="text-sm font-medium text-slate-600">{item.label}</p>
          <p className="mt-3 text-2xl font-semibold text-slate-900">{item.value}</p>
        </div>
      ))}
    </section>
  );
}
