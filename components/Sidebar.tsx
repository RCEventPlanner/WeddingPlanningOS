'use client';

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import type { WorkspaceModuleKey } from "./workspace/WorkspaceModuleViews";

type NavItem = {
  label: string;
  href: string;
  icon: string;
};

type SidebarMode = "planner" | "coordinator" | "couple" | "vendor";

type SidebarProps = {
  mode?: SidebarMode;
  collapsed?: boolean;
  activeWorkspaceModule?: WorkspaceModuleKey;
  onCollapseChange?: (collapsed: boolean) => void;
  onWorkspaceSelect?: (module: WorkspaceModuleKey) => void;
};

const workspaceNavItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: "🏠" },
  { label: "Wedding Profile", href: "/wedding", icon: "💍" },
  { label: "Budget", href: "/budget", icon: "💰" },
  { label: "Vendors", href: "/vendors", icon: "🤝" },
  { label: "Tasks", href: "/tasks", icon: "✅" },
  { label: "Guests", href: "/guests", icon: "👥" },
  { label: "RSVP", href: "/rsvp", icon: "📨" },
  { label: "Live Rundown", href: "/timeline", icon: "🕒" },
];

const globalNavItems: Record<Exclude<SidebarMode, "couple" | "vendor">, NavItem[]> = {
  planner: [
    { label: "Workspace", href: "/workspace", icon: "🏢" },
    { label: "Members / User Management", href: "/members", icon: "👥" },
    { label: "Settings", href: "/settings", icon: "⚙️" },
  ],
  coordinator: [{ label: "Workspace", href: "/workspace", icon: "🏢" }],
};

const companyName = "RC Event Planner";
const companyLogo = "RC";

function getWorkspaceModuleFromHref(href: string): WorkspaceModuleKey | null {
  if (href === "/") return "dashboard";
  if (href === "/wedding") return "wedding";
  if (href === "/budget") return "budget";
  if (href === "/vendors") return "vendors";
  if (href === "/tasks") return "tasks";
  if (href === "/guests") return "guests";
  if (href === "/rsvp") return "rsvp";
  if (href === "/timeline") return "timeline";
  return null;
}

