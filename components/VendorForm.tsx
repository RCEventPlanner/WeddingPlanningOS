export type VendorFormValues = {
  category?: string;
  vendorName?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  picName?: string;
  picContact?: string;
  packageDetails?: string;
  notes?: string;
};

type VendorFormProps = {
  className?: string;
  title?: string;
  description?: string;
  saveLabel?: string;
  onCancel?: () => void;
  onSave?: () => void;
  values?: VendorFormValues;
};

export function VendorForm({
  className,
  title = "Add Vendor",
  description = "Add a new vendor record with contact, social, and package details.",
  saveLabel = "Save Vendor",
  onCancel,
  onSave,
  values,
}: VendorFormProps) {
  return (
    <section className={className ?? "mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"}>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-600">
          {description}
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Vendor Information</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Category *</label>
              <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400" defaultValue={values?.category ?? "Venue"}>
                <option>Venue</option>
                <option>Makeup Artist</option>
                <option>Photographer</option>
                <option>Videographer</option>
                <option>Photographer & Videographer</option>
                <option>Wedding Planner</option>
                <option>Wedding Coordinator</option>
                <option>Pre Wedding Shooting</option>
                <option>Decoration</option>
                <option>Special Effect</option>
                <option>Emcee</option>
                <option>Live Band</option>
                <option>Sound System / Lighting</option>
                <option>Instant Photobooth</option>
                <option>Caterer</option>
                <option>Snack Booth</option>
                <option>Wedding Cake</option>
                <option>Door Gift</option>
                <option>Entertainment</option>
                <option>Live Drawing Artist</option>
                <option>Handmade Booth</option>
                <option>Chaperon / Daikam</option>
                <option>Betrothal</option>
                <option>Wine Supplier</option>
                <option>Attire Rental</option>
                <option>Car Rental</option>
                <option>Bridal Bouquet & etc</option>
                <option>Airbnb Rental</option>
                <option>Others</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Vendor Name *</label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue={values?.vendorName ?? "The Garden Hall"}
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">Vendor Website (Optional)</label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue={values?.website ?? "www.thegardenhall.com"}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">Social Media</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Vendor Facebook (Optional)</label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue={values?.facebook ?? "facebook.com/thegardenhall"}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Vendor Instagram (Optional)</label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue={values?.instagram ?? "@thegardenhall"}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">Contact Information</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Vendor PIC Name *</label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue={values?.picName ?? "Alicia Tan"}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Vendor PIC Contact *</label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue={values?.picContact ?? "012-3456789"}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-slate-900">Additional Information</h3>
          <div className="mt-4 grid gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Default Package Details</label>
              <textarea
                className="min-h-24 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue={values?.packageDetails ?? "Standard wedding package includes venue styling, basic lighting, and setup support."}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Notes</label>
              <textarea
                className="min-h-24 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue={values?.notes ?? "Preferred vendor available on weekends and offers a 10% discount for full-day bookings."}
              />
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
