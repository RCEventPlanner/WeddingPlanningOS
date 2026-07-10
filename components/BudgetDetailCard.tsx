type BudgetDetailCardProps = {
  className?: string;
  showActions?: boolean;
  expenseName?: string;
  category?: string;
  vendorName?: string;
  vendorPicName?: string;
  vendorPicContact?: string;
  vendorFacebook?: string;
  vendorInstagram?: string;
  vendorWebsite?: string;
  packageDetails?: string;
  totalAmount?: string;
  depositRequired?: string;
  depositAmount?: string;
  depositDueDate?: string;
  balancePayment1Amount?: string;
  balancePayment1DueDate?: string;
  balancePayment2Amount?: string;
  balancePayment2DueDate?: string;
  remainingAmountToPay?: string;
  paymentStatus?: string;
  paymentMethod?: string;
  invoiceNumber?: string;
  receiptUpload?: string;
};

export function BudgetDetailCard({
  className,
  showActions = true,
  expenseName = "Venue Deposit",
  category = "Venue",
  vendorName = "The Garden Hall",
  vendorPicName = "Alicia Tan",
  vendorPicContact = "012-3456789",
  vendorFacebook = "facebook.com/thegardenhall",
  vendorInstagram = "@thegardenhall",
  vendorWebsite = "www.thegardenhall.com",
  packageDetails = "Venue booking deposit for the wedding reception.",
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
  paymentMethod = "Bank Transfer",
  invoiceNumber = "INV-2026-001",
  receiptUpload = "Placeholder receipt upload",
}: BudgetDetailCardProps) {
  return (
    <section className={className ?? "mt-6 rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50/80 p-6 shadow-sm sm:p-8"}>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Expense Profile</h2>
          <p className="mt-1 text-sm text-slate-600">
            A polished summary of the selected expense details.
          </p>
        </div>

        <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
          {paymentStatus}
        </span>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Expense Information</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">Category</p>
              <p className="mt-1 font-medium text-slate-900">{category}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Expense Name</p>
              <p className="mt-1 font-medium text-slate-900">{expenseName}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Vendor Name</p>
              <p className="mt-1 font-medium text-slate-900">{vendorName}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Vendor Website</p>
              <p className="mt-1 font-medium text-slate-900">{vendorWebsite}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Vendor Facebook</p>
              <p className="mt-1 font-medium text-slate-900">{vendorFacebook}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Vendor Instagram</p>
              <p className="mt-1 font-medium text-slate-900">{vendorInstagram}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Vendor PIC Name</p>
              <p className="mt-1 font-medium text-slate-900">{vendorPicName}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Vendor PIC Contact</p>
              <p className="mt-1 font-medium text-slate-900">{vendorPicContact}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-slate-500">Package Details</p>
              <p className="mt-1 text-sm text-slate-700">{packageDetails}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">Payment Summary</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <p className="text-sm text-slate-500">Total Amount</p>
              <p className="mt-1 font-medium text-slate-900">{totalAmount}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Remaining Amount to Pay</p>
              <p className="mt-1 font-medium text-slate-900">{remainingAmountToPay}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Deposit Required</p>
              <p className="mt-1 font-medium text-slate-900">{depositRequired}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Payment Status</p>
              <p className="mt-1 font-medium text-slate-900">{paymentStatus}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">Payment Schedule</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-700">Deposit</p>
              <div className="mt-4 space-y-2">
                <div>
                  <p className="text-sm text-slate-500">Amount</p>
                  <p className="mt-1 font-medium text-slate-900">{depositAmount}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Due Date</p>
                  <p className="mt-1 font-medium text-slate-900">{depositDueDate}</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-700">Balance Payment 1</p>
              <div className="mt-4 space-y-2">
                <div>
                  <p className="text-sm text-slate-500">Amount</p>
                  <p className="mt-1 font-medium text-slate-900">{balancePayment1Amount}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Due Date</p>
                  <p className="mt-1 font-medium text-slate-900">{balancePayment1DueDate}</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-700">Balance Payment 2</p>
              <div className="mt-4 space-y-2">
                <div>
                  <p className="text-sm text-slate-500">Amount</p>
                  <p className="mt-1 font-medium text-slate-900">{balancePayment2Amount}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Due Date</p>
                  <p className="mt-1 font-medium text-slate-900">{balancePayment2DueDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">Payment Information</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">Payment Method</p>
              <p className="mt-1 font-medium text-slate-900">{paymentMethod}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Invoice Number</p>
              <p className="mt-1 font-medium text-slate-900">{invoiceNumber}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-slate-500">Receipt / Invoice</p>
              <p className="mt-1 font-medium text-slate-900">{receiptUpload}</p>
            </div>
          </div>
        </div>
      </div>

      {showActions && (
        <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
          <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300">
            Edit Expense
          </button>
          <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
            Back to Budget List
          </button>
        </div>
      )}
    </section>
  );
}
