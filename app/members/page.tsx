import { Sidebar } from "../../components/Sidebar";
import { TopNav } from "../../components/TopNav";
import { WeddingHeader } from "../../components/WeddingHeader";

const members = [
  {
    id: 1,
    name: "Ava Thompson",
    email: "ava@rceventplanner.com",
    role: "Planner",
    status: "Active",
    workspace: "Aurora & Noah Wedding",
    lastActive: "2 min ago",
    access: ["Dashboard", "Wedding Profile", "Guests", "Budget", "Live Rundown"],
    positions: ["Planner", "Coordinator", "Emcee"],
  },
  {
    id: 2,
    name: "Nadia Rahman",
    email: "nadia@rceventplanner.com",
    role: "Coordinator",
    status: "Pending",
    workspace: "Aurora & Noah Wedding",
    lastActive: "Awaiting invite",
    access: ["Live Rundown", "Tasks", "Guests"],
    positions: ["Photographer", "Videographer"],
  },
  {
    id: 3,
    name: "Maya Chen",
    email: "maya@example.com",
    role: "Couple",
    status: "Active",
    workspace: "Solstice Celebration",
    lastActive: "15 min ago",
    access: ["Wedding Profile", "RSVP", "Budget", "Vendor"],
    positions: ["Couple", "Family"],
  },
  {
    id: 4,
    name: "Daniel Lim",
    email: "daniel@vendorhub.com",
    role: "Vendor User",
    status: "Invited",
    workspace: "Evermore Wedding",
    lastActive: "Invitation sent",
    access: ["Live Rundown"],
    positions: ["Vendor", "Banquet Captain"],
  },
];

const roleStyles: Record<string, string> = {
  Planner: "bg-rose-100 text-rose-700",
  Coordinator: "bg-sky-100 text-sky-700",
  Couple: "bg-violet-100 text-violet-700",
  "Vendor User": "bg-amber-100 text-amber-700",
};

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Invited: "bg-sky-100 text-sky-700",
  Disabled: "bg-slate-200 text-slate-600",
};

export default function MembersPage() {
  const selectedMember = members[0];

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-8 lg:ml-72 lg:p-10">
        <TopNav title="Members" />
        <WeddingHeader />

        <div className="mt-6 space-y-6">
          <section className="grid gap-4 xl:grid-cols-[1.55fr_0.95fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">Members List</p>
                  <h2 className="text-xl font-semibold text-slate-900">Wedding Members</h2>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {members.length} members
                </span>
              </div>

              <div className="space-y-3">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="rounded-2xl border border-slate-200 p-4 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-base font-semibold text-slate-900">{member.name}</h3>
                          <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${roleStyles[member.role]}`}>
                            {member.role}
                          </span>
                          <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyles[member.status]}`}>
                            {member.status}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-slate-500">{member.email}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {member.positions.map((position) => (
                            <span key={position} className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
                              {position}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Assigned Workspace</p>
                        <p className="mt-1 text-sm text-slate-700">{member.workspace}</p>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Last Active
                      </span>
                      <span className="text-sm text-slate-600">{member.lastActive}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4">
                <p className="text-sm font-medium text-slate-500">Invite Member</p>
                <h2 className="text-xl font-semibold text-slate-900">New Invitation</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Email</label>
                  <input
                    type="email"
                    placeholder="member@company.com"
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Role</label>
                  <select className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100">
                    <option>Planner</option>
                    <option>Coordinator</option>
                    <option>Couple</option>
                    <option>Vendor User</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Assigned Positions</label>
                  <select
                    multiple
                    className="min-h-32 w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  >
                    <option>Planner</option>
                    <option>Coordinator</option>
                    <option>Emcee</option>
                    <option>DJ</option>
                    <option>Photographer</option>
                    <option>Videographer</option>
                    <option>Banquet Captain</option>
                    <option>Reception</option>
                    <option>Family</option>
                    <option>Couple</option>
                    <option>Vendor</option>
                  </select>
                  <p className="mt-2 text-xs text-slate-400">Used for My Rundown filtering in Live Rundown.</p>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Workspace</label>
                  <select className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100">
                    <option>Aurora & Noah Wedding</option>
                    <option>Solstice Celebration</option>
                    <option>Evermore Wedding</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Optional message</label>
                  <textarea
                    rows={4}
                    placeholder="Add a short welcome note"
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>

                <button
                  type="button"
                  className="w-full rounded-2xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600"
                >
                  Invite Member
                </button>
              </div>
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-[1.1fr_1.3fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4">
                <p className="text-sm font-medium text-slate-500">Member Detail</p>
                <h2 className="text-xl font-semibold text-slate-900">Preview</h2>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Member info</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">{selectedMember.name}</p>
                  <p className="mt-1 text-sm text-slate-600">{selectedMember.email}</p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Role</p>
                  <span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${roleStyles[selectedMember.role]}`}>
                    {selectedMember.role}
                  </span>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Assigned Positions</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedMember.positions.map((position) => (
                      <span key={position} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                        {position}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-slate-400">Used for My Rundown filtering in Live Rundown.</p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Access summary</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedMember.access.map((item) => (
                      <span key={item} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Assigned wedding workspace</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{selectedMember.workspace}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4">
                <p className="text-sm font-medium text-slate-500">Member Summary</p>
                <h2 className="text-xl font-semibold text-slate-900">Overview</h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Active members</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">2</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Pending invites</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">2</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
