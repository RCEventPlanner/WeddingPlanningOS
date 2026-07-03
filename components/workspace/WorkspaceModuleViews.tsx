"use client";

import { useMemo, useState } from "react";
import { DashboardCard } from "../DashboardCard";
import { QuickActions } from "../QuickActions";
import { RecentActivity } from "../RecentActivity";
import { WeddingHeader } from "../WeddingHeader";
import { WeddingInfoForm } from "../WeddingInfoForm";
import { WeddingProfileCard } from "../WeddingProfileCard";
import { WeddingTabs } from "../WeddingTabs";
import { BudgetDetailCard } from "../BudgetDetailCard";
import { BudgetFilter } from "../BudgetFilter";
import { BudgetForm } from "../BudgetForm";
import { BudgetOverview } from "../BudgetOverview";
import { BudgetStatistics } from "../BudgetStatistics";
import { BudgetTable } from "../BudgetTable";
import { VendorSummary } from "../VendorSummary";
import { VendorFilter } from "../VendorFilter";
import { VendorTable } from "../VendorTable";
import { VendorDetailCard } from "../VendorDetailCard";
import { TaskSummary } from "../TaskSummary";
import { TaskFilter } from "../TaskFilter";
import { TaskTable } from "../TaskTable";
import { TaskDetailCard } from "../TaskDetailCard";
import { GuestDetailCard } from "../GuestDetailCard";
import { GuestFilter } from "../GuestFilter";
import { GuestForm } from "../GuestForm";
import { GuestSearchBar } from "../GuestSearchBar";
import { GuestStatistics } from "../GuestStatistics";
import { GuestTable } from "../GuestTable";
import { RSVPDetailCard } from "../RSVPDetailCard";
import { RSVPFilter } from "../RSVPFilter";
import { RSVPForm } from "../RSVPForm";
import { RSVPOverview } from "../RSVPOverview";
import { RSVPSearchBar } from "../RSVPSearchBar";
import { RSVPStatistics } from "../RSVPStatistics";
import { RSVPTable } from "../RSVPTable";
import { LiveRundownBoard } from "../LiveRundownBoard";

export type WorkspaceModuleKey =
  | "dashboard"
  | "wedding"
  | "budget"
  | "vendors"
  | "tasks"
  | "guests"
  | "rsvp"
  | "timeline";

export type WorkspaceModuleMeta = {
  title: string;
  workspaceName?: string;
  accessMode?: string;
};

const dashboardCards = [
  {
    title: "Guests",
    icon: "👥",
    value: "284 / 300 guests",
    subtitle: "72% have replied",
    accentColor: "bg-rose-100 text-rose-600",
  },
  {
    title: "RSVP Progress",
    icon: "📨",
    value: "72% replied",
    subtitle: "Guest attendance is progressing well",
    accentColor: "bg-amber-100 text-amber-600",
  },
  {
    title: "Budget Summary",
    icon: "💰",
    value: "RM 18,200 / RM 25,000",
    subtitle: "72.8% of overall budget used",
    accentColor: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Vendors",
    icon: "🤝",
    value: "12 confirmed",
    subtitle: "3 pending confirmations",
    accentColor: "bg-sky-100 text-sky-600",
  },
  {
    title: "Tasks",
    icon: "✅",
    value: "5 due this week",
    subtitle: "Planning workload snapshot",
    accentColor: "bg-violet-100 text-violet-600",
  },
  {
    title: "Today's Events",
    icon: "🕒",
    value: "3 events",
    subtitle: "Planned wedding-day activities",
    accentColor: "bg-orange-100 text-orange-600",
  },
];

const tableAssignments = [
  { id: "table-1", label: "Table 1", capacity: 8 },
  { id: "table-2", label: "Table 2", capacity: 8 },
  { id: "table-3", label: "Table 3", capacity: 10 },
  { id: "table-4", label: "Table 4", capacity: 10 },
  { id: "table-5", label: "Table 5", capacity: 12 },
];

type Guest = {
  id: number;
  name: string;
  group: string;
  guestCount: number;
  status: "Confirmed" | "Pending" | "Declined";
  phone: string;
  emailAddress: string;
  assignedTable: string | null;
  preferredName: string;
  guestFrom: string;
  adults: number;
  children: number;
  normalMeals: number;
  vegetarianMeals: number;
  halalMeals: number;
  specialRequests?: string;
  notes?: string;
};

