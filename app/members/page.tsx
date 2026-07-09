"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "../../components/Sidebar";
import { TopNav } from "../../components/TopNav";
import {
  DEFAULT_PERMISSION_MATRIX,
  DEFAULT_PERMISSION_PROFILE_BY_ROLE,
  DEFAULT_TEMPLATE_SUMMARY_BY_ROLE,
  ROLE_OPTIONS,
  type PermissionLevel,
  type PermissionModuleName,
  type RoleTemplate,
} from "../../lib/defaultPermissionMatrix";

type Member = {
  id: number;
  avatar: string;
  name: string;
  email: string;
  phone: string;
  weddingPosition: string;
  systemRole: RoleTemplate;
  status: "Active" | "Pending" | "Invited" | "Disabled";
  lastActive: string;
};

type WorkspaceAssignment = {
  workspaceId: string;
  permissionProfile: string;
};

type DefaultPermissionTemplate = {
  role: RoleTemplate;
  summary: string;
  permissions: Record<PermissionModuleName, PermissionLevel>;
};

const workspaceOptions = [
  { id: "aurora", name: "Aurora & Noah Wedding" },
  { id: "solstice", name: "Solstice Celebration Wedding" },
  { id: "evermore", name: "Evermore Wedding" },
  { id: "snowdrop", name: "Snowdrop Ceremony Wedding" },
];

const roleDisplayName: Record<RoleTemplate, string> = {
  Planner: "Planner",
  Coordinator: "Coordinator",
  Couple: "Couple",
  "Couple Family / Friend": "Couple Family / Friend",
  Vendor: "Vendor",
};

const defaultTemplatesByRole: Record<RoleTemplate, DefaultPermissionTemplate> = ROLE_OPTIONS.reduce(
  (acc, role) => {
    acc[role] = {
      role,
      summary: DEFAULT_TEMPLATE_SUMMARY_BY_ROLE[role],
      permissions: { ...DEFAULT_PERMISSION_MATRIX[role] },
    };
    return acc;
  },
  {} as Record<RoleTemplate, DefaultPermissionTemplate>,
);

const members: Member[] = [
  {
    id: 1,
    avatar: "AT",
    name: "Ava Thompson",
    email: "ava@rceventplanner.com",
    phone: "+60 12-111 2233",
    weddingPosition: "Lead Planner",
    systemRole: "Planner",
    status: "Active",
    lastActive: "2 min ago",
  },
  {
    id: 2,
    avatar: "NR",
    name: "Nadia Rahman",
    email: "nadia@rceventplanner.com",
    phone: "+60 12-222 3344",
    weddingPosition: "Stage Coordinator",
    systemRole: "Coordinator",
    status: "Pending",
    lastActive: "Awaiting invite",
  },
  {
    id: 3,
    avatar: "MC",
    name: "Maya Chen",
    email: "maya@example.com",
    phone: "+60 12-333 4455",
    weddingPosition: "Bride",
    systemRole: "Couple",
    status: "Active",
    lastActive: "15 min ago",
  },
  {
    id: 4,
    avatar: "DL",
    name: "Daniel Lim",
    email: "daniel@vendorhub.com",
    phone: "+60 12-444 5566",
    weddingPosition: "Banquet Captain",
    systemRole: "Vendor",
    status: "Invited",
    lastActive: "Invitation sent",
  },
];

const statusStyles: Record<Member["status"], string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Invited: "bg-sky-100 text-sky-700",
  Disabled: "bg-slate-200 text-slate-600",
};

const roleStyles: Record<RoleTemplate, string> = {
  Planner: "border border-orange-400 bg-orange-50 text-orange-900",
  Coordinator: "border border-amber-500 bg-amber-100 text-amber-900",
  Couple: "border border-cyan-300 bg-cyan-50 text-cyan-700",
  "Couple Family / Friend": "border border-teal-300 bg-teal-50 text-teal-700",
  Vendor: "border border-blue-300 bg-blue-50 text-blue-700",
};

const initialWorkspaceAssignments: Record<number, WorkspaceAssignment[]> = {
  1: [
    { workspaceId: "aurora", permissionProfile: "Planner Default" },
    { workspaceId: "solstice", permissionProfile: "Planner Default" },
    { workspaceId: "evermore", permissionProfile: "Planner Default" },
  ],
  2: [
    { workspaceId: "aurora", permissionProfile: "Coordinator Default" },
    { workspaceId: "snowdrop", permissionProfile: "Coordinator Default" },
  ],
  3: [{ workspaceId: "solstice", permissionProfile: "Couple Default" }],
  4: [
    { workspaceId: "aurora", permissionProfile: "Vendor Default" },
    { workspaceId: "evermore", permissionProfile: "Vendor Default" },
  ],
};

