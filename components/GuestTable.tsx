type Guest = {
  id: string;
  fullName: string;
  preferredName: string;
  phoneNumber: string;
  emailAddress: string;
  guestFrom: string;
  guestGroup: string;
  inviteStatus: "Sent" | "Not Sent";
};

type GuestTableProps = {
  guests: Guest[];
  selectedGuestId: string;
  onSelectGuest: (guestId: string) => void;
  onViewGuest: (guestId: string) => void;
  onEditGuest: (guestId: string) => void;
  onDeleteGuest: (guestId: string) => void;
  onSendInvitation: (guestId: string) => void;
};

const invitationStyles: Record<Guest["inviteStatus"], string> = {
  Sent: "bg-emerald-100 text-emerald-700",
  "Not Sent": "bg-amber-100 text-amber-700",
};

export function GuestTable({
  guests,
  selectedGuestId,
  onSelectGuest,
  onViewGuest,
  onEditGuest,
  onDeleteGuest,
  onSendInvitation,
}: GuestTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Guest Name</th>
              <th className="px-4 py-3 font-medium">Preferred Name</th>
              <th className="px-4 py-3 font-medium">Guest From</th>
              <th className="px-4 py-3 font-medium">Guest Group</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {guests.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-sm text-slate-500">
                  No guests match the current search and filters.
                </td>
              </tr>
            ) : (
              guests.map((guest) => (
                <tr
                  key={guest.id}
                  className={`border-t border-slate-100 transition hover:bg-slate-50 ${selectedGuestId === guest.id ? "bg-rose-50/60" : ""}`}
                  onClick={() => onSelectGuest(guest.id)}
                >
                  <td className="px-4 py-3 font-medium text-slate-900">{guest.fullName}</td>
                  <td className="px-4 py-3 text-slate-600">{guest.preferredName}</td>
                  <td className="px-4 py-3 text-slate-600">{guest.guestFrom}</td>
                  <td className="px-4 py-3 text-slate-600">{guest.guestGroup}</td>
                  <td className="px-4 py-3 text-slate-600">{guest.phoneNumber}</td>
                  <td className="px-4 py-3 text-slate-600">{guest.emailAddress}</td>
                  <td className="px-4 py-3 text-slate-600">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onViewGuest(guest.id);
                        }}
                        className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-200"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onEditGuest(guest.id);
                        }}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-slate-300"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onDeleteGuest(guest.id);
                        }}
                        className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700 transition hover:bg-rose-100"
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onSendInvitation(guest.id);
                        }}
                        className={`rounded-full px-3 py-1 text-xs font-medium ${invitationStyles[guest.inviteStatus]}`}
                      >
                        Send Invitation
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