const initialGuests: Guest[] = [
  {
    id: 1,
    name: "Rachel Tan",
    group: "Family",
    guestCount: 4,
    status: "Confirmed",
    phone: "012-3456789",
    emailAddress: "rachel@example.com",
    assignedTable: "Table 1",
    preferredName: "Rachel",
    guestFrom: "Bride's Side",
    adults: 2,
    children: 1,
    normalMeals: 3,
    vegetarianMeals: 1,
    halalMeals: 0,
    specialRequests: "Baby chairs needed for 2 children.",
    notes: "Family guest",
  },
  {
    id: 2,
    name: "John Lim",
    group: "Friends",
    guestCount: 2,
    status: "Pending",
    phone: "012-9988776",
    emailAddress: "john@example.com",
    assignedTable: null,
    preferredName: "John",
    guestFrom: "Groom's Side",
    adults: 2,
    children: 0,
    normalMeals: 2,
    vegetarianMeals: 0,
    halalMeals: 0,
    specialRequests: "",
    notes: "",
  },
  {
    id: 3,
    name: "Siti Rahman",
    group: "Colleagues",
    guestCount: 3,
    status: "Declined",
    phone: "012-5566778",
    emailAddress: "siti@example.com",
    assignedTable: "Table 3",
    preferredName: "Siti",
    guestFrom: "Bride's Side",
    adults: 3,
    children: 0,
    normalMeals: 0,
    vegetarianMeals: 0,
    halalMeals: 0,
    specialRequests: "",
    notes: "",
  },
];

const sharedWorkspaceName = "Rachel & Kiser Wedding";

export const workspaceModuleMeta: Record<WorkspaceModuleKey, WorkspaceModuleMeta> = {
  dashboard: { title: "Dashboard", workspaceName: sharedWorkspaceName, accessMode: "Active" },
  wedding: { title: "Wedding Profile", workspaceName: sharedWorkspaceName, accessMode: "Active" },
  budget: { title: "Budget", workspaceName: sharedWorkspaceName, accessMode: "Active" },
  vendors: { title: "Vendors", workspaceName: sharedWorkspaceName, accessMode: "Active" },
  tasks: { title: "Tasks", workspaceName: sharedWorkspaceName, accessMode: "Active" },
  guests: { title: "Guests", workspaceName: sharedWorkspaceName, accessMode: "Active" },
  rsvp: { title: "RSVP", workspaceName: sharedWorkspaceName, accessMode: "Active" },
  timeline: { title: "Live Rundown", workspaceName: sharedWorkspaceName, accessMode: "Active" },
};

export function DashboardModuleView() {
  return (
    <div className="space-y-6">
      <WeddingHeader />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {dashboardCards.map((card) => (
          <DashboardCard
            key={card.title}
            title={card.title}
            value={card.value}
            subtitle={card.subtitle}
            icon={card.icon}
            accentColor={card.accentColor}
          />
        ))}
      </div>

      <section className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <p className="text-sm font-medium text-slate-500">Upcoming Tasks</p>
            <h2 className="text-xl font-semibold text-slate-900">Priority Items</h2>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-200 px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-slate-900">Finalize Emcee script</span>
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">Due Today</span>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-slate-900">Confirm photographer timing</span>
                <span className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold text-sky-700">Tomorrow</span>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-slate-900">Review seating plan</span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">Friday</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuickActions />
      <RecentActivity />
    </div>
  );
}

export function WeddingProfileModuleView() {
  return (
    <div className="p-8 sm:p-10">
      <WeddingProfileCard />
      <WeddingTabs />
      <WeddingInfoForm />
    </div>
  );
}

export function BudgetModuleView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Budget</h1>
          <p className="mt-2 text-slate-600">Monitor spending, savings, and payments in this section.</p>
        </div>

        <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
          Add Expense
        </button>
      </div>

      <BudgetOverview />

      <div className="mt-6">
        <BudgetFilter />
      </div>

      <BudgetTable />
      <BudgetForm />
      <BudgetDetailCard />
      <BudgetStatistics />
    </div>
  );
}

export function VendorsModuleView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Vendors</h1>
          <p className="mt-2 text-slate-600">Keep vendor contacts, quotes, and confirmations here.</p>
        </div>

        <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
          + Add Vendor
        </button>
      </div>

      <VendorSummary />
      <VendorFilter />
      <VendorTable />
      <VendorDetailCard />
    </div>
  );
}

export function TasksModuleView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Tasks</h1>
          <p className="mt-2 text-slate-600">Manage your wedding preparation tasks in one place.</p>
        </div>
      </div>

      <TaskSummary />
      <TaskFilter />
      <TaskTable />
      <TaskDetailCard />
    </div>
  );
}

