type RundownRow = {
  status: "Completed" | "Current" | "Upcoming";
  time: string;
  program: string;
  usedTime: string;
  foodServing: string;
  song: string;
  screen: string;
  remarks: string;
  responsibleRoles: string[];
  coordinator: string;
};

const rundownRows: RundownRow[] = [
  {
    status: "Completed",
    time: "6:30 PM",
    program: "Guest Registration",
    usedTime: "30 mins",
    foodServing: "-",
    song: "Background Playlist",
    screen: "Welcome Slide",
    remarks: "Reception ready",
    responsibleRoles: ["Reception"],
    coordinator: "Rachel Chong",
  },
  {
    status: "Current",
    time: "7:00 PM",
    program: "First March In",
    usedTime: "10 mins",
    foodServing: "1st Course",
    song: "Canon in D",
    screen: "Opening Animation",
    remarks: "Standby all teams",
    responsibleRoles: ["Planner", "MC", "DJ", "Photographer", "Videographer"],
    coordinator: "Rachel Chong",
  },
  {
    status: "Upcoming",
    time: "7:20 PM",
    program: "Opening Speech",
    usedTime: "5 mins",
    foodServing: "-",
    song: "Speech Music",
    screen: "Couple Introduction",
    remarks: "MC standby",
    responsibleRoles: ["MC"],
    coordinator: "Rachel Chong",
  },
];

const statusStyles: Record<RundownRow["status"], string> = {
  Completed: "bg-emerald-100 text-emerald-700",
  Current: "bg-amber-100 text-amber-700",
  Upcoming: "bg-slate-100 text-slate-600",
};

const statusIcons: Record<RundownRow["status"], string> = {
  Completed: "✔",
  Current: "▶",
  Upcoming: "○",
};

export function LiveRundownBoard() {
  return (
    <section className="mt-6 space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Current Event</p>
        <p className="mt-3 text-2xl font-semibold text-slate-900">First March In</p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-1 flex-col gap-3 md:flex-row">
            <div className="md:flex-1">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Search Program
              </label>
              <input
                type="text"
                placeholder="Search Program"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
              />
            </div>

            <div className="md:w-72">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Filter by Responsible Role (Optional)
              </label>
              <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400" defaultValue="All Roles">
                <option value="All Roles">All Roles</option>
                <option value="Reception">Reception</option>
                <option value="Planner">Planner</option>
                <option value="MC">MC</option>
                <option value="DJ">DJ</option>
                <option value="Photographer">Photographer</option>
                <option value="Videographer">Videographer</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <span className="text-sm font-medium text-slate-700">View Mode</span>
            <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1">
              <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                Full Rundown
              </button>
              <button
                disabled
                className="cursor-not-allowed rounded-full px-4 py-2 text-sm font-medium text-slate-400"
              >
                My Rundown
              </button>
            </div>
          </div>
        </div>

        <p className="mt-3 text-sm text-slate-500">
          My Rundown will be available after authentication and role management are implemented.
        </p>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Time</th>
              <th className="px-4 py-4">Program</th>
              <th className="px-4 py-4">Used Time</th>
              <th className="px-4 py-4">Food Serving</th>
              <th className="px-4 py-4">Song</th>
              <th className="px-4 py-4">Screen</th>
              <th className="px-4 py-4">Remarks</th>
              <th className="px-4 py-4">Responsible Roles</th>
              <th className="px-4 py-4">Coordinator</th>
              <th className="px-4 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {rundownRows.map((row) => (
              <tr key={`${row.time}-${row.program}`} className="align-top hover:bg-slate-50">
                <td className="px-4 py-4">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[row.status]}`}
                  >
                    <span>{statusIcons[row.status]}</span>
                    <span>{row.status}</span>
                  </span>
                </td>
                <td className="px-4 py-4 font-medium text-slate-900">{row.time}</td>
                <td className="px-4 py-4 text-slate-700">{row.program}</td>
                <td className="px-4 py-4 text-slate-700">{row.usedTime}</td>
                <td className="px-4 py-4 text-slate-700">{row.foodServing}</td>
                <td className="px-4 py-4 text-slate-700">{row.song}</td>
                <td className="px-4 py-4 text-slate-700">{row.screen}</td>
                <td className="px-4 py-4 text-slate-700">{row.remarks}</td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1">
                    {row.responsibleRoles.map((role) => (
                      <span
                        key={`${row.program}-${role}`}
                        className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4 text-slate-700">{row.coordinator}</td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    <button className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-200">
                      View
                    </button>
                    <button className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-200">
                      Edit
                    </button>
                    <button className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-200">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
