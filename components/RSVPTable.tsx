export type RSVPRecord = {
  id: string;
  guestName: string;
  guestFrom: string;
  status: "Confirmed" | "Pending" | "Declined";
  adults: number;
  children: number;
  responseDate: string;
  invitationSent: string;
  preferredName: string;
  mealPreference: "Normal" | "Vegetarian" | "Halal";
  assignedTable: string | null;
  relatedGuestGroup: string;
  emailAddress: string;
  phoneNumber: string;
  notes: string;
  specialRequests: string;
};

const statusStyles: Record<RSVPRecord["status"], string> = {
  Confirmed: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Declined: "bg-rose-100 text-rose-700",
};

type RSVPTableProps = {
  records?: RSVPRecord[];
  selectedRsvpId?: string;
  onSelectRsvp?: (rsvpId: string) => void;
  onViewRsvp?: (rsvpId: string) => void;
  onEditRsvp?: (rsvpId: string) => void;
  onDeleteRsvp?: (rsvpId: string) => void;
};

export function RSVPTable({
  records = [],
  selectedRsvpId = "",
  onSelectRsvp = () => {},
  onViewRsvp = () => {},
  onEditRsvp = () => {},
  onDeleteRsvp = () => {},
}: RSVPTableProps) {
  const safeRecords = records ?? [];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Guest Name</th>
              <th className="px-4 py-3 font-medium">Guest From</th>
              <th className="px-4 py-3 font-medium">RSVP Status</th>
              <th className="px-4 py-3 font-medium">Adults</th>
              <th className="px-4 py-3 font-medium">Children</th>
              <th className="px-4 py-3 font-medium">Response Date</th>
              <th className="px-4 py-3 font-medium">Invitation Sent</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {safeRecords.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-sm text-slate-500">
                  No RSVP records match the current search or filters.
                </td>
              </tr>
            ) : (
              safeRecords.map((record) => (
                <tr
                  key={record.id}
                  className={`border-t border-slate-100 transition hover:bg-slate-50 ${selectedRsvpId === record.id ? "bg-rose-50/60" : ""}`}
                  onClick={() => onSelectRsvp(record.id)}
                >
                  <td className="px-4 py-3 font-medium text-slate-900">{record.guestName}</td>
                  <td className="px-4 py-3 text-slate-600">{record.guestFrom}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[record.status]}`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{record.adults}</td>
                  <td className="px-4 py-3 text-slate-600">{record.children}</td>
                  <td className="px-4 py-3 text-slate-600">{record.responseDate}</td>
                  <td className="px-4 py-3 text-slate-600">{record.invitationSent}</td>
                  <td className="px-4 py-3 text-slate-600">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onViewRsvp(record.id);
                        }}
                        className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-200"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onEditRsvp(record.id);
                        }}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-slate-300"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onDeleteRsvp(record.id);
                        }}
                        className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700 transition hover:bg-rose-100"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
