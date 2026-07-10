const categoryOptions = [
  "Venue",
  "Photography",
  "Videography",
  "Makeup",
  "Decoration",
  "Catering",
  "Invitation",
  "Registration",
  "Transportation",
  "Coordination",
  "Legal",
  "Finance",
  "Others",
];

const assignedOptions = [
  "Rachel Chong",
  "Assistant Planner",
  "Event Coordinator",
];

const vendorOptions = [
  "The Garden Hall",
  "Dream Decoration",
  "ABC Photography",
  "Crystal Makeup Studio",
  "RC Event Planner",
  "+ Add New Vendor",
];

const priorityOptions = ["Low", "Medium", "High", "Urgent"];
const statusOptions = ["Not Started", "In Progress", "Waiting", "Completed", "Cancelled"];

export type TaskFormValues = {
  category?: string;
  assignedTo?: string;
  taskName?: string;
  relatedVendor?: string;
  dueDate?: string;
  priority?: string;
  status?: string;
  estimatedTime?: string;
  description?: string;
  notes?: string;
};

type TaskFormProps = {
  className?: string;
  title?: string;
  saveLabel?: string;
  onCancel?: () => void;
  onSave?: () => void;
  values?: TaskFormValues;
};

export function TaskForm({
  className,
  title = "Task Details",
  saveLabel = "Save Task",
  onCancel,
  onSave,
  values,
}: TaskFormProps) {
  return (
    <section className={className ?? "mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"}>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-600">
          Use this form to capture wedding task details and vendor coordination.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Task Information</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Category <span className="text-rose-500">*</span>
              </label>
              <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400" defaultValue={values?.category ?? "Venue"}>
                {categoryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Assigned To <span className="text-rose-500">*</span>
              </label>
              <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400" defaultValue={values?.assignedTo ?? "Rachel Chong"}>
                {assignedOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Task Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue={values?.taskName ?? "Confirm Venue Booking"}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Related Vendor (Optional)
              </label>
              <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400" defaultValue={values?.relatedVendor ?? "The Garden Hall"}>
                <option value="" disabled>
                  Select a vendor
                </option>
                {vendorOptions.map((vendor) => (
                  <option key={vendor} value={vendor}>
                    {vendor}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Due Date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue={values?.dueDate ?? "2026-08-15"}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Priority <span className="text-rose-500">*</span>
              </label>
              <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400" defaultValue={values?.priority ?? "High"}>
                {priorityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Status <span className="text-rose-500">*</span>
              </label>
              <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400" defaultValue={values?.status ?? "In Progress"}>
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Estimated Time (Optional)
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue={values?.estimatedTime ?? "2 hours"}
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Description
              </label>
              <textarea
                className="min-h-24 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue={values?.description ?? "Confirm venue availability, deposit schedule, and guest capacity for the ceremony and reception."}
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Notes
              </label>
              <textarea
                className="min-h-24 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                defaultValue={values?.notes ?? "Reach out to the venue coordinator for the latest floorplan and vendor restrictions."}
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
