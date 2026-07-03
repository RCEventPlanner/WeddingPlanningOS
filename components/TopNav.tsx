"use client";

import Link from "next/link";
import { useState } from "react";

type TopNavProps = {
  title?: string;
  showSearch?: boolean;
};

export function TopNav({
  title = "Dashboard",
  showSearch = true,
}: TopNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="mb-6 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-500">Wedding Planning OS</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">{title}</h2>
        </div>

        <div className="flex w-full items-center justify-end gap-2 sm:gap-3 lg:max-w-xl lg:flex-none lg:gap-3">
          {showSearch ? (
            <input
              type="search"
              placeholder="Search..."
              className="min-w-0 flex-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-rose-400 sm:px-4 lg:max-w-sm"
            />
          ) : null}

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 sm:px-4"
            >
              Notifications
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((current) => !current)}
                className="flex shrink-0 items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 text-left hover:bg-slate-50"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-100 text-sm font-semibold text-rose-600">R</span>
                <span className="hidden text-sm font-medium text-slate-700 sm:block">User Menu</span>
              </button>

              {menuOpen ? (
                <div className="absolute right-0 z-20 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
                  <button className="flex w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50">My Profile</button>
                  <Link href="/workspace" className="flex rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Switch Workspace</Link>
                  <Link href="/settings" className="flex rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Settings</Link>
                  <button className="flex w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50">Logout</button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
