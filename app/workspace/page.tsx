'use client';

import { useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import { TopNav } from "../../components/TopNav";
import { WeddingHeader } from "../../components/WeddingHeader";

const workspaces = [
  {
    id: "aurora",
    name: "Aurora & Noah",
    date: "14 September 2026",
    couple: "Aurora Lim & Noah Tan",
    venue: "The Garden Hall, Kuala Lumpur",
    status: "Active",
    members: 8,
    access: ["Wedding Profile", "Guests", "Budget", "Vendors", "Live Rundown"],
  },
  {
    id: "solstice",
    name: "Solstice Celebration",
    date: "08 November 2026",
    couple: "Maya Chen & Ethan Lee",
    venue: "Skyline Pavilion, Penang",
    status: "Planning",
    members: 6,
    access: ["Wedding Profile", "RSVP", "Tasks", "Vendors"],
  },
  {
    id: "evermore",
    name: "Evermore Wedding",
    date: "02 February 2027",
    couple: "Alicia Wong & Ryan Koh",
    venue: "Riverside Estate, Johor",
    status: "Archived",
    members: 4,
    access: ["Wedding Profile", "Budget", "Guest List"],
  },
];

export default function WorkspacePage() {
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(workspaces[0]?.id ?? "");
  const selectedWorkspace =
    workspaces.find((workspace) => workspace.id === selectedWorkspaceId) ?? workspaces[0];

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-8 lg:ml-72 lg:p-10">
        <TopNav title="Workspace" />
        <WeddingHeader />

        <div className="mt-6 space-y-6">
          <section className="grid gap-4 xl:grid-cols-[1.45fr_0.95fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">Wedding Workspace List</p>
                  <h2 className="text-xl font-semibold text-slate-900">Your Weddings</h2>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {workspaces.length} workspaces
                </span>
              </div>

              <div className="space-y-3">
                {workspaces.map((workspace) => {
                  const isSelected = selectedWorkspaceId === workspace.id;

                  return (
                    <div
                      key={workspace.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedWorkspaceId(workspace.id)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setSelectedWorkspaceId(workspace.id);
                        }
                      }}
                      className={`w-full rounded-2xl border p-4 text-left transition ${
                        isSelected
                          ? "border-rose-300 bg-rose-50 shadow-sm"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-base font-semibold text-slate-900">{workspace.name}</h3>
                          <p className="mt-1 text-sm text-slate-500">{workspace.date}</p>
                        </div>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            workspace.status === "Active"
                              ? "bg-emerald-100 text-emerald-700"
                              : workspace.status === "Planning"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {workspace.status}
                        </span>
                      </div>

                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Couple
                          </p>
                          <p className="mt-1 text-sm text-slate-700">{workspace.couple}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Venue
                          </p>
                          <p className="mt-1 text-sm text-slate-700">{workspace.venue}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          {workspace.members} members
                        </span>
                        <button
                          type="button"
                          className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-slate-300 hover:bg-white"
                        >
                          Archive
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4">
                <p className="text-sm font-medium text-slate-500">Create Wedding</p>
                <h2 className="text-xl font-semibold text-slate-900">New Workspace</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Wedding name</label>
                  <input
                    type="text"
                    placeholder="Enter wedding name"
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Couple name</label>
                  <input
                    type="text"
                    placeholder="Partner names"
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-600">Wedding date</label>
                    <input
                      type="date"
                      className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-600">Status</label>
                    <select className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100">
                      <option>Active</option>
                      <option>Planning</option>
                      <option>Archived</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Venue</label>
                  <input
                    type="text"
                    placeholder="Venue name"
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Remarks (Internal)</label>
                  <textarea
                    rows={4}
                    placeholder="Add internal planning notes or reminders"
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                  <p className="mt-2 text-xs text-slate-400">Visible only to Planner and Master Account.</p>
                </div>

                <div className="rounded-2xl bg-slate-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Workspace preview</p>
                  <p className="mt-1 text-sm text-slate-600">A new wedding workspace will appear here after creation.</p>
                </div>

                <button
                  type="button"
                  className="w-full rounded-2xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600"
                >
                  Create Workspace
                </button>
              </div>
            </div>
          </section>

          <section className="grid gap-4 xl:grid-cols-[1.45fr_1.05fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4">
                <p className="text-sm font-medium text-slate-500">Workspace Switcher</p>
                <h2 className="text-xl font-semibold text-slate-900">Switch Wedding</h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {workspaces.map((workspace) => {
                  const isSelected = selectedWorkspaceId === workspace.id;

                  return (
                    <button
                      key={workspace.id}
                      type="button"
                      onClick={() => setSelectedWorkspaceId(workspace.id)}
                      className={`rounded-2xl border px-4 py-3 text-left transition ${
                        isSelected
                          ? "border-rose-300 bg-rose-50"
                          : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{workspace.name}</p>
                          <p className="mt-1 text-xs text-slate-500">{workspace.date}</p>
                        </div>
                        <span className="rounded-full bg-white px-2 py-1 text-[10px] font-semibold text-slate-500 shadow-sm">
                          {workspace.status}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4">
                <p className="text-sm font-medium text-slate-500">Workspace Settings Preview</p>
                <h2 className="text-xl font-semibold text-slate-900">Current Workspace</h2>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Wedding info</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">{selectedWorkspace?.name}</p>
                  <p className="mt-1 text-sm text-slate-600">{selectedWorkspace?.date}</p>
                  <p className="mt-1 text-sm text-slate-600">{selectedWorkspace?.couple}</p>
                  <p className="mt-1 text-sm text-slate-600">{selectedWorkspace?.venue}</p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Members summary</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-900">{selectedWorkspace?.members} members</span>
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-500 shadow-sm">
                      {selectedWorkspace?.status}
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Module access summary</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedWorkspace?.access.map((module) => (
                      <span key={module} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                        {module}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
