"use client";

import { useState } from "react";

type TabKey = "Overview" | "Ceremony" | "Reception" | "Vendors" | "Notes";

const tabs: TabKey[] = ["Overview", "Ceremony", "Reception", "Vendors", "Notes"];

const tabContent: Record<TabKey, string> = {
  Overview: "A quick overview of your wedding plan and upcoming milestones.",
  Ceremony: "Ceremony details and planning notes will appear here.",
  Reception: "Reception setup, seating, and entertainment details will appear here.",
  Vendors: "Your vendors, contacts, and confirmations will appear here.",
  Notes: "Personal reminders and helpful notes will appear here.",
};

export function WeddingTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("Overview");

  return (
    <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-rose-500 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
        <p className="font-medium text-slate-900">{activeTab}</p>
        <p className="mt-2">{tabContent[activeTab]}</p>
      </div>
    </div>
  );
}
