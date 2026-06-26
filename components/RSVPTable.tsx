type RSVPRecord = {
  guestName: string;
  status: "Confirmed" | "Pending" | "Declined";
  adults: number;
  children: number;
  responseDate: string;
};

const records: RSVPRecord[] = [
  {
    guestName: "Rachel Tan",
    status: "Confirmed",
    adults: 2,
    children: 1,
    responseDate: "2026-06-20",
  },
  {
    guestName: "John Lim",
    status: "Pending",
    adults: 1,
    children: 0,
    responseDate: "2026-06-22",
  },
  {
    guestName: "Siti Rahman",
    status: "Declined",
    adults: 1,
    children: 0,
    responseDate: "2026-06-24",
  },
];

const statusStyles: Record<RSVPRecord["status"], string> = {
  Confirmed: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Declined: "bg-rose-100 text-rose-700",
};

export function RSVPTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Guest Name</th>
              <th className="px-4 py-3 font-medium">RSVP Status</th>
              <th className="px-4 py-3 font-medium">Adults</th>
              <th className="px-4 py-3 font-medium">Children</th>
              <th className="px-4 py-3 font-medium">Response Date</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.guestName} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-900">{record.guestName}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[record.status]}`}>
                    {record.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-600">{record.adults}</td>
                <td className="px-4 py-3 text-slate-600">{record.children}</td>
                <td className="px-4 py-3 text-slate-600">{record.responseDate}</td>
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
