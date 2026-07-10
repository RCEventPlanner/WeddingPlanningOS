const statusOptions = ["All", "Pending", "Confirmed", "Declined"];
const guestFromOptions = ["All", "Groom's Side", "Bride's Side", "Both"];

export type RSVPFilters = {
  status: string;
  guestFrom: string;
  mealPreference: string;
};

export const defaultRSVPFilters: RSVPFilters = {
  status: "All",
  guestFrom: "All",
  mealPreference: "All",
};

type RSVPFilterProps = {
  filters?: RSVPFilters;
  updateFilter?: (key: keyof RSVPFilters, value: string) => void;
};

export function RSVPFilter({ filters = defaultRSVPFilters, updateFilter = () => {} }: RSVPFilterProps) {
  const safeFilters = filters ?? defaultRSVPFilters;

  const handleFilterUpdate = (field: keyof RSVPFilters, value: string) => {
    updateFilter(field, value);
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">Advanced Filters</h2>
        <p className="mt-1 text-sm text-slate-600">Refine RSVP listing by status and invitation side.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">RSVP Status</label>
          <select
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
            value={safeFilters.status}
            onChange={(event) => handleFilterUpdate("status", event.target.value)}
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Guest From</label>
          <select
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
            value={safeFilters.guestFrom}
            onChange={(event) => handleFilterUpdate("guestFrom", event.target.value)}
          >
            {guestFromOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
