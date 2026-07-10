"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { GuestCardLegend } from "../../../components/GuestCardLegend";
import { WorkspaceShell } from "../../../components/workspace/WorkspaceShell";

type MealPreference = "Normal" | "Vegetarian" | "Halal";
type TableFilter = "All" | "Available" | "Full" | "Unassigned";
type PageSize = 10 | 25 | 50 | 100;
type TableFormMode = "add" | "edit";
type GenerateMode = "add" | "replace";
type SeatType = "Adult" | "Child";

type TableRecord = {
  id: string;
  name: string;
  tableNumber: number;
  capacity: number;
};

type RSVPPartyRecord = {
  id: string;
  guestName: string;
  adults: number;
  children: number;
  normalMeals: number;
  vegetarianMeals: number;
  halalMeals: number;
  status: "Confirmed" | "Pending" | "Declined";
  initialTableId: string | null;
};

type GuestSeatCard = {
  id: string;
  partyId: string;
  guestName: string;
  seatType: SeatType;
  adults: number;
  children: number;
  mealPreference: MealPreference;
  tableId: string | null;
};

const tableSeed: TableRecord[] = [
  { id: "table-1", name: "Table 1", tableNumber: 1, capacity: 10 },
  { id: "table-2", name: "Table 2", tableNumber: 2, capacity: 8 },
  { id: "table-3", name: "Table 3", tableNumber: 3, capacity: 12 },
  { id: "table-4", name: "Table 4", tableNumber: 4, capacity: 10 },
  { id: "table-5", name: "Table 5", tableNumber: 5, capacity: 6 },
  { id: "table-6", name: "Table 6", tableNumber: 6, capacity: 10 },
  { id: "table-7", name: "Table 7", tableNumber: 7, capacity: 8 },
  { id: "table-8", name: "Table 8", tableNumber: 8, capacity: 12 },
  { id: "table-9", name: "Table 9", tableNumber: 9, capacity: 10 },
  { id: "table-10", name: "Table 10", tableNumber: 10, capacity: 10 },
  { id: "table-11", name: "Family Table", tableNumber: 11, capacity: 12 },
  { id: "table-12", name: "VIP Table", tableNumber: 12, capacity: 8 },
];

const rsvpPartySeed: RSVPPartyRecord[] = [
  { id: "party-rachel", guestName: "Rachel", adults: 4, children: 1, normalMeals: 4, vegetarianMeals: 1, halalMeals: 0, status: "Confirmed", initialTableId: "table-1" },
  { id: "party-john", guestName: "John", adults: 1, children: 0, normalMeals: 1, vegetarianMeals: 0, halalMeals: 0, status: "Confirmed", initialTableId: "table-2" },
  { id: "party-siti", guestName: "Siti", adults: 2, children: 0, normalMeals: 1, vegetarianMeals: 0, halalMeals: 1, status: "Confirmed", initialTableId: "table-3" },
  { id: "party-aiden", guestName: "Aiden", adults: 1, children: 2, normalMeals: 3, vegetarianMeals: 0, halalMeals: 0, status: "Confirmed", initialTableId: null },
  { id: "party-evan", guestName: "Evan", adults: 2, children: 0, normalMeals: 2, vegetarianMeals: 0, halalMeals: 0, status: "Pending", initialTableId: null },
  { id: "party-lina", guestName: "Lina", adults: 2, children: 0, normalMeals: 1, vegetarianMeals: 1, halalMeals: 0, status: "Confirmed", initialTableId: "table-4" },
  { id: "party-haris", guestName: "Haris", adults: 2, children: 0, normalMeals: 0, vegetarianMeals: 0, halalMeals: 2, status: "Confirmed", initialTableId: "table-5" },
  { id: "party-mira", guestName: "Mira", adults: 1, children: 1, normalMeals: 2, vegetarianMeals: 0, halalMeals: 0, status: "Confirmed", initialTableId: "table-6" },
  { id: "party-sam", guestName: "Sam", adults: 2, children: 0, normalMeals: 2, vegetarianMeals: 0, halalMeals: 0, status: "Confirmed", initialTableId: "table-7" },
  { id: "party-nina", guestName: "Nina", adults: 1, children: 0, normalMeals: 0, vegetarianMeals: 1, halalMeals: 0, status: "Confirmed", initialTableId: "table-8" },
  { id: "party-zara", guestName: "Zara", adults: 2, children: 1, normalMeals: 3, vegetarianMeals: 0, halalMeals: 0, status: "Confirmed", initialTableId: "table-9" },
  { id: "party-irfan", guestName: "Irfan", adults: 2, children: 0, normalMeals: 0, vegetarianMeals: 0, halalMeals: 2, status: "Confirmed", initialTableId: "table-10" },
  { id: "party-leah", guestName: "Leah", adults: 1, children: 0, normalMeals: 0, vegetarianMeals: 1, halalMeals: 0, status: "Confirmed", initialTableId: "table-11" },
  { id: "party-noel", guestName: "Noel", adults: 2, children: 0, normalMeals: 2, vegetarianMeals: 0, halalMeals: 0, status: "Confirmed", initialTableId: "table-12" },
  { id: "party-asha", guestName: "Asha", adults: 1, children: 0, normalMeals: 0, vegetarianMeals: 0, halalMeals: 1, status: "Confirmed", initialTableId: null },
  { id: "party-rina", guestName: "Rina", adults: 2, children: 1, normalMeals: 2, vegetarianMeals: 1, halalMeals: 0, status: "Confirmed", initialTableId: null },
  { id: "party-tariq", guestName: "Tariq", adults: 1, children: 0, normalMeals: 0, vegetarianMeals: 0, halalMeals: 1, status: "Confirmed", initialTableId: null },
  { id: "party-mason", guestName: "Mason", adults: 1, children: 1, normalMeals: 1, vegetarianMeals: 0, halalMeals: 0, status: "Confirmed", initialTableId: null },
];

