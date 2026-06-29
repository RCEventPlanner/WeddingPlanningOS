const categoryOptions = ["All", "Venue", "MUA", "Photographer", "Videographer", "Wedding Planner", "Decoration"];
const vendorOptions = ["All Vendors", "The Garden Hall", "Dream Decoration", "ABC Photography", "Crystal Makeup Studio"];

export function VendorFilter() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Search Vendors</h2>
        <p className="mt-1 text-sm text-slate-600">
          Search and filter the vendor directory using the fields below.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Search Vendors</label>
          <input
            type="text"
            placeholder="Search vendors"
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
            <label className="mb-2 block text-sm font-medium text-slate-700">Vendor Name</label>
            <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400" defaultValue="All Vendors">
              {vendorOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Vendor PIC Name</label>
            <input
              type="text"
              placeholder="Search PIC"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Vendor PIC Contact</label>
            <input
              type="text"
              placeholder="Search contact"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-between">
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
