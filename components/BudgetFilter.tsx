const categoryOptions = [
  "All",
  "Venue",
  "MUA",
  "Photographer",
  "Videographer",
  "Wedding Planner",
  "Decoration",
];

const vendorOptions = [
  "All Vendors",
  "The Garden Hall",
  "Dream Decoration",
  "ABC Photography",
  "Crystal Makeup Studio",
];

const paymentStatusOptions = [
  "All",
  "Pending",
  "Deposit Paid",
  "Partially Paid",
  "Fully Paid",
  "Overdue",
];

const paymentMethodOptions = [
  "All",
  "Bank Transfer",
  "DuitNow QR",
  "Cash",
  "Credit Card",
  "E-Wallet",
  "Others",
];

export function BudgetFilter() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Search Expenses</h2>
        <p className="mt-1 text-sm text-slate-600">
          Find the right budget item quickly by searching or refining filters.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Search Expenses</label>
          <input
            type="text"
            placeholder="Search expense"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-rose-400 focus:bg-white"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Category</label>
            <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400" defaultValue="All">
              {categoryOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Expense Name</label>
            <input
              type="text"
              placeholder="Search expense"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Vendor Name</label>
            <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400" defaultValue="All Vendors">
              {vendorOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Payment Status</label>
            <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400" defaultValue="All">
              {paymentStatusOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Deposit Required</label>
            <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400" defaultValue="All">
              <option>All</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Payment Method</label>
            <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400" defaultValue="All">
              {paymentMethodOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 sm:w-auto">
            Reset
          </button>
          <button className="w-full rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 sm:w-auto">
            Apply Filters
          </button>
        </div>
      </div>
    </section>
  );
}
