"use client";

import { useState } from "react";

type RundownRow = {
  status: "Completed" | "Current" | "Upcoming" | "Delayed" | "Skipped" | "Cancelled";
  time: string;
  scheduledTime: string;
  actualStartTime: string;
  expectedDuration: string;
  actualDuration: string;
  delay: string;
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
    scheduledTime: "6:30 PM",
    actualStartTime: "6:28 PM",
    expectedDuration: "30 mins",
    actualDuration: "28 mins",
    delay: "—",
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
    scheduledTime: "7:00 PM",
    actualStartTime: "7:00 PM",
    expectedDuration: "10 mins",
    actualDuration: "8 mins",
    delay: "2 mins",
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
    scheduledTime: "7:20 PM",
    actualStartTime: "7:20 PM",
    expectedDuration: "5 mins",
    actualDuration: "—",
    delay: "—",
    program: "Opening Speech",
    usedTime: "5 mins",
    foodServing: "-",
    song: "Speech Music",
    screen: "Couple Introduction",
    remarks: "MC standby",
    responsibleRoles: ["MC"],
    coordinator: "Rachel Chong",
  },
  {
    status: "Delayed",
    time: "7:45 PM",
    scheduledTime: "7:45 PM",
    actualStartTime: "7:52 PM",
    expectedDuration: "15 mins",
    actualDuration: "17 mins",
    delay: "7 mins",
    program: "Dinner Service",
    usedTime: "15 mins",
    foodServing: "2nd Course",
    song: "Soft Piano",
    screen: "Dinner Slide",
    remarks: "Kitchen delayed",
    responsibleRoles: ["Coordinator", "Catering"],
    coordinator: "Rachel Chong",
  },
  {
    status: "Skipped",
    time: "8:10 PM",
    scheduledTime: "8:10 PM",
    actualStartTime: "—",
    expectedDuration: "10 mins",
    actualDuration: "—",
    delay: "Skipped",
    program: "Family Photo Session",
    usedTime: "10 mins",
    foodServing: "-",
    song: "Photo Music",
    screen: "Family Photo",
    remarks: "Photography team on hold",
    responsibleRoles: ["Photographer", "Videographer"],
    coordinator: "Rachel Chong",
  },
  {
    status: "Cancelled",
    time: "8:30 PM",
    scheduledTime: "8:30 PM",
    actualStartTime: "—",
    expectedDuration: "20 mins",
    actualDuration: "—",
    delay: "Cancelled",
    program: "Cake Cutting",
    usedTime: "20 mins",
    foodServing: "Dessert",
    song: "Wedding March",
    screen: "Cake Slide",
    remarks: "Cancelled due to venue change",
    responsibleRoles: ["Planner", "Coordinator"],
    coordinator: "Rachel Chong",
  },
];

const statusStyles: Record<RundownRow["status"], string> = {
  Upcoming: "bg-slate-200 text-slate-700",
  Current: "bg-blue-100 text-blue-700",
  Completed: "bg-emerald-100 text-emerald-700",
  Delayed: "bg-orange-100 text-orange-700",
  Skipped: "bg-violet-100 text-violet-700",
  Cancelled: "bg-red-100 text-red-700",
};

const statusIcons: Record<RundownRow["status"], string> = {
  Completed: "✔",
  Current: "▶",
  Upcoming: "○",
  Delayed: "⏱",
  Skipped: "∅",
  Cancelled: "✖",
};

