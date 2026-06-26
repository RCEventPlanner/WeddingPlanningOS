const filters = ["All", "Pending", "Confirmed", "Declined"];

export function RSVPFilter() {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`rounded-full px-3 py-2 text-sm font-medium transition ${
            filter === "All"
              ? "bg-rose-500 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
