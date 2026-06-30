type TaskDetailCardProps = {
  category?: string;
  taskName?: string;
  relatedVendor?: string;
  assignedTo?: string;
  dueDate?: string;
  priority?: string;
  status?: string;
  estimatedTime?: string;
  description?: string;
  notes?: string;
};

export function TaskDetailCard({
  category = "Venue",
  taskName = "Confirm Venue Booking",
  relatedVendor = "The Garden Hall",
  assignedTo = "Rachel Chong",
  dueDate = "15 Aug 2026",
  priority = "High",
  status = "In Progress",
  estimatedTime = "2 Hours",
  description = "Confirm venue booking details, payment schedule and contract with the venue before the deadline.",
  notes = "Waiting for final quotation from the venue manager.",
}: TaskDetailCardProps) {
  return (
    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Task Details</h2>
        <p className="mt-1 text-sm text-slate-600">
          Review the selected task summary and related coordination notes.
        </p>
      </div>

      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <p className="text-sm text-slate-500">Category</p>
            <p className="mt-1 font-medium text-slate-900">{category}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Task Name</p>
            <p className="mt-1 font-medium text-slate-900">{taskName}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Related Vendor (Optional)</p>
            <p className="mt-1 font-medium text-slate-900">{relatedVendor}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Assigned To</p>
            <p className="mt-1 font-medium text-slate-900">{assignedTo}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Due Date</p>
            <p className="mt-1 font-medium text-slate-900">{dueDate}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Priority</p>
            <p className="mt-1 font-medium text-slate-900">{priority}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Status</p>
            <p className="mt-1 font-medium text-slate-900">{status}</p>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm text-slate-500">Estimated Time (Optional)</p>
            <p className="mt-1 font-medium text-slate-900">{estimatedTime}</p>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm text-slate-500">Description</p>
            <p className="mt-1 text-sm text-slate-700">{description}</p>
          </div>

          <div className="md:col-span-2">
            <p className="text-sm text-slate-500">Notes</p>
            <p className="mt-1 text-sm text-slate-700">{notes}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
