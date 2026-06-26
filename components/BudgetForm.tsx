type BudgetFormProps = {
  expenseName?: string;
  category?: string;
  vendorName?: string;
  description?: string;
  totalAmount?: string;
  depositRequired?: string;
  depositAmount?: string;
  depositDueDate?: string;
  balancePayment1Amount?: string;
  balancePayment1DueDate?: string;
  balancePayment2Amount?: string;
  balancePayment2DueDate?: string;
  remainingAmountToPay?: string;
  paymentStatus?: "Pending" | "Deposit Paid" | "Partially Paid" | "Fully Paid" | "Overdue";
  notes?: string;
};

const categoryOptions = [
  "Venue",
  "Makeup Artist",
  "Photographer",
  "Videographer",
  "Photographer & Videographer",
  "Wedding Planner",
  "Wedding Coordinator",
  "Pre Wedding Shooting",
  "Decoration",
  "Special Effect",
  "Emcee",
  "Live Band",
  "Sound System / Lighting",
  "Instant Photobooth",
  "Caterer",
  "Snack Booth",
  "Wedding Cake",
  "Door Gift",
  "Entertainment",
  "Live Drawing Artist",
  "Handmade Booth",
  "Chaperon / Daikam",
  "Betrothal",
  "Wine Supplier",
  "Attire Rental",
  "Car Rental",
  "Bridal Bouquet & etc",
  "Airbnb Rental",
  "Others",
];

export function BudgetForm({
  expenseName = "Venue Deposit",
  category = "Venue",
  vendorName = "The Garden Hall",
  description = "Venue booking deposit for the wedding reception.",
  totalAmount = "RM 25,000",
  depositRequired = "Yes",
  depositAmount = "RM 10,000",
  depositDueDate = "15 Jun 2026",
  balancePayment1Amount = "RM 7,500",
  balancePayment1DueDate = "20 Jul 2026",
  balancePayment2Amount = "RM 7,500",
  balancePayment2DueDate = "15 Aug 2026",
  remainingAmountToPay = "RM 3,000",
  paymentStatus = "Deposit Paid",
  notes = "Payment was completed on schedule.",
}: BudgetFormProps) {
  return (
    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Expense Details</h2>
        <p className="mt-1 text-sm text-slate-600">
          Add or update expense information with a reusable budget form.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Expense Information</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Expense Name
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue={expenseName}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Category
              </label>
              <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400" defaultValue={category}>
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Vendor Name
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue={vendorName}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Vendor PIC Name
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue="Alicia Tan"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Vendor PIC Contact
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue="012-3456789"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Vendor Facebook (if any)
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue="facebook.com/thegardenhall"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Vendor Instagram (if any)
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue="@thegardenhall"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Vendor Website (if any)
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue="www.thegardenhall.com"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Package Details
              </label>
              <textarea
                className="min-h-24 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue={description}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">Payment Details</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Total Amount
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue={totalAmount}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Deposit Required?
              </label>
              <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400" defaultValue={depositRequired}>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Deposit Amount
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue={depositAmount}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Deposit Due Date
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue={depositDueDate}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Balance Payment 1 Amount
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue={balancePayment1Amount}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Balance Payment 1 Due Date
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue={balancePayment1DueDate}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Balance Payment 2 Amount
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue={balancePayment2Amount}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Balance Payment 2 Due Date
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue={balancePayment2DueDate}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Remaining Amount to Pay
              </label>
              <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                {remainingAmountToPay}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Payment Status
              </label>
              <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400" defaultValue={paymentStatus}>
                <option>Pending</option>
                <option>Deposit Paid</option>
                <option>Partially Paid</option>
                <option>Fully Paid</option>
                <option>Overdue</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">Notes</h3>
          <div className="mt-4">
            <textarea
              className="min-h-24 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
              defaultValue={notes}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
        <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300">
          Cancel
        </button>
        <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
          Save Expense
        </button>
      </div>
    </section>
  );
}