function getGuestCardStyle(seatType: SeatType, mealPreference: MealPreference) {
  if (seatType === "Child") {
    if (mealPreference === "Vegetarian") {
      return "border-pink-300 bg-pink-100 text-pink-900 ring-1 ring-cyan-300";
    }

    if (mealPreference === "Halal") {
      return "border-pink-300 bg-pink-100 text-pink-900 ring-1 ring-blue-300";
    }

    return "border-pink-200 bg-pink-100 text-pink-800";
  }

  if (mealPreference === "Vegetarian") {
    return "border-cyan-200 bg-cyan-100 text-cyan-800";
  }

  if (mealPreference === "Halal") {
    return "border-blue-200 bg-blue-100 text-blue-800";
  }

  return "border-slate-200 bg-slate-100 text-slate-800";
}

const tableFilterOptions: TableFilter[] = ["All", "Available", "Full", "Unassigned"];
const pageSizeOptions: PageSize[] = [10, 25, 50, 100];

function getTableStatus(assignedSeats: number, capacity: number) {
  if (assignedSeats <= 0) {
    return "Empty" as const;
  }

  if (assignedSeats >= capacity) {
    return "Full" as const;
  }

  return "Available" as const;
}

function getTableStatusStyles(status: "Available" | "Full" | "Empty") {
  if (status === "Full") {
    return "bg-rose-100 text-rose-700";
  }

  if (status === "Empty") {
    return "bg-slate-100 text-slate-700";
  }

  return "bg-emerald-100 text-emerald-700";
}

