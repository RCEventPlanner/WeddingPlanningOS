export function VendorDetailCard() {
  return (
    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Vendor Details</h2>
          <p className="mt-1 text-sm text-slate-600">
            Review the selected vendor profile and contact details.
          </p>
        </div>

        <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
          Edit Vendor
        </button>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Vendor Information</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">Category</p>
              <p className="mt-1 font-medium text-slate-900">Venue</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Vendor Name</p>
              <p className="mt-1 font-medium text-slate-900">The Garden Hall</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-slate-500">Vendor Website (Optional)</p>
              <p className="mt-1 font-medium text-slate-900">www.thegardenhall.com</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">Social Media</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">Vendor Facebook (Optional)</p>
              <p className="mt-1 font-medium text-slate-900">facebook.com/thegardenhall</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Vendor Instagram (Optional)</p>
              <p className="mt-1 font-medium text-slate-900">@thegardenhall</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">Contact Information</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">Vendor PIC Name</p>
              <p className="mt-1 font-medium text-slate-900">Alicia Tan</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Vendor PIC Contact</p>
              <p className="mt-1 font-medium text-slate-900">012-3456789</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">Additional Information</h3>
          <div className="mt-4 grid gap-4">
            <div>
              <p className="text-sm text-slate-500">Default Package Details</p>
              <p className="mt-1 text-sm text-slate-700">
                Standard wedding package includes venue styling, basic lighting, and setup support.
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Notes</p>
              <p className="mt-1 text-sm text-slate-700">
                Preferred vendor available on weekends and offers a 10% discount for full-day bookings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
