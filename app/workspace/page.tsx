"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "../../components/Sidebar";
import { TopNav } from "../../components/TopNav";
import { useWorkspaceProfile } from "../../components/workspace/WorkspaceContext";

type Workspace = {
  id: string;
  workspaceName: string;
  weddingDate: string;
  coupleOne: string;
  coupleTwo: string;
  venue: string;
  service: "Full Planning" | "Half Planning" | "Coordination" | "Website Only";
  status: "Active" | "Read Only" | "Archived";
  members: number;
  assignedPlanner: string;
  leadCoordinator: string;
  access: string[];
};

const mockToday = new Date("2026-07-03T00:00:00");

const baseWorkspaces: Workspace[] = [
  {
    id: "aurora",
    workspaceName: "Aurora & Noah Wedding",
    weddingDate: "2026-09-14",
    coupleOne: "Aurora Lim",
    coupleTwo: "Noah Tan",
    venue: "The Garden Hall, Kuala Lumpur",
    service: "Full Planning",
    status: "Active",
    members: 8,
    assignedPlanner: "Amanda Low",
    leadCoordinator: "Hafiz Rahman",
    access: ["Wedding Profile", "Guests", "Budget", "Vendors", "Live Rundown"],
  },
  {
    id: "solstice",
    workspaceName: "Solstice Celebration Wedding",
    weddingDate: "2026-11-08",
    coupleOne: "Maya Chen",
    coupleTwo: "Ethan Lee",
    venue: "Skyline Pavilion, Penang",
    service: "Half Planning",
    status: "Read Only",
    members: 6,
    assignedPlanner: "Nurul Syafiqah",
    leadCoordinator: "Daniel Ong",
    access: ["Wedding Profile", "RSVP", "Tasks", "Vendors"],
  },
  {
    id: "evermore",
    workspaceName: "Evermore Wedding",
    weddingDate: "2027-02-02",
    coupleOne: "Alicia Wong",
    coupleTwo: "Ryan Koh",
    venue: "Riverside Estate, Johor",
    service: "Coordination",
    status: "Archived",
    members: 4,
    assignedPlanner: "Rina Tan",
    leadCoordinator: "Marcus Lim",
    access: ["Wedding Profile", "Budget", "Guest List"],
  },
  {
    id: "snowdrop",
    workspaceName: "Snowdrop Ceremony Wedding",
    weddingDate: "2026-05-30",
    coupleOne: "Evelyn Chia",
    coupleTwo: "Shaun Teo",
    venue: "Bayfront Chapel, Sabah",
    service: "Website Only",
    status: "Archived",
    members: 3,
    assignedPlanner: "Amanda Low",
    leadCoordinator: "Nadia Karim",
    access: ["Wedding Profile", "RSVP"],
  },
];

function parseDate(dateValue: string) {
  return new Date(`${dateValue}T00:00:00`);
}

function formatWeddingDate(dateValue: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(parseDate(dateValue));
}

function getDaysDelta(dateValue: string) {
  const weddingTime = parseDate(dateValue).getTime();
  const todayTime = mockToday.getTime();
  const oneDay = 1000 * 60 * 60 * 24;

  return Math.ceil((weddingTime - todayTime) / oneDay);
}

function getCountdownLabel(dateValue: string) {
  const delta = getDaysDelta(dateValue);

  if (delta < 0) {
    return "Completed";
  }

  if (delta === 0) {
    return "Today";
  }

  return `${delta} Days Remaining`;
}

function getServiceBadgeStyle(service: Workspace["service"]) {
  if (service === "Full Planning") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (service === "Half Planning") {
    return "bg-sky-100 text-sky-700";
  }

  if (service === "Coordination") {
    return "bg-orange-100 text-orange-700";
  }

  return "bg-slate-200 text-slate-700";
}

function getServiceBadgeLabel(service: Workspace["service"]) {
  if (service === "Full Planning") {
    return "🟢 Full Planning";
  }

  if (service === "Half Planning") {
    return "🔵 Half Planning";
  }

  if (service === "Coordination") {
    return "🟠 Coordination";
  }

  return "⚪ Website Only";
}