export function LiveRundownBoard() {
  const [viewMode, setViewMode] = useState<"Full Rundown" | "My Rundown">("Full Rundown");
  const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);
  const [detailOpenIndex, setDetailOpenIndex] = useState<number | null>(null);
  const [editOpenIndex, setEditOpenIndex] = useState<number | null>(null);

  const handleViewDetail = (index: number) => {
    setMenuOpenIndex(null);
    setDetailOpenIndex(detailOpenIndex === index ? null : index);
    setEditOpenIndex(null);
  };

  const handleEdit = (index: number) => {
    setMenuOpenIndex(null);
    setDetailOpenIndex(null);
    setEditOpenIndex(editOpenIndex === index ? null : index);
  };

  return (
    <section className="mt-6 space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Current Event</p>
        <p className="mt-3 text-2xl font-semibold text-slate-900">First March In</p>
      </div>

      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-amber-900">Timeline Shift Status</p>
            <p className="text-sm text-amber-800">Wedding is currently delayed by +8 minutes.</p>
          </div>
          <button
            type="button"
            className="rounded-full border border-amber-200 bg-white px-4 py-2 text-sm font-semibold text-amber-900 disabled:cursor-not-allowed disabled:opacity-70"
            disabled
          >
            Recalculate Timeline
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Delay</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">+8 mins</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Affected Events</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">4</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Last Updated</p>
          <p className="mt-2 text-base font-semibold text-slate-900">7:05 PM</p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-900">Timeline Preview</p>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">Demo</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
            <span className="text-sm font-medium text-slate-700">Opening Ceremony</span>
            <span className="text-sm font-semibold text-slate-900">7:00 PM → 7:08 PM</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
            <span className="text-sm font-medium text-slate-700">Cake Cutting</span>
            <span className="text-sm font-semibold text-slate-900">8:00 PM → 8:08 PM</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
            <span className="text-sm font-medium text-slate-700">First Dance</span>
            <span className="text-sm font-semibold text-slate-900">8:30 PM → 8:38 PM</span>
          </div>
        </div>
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

            <div className="md:w-64">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Filter by Status (Optional)
              </label>
              <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400" defaultValue="All Statuses">
                <option value="All Statuses">All Statuses</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Current">Current</option>
                <option value="Completed">Completed</option>
                <option value="Delayed">Delayed</option>
                <option value="Skipped">Skipped</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <span className="text-sm font-medium text-slate-700">View Mode</span>
            <div className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1">
              <button
                type="button"
                onClick={() => setViewMode("Full Rundown")}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  viewMode === "Full Rundown" ? "bg-slate-900 text-white" : "text-slate-500"
                }`}
              >
                Full Rundown
              </button>
              <button
                type="button"
                onClick={() => setViewMode("My Rundown")}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  viewMode === "My Rundown" ? "bg-slate-900 text-white" : "text-slate-500"
                }`}
              >
                My Rundown
              </button>
            </div>
          </div>
        </div>

        <p className="mt-3 text-sm text-slate-500">
          {viewMode === "My Rundown"
            ? "My Rundown is a preview of role-specific filtering that will be enabled after authentication and permissions are implemented."
            : "Full Rundown displays every event for the wedding-day timeline."}
        </p>
      </div>

      <div className="block lg:hidden space-y-3">
        {rundownRows.map((row, index) => (
          <article key={`${row.time}-${row.program}`} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[row.status]}`}>
                <span>{statusIcons[row.status]}</span>
                <span>{row.status}</span>
              </span>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpenIndex(menuOpenIndex === index ? null : index)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-xl text-slate-700"
                  aria-label="Open actions menu"
                >
                  ⋮
                </button>

                {menuOpenIndex === index && (
                  <div className="absolute right-0 z-10 mt-2 w-40 rounded-2xl border border-slate-200 bg-white p-1 shadow-lg">
                    <button
                      type="button"
                      onClick={() => handleViewDetail(index)}
                      className="flex w-full items-center rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      View Detail
                    </button>
                    <button
                      type="button"
                      onClick={() => handleEdit(index)}
                      className="flex w-full items-center rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      Edit
                    </button>
                    <button type="button" className="flex w-full items-center rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Scheduled Time</p>
              <p className="mt-1 text-base font-semibold text-slate-900">{row.scheduledTime}</p>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Program</p>
              <p className="mt-1 text-base font-semibold text-slate-900">{row.program}</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Expected Duration</p>
                <p className="mt-1 text-sm text-slate-700">{row.expectedDuration}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Coordinator</p>
                <p className="mt-1 text-sm text-slate-700">{row.coordinator}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Responsible Roles</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {row.responsibleRoles.map((role) => (
                  <span key={`${row.program}-${role}`} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                    {role}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Remarks</p>
              <p className="mt-1 text-sm text-slate-700">{row.remarks}</p>
            </div>

            {detailOpenIndex === index && (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Time Management</p>
                    <span className="mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-white text-slate-700 border border-slate-200">
                      <span>{statusIcons[row.status]}</span>
                      <span>{row.status}</span>
                    </span>
                  </div>
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-500">
                    Detail
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Scheduled Time</p>
                    <p className="mt-1 text-sm text-slate-700">{row.scheduledTime}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Actual Start Time</p>
                    <p className="mt-1 text-sm text-slate-700">{row.actualStartTime}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Expected Duration</p>
                    <p className="mt-1 text-sm text-slate-700">{row.expectedDuration}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Actual Duration</p>
                    <p className="mt-1 text-sm text-slate-700">{row.actualDuration}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Delay</p>
                    <p className="mt-1 text-sm text-slate-700">{row.delay}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Shifted Time</p>
                    <p className="mt-1 text-sm text-slate-700">{row.scheduledTime}</p>
                  </div>
                </div>
              </div>
            )}

            {editOpenIndex === index && (
              <div className="mt-4 rounded-2xl border border-rose-100 bg-rose-50/60 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-900">Edit Time Management</p>
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-500">
                    Demo
                  </span>
                </div>

                <div className="mt-3 space-y-3">
                  <label className="block">
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Status
                    </span>
                    <select defaultValue={row.status} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-rose-400">
                      <option value="Upcoming">Upcoming</option>
                      <option value="Current">Current</option>
                      <option value="Completed">Completed</option>
                      <option value="Delayed">Delayed</option>
                      <option value="Skipped">Skipped</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Scheduled Time
                    </span>
                    <input
                      type="text"
                      defaultValue={row.scheduledTime}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-rose-400"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Actual Start Time
                    </span>
                    <input
                      type="text"
                      defaultValue={row.actualStartTime}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-rose-400"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Expected Duration
                    </span>
                    <input
                      type="text"
                      defaultValue={row.expectedDuration}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-rose-400"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Actual Duration
                    </span>
                    <input
                      type="text"
                      defaultValue={row.actualDuration}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-rose-400"
                    />
                  </label>

                  <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
                    <span className="block text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Delay
                    </span>
                    <span className="mt-1 block text-sm text-slate-700">{row.delay}</span>
                  </div>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      <div className="hidden lg:block overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
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
