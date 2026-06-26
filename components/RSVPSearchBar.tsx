export function RSVPSearchBar() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-slate-400">🔎</span>
        <input
          className="w-full border-none bg-transparent text-sm outline-none placeholder:text-slate-400"
          placeholder="Search guest..."
        />
      </div>
    </div>
  );
}
