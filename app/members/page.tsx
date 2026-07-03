"use client";

import { useMemo, useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import { TopNav } from "../../components/TopNav";
import { WeddingHeader } from "../../components/WeddingHeader";

type PermissionLevel = "No Access" | "View" | "Edit" | "Manage";
type BaseAction = "View" | "Create" | "Edit" | "Delete" | "Manage" | "Export";
type LiveRundownExtraAction = "Edit Status" | "Edit Time" | "Edit Remarks" | "Recalculate Timeline";
type PermissionAction = BaseAction | LiveRundownExtraAction;
type PermissionModuleName =
  | "Dashboard"
  | "Wedding Profile"
  | "Guest"
  | "RSVP"
  | "Budget"
  | "Vendor"
  | "Task"
  | "Live Rundown"
  | "Workspace"
  | "Settings";
type RoleTemplate = "Planner" | "Coordinator" | "Couple" | "Vendor";

type Member = {
  id: number;
  name: string;
  email: string;
  role: "Planner" | "Coordinator" | "Couple" | "Vendor User";
  status: "Active" | "Pending" | "Invited" | "Disabled";
  workspace: string;
  lastActive: string;
  access: string[];
  positions: string[];
};

type UserOverride = {
  module: PermissionModuleName;
  action: PermissionAction;
  level: PermissionLevel;
};

type ModulePermissionMap = Record<PermissionModuleName, Partial<Record<PermissionAction, PermissionLevel>>>;

const permissionLevels: PermissionLevel[] = ["No Access", "View", "Edit", "Manage"];
const baseActions: BaseAction[] = ["View", "Create", "Edit", "Delete", "Manage", "Export"];
const liveRundownExtraActions: LiveRundownExtraAction[] = [
  "Edit Status",
  "Edit Time",
  "Edit Remarks",
  "Recalculate Timeline",
];

const permissionModules: { name: PermissionModuleName; actions: PermissionAction[] }[] = [
  { name: "Dashboard", actions: ["View", "Export", "Manage"] },
  { name: "Wedding Profile", actions: baseActions },
  { name: "Guest", actions: baseActions },
  { name: "RSVP", actions: baseActions },
  { name: "Budget", actions: baseActions },
  { name: "Vendor", actions: baseActions },
  { name: "Task", actions: baseActions },
  { name: "Live Rundown", actions: [...baseActions, ...liveRundownExtraActions] },
  { name: "Workspace", actions: baseActions },
  { name: "Settings", actions: ["View", "Edit", "Manage"] },
];

const allActions: PermissionAction[] = [...baseActions, ...liveRundownExtraActions];

const members: Member[] = [
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

const roleStyles: Record<Member["role"], string> = {
  Planner: "bg-rose-100 text-rose-700",
  Coordinator: "bg-sky-100 text-sky-700",
  Couple: "bg-violet-100 text-violet-700",
  "Vendor User": "bg-amber-100 text-amber-700",
};

const statusStyles: Record<Member["status"], string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Invited: "bg-sky-100 text-sky-700",
  Disabled: "bg-slate-200 text-slate-600",
};

const levelStyles: Record<PermissionLevel, string> = {
  "No Access": "bg-slate-100 text-slate-600",
  View: "bg-sky-100 text-sky-700",
  Edit: "bg-amber-100 text-amber-700",
  Manage: "bg-rose-100 text-rose-700",
};

const roleDescriptions: Record<RoleTemplate, string> = {
  Planner: "Full operational control across all modules.",
  Coordinator: "Operational visibility with selective editing capabilities.",
  Couple: "Planning collaboration with limited operational controls.",
  Vendor: "Rundown visibility focused on assigned execution tasks.",
};

const defaultOverrideAction = {
  module: "Dashboard" as PermissionModuleName,
  action: "View" as PermissionAction,
};

const createNoAccessTemplate = (): ModulePermissionMap => {
  const template = {} as ModulePermissionMap;
  permissionModules.forEach((moduleConfig) => {
    template[moduleConfig.name] = {};
    moduleConfig.actions.forEach((action) => {
      template[moduleConfig.name][action] = "No Access";
    });
  });
  return template;
};

const cloneTemplate = (template: ModulePermissionMap): ModulePermissionMap => {
  const cloned = {} as ModulePermissionMap;
  permissionModules.forEach((moduleConfig) => {
    cloned[moduleConfig.name] = { ...template[moduleConfig.name] };
  });
  return cloned;
};

const applyLevel = (
  template: ModulePermissionMap,
  moduleName: PermissionModuleName,
  actions: PermissionAction[],
  level: PermissionLevel,
) => {
  actions.forEach((action) => {
    template[moduleName][action] = level;
  });
};

const buildRoleTemplates = (): Record<RoleTemplate, ModulePermissionMap> => {
  const planner = createNoAccessTemplate();
  permissionModules.forEach((moduleConfig) => {
    applyLevel(planner, moduleConfig.name, moduleConfig.actions, "Manage");
  });

  const coordinator = createNoAccessTemplate();
  permissionModules.forEach((moduleConfig) => {
    applyLevel(coordinator, moduleConfig.name, moduleConfig.actions, "View");
  });
  applyLevel(coordinator, "Task", ["Create", "Edit"], "Edit");
  applyLevel(coordinator, "Live Rundown", ["Edit", "Edit Status", "Edit Time", "Edit Remarks"], "Edit");
  applyLevel(coordinator, "Live Rundown", ["Recalculate Timeline", "Manage"], "Manage");

  const couple = createNoAccessTemplate();
  applyLevel(couple, "Dashboard", ["View"], "View");
  applyLevel(couple, "Wedding Profile", ["View", "Edit"], "Edit");
  applyLevel(couple, "Guest", ["View", "Create", "Edit", "Export"], "Edit");
  applyLevel(couple, "RSVP", ["View", "Create", "Edit", "Export"], "Edit");
  applyLevel(couple, "Budget", ["View", "Create", "Edit", "Export"], "Edit");
  applyLevel(couple, "Vendor", ["View", "Create", "Edit", "Export"], "Edit");
  applyLevel(couple, "Task", ["View", "Create", "Edit"], "Edit");
  applyLevel(couple, "Live Rundown", ["View"], "View");
  applyLevel(couple, "Workspace", ["View"], "View");
  applyLevel(couple, "Settings", ["View"], "View");

  const vendor = createNoAccessTemplate();
  applyLevel(vendor, "Live Rundown", ["View"], "View");

  return {
    Planner: planner,
    Coordinator: coordinator,
    Couple: couple,
    Vendor: vendor,
  };
};

const roleDefaultPermissions = buildRoleTemplates();

const initialUserOverrides: Record<number, UserOverride[]> = {
  1: [],
  2: [
    { module: "Guest", action: "Edit", level: "Edit" },
    { module: "Live Rundown", action: "Recalculate Timeline", level: "Manage" },
  ],
  3: [{ module: "Budget", action: "Manage", level: "No Access" }],
  4: [{ module: "Live Rundown", action: "Edit Remarks", level: "Edit" }],
};

const resolveRoleTemplate = (memberRole: Member["role"]): RoleTemplate => {
  if (memberRole === "Vendor User") {
    return "Vendor";
  }
  return memberRole;
};

const getAllowedActionsForModule = (moduleName: PermissionModuleName): PermissionAction[] => {
  return permissionModules.find((moduleConfig) => moduleConfig.name === moduleName)?.actions ?? [];
};

const countActiveMembers = members.filter((member) => member.status === "Active").length;
const countPendingOrInvited = members.filter((member) => member.status === "Pending" || member.status === "Invited").length;

export default function MembersPage() {
  const [selectedMemberId, setSelectedMemberId] = useState<number>(members[0].id);
  const [selectedTemplateRole, setSelectedTemplateRole] = useState<RoleTemplate>("Planner");
  const [userOverrides, setUserOverrides] = useState<Record<number, UserOverride[]>>(initialUserOverrides);
  const [overrideMemberId, setOverrideMemberId] = useState<number>(members[0].id);
  const [overrideModule, setOverrideModule] = useState<PermissionModuleName>(defaultOverrideAction.module);
  const [overrideAction, setOverrideAction] = useState<PermissionAction>(defaultOverrideAction.action);
  const [overrideLevel, setOverrideLevel] = useState<PermissionLevel>("View");

  const selectedMember = useMemo(() => {
    return members.find((member) => member.id === selectedMemberId) ?? members[0];
  }, [selectedMemberId]);

  const selectedMemberTemplateRole = resolveRoleTemplate(selectedMember.role);
  const selectedMemberOverrides = userOverrides[selectedMember.id] ?? [];

  const selectedRoleTemplateMatrix = roleDefaultPermissions[selectedTemplateRole];

  const selectedMemberEffectivePermissions = useMemo(() => {
    const defaultTemplate = cloneTemplate(roleDefaultPermissions[selectedMemberTemplateRole]);
    (userOverrides[selectedMember.id] ?? []).forEach((override) => {
      if (defaultTemplate[override.module][override.action] !== undefined) {
        defaultTemplate[override.module][override.action] = override.level;
      }
    });
    return defaultTemplate;
  }, [selectedMember.id, selectedMemberTemplateRole, userOverrides]);

  const permissionSummary = useMemo(() => {
    const summary: Record<PermissionLevel, number> = {
      "No Access": 0,
      View: 0,
      Edit: 0,
      Manage: 0,
    };

    permissionModules.forEach((moduleConfig) => {
      moduleConfig.actions.forEach((action) => {
        const level = selectedMemberEffectivePermissions[moduleConfig.name][action] ?? "No Access";
        summary[level] += 1;
      });
    });

    return summary;
  }, [selectedMemberEffectivePermissions]);

  const applyOverride = () => {
    setUserOverrides((previous) => {
      const next = { ...previous };
      const current = [...(next[overrideMemberId] ?? [])];
      const existingIndex = current.findIndex(
        (item) => item.module === overrideModule && item.action === overrideAction,
      );

      const payload: UserOverride = {
        module: overrideModule,
        action: overrideAction,
        level: overrideLevel,
      };

      if (existingIndex >= 0) {
        current[existingIndex] = payload;
      } else {
        current.push(payload);
      }

      next[overrideMemberId] = current;
      return next;
    });
  };

  const removeOverride = (memberId: number, moduleName: PermissionModuleName, actionName: PermissionAction) => {
    setUserOverrides((previous) => {
      const next = { ...previous };
      next[memberId] = (next[memberId] ?? []).filter(
        (item) => !(item.module === moduleName && item.action === actionName),
      );
      return next;
    });
  };

  const handleModuleChange = (moduleName: PermissionModuleName) => {
    setOverrideModule(moduleName);
    const firstAction = getAllowedActionsForModule(moduleName)[0] ?? "View";
    setOverrideAction(firstAction);
  };

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
                    className={`rounded-2xl border p-4 transition ${
                      selectedMember.id === member.id
                        ? "border-rose-300 bg-rose-50/40"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    }`}
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
                      <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">Last Active</span>
                      <span className="text-sm text-slate-600">{member.lastActive}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedMemberId(member.id)}
                      className="mt-3 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-rose-300 hover:text-rose-700"
                    >
                      Preview Permissions
                    </button>
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
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Role Template</p>
                  <span className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${roleStyles[selectedMember.role]}`}>
                    {selectedMemberTemplateRole}
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
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">User Overrides</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">{selectedMemberOverrides.length} active override(s)</p>
                  <p className="mt-1 text-xs text-slate-500">Role defaults apply first, then user-level overrides are applied.</p>
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
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{countActiveMembers}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Pending invites</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{countPendingOrInvited}</p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Permission Foundation Status</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">Module + Action permission model active (UI-only)</p>
                <p className="mt-1 text-xs text-slate-500">No runtime enforcement and no Firebase integration in this phase.</p>
              </div>
            </div>
          </section>

          <section className="grid gap-4 xl:grid-cols-[1.1fr_1.35fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4">
                <p className="text-sm font-medium text-slate-500">Role Templates</p>
                <h2 className="text-xl font-semibold text-slate-900">Default Permission Profiles</h2>
              </div>

              <div className="space-y-3">
                {(Object.keys(roleDefaultPermissions) as RoleTemplate[]).map((role) => {
                  const isActiveRole = selectedTemplateRole === role;
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedTemplateRole(role)}
                      className={`w-full rounded-2xl border p-4 text-left transition ${
                        isActiveRole
                          ? "border-rose-300 bg-rose-50/40"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <p className="text-sm font-semibold text-slate-900">{role}</p>
                      <p className="mt-1 text-xs text-slate-500">{roleDescriptions[role]}</p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Selected template</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{selectedTemplateRole}</p>
                <p className="mt-1 text-xs text-slate-500">Used by the Permission Matrix panel for default role visualization.</p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">Permission Matrix</p>
                  <h2 className="text-xl font-semibold text-slate-900">Module + Action Default Matrix</h2>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  Template: {selectedTemplateRole}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-2 text-xs">
                  <thead>
                    <tr>
                      <th className="rounded-l-xl bg-slate-100 px-3 py-2 text-left font-semibold text-slate-600">Module</th>
                      {allActions.map((action) => (
                        <th key={action} className="bg-slate-100 px-3 py-2 text-left font-semibold text-slate-600">
                          {action}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {permissionModules.map((moduleConfig) => (
                      <tr key={moduleConfig.name}>
                        <td className="rounded-l-xl border border-slate-200 bg-white px-3 py-2 font-semibold text-slate-800">
                          {moduleConfig.name}
                        </td>
                        {allActions.map((action) => {
                          const supported = moduleConfig.actions.includes(action);
                          const level = selectedRoleTemplateMatrix[moduleConfig.name][action] ?? "No Access";
                          return (
                            <td key={`${moduleConfig.name}-${action}`} className="border border-slate-200 bg-white px-2 py-2">
                              {supported ? (
                                <span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-semibold ${levelStyles[level]}`}>
                                  {level}
                                </span>
                              ) : (
                                <span className="text-[10px] font-semibold text-slate-300">N/A</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="grid gap-4 xl:grid-cols-[1.15fr_1.3fr]">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4">
                <p className="text-sm font-medium text-slate-500">User Override Panel</p>
                <h2 className="text-xl font-semibold text-slate-900">Customize Individual Member Access</h2>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Member</label>
                  <select
                    value={overrideMemberId}
                    onChange={(event) => setOverrideMemberId(Number(event.target.value))}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  >
                    {members.map((member) => (
                      <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Module</label>
                  <select
                    value={overrideModule}
                    onChange={(event) => handleModuleChange(event.target.value as PermissionModuleName)}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  >
                    {permissionModules.map((moduleConfig) => (
                      <option key={moduleConfig.name} value={moduleConfig.name}>{moduleConfig.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Action</label>
                  <select
                    value={overrideAction}
                    onChange={(event) => setOverrideAction(event.target.value as PermissionAction)}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  >
                    {getAllowedActionsForModule(overrideModule).map((action) => (
                      <option key={action} value={action}>{action}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Permission Level</label>
                  <select
                    value={overrideLevel}
                    onChange={(event) => setOverrideLevel(event.target.value as PermissionLevel)}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  >
                    {permissionLevels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={applyOverride}
                  className="w-full rounded-2xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600"
                >
                  Apply User Override
                </button>
              </div>

              <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Current overrides for selected member</p>
                <div className="mt-3 space-y-2">
                  {selectedMemberOverrides.length === 0 ? (
                    <p className="text-xs text-slate-500">No overrides configured for this member.</p>
                  ) : (
                    selectedMemberOverrides.map((override) => (
                      <div
                        key={`${override.module}-${override.action}`}
                        className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2"
                      >
                        <p className="text-xs font-semibold text-slate-700">
                          {override.module} / {override.action}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${levelStyles[override.level]}`}>
                            {override.level}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeOverride(selectedMember.id, override.module, override.action)}
                            className="rounded-lg border border-slate-200 px-2 py-1 text-[10px] font-semibold text-slate-500 transition hover:border-rose-300 hover:text-rose-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4">
                  <p className="text-sm font-medium text-slate-500">Permission Summary</p>
                  <h2 className="text-xl font-semibold text-slate-900">Effective Access Breakdown</h2>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {permissionLevels.map((level) => (
                    <div key={level} className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{level}</p>
                      <p className="mt-2 text-2xl font-semibold text-slate-900">{permissionSummary[level]}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4">
                  <p className="text-sm font-medium text-slate-500">Member Permission Preview</p>
                  <h2 className="text-xl font-semibold text-slate-900">{selectedMember.name}</h2>
                  <p className="mt-1 text-xs text-slate-500">Role default + user override (effective permission view)</p>
                </div>

                <div className="space-y-3">
                  {permissionModules.map((moduleConfig) => (
                    <div key={moduleConfig.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{moduleConfig.name}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {moduleConfig.actions.map((action) => {
                          const value = selectedMemberEffectivePermissions[moduleConfig.name][action] ?? "No Access";
                          const isOverridden = selectedMemberOverrides.some(
                            (override) => override.module === moduleConfig.name && override.action === action,
                          );
                          return (
                            <span
                              key={`${moduleConfig.name}-${action}`}
                              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold ${levelStyles[value]}`}
                            >
                              {action}: {value}
                              {isOverridden ? <span className="text-[9px]">(override)</span> : null}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
