type TopNavProps = {
  title?: string;
  weddingName?: string;
};

export function TopNav({
  title = "Dashboard",
  weddingName = "Rachel & Kiser Wedding",
}: TopNavProps) {
  return (
    <header className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div>
        <p className="text-sm font-medium text-rose-500">Wedding Planning OS</p>
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      </div>

      <div className="flex items-center justify-between gap-3 sm:justify-end">
        <div className="text-right">
          <p className="text-sm font-medium text-slate-900">{weddingName}</p>
          <p className="text-xs text-slate-500">Planning overview</p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-sm font-semibold text-rose-600">
          R
        </div>
      </div>
    </header>
  );
}
