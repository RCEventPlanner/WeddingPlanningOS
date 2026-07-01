'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
  icon: string;
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: "🏠" },
  { label: "Workspace", href: "/workspace", icon: "🏢" },
  { label: "Wedding Profile", href: "/wedding", icon: "💍" },
  { label: "Guests", href: "/guests", icon: "👥" },
  { label: "RSVP", href: "/rsvp", icon: "📨" },
  { label: "Budget", href: "/budget", icon: "💰" },
  { label: "Vendors", href: "/vendors", icon: "🤝" },
  { label: "Tasks", href: "/tasks", icon: "✅" },
  { label: "Live Rundown", href: "/timeline", icon: "🕒" },
  { label: "Settings", href: "/settings", icon: "⚙️" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full border-b border-slate-200 bg-white/90 backdrop-blur lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <div className="flex h-full flex-col p-4 sm:p-6">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-500">
            Wedding Planning OS
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">
            Wedding Planning OS
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Keep everything organized in one calm place.
          </p>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-rose-500 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-900">Tip of the day</p>
          <p className="mt-1">
            Review your vendor checklist every Friday to stay ahead.
          </p>
        </div>
      </div>
    </aside>
  );
}
