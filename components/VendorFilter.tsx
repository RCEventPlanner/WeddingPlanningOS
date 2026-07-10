const categoryOptions = ["All", "Venue", "MUA", "Photographer", "Videographer", "Wedding Planner", "Decoration"];
export type VendorFilters = {
  category: string;
  vendorName: string;
};

type VendorFilterProps = {
  filters: VendorFilters;
  vendorOptions: string[];
  onChange: (nextFilters: VendorFilters) => void;
};

export function VendorFilter({ filters, vendorOptions, onChange }: VendorFilterProps) {
  const updateFilter = (field: keyof VendorFilters, value: string) => {
    onChange({ ...filters, [field]: value });
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Advanced Filters</h2>
        <p className="mt-1 text-sm text-slate-600">
          Refine vendor listing results with category and vendor selection.
        </p>
      </div>

      <div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Category</label>
            <select
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
              value={filters.category}
              onChange={(event) => updateFilter("category", event.target.value)}
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Vendor Name</label>
            <select
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
              value={filters.vendorName}
              onChange={(event) => updateFilter("vendorName", event.target.value)}
            >
              {vendorOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
