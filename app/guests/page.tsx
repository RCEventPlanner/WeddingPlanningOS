"use client";

import { useMemo, useState } from "react";
import { GuestDetailCard } from "../../components/GuestDetailCard";
import { GuestFilter, type GuestFilters } from "../../components/GuestFilter";
import { GuestForm } from "../../components/GuestForm";
import { GuestSearchBar } from "../../components/GuestSearchBar";
import { GuestStatistics } from "../../components/GuestStatistics";
import { GuestTable } from "../../components/GuestTable";

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

type TableAssignment = {
  id: string;
  label: string;
  capacity: number;
};

const tableAssignments: TableAssignment[] = [
  { id: "table-1", label: "Table 1", capacity: 8 },
  { id: "table-2", label: "Table 2", capacity: 8 },
  { id: "table-3", label: "Table 3", capacity: 10 },
  { id: "table-4", label: "Table 4", capacity: 10 },
  { id: "table-5", label: "Table 5", capacity: 12 },
];

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

export default function GuestsPage() {
  const [guests, setGuests] = useState(initialGuests);
  const [selectedGuestId, setSelectedGuestId] = useState(initialGuests[0].id);
  const [guestFilters, setGuestFilters] = useState<GuestFilters>({ guestFrom: "All", guestGroup: "All" });

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
          <p className="mt-2 text-slate-600">
            Track guest lists, seating ideas, and RSVP updates here.
          </p>
        </div>

        <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
          Add Guest
        </button>
      </div>

      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full lg:max-w-md">
          <GuestSearchBar />
        </div>
        <GuestFilter filters={guestFilters} onChange={setGuestFilters} />
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

      <GuestTable
        guests={guests.map((guest) => ({
          id: String(guest.id),
          fullName: guest.name,
          preferredName: guest.preferredName,
          phoneNumber: guest.phone,
          emailAddress: guest.emailAddress,
          guestFrom: guest.guestFrom,
          guestGroup: guest.group,
          inviteStatus: guest.status === "Confirmed" ? "Sent" : "Not Sent",
        }))}
        selectedGuestId={String(selectedGuestId)}
        onSelectGuest={(guestId) => setSelectedGuestId(Number(guestId))}
        onViewGuest={() => undefined}
        onEditGuest={() => undefined}
        onDeleteGuest={() => undefined}
        onSendInvitation={() => undefined}
      />
      <GuestForm
        values={{
          fullName: selectedGuest.name,
          preferredName: selectedGuest.preferredName,
          phoneNumber: selectedGuest.phone,
          emailAddress: selectedGuest.emailAddress,
          guestFrom: selectedGuest.guestFrom as "Groom's Side" | "Bride's Side" | "Both",
          guestGroup: selectedGuest.group,
        }}
      />
      <GuestDetailCard
        guestName={selectedGuest.name}
        preferredName={selectedGuest.preferredName}
        phoneNumber={selectedGuest.phone}
        emailAddress={selectedGuest.emailAddress}
        guestFrom={selectedGuest.guestFrom}
        guestGroup={selectedGuest.group}
      />
      <GuestStatistics
        totalGuests={guests.length}
        confirmedGuests={guests.filter((guest) => guest.status === "Confirmed").length}
        pendingGuests={guests.filter((guest) => guest.status === "Pending").length}
      />
    </div>
  );
}
