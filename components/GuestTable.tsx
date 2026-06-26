type Guest = {
  name: string;
  group: string;
  guestCount: number;
  status: "Confirmed" | "Pending" | "Declined";
  phone: string;
};

const guests: Guest[] = [
  {
    name: "Rachel Tan",
    group: "Family",
    guestCount: 4,
    status: "Confirmed",
    phone: "012-3456789",
  },
  {
    name: "John Lim",
    group: "Friends",
    guestCount: 2,
    status: "Pending",
    phone: "012-9988776",
  },
  {
    name: "Siti Rahman",
    group: "Colleagues",
    guestCount: 3,
    status: "Declined",
    phone: "012-5566778",
  },
];

const statusStyles: Record<Guest["status"], string> = {
  Confirmed: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Declined: "bg-rose-100 text-rose-700",
};

export function GuestTable() {
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
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <tr key={guest.name} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-900">{guest.name}</td>
                <td className="px-4 py-3 text-slate-600">{guest.group}</td>
                <td className="px-4 py-3 text-slate-600">{guest.guestCount}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[guest.status]}`}>
                    {guest.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-600">{guest.phone}</td>
                <td className="px-4 py-3 text-slate-600">
                  <button className="text-sm font-medium text-rose-500 hover:text-rose-600">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
