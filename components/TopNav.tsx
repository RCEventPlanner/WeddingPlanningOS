"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { RecentActivity } from "./RecentActivity";
import { useWorkspaceProfile } from "./workspace/WorkspaceContext";

type WorkspaceUserRole = "planner" | "coordinator" | "vendor" | "couple";
type WeddingProfileTab = "wedding" | "groom" | "bride" | "family" | "preferences";

type TopNavProps = {
  title?: string;
  showSearch?: boolean;
  userRole?: WorkspaceUserRole;
};

export function TopNav({
  title = "Dashboard",
  showSearch = true,
  userRole = "planner",
}: TopNavProps) {
  const { workspaceProfile, setWorkspaceProfile } = useWorkspaceProfile();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationCenterOpen, setNotificationCenterOpen] = useState(false);
  const [weddingProfileOpen, setWeddingProfileOpen] = useState(false);
  const [activeWeddingProfileTab, setActiveWeddingProfileTab] = useState<WeddingProfileTab>("wedding");
  const [weddingProfileForm, setWeddingProfileForm] = useState({
    workspaceName: workspaceProfile.workspaceName,
    weddingDate: workspaceProfile.weddingDate,
    weddingVenue: workspaceProfile.venue,
    eventSize: "Medium" as "Small" | "Medium" | "Large",
    weddingStyle: "Chinese" as "Chinese" | "Western" | "Buffet",
    tableStyle: "Round Table" as "Round Table" | "Long Table",
    foodServing: "Banquet" as "Banquet" | "Buffet",
    receptionStartTime: "19:00",
    teaCeremonyDateTime: "2026-12-20T09:00",
    teaCeremonyLocation: "Bride Family Residence",
    ceremonyTime: "10:00 AM",
    ceremonyLocation: "Grand Ballroom - Hall A",
    receptionTime: "7:00 PM",
    receptionLocation: "Grand Ballroom - Hall B",
    groomFullName: workspaceProfile.coupleTwo,
    groomPreferredName: "Kiser",
    groomPhone: "+60 12-778 9922",
    groomEmail: "kiser@example.com",
    brideFullName: workspaceProfile.coupleOne,
    bridePreferredName: "Rachel",
    bridePhone: "+60 12-455 8811",
    brideEmail: "rachel@example.com",
    emergencyContactName: "Hafiz Rahman",
    emergencyContactPhone: "+60 11-4455 6677",
    groomFatherName: "Alex Chai",
    groomMotherName: "Michelle Chai",
    brideFatherName: "David Lim",
    brideMotherName: "Susan Lim",
    familyNotes: "Parents to be seated at VIP front-row tables.",
    dietaryPreference: "Halal-friendly buffet with vegetarian options",
    culturalPreferences: "Tea ceremony before reception",
    specialNotes: "Provide private resting room for couple after ceremony.",
  });

  const isCouple = userRole === "couple";

  const weddingProfileTabs: Array<{ key: WeddingProfileTab; label: string }> = [
    { key: "wedding", label: "Wedding" },
    { key: "groom", label: "Groom" },
    { key: "bride", label: "Bride" },
    { key: "family", label: "Family" },
    { key: "preferences", label: "Preferences" },
  ];

  const systemNotifications = [
    {
      title: "Member Invitation Accepted",
      description: "Nadia Rahman accepted the invitation and joined Aurora & Noah Wedding.",
      time: "2 hours ago",
      tone: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Permission Updated",
      description: "Planner Default profile was updated for Coordinator role.",
      time: "Today",
      tone: "bg-sky-100 text-sky-700",
    },
    {
      title: "Workspace Created",
      description: "Snowdrop Ceremony Wedding workspace has been created.",
      time: "Yesterday",
      tone: "bg-violet-100 text-violet-700",
    },
    {
      title: "Company Settings Updated",
      description: "Timezone and default notification preferences were changed.",
      time: "2 days ago",
      tone: "bg-amber-100 text-amber-700",
    },
  ];

  const weddingReminders = [
    {
      title: "RSVP Deadline Approaching",
      description: "12 guests still pending RSVP. Deadline is in 3 days.",
      time: "In 3 days",
      tone: "bg-rose-100 text-rose-700",
    },
    {
      title: "Vendor Payment Reminder",
      description: "Photographer balance payment is due this Friday.",
      time: "This Friday",
      tone: "bg-orange-100 text-orange-700",
    },
    {
      title: "Upcoming Rehearsal",
      description: "Wedding rehearsal begins at 6:00 PM, Grand Hall.",
      time: "Tomorrow",
      tone: "bg-cyan-100 text-cyan-700",
    },
    {
      title: "Wedding Countdown",
      description: "18 days left until wedding day.",
      time: "Countdown",
      tone: "bg-indigo-100 text-indigo-700",
    },
  ];

  useEffect(() => {
    if (!notificationCenterOpen && !weddingProfileOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setNotificationCenterOpen(false);
        setWeddingProfileOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [notificationCenterOpen, weddingProfileOpen]);

  const openWeddingProfileModal = () => {
    setWeddingProfileForm((previous) => ({
      ...previous,
      workspaceName: workspaceProfile.workspaceName,
      weddingDate: workspaceProfile.weddingDate,
      weddingVenue: workspaceProfile.venue,
      brideFullName: workspaceProfile.coupleOne,
      groomFullName: workspaceProfile.coupleTwo,
    }));
    setActiveWeddingProfileTab("wedding");
    setMenuOpen(false);
    setWeddingProfileOpen(true);
  };

  const closeWeddingProfileModal = () => {
    setWeddingProfileOpen(false);
  };

  const saveWeddingProfileMock = () => {
    setWorkspaceProfile({
      workspaceName: weddingProfileForm.workspaceName,
      weddingDate: weddingProfileForm.weddingDate,
      venue: weddingProfileForm.weddingVenue,
      coupleOne: weddingProfileForm.brideFullName,
      coupleTwo: weddingProfileForm.groomFullName,
    });
    setWeddingProfileOpen(false);
  };

  return (
    <>
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
                onClick={() => setNotificationCenterOpen(true)}
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50"
                aria-label="Open Notification Center"
              >
                <span aria-hidden="true">🔔</span>
                <span className="absolute -right-1 -top-1 rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                  8
                </span>
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
                    <button
                      type="button"
                      onClick={openWeddingProfileModal}
                      className="flex w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      My Wedding Profile
                    </button>
                    {!isCouple ? (
                      <Link href="/workspace" className="flex rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                        Switch Workspace
                      </Link>
                    ) : null}
                    <button className="flex w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50">Logout</button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 transition ${notificationCenterOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!notificationCenterOpen}
      >
        <button
          type="button"
          onClick={() => setNotificationCenterOpen(false)}
          className={`absolute inset-0 bg-slate-900/40 transition-opacity duration-300 ${notificationCenterOpen ? "opacity-100" : "opacity-0"}`}
          aria-label="Close Notification Center overlay"
        />

        <aside
          role="dialog"
          aria-modal="true"
          aria-label="Notification Center"
          className={`absolute right-0 top-0 h-full w-full max-w-xl transform border-l border-slate-200 bg-slate-50 shadow-xl transition-transform duration-300 sm:max-w-lg ${
            notificationCenterOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-start justify-between gap-3 border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-500">Notification Center</p>
                <h3 className="mt-2 text-xl font-semibold text-slate-900">All Notifications</h3>
                <p className="mt-1 text-sm text-slate-500">Unified hub for activity, system updates, and reminders.</p>
              </div>

              <button
                type="button"
                onClick={() => setNotificationCenterOpen(false)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="mb-3">
                  <h4 className="text-base font-semibold text-slate-900">Recent Activity</h4>
                  <p className="mt-1 text-sm text-slate-600">Member and workspace activity timeline.</p>
                </div>
                <RecentActivity showHeading={false} compact showCard={false} className="mt-0" />
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="mb-3">
                  <h4 className="text-base font-semibold text-slate-900">System Notifications</h4>
                  <p className="mt-1 text-sm text-slate-600">Important system-level events and updates.</p>
                </div>

                <div className="space-y-3">
                  {systemNotifications.map((item) => (
                    <article key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <div className="flex items-center justify-between gap-2">
                        <h5 className="text-sm font-semibold text-slate-900">{item.title}</h5>
                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${item.tone}`}>{item.time}</span>
                      </div>
                      <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
                <div className="mb-3">
                  <h4 className="text-base font-semibold text-slate-900">Wedding Reminders</h4>
                  <p className="mt-1 text-sm text-slate-600">Upcoming deadlines, events, and payment reminders.</p>
                </div>

                <div className="space-y-3">
                  {weddingReminders.map((item) => (
                    <article key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <div className="flex items-center justify-between gap-2">
                        <h5 className="text-sm font-semibold text-slate-900">{item.title}</h5>
                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${item.tone}`}>{item.time}</span>
                      </div>
                      <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </aside>
      </div>

      <div
        className={`fixed inset-0 z-[60] transition ${weddingProfileOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!weddingProfileOpen}
      >
        <button
          type="button"
          onClick={closeWeddingProfileModal}
          className={`absolute inset-0 bg-slate-900/45 transition-opacity duration-300 ${weddingProfileOpen ? "opacity-100" : "opacity-0"}`}
          aria-label="Close My Wedding Profile overlay"
        />

        <section
          role="dialog"
          aria-modal="true"
          aria-label="My Wedding Profile"
          className={`absolute left-1/2 top-1/2 w-[95vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-slate-200 bg-white shadow-2xl transition duration-300 ${
            weddingProfileOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-start justify-between gap-3 border-b border-slate-200 px-4 py-4 sm:px-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-500">Current Wedding Settings</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">My Wedding Profile</h3>
              <p className="mt-1 text-sm text-slate-500">Single source of truth for all wedding-specific information.</p>
            </div>

            <button
              type="button"
              onClick={closeWeddingProfileModal}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Close
            </button>
          </div>

          <div className="border-b border-slate-200 px-4 py-3 sm:px-6">
            <div className="flex flex-wrap gap-2">
              {weddingProfileTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveWeddingProfileTab(tab.key)}
                  className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${
                    activeWeddingProfileTab === tab.key
                      ? "bg-rose-500 text-white"
                      : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="max-h-[70vh] overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
            {activeWeddingProfileTab === "wedding" ? (
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Workspace Name</label>
                  <input
                    type="text"
                    value={weddingProfileForm.workspaceName}
                    onChange={(event) => setWeddingProfileForm((prev) => ({ ...prev, workspaceName: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Wedding Date</label>
                  <input
                    type="date"
                    value={weddingProfileForm.weddingDate}
                    onChange={(event) => setWeddingProfileForm((prev) => ({ ...prev, weddingDate: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Wedding Venue</label>
                  <input
                    type="text"
                    value={weddingProfileForm.weddingVenue}
                    onChange={(event) => setWeddingProfileForm((prev) => ({ ...prev, weddingVenue: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Reception Start Time</label>
                  <input
                    type="time"
                    value={weddingProfileForm.receptionStartTime}
                    onChange={(event) => setWeddingProfileForm((prev) => ({ ...prev, receptionStartTime: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Event Size</label>
                  <select
                    value={weddingProfileForm.eventSize}
                    onChange={(event) => setWeddingProfileForm((prev) => ({ ...prev, eventSize: event.target.value as "Small" | "Medium" | "Large" }))}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  >
                    <option value="Small">Small (&lt;100 pax)</option>
                    <option value="Medium">Medium (100-250 pax)</option>
                    <option value="Large">Large (&gt;250 pax)</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Wedding Style</label>
                  <select
                    value={weddingProfileForm.weddingStyle}
                    onChange={(event) =>
                      setWeddingProfileForm((prev) => ({
                        ...prev,
                        weddingStyle: event.target.value as "Chinese" | "Western" | "Buffet",
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  >
                    <option value="Chinese">Chinese</option>
                    <option value="Western">Western</option>
                    <option value="Buffet">Buffet</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Table Style</label>
                  <select
                    value={weddingProfileForm.tableStyle}
                    onChange={(event) =>
                      setWeddingProfileForm((prev) => ({
                        ...prev,
                        tableStyle: event.target.value as "Round Table" | "Long Table",
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  >
                    <option value="Round Table">Round Table</option>
                    <option value="Long Table">Long Table</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Food Serving</label>
                  <select
                    value={weddingProfileForm.foodServing}
                    onChange={(event) =>
                      setWeddingProfileForm((prev) => ({
                        ...prev,
                        foodServing: event.target.value as "Banquet" | "Buffet",
                      }))
                    }
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  >
                    <option value="Banquet">Banquet</option>
                    <option value="Buffet">Buffet</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Tea Ceremony Date &amp; Time</label>
                  <input
                    type="datetime-local"
                    value={weddingProfileForm.teaCeremonyDateTime}
                    onChange={(event) => setWeddingProfileForm((prev) => ({ ...prev, teaCeremonyDateTime: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Tea Ceremony Location</label>
                  <input
                    type="text"
                    value={weddingProfileForm.teaCeremonyLocation}
                    onChange={(event) => setWeddingProfileForm((prev) => ({ ...prev, teaCeremonyLocation: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Ceremony Time</label>
                  <input
                    type="text"
                    value={weddingProfileForm.ceremonyTime}
                    onChange={(event) => setWeddingProfileForm((prev) => ({ ...prev, ceremonyTime: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Ceremony Location</label>
                  <input
                    type="text"
                    value={weddingProfileForm.ceremonyLocation}
                    onChange={(event) => setWeddingProfileForm((prev) => ({ ...prev, ceremonyLocation: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>
              </div>
            ) : null}

            {activeWeddingProfileTab === "groom" ? (
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Groom Full Name</label>
                  <input
                    type="text"
                    value={weddingProfileForm.groomFullName}
                    onChange={(event) => setWeddingProfileForm((prev) => ({ ...prev, groomFullName: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Preferred Name</label>
                  <input
                    type="text"
                    value={weddingProfileForm.groomPreferredName}
                    onChange={(event) => setWeddingProfileForm((prev) => ({ ...prev, groomPreferredName: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Phone</label>
                  <input
                    type="text"
                    value={weddingProfileForm.groomPhone}
                    onChange={(event) => setWeddingProfileForm((prev) => ({ ...prev, groomPhone: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Email</label>
                  <input
                    type="email"
                    value={weddingProfileForm.groomEmail}
                    onChange={(event) => setWeddingProfileForm((prev) => ({ ...prev, groomEmail: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>
              </div>
            ) : null}

            {activeWeddingProfileTab === "bride" ? (
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Bride Full Name</label>
                  <input
                    type="text"
                    value={weddingProfileForm.brideFullName}
                    onChange={(event) => setWeddingProfileForm((prev) => ({ ...prev, brideFullName: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Preferred Name</label>
                  <input
                    type="text"
                    value={weddingProfileForm.bridePreferredName}
                    onChange={(event) => setWeddingProfileForm((prev) => ({ ...prev, bridePreferredName: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Phone</label>
                  <input
                    type="text"
                    value={weddingProfileForm.bridePhone}
                    onChange={(event) => setWeddingProfileForm((prev) => ({ ...prev, bridePhone: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Email</label>
                  <input
                    type="email"
                    value={weddingProfileForm.brideEmail}
                    onChange={(event) => setWeddingProfileForm((prev) => ({ ...prev, brideEmail: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>
              </div>
            ) : null}

            {activeWeddingProfileTab === "family" ? (
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Groom's Father</label>
                  <input
                    type="text"
                    value={weddingProfileForm.groomFatherName}
                    onChange={(event) => setWeddingProfileForm((prev) => ({ ...prev, groomFatherName: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Groom's Mother</label>
                  <input
                    type="text"
                    value={weddingProfileForm.groomMotherName}
                    onChange={(event) => setWeddingProfileForm((prev) => ({ ...prev, groomMotherName: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Bride's Father</label>
                  <input
                    type="text"
                    value={weddingProfileForm.brideFatherName}
                    onChange={(event) => setWeddingProfileForm((prev) => ({ ...prev, brideFatherName: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Bride's Mother</label>
                  <input
                    type="text"
                    value={weddingProfileForm.brideMotherName}
                    onChange={(event) => setWeddingProfileForm((prev) => ({ ...prev, brideMotherName: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-slate-600">Family / Parent Notes</label>
                  <textarea
                    value={weddingProfileForm.familyNotes}
                    onChange={(event) => setWeddingProfileForm((prev) => ({ ...prev, familyNotes: event.target.value }))}
                    rows={4}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>
              </div>
            ) : null}

            {activeWeddingProfileTab === "preferences" ? (
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Emergency Contact Name</label>
                  <input
                    type="text"
                    value={weddingProfileForm.emergencyContactName}
                    onChange={(event) => setWeddingProfileForm((prev) => ({ ...prev, emergencyContactName: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-600">Emergency Contact Phone</label>
                  <input
                    type="text"
                    value={weddingProfileForm.emergencyContactPhone}
                    onChange={(event) => setWeddingProfileForm((prev) => ({ ...prev, emergencyContactPhone: event.target.value }))}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-slate-600">Dietary Preferences</label>
                  <textarea
                    value={weddingProfileForm.dietaryPreference}
                    onChange={(event) => setWeddingProfileForm((prev) => ({ ...prev, dietaryPreference: event.target.value }))}
                    rows={3}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-slate-600">Cultural / Ceremony Preferences</label>
                  <textarea
                    value={weddingProfileForm.culturalPreferences}
                    onChange={(event) => setWeddingProfileForm((prev) => ({ ...prev, culturalPreferences: event.target.value }))}
                    rows={3}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium text-slate-600">Special Notes / Preferences</label>
                  <textarea
                    value={weddingProfileForm.specialNotes}
                    onChange={(event) => setWeddingProfileForm((prev) => ({ ...prev, specialNotes: event.target.value }))}
                    rows={4}
                    className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-2 border-t border-slate-200 px-4 py-4 sm:flex-row sm:justify-end sm:px-6">
            <button
              type="button"
              onClick={closeWeddingProfileModal}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveWeddingProfileMock}
              className="rounded-2xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-600"
            >
              Save (Mock)
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
