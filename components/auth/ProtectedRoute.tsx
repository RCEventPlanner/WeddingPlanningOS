'use client';

import Link from "next/link";
import type { ReactNode } from "react";
import { useAuth } from "./AuthContext";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-medium text-slate-500">Authentication Required</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">Please sign in</h1>
          <p className="mt-3 text-sm text-slate-600">
            This area is reserved for authenticated users.
          </p>
          <Link
            href="/auth/login"
            className="mt-5 inline-flex rounded-2xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
