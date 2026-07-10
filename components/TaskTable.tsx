export type TaskRow = {
  id: string;
  taskName: string;
  category: string;
  assignedTo: string;
  relatedVendor: string;
  dueDate: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "Not Started" | "In Progress" | "Waiting" | "Completed" | "Cancelled";
};

const priorityStyles: Record<TaskRow["priority"], string> = {
  Low: "bg-slate-100 text-slate-700",
  Medium: "bg-sky-100 text-sky-700",
  High: "bg-amber-100 text-amber-700",
  Urgent: "bg-rose-100 text-rose-700",
};

const statusStyles: Record<TaskRow["status"], string> = {
  "Not Started": "bg-slate-100 text-slate-700",
  "In Progress": "bg-sky-100 text-sky-700",
  Waiting: "bg-amber-100 text-amber-700",
  Completed: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-rose-100 text-rose-700",
};

type TaskTableProps = {
  rows: TaskRow[];
  selectedTaskId: string;
  onSelectTask: (taskId: string) => void;
  onViewTask: (taskId: string) => void;
  onEditTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
};

export function TaskTable({
  rows,
  selectedTaskId,
  onSelectTask,
  onViewTask,
  onEditTask,
  onDeleteTask,
}: TaskTableProps) {
  return (
    <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-4">Task Name</th>
              <th className="px-4 py-4">Category</th>
              <th className="px-4 py-4">Assigned To</th>
              <th className="px-4 py-4">Related Vendor</th>
              <th className="px-4 py-4">Due Date</th>
              <th className="px-4 py-4">Priority</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-sm text-slate-500">
                  No tasks match the current search and filters.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className={`cursor-pointer transition hover:bg-slate-50 ${selectedTaskId === row.id ? "bg-rose-50/60" : ""}`}
                  onClick={() => onSelectTask(row.id)}
                >
                  <td className="px-4 py-4 font-medium text-slate-900">{row.taskName}</td>
                  <td className="px-4 py-4 text-slate-700">{row.category}</td>
                  <td className="px-4 py-4 text-slate-700">{row.assignedTo}</td>
                  <td className="px-4 py-4 text-slate-700">{row.relatedVendor}</td>
                  <td className="px-4 py-4 text-slate-700">{row.dueDate}</td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${priorityStyles[row.priority]}`}>
                      {row.priority}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[row.status]}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onViewTask(row.id);
                        }}
                        className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-200"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onEditTask(row.id);
                        }}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-slate-300"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onDeleteTask(row.id);
                        }}
                        className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700 transition hover:bg-rose-100"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