function buildTableId(tableNumber: number) {
  return `table-${tableNumber}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function transformPartiesToSeatCards(parties: RSVPPartyRecord[]) {
  const cards: GuestSeatCard[] = [];
  const warnings: Record<string, string | undefined> = {};

  parties
    .filter((party) => party.status === "Confirmed")
    .forEach((party) => {
      const attendance = party.adults + party.children;
      const plannedMeals = party.normalMeals + party.vegetarianMeals + party.halalMeals;

      let normalRemaining = party.normalMeals;
      let vegetarianRemaining = party.vegetarianMeals;
      let halalRemaining = party.halalMeals;
      let seatIndex = 1;

      const pushSeatCard = (seatType: SeatType, mealPreference: MealPreference) => {
        cards.push({
          id: `${party.id}-seat-${seatIndex}`,
          partyId: party.id,
          guestName: party.guestName,
          seatType,
          adults: seatType === "Adult" ? 1 : 0,
          children: seatType === "Child" ? 1 : 0,
          mealPreference,
          tableId: party.initialTableId,
        });
        seatIndex += 1;
      };

      for (let childIndex = 0; childIndex < party.children; childIndex += 1) {
        if (normalRemaining > 0) {
          normalRemaining -= 1;
        }

        pushSeatCard("Child", "Normal");
      }

      let adultsRemaining = party.adults;

      while (adultsRemaining > 0 && normalRemaining > 0) {
        pushSeatCard("Adult", "Normal");
        normalRemaining -= 1;
        adultsRemaining -= 1;
      }

      while (adultsRemaining > 0 && vegetarianRemaining > 0) {
        pushSeatCard("Adult", "Vegetarian");
        vegetarianRemaining -= 1;
        adultsRemaining -= 1;
      }

      while (adultsRemaining > 0 && halalRemaining > 0) {
        pushSeatCard("Adult", "Halal");
        halalRemaining -= 1;
        adultsRemaining -= 1;
      }

      while (adultsRemaining > 0) {
        pushSeatCard("Adult", "Normal");
        adultsRemaining -= 1;
      }

      if (plannedMeals !== attendance) {
        warnings[party.id] = `Meal totals (${plannedMeals}) do not match attendance (${attendance}). Unallocated seats default to Normal.`;
      }
    });

  return { cards, warnings };
}

const seatSeedData = transformPartiesToSeatCards(rsvpPartySeed);

export default function RsvpTableAssignmentPage() {
  const [guestCards, setGuestCards] = useState<GuestSeatCard[]>(seatSeedData.cards);
  const [tableList, setTableList] = useState<TableRecord[]>(tableSeed);
  const [rsvpWarnings] = useState<Record<string, string | undefined>>(seatSeedData.warnings);
  const [draggingGuestId, setDraggingGuestId] = useState<string | null>(null);
  const [tableSearchQuery, setTableSearchQuery] = useState("");
  const [tableFilter, setTableFilter] = useState<TableFilter>("All");
  const [pageSize, setPageSize] = useState<PageSize>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTableId, setSelectedTableId] = useState<string | null>(tableSeed[0]?.id ?? null);

  const [isTableFormOpen, setIsTableFormOpen] = useState(false);
  const [tableFormMode, setTableFormMode] = useState<TableFormMode>("add");
  const [editingTableId, setEditingTableId] = useState<string | null>(null);
  const [tableFormValues, setTableFormValues] = useState({
    tableName: "",
    tableNumber: "",
    capacity: "10",
  });
  const [tableFormError, setTableFormError] = useState<string | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [pendingDeleteTableId, setPendingDeleteTableId] = useState<string | null>(null);
  const [deleteWarning, setDeleteWarning] = useState<string | null>(null);

  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [generateValues, setGenerateValues] = useState({
    numberOfTables: "10",
    startingNumber: "1",
    prefix: "Table",
    defaultCapacity: "10",
    mode: "add" as GenerateMode,
  });
  const [generateError, setGenerateError] = useState<string | null>(null);
  const [isBatchConfirmOpen, setIsBatchConfirmOpen] = useState(false);
  const [pendingGeneratedTables, setPendingGeneratedTables] = useState<TableRecord[] | null>(null);
  const [pendingGenerateMode, setPendingGenerateMode] = useState<GenerateMode>("add");
  const [pendingGenerateCount, setPendingGenerateCount] = useState(0);

  const confirmedGuestCards = useMemo(() => {
    return guestCards;
  }, [guestCards]);

  const groupedRsvpSeatCards = useMemo(() => {
    return rsvpPartySeed
      .filter((party) => party.status === "Confirmed")
      .map((party) => {
        const cards = confirmedGuestCards.filter((card) => card.partyId === party.id);
        return {
          partyId: party.id,
          guestName: party.guestName,
          cards,
          warning: rsvpWarnings[party.id],
        };
      })
      .filter((group) => group.cards.length > 0);
  }, [confirmedGuestCards, rsvpWarnings]);

  const nextTableNumber = useMemo(() => {
    const numbers = tableList.map((table) => table.tableNumber);
    if (numbers.length === 0) {
      return 1;
    }

    return Math.max(...numbers) + 1;
  }, [tableList]);

  const guestCountByTable = useMemo(() => {
    return tableList.map((table) => {
      const assignedGuests = confirmedGuestCards.filter((guest) => guest.tableId === table.id);
      const assignedSeats = assignedGuests.length;
      const status = getTableStatus(assignedSeats, table.capacity);

      return {
        ...table,
        assignedGuests: assignedGuests.length,
        assignedGuestRecords: assignedGuests,
        assignedSeats,
        remainingSeats: Math.max(table.capacity - assignedSeats, 0),
        status,
      };
    });
  }, [confirmedGuestCards, tableList]);

  const filteredTableRows = useMemo(() => {
    const normalizedSearch = tableSearchQuery.trim().toLowerCase();

    return guestCountByTable.filter((table) => {
      const matchesSearch =
        normalizedSearch.length === 0
        || table.name.toLowerCase().includes(normalizedSearch)
        || table.tableNumber.toString().includes(normalizedSearch)
        || `${table.name} ${table.tableNumber}`.toLowerCase().includes(normalizedSearch);

      const matchesFilter =
        tableFilter === "All"
          ? true
          : tableFilter === "Unassigned"
            ? table.assignedSeats === 0
            : tableFilter === "Full"
              ? table.status === "Full"
              : table.status === "Available";

      return matchesSearch && matchesFilter;
    });
  }, [guestCountByTable, tableFilter, tableSearchQuery]);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(filteredTableRows.length / pageSize));
  }, [filteredTableRows.length, pageSize]);

  useEffect(() => {
    setCurrentPage(1);
  }, [pageSize, tableFilter, tableSearchQuery]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedTableRows = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredTableRows.slice(startIndex, endIndex);
  }, [currentPage, filteredTableRows, pageSize]);

  useEffect(() => {
    if (filteredTableRows.length === 0) {
      setSelectedTableId(null);
      return;
    }

    const selectedExists = filteredTableRows.some((table) => table.id === selectedTableId);
    if (!selectedExists) {
      setSelectedTableId(filteredTableRows[0].id);
    }
  }, [filteredTableRows, selectedTableId]);

  const selectedTable = useMemo(() => {
    if (!selectedTableId) {
      return undefined;
    }

    return guestCountByTable.find((table) => table.id === selectedTableId);
  }, [guestCountByTable, selectedTableId]);

  const unassignedConfirmedGuestCount = useMemo(() => {
    return confirmedGuestCards.filter((guest) => guest.tableId === null).length;
  }, [confirmedGuestCards]);

  const previewGeneratedLabels = useMemo(() => {
    const count = Number.parseInt(generateValues.numberOfTables, 10);
    const start = Number.parseInt(generateValues.startingNumber, 10);
    const safeCount = Number.isNaN(count) ? 0 : Math.max(0, Math.min(count, 100));
    const safeStart = Number.isNaN(start) ? 1 : Math.max(1, start);

    return Array.from({ length: safeCount }, (_, index) => {
      const tableNumber = safeStart + index;
      const tableName = `${generateValues.prefix.trim() || "Table"} ${tableNumber}`;
      return {
        tableName,
        tableNumber,
      };
    });
  }, [generateValues.numberOfTables, generateValues.prefix, generateValues.startingNumber]);

  const applyGeneratedTables = (mode: GenerateMode, generatedTables: TableRecord[]) => {
    if (mode === "replace") {
      setTableList(generatedTables);
      setGuestCards((currentGuests) =>
        currentGuests.map((guest) => ({
          ...guest,
          tableId: null,
        })),
      );
      setSelectedTableId(generatedTables[0]?.id ?? null);
      return;
    }

    setTableList((currentTables) => {
      const merged = [...currentTables, ...generatedTables];
      return merged.sort((left, right) => left.tableNumber - right.tableNumber);
    });
  };

  const assignGuestToTable = (guestId: string, tableId: string | null) => {
    setGuestCards((currentGuests) =>
      currentGuests.map((guest) =>
        guest.id === guestId
          ? { ...guest, tableId }
          : guest,
      ),
    );
  };

  const openAddTableModal = () => {
    setTableFormMode("add");
    setEditingTableId(null);
    setTableFormError(null);
    setTableFormValues({
      tableName: `Table ${nextTableNumber}`,
      tableNumber: String(nextTableNumber),
      capacity: "10",
    });
    setIsTableFormOpen(true);
  };

  const openEditTableModal = (tableId: string) => {
    const table = tableList.find((item) => item.id === tableId);
    if (!table) {
      return;
    }

    setTableFormMode("edit");
    setEditingTableId(tableId);
    setTableFormError(null);
    setTableFormValues({
      tableName: table.name,
      tableNumber: String(table.tableNumber),
      capacity: String(table.capacity),
    });
    setIsTableFormOpen(true);
  };

  const closeTableFormModal = () => {
    setIsTableFormOpen(false);
    setEditingTableId(null);
    setTableFormError(null);
  };

  const saveTable = () => {
    const tableName = tableFormValues.tableName.trim();
    const tableNumber = Number.parseInt(tableFormValues.tableNumber, 10);
    const capacity = Number.parseInt(tableFormValues.capacity, 10);

    if (!tableName) {
      setTableFormError("Table name is required.");
      return;
    }

    if (Number.isNaN(tableNumber) || tableNumber <= 0) {
      setTableFormError("Table number must be a positive number.");
      return;
    }

    if (Number.isNaN(capacity) || capacity <= 0) {
      setTableFormError("Capacity must be a positive number.");
      return;
    }

    const duplicateTableNumber = tableList.some((table) =>
      table.tableNumber === tableNumber
      && table.id !== editingTableId,
    );

    if (duplicateTableNumber) {
      setTableFormError("Table number already exists. Use a unique number.");
      return;
    }

    if (tableFormMode === "edit" && editingTableId) {
      setTableList((currentTables) =>
        currentTables
          .map((table) =>
            table.id === editingTableId
              ? {
                ...table,
                name: tableName,
                tableNumber,
                capacity,
              }
              : table,
          )
          .sort((left, right) => left.tableNumber - right.tableNumber),
      );
      closeTableFormModal();
      return;
    }

    const newTable: TableRecord = {
      id: buildTableId(tableNumber),
      name: tableName,
      tableNumber,
      capacity,
    };

    setTableList((currentTables) => {
      const merged = [...currentTables, newTable];
      return merged.sort((left, right) => left.tableNumber - right.tableNumber);
    });
    setSelectedTableId(newTable.id);
    closeTableFormModal();
  };

  const openDeleteTableDialog = (tableId: string) => {
    setPendingDeleteTableId(tableId);
    setDeleteWarning(null);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteTableDialog = () => {
    setPendingDeleteTableId(null);
    setDeleteWarning(null);
    setIsDeleteDialogOpen(false);
  };

  const confirmDeleteTable = () => {
    if (!pendingDeleteTableId) {
      return;
    }

    const tableHasAssignedGuests = guestCards.some((guest) => guest.tableId === pendingDeleteTableId);
    if (tableHasAssignedGuests) {
      setDeleteWarning("This table has assigned guests. Move or unassign guests before deleting this table.");
      return;
    }

    setTableList((currentTables) => currentTables.filter((table) => table.id !== pendingDeleteTableId));

    if (selectedTableId === pendingDeleteTableId) {
      const nextTable = filteredTableRows.find((table) => table.id !== pendingDeleteTableId);
      setSelectedTableId(nextTable?.id ?? null);
    }

    closeDeleteTableDialog();
  };

  const openGenerateModal = () => {
    setGenerateError(null);
    setGenerateValues({
      numberOfTables: "10",
      startingNumber: String(nextTableNumber),
      prefix: "Table",
      defaultCapacity: "10",
      mode: "add",
    });
    setIsGenerateModalOpen(true);
  };

  const closeGenerateModal = () => {
    setGenerateError(null);
    setIsGenerateModalOpen(false);
  };

  const submitGenerateTables = () => {
    const numberOfTables = Number.parseInt(generateValues.numberOfTables, 10);
    const startingNumber = Number.parseInt(generateValues.startingNumber, 10);
    const defaultCapacity = Number.parseInt(generateValues.defaultCapacity, 10);
    const prefix = generateValues.prefix.trim() || "Table";

    if (Number.isNaN(numberOfTables) || numberOfTables <= 0) {
      setGenerateError("Number of tables must be greater than 0.");
      return;
    }

    if (numberOfTables > 100) {
      setGenerateError("Batch generation supports up to 100 tables per run.");
      return;
    }

    if (Number.isNaN(startingNumber) || startingNumber <= 0) {
      setGenerateError("Starting number must be greater than 0.");
      return;
    }

    if (Number.isNaN(defaultCapacity) || defaultCapacity <= 0) {
      setGenerateError("Default capacity must be greater than 0.");
      return;
    }

    const generatedTableNumbers = Array.from({ length: numberOfTables }, (_, index) => startingNumber + index);
    const hasDuplicateWithinBatch = new Set(generatedTableNumbers).size !== generatedTableNumbers.length;
    if (hasDuplicateWithinBatch) {
      setGenerateError("Generated table numbers must be unique.");
      return;
    }

    if (generateValues.mode === "add") {
      const currentNumbers = new Set(tableList.map((table) => table.tableNumber));
      const duplicateInExisting = generatedTableNumbers.find((tableNumber) => currentNumbers.has(tableNumber));
      if (duplicateInExisting) {
        setGenerateError(`Table number ${duplicateInExisting} already exists. Change start number or use Replace mode.`);
        return;
      }
    }

    const generatedTables: TableRecord[] = generatedTableNumbers.map((tableNumber) => ({
      id: buildTableId(tableNumber),
      name: `${prefix} ${tableNumber}`,
      tableNumber,
      capacity: defaultCapacity,
    }));

    const requiresConfirmation = generateValues.mode === "replace" || numberOfTables >= 25;
    if (requiresConfirmation) {
      setPendingGenerateMode(generateValues.mode);
      setPendingGeneratedTables(generatedTables);
      setPendingGenerateCount(numberOfTables);
      setIsBatchConfirmOpen(true);
      return;
    }

    applyGeneratedTables(generateValues.mode, generatedTables);
    closeGenerateModal();
  };

  const confirmGeneratedBatch = () => {
    if (!pendingGeneratedTables) {
      return;
    }

    applyGeneratedTables(pendingGenerateMode, pendingGeneratedTables);
    setPendingGeneratedTables(null);
    setPendingGenerateCount(0);
    setIsBatchConfirmOpen(false);
    closeGenerateModal();
  };

  const cancelGeneratedBatch = () => {
    setPendingGeneratedTables(null);
    setPendingGenerateCount(0);
    setIsBatchConfirmOpen(false);
  };

  const pendingDeleteTable = pendingDeleteTableId
    ? guestCountByTable.find((table) => table.id === pendingDeleteTableId)
    : undefined;

  return (
    <WorkspaceShell defaultModule="rsvp">
      <div className="mt-4 space-y-6">
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">RSVP Table Assignment</h1>
              <p className="mt-2 text-sm text-slate-600">
                Assign confirmed RSVP guests to tables with drag-and-drop. This foundation is prepared for future floor plan overlays.
              </p>
            </div>
            <Link
              href="/rsvp"
              className="inline-flex rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300"
            >
              Back to RSVP
            </Link>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-slate-900">Table List Foundation</h2>
              <p className="mt-1 text-sm text-slate-600">Future architecture: this panel can be rendered over an uploaded banquet floor plan image.</p>
            </div>

            <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
                <input
                  type="search"
                  value={tableSearchQuery}
                  onChange={(event) => setTableSearchQuery(event.target.value)}
                  placeholder="Search Table"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                />
                <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto">
                  <button
                    type="button"
                    onClick={openAddTableModal}
                    className="rounded-xl bg-rose-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-rose-600"
                  >
                    Add Table
                  </button>
                  <button
                    type="button"
                    onClick={openGenerateModal}
                    className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400"
                  >
                    Generate Tables
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-2">
                  {tableFilterOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setTableFilter(option)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                        tableFilter === option
                          ? "bg-rose-500 text-white"
                          : "border border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <span>Rows</span>
                  <select
                    value={pageSize}
                    onChange={(event) => setPageSize(Number.parseInt(event.target.value, 10) as PageSize)}
                    className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs text-slate-700"
                  >
                    {pageSizeOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-3 py-3 text-xs text-slate-600">
              <div
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  const guestId = event.dataTransfer.getData("text/plain");
                  if (guestId) {
                    assignGuestToTable(guestId, null);
                    setDraggingGuestId(null);
                  }
                }}
                className="flex items-center justify-between rounded-xl border border-slate-300 bg-white px-3 py-2"
              >
                <span className="font-medium text-slate-700">Unassigned Drop Zone</span>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">
                  {unassignedConfirmedGuestCount} guests
                </span>
              </div>
            </div>

            <div className="mt-4 max-h-[28rem] overflow-auto rounded-2xl border border-slate-200">
              <div className="sticky top-0 z-20 hidden grid-cols-[minmax(0,1.4fr)_0.8fr_0.8fr_0.8fr_0.8fr_auto] items-center gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500 shadow-[0_1px_0_0_rgba(226,232,240,1)] md:grid">
                <span>Table Name</span>
                <span>Capacity</span>
                <span>Assigned</span>
                <span>Remaining</span>
                <span>Status</span>
                <span>Actions</span>
              </div>

              {paginatedTableRows.length === 0 ? (
                <div className="px-4 py-12 text-center text-sm text-slate-500">
                  No tables match the current search or filters.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {paginatedTableRows.map((table) => (
                    <div
                      key={table.id}
                      onClick={() => setSelectedTableId(table.id)}
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={(event) => {
                        event.preventDefault();
                        const guestId = event.dataTransfer.getData("text/plain");
                        if (guestId) {
                          assignGuestToTable(guestId, table.id);
                          setDraggingGuestId(null);
                        }
                      }}
                      className={`cursor-pointer px-3 py-3 text-sm transition ${selectedTableId === table.id ? "bg-rose-50/70" : "bg-white hover:bg-slate-50"}`}
                    >
                      <div className="grid gap-2 md:grid-cols-[minmax(0,1.4fr)_0.8fr_0.8fr_0.8fr_0.8fr_auto] md:items-center">
                        <div>
                          <p className="font-semibold text-slate-900">{table.name}</p>
                          <p className="text-xs text-slate-500">Table #{table.tableNumber}</p>
                        </div>

                        <p className="text-sm text-slate-700">{table.capacity}</p>
                        <p className="text-sm text-slate-700">{table.assignedSeats}</p>
                        <p className="text-sm text-slate-700">{table.remainingSeats}</p>
                        <span className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${getTableStatusStyles(table.status)}`}>
                          {table.status}
                        </span>

                        <div className="flex items-center gap-2 md:justify-end">
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              openEditTableModal(table.id);
                            }}
                            className="rounded-full border border-slate-300 px-2.5 py-1 text-xs font-semibold text-slate-700 transition hover:border-slate-400"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation();
                              openDeleteTableDialog(table.id);
                            }}
                            className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-3 flex flex-col gap-3 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
              <p>
                Showing {paginatedTableRows.length} of {filteredTableRows.length} tables
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage((current) => Math.max(1, current - 1))}
                  disabled={currentPage <= 1}
                  className="rounded-lg border border-slate-300 px-2.5 py-1 font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} / {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setCurrentPage((current) => Math.min(totalPages, current + 1))}
                  disabled={currentPage >= totalPages}
                  className="rounded-lg border border-slate-300 px-2.5 py-1 font-semibold text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Selected Table Guests</p>
              {!selectedTable ? (
                <p className="mt-2 text-xs text-slate-500">Select a table to see assigned guests.</p>
              ) : selectedTable.assignedGuestRecords.length === 0 ? (
                <p className="mt-2 text-xs text-slate-500">No guests assigned yet.</p>
              ) : (
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedTable.assignedGuestRecords.map((guest) => (
                    <span
                      key={guest.id}
                      className="rounded-full border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700"
                    >
                      {guest.guestName} ({guest.seatType} / {guest.mealPreference})
                    </span>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4">
              <div className="flex flex-col gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Guest Cards</h2>
                  <p className="mt-1 text-sm text-slate-600">Every attending seat is shown as an individual card. Drag cards to assign tables.</p>
                </div>

                <GuestCardLegend className="rounded-2xl border border-slate-200 bg-slate-50 p-4" />
              </div>
            </div>

            <div className="space-y-4">
              {groupedRsvpSeatCards.map((group) => (
                <section key={group.partyId} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-900">{group.guestName}</p>
                    <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                      {group.cards.length} seats
                    </span>
                  </div>

                  {group.warning ? (
                    <p className="mt-2 text-xs font-medium text-amber-700">{group.warning}</p>
                  ) : null}

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {group.cards.map((guest) => (
                      <article
                        key={guest.id}
                        draggable
                        onDragStart={(event) => {
                          setDraggingGuestId(guest.id);
                          event.dataTransfer.setData("text/plain", guest.id);
                        }}
                        onDragEnd={() => setDraggingGuestId(null)}
                        className={`cursor-grab rounded-2xl border p-4 shadow-sm transition active:cursor-grabbing ${getGuestCardStyle(guest.seatType, guest.mealPreference)}`}
                      >
                        <p className="text-sm font-semibold">{guest.guestName}</p>
                        <p className="mt-1 text-xs">Adults / Children: {guest.adults} / {guest.children}</p>
                        <p className="mt-1 text-xs">Meal Preference: {guest.mealPreference}</p>
                        <p className="mt-2 text-xs font-medium">
                          Assigned: {guest.tableId ? tableList.find((table) => table.id === guest.tableId)?.name ?? "Unassigned" : "Unassigned"}
                        </p>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </section>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">Future Modules</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700">
              Floor Plan
            </span>
            <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700">
              Wedding Day Check-in
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Table Assignment is prepared for future banquet floor-plan visualization and wedding-day guest check-in workflows.
          </p>
        </section>

        {isTableFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4" onClick={closeTableFormModal}>
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="table-form-modal-title"
              className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
              onClick={(event) => event.stopPropagation()}
            >
              <h2 id="table-form-modal-title" className="text-lg font-semibold text-slate-900">
                {tableFormMode === "edit" ? "Edit Table" : "Add Table"}
              </h2>

              <div className="mt-4 space-y-4">
                <label className="block text-sm font-medium text-slate-700">
                  Table Name
                  <input
                    type="text"
                    value={tableFormValues.tableName}
                    onChange={(event) => setTableFormValues((current) => ({ ...current, tableName: event.target.value }))}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Table Number
                  <input
                    type="number"
                    min={1}
                    value={tableFormValues.tableNumber}
                    onChange={(event) => setTableFormValues((current) => ({ ...current, tableNumber: event.target.value }))}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Capacity
                  <input
                    type="number"
                    min={1}
                    value={tableFormValues.capacity}
                    onChange={(event) => setTableFormValues((current) => ({ ...current, capacity: event.target.value }))}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </label>
              </div>

              {tableFormError ? <p className="mt-3 text-sm font-medium text-rose-600">{tableFormError}</p> : null}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeTableFormModal}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveTable}
                  className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        {isGenerateModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4" onClick={closeGenerateModal}>
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="generate-tables-modal-title"
              className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
              onClick={(event) => event.stopPropagation()}
            >
              <h2 id="generate-tables-modal-title" className="text-lg font-semibold text-slate-900">Generate Tables</h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-slate-700">
                  Number of Tables
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={generateValues.numberOfTables}
                    onChange={(event) => setGenerateValues((current) => ({ ...current, numberOfTables: event.target.value }))}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Starting Number
                  <input
                    type="number"
                    min={1}
                    value={generateValues.startingNumber}
                    onChange={(event) => setGenerateValues((current) => ({ ...current, startingNumber: event.target.value }))}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Table Name Prefix
                  <input
                    type="text"
                    value={generateValues.prefix}
                    onChange={(event) => setGenerateValues((current) => ({ ...current, prefix: event.target.value }))}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  Default Capacity
                  <input
                    type="number"
                    min={1}
                    value={generateValues.defaultCapacity}
                    onChange={(event) => setGenerateValues((current) => ({ ...current, defaultCapacity: event.target.value }))}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
                  />
                </label>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-slate-700">Generation Mode</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(["add", "replace"] as const).map((modeOption) => (
                    <button
                      key={modeOption}
                      type="button"
                      onClick={() => setGenerateValues((current) => ({ ...current, mode: modeOption }))}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                        generateValues.mode === modeOption
                          ? "bg-rose-500 text-white"
                          : "border border-slate-300 bg-white text-slate-700"
                      }`}
                    >
                      {modeOption === "add" ? "Add to existing tables" : "Replace all tables"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Preview</p>
                <div className="mt-2 space-y-1 text-sm text-slate-700">
                  {previewGeneratedLabels.length === 0 ? (
                    <p>No tables to preview.</p>
                  ) : (
                    <>
                      {previewGeneratedLabels.slice(0, 5).map((table) => (
                        <p key={table.tableNumber}>{table.tableName}</p>
                      ))}
                      {previewGeneratedLabels.length > 6 ? <p>...</p> : null}
                      {previewGeneratedLabels.length > 5 ? (
                        <p>{previewGeneratedLabels[previewGeneratedLabels.length - 1]?.tableName}</p>
                      ) : null}
                    </>
                  )}
                </div>
              </div>

              {generateError ? <p className="mt-3 text-sm font-medium text-rose-600">{generateError}</p> : null}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeGenerateModal}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={submitGenerateTables}
                  className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        )}

        {isBatchConfirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4" onClick={cancelGeneratedBatch}>
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="batch-confirm-modal-title"
              className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
              onClick={(event) => event.stopPropagation()}
            >
              <h2 id="batch-confirm-modal-title" className="text-lg font-semibold text-slate-900">Confirm Batch Generation</h2>
              <p className="mt-2 text-sm text-slate-600">
                You are about to {pendingGenerateMode === "replace" ? "replace current tables with" : "add"} {pendingGenerateCount} tables.
              </p>
              {pendingGenerateMode === "replace" ? (
                <p className="mt-2 text-sm font-medium text-rose-600">
                  Replacing tables will unassign all currently assigned guests in this mock UI.
                </p>
              ) : null}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={cancelGeneratedBatch}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmGeneratedBatch}
                  className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {isDeleteDialogOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4" onClick={closeDeleteTableDialog}>
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="delete-table-modal-title"
              className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
              onClick={(event) => event.stopPropagation()}
            >
              <h2 id="delete-table-modal-title" className="text-lg font-semibold text-slate-900">Delete Table</h2>
              <p className="mt-2 text-sm text-slate-600">
                Are you sure you want to delete {pendingDeleteTable ? `${pendingDeleteTable.name} (#${pendingDeleteTable.tableNumber})` : "this table"}?
              </p>
              {deleteWarning ? <p className="mt-3 text-sm font-medium text-rose-600">{deleteWarning}</p> : null}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeDeleteTableDialog}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDeleteTable}
                  className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </WorkspaceShell>
  );
}
