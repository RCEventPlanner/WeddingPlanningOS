export function BudgetSearchBar() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <label className="flex items-center gap-3">
        <svg
          className="h-5 w-5 text-slate-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          className="w-full border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          placeholder="Search expenses..."
        />
      </label>
    </div>
  );
}
