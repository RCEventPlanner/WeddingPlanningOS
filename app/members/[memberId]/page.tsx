"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Sidebar } from "../../../components/Sidebar";
import { TopNav } from "../../../components/TopNav";
import {
  DEFAULT_PERMISSION_PROFILE_BY_ROLE,
  PERMISSION_MODULES,
  ROLE_OPTIONS,
  getRoleDefaultPermissions,
  type PermissionLevel,
  type PermissionModuleName,
  type RoleTemplate,
} from "../../../lib/defaultPermissionMatrix";

type ModuleColumnName = PermissionModuleName;

type Member = {
  id: number;
  avatar: string;
  name: string;
  email: string;
  phone: string;
  weddingPosition: string;
  systemRole: RoleTemplate;
  status: "Active" | "Pending" | "Invited" | "Disabled";
};

type WorkspacePermissionRow = {
  assigned: boolean;
  role: RoleTemplate;
  permissionProfile: string;
  modulePermissions: Record<ModuleColumnName, PermissionLevel>;
};

type MemberWorkspacePermissionDraft = Record<string, WorkspacePermissionRow>;

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
  },
];

const workspaceOptions = [
  { id: "aurora", name: "Aurora & Noah Wedding" },
  { id: "solstice", name: "Solstice Celebration Wedding" },
  { id: "evermore", name: "Evermore Wedding" },
  { id: "snowdrop", name: "Snowdrop Ceremony Wedding" },
];

const moduleColumns: ModuleColumnName[] = PERMISSION_MODULES;

const permissionLevels: PermissionLevel[] = ["No Access", "View", "Edit", "Manage"];

const permissionLevelStyles: Record<
  PermissionLevel,
  {
    select: string;
  }
> = {
  "No Access": {
    select: "border-red-300 bg-red-50 text-red-700 hover:bg-red-100",
  },
  View: {
    select: "border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100",
  },
  Edit: {
    select: "border-cyan-300 bg-cyan-50 text-cyan-700 hover:bg-cyan-100",
  },
  Manage: {
    select: "border-orange-400 bg-orange-50 text-orange-900 hover:bg-orange-100",
  },
};

const roleDefaultProfile: Record<RoleTemplate, string> = DEFAULT_PERMISSION_PROFILE_BY_ROLE;

const statusStyles: Record<Member["status"], string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Invited: "bg-sky-100 text-sky-700",
  Disabled: "bg-slate-200 text-slate-600",
};

const roleStyles: Record<RoleTemplate, string> = {
  Planner: "bg-orange-50 text-orange-900 border border-orange-400",
  Coordinator: "bg-amber-100 text-amber-900 border border-amber-500",
  Couple: "bg-cyan-50 text-cyan-700 border border-cyan-300",
  "Couple Family / Friend": "bg-teal-50 text-teal-700 border border-teal-300",
  Vendor: "bg-blue-50 text-blue-700 border border-blue-300",
};

const roleSelectStyles: Record<RoleTemplate, string> = {
  Planner: "border-orange-400 bg-orange-50 text-orange-900 hover:bg-orange-100",
  Coordinator: "border-amber-500 bg-amber-100 text-amber-900 hover:bg-amber-200",
  Couple: "border-cyan-300 bg-cyan-50 text-cyan-700 hover:bg-cyan-100",
  "Couple Family / Friend": "border-teal-300 bg-teal-50 text-teal-700 hover:bg-teal-100",
  Vendor: "border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100",
};

function getRoleDefaults(role: RoleTemplate): Record<ModuleColumnName, PermissionLevel> {
  return getRoleDefaultPermissions(role);
}

function createWorkspaceRow(role: RoleTemplate, assigned: boolean): WorkspacePermissionRow {
  return {
    assigned,
    role,
    permissionProfile: roleDefaultProfile[role],
    modulePermissions: getRoleDefaults(role),
  };
}

const initialWorkspacePermissionsByMember: Record<number, MemberWorkspacePermissionDraft> = {
  1: {
    aurora: createWorkspaceRow("Planner", true),
    solstice: createWorkspaceRow("Planner", true),
    evermore: createWorkspaceRow("Planner", true),
    snowdrop: createWorkspaceRow("Planner", false),
  },
  2: {
    aurora: createWorkspaceRow("Coordinator", true),
    solstice: createWorkspaceRow("Coordinator", false),
    evermore: createWorkspaceRow("Coordinator", false),
    snowdrop: createWorkspaceRow("Coordinator", true),
  },
  3: {
    aurora: createWorkspaceRow("Couple", false),
    solstice: createWorkspaceRow("Couple", true),
    evermore: createWorkspaceRow("Couple", false),
    snowdrop: createWorkspaceRow("Couple", false),
  },
  4: {
    aurora: createWorkspaceRow("Vendor", true),
    solstice: createWorkspaceRow("Vendor", false),
    evermore: createWorkspaceRow("Vendor", true),
    snowdrop: createWorkspaceRow("Vendor", false),
  },
};

