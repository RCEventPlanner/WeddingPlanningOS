const summaryRows = [
  {
    category: "Venue",
    expenseName: "Venue Deposit",
    vendorName: "The Garden Hall",
    totalAmount: "RM 25,000",
    remainingAmountToPay: "RM 3,000",
    paymentStatus: "Deposit Paid",
  },
  {
    category: "Photography",
    expenseName: "Photo Coverage",
    vendorName: "ABC Photography",
    totalAmount: "RM 12,500",
    remainingAmountToPay: "RM 5,000",
    paymentStatus: "Partially Paid",
  },
];

export function BudgetOverview() {
  return (
    <section className="mt-6 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full border-collapse text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-4">Category</th>
            <th className="px-4 py-4">Expense Name</th>
            <th className="px-4 py-4">Vendor Name</th>
            <th className="px-4 py-4">Total Amount</th>
            <th className="px-4 py-4">Remaining Amount to Pay</th>
            <th className="px-4 py-4">Payment Status</th>
            <th className="px-4 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {summaryRows.map((row) => (
            <tr key={row.expenseName} className="hover:bg-slate-50">
              <td className="px-4 py-4 text-slate-700">{row.category}</td>
              <td className="px-4 py-4 font-medium text-slate-900">{row.expenseName}</td>
              <td className="px-4 py-4 text-slate-700">{row.vendorName}</td>
              <td className="px-4 py-4 text-slate-700">{row.totalAmount}</td>
              <td className="px-4 py-4 text-slate-700">{row.remainingAmountToPay}</td>
              <td className="px-4 py-4 text-slate-700">{row.paymentStatus}</td>
              <td className="px-4 py-4">
                <button className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-200">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
