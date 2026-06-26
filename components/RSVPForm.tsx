type RSVPFormProps = {
  guestName?: string;
  preferredName?: string;
  phoneNumber?: string;
  emailAddress?: string;
  guestFrom?: string;
  guestGroup?: string;
  adults?: number;
  children?: number;
  rsvpStatus?: "Pending" | "Confirmed" | "Declined";
  normalMeals?: number;
  vegetarianMeals?: number;
  halalMeals?: number;
  specialRequests?: string;
  notes?: string;
};

const mealOptions = Array.from({ length: 11 }, (_, i) => i);

export function RSVPForm({
  guestName = "Rachel Tan",
  preferredName = "Rachel",
  phoneNumber = "012-3456789",
  emailAddress = "rachel@example.com",
  guestFrom = "Bride's Side",
  guestGroup = "Family",
  adults = 2,
  children = 1,
  rsvpStatus = "Pending",
  normalMeals = 0,
  vegetarianMeals = 0,
  halalMeals = 0,
  specialRequests = "Baby Chairs needed for 2 children. 1 Stoller space needed",
  notes = "Family guest",
}: RSVPFormProps) {
  return (
    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">RSVP Details</h2>
        <p className="mt-1 text-sm text-slate-600">
          Capture guest response details with a reusable RSVP form.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Guest Information</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Guest Full Name
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue={guestName}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Preferred Name
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue={preferredName}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Phone Number
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue={phoneNumber}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue={emailAddress}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Guest From
              </label>
              <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400" defaultValue={guestFrom}>
                <option>Groom's Side</option>
                <option>Bride's Side</option>
                <option>Both</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Guest Group
              </label>
              <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400" defaultValue={guestGroup}>
                <option>Family</option>
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
                defaultValue={adults}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Number of Children
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue={children}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                RSVP Status
              </label>
              <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400" defaultValue={rsvpStatus}>
                <option>Pending</option>
                <option>Confirmed</option>
                <option>Declined</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">Meal Requirements</h3>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4 rounded-xl bg-white px-3 py-3 shadow-sm">
                <span className="text-sm font-medium text-slate-700">Normal Meals</span>
                <select className="w-20 rounded-lg border border-slate-200 px-2 py-2 text-sm outline-none focus:border-rose-400" defaultValue={normalMeals}>
                  {mealOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between gap-4 rounded-xl bg-white px-3 py-3 shadow-sm">
                <span className="text-sm font-medium text-slate-700">Vegetarian Meals</span>
                <select className="w-20 rounded-lg border border-slate-200 px-2 py-2 text-sm outline-none focus:border-rose-400" defaultValue={vegetarianMeals}>
                  {mealOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-between gap-4 rounded-xl bg-white px-3 py-3 shadow-sm">
                <span className="text-sm font-medium text-slate-700">Halal Meals</span>
                <select className="w-20 rounded-lg border border-slate-200 px-2 py-2 text-sm outline-none focus:border-rose-400" defaultValue={halalMeals}>
                  {mealOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">Additional Information</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Special Requests
              </label>
              <textarea
                className="min-h-24 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue={specialRequests}
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Notes
              </label>
              <textarea
                className="min-h-24 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue={notes}
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
          Save RSVP
        </button>
      </div>
    </section>
  );
}