const workspaceNameById = workspaceOptions.reduce<Record<string, string>>((acc, workspace) => {
  acc[workspace.id] = workspace.name;
  return acc;
}, {});

export default function MembersPage() {
  const router = useRouter();
  const [selectedMemberId, setSelectedMemberId] = useState<number>(members[0].id);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [assignWorkspaceMemberId, setAssignWorkspaceMemberId] = useState<number | null>(null);
  const [memberSearchQuery, setMemberSearchQuery] = useState("");
  const [workspaceAssignmentsByMember, setWorkspaceAssignmentsByMember] = useState<Record<number, WorkspaceAssignment[]>>(
    initialWorkspaceAssignments,
  );
  const [assignWorkspaceDraftIds, setAssignWorkspaceDraftIds] = useState<string[]>([]);
  const [isInviteWorkspaceDropdownOpen, setIsInviteWorkspaceDropdownOpen] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Planner" as RoleTemplate,
    weddingPosition: "Lead Planner",
    assignedWorkspaces: ["Aurora & Noah Wedding"],
    permissionProfile: DEFAULT_PERMISSION_PROFILE_BY_ROLE.Planner,
  });

  const filteredMembers = useMemo(() => {
    const normalized = memberSearchQuery.trim().toLowerCase();

    if (!normalized) {
      return members;
    }

    return members.filter((member) => {
      return (
        member.name.toLowerCase().includes(normalized) ||
        member.email.toLowerCase().includes(normalized) ||
        member.weddingPosition.toLowerCase().includes(normalized) ||
        member.systemRole.toLowerCase().includes(normalized) ||
        member.status.toLowerCase().includes(normalized)
      );
    });
  }, [memberSearchQuery]);

  const selectedMember = useMemo(() => {
    return filteredMembers.find((member) => member.id === selectedMemberId) ?? filteredMembers[0] ?? members[0];
  }, [filteredMembers, selectedMemberId]);

  const selectedMemberAssignments = workspaceAssignmentsByMember[selectedMember.id] ?? [];
  const selectedWorkspaceNames = selectedMemberAssignments.map((assignment) => workspaceNameById[assignment.workspaceId]);
  const inviteWorkspaceNames = inviteForm.assignedWorkspaces;

  const openAssignWorkspaceModal = (memberId: number) => {
    const currentAssignments = workspaceAssignmentsByMember[memberId] ?? [];
    setAssignWorkspaceMemberId(memberId);
    setAssignWorkspaceDraftIds(currentAssignments.map((item) => item.workspaceId));
  };

  const toggleWorkspaceInDraft = (workspaceId: string) => {
    setAssignWorkspaceDraftIds((previous) =>
      previous.includes(workspaceId) ? previous.filter((id) => id !== workspaceId) : [...previous, workspaceId],
    );
  };

  const toggleInviteWorkspace = (workspaceName: string) => {
    setInviteForm((previous) => {
      const nextAssignedWorkspaces = previous.assignedWorkspaces.includes(workspaceName)
        ? previous.assignedWorkspaces.filter((name) => name !== workspaceName)
        : [...previous.assignedWorkspaces, workspaceName];

      return {
        ...previous,
        assignedWorkspaces: nextAssignedWorkspaces,
      };
    });
  };

  const removeInviteWorkspace = (workspaceName: string) => {
    setInviteForm((previous) => ({
      ...previous,
      assignedWorkspaces: previous.assignedWorkspaces.filter((name) => name !== workspaceName),
    }));
  };

  const toggleInviteWorkspaceDropdown = () => {
    setIsInviteWorkspaceDropdownOpen((previous) => !previous);
  };

  const saveWorkspaceAssignment = () => {
    if (!assignWorkspaceMemberId) {
      return;
    }

    const memberRole = members.find((member) => member.id === assignWorkspaceMemberId)?.systemRole ?? "Coordinator";
    const defaultProfile = DEFAULT_PERMISSION_PROFILE_BY_ROLE[memberRole];
    const existingAssignments = workspaceAssignmentsByMember[assignWorkspaceMemberId] ?? [];

    const nextAssignments: WorkspaceAssignment[] = assignWorkspaceDraftIds.map((workspaceId) => {
      const existing = existingAssignments.find((item) => item.workspaceId === workspaceId);
      return {
        workspaceId,
        permissionProfile: existing?.permissionProfile ?? defaultProfile,
      };
    });

    setWorkspaceAssignmentsByMember((previous) => ({
      ...previous,
      [assignWorkspaceMemberId]: nextAssignments,
    }));

    setAssignWorkspaceMemberId(null);
    setAssignWorkspaceDraftIds([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <Sidebar mode="planner" />

      <main className="flex-1 p-6 sm:p-8 lg:ml-[var(--sidebar-width)] lg:p-10">
        <TopNav title="Members Management" />

        <div className="mt-4 space-y-4">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">Members Management</h1>
                <p className="mt-1 text-sm text-slate-500">
                  Manage members, workspace assignments, and per-member permission workflows.
                </p>
              </div>

              <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto md:items-center md:justify-end">
                <input
                  type="search"
                  value={memberSearchQuery}
                  onChange={(event) => setMemberSearchQuery(event.target.value)}
                  placeholder="Search member"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 sm:min-w-64"
                />
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(true)}
                  className="rounded-2xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600"
                >
                  Add New Member
                </button>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.05fr_1fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">Member List</p>
                  <h2 className="text-xl font-semibold text-slate-900">All Members</h2>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {filteredMembers.length} members
                </span>
              </div>

              <div className="space-y-3">
                {filteredMembers.map((member) => {
                  const memberAssignments = workspaceAssignmentsByMember[member.id] ?? [];
                  const isSelected = selectedMember.id === member.id;

                  return (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => setSelectedMemberId(member.id)}
                      onDoubleClick={() => router.push(`/members/${member.id}`)}
                      className={`w-full rounded-2xl border p-4 text-left transition ${
                        isSelected
                          ? "border-rose-300 bg-rose-50/40"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-700">
                          {member.avatar}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-sm font-semibold text-slate-900">{member.name}</h3>
                            <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyles[member.status]}`}>
                              {member.status}
                            </span>
                          </div>

                          <div className="mt-2 grid gap-2 text-xs text-slate-600 sm:grid-cols-2">
                            <p>
                              <span className="font-semibold text-slate-800">Wedding Position:</span> {member.weddingPosition}
                            </p>
                            <p>
                              <span className="font-semibold text-slate-800">System Role:</span> {member.systemRole}
                            </p>
                            <p className="sm:col-span-2">
                              <span className="font-semibold text-slate-800">Last Active:</span> {member.lastActive}
                            </p>
                            <p className="sm:col-span-2">
                              <span className="font-semibold text-slate-800">Assigned:</span>{" "}
                              {memberAssignments.length} {memberAssignments.length === 1 ? "Workspace" : "Workspaces"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}

                {filteredMembers.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                    No member matches the current search.
                  </div>
                ) : null}
              </div>

              <p className="mt-3 text-xs text-slate-500">
                Single click selects and updates details. Double click opens Manage Permissions.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-700">
                  {selectedMember.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Member Details</p>
                  <h2 className="text-xl font-semibold text-slate-900">{selectedMember.name}</h2>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Basic Information</p>
                  <div className="mt-2 space-y-1 text-sm text-slate-700">
                    <p>
                      <span className="font-semibold text-slate-900">Name:</span> {selectedMember.name}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">Email:</span> {selectedMember.email}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">Phone:</span> {selectedMember.phone}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Assigned Workspaces</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    {selectedMemberAssignments.length} {selectedMemberAssignments.length === 1 ? "Workspace" : "Workspaces"}
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-700">
                    {selectedWorkspaceNames.length === 0 ? (
                      <li>No workspace assigned.</li>
                    ) : (
                      selectedWorkspaceNames.map((workspaceName) => (
                        <li key={workspaceName} className="rounded-xl bg-white px-3 py-1.5">
                          {workspaceName}
                        </li>
                      ))
                    )}
                  </ul>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Role Information</p>
                  <div className="mt-2 space-y-2 text-sm text-slate-700">
                    <p>
                      <span className="font-semibold text-slate-900">Wedding Position:</span> {selectedMember.weddingPosition}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">Role:</span>{" "}
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${roleStyles[selectedMember.systemRole]}`}>
                        {selectedMember.systemRole}
                      </span>
                    </p>
                    <p>
                      <span className="font-semibold text-slate-900">Default Permission Profile:</span>{" "}
                      {DEFAULT_PERMISSION_PROFILE_BY_ROLE[selectedMember.systemRole]}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Quick Actions</p>
                  <div className="grid gap-2 sm:grid-cols-3">
                    <button
                      type="button"
                      onClick={() => openAssignWorkspaceModal(selectedMember.id)}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300"
                    >
                      Assign Workspace
                    </button>
                    <button
                      type="button"
                      onClick={() => router.push(`/members/${selectedMember.id}`)}
                      className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                    >
                      Manage Permissions
                    </button>
                    <button
                      type="button"
                      className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-100"
                    >
                      Deactivate Member
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-slate-900">Default Permission Profiles</h2>
              <p className="mt-1 text-sm text-slate-500">
                  Shared defaults used by Members, Invitation, and Manage Permissions.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {ROLE_OPTIONS.map((role) => {
                const template = defaultTemplatesByRole[role];
                return (
                  <article key={role} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${roleStyles[role]}`}>
                      {roleDisplayName[role]}
                    </span>
                    <h3 className="mt-3 text-base font-semibold text-slate-900">{roleDisplayName[role]}</h3>
                    <p className="mt-2 text-sm text-slate-600">{template.summary}</p>
                    <p className="mt-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600">
                      {DEFAULT_PERMISSION_PROFILE_BY_ROLE[role]}
                    </p>
                  </article>
                );
              })}
            </div>

            <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              Role Templates define the default permissions. Individual member permissions can still be overridden per Workspace.
            </div>
          </section>
        </div>

        {isInviteModalOpen ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Invite Member"
          >
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-6">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">Invite Member</p>
                  <h2 className="text-xl font-semibold text-slate-900">New Member Invitation</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600"
                >
                  Close
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Name</label>
                  <input
                    type="text"
                    value={inviteForm.name}
                    onChange={(event) => setInviteForm((prev) => ({ ...prev, name: event.target.value }))}
                    placeholder="Enter member name"
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Email</label>
                  <input
                    type="email"
                    value={inviteForm.email}
                    onChange={(event) => setInviteForm((prev) => ({ ...prev, email: event.target.value }))}
                    placeholder="member@company.com"
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Phone</label>
                  <input
                    type="text"
                    value={inviteForm.phone}
                    onChange={(event) => setInviteForm((prev) => ({ ...prev, phone: event.target.value }))}
                    placeholder="+60 12 345 6789"
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Role</label>
                  <select
                    value={inviteForm.role}
                    onChange={(event) => {
                      const nextRole = event.target.value as RoleTemplate;
                      setInviteForm((prev) => ({
                        ...prev,
                        role: nextRole,
                        permissionProfile: DEFAULT_PERMISSION_PROFILE_BY_ROLE[nextRole],
                      }));
                    }}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  >
                    {ROLE_OPTIONS.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Wedding Position</label>
                  <select
                    value={inviteForm.weddingPosition}
                    onChange={(event) => setInviteForm((prev) => ({ ...prev, weddingPosition: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  >
                    <optgroup label="Planning Team">
                      <option value="Lead Planner">Lead Planner</option>
                      <option value="Assistant Planner">Assistant Planner</option>
                      <option value="Lead Coordinator">Lead Coordinator</option>
                      <option value="Stage Coordinator">Stage Coordinator</option>
                      <option value="Registration Coordinator">Registration Coordinator</option>
                      <option value="Reception Coordinator">Reception Coordinator</option>
                      <option value="Banquet Coordinator">Banquet Coordinator</option>
                      <option value="VIP Coordinator">VIP Coordinator</option>
                      <option value="Technical Coordinator">Technical Coordinator</option>
                    </optgroup>
                    <optgroup label="Couple">
                      <option value="Groom">Groom</option>
                      <option value="Bride">Bride</option>
                    </optgroup>
                    <optgroup label="Couple Family & Friends">
                      <option value="Groom Family">Groom Family</option>
                      <option value="Bride Family">Bride Family</option>
                      <option value="Groom Friend">Groom Friend</option>
                      <option value="Bride Friend">Bride Friend</option>
                      <option value="Best Man">Best Man</option>
                      <option value="Maid of Honor">Maid of Honor</option>
                      <option value="Bridesmaid">Bridesmaid</option>
                      <option value="Groomsman">Groomsman</option>
                    </optgroup>
                    <optgroup label="Vendor Categories">
                      <option value="Photographer">Photographer</option>
                      <option value="Videographer">Videographer</option>
                      <option value="Makeup Artist">Makeup Artist</option>
                      <option value="Hair Stylist">Hair Stylist</option>
                      <option value="Emcee">Emcee</option>
                      <option value="DJ">DJ</option>
                      <option value="Live Band">Live Band</option>
                      <option value="Sound Engineer">Sound Engineer</option>
                      <option value="Lighting">Lighting</option>
                      <option value="Decoration">Decoration</option>
                      <option value="Florist">Florist</option>
                      <option value="Wedding Cake">Wedding Cake</option>
                      <option value="Catering">Catering</option>
                      <option value="Venue">Venue</option>
                      <option value="Photo Booth">Photo Booth</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Security">Security</option>
                      <option value="Valet">Valet</option>
                      <option value="Other Vendor">Other Vendor</option>
                    </optgroup>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-slate-600">Assigned Workspaces</label>

                  <div className="relative mt-3">
                    <button
                      type="button"
                      onClick={toggleInviteWorkspaceDropdown}
                      className="flex min-h-[44px] w-full items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-left text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                    >
                      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
                        {inviteWorkspaceNames.length === 0 ? (
                          <span className="text-slate-400">Select workspaces</span>
                        ) : (
                          inviteWorkspaceNames.map((workspaceName) => (
                            <span
                              key={workspaceName}
                              className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-sm font-medium text-rose-700 ring-1 ring-rose-200"
                            >
                              {workspaceName}
                              <span
                                role="button"
                                tabIndex={0}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  removeInviteWorkspace(workspaceName);
                                }}
                                onKeyDown={(event) => {
                                  if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    removeInviteWorkspace(workspaceName);
                                  }
                                }}
                                className="rounded-full px-1 text-rose-400 transition hover:text-rose-600"
                                aria-label={`Remove ${workspaceName}`}
                              >
                                ×
                              </span>
                            </span>
                          ))
                        )}
                      </div>

                      <span className="shrink-0 text-slate-400">▾</span>
                    </button>

                    {isInviteWorkspaceDropdownOpen ? (
                      <div className="absolute left-0 top-full z-10 mt-2 w-full rounded-2xl border border-slate-200 bg-white p-1.5 shadow-lg">
                        <div className="max-h-44 overflow-auto">
                          {workspaceOptions.map((workspace) => {
                            const checked = inviteWorkspaceNames.includes(workspace.name);

                            return (
                              <button
                                key={workspace.id}
                                type="button"
                                onClick={() => toggleInviteWorkspace(workspace.name)}
                                className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                                  checked ? "bg-rose-50 text-rose-900" : "text-slate-700 hover:bg-slate-50"
                                }`}
                              >
                                <span className="truncate font-medium">{workspace.name}</span>
                                {checked ? (
                                  <span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-700">
                                    Selected
                                  </span>
                                ) : null}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>

              </div>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="rounded-2xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600"
                >
                  Send Invite
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {assignWorkspaceMemberId ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Assign Workspace"
          >
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-6">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">Assign Workspace</p>
                  <h2 className="text-xl font-semibold text-slate-900">Workspace Access Assignment</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setAssignWorkspaceMemberId(null)}
                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600"
                >
                  Close
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Member Name</label>
                  <input
                    type="text"
                    readOnly
                    value={members.find((member) => member.id === assignWorkspaceMemberId)?.name ?? ""}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none"
                  />
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-slate-600">Assigned Workspaces</p>
                  <div className="space-y-2">
                    {workspaceOptions.map((workspace) => {
                      const checked = assignWorkspaceDraftIds.includes(workspace.id);
                      return (
                        <label
                          key={workspace.id}
                          className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm"
                        >
                          <span className="font-medium text-slate-700">{workspace.name}</span>
                          <span className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleWorkspaceInDraft(workspace.id)}
                              className="h-4 w-4 rounded border-slate-300 text-rose-500 focus:ring-rose-300"
                            />
                            {checked ? "Assigned" : "Not Assigned"}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setAssignWorkspaceMemberId(null)}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveWorkspaceAssignment}
                  className="rounded-2xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600"
                >
                  Save Assignment
                </button>
              </div>
            </div>
          </div>
        ) : null}

      </main>
    </div>
  );
}
