"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { Sidebar } from "../Sidebar";
import { TopNav } from "../TopNav";
import {
  DashboardModuleView,
  LiveRundownModuleView,
  RSVPModuleView,
  TasksModuleView,
  VendorsModuleView,
  GuestsModuleView,
  BudgetModuleView,
  WeddingProfileModuleView,
  type WorkspaceModuleKey,
  workspaceModuleMeta,
} from "./WorkspaceModuleViews";

type WorkspaceShellProps = {
  defaultModule: WorkspaceModuleKey;
  children: ReactNode;
};

const workspaceModuleViews = {
  dashboard: DashboardModuleView,
  wedding: WeddingProfileModuleView,
  budget: BudgetModuleView,
  vendors: VendorsModuleView,
  tasks: TasksModuleView,
  guests: GuestsModuleView,
  rsvp: RSVPModuleView,
  timeline: LiveRundownModuleView,
} as const;

export function WorkspaceShell({ defaultModule, children }: WorkspaceShellProps) {
  const [activeModule, setActiveModule] = useState<WorkspaceModuleKey>(defaultModule);
  const [collapsed, setCollapsed] = useState(false);

  const activeView = workspaceModuleViews[activeModule];
  const ActiveModuleView = activeView;
  const activeMeta = workspaceModuleMeta[activeModule];
  const defaultMeta = workspaceModuleMeta[defaultModule];

  const content = useMemo(() => {
    if (activeModule === defaultModule) {
      return children;
    }

    return <ActiveModuleView />;
  }, [ActiveModuleView, activeModule, children, defaultModule]);

  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <Sidebar
        mode="planner"
        collapsed={collapsed}
        activeWorkspaceModule={activeModule}
        onCollapseChange={setCollapsed}
        onWorkspaceSelect={(module) => {
          setActiveModule(module);
          setCollapsed(true);
        }}
      />

      <main className="flex-1 p-6 sm:p-8 lg:ml-[var(--sidebar-width)] lg:p-10">
        <TopNav
          title={activeMeta.title}
          workspaceName={activeMeta.workspaceName ?? defaultMeta.workspaceName}
          accessMode={activeMeta.accessMode ?? defaultMeta.accessMode}
        />
        {content}
      </main>
    </div>
  );
}
