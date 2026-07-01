'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type UserRole = "Planner" | "Coordinator" | "Couple" | "Vendor User";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyName: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  supportedRoles: UserRole[];
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const mockUser: AuthUser = {
  id: "demo-planner",
  name: "Ava Thompson",
  email: "planner@rceventplanner.com",
  role: "Planner",
  companyName: "RC Event Planner",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const supportedRoles: UserRole[] = ["Planner", "Coordinator", "Couple", "Vendor User"];

  const signIn = (email: string, password: string) => {
    if (email.trim() && password.trim()) {
      setUser(mockUser);
    }
  };

  const signOut = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      signIn,
      signOut,
      supportedRoles,
    }),
    [user, supportedRoles],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    return {
      user: null,
      isAuthenticated: false,
      signIn: () => undefined,
      signOut: () => undefined,
      supportedRoles: ["Planner", "Coordinator", "Couple", "Vendor User"] as UserRole[],
    };
  }

  return context;
}