function getStatusStyle(status: Workspace["status"]) {
  if (status === "Active") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (status === "Read Only") {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-slate-200 text-slate-600";
}

export default function WorkspacePage() {
  const router = useRouter();
  const { workspaceProfile } = useWorkspaceProfile();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [createForm, setCreateForm] = useState({
    workspaceName: "",
    coupleOne: "",
    coupleTwo: "",
    weddingDate: "",
    venue: "",
    service: "Full Planning" as Workspace["service"],
    status: "Active" as Workspace["status"],
    internalRemarks: "",
  });

  const workspaces = useMemo(() => {
    return baseWorkspaces.map((workspace) => {
      if (workspace.id !== "aurora") {
        return workspace;
      }

      return {
        ...workspace,
        workspaceName: workspaceProfile.workspaceName,
        coupleOne: workspaceProfile.coupleOne,
        coupleTwo: workspaceProfile.coupleTwo,
        weddingDate: workspaceProfile.weddingDate,
        venue: workspaceProfile.venue,
        service: workspaceProfile.service,
        status: workspaceProfile.status,
        assignedPlanner: workspaceProfile.assignedPlanner,
        leadCoordinator: workspaceProfile.leadCoordinator,
      };
    });
  }, [workspaceProfile]);

  const sortedWorkspaces = useMemo(() => {
    return [...workspaces].sort((left, right) => {
      return parseDate(left.weddingDate).getTime() - parseDate(right.weddingDate).getTime();
    });
  }, [workspaces]);

  const filteredWorkspaces = useMemo(() => {
    const normalized = searchQuery.trim().toLowerCase();

    if (!normalized) {
      return sortedWorkspaces;
    }

    return sortedWorkspaces.filter((workspace) => {
      return (
        workspace.workspaceName.toLowerCase().includes(normalized) ||
        workspace.coupleOne.toLowerCase().includes(normalized) ||
        workspace.coupleTwo.toLowerCase().includes(normalized) ||
        workspace.venue.toLowerCase().includes(normalized)
      );
    });
  }, [searchQuery, sortedWorkspaces]);

  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(sortedWorkspaces[0]?.id ?? "");

  const selectedWorkspace =
    filteredWorkspaces.find((workspace) => workspace.id === selectedWorkspaceId) ??
    filteredWorkspaces[0] ??
    sortedWorkspaces[0];

  const enterWorkspace = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <Sidebar mode="planner" />

      <main className="flex-1 p-6 sm:p-8 lg:ml-[var(--sidebar-width)] lg:p-10">
        <TopNav title="Workspace" />

        <div className="mt-4 space-y-4">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">Workspace</h1>
                <p className="mt-1 text-sm text-slate-500">
                  Manage wedding workspaces and review workspace details before entering each planning environment.
                </p>
              </div>

              <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto md:items-center md:justify-end">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search workspace"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 sm:min-w-64"
                />
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(true)}
                  className="rounded-2xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600"
                >
                  Add Workspace
                </button>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.25fr_0.95fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-slate-500">Wedding Workspace List</p>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {filteredWorkspaces.length} workspaces
                </span>
              </div>

              <div className="space-y-3">
                {filteredWorkspaces.map((workspace) => {
                  const isSelected = selectedWorkspaceId === workspace.id;

                  return (
                    <div
                      key={workspace.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedWorkspaceId(workspace.id)}
                      onDoubleClick={() => {
                        setSelectedWorkspaceId(workspace.id);
                        enterWorkspace();
                      }}
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
                      <div className="flex items-start justify-between gap-2">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getServiceBadgeStyle(workspace.service)}`}
                        >
                          {getServiceBadgeLabel(workspace.service)}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyle(workspace.status)}`}
                        >
                          {workspace.status}
                        </span>
                      </div>

                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Workspace Name</p>
                          <p className="mt-1 text-sm text-slate-900 font-semibold">{workspace.workspaceName}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Wedding Date</p>
                          <p className="mt-1 text-sm text-slate-700">{formatWeddingDate(workspace.weddingDate)}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Days Remaining</p>
                          <p className="mt-1 text-sm font-semibold text-slate-900">{getCountdownLabel(workspace.weddingDate)}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Venue</p>
                          <p className="mt-1 text-sm text-slate-700">{workspace.venue}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        <span>{workspace.members} Members</span>
                        <span>{workspace.status}</span>
                      </div>
                    </div>
                  );
                })}

                {filteredWorkspaces.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                    No workspace matches the current search.
                  </div>
                ) : null}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">Workspace Details</p>
                  <h2 className="text-xl font-semibold text-slate-900">Workspace Summary</h2>
                </div>
                <button
                  type="button"
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Edit Workspace
                </button>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Workspace Summary</p>
                      <h3 className="mt-1 text-xl font-semibold text-slate-900">{selectedWorkspace?.workspaceName}</h3>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyle(selectedWorkspace?.status ?? "Archived")}`}>
                      {selectedWorkspace?.status}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Wedding Date</p>
                      <p className="mt-1 text-sm text-slate-700">
                        {selectedWorkspace ? formatWeddingDate(selectedWorkspace.weddingDate) : "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Days Remaining</p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">
                        {selectedWorkspace ? getCountdownLabel(selectedWorkspace.weddingDate) : "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Venue</p>
                      <p className="mt-1 text-sm text-slate-700">{selectedWorkspace?.venue}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Service</p>
                      <p className="mt-1 text-sm text-slate-700">{selectedWorkspace?.service}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Assigned Planner</p>
                      <p className="mt-1 text-sm text-slate-700">{selectedWorkspace?.assignedPlanner}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Lead Coordinator</p>
                      <p className="mt-1 text-sm text-slate-700">{selectedWorkspace?.leadCoordinator}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Workspace Details</p>
                  <div className="mt-2 space-y-1.5 text-sm text-slate-700">
                    <p>
                      <span className="font-semibold text-slate-900">Workspace Name:</span> {selectedWorkspace?.workspaceName}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">Couple Names:</span> {selectedWorkspace?.coupleOne} &amp; {selectedWorkspace?.coupleTwo}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">Wedding Date:</span>{" "}
                      {selectedWorkspace ? formatWeddingDate(selectedWorkspace.weddingDate) : "-"}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">Days Remaining:</span>{" "}
                      {selectedWorkspace ? getCountdownLabel(selectedWorkspace.weddingDate) : "-"}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">Venue:</span> {selectedWorkspace?.venue}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">Service:</span> {selectedWorkspace?.service}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">Status:</span> {selectedWorkspace?.status}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">Assigned Planner:</span> {selectedWorkspace?.assignedPlanner}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">Lead Coordinator:</span> {selectedWorkspace?.leadCoordinator}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Team Summary</p>
                  <div className="mt-2 space-y-1.5 text-sm text-slate-700">
                    <p>
                      <span className="font-semibold text-slate-900">Assigned Planner:</span> {selectedWorkspace?.assignedPlanner}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">Lead Coordinator:</span> {selectedWorkspace?.leadCoordinator}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">Total Members:</span> {selectedWorkspace?.members}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Module Access Summary</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedWorkspace?.access.map((module) => (
                      <span
                        key={module}
                        className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm"
                      >
                        {module}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Access Mode</p>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-xs font-semibold">
                    <span
                      className={`rounded-xl px-2 py-2 text-center ${
                        selectedWorkspace?.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-white text-slate-500"
                      }`}
                    >
                      Active
                    </span>
                    <span
                      className={`rounded-xl px-2 py-2 text-center ${
                        selectedWorkspace?.status === "Read Only"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-white text-slate-500"
                      }`}
                    >
                      Read Only
                    </span>
                    <span
                      className={`rounded-xl px-2 py-2 text-center ${
                        selectedWorkspace?.status === "Archived"
                          ? "bg-slate-300 text-slate-700"
                          : "bg-white text-slate-500"
                      }`}
                    >
                      Archived
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={enterWorkspace}
                  className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700"
                >
                  Enter Workspace
                </button>
              </div>
            </div>
          </section>
        </div>

        {isCreateModalOpen ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Create Wedding Workspace"
          >
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-6">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">Create Wedding Workspace</p>
                  <h2 className="text-xl font-semibold text-slate-900">New Workspace Form</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600"
                >
                  Close
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Workspace Name</label>
                  <input
                    type="text"
                    value={createForm.workspaceName}
                    onChange={(event) => setCreateForm((prev) => ({ ...prev, workspaceName: event.target.value }))}
                    placeholder="Enter workspace name"
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-600">Couple 1</label>
                    <input
                      type="text"
                      value={createForm.coupleOne}
                      onChange={(event) => setCreateForm((prev) => ({ ...prev, coupleOne: event.target.value }))}
                      placeholder="First partner name"
                      className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-600">Couple 2</label>
                    <input
                      type="text"
                      value={createForm.coupleTwo}
                      onChange={(event) => setCreateForm((prev) => ({ ...prev, coupleTwo: event.target.value }))}
                      placeholder="Second partner name"
                      className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Wedding Date</label>
                  <input
                    type="date"
                    value={createForm.weddingDate}
                    onChange={(event) => setCreateForm((prev) => ({ ...prev, weddingDate: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Venue</label>
                  <input
                    type="text"
                    value={createForm.venue}
                    onChange={(event) => setCreateForm((prev) => ({ ...prev, venue: event.target.value }))}
                    placeholder="Venue name"
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Service</label>
                  <select
                    value={createForm.service}
                    onChange={(event) =>
                      setCreateForm((prev) => ({ ...prev, service: event.target.value as Workspace["service"] }))
                    }
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  >
                    <option value="Full Planning">Full Planning</option>
                    <option value="Half Planning">Half Planning</option>
                    <option value="Coordination">Coordination</option>
                    <option value="Website Only">Website Only</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Status</label>
                  <select
                    value={createForm.status}
                    onChange={(event) =>
                      setCreateForm((prev) => ({ ...prev, status: event.target.value as Workspace["status"] }))
                    }
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  >
                    <option value="Active">Active</option>
                    <option value="Read Only">Read Only</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-slate-600">Internal Remarks</label>
                  <textarea
                    rows={4}
                    value={createForm.internalRemarks}
                    onChange={(event) => setCreateForm((prev) => ({ ...prev, internalRemarks: event.target.value }))}
                    placeholder="Add internal planning notes or reminders"
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="rounded-2xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600"
                >
                  Create Workspace
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
