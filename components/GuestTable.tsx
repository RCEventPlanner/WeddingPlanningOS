type Guest = {
  id: number;
  name: string;
  group: string;
  guestCount: number;
  status: "Confirmed" | "Pending" | "Declined";
  phone: string;
  assignedTable: string | null;
};

type GuestTableProps = {
  guests: Guest[];
  onSelectGuest: (guestId: number) => void;
  onAssignTable: (guestId: number, nextTable: string) => void;
};

const tableOptions = ["Table 1", "Table 2", "Table 3", "Table 4", "Table 5", "Unassigned"];

const statusStyles: Record<Guest["status"], string> = {
  Confirmed: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Declined: "bg-rose-100 text-rose-700",
};

export function GuestTable({ guests, onSelectGuest, onAssignTable }: GuestTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Guest Name</th>
              <th className="px-4 py-3 font-medium">Group</th>
              <th className="px-4 py-3 font-medium">Number of Guests</th>
              <th className="px-4 py-3 font-medium">RSVP Status</th>
              <th className="px-4 py-3 font-medium">Assigned Table</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <tr key={guest.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-900">{guest.name}</td>
                <td className="px-4 py-3 text-slate-600">{guest.group}</td>
                <td className="px-4 py-3 text-slate-600">{guest.guestCount}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[guest.status]}`}>
                    {guest.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-600">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${guest.assignedTable ? "bg-sky-100 text-sky-700" : "bg-amber-100 text-amber-700"}`}>
                    {guest.assignedTable ?? "Unassigned"}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-600">{guest.phone}</td>
                <td className="px-4 py-3 text-slate-600">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectGuest(guest.id)}
                      className="text-sm font-medium text-rose-500 hover:text-rose-600"
                    >
                      View
                    </button>
                    <select
                      value={guest.assignedTable ?? "Unassigned"}
                      onChange={(event) => onAssignTable(guest.id, event.target.value)}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 outline-none focus:border-rose-400"
                    >
                      {tableOptions.map((tableOption) => (
                        <option key={tableOption} value={tableOption}>
                          {tableOption}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
