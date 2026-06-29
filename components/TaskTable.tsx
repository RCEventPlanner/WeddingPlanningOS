type TaskRow = {
  taskName: string;
  category: string;
  assignedTo: string;
  dueDate: string;
  priority: string;
  status: string;
};

const taskRows: TaskRow[] = [
  {
    taskName: "Confirm Venue Booking",
    category: "Venue",
    assignedTo: "Rachel Chong",
    dueDate: "15 Aug 2026",
    priority: "High",
    status: "In Progress",
  },
  {
    taskName: "Finalize Decoration Theme",
    category: "Decoration",
    assignedTo: "Alicia Tan",
    dueDate: "20 Aug 2026",
    priority: "Medium",
    status: "Pending",
  },
  {
    taskName: "Confirm Photographer",
    category: "Photography",
    assignedTo: "Evan Lim",
    dueDate: "10 Aug 2026",
    priority: "High",
    status: "Completed",
  },
];

export function TaskTable() {
  return (
    <section className="mt-6 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-4">Task Name</th>
            <th className="px-4 py-4">Category</th>
            <th className="px-4 py-4">Assigned To</th>
            <th className="px-4 py-4">Due Date</th>
            <th className="px-4 py-4">Priority</th>
            <th className="px-4 py-4">Status</th>
            <th className="px-4 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {taskRows.map((row) => (
            <tr key={row.taskName} className="hover:bg-slate-50">
              <td className="px-4 py-4 font-medium text-slate-900">{row.taskName}</td>
              <td className="px-4 py-4 text-slate-700">{row.category}</td>
              <td className="px-4 py-4 text-slate-700">{row.assignedTo}</td>
              <td className="px-4 py-4 text-slate-700">{row.dueDate}</td>
              <td className="px-4 py-4 text-slate-700">{row.priority}</td>
              <td className="px-4 py-4 text-slate-700">{row.status}</td>
              <td className="px-4 py-4 space-x-2 whitespace-nowrap">
                <button className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-200">
                  View
                </button>
                <button className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-200">
                  Edit
                </button>
                <button className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-200">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
