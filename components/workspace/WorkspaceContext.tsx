"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type WorkspaceStatus = "Active" | "Read Only" | "Archived";
export type ServicePackage = "Full Planning" | "Half Planning" | "Coordination" | "Website Only";

export type WorkspaceProfile = {
  workspaceName: string;
  coupleOne: string;
  coupleTwo: string;
  weddingDate: string;
  venue: string;
  service: ServicePackage;
  status: WorkspaceStatus;
  assignedPlanner: string;
  leadCoordinator: string;
};

type WorkspaceContextValue = {
  workspaceProfile: WorkspaceProfile;
  setWorkspaceProfile: (updates: Partial<WorkspaceProfile>) => void;
};

const defaultWorkspaceProfile: WorkspaceProfile = {
  workspaceName: "Rachel & Kiser Wedding",
  coupleOne: "Rachel Lim",
  coupleTwo: "Kiser Chai",
  weddingDate: "2026-12-20",
  venue: "Grand Ballroom Kuala Lumpur",
  service: "Full Planning",
  status: "Active",
  assignedPlanner: "Amanda Low",
  leadCoordinator: "Hafiz Rahman",
};

const WorkspaceContext = createContext<WorkspaceContextValue | undefined>(undefined);

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [workspaceProfile, setWorkspaceProfileState] = useState<WorkspaceProfile>(defaultWorkspaceProfile);

  const setWorkspaceProfile = (updates: Partial<WorkspaceProfile>) => {
    setWorkspaceProfileState((previous) => ({ ...previous, ...updates }));
  };

  const value = useMemo(
    () => ({
      workspaceProfile,
      setWorkspaceProfile,
    }),
    [workspaceProfile],
  );

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspaceProfile() {
  const context = useContext(WorkspaceContext);

  if (!context) {
    throw new Error("useWorkspaceProfile must be used within WorkspaceProvider");
  }

  return context;
}
