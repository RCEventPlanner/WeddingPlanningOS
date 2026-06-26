type RSVPStatisticsProps = {
  totalInvitations?: number;
  invitationsSent?: number;
  pendingResponses?: number;
  confirmedGuests?: number;
  declinedGuests?: number;
  attendanceRate?: string;
};

const stats = [
  { label: "Total Invitations", value: "120" },
  { label: "Invitations Sent", value: "98" },
  { label: "Pending Responses", value: "18" },
  { label: "Confirmed Guests", value: "76" },
  { label: "Declined Guests", value: "4" },
  { label: "Attendance Rate", value: "85%" },
];

export function RSVPStatistics({
  totalInvitations = 120,
  invitationsSent = 98,
  pendingResponses = 18,
  confirmedGuests = 76,
  declinedGuests = 4,
  attendanceRate = "85%",
}: RSVPStatisticsProps) {
  const summary = [
    { label: "Total Invitations", value: totalInvitations },
    { label: "Invitations Sent", value: invitationsSent },
    { label: "Pending Responses", value: pendingResponses },
    { label: "Confirmed Guests", value: confirmedGuests },
    { label: "Declined Guests", value: declinedGuests },
    { label: "Attendance Rate", value: attendanceRate },
  ];

  return (
    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">RSVP Statistics</h2>
        <p className="mt-1 text-sm text-slate-600">
          A quick overview of RSVP progress and guest response status.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {summary.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 shadow-sm transition hover:shadow-md"
          >
            <p className="text-sm font-medium text-slate-600">{item.label}</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
