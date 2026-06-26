type WeddingHeaderProps = {
  weddingName?: string;
  weddingDate?: string;
  countdown?: string;
  status?: string;
};

export function WeddingHeader({
  weddingName = "Rachel & Kiser Wedding",
  weddingDate = "15 December 2026",
  countdown = "168 Days Remaining",
  status = "Planning",
}: WeddingHeaderProps) {
  return (
    <section className="mb-6 rounded-3xl border border-slate-200 bg-gradient-to-r from-rose-50 via-white to-slate-50 p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium text-rose-500">Wedding Overview</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900 sm:text-3xl">
            {weddingName}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="rounded-full bg-white px-3 py-1 shadow-sm">
              {weddingDate}
            </span>
            <span className="rounded-full bg-white px-3 py-1 shadow-sm">
              {countdown}
            </span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-700">
              {status}
            </span>
          </div>
        </div>

        <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-rose-200 hover:text-rose-600">
          Edit
        </button>
      </div>
    </section>
  );
}
