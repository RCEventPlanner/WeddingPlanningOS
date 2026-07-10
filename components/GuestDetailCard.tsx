type GuestDetailCardProps = {
  className?: string;
  onEdit?: () => void;
  guestName?: string;
  preferredName?: string;
  phoneNumber?: string;
  emailAddress?: string;
  guestFrom?: string;
  guestGroup?: string;
};

export function GuestDetailCard({
  className,
  onEdit,
  guestName = "Rachel Tan",
  preferredName = "Rachel",
  phoneNumber = "012-3456789",
  emailAddress = "rachel@example.com",
  guestFrom = "Bride's Side",
  guestGroup = "Family",
}: GuestDetailCardProps) {
  return (
    <section className={className ?? "mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"}>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Guest Profile</h2>
          <p className="mt-1 text-sm text-slate-600">
            A complete summary of the selected guest details.
          </p>
        </div>

        <button
          type="button"
          onClick={onEdit}
          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Edit Guest
        </button>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Basic Information</h3>
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
      </div>
    </section>
  );
}