export function GuestsModuleView() {
  const [guests, setGuests] = useState(initialGuests);
  const [selectedGuestId, setSelectedGuestId] = useState(initialGuests[0].id);

  const selectedGuest = useMemo(() => {
    return guests.find((guest) => guest.id === selectedGuestId) ?? guests[0];
  }, [guests, selectedGuestId]);

  const tableSummary = useMemo(() => {
    return tableAssignments.map((table) => {
      const assignedGuests = guests.filter((guest) => guest.assignedTable === table.label);
      return {
        ...table,
        assignedGuestsCount: assignedGuests.length,
        unassignedGuestsCount: guests.filter((guest) => guest.assignedTable === null).length,
      };
    });
  }, [guests]);

  const unassignedGuests = guests.filter((guest) => guest.assignedTable === null);

  const assignGuestTable = (guestId: number, nextTable: string) => {
    setGuests((currentGuests) =>
      currentGuests.map((guest) =>
        guest.id === guestId
          ? { ...guest, assignedTable: nextTable === "Unassigned" ? null : nextTable }
          : guest,
      ),
    );
  };

  return (
    <div className="p-8 sm:p-10">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Guests</h1>
          <p className="mt-2 text-slate-600">Track guest lists, seating ideas, and RSVP updates here.</p>
        </div>

        <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
          Add Guest
        </button>
      </div>

      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full lg:max-w-md">
          <GuestSearchBar />
        </div>
        <GuestFilter />
      </div>

      <section className="mb-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Table List Foundation</h2>
              <p className="mt-1 text-sm text-slate-600">Placeholder seating overview with assignment counts.</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {unassignedGuests.length} unassigned guests
            </span>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {tableSummary.map((table) => (
              <div key={table.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{table.label}</p>
                    <p className="text-xs text-slate-500">Table Name / Number</p>
                  </div>
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-600">
                    Capacity {table.capacity}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-white px-3 py-2 shadow-sm">
                    <p className="text-xs text-slate-500">Assigned Guests</p>
                    <p className="mt-1 font-semibold text-slate-900">{table.assignedGuestsCount}</p>
                  </div>
                  <div className="rounded-xl bg-white px-3 py-2 shadow-sm">
                    <p className="text-xs text-slate-500">Unassigned Guests</p>
                    <p className="mt-1 font-semibold text-slate-900">{table.unassignedGuestsCount}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Unassigned Guests</h2>
          <p className="mt-1 text-sm text-slate-600">Guests without a table assignment appear here until a table is selected.</p>

          <div className="mt-4 space-y-3">
            {unassignedGuests.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">
                All guests are assigned to tables.
              </div>
            ) : (
              unassignedGuests.map((guest) => (
                <button
                  key={guest.id}
                  type="button"
                  onClick={() => setSelectedGuestId(guest.id)}
                  className="flex w-full items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-left transition hover:border-rose-300 hover:bg-rose-50/40"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{guest.name}</p>
                    <p className="text-sm text-slate-500">{guest.group}</p>
                  </div>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                    Unassigned
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      </section>

      <GuestTable guests={guests} onSelectGuest={setSelectedGuestId} onAssignTable={assignGuestTable} />
      <GuestForm guest={selectedGuest} tableOptions={tableAssignments} onAssignTable={assignGuestTable} />
      <GuestDetailCard guest={selectedGuest} onAssignTable={assignGuestTable} tableOptions={tableAssignments} />
      <GuestStatistics
        totalGuests={guests.length}
        assignedGuests={guests.filter((guest) => guest.assignedTable !== null).length}
        unassignedGuests={unassignedGuests.length}
        tableCount={tableAssignments.length}
      />
    </div>
  );
}

export function RSVPModuleView() {
  return (
    <div className="p-8 sm:p-10">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">RSVP</h1>
          <p className="mt-2 text-slate-600">Track guest responses and wedding confirmations from one place.</p>
        </div>

        <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
          Send Invitation
        </button>
      </div>

      <RSVPOverview />

      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full lg:max-w-md">
          <RSVPSearchBar />
        </div>
        <RSVPFilter />
      </div>

      <RSVPTable />
      <RSVPForm />
      <RSVPDetailCard />
      <RSVPStatistics />
    </div>
  );
}

export function LiveRundownModuleView() {
  return (
    <div className="p-8 sm:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Live Rundown</h1>
          <p className="mt-2 text-slate-600">Keep the wedding day operations aligned with a shared, live schedule.</p>
        </div>
      </div>

      <LiveRundownBoard />
    </div>
  );
}
