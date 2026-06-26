const filters = ["All", "Venue", "MUA", "Photographer", "Videographer", "Wedding Planner", "Decoration"];

export function BudgetFilter() {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
