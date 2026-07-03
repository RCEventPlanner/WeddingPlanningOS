"use client";

import { useWorkspaceProfile } from "./workspace/WorkspaceContext";

export function WeddingInfoForm() {
  const { workspaceProfile, setWorkspaceProfile } = useWorkspaceProfile();

  return (
    <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Wedding Information</h2>
        <p className="mt-1 text-sm text-slate-600">
          Update your wedding details with the latest planning info.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Workspace Name *
            </label>
            <input
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
              value={workspaceProfile.workspaceName}
              onChange={(event) => setWorkspaceProfile({ workspaceName: event.target.value })}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Couple 1
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                value={workspaceProfile.coupleOne}
                onChange={(event) => setWorkspaceProfile({ coupleOne: event.target.value })}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Couple 2
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                value={workspaceProfile.coupleTwo}
                onChange={(event) => setWorkspaceProfile({ coupleTwo: event.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Wedding Date
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                value={workspaceProfile.weddingDate}
                onChange={(event) => setWorkspaceProfile({ weddingDate: event.target.value })}
                type="date"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Venue
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
                value={workspaceProfile.venue}
                onChange={(event) => setWorkspaceProfile({ venue: event.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Theme
            </label>
            <input
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
              defaultValue="Modern Elegant"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Wedding Type
            </label>
            <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400">
              <option>Traditional</option>
              <option selected>Modern</option>
              <option>Garden</option>
              <option>Beach</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Estimated Guest Count
            </label>
            <input
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
              defaultValue="300"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Budget Target
            </label>
            <input
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
              defaultValue="RM 25,000"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Workspace Status
            </label>
            <select
              value={workspaceProfile.status}
              onChange={(event) =>
                setWorkspaceProfile({ status: event.target.value as "Active" | "Read Only" | "Archived" })
              }
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-400"
            >
              <option>Active</option>
              <option>Read Only</option>
              <option>Archived</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row">
        <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
          Save Changes
        </button>
        <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300">
          Cancel
        </button>
      </div>
    </section>
  );
}
