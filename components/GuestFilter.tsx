const guestFromOptions = ["All", "Groom's Side", "Bride's Side", "Both"];
const guestGroupOptions = ["All", "Relatives", "Friends", "Colleagues", "VIP", "Others"];

export type GuestFilters = {
  guestFrom: string;
  guestGroup: string;
};

type GuestFilterProps = {
  filters: GuestFilters;
  onChange: (nextFilters: GuestFilters) => void;
};

export function GuestFilter({ filters, onChange }: GuestFilterProps) {
  const updateFilter = (field: keyof GuestFilters, value: string) => {
    onChange({ ...filters, [field]: value });
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Advanced Filters</h2>
        <p className="mt-1 text-sm text-slate-600">Refine guest listing by side and relationship group.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Guest From</label>
          <select
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
            value={filters.guestFrom}
            onChange={(event) => updateFilter("guestFrom", event.target.value)}
          >
            {guestFromOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Guest Group</label>
          <select
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
            value={filters.guestGroup}
            onChange={(event) => updateFilter("guestGroup", event.target.value)}
          >
            {guestGroupOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