export function Sidebar({
  mode = "planner",
  collapsed,
  activeWorkspaceModule,
  onCollapseChange,
  onWorkspaceSelect,
}: SidebarProps) {
  const pathname = usePathname();
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const resolvedCollapsed = typeof collapsed === "boolean" ? collapsed : internalCollapsed;

  useEffect(() => {
    const sidebarWidth = resolvedCollapsed ? "5.25rem" : "18rem";
    document.documentElement.style.setProperty("--sidebar-width", sidebarWidth);
  }, [resolvedCollapsed]);

  const showGlobalNav = pathname === "/workspace" || pathname === "/members" || pathname === "/settings";
  const navItems = useMemo(() => (showGlobalNav ? globalNavItems[mode === "coordinator" ? "coordinator" : "planner"] : workspaceNavItems), [mode, showGlobalNav]);

  const collapsedShell = resolvedCollapsed ? "lg:px-2 lg:py-4" : "";
  const navLinkClasses = `flex items-center rounded-xl py-3 text-sm font-medium transition ${
    resolvedCollapsed ? "justify-center px-2" : "gap-3 px-3"
  }`;
  const resolvedWorkspaceModule = activeWorkspaceModule ?? getWorkspaceModuleFromHref(pathname);

  return (
    <>
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-40 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm lg:hidden"
      >
        Menu
      </button>

      {mobileOpen ? (
        <div className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden" onClick={() => setMobileOpen(false)} />
      ) : null}

      <aside
        className={`fixed left-0 top-0 z-50 h-full overflow-hidden border-r border-slate-200 bg-white/95 backdrop-blur transition-[width,transform] duration-200 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
        style={{ width: "var(--sidebar-width)" }}
      >
        <div className={`flex h-full flex-col p-4 sm:p-6 ${collapsedShell}`}>
          <div className={`mb-6 flex items-start gap-3 ${resolvedCollapsed ? "lg:justify-center" : "justify-between"}`}>
            <div className={`min-w-0 ${resolvedCollapsed ? "lg:hidden" : ""}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-500">Wedding Planning OS</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">Wedding Planning OS</h2>
              <p className="mt-2 text-sm text-slate-500">Keep everything organized in one calm place.</p>
            </div>

            <div className={`hidden h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white lg:flex ${resolvedCollapsed ? "lg:flex" : ""}`}>
              {companyLogo}
            </div>

            <button
              type="button"
              onClick={() => {
                const nextCollapsed = !resolvedCollapsed;
                if (onCollapseChange) {
                  onCollapseChange(nextCollapsed);
                } else {
                  setInternalCollapsed(nextCollapsed);
                }
                setMobileOpen(false);
              }}
              className={`ml-auto rounded-full border border-slate-200 bg-white font-semibold text-slate-700 lg:inline-flex ${
                resolvedCollapsed ? "px-2 py-2 text-sm" : "px-3 py-2 text-xs"
              }`}
              aria-label={resolvedCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={resolvedCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <span className="lg:hidden">{resolvedCollapsed ? "›" : "‹"}</span>
              <span className="hidden lg:inline">{resolvedCollapsed ? "›" : "Collapse"}</span>
            </button>
          </div>

          <div className={`mb-6 rounded-3xl border border-slate-200 bg-slate-50 p-4 ${resolvedCollapsed ? "lg:p-3" : ""}`}>
            <p className={`text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 ${resolvedCollapsed ? "lg:hidden" : ""}`}>Company</p>
            <div className={`mt-2 flex items-center ${resolvedCollapsed ? "justify-center" : "gap-3"}`}>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500 text-sm font-bold text-white">{companyLogo}</div>
              <div className={resolvedCollapsed ? "lg:hidden" : ""}>
                <p className="text-sm font-semibold text-slate-900">{companyName}</p>
                <p className="text-xs text-slate-500">Wedding Planning OS</p>
              </div>
            </div>
          </div>

          {showGlobalNav ? (
            <div className="mb-6">
              <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 ${resolvedCollapsed ? "lg:hidden" : ""}`}>Global Navigation</p>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-label={item.label}
                      title={item.label}
                      className={`${navLinkClasses} ${
                        isActive
                          ? "bg-rose-500 text-white shadow-sm"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className={resolvedCollapsed ? "hidden" : ""}>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          ) : null}

          <div className="mb-3">
            <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 ${resolvedCollapsed ? "lg:hidden" : ""}`}>Workspace Navigation</p>
          </div>

          <nav className="space-y-1">
            {!showGlobalNav
              ? navItems.map((item) => {
                  const nextModule = getWorkspaceModuleFromHref(item.href);
                  const isActive = resolvedWorkspaceModule ? resolvedWorkspaceModule === nextModule : pathname === item.href;

                  return (
                    <button
                      key={item.href}
                      type="button"
                      aria-label={item.label}
                      title={item.label}
                      onClick={() => {
                        if (nextModule && onWorkspaceSelect) {
                          onWorkspaceSelect(nextModule);
                          if (onCollapseChange) {
                            onCollapseChange(true);
                          } else {
                            setInternalCollapsed(true);
                          }
                        }
                        setMobileOpen(false);
                      }}
                      className={`${navLinkClasses} w-full text-left ${
                        isActive
                          ? "bg-rose-500 text-white shadow-sm"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span className={resolvedCollapsed ? "hidden" : ""}>{item.label}</span>
                    </button>
                  );
                })
              : null}
          </nav>

          <div className={`mt-auto rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 ${resolvedCollapsed ? "hidden" : ""}`}>
            <p className="font-semibold text-slate-900">Workspace access</p>
            <p className="mt-1">Active scope: {showGlobalNav ? "global" : "workspace"}</p>
            <p className="mt-2 text-xs text-slate-500">Read-only states and hidden actions are controlled by the active UI preview.</p>
          </div>
        </div>
      </aside>
    </>
  );
}
