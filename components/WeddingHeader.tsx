"use client";

import { useWorkspaceProfile } from "./workspace/WorkspaceContext";

type WeddingHeaderProps = {
  workspaceName?: string;
  weddingDate?: string;
  countdown?: string;
  venue?: string;
  service?: string;
  status?: string;
  assignedPlanner?: string;
  leadCoordinator?: string;
};

const mockToday = new Date("2026-07-03T00:00:00");

function getDaysRemainingLabel(weddingDate: string) {
  const weddingTime = new Date(`${weddingDate}T00:00:00`).getTime();
  const todayTime = mockToday.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const delta = Math.ceil((weddingTime - todayTime) / oneDay);

  if (delta < 0) {
    return "Completed";
  }

  if (delta === 0) {
    return "Today";
  }

  return `${delta} Days Remaining`;
}

function formatWeddingDate(dateValue: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${dateValue}T00:00:00`));
}

export function WeddingHeader({
  workspaceName,
  weddingDate,
  countdown,
  venue,
  service,
  status,
  assignedPlanner,
  leadCoordinator,
}: WeddingHeaderProps) {
  const { workspaceProfile } = useWorkspaceProfile();

  const resolvedWorkspaceName = workspaceName ?? workspaceProfile.workspaceName;
  const resolvedWeddingDate = weddingDate ?? workspaceProfile.weddingDate;
  const resolvedCountdown = countdown ?? getDaysRemainingLabel(resolvedWeddingDate);
  const resolvedVenue = venue ?? workspaceProfile.venue;
  const resolvedService = service ?? workspaceProfile.service;
  const resolvedStatus = status ?? workspaceProfile.status;
  const resolvedAssignedPlanner = assignedPlanner ?? workspaceProfile.assignedPlanner;
  const resolvedLeadCoordinator = leadCoordinator ?? workspaceProfile.leadCoordinator;

  return (
    <section className="mb-6 rounded-3xl border border-slate-200 bg-gradient-to-r from-rose-50 via-white to-slate-50 p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium text-rose-500">Wedding Overview</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900 sm:text-3xl">
            {resolvedWorkspaceName}
          </h1>

          <div className="mt-4 grid gap-3 text-sm text-slate-700 sm:grid-cols-2 xl:grid-cols-4">
            <p><span className="font-semibold text-slate-900">Wedding Date:</span> {formatWeddingDate(resolvedWeddingDate)}</p>
            <p><span className="font-semibold text-slate-900">Days Remaining:</span> {resolvedCountdown}</p>
            <p><span className="font-semibold text-slate-900">Venue:</span> {resolvedVenue}</p>
            <p><span className="font-semibold text-slate-900">Service:</span> {resolvedService}</p>
            <p><span className="font-semibold text-slate-900">Workspace Status:</span> {resolvedStatus}</p>
            <p><span className="font-semibold text-slate-900">Assigned Planner:</span> {resolvedAssignedPlanner}</p>
            <p><span className="font-semibold text-slate-900">Lead Coordinator:</span> {resolvedLeadCoordinator}</p>
          </div>
        </div>

        <button className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-rose-200 hover:text-rose-600">
          Edit Workspace
        </button>
      </div>
    </section>
  );
}
