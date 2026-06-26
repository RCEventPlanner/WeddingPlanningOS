type WeddingProfileCardProps = {
  weddingName?: string;
  brideName?: string;
  groomName?: string;
  weddingDate?: string;
  venue?: string;
  theme?: string;
  status?: string;
  countdown?: string;
  guestTarget?: string;
  budgetTarget?: string;
};

export function WeddingProfileCard({
  weddingName = "Rachel & Kiser Wedding",
  brideName = "Rachel",
  groomName = "Kiser",
  weddingDate = "20 December 2026",
  venue = "Grand Ballroom Kuala Lumpur",
  theme = "Modern Elegant",
  status = "Planning",
  countdown = "177 Days",
  guestTarget = "300 Guests",
  budgetTarget = "RM 25,000",
}: WeddingProfileCardProps) {
  return (
    <div className="space-y-4">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-medium text-rose-500">Wedding Information</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">{weddingName}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-sm text-slate-500">Bride</p>
                <p className="font-medium text-slate-900">{brideName}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Groom</p>
                <p className="font-medium text-slate-900">{groomName}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Wedding Date</p>
                <p className="font-medium text-slate-900">{weddingDate}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Venue</p>
                <p className="font-medium text-slate-900">{venue}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Theme</p>
                <p className="font-medium text-slate-900">{theme}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Status</p>
                <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
                  {status}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Planning Notes</p>
            <p className="mt-2">Keep this profile updated as your wedding details evolve.</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Countdown</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">{countdown}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Guest Target</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">{guestTarget}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Budget Target</p>
          <p className="mt-2 text-xl font-semibold text-slate-900">{budgetTarget}</p>
        </div>
      </section>

      <section className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row">
        <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
          Edit Wedding
        </button>
        <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-rose-200 hover:text-rose-600">
          Share Wedding
        </button>
      </section>
    </div>
  );
}
