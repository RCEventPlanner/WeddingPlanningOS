"use client";

import { useMemo, useState } from "react";

type RundownStatus = "" | "Current" | "Completed" | "Delayed" | "Skipped";

type RundownRow = {
  id: string;
  estimateTime: string;
  actualTime: string;
  program: string;
  usedTime: number;
  coordinatorAction: string;
  status: RundownStatus;
  remarks: string;
  vendorInvolve: string[];
  foodServing: string;
  song: string;
  screen: string;
};

const vendorOptions = ["Catering", "DJ", "Emcee", "Photographer", "Videographer", "AV", "Decor"];

type EditableRow = Omit<RundownRow, "usedTime" | "status"> & {
  usedTime: string;
  status: RundownStatus;
};

const initialRows: RundownRow[] = [
  {
    id: "guest-arrival",
    estimateTime: "6:30 PM",
    actualTime: "6:28 PM",
    program: "Guest Registration",
    usedTime: 30,
    coordinatorAction: "Prepare registration desk and welcome team.",
    status: "Completed",
    remarks: "Reception ready",
    vendorInvolve: ["Photographer", "Videographer"],
    foodServing: "",
    song: "Background Playlist",
    screen: "Welcome Slide",
  },
  {
    id: "first-march-in",
    estimateTime: "7:00 PM",
    actualTime: "",
    program: "First March In",
    usedTime: 10,
    coordinatorAction: "Cue emcee, DJ, photographer and videographer.",
    status: "",
    remarks: "Standby all teams",
    vendorInvolve: ["DJ", "Emcee", "Photographer", "Videographer"],
    foodServing: "1st Course",
    song: "Canon in D",
    screen: "Opening Animation",
  },
  {
    id: "opening-speech",
    estimateTime: "7:10 PM",
    actualTime: "",
    program: "Opening Speech",
    usedTime: 5,
    coordinatorAction: "Confirm microphone and emcee standby.",
    status: "",
    remarks: "Emcee standby",
    vendorInvolve: ["Emcee"],
    foodServing: "",
    song: "Speech Music",
    screen: "Couple Introduction",
  },
  {
    id: "dinner-service",
    estimateTime: "7:15 PM",
    actualTime: "",
    program: "Dinner Service",
    usedTime: 15,
    coordinatorAction: "Wait for catering greenlight before next sequence.",
    status: "",
    remarks: "Kitchen ready check",
    vendorInvolve: ["Catering"],
    foodServing: "2nd Course",
    song: "Soft Piano",
    screen: "Dinner Slide",
  },
];

const statusStyles: Record<RundownStatus, string> = {
  "": "bg-slate-100 text-slate-500",
  Current: "bg-emerald-100 text-emerald-700",
  Completed: "bg-slate-200 text-slate-600",
  Delayed: "bg-rose-100 text-rose-700",
  Skipped: "bg-slate-100 text-slate-500",
};

const parseTime = (value: string) => {
  const match = value.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return Number.NaN;
  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (match[3].toUpperCase() === "PM" && hours !== 12) hours += 12;
  if (match[3].toUpperCase() === "AM" && hours === 12) hours = 0;
  return hours * 60 + minutes;
};

const formatTime = (value: number) => {
  const hours24 = Math.floor(value / 60) % 24;
  const minutes = value % 60;
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours = hours24 % 12 || 12;
  return `${hours}:${String(minutes).padStart(2, "0")} ${period}`;
};

const normalizeActualTime = (value: string, referenceTime: string) => {
  const trimmed = value.trim().toUpperCase().replace(/\s+/g, "");
  const explicit = trimmed.match(/^(\d{1,2}):(\d{2})(AM|PM)$/);
  if (explicit) return `${Number(explicit[1])}:${explicit[2]} ${explicit[3]}`;

  const compact = trimmed.match(/^(\d{3,4})$/);
  if (!compact) return value;
  const digits = compact[1].padStart(4, "0");
  const hour = Number(digits.slice(0, 2));
  const minute = Number(digits.slice(2));
  if (hour > 12 || minute > 59) return value;

  const reference = parseTime(referenceTime);
  const candidates = [hour * 60 + minute, (hour % 12) * 60 + minute + 720];
  const future = candidates.filter((candidate) => Number.isFinite(reference) && candidate >= reference);
  const selected = future.length > 0 ? Math.min(...future) : candidates[0];
  return formatTime(selected);
};

const toEditable = (row: RundownRow): EditableRow => ({ ...row, usedTime: String(row.usedTime) });

