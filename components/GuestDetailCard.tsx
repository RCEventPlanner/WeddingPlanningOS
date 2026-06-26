type GuestDetailCardProps = {
  guestName?: string;
  preferredName?: string;
  phoneNumber?: string;
  emailAddress?: string;
  guestFrom?: string;
  guestGroup?: string;
  adults?: number;
  children?: number;
  rsvpStatus?: "Confirmed" | "Pending" | "Declined";
  normalMeals?: number;
  vegetarianMeals?: number;
  halalMeals?: number;
  specialRequests?: string;
  notes?: string;
};

const statusStyles: Record<NonNullable<GuestDetailCardProps["rsvpStatus"]>, string> = {
  Confirmed: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Declined: "bg-rose-100 text-rose-700",
};

export function GuestDetailCard({
  guestName = "Rachel Tan",
  preferredName = "Rachel",
  phoneNumber = "012-3456789",
  emailAddress = "rachel@example.com",
  guestFrom = "Bride's Side",
  guestGroup = "Family",
  adults = 2,
  children = 1,
  rsvpStatus = "Confirmed",
  normalMeals = 3,
  vegetarianMeals = 1,
  halalMeals = 0,
  specialRequests,
  notes,
}: GuestDetailCardProps) {
  return (
    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Guest Profile</h2>
          <p className="mt-1 text-sm text-slate-600">
            A complete summary of the selected guest details.
          </p>
        </div>

        <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${statusStyles[rsvpStatus]}`}>
          {rsvpStatus}
        </span>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Guest Information</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-slate-500">Guest Full Name</p>
              <p className="mt-1 font-medium text-slate-900">{guestName}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Preferred Name</p>
              <p className="mt-1 font-medium text-slate-900">{preferredName}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Phone Number</p>
              <p className="mt-1 font-medium text-slate-900">{phoneNumber}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Email Address</p>
              <p className="mt-1 font-medium text-slate-900">{emailAddress}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Guest From</p>
              <p className="mt-1 font-medium text-slate-900">{guestFrom}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Guest Group</p>
              <p className="mt-1 font-medium text-slate-900">{guestGroup}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">Attendance</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-slate-500">Number of Adults</p>
              <p className="mt-1 font-medium text-slate-900">{adults}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Number of Children</p>
              <p className="mt-1 font-medium text-slate-900">{children}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">RSVP Status</p>
              <span className={`mt-1 inline-flex rounded-full px-3 py-1 text-sm font-medium ${statusStyles[rsvpStatus]}`}>
                {rsvpStatus}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">Meal Requirements</h3>
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="flex items-center justify-between border-b border-slate-200 py-2">
              <span className="text-sm text-slate-600">Normal Meals</span>
              <span className="font-medium text-slate-900">{normalMeals}</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-200 py-2">
              <span className="text-sm text-slate-600">Vegetarian Meals</span>
              <span className="font-medium text-slate-900">{vegetarianMeals}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-slate-600">Halal Meals</span>
              <span className="font-medium text-slate-900">{halalMeals}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">Additional Information</h3>
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-sm text-slate-500">Special Requests</p>
              <p className="mt-1 text-sm text-slate-700">
                {specialRequests || "No special requests."}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Notes</p>
              <p className="mt-1 text-sm text-slate-700">
                {notes || "No additional notes."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
        <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300">
          Edit Guest
        </button>
        <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
          Back to Guest List
        </button>
      </div>
    </section>
  );
}
