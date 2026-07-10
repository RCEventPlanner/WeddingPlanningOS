export type GuestFormValues = {
  fullName?: string;
  phoneNumber?: string;
  emailAddress?: string;
  preferredName?: string;
  guestFrom?: "Groom's Side" | "Bride's Side" | "Both";
  guestGroup?: string;
};

type GuestFormProps = {
  className?: string;
  title?: string;
  saveLabel?: string;
  onCancel?: () => void;
  onSave?: () => void;
  values?: GuestFormValues;
};

export function GuestForm({
  className,
  title = "Guest Details",
  saveLabel = "Save Guest",
  onCancel,
  onSave,
  values,
}: GuestFormProps) {
  return (
    <section className={className ?? "mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"}>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-600">
          Add or update basic guest information.
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
                defaultValue={values?.fullName ?? "Rachel Chong"}
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
                defaultValue={values?.phoneNumber ?? "012-3456789"}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue={values?.emailAddress ?? "rcevent@example.com"}
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
                defaultValue={values?.preferredName ?? "Auntie Rachel"}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Guest From
              </label>
              <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400" defaultValue={values?.guestFrom ?? "Bride's Side"}>
                <option>Groom's Side</option>
                <option>Bride's Side</option>
                <option>Both</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Guest Group
              </label>
              <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400" defaultValue={values?.guestGroup ?? "Relatives"}>
                <option>Relatives</option>
                <option>Friends</option>
                <option>Colleagues</option>
                <option>VIP</option>
                <option>Others</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onSave}
          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          {saveLabel}
        </button>
      </div>
    </section>
  );
}