function buildMemberDraft(memberRole: RoleTemplate): MemberWorkspacePermissionDraft {
  return workspaceOptions.reduce<MemberWorkspacePermissionDraft>((acc, workspace) => {
    acc[workspace.id] = createWorkspaceRow(memberRole, false);
    return acc;
  }, {});
}

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export default function MemberPermissionDetailsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ memberId: string }>();
  const memberId = Number(params.memberId);

  const member = useMemo(() => {
    return members.find((item) => item.id === memberId) ?? members[0];
  }, [memberId]);

  const [savedPermissionsByMember, setSavedPermissionsByMember] = useState(initialWorkspacePermissionsByMember);
  const [draftPermissionsByMember, setDraftPermissionsByMember] = useState(initialWorkspacePermissionsByMember);
  const [showLeaveDialog, setShowLeaveDialog] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  useEffect(() => {
    if (!savedPermissionsByMember[member.id]) {
      const defaultDraft = buildMemberDraft(member.systemRole);
      setSavedPermissionsByMember((previous) => ({
        ...previous,
        [member.id]: deepClone(defaultDraft),
      }));
      setDraftPermissionsByMember((previous) => ({
        ...previous,
        [member.id]: deepClone(defaultDraft),
      }));
    }
  }, [member.id, member.systemRole, savedPermissionsByMember]);

  const savedMemberDraft = savedPermissionsByMember[member.id] ?? buildMemberDraft(member.systemRole);
  const draftMemberPermissions = draftPermissionsByMember[member.id] ?? buildMemberDraft(member.systemRole);

  const hasUnsavedChanges = useMemo(() => {
    return JSON.stringify(savedMemberDraft) !== JSON.stringify(draftMemberPermissions);
  }, [draftMemberPermissions, savedMemberDraft]);

  const updateWorkspaceRow = (workspaceId: string, updater: (row: WorkspacePermissionRow) => WorkspacePermissionRow) => {
    setDraftPermissionsByMember((previous) => ({
      ...previous,
      [member.id]: {
        ...(previous[member.id] ?? buildMemberDraft(member.systemRole)),
        [workspaceId]: updater((previous[member.id] ?? buildMemberDraft(member.systemRole))[workspaceId]),
      },
    }));
  };

  const resetRowToRoleDefault = (workspaceId: string) => {
    updateWorkspaceRow(workspaceId, (row) => ({
      ...row,
      permissionProfile: roleDefaultProfile[row.role],
      modulePermissions: getRoleDefaults(row.role),
    }));
  };

  const resetAllRowsToRoleDefault = () => {
    setDraftPermissionsByMember((previous) => {
      const current = previous[member.id] ?? buildMemberDraft(member.systemRole);
      const nextRows = Object.keys(current).reduce<MemberWorkspacePermissionDraft>((acc, workspaceId) => {
        const row = current[workspaceId];
        acc[workspaceId] = {
          ...row,
          permissionProfile: roleDefaultProfile[row.role],
          modulePermissions: getRoleDefaults(row.role),
        };
        return acc;
      }, {});

      return {
        ...previous,
        [member.id]: nextRows,
      };
    });
  };

  const saveChanges = () => {
    setSavedPermissionsByMember((previous) => ({
      ...previous,
      [member.id]: deepClone(draftMemberPermissions),
    }));
  };

  const cancelChanges = () => {
    setDraftPermissionsByMember((previous) => ({
      ...previous,
      [member.id]: deepClone(savedMemberDraft),
    }));
  };

  const requestLeave = (href: string) => {
    if (!hasUnsavedChanges) {
      router.push(href);
      return;
    }

    setPendingHref(href);
    setShowLeaveDialog(true);
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!hasUnsavedChanges) {
        return;
      }
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (!hasUnsavedChanges) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;

      if (!anchor) {
        return;
      }

      const href = anchor.getAttribute("href");

      if (!href || href.startsWith("#") || href === pathname) {
        return;
      }

      event.preventDefault();
      setPendingHref(href);
      setShowLeaveDialog(true);
    };

    document.addEventListener("click", handleDocumentClick, true);
    return () => document.removeEventListener("click", handleDocumentClick, true);
  }, [hasUnsavedChanges, pathname]);

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <Sidebar mode="planner" />

      <main className="flex-1 p-6 sm:p-8 lg:ml-[var(--sidebar-width)] lg:p-10">
        <TopNav title="Manage Permissions" />

        <div className="mt-4 space-y-4">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-700">
                  {member.avatar}
                </div>
                <div>
                  <h1 className="text-2xl font-semibold text-slate-900">{member.name}</h1>
                  <p className="mt-1 text-sm text-slate-500">Workspace assignment and permission management.</p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                    <span className={`rounded-full px-2.5 py-1 font-semibold ${roleStyles[member.systemRole]}`}>
                      {member.systemRole}
                    </span>
                    <span className={`rounded-full px-2.5 py-1 font-semibold ${statusStyles[member.status]}`}>
                      {member.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                {hasUnsavedChanges ? (
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                    Unsaved Changes
                  </span>
                ) : (
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    All Changes Saved
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => requestLeave("/members")}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Back to Members
                </button>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Permission Layout</p>
                <h2 className="text-xl font-semibold text-slate-900">Workspace Permission Matrix</h2>
              </div>

              <button
                type="button"
                onClick={resetAllRowsToRoleDefault}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Reset to Role Default
              </button>
            </div>

            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-[1250px] border-separate border-spacing-y-2 text-xs">
                <thead>
                  <tr>
                    <th className="rounded-l-xl bg-slate-100 px-3 py-2 text-left font-semibold text-slate-600">Assigned</th>
                    <th className="bg-slate-100 px-3 py-2 text-left font-semibold text-slate-600">Workspace</th>
                    <th className="bg-slate-100 px-3 py-2 text-left font-semibold text-slate-600">Role</th>
                    {moduleColumns.map((moduleName, index) => (
                      <th
                        key={moduleName}
                        className={`${index === moduleColumns.length - 1 ? "rounded-r-xl" : ""} bg-slate-100 px-3 py-2 text-left font-semibold text-slate-600`}
                      >
                        {moduleName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {workspaceOptions.map((workspace) => {
                    const row = draftMemberPermissions[workspace.id] ?? createWorkspaceRow(member.systemRole, false);
                    const roleDefaults = getRoleDefaults(row.role);

                    return (
                      <tr key={workspace.id}>
                        <td className="rounded-l-xl border border-slate-200 bg-white px-3 py-2">
                          <input
                            type="checkbox"
                            checked={row.assigned}
                            onChange={(event) =>
                              updateWorkspaceRow(workspace.id, (current) => ({
                                ...current,
                                assigned: event.target.checked,
                              }))
                            }
                            className="h-4 w-4 rounded border-slate-300 text-rose-500 focus:ring-rose-300"
                          />
                        </td>
                        <td className="border border-slate-200 bg-white px-3 py-2 font-semibold text-slate-800">{workspace.name}</td>
                        <td className="border border-slate-200 bg-white px-2 py-2">
                          <div className="space-y-1">
                            <select
                              value={row.role}
                              onChange={(event) => {
                                const nextRole = event.target.value as RoleTemplate;
                                updateWorkspaceRow(workspace.id, (current) => ({
                                  ...current,
                                  role: nextRole,
                                  permissionProfile: roleDefaultProfile[nextRole],
                                  modulePermissions: getRoleDefaults(nextRole),
                                }));
                              }}
                              className={`w-full rounded-lg border px-2 py-1.5 text-[11px] font-semibold outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 ${roleSelectStyles[row.role]}`}
                            >
                              {ROLE_OPTIONS.map((role) => (
                                <option key={role} value={role}>
                                  {role}
                                </option>
                              ))}
                            </select>
                            <p className="text-[10px] text-slate-500">{row.permissionProfile}</p>
                          </div>
                        </td>

                        {moduleColumns.map((moduleName, moduleIndex) => {
                          const isOverride = row.modulePermissions[moduleName] !== roleDefaults[moduleName];
                          const level = row.modulePermissions[moduleName];

                          return (
                            <td
                              key={`${workspace.id}-${moduleName}`}
                              className={`${moduleIndex === moduleColumns.length - 1 ? "rounded-r-xl" : ""} border border-slate-200 bg-white px-2 py-2`}
                            >
                              <div className="relative">
                                {isOverride ? <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-orange-500" /> : null}
                                <select
                                  value={level}
                                  onChange={(event) => {
                                    const nextLevel = event.target.value as PermissionLevel;
                                    updateWorkspaceRow(workspace.id, (current) => ({
                                      ...current,
                                      modulePermissions: {
                                        ...current.modulePermissions,
                                        [moduleName]: nextLevel,
                                      },
                                    }));
                                  }}
                                  className={`w-full rounded-lg border px-2 py-1.5 pr-5 text-[11px] font-semibold outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 ${permissionLevelStyles[level].select} ${
                                    isOverride ? "border-orange-400 ring-1 ring-orange-200" : ""
                                  }`}
                                >
                                  {permissionLevels.map((level) => (
                                    <option key={level} value={level}>
                                      {level}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 md:hidden">
              {workspaceOptions.map((workspace) => {
                const row = draftMemberPermissions[workspace.id] ?? createWorkspaceRow(member.systemRole, false);
                const roleDefaults = getRoleDefaults(row.role);

                return (
                  <article key={workspace.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-slate-900">{workspace.name}</p>
                      <label className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                        <input
                          type="checkbox"
                          checked={row.assigned}
                          onChange={(event) =>
                            updateWorkspaceRow(workspace.id, (current) => ({
                              ...current,
                              assigned: event.target.checked,
                            }))
                          }
                          className="h-4 w-4 rounded border-slate-300 text-rose-500 focus:ring-rose-300"
                        />
                        Assigned
                      </label>
                    </div>

                    <div className="mt-3 space-y-2">
                      <div>
                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Role</label>
                        <select
                          value={row.role}
                          onChange={(event) => {
                            const nextRole = event.target.value as RoleTemplate;
                            updateWorkspaceRow(workspace.id, (current) => ({
                              ...current,
                              role: nextRole,
                              permissionProfile: roleDefaultProfile[nextRole],
                              modulePermissions: getRoleDefaults(nextRole),
                            }));
                          }}
                          className={`w-full rounded-xl border px-3 py-2 text-sm font-semibold outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 ${roleSelectStyles[row.role]}`}
                        >
                          {ROLE_OPTIONS.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                        <p className="mt-1 text-xs text-slate-500">{row.permissionProfile}</p>
                      </div>

                      {moduleColumns.map((moduleName) => {
                        const isOverride = row.modulePermissions[moduleName] !== roleDefaults[moduleName];
                        const level = row.modulePermissions[moduleName];
                        return (
                          <div key={`${workspace.id}-${moduleName}`}>
                            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                              {moduleName}
                            </label>
                            <div className="relative">
                              {isOverride ? <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-orange-500" /> : null}
                              <select
                                value={level}
                                onChange={(event) => {
                                  const nextLevel = event.target.value as PermissionLevel;
                                  updateWorkspaceRow(workspace.id, (current) => ({
                                    ...current,
                                    modulePermissions: {
                                      ...current.modulePermissions,
                                      [moduleName]: nextLevel,
                                    },
                                  }));
                                }}
                                className={`w-full rounded-xl border px-3 py-2 pr-6 text-sm font-semibold outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 ${permissionLevelStyles[level].select} ${
                                  isOverride ? "border-orange-400 ring-1 ring-orange-200" : ""
                                }`}
                              >
                                {permissionLevels.map((level) => (
                                  <option key={level} value={level}>
                                    {level}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        );
                      })}

                      <button
                        type="button"
                        onClick={() => resetRowToRoleDefault(workspace.id)}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
                      >
                        Reset to Role Default
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={cancelChanges}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveChanges}
                className="rounded-2xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600"
              >
                Save Changes
              </button>
            </div>
          </section>
        </div>

        {showLeaveDialog ? (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Unsaved Changes"
          >
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-5 shadow-xl">
              <h3 className="text-lg font-semibold text-slate-900">You have unsaved permission changes.</h3>
              <p className="mt-2 text-sm text-slate-600">Leave without saving?</p>

              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowLeaveDialog(false);
                    setPendingHref(null);
                  }}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700"
                >
                  Stay
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const nextHref = pendingHref;
                    setShowLeaveDialog(false);
                    setPendingHref(null);
                    if (nextHref) {
                      router.push(nextHref);
                    }
                  }}
                  className="rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white"
                >
                  Leave Without Saving
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