export function LiveRundownBoard() {
  const [rows, setRows] = useState(initialRows);
  const [draftRows, setDraftRows] = useState<EditableRow[]>(initialRows.map(toEditable));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pendingApply, setPendingApply] = useState<RundownRow[] | null>(null);
  const [showOptionalColumns, setShowOptionalColumns] = useState(false);
  const [actualInputs, setActualInputs] = useState<Record<string, string>>({});

  const currentIndex = rows.findIndex((row) => row.status === "Current");
  const currentEvent = currentIndex >= 0 ? rows[currentIndex] : undefined;

  const visibleRows = useMemo(() => rows, [rows]);

  const updateDraft = (id: string, field: keyof EditableRow, value: string) => {
    setDraftRows((current) => current.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };

  const toggleVendor = (id: string, vendor: string) => {
    setDraftRows((current) => current.map((row) => row.id !== id ? row : {
      ...row,
      vendorInvolve: row.vendorInvolve.includes(vendor)
        ? row.vendorInvolve.filter((item) => item !== vendor)
        : [...row.vendorInvolve, vendor],
    }));
  };

  const beginEdit = (row: RundownRow) => {
    if (row.status === "Completed" || row.status === "Delayed" || row.status === "Skipped") return;
    setDraftRows((current) => current.map((item) => (item.id === row.id ? toEditable(row) : item)));
    setEditingId(row.id);
  };

  const cancelEdit = () => {
    setDraftRows(rows.map(toEditable));
    setEditingId(null);
  };

  const saveEdit = (id: string) => {
    const draft = draftRows.find((row) => row.id === id);
    if (!draft) return;
    const nextRows = rows.map((row) =>
      row.id === id ? { ...draft, usedTime: Math.max(0, Number(draft.usedTime) || 0) } : row,
    );
    setRows(nextRows);
    setDraftRows(nextRows.map(toEditable));
    setEditingId(null);
  };

  const insertRow = (index: number) => {
    const newRow: RundownRow = {
      id: `event-${Date.now()}`,
      estimateTime: rows[index]?.estimateTime ?? "7:00 PM",
      actualTime: "",
      program: "New Program",
      usedTime: 10,
      coordinatorAction: "",
      status: "Current",
      remarks: "",
      vendorInvolve: [],
      foodServing: "",
      song: "",
      screen: "",
    };
    const nextRows = [...rows.slice(0, index + 1), newRow, ...rows.slice(index + 1)];
    setRows(nextRows);
    setDraftRows(nextRows.map(toEditable));
    setEditingId(newRow.id);
  };

  const deleteRow = (id: string) => {
    const nextRows = rows.filter((row) => row.id !== id);
    setRows(nextRows);
    setDraftRows(nextRows.map(toEditable));
    if (editingId === id) setEditingId(null);
  };

  const setActualTime = (id: string, actualTime: string) => {
    const index = rows.findIndex((row) => row.id === id);
    const row = rows[index];
    if (!row) return;
    if (!actualTime.trim()) {
      const clearedRows = rows.map((item) => item.id === id ? { ...item, actualTime: "", status: "" as RundownStatus } : item);
      setRows(clearedRows);
      setDraftRows(clearedRows.map(toEditable));
      setActualInputs((current) => ({ ...current, [id]: "" }));
      return;
    }
    const nextRows: RundownRow[] = rows.map((item, itemIndex) => {
      if (itemIndex < index) {
        if (!item.actualTime) return { ...item, status: "Skipped" };
        const itemWasDelayed = parseTime(item.actualTime) > parseTime(item.estimateTime);
        return { ...item, status: itemWasDelayed ? "Delayed" : "Completed" };
      }
      if (itemIndex === index) return { ...item, actualTime, status: "Current" };
      return item;
    });
    setRows(nextRows);
    setDraftRows(nextRows.map(toEditable));
    setActualInputs((current) => ({ ...current, [id]: actualTime }));
  };

  const commitActualTime = (id: string) => {
    const index = rows.findIndex((row) => row.id === id);
    const row = rows[index];
    if (!row) return;
    const reference = rows[index - 1]?.actualTime || rows[index - 1]?.estimateTime || row.estimateTime;
    const rawValue = actualInputs[id] ?? row.actualTime;
    const normalized = normalizeActualTime(rawValue, reference);
    setActualTime(id, normalized);
  };

  const prepareApply = () => {
    let previousActual = Number.NaN;
    let upstreamDelayDetected = false;
    const proposed: RundownRow[] = rows.map((row) => {
      const anchor = parseTime(row.actualTime);
      if (row.status === "Completed" && Number.isFinite(anchor)) {
        previousActual = anchor + row.usedTime;
        return row;
      }
      if (Number.isFinite(anchor)) {
        const expectedStart = previousActual;
        const shouldSynchronize = row.status === "Current" || upstreamDelayDetected;
        if (Number.isFinite(expectedStart) && anchor > expectedStart) upstreamDelayDetected = true;
        previousActual = anchor + row.usedTime;
        if (shouldSynchronize && Number.isFinite(expectedStart)) {
          const synchronizedTime = formatTime(expectedStart);
          previousActual = expectedStart + row.usedTime;
          return { ...row, estimateTime: synchronizedTime, actualTime: synchronizedTime, status: "Current" };
        }
        return row;
      }
      if (!Number.isFinite(previousActual)) return row;
      const next = { ...row, estimateTime: formatTime(previousActual) };
      previousActual += row.usedTime;
      return next;
    });
    setPendingApply(proposed);
  };

  const applySchedule = () => {
    if (!pendingApply) return;
    const lastActualIndex = pendingApply.reduce((lastIndex, row, index) => row.actualTime ? index : lastIndex, -1);
    const finalizedRows = pendingApply.map((row, index) => {
      if (index < lastActualIndex) {
        if (!row.actualTime) return { ...row, status: "Skipped" as RundownStatus };
        return { ...row, status: parseTime(row.actualTime) > parseTime(row.estimateTime) ? "Delayed" as RundownStatus : "Completed" as RundownStatus };
      }
      if (index === lastActualIndex) return { ...row, status: "Current" as RundownStatus };
      return { ...row, status: "" as RundownStatus };
    });
    setRows(finalizedRows);
    setDraftRows(finalizedRows.map(toEditable));
    setPendingApply(null);
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-slate-500">Current Event</p>
        <p className="mt-2 text-2xl font-semibold text-slate-900">{currentEvent?.program ?? "No current event"}</p>
        <p className="mt-1 text-sm text-slate-500">{currentEvent?.estimateTime ?? "Add an event to begin."}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Rundown</h2>
        <p className="text-sm text-slate-500">Edit a row to prevent accidental changes. Apply schedule changes when ready.</p>
      </div>
        <button type="button" onClick={() => setShowOptionalColumns((value) => !value)} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          {showOptionalColumns ? "Hide Vendor Columns" : "Show Vendor Columns"}
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-900">Review the proposed Estimate Times before applying them.</p>
        <button type="button" onClick={prepareApply} className="rounded-full bg-amber-700 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800">Apply Schedule</button>
      </div>

      {pendingApply ? <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="font-semibold text-slate-900">Apply schedule changes?</p><div className="mt-3 space-y-2 text-sm text-slate-600">{pendingApply.map((row, index) => row.estimateTime !== rows[index]?.estimateTime ? <p key={row.id}>{row.program}: {rows[index]?.estimateTime} → <strong>{row.estimateTime}</strong></p> : null)}</div><div className="mt-4 flex gap-2"><button type="button" onClick={applySchedule} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Apply</button><button type="button" onClick={() => setPendingApply(null)} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Cancel</button></div></div> : null}

      <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-[1200px] w-full text-left text-sm">
          <thead className="sticky top-0 z-10 bg-slate-50 text-xs uppercase tracking-wide text-slate-500 shadow-sm">
            <tr>
              <th className="px-3 py-3">Estimate Time</th><th className="px-3 py-3">Actual Time</th><th className="px-3 py-3">Program</th><th className="px-3 py-3">Used Time</th>
              {showOptionalColumns ? <><th className="px-3 py-3">Food Serving</th><th className="px-3 py-3">Song</th><th className="px-3 py-3">Screen</th></> : null}
              <th className="px-3 py-3">Remarks</th><th className="px-3 py-3">Vendor Involve</th><th className="px-3 py-3">Coordinator / Action</th><th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row, index) => {
              const editing = editingId === row.id;
              const draft = draftRows.find((item) => item.id === row.id) ?? toEditable(row);
              const rowClass = row.status === "Current" ? "bg-emerald-50 text-emerald-950" : row.status === "Completed" || row.status === "Delayed" ? "bg-slate-200 text-slate-700" : "bg-white text-slate-700";
              const actualIsDelayed = row.status === "Delayed";
              return (
                <tr key={row.id} className={`border-t border-slate-100 align-top ${rowClass}`}>
                  {(["estimateTime", "actualTime", "program", "usedTime"] as const).map((field) => (
                    <td key={field} className="px-3 py-3">
                      {field === "actualTime" && !editing ? (
                        <input disabled={row.status === "Completed" || row.status === "Delayed" || row.status === "Skipped"} value={actualInputs[row.id] ?? row.actualTime} onChange={(event) => setActualInputs((current) => ({ ...current, [row.id]: event.target.value }))} onBlur={() => commitActualTime(row.id)} placeholder="e.g. 710" className={`w-32 rounded-lg border px-2 py-1.5 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-70 ${actualIsDelayed ? "border-rose-300 text-rose-700" : "border-slate-200 text-slate-700"}`} />
                      ) : editing ? (
                        <input value={String(draft[field])} onChange={(event) => updateDraft(row.id, field, event.target.value)} className="w-full min-w-24 rounded-lg border border-rose-200 px-2 py-1.5 text-sm outline-none focus:border-rose-400" />
                      ) : field === "usedTime" ? `${row.usedTime} min` : row[field]}
                    </td>
                  ))}
                  {showOptionalColumns ? <><td className="px-3 py-3">{editing ? <input value={draft.foodServing} onChange={(event) => updateDraft(row.id, "foodServing", event.target.value)} className="w-28 rounded-lg border border-rose-200 px-2 py-1.5 text-sm outline-none" /> : row.foodServing || "—"}</td><td className="px-3 py-3">{editing ? <input value={draft.song} onChange={(event) => updateDraft(row.id, "song", event.target.value)} className="w-28 rounded-lg border border-rose-200 px-2 py-1.5 text-sm outline-none" /> : row.song || "—"}</td><td className="px-3 py-3">{editing ? <input value={draft.screen} onChange={(event) => updateDraft(row.id, "screen", event.target.value)} className="w-28 rounded-lg border border-rose-200 px-2 py-1.5 text-sm outline-none" /> : row.screen || "—"}</td></> : null}
                  <td className="px-3 py-3">{editing ? <textarea value={draft.remarks} onChange={(event) => updateDraft(row.id, "remarks", event.target.value)} className="min-w-40 rounded-lg border border-rose-200 px-2 py-1.5 text-sm outline-none" /> : row.remarks || "—"}</td>
                  <td className="px-3 py-3">{editing ? <div className="min-w-40 space-y-1">{vendorOptions.map((vendor) => <label key={vendor} className="flex items-center gap-2 text-xs"><input type="checkbox" checked={draft.vendorInvolve.includes(vendor)} onChange={() => toggleVendor(row.id, vendor)} />{vendor}</label>)}</div> : row.vendorInvolve.length > 0 ? row.vendorInvolve.join(", ") : "—"}</td>
                  <td className="px-3 py-3">{editing ? <textarea value={draft.coordinatorAction} onChange={(event) => updateDraft(row.id, "coordinatorAction", event.target.value)} className="min-w-48 rounded-lg border border-rose-200 px-2 py-1.5 text-sm outline-none" /> : row.coordinatorAction}</td>
                  <td className="px-3 py-3"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[row.status]}`}>{row.status || "—"}</span></td>
                  {showOptionalColumns ? <><td className="px-3 py-3">{row.foodServing || "—"}</td><td className="px-3 py-3">{row.song || "—"}</td><td className="px-3 py-3">{row.screen || "—"}</td></> : null}
                  <td className="px-3 py-3"><div className="flex min-w-40 flex-col items-start gap-2">{editing ? <div className="flex flex-wrap gap-2"><button type="button" onClick={() => saveEdit(row.id)} className="rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-semibold text-white">Save</button><button type="button" onClick={cancelEdit} className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700">Cancel</button></div> : <><div className="flex flex-wrap gap-2">{row.status !== "Completed" && row.status !== "Delayed" && row.status !== "Skipped" ? <><button type="button" onClick={() => insertRow(index - 1)} className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700">Before</button><button type="button" onClick={() => insertRow(index)} className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700">+ After</button></> : null}</div><div className="flex flex-wrap gap-2">{row.status !== "Completed" && row.status !== "Delayed" && row.status !== "Skipped" ? <button type="button" onClick={() => beginEdit(row)} className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700">Edit</button> : null}<button type="button" onClick={() => deleteRow(row.id)} className="rounded-lg border border-rose-200 px-2.5 py-1.5 text-xs font-semibold text-rose-700">Delete</button></div></>}</div></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {(["Current", "Completed", "Delayed"] as const).map((status) => <div key={status} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{status}</p><p className="mt-2 text-2xl font-semibold text-slate-900">{rows.filter((row) => row.status === status).length}</p></div>)}
      </div>
    </section>
  );
}
