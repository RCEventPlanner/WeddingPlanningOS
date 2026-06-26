export function GuestForm() {
  return (
    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Guest Details</h2>
        <p className="mt-1 text-sm text-slate-600">
          Add or update guest information with a simple, reusable form.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Basic Information</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Guest Full Name
              </label>
              <p className="mb-2 text-xs text-slate-500">
                Used for registration and official records
              </p>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue="Rachel Chong"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Phone Number
              </label>
              <p className="mb-2 text-xs text-slate-500">
                Used for registration and contact
              </p>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue="012-3456789"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue="rcevent@example.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Preferred Name
              </label>
              <p className="mb-2 text-xs text-slate-500">
                How should the couple address you?
              </p>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue="Auntie Rachel"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Guest From
              </label>
              <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400">
                <option>Groom's Side</option>
                <option>Bride's Side</option>
                <option>Both</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Guest Group
              </label>
              <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400">
                <option>Relatives</option>
                <option>Friends</option>
                <option>Colleagues</option>
                <option>VIP</option>
                <option>Others</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">Attendance</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Number of Adults
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue="4"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Number of Children
              </label>
              <p className="mb-2 text-xs text-slate-500">
                Children requiring their own seat
              </p>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue="0"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                RSVP Status
              </label>
              <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400">
                <option>Pending</option>
                <option>Confirmed</option>
                <option>Declined</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">Additional Information</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <label className="mb-4 block text-sm font-medium text-slate-700">
                Meal Preferences
              </label>

              <div className="space-y-3">
                {[
                  { label: "Normal", value: 0 },
                  { label: "Vegetarian", value: 0 },
                  { label: "Halal", value: 0 },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between gap-4 rounded-xl bg-white px-3 py-3 shadow-sm">
                    <span className="text-sm font-medium text-slate-700">{item.label}</span>
                    <select className="w-20 rounded-lg border border-slate-200 px-2 py-2 text-sm outline-none focus:border-rose-400">
                      {Array.from({ length: 11 }, (_, i) => i).map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Special Requests
              </label>
              <textarea
                className="min-h-24 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue="Baby Chairs needed for 2 children. 1 Stoller space needed"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Notes
              </label>
              <textarea
                className="min-h-24 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue="Family guest"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
        <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300">
          Cancel
        </button>
        <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
          Save
        </button>
      </div>
    </section>
  );
}
