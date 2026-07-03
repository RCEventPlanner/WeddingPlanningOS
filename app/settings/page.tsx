import { Sidebar } from "../../components/Sidebar";
import { TopNav } from "../../components/TopNav";
import { WeddingHeader } from "../../components/WeddingHeader";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-8 lg:ml-[var(--sidebar-width)] lg:p-10">
        <TopNav title="Settings" />
        <WeddingHeader />

        <div className="mt-6 space-y-6">
          <section className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4">
                <p className="text-sm font-medium text-slate-500">Company Settings</p>
                <h2 className="text-xl font-semibold text-slate-900">Company Profile</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Company Name</label>
                  <input
                    type="text"
                    value="RC Event Planner"
                    readOnly
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Company Logo</label>
                  <div className="flex items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-3 py-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-sm font-semibold text-rose-600">
                      RC
                    </div>
                    <button
                      type="button"
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600"
                    >
                      Upload Logo
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Company Email</label>
                  <input
                    type="email"
                    value="hello@rceventplanner.com"
                    readOnly
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Company Phone</label>
                  <input
                    type="text"
                    value="+60 12 345 6789"
                    readOnly
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Company Address</label>
                  <textarea
                    rows={3}
                    value="No. 18, Jalan Merdeka, Kuala Lumpur, Malaysia"
                    readOnly
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4">
                <p className="text-sm font-medium text-slate-500">Wedding Default Settings</p>
                <h2 className="text-xl font-semibold text-slate-900">Defaults</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Default Wedding Time Zone</label>
                  <select className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100">
                    <option>Asia/Kuala Lumpur</option>
                    <option>Asia/Singapore</option>
                    <option>UTC</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Default Currency</label>
                  <select className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100">
                    <option>MYR (RM)</option>
                    <option>USD ($)</option>
                    <option>SGD (S$)</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Default Date Format</label>
                  <select className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100">
                    <option>DD/MM/YYYY</option>
                    <option>MM/DD/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Default Time Format</label>
                  <select className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100">
                    <option>24 Hour</option>
                    <option>12 Hour</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4">
                <p className="text-sm font-medium text-slate-500">Appearance</p>
                <h2 className="text-xl font-semibold text-slate-900">Theme</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-600">Light / Dark Theme</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
                    >
                      Light
                    </button>
                    <button
                      type="button"
                      className="rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-600"
                    >
                      Dark
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Language Selector</label>
                  <select className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100">
                    <option>English</option>
                    <option>Bahasa Malaysia</option>
                    <option>中文</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Primary Color Preview</label>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
                    <span className="h-8 w-8 rounded-full bg-rose-500" />
                    <span className="text-sm text-slate-600">Rose Accent</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4">
                <p className="text-sm font-medium text-slate-500">Notification Settings</p>
                <h2 className="text-xl font-semibold text-slate-900">Alerts</h2>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Email Notifications", status: "On" },
                  { label: "Push Notifications", status: "On" },
                  { label: "Reminder Notifications", status: "Off" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                    <span className="text-sm font-medium text-slate-700">{item.label}</span>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.status === "On"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4">
                <p className="text-sm font-medium text-slate-500">System Preferences</p>
                <h2 className="text-xl font-semibold text-slate-900">Behavior</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Default Dashboard</label>
                  <select className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100">
                    <option>Overview</option>
                    <option>Planner View</option>
                    <option>Live Rundown</option>
                  </select>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                  <span className="text-sm font-medium text-slate-700">Auto Save</span>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Enabled
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                  <span className="text-sm font-medium text-slate-700">Confirm Before Delete</span>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                    Required
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4">
              <p className="text-sm font-medium text-slate-500">About</p>
              <h2 className="text-xl font-semibold text-slate-900">Application Details</h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Product</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">Wedding Planning OS</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Version</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">1.0.0</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Build Number</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">2026.07.01</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Last Updated</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">01 July 2026</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
