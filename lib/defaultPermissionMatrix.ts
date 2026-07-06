export type PermissionLevel = "No Access" | "View" | "Edit" | "Manage";
export type RoleTemplate = "Planner" | "Coordinator" | "Couple" | "Couple Family / Friend" | "Vendor";
export type PermissionModuleName =
  | "Dashboard"
  | "Wedding Profile"
  | "Budget"
  | "Vendors"
  | "Tasks"
  | "Guests"
  | "RSVP"
  | "Live Rundown";

export const ROLE_OPTIONS: RoleTemplate[] = [
  "Planner",
  "Coordinator",
  "Couple",
  "Couple Family / Friend",
  "Vendor",
];

export const PERMISSION_MODULES: PermissionModuleName[] = [
  "Dashboard",
  "Wedding Profile",
  "Budget",
  "Vendors",
  "Tasks",
  "Guests",
  "RSVP",
  "Live Rundown",
];

export const DEFAULT_PERMISSION_MATRIX: Record<RoleTemplate, Record<PermissionModuleName, PermissionLevel>> = {
  Planner: {
    Dashboard: "Manage",
    "Wedding Profile": "Manage",
    Budget: "Manage",
    Vendors: "Manage",
    Tasks: "Manage",
    Guests: "Manage",
    RSVP: "Manage",
    "Live Rundown": "Manage",
  },
  Coordinator: {
    Dashboard: "View",
    "Wedding Profile": "No Access",
    Budget: "No Access",
    Vendors: "View",
    Tasks: "No Access",
    Guests: "No Access",
    RSVP: "View",
    "Live Rundown": "Edit",
  },
  Couple: {
    Dashboard: "View",
    "Wedding Profile": "Edit",
    Budget: "Edit",
    Vendors: "Edit",
    Tasks: "Edit",
    Guests: "Edit",
    RSVP: "Edit",
    "Live Rundown": "View",
  },
  "Couple Family / Friend": {
    Dashboard: "No Access",
    "Wedding Profile": "No Access",
    Budget: "No Access",
    Vendors: "No Access",
    Tasks: "No Access",
    Guests: "Edit",
    RSVP: "Edit",
    "Live Rundown": "View",
  },
  Vendor: {
    Dashboard: "No Access",
    "Wedding Profile": "No Access",
    Budget: "No Access",
    Vendors: "No Access",
    Tasks: "No Access",
    Guests: "No Access",
    RSVP: "No Access",
    "Live Rundown": "View",
  },
};

export const DEFAULT_PERMISSION_PROFILE_BY_ROLE: Record<RoleTemplate, string> = {
  Planner: "Planner Default",
  Coordinator: "Coordinator Default",
  Couple: "Couple Default",
  "Couple Family / Friend": "Couple Family / Friend Default",
  Vendor: "Vendor Default",
};

export const DEFAULT_TEMPLATE_SUMMARY_BY_ROLE: Record<RoleTemplate, string> = {
  Planner: "Full management across all modules.",
  Coordinator: "Operational visibility for cross-team coordination.",
  Couple: "Planning collaboration with selective editing access.",
  "Couple Family / Friend": "Family and friend support access focused on guests and RSVP.",
  Vendor: "Execution-focused view limited to live rundown coordination.",
};

export function getRoleDefaultPermissions(role: RoleTemplate): Record<PermissionModuleName, PermissionLevel> {
  return { ...DEFAULT_PERMISSION_MATRIX[role] };
}
