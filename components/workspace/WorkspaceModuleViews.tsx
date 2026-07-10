"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { DashboardCard } from "../DashboardCard";
import { QuickActions } from "../QuickActions";
import { WeddingHeader } from "../WeddingHeader";
import { WeddingInfoForm } from "../WeddingInfoForm";
import { WeddingProfileCard } from "../WeddingProfileCard";
import { WeddingTabs } from "../WeddingTabs";
import { BudgetDetailCard } from "../BudgetDetailCard";
import { BudgetFilter, type BudgetAdvancedFilters } from "../BudgetFilter";
import { BudgetForm } from "../BudgetForm";
import { BudgetStatistics } from "../BudgetStatistics";
import { BudgetTable, type BudgetTableRow } from "../BudgetTable";
import { VendorSummary } from "../VendorSummary";
import { VendorFilter, type VendorFilters } from "../VendorFilter";
import { VendorTable, type VendorRow } from "../VendorTable";
import { VendorDetailCard } from "../VendorDetailCard";
import { VendorForm, type VendorFormValues } from "../VendorForm";
import { TaskSummary } from "../TaskSummary";
import { TaskFilter, type TaskFilters } from "../TaskFilter";
import { TaskTable, type TaskRow } from "../TaskTable";
import { TaskDetailCard } from "../TaskDetailCard";
import { TaskForm, type TaskFormValues } from "../TaskForm";
import { GuestDetailCard } from "../GuestDetailCard";
import { GuestFilter, type GuestFilters } from "../GuestFilter";
import { GuestForm, type GuestFormValues } from "../GuestForm";
import { GuestStatistics } from "../GuestStatistics";
import { GuestTable } from "../GuestTable";
import { RSVPDetailCard } from "../RSVPDetailCard";
import { RSVPFilter, type RSVPFilters } from "../RSVPFilter";
import { RSVPForm } from "../RSVPForm";
import { RSVPStatistics } from "../RSVPStatistics";
import { RSVPTable, type RSVPRecord } from "../RSVPTable";
import { LiveRundownBoard } from "../LiveRundownBoard";

export type WorkspaceModuleKey =
  | "dashboard"
  | "wedding"
  | "budget"
  | "vendors"
  | "tasks"
  | "guests"
  | "rsvp"
  | "timeline";

export type WorkspaceModuleMeta = {
  title: string;
  workspaceName?: string;
  accessMode?: string;
};

const dashboardCards = [
  {
    title: "Guests",
    icon: "👥",
    value: "284 / 300 guests",
    subtitle: "72% have replied",
    accentColor: "bg-rose-100 text-rose-600",
  },
  {
    title: "RSVP Progress",
    icon: "📨",
    value: "72% replied",
    subtitle: "Guest attendance is progressing well",
    accentColor: "bg-amber-100 text-amber-600",
  },
  {
    title: "Budget Summary",
    icon: "💰",
    value: "RM 18,200 / RM 25,000",
    subtitle: "72.8% of overall budget used",
    accentColor: "bg-emerald-100 text-emerald-600",
  },
  {
    title: "Vendors",
    icon: "🤝",
    value: "12 confirmed",
    subtitle: "3 pending confirmations",
    accentColor: "bg-sky-100 text-sky-600",
  },
  {
    title: "Tasks",
    icon: "✅",
    value: "5 due this week",
    subtitle: "Planning workload snapshot",
    accentColor: "bg-violet-100 text-violet-600",
  },
  {
    title: "Today's Events",
    icon: "🕒",
    value: "3 events",
    subtitle: "Planned wedding-day activities",
    accentColor: "bg-orange-100 text-orange-600",
  },
];

const sharedWorkspaceName = "Rachel & Kiser Wedding";

export const workspaceModuleMeta: Record<WorkspaceModuleKey, WorkspaceModuleMeta> = {
  dashboard: { title: "Dashboard", workspaceName: sharedWorkspaceName, accessMode: "Active" },
  wedding: { title: "Wedding Profile", workspaceName: sharedWorkspaceName, accessMode: "Active" },
  budget: { title: "Budget", workspaceName: sharedWorkspaceName, accessMode: "Active" },
  vendors: { title: "Vendors", workspaceName: sharedWorkspaceName, accessMode: "Active" },
  tasks: { title: "Tasks", workspaceName: sharedWorkspaceName, accessMode: "Active" },
  guests: { title: "Guests", workspaceName: sharedWorkspaceName, accessMode: "Active" },
  rsvp: { title: "RSVP", workspaceName: sharedWorkspaceName, accessMode: "Active" },
  timeline: { title: "Live Rundown", workspaceName: sharedWorkspaceName, accessMode: "Active" },
};

export function DashboardModuleView() {
  return (
    <div className="space-y-6">
      <WeddingHeader />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {dashboardCards.map((card) => (
          <DashboardCard
            key={card.title}
            title={card.title}
            value={card.value}
            subtitle={card.subtitle}
            icon={card.icon}
            accentColor={card.accentColor}
          />
        ))}
      </div>

      <section className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <p className="text-sm font-medium text-slate-500">Upcoming Tasks</p>
            <h2 className="text-xl font-semibold text-slate-900">Priority Items</h2>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-200 px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-slate-900">Finalize Emcee script</span>
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700">Due Today</span>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-slate-900">Confirm photographer timing</span>
                <span className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-semibold text-sky-700">Tomorrow</span>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-slate-900">Review seating plan</span>
                <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">Friday</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuickActions />
    </div>
  );
}

export function WeddingProfileModuleView() {
  return (
    <div className="p-8 sm:p-10">
      <WeddingProfileCard />
      <WeddingTabs />
      <WeddingInfoForm />
    </div>
  );
}

type BudgetExpense = {
  id: string;
  expense: string;
  category: string;
  vendor: string;
  budgeted: number;
  actual: number;
  status: "Paid" | "Pending" | "Over Budget";
  paymentStatus: "Pending" | "Deposit Paid" | "Partially Paid" | "Fully Paid" | "Overdue";
  depositRequired: "Yes" | "No";
  paymentMethod: "Bank Transfer" | "DuitNow QR" | "Cash" | "Credit Card" | "E-Wallet" | "Others";
  vendorPicName: string;
  vendorPicContact: string;
  vendorFacebook: string;
  vendorInstagram: string;
  vendorWebsite: string;
  packageDetails: string;
  depositAmount: string;
  depositDueDate: string;
  balancePayment1Amount: string;
  balancePayment1DueDate: string;
  balancePayment2Amount: string;
  balancePayment2DueDate: string;
  remainingAmountToPay: string;
  invoiceNumber: string;
};

const initialBudgetExpenses: BudgetExpense[] = [
  {
    id: "expense-1",
    expense: "Venue Deposit",
    category: "Venue",
    vendor: "The Garden Hall",
    budgeted: 25000,
    actual: 25000,
    status: "Paid",
    paymentStatus: "Deposit Paid",
    depositRequired: "Yes",
    paymentMethod: "Bank Transfer",
    vendorPicName: "Alicia Tan",
    vendorPicContact: "012-3456789",
    vendorFacebook: "facebook.com/thegardenhall",
    vendorInstagram: "@thegardenhall",
    vendorWebsite: "www.thegardenhall.com",
    packageDetails: "Venue booking deposit for the wedding reception.",
    depositAmount: "RM 10,000",
    depositDueDate: "15 Jun 2026",
    balancePayment1Amount: "RM 7,500",
    balancePayment1DueDate: "20 Jul 2026",
    balancePayment2Amount: "RM 7,500",
    balancePayment2DueDate: "15 Aug 2026",
    remainingAmountToPay: "RM 3,000",
    invoiceNumber: "INV-2026-001",
  },
  {
    id: "expense-2",
    expense: "Catering Package",
    category: "Catering",
    vendor: "Elegant Feast",
    budgeted: 18000,
    actual: 20500,
    status: "Over Budget",
    paymentStatus: "Partially Paid",
    depositRequired: "Yes",
    paymentMethod: "DuitNow QR",
    vendorPicName: "Jason Ng",
    vendorPicContact: "011-2323232",
    vendorFacebook: "facebook.com/elegantfeast",
    vendorInstagram: "@elegantfeast",
    vendorWebsite: "www.elegantfeast.my",
    packageDetails: "Full reception catering package including dessert stations.",
    depositAmount: "RM 8,000",
    depositDueDate: "10 May 2026",
    balancePayment1Amount: "RM 6,000",
    balancePayment1DueDate: "12 Jul 2026",
    balancePayment2Amount: "RM 6,500",
    balancePayment2DueDate: "20 Aug 2026",
    remainingAmountToPay: "RM 6,500",
    invoiceNumber: "INV-2026-035",
  },
  {
    id: "expense-3",
    expense: "Photography Bundle",
    category: "Photography",
    vendor: "Luma Studio",
    budgeted: 8000,
    actual: 8000,
    status: "Pending",
    paymentStatus: "Pending",
    depositRequired: "Yes",
    paymentMethod: "Credit Card",
    vendorPicName: "Megan Chow",
    vendorPicContact: "012-9988776",
    vendorFacebook: "facebook.com/lumastudio",
    vendorInstagram: "@lumastudio",
    vendorWebsite: "www.lumastudio.com",
    packageDetails: "Wedding day photo and cinematic highlight coverage.",
    depositAmount: "RM 2,000",
    depositDueDate: "01 Jun 2026",
    balancePayment1Amount: "RM 3,000",
    balancePayment1DueDate: "15 Jul 2026",
    balancePayment2Amount: "RM 3,000",
    balancePayment2DueDate: "31 Aug 2026",
    remainingAmountToPay: "RM 8,000",
    invoiceNumber: "INV-2026-051",
  },
  {
    id: "expense-4",
    expense: "Floral Decoration",
    category: "Decoration",
    vendor: "Bloom Atelier",
    budgeted: 5500,
    actual: 5000,
    status: "Paid",
    paymentStatus: "Fully Paid",
    depositRequired: "No",
    paymentMethod: "Cash",
    vendorPicName: "Nur Adelia",
    vendorPicContact: "019-7788990",
    vendorFacebook: "facebook.com/bloomatelier",
    vendorInstagram: "@bloomatelier",
    vendorWebsite: "www.bloomatelier.my",
    packageDetails: "Fresh floral setup for stage backdrop and guest tables.",
    depositAmount: "RM 0",
    depositDueDate: "-",
    balancePayment1Amount: "RM 0",
    balancePayment1DueDate: "-",
    balancePayment2Amount: "RM 0",
    balancePayment2DueDate: "-",
    remainingAmountToPay: "RM 0",
    invoiceNumber: "INV-2026-066",
  },
];

const defaultBudgetFilters: BudgetAdvancedFilters = {
  category: "All",
  paymentStatus: "All",
};

const formatCurrency = (value: number) => {
  const absolute = Math.abs(value).toLocaleString("en-MY");
  return value < 0 ? `-RM ${absolute}` : `RM ${absolute}`;
};

export function BudgetModuleView() {
  const [budgetSearchQuery, setBudgetSearchQuery] = useState("");
  const [budgetExpenses, setBudgetExpenses] = useState<BudgetExpense[]>(initialBudgetExpenses);
  const [filters, setFilters] = useState<BudgetAdvancedFilters>(defaultBudgetFilters);
  const [selectedExpenseId, setSelectedExpenseId] = useState(initialBudgetExpenses[0].id);
  const [isExpenseFormModalOpen, setIsExpenseFormModalOpen] = useState(false);
  const [expenseFormMode, setExpenseFormMode] = useState<"add" | "edit">("add");
  const [editingExpenseId, setEditingExpenseId] = useState<string | null>(null);
  const [isExpenseProfileModalOpen, setIsExpenseProfileModalOpen] = useState(false);
  const [viewExpenseId, setViewExpenseId] = useState<string | null>(null);
  const [isDeleteExpenseDialogOpen, setIsDeleteExpenseDialogOpen] = useState(false);
  const [pendingDeleteExpenseId, setPendingDeleteExpenseId] = useState<string | null>(null);

  useEffect(() => {
    if (!isExpenseFormModalOpen && !isExpenseProfileModalOpen && !isDeleteExpenseDialogOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsExpenseFormModalOpen(false);
        setIsExpenseProfileModalOpen(false);
        setIsDeleteExpenseDialogOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isDeleteExpenseDialogOpen, isExpenseFormModalOpen, isExpenseProfileModalOpen]);

  const filteredExpenses = useMemo(() => {
    const normalizedSearch = budgetSearchQuery.trim().toLowerCase();

    return budgetExpenses.filter((expense) => {
      const matchesSearch =
        normalizedSearch.length === 0
        || expense.expense.toLowerCase().includes(normalizedSearch)
        || expense.vendor.toLowerCase().includes(normalizedSearch)
        || expense.category.toLowerCase().includes(normalizedSearch)
        || expense.paymentStatus.toLowerCase().includes(normalizedSearch)
        || expense.status.toLowerCase().includes(normalizedSearch);

      const matchesCategory = filters.category === "All" || expense.category === filters.category;
      const matchesPaymentStatus = filters.paymentStatus === "All" || expense.paymentStatus === filters.paymentStatus;

      return matchesSearch && matchesCategory && matchesPaymentStatus;
    });
  }, [budgetSearchQuery, filters]);

  useEffect(() => {
    if (filteredExpenses.length === 0) {
      return;
    }

    const hasSelectedExpense = filteredExpenses.some((expense) => expense.id === selectedExpenseId);
    if (!hasSelectedExpense) {
      setSelectedExpenseId(filteredExpenses[0].id);
    }
  }, [filteredExpenses, selectedExpenseId]);

  const selectedExpense = useMemo(() => {
    return filteredExpenses.find((expense) => expense.id === selectedExpenseId) ?? filteredExpenses[0];
  }, [filteredExpenses, selectedExpenseId]);

  const viewedExpense = useMemo(() => {
    if (!viewExpenseId) {
      return undefined;
    }

    return budgetExpenses.find((expense) => expense.id === viewExpenseId);
  }, [budgetExpenses, viewExpenseId]);

  const editingExpense = useMemo(() => {
    if (!editingExpenseId) {
      return undefined;
    }

    return budgetExpenses.find((expense) => expense.id === editingExpenseId);
  }, [budgetExpenses, editingExpenseId]);

  const budgetRows = useMemo<BudgetTableRow[]>(() => {
    return filteredExpenses.map((expense) => ({
      id: expense.id,
      expense: expense.expense,
      category: expense.category,
      vendor: expense.vendor,
      actual: formatCurrency(expense.actual),
      status: expense.status,
    }));
  }, [filteredExpenses]);

  const budgetStatistics = useMemo(() => {
    const totalBudget = filteredExpenses.reduce((sum, expense) => sum + expense.budgeted, 0);
    const totalSpent = filteredExpenses.reduce((sum, expense) => sum + expense.actual, 0);
    const paidAmount = filteredExpenses
      .filter((expense) => expense.status === "Paid")
      .reduce((sum, expense) => sum + expense.actual, 0);
    const pendingPayments = filteredExpenses.filter((expense) => expense.status !== "Paid").length;
    const overduePayments = filteredExpenses.filter((expense) => expense.paymentStatus === "Overdue").length;

    return {
      totalBudget: formatCurrency(totalBudget),
      totalSpent: formatCurrency(totalSpent),
      remainingBudget: formatCurrency(totalBudget - totalSpent),
      pendingPayments: pendingPayments.toString(),
      paidAmount: formatCurrency(paidAmount),
      overduePayments: overduePayments.toString(),
    };
  }, [filteredExpenses]);

  const openAddExpenseModal = () => {
    setExpenseFormMode("add");
    setEditingExpenseId(null);
    setIsExpenseFormModalOpen(true);
  };

  const openEditExpenseModal = (expenseId: string) => {
    setSelectedExpenseId(expenseId);
    setExpenseFormMode("edit");
    setEditingExpenseId(expenseId);
    setIsExpenseProfileModalOpen(false);
    setIsExpenseFormModalOpen(true);
  };

  const closeExpenseFormModal = () => {
    setIsExpenseFormModalOpen(false);
    setEditingExpenseId(null);
  };

  const closeExpenseProfileModal = () => {
    setIsExpenseProfileModalOpen(false);
    setViewExpenseId(null);
  };

  const openDeleteExpenseDialog = (expenseId: string) => {
    setPendingDeleteExpenseId(expenseId);
    setIsDeleteExpenseDialogOpen(true);
  };

  const closeDeleteExpenseDialog = () => {
    setIsDeleteExpenseDialogOpen(false);
    setPendingDeleteExpenseId(null);
  };

  const confirmDeleteExpense = () => {
    if (!pendingDeleteExpenseId) {
      return;
    }

    const fallbackExpense = filteredExpenses.find((expense) => expense.id !== pendingDeleteExpenseId);

    setBudgetExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== pendingDeleteExpenseId),
    );

    if (selectedExpenseId === pendingDeleteExpenseId) {
      if (fallbackExpense) {
        setSelectedExpenseId(fallbackExpense.id);
      }
    }

    if (viewExpenseId === pendingDeleteExpenseId) {
      closeExpenseProfileModal();
    }

    closeDeleteExpenseDialog();
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Budget Management</h1>
            <p className="mt-1 text-sm text-slate-500">Track wedding spending, budget usage, and payment progress.</p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto md:items-center md:justify-end">
            <input
              type="search"
              value={budgetSearchQuery}
              onChange={(event) => setBudgetSearchQuery(event.target.value)}
              placeholder="Search expenses"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 sm:min-w-64"
            />
            <button
              type="button"
              onClick={openAddExpenseModal}
              className="rounded-2xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600"
            >
              Add Expense
            </button>
          </div>
        </div>
      </section>

      <BudgetStatistics
        totalBudget={budgetStatistics.totalBudget}
        totalSpent={budgetStatistics.totalSpent}
        remainingBudget={budgetStatistics.remainingBudget}
        pendingPayments={budgetStatistics.pendingPayments}
        paidAmount={budgetStatistics.paidAmount}
        overduePayments={budgetStatistics.overduePayments}
      />

      <BudgetFilter filters={filters} onChange={setFilters} />

      <BudgetTable
        rows={budgetRows}
        selectedExpenseId={selectedExpense?.id ?? ""}
        onSelectExpense={setSelectedExpenseId}
        onViewExpense={(expenseId) => {
          setSelectedExpenseId(expenseId);
          setViewExpenseId(expenseId);
          setIsExpenseProfileModalOpen(true);
        }}
        onEditExpense={openEditExpenseModal}
        onDeleteExpense={openDeleteExpenseDialog}
      />

      {isExpenseFormModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-0 sm:items-center sm:p-6"
          onClick={closeExpenseFormModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="expense-form-modal-title"
            className="relative h-screen w-full overflow-hidden bg-white shadow-xl sm:h-auto sm:max-h-[90vh] sm:w-[min(100%,72rem)] sm:rounded-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-8">
              <h2 id="expense-form-modal-title" className="text-xl font-semibold text-slate-900">
                {expenseFormMode === "edit" ? "Edit Expense" : "Add Expense"}
              </h2>
              <button
                type="button"
                onClick={closeExpenseFormModal}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-300"
              >
                Close
              </button>
            </div>

            <div className="max-h-[calc(100vh-4.25rem)] overflow-y-auto px-5 pb-6 sm:max-h-[calc(90vh-4.25rem)] sm:px-8 sm:pb-8">
              <BudgetForm
                className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                title={expenseFormMode === "edit" ? "Edit Expense" : "Expense Details"}
                saveLabel={expenseFormMode === "edit" ? "Save Changes" : "Save Expense"}
                expenseName={editingExpense?.expense}
                category={editingExpense?.category}
                vendorName={editingExpense?.vendor}
                description={editingExpense?.packageDetails}
                totalAmount={editingExpense ? formatCurrency(editingExpense.budgeted) : undefined}
                depositRequired={editingExpense?.depositRequired}
                depositAmount={editingExpense?.depositAmount}
                depositDueDate={editingExpense?.depositDueDate}
                balancePayment1Amount={editingExpense?.balancePayment1Amount}
                balancePayment1DueDate={editingExpense?.balancePayment1DueDate}
                balancePayment2Amount={editingExpense?.balancePayment2Amount}
                balancePayment2DueDate={editingExpense?.balancePayment2DueDate}
                remainingAmountToPay={editingExpense?.remainingAmountToPay}
                paymentStatus={editingExpense?.paymentStatus}
                onCancel={closeExpenseFormModal}
                onSave={closeExpenseFormModal}
              />
            </div>
          </div>
        </div>
      )}

      {isExpenseProfileModalOpen && viewedExpense && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-0 sm:items-center sm:p-6"
          onClick={closeExpenseProfileModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="expense-profile-modal-title"
            className="relative h-screen w-full overflow-hidden bg-white shadow-xl sm:h-auto sm:max-h-[90vh] sm:w-[min(100%,72rem)] sm:rounded-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-8">
              <h2 id="expense-profile-modal-title" className="text-xl font-semibold text-slate-900">Expense Profile</h2>
              <button
                type="button"
                onClick={closeExpenseProfileModal}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-300"
              >
                Close
              </button>
            </div>

            <div className="max-h-[calc(100vh-4.25rem)] overflow-y-auto px-5 pb-6 sm:max-h-[calc(90vh-4.25rem)] sm:px-8 sm:pb-8">
              <BudgetDetailCard
                className="mt-6 rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50/80 p-6 shadow-sm sm:p-8"
                showActions={false}
                expenseName={viewedExpense.expense}
                category={viewedExpense.category}
                vendorName={viewedExpense.vendor}
                vendorPicName={viewedExpense.vendorPicName}
                vendorPicContact={viewedExpense.vendorPicContact}
                vendorFacebook={viewedExpense.vendorFacebook}
                vendorInstagram={viewedExpense.vendorInstagram}
                vendorWebsite={viewedExpense.vendorWebsite}
                packageDetails={viewedExpense.packageDetails}
                totalAmount={formatCurrency(viewedExpense.budgeted)}
                depositRequired={viewedExpense.depositRequired}
                depositAmount={viewedExpense.depositAmount}
                depositDueDate={viewedExpense.depositDueDate}
                balancePayment1Amount={viewedExpense.balancePayment1Amount}
                balancePayment1DueDate={viewedExpense.balancePayment1DueDate}
                balancePayment2Amount={viewedExpense.balancePayment2Amount}
                balancePayment2DueDate={viewedExpense.balancePayment2DueDate}
                remainingAmountToPay={viewedExpense.remainingAmountToPay}
                paymentStatus={viewedExpense.paymentStatus}
                paymentMethod={viewedExpense.paymentMethod}
                invoiceNumber={viewedExpense.invoiceNumber}
                receiptUpload="Placeholder receipt upload"
              />
            </div>
          </div>
        </div>
      )}

      {isDeleteExpenseDialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4"
          onClick={closeDeleteExpenseDialog}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-expense-dialog-title"
            className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="delete-expense-dialog-title" className="text-lg font-semibold text-slate-900">Delete Expense</h2>
            <p className="mt-2 text-sm text-slate-600">
              Are you sure you want to delete this expense? This action cannot be undone in the current mock workflow.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeDeleteExpenseDialog}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteExpense}
                className="rounded-full bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function VendorsModuleView() {
  type VendorRecord = {
    id: string;
    category: string;
    vendorName: string;
    vendorPicName: string;
    vendorPicContact: string;
    email: string;
    website: string;
    facebook: string;
    instagram: string;
    packageDetails: string;
    notes: string;
  };

  const initialVendors: VendorRecord[] = [
    {
      id: "vendor-1",
      category: "Venue",
      vendorName: "The Garden Hall",
      vendorPicName: "Alicia Tan",
      vendorPicContact: "012-3456789",
      email: "alicia@thegardenhall.com",
      website: "www.thegardenhall.com",
      facebook: "facebook.com/thegardenhall",
      instagram: "@thegardenhall",
      packageDetails: "Standard wedding package includes venue styling, basic lighting, and setup support.",
      notes: "Preferred vendor available on weekends and offers a 10% discount for full-day bookings.",
    },
    {
      id: "vendor-2",
      category: "Photographer",
      vendorName: "ABC Photography",
      vendorPicName: "Evan Lim",
      vendorPicContact: "019-1234567",
      email: "evan@abcphoto.my",
      website: "www.abcphoto.my",
      facebook: "facebook.com/abcphoto",
      instagram: "@abcphotography",
      packageDetails: "Full-day photography coverage with edited digital album.",
      notes: "Fast turnaround for wedding highlights.",
    },
    {
      id: "vendor-3",
      category: "Decoration",
      vendorName: "Dream Decoration",
      vendorPicName: "Siti Rahman",
      vendorPicContact: "011-9876543",
      email: "siti@dreamdecoration.my",
      website: "www.dreamdecoration.my",
      facebook: "facebook.com/dreamdecoration",
      instagram: "@dreamdecoration",
      packageDetails: "Custom stage and hall decoration with fresh floral accents.",
      notes: "Flexible with venue setup windows.",
    },
  ];

  const defaultVendorFilters: VendorFilters = {
    category: "All",
    vendorName: "All Vendors",
  };

  const [vendorSearchQuery, setVendorSearchQuery] = useState("");
  const [vendors, setVendors] = useState<VendorRecord[]>(initialVendors);
  const [vendorFilters, setVendorFilters] = useState<VendorFilters>(defaultVendorFilters);
  const [selectedVendorId, setSelectedVendorId] = useState(initialVendors[0].id);
  const [isVendorFormModalOpen, setIsVendorFormModalOpen] = useState(false);
  const [vendorFormMode, setVendorFormMode] = useState<"add" | "edit">("add");
  const [editingVendorId, setEditingVendorId] = useState<string | null>(null);
  const [isVendorDetailModalOpen, setIsVendorDetailModalOpen] = useState(false);
  const [viewVendorId, setViewVendorId] = useState<string | null>(null);

  useEffect(() => {
    if (!isVendorFormModalOpen && !isVendorDetailModalOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVendorFormModalOpen(false);
        setIsVendorDetailModalOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isVendorDetailModalOpen, isVendorFormModalOpen]);

  const vendorNameOptions = useMemo(() => {
    return ["All Vendors", ...Array.from(new Set(vendors.map((vendor) => vendor.vendorName)))];
  }, [vendors]);

  const filteredVendors = useMemo(() => {
    const normalizedSearch = vendorSearchQuery.trim().toLowerCase();

    return vendors.filter((vendor) => {
      const matchesSearch =
        normalizedSearch.length === 0
        || vendor.vendorName.toLowerCase().includes(normalizedSearch)
        || vendor.category.toLowerCase().includes(normalizedSearch)
        || vendor.vendorPicName.toLowerCase().includes(normalizedSearch)
        || vendor.vendorPicContact.toLowerCase().includes(normalizedSearch)
        || vendor.email.toLowerCase().includes(normalizedSearch);

      const matchesCategory = vendorFilters.category === "All" || vendor.category === vendorFilters.category;
      const matchesVendorName = vendorFilters.vendorName === "All Vendors" || vendor.vendorName === vendorFilters.vendorName;

      return matchesSearch && matchesCategory && matchesVendorName;
    });
  }, [vendorFilters, vendorSearchQuery, vendors]);

  useEffect(() => {
    if (filteredVendors.length === 0) {
      return;
    }

    const hasSelectedVendor = filteredVendors.some((vendor) => vendor.id === selectedVendorId);
    if (!hasSelectedVendor) {
      setSelectedVendorId(filteredVendors[0].id);
    }
  }, [filteredVendors, selectedVendorId]);

  const selectedVendor = useMemo(() => {
    return filteredVendors.find((vendor) => vendor.id === selectedVendorId) ?? filteredVendors[0];
  }, [filteredVendors, selectedVendorId]);

  const viewedVendor = useMemo(() => {
    if (!viewVendorId) {
      return undefined;
    }

    return vendors.find((vendor) => vendor.id === viewVendorId);
  }, [vendors, viewVendorId]);

  const editingVendor = useMemo(() => {
    if (!editingVendorId) {
      return undefined;
    }

    return vendors.find((vendor) => vendor.id === editingVendorId);
  }, [editingVendorId, vendors]);

  const vendorRows = useMemo<VendorRow[]>(() => {
    return filteredVendors.map((vendor) => ({
      id: vendor.id,
      category: vendor.category,
      vendorName: vendor.vendorName,
      vendorPicName: vendor.vendorPicName,
      vendorPicContact: vendor.vendorPicContact,
      email: vendor.email,
    }));
  }, [filteredVendors]);

  const vendorFormValues: VendorFormValues | undefined = editingVendor
    ? {
      category: editingVendor.category,
      vendorName: editingVendor.vendorName,
      website: editingVendor.website,
      facebook: editingVendor.facebook,
      instagram: editingVendor.instagram,
      picName: editingVendor.vendorPicName,
      picContact: editingVendor.vendorPicContact,
      packageDetails: editingVendor.packageDetails,
      notes: editingVendor.notes,
    }
    : undefined;

  const openAddVendorModal = () => {
    setVendorFormMode("add");
    setEditingVendorId(null);
    setIsVendorFormModalOpen(true);
  };

  const openEditVendorModal = (vendorId: string) => {
    setSelectedVendorId(vendorId);
    setVendorFormMode("edit");
    setEditingVendorId(vendorId);
    setIsVendorDetailModalOpen(false);
    setIsVendorFormModalOpen(true);
  };

  const openVendorDetailModal = (vendorId: string) => {
    setSelectedVendorId(vendorId);
    setViewVendorId(vendorId);
    setIsVendorDetailModalOpen(true);
  };

  const closeVendorFormModal = () => {
    setIsVendorFormModalOpen(false);
    setEditingVendorId(null);
  };

  const closeVendorDetailModal = () => {
    setIsVendorDetailModalOpen(false);
    setViewVendorId(null);
  };

  const deleteVendor = (vendorId: string) => {
    setVendors((currentVendors) => currentVendors.filter((vendor) => vendor.id !== vendorId));
    if (selectedVendorId === vendorId) {
      const fallbackVendor = filteredVendors.find((vendor) => vendor.id !== vendorId);
      if (fallbackVendor) {
        setSelectedVendorId(fallbackVendor.id);
      }
    }
    if (viewVendorId === vendorId) {
      closeVendorDetailModal();
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Vendor Management</h1>
            <p className="mt-1 text-sm text-slate-500">Manage vendor partners, confirmations, and service details.</p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto md:items-center md:justify-end">
            <input
              type="search"
              value={vendorSearchQuery}
              onChange={(event) => setVendorSearchQuery(event.target.value)}
              placeholder="Search vendors"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 sm:min-w-64"
            />
            <button
              type="button"
              onClick={openAddVendorModal}
              className="rounded-2xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600"
            >
              Add Vendor
            </button>
          </div>
        </div>
      </section>

      <VendorSummary />
      <VendorFilter
        filters={vendorFilters}
        vendorOptions={vendorNameOptions}
        onChange={setVendorFilters}
      />
      <VendorTable
        rows={vendorRows}
        selectedVendorId={selectedVendor?.id ?? ""}
        onSelectVendor={setSelectedVendorId}
        onViewVendor={openVendorDetailModal}
        onEditVendor={openEditVendorModal}
        onDeleteVendor={deleteVendor}
      />

      {isVendorFormModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-0 sm:items-center sm:p-6"
          onClick={closeVendorFormModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="vendor-form-modal-title"
            className="relative h-screen w-full overflow-hidden bg-white shadow-xl sm:h-auto sm:max-h-[90vh] sm:w-[min(100%,72rem)] sm:rounded-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-8">
              <h2 id="vendor-form-modal-title" className="text-xl font-semibold text-slate-900">
                {vendorFormMode === "edit" ? "Edit Vendor" : "Add Vendor"}
              </h2>
              <button
                type="button"
                onClick={closeVendorFormModal}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-300"
              >
                Close
              </button>
            </div>

            <div className="max-h-[calc(100vh-4.25rem)] overflow-y-auto px-5 pb-6 sm:max-h-[calc(90vh-4.25rem)] sm:px-8 sm:pb-8">
              <VendorForm
                className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                title={vendorFormMode === "edit" ? "Edit Vendor" : "Add Vendor"}
                description={
                  vendorFormMode === "edit"
                    ? "Update vendor information, social links, and contact details."
                    : "Add a new vendor record with contact, social, and package details."
                }
                saveLabel={vendorFormMode === "edit" ? "Save Changes" : "Save Vendor"}
                values={vendorFormMode === "edit" ? vendorFormValues : undefined}
                onCancel={closeVendorFormModal}
                onSave={closeVendorFormModal}
              />
            </div>
          </div>
        </div>
      )}

      {isVendorDetailModalOpen && viewedVendor && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-0 sm:items-center sm:p-6"
          onClick={closeVendorDetailModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="vendor-detail-modal-title"
            className="relative h-screen w-full overflow-hidden bg-white shadow-xl sm:h-auto sm:max-h-[90vh] sm:w-[min(100%,72rem)] sm:rounded-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-8">
              <h2 id="vendor-detail-modal-title" className="text-xl font-semibold text-slate-900">Vendor Details</h2>
              <button
                type="button"
                onClick={closeVendorDetailModal}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-300"
              >
                Close
              </button>
            </div>

            <div className="max-h-[calc(100vh-4.25rem)] overflow-y-auto px-5 pb-6 sm:max-h-[calc(90vh-4.25rem)] sm:px-8 sm:pb-8">
              <VendorDetailCard
                className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                category={viewedVendor.category}
                vendorName={viewedVendor.vendorName}
                website={viewedVendor.website}
                facebook={viewedVendor.facebook}
                instagram={viewedVendor.instagram}
                picName={viewedVendor.vendorPicName}
                picContact={viewedVendor.vendorPicContact}
                packageDetails={viewedVendor.packageDetails}
                notes={viewedVendor.notes}
                onEdit={() => openEditVendorModal(viewedVendor.id)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function TasksModuleView() {
  type TaskRecord = {
    id: string;
    category: string;
    taskName: string;
    relatedVendor: string;
    assignedTo: string;
    dueDate: string;
    priority: "Low" | "Medium" | "High" | "Urgent";
    status: "Not Started" | "In Progress" | "Waiting" | "Completed" | "Cancelled";
    estimatedTime: string;
    description: string;
    notes: string;
  };

  const initialTasks: TaskRecord[] = [
    {
      id: "task-1",
      category: "Venue",
      taskName: "Confirm Venue Booking",
      relatedVendor: "The Garden Hall",
      assignedTo: "Rachel Chong",
      dueDate: "2026-08-15",
      priority: "High",
      status: "In Progress",
      estimatedTime: "2 hours",
      description: "Confirm venue availability, deposit schedule, and guest capacity for the ceremony and reception.",
      notes: "Reach out to the venue coordinator for the latest floorplan and vendor restrictions.",
    },
    {
      id: "task-2",
      category: "Decoration",
      taskName: "Finalize Decoration Theme",
      relatedVendor: "Dream Decoration",
      assignedTo: "Alicia Tan",
      dueDate: "2026-08-20",
      priority: "Medium",
      status: "Waiting",
      estimatedTime: "3 hours",
      description: "Finalize floral palette and stage styling before décor production starts.",
      notes: "Waiting for revised mood board from vendor.",
    },
    {
      id: "task-3",
      category: "Photography",
      taskName: "Confirm Photographer",
      relatedVendor: "ABC Photography",
      assignedTo: "Evan Lim",
      dueDate: "2026-08-10",
      priority: "High",
      status: "Completed",
      estimatedTime: "1 hour",
      description: "Confirm package inclusions, timeline, and final shot list with photographer.",
      notes: "Signed and confirmed.",
    },
  ];

  const defaultTaskFilters: TaskFilters = {
    priority: "All",
    status: "All",
  };

  const [taskSearchQuery, setTaskSearchQuery] = useState("");
  const [tasks, setTasks] = useState<TaskRecord[]>(initialTasks);
  const [taskFilters, setTaskFilters] = useState<TaskFilters>(defaultTaskFilters);
  const [selectedTaskId, setSelectedTaskId] = useState(initialTasks[0].id);
  const [isTaskFormModalOpen, setIsTaskFormModalOpen] = useState(false);
  const [taskFormMode, setTaskFormMode] = useState<"add" | "edit">("add");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [isTaskDetailModalOpen, setIsTaskDetailModalOpen] = useState(false);
  const [viewTaskId, setViewTaskId] = useState<string | null>(null);
  const [isDeleteTaskDialogOpen, setIsDeleteTaskDialogOpen] = useState(false);
  const [pendingDeleteTaskId, setPendingDeleteTaskId] = useState<string | null>(null);

  useEffect(() => {
    if (!isTaskFormModalOpen && !isTaskDetailModalOpen && !isDeleteTaskDialogOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsTaskFormModalOpen(false);
        setIsTaskDetailModalOpen(false);
        setIsDeleteTaskDialogOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isDeleteTaskDialogOpen, isTaskDetailModalOpen, isTaskFormModalOpen]);

  const filteredTasks = useMemo(() => {
    const normalizedSearch = taskSearchQuery.trim().toLowerCase();

    return tasks.filter((task) => {
      const matchesSearch =
        normalizedSearch.length === 0
        || task.taskName.toLowerCase().includes(normalizedSearch)
        || task.category.toLowerCase().includes(normalizedSearch)
        || task.assignedTo.toLowerCase().includes(normalizedSearch)
        || task.relatedVendor.toLowerCase().includes(normalizedSearch)
        || task.priority.toLowerCase().includes(normalizedSearch)
        || task.status.toLowerCase().includes(normalizedSearch);

      const matchesPriority = taskFilters.priority === "All" || task.priority === taskFilters.priority;
      const matchesStatus = taskFilters.status === "All" || task.status === taskFilters.status;

      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [taskFilters, taskSearchQuery, tasks]);

  useEffect(() => {
    if (filteredTasks.length === 0) {
      return;
    }

    const hasSelectedTask = filteredTasks.some((task) => task.id === selectedTaskId);
    if (!hasSelectedTask) {
      setSelectedTaskId(filteredTasks[0].id);
    }
  }, [filteredTasks, selectedTaskId]);

  const selectedTask = useMemo(() => {
    return filteredTasks.find((task) => task.id === selectedTaskId) ?? filteredTasks[0];
  }, [filteredTasks, selectedTaskId]);

  const viewedTask = useMemo(() => {
    if (!viewTaskId) {
      return undefined;
    }

    return tasks.find((task) => task.id === viewTaskId);
  }, [tasks, viewTaskId]);

  const editingTask = useMemo(() => {
    if (!editingTaskId) {
      return undefined;
    }

    return tasks.find((task) => task.id === editingTaskId);
  }, [editingTaskId, tasks]);

  const taskRows = useMemo<TaskRow[]>(() => {
    return filteredTasks.map((task) => ({
      id: task.id,
      taskName: task.taskName,
      category: task.category,
      assignedTo: task.assignedTo,
      relatedVendor: task.relatedVendor,
      dueDate: task.dueDate,
      priority: task.priority,
      status: task.status,
    }));
  }, [filteredTasks]);

  const taskFormValues: TaskFormValues | undefined = editingTask
    ? {
      category: editingTask.category,
      taskName: editingTask.taskName,
      relatedVendor: editingTask.relatedVendor,
      assignedTo: editingTask.assignedTo,
      dueDate: editingTask.dueDate === "-" ? "" : editingTask.dueDate,
      priority: editingTask.priority,
      status: editingTask.status,
      estimatedTime: editingTask.estimatedTime,
      description: editingTask.description,
      notes: editingTask.notes,
    }
    : undefined;

  const openAddTaskModal = () => {
    setTaskFormMode("add");
    setEditingTaskId(null);
    setIsTaskFormModalOpen(true);
  };

  const openEditTaskModal = (taskId: string) => {
    setSelectedTaskId(taskId);
    setTaskFormMode("edit");
    setEditingTaskId(taskId);
    setIsTaskDetailModalOpen(false);
    setIsTaskFormModalOpen(true);
  };

  const openTaskDetailModal = (taskId: string) => {
    setSelectedTaskId(taskId);
    setViewTaskId(taskId);
    setIsTaskDetailModalOpen(true);
  };

  const closeTaskFormModal = () => {
    setIsTaskFormModalOpen(false);
    setEditingTaskId(null);
  };

  const closeTaskDetailModal = () => {
    setIsTaskDetailModalOpen(false);
    setViewTaskId(null);
  };

  const openDeleteTaskDialog = (taskId: string) => {
    setPendingDeleteTaskId(taskId);
    setIsDeleteTaskDialogOpen(true);
  };

  const closeDeleteTaskDialog = () => {
    setIsDeleteTaskDialogOpen(false);
    setPendingDeleteTaskId(null);
  };

  const pendingDeleteTask = pendingDeleteTaskId
    ? tasks.find((task) => task.id === pendingDeleteTaskId)
    : undefined;

  const confirmDeleteTask = () => {
    if (!pendingDeleteTaskId) {
      return;
    }

    const fallbackTask = filteredTasks.find((task) => task.id !== pendingDeleteTaskId);

    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== pendingDeleteTaskId));

    if (selectedTaskId === pendingDeleteTaskId && fallbackTask) {
      setSelectedTaskId(fallbackTask.id);
    }

    if (viewTaskId === pendingDeleteTaskId) {
      closeTaskDetailModal();
    }

    closeDeleteTaskDialog();
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Task Management</h1>
            <p className="mt-1 text-sm text-slate-500">Organize and monitor planning tasks across the wedding timeline.</p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto md:items-center md:justify-end">
            <input
              type="search"
              value={taskSearchQuery}
              onChange={(event) => setTaskSearchQuery(event.target.value)}
              placeholder="Search tasks"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 sm:min-w-64"
            />
            <button
              type="button"
              onClick={openAddTaskModal}
              className="rounded-2xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600"
            >
              Add Task
            </button>
          </div>
        </div>
      </section>

      <TaskSummary totalTasks={`${filteredTasks.length} Tasks`} />
      <TaskFilter filters={taskFilters} onChange={setTaskFilters} />
      <TaskTable
        rows={taskRows}
        selectedTaskId={selectedTask?.id ?? ""}
        onSelectTask={setSelectedTaskId}
        onViewTask={openTaskDetailModal}
        onEditTask={openEditTaskModal}
        onDeleteTask={openDeleteTaskDialog}
      />

      {isTaskFormModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-0 sm:items-center sm:p-6"
          onClick={closeTaskFormModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="task-form-modal-title"
            className="relative h-screen w-full overflow-hidden bg-white shadow-xl sm:h-auto sm:max-h-[90vh] sm:w-[min(100%,72rem)] sm:rounded-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-8">
              <h2 id="task-form-modal-title" className="text-xl font-semibold text-slate-900">
                {taskFormMode === "edit" ? "Edit Task" : "Add Task"}
              </h2>
              <button
                type="button"
                onClick={closeTaskFormModal}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-300"
              >
                Close
              </button>
            </div>

            <div className="max-h-[calc(100vh-4.25rem)] overflow-y-auto px-5 pb-6 sm:max-h-[calc(90vh-4.25rem)] sm:px-8 sm:pb-8">
              <TaskForm
                className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                title={taskFormMode === "edit" ? "Edit Task" : "Task Details"}
                saveLabel={taskFormMode === "edit" ? "Save Changes" : "Save Task"}
                values={taskFormMode === "edit" ? taskFormValues : undefined}
                onCancel={closeTaskFormModal}
                onSave={closeTaskFormModal}
              />
            </div>
          </div>
        </div>
      )}

      {isTaskDetailModalOpen && viewedTask && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-0 sm:items-center sm:p-6"
          onClick={closeTaskDetailModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="task-detail-modal-title"
            className="relative h-screen w-full overflow-hidden bg-white shadow-xl sm:h-auto sm:max-h-[90vh] sm:w-[min(100%,72rem)] sm:rounded-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-8">
              <h2 id="task-detail-modal-title" className="text-xl font-semibold text-slate-900">Task Details</h2>
              <button
                type="button"
                onClick={closeTaskDetailModal}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-300"
              >
                Close
              </button>
            </div>

            <div className="max-h-[calc(100vh-4.25rem)] overflow-y-auto px-5 pb-6 sm:max-h-[calc(90vh-4.25rem)] sm:px-8 sm:pb-8">
              <TaskDetailCard
                className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                category={viewedTask.category}
                taskName={viewedTask.taskName}
                relatedVendor={viewedTask.relatedVendor}
                assignedTo={viewedTask.assignedTo}
                dueDate={viewedTask.dueDate}
                priority={viewedTask.priority}
                status={viewedTask.status}
                estimatedTime={viewedTask.estimatedTime}
                description={viewedTask.description}
                notes={viewedTask.notes}
                onEdit={() => openEditTaskModal(viewedTask.id)}
              />
            </div>
          </div>
        </div>
      )}

      {isDeleteTaskDialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4"
          onClick={closeDeleteTaskDialog}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-task-dialog-title"
            className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="delete-task-dialog-title" className="text-lg font-semibold text-slate-900">Delete Task</h2>
            <p className="mt-2 text-sm text-slate-600">
              Are you sure you want to delete "{pendingDeleteTask?.taskName ?? "this task"}"?
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeDeleteTaskDialog}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteTask}
                className="rounded-full bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function GuestsModuleView() {
  type GuestRecord = {
    id: string;
    fullName: string;
    phoneNumber: string;
    emailAddress: string;
    preferredName: string;
    guestFrom: "Groom's Side" | "Bride's Side" | "Both";
    guestGroup: string;
    rsvpStatus: "Confirmed" | "Pending" | "Declined";
    invitationStatus: "Sent" | "Not Sent";
  };

  const initialGuests: GuestRecord[] = [
    {
      id: "guest-1",
      fullName: "Rachel Tan",
      phoneNumber: "012-3456789",
      emailAddress: "rachel@example.com",
      preferredName: "Rachel",
      guestFrom: "Bride's Side",
      guestGroup: "Family",
      rsvpStatus: "Confirmed",
      invitationStatus: "Sent",
    },
    {
      id: "guest-2",
      fullName: "John Lim",
      phoneNumber: "012-9988776",
      emailAddress: "john@example.com",
      preferredName: "John",
      guestFrom: "Groom's Side",
      guestGroup: "Friends",
      rsvpStatus: "Pending",
      invitationStatus: "Sent",
    },
    {
      id: "guest-3",
      fullName: "Siti Rahman",
      phoneNumber: "012-5566778",
      emailAddress: "siti@example.com",
      preferredName: "Siti",
      guestFrom: "Both",
      guestGroup: "Colleagues",
      rsvpStatus: "Pending",
      invitationStatus: "Not Sent",
    },
  ];

  const defaultGuestFilters: GuestFilters = {
    guestFrom: "All",
    guestGroup: "All",
  };

  const [guests, setGuests] = useState<GuestRecord[]>(initialGuests);
  const [selectedGuestId, setSelectedGuestId] = useState(initialGuests[0].id);
  const [guestSearchQuery, setGuestSearchQuery] = useState("");
  const [guestFilters, setGuestFilters] = useState<GuestFilters>(defaultGuestFilters);
  const [isGuestFormModalOpen, setIsGuestFormModalOpen] = useState(false);
  const [guestFormMode, setGuestFormMode] = useState<"add" | "edit">("add");
  const [editingGuestId, setEditingGuestId] = useState<string | null>(null);
  const [isGuestDetailModalOpen, setIsGuestDetailModalOpen] = useState(false);
  const [viewGuestId, setViewGuestId] = useState<string | null>(null);
  const [isDeleteGuestDialogOpen, setIsDeleteGuestDialogOpen] = useState(false);
  const [pendingDeleteGuestId, setPendingDeleteGuestId] = useState<string | null>(null);

  useEffect(() => {
    if (!isGuestFormModalOpen && !isGuestDetailModalOpen && !isDeleteGuestDialogOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsGuestFormModalOpen(false);
        setIsGuestDetailModalOpen(false);
        setIsDeleteGuestDialogOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isDeleteGuestDialogOpen, isGuestDetailModalOpen, isGuestFormModalOpen]);

  const filteredGuests = useMemo(() => {
    const normalizedSearch = guestSearchQuery.trim().toLowerCase();

    return guests.filter((guest) => {
      const matchesSearch =
        normalizedSearch.length === 0
        || guest.fullName.toLowerCase().includes(normalizedSearch)
        || guest.preferredName.toLowerCase().includes(normalizedSearch)
        || guest.phoneNumber.toLowerCase().includes(normalizedSearch)
        || guest.emailAddress.toLowerCase().includes(normalizedSearch)
        || guest.guestFrom.toLowerCase().includes(normalizedSearch)
        || guest.guestGroup.toLowerCase().includes(normalizedSearch);

      const matchesGuestFrom = guestFilters.guestFrom === "All" || guest.guestFrom === guestFilters.guestFrom;
      const matchesGuestGroup = guestFilters.guestGroup === "All" || guest.guestGroup === guestFilters.guestGroup;

      return matchesSearch && matchesGuestFrom && matchesGuestGroup;
    });
  }, [guestFilters, guestSearchQuery, guests]);

  useEffect(() => {
    if (filteredGuests.length === 0) {
      return;
    }

    const hasSelectedGuest = filteredGuests.some((guest) => guest.id === selectedGuestId);
    if (!hasSelectedGuest) {
      setSelectedGuestId(filteredGuests[0].id);
    }
  }, [filteredGuests, selectedGuestId]);

  const selectedGuest = useMemo(() => {
    return filteredGuests.find((guest) => guest.id === selectedGuestId) ?? filteredGuests[0];
  }, [filteredGuests, selectedGuestId]);

  const viewedGuest = useMemo(() => {
    if (!viewGuestId) {
      return undefined;
    }

    return guests.find((guest) => guest.id === viewGuestId);
  }, [guests, viewGuestId]);

  const editingGuest = useMemo(() => {
    if (!editingGuestId) {
      return undefined;
    }

    return guests.find((guest) => guest.id === editingGuestId);
  }, [editingGuestId, guests]);

  const guestFormValues: GuestFormValues | undefined = editingGuest
    ? {
      fullName: editingGuest.fullName,
      phoneNumber: editingGuest.phoneNumber,
      emailAddress: editingGuest.emailAddress,
      preferredName: editingGuest.preferredName,
      guestFrom: editingGuest.guestFrom,
      guestGroup: editingGuest.guestGroup,
    }
    : undefined;

  const openAddGuestModal = () => {
    setGuestFormMode("add");
    setEditingGuestId(null);
    setIsGuestFormModalOpen(true);
  };

  const openEditGuestModal = (guestId: string) => {
    setSelectedGuestId(guestId);
    setGuestFormMode("edit");
    setEditingGuestId(guestId);
    setIsGuestDetailModalOpen(false);
    setIsGuestFormModalOpen(true);
  };

  const openGuestDetailModal = (guestId: string) => {
    setSelectedGuestId(guestId);
    setViewGuestId(guestId);
    setIsGuestDetailModalOpen(true);
  };

  const closeGuestFormModal = () => {
    setIsGuestFormModalOpen(false);
    setEditingGuestId(null);
  };

  const closeGuestDetailModal = () => {
    setIsGuestDetailModalOpen(false);
    setViewGuestId(null);
  };

  const openDeleteGuestDialog = (guestId: string) => {
    setPendingDeleteGuestId(guestId);
    setIsDeleteGuestDialogOpen(true);
  };

  const closeDeleteGuestDialog = () => {
    setIsDeleteGuestDialogOpen(false);
    setPendingDeleteGuestId(null);
  };

  const pendingDeleteGuest = pendingDeleteGuestId
    ? guests.find((guest) => guest.id === pendingDeleteGuestId)
    : undefined;

  const confirmDeleteGuest = () => {
    if (!pendingDeleteGuestId) {
      return;
    }

    const fallbackGuest = filteredGuests.find((guest) => guest.id !== pendingDeleteGuestId);

    setGuests((currentGuests) => currentGuests.filter((guest) => guest.id !== pendingDeleteGuestId));

    if (selectedGuestId === pendingDeleteGuestId && fallbackGuest) {
      setSelectedGuestId(fallbackGuest.id);
    }

    if (viewGuestId === pendingDeleteGuestId) {
      closeGuestDetailModal();
    }

    closeDeleteGuestDialog();
  };

  const sendInvitation = (guestId: string) => {
    setGuests((currentGuests) =>
      currentGuests.map((guest) =>
        guest.id === guestId
          ? { ...guest, invitationStatus: "Sent" }
          : guest,
      ),
    );
  };

  const confirmedGuests = guests.filter((guest) => guest.rsvpStatus === "Confirmed").length;
  const pendingGuests = guests.filter((guest) => guest.rsvpStatus === "Pending").length;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Guest Management</h1>
            <p className="mt-1 text-sm text-slate-500">Manage guest lists, seating plans, and RSVP-linked guest details.</p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto md:items-center md:justify-end">
            <input
              type="search"
              value={guestSearchQuery}
              onChange={(event) => setGuestSearchQuery(event.target.value)}
              placeholder="Search guests"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 sm:min-w-64"
            />
            <button
              type="button"
              onClick={openAddGuestModal}
              className="rounded-2xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600"
            >
              Add Guest
            </button>
          </div>
        </div>
      </section>

      <GuestStatistics
        totalGuests={guests.length}
        confirmedGuests={confirmedGuests}
        pendingGuests={pendingGuests}
      />

      <GuestFilter filters={guestFilters} onChange={setGuestFilters} />

      <GuestTable
        guests={filteredGuests.map((guest) => ({
          id: guest.id,
          fullName: guest.fullName,
          preferredName: guest.preferredName,
          phoneNumber: guest.phoneNumber,
          emailAddress: guest.emailAddress,
          guestFrom: guest.guestFrom,
          guestGroup: guest.guestGroup,
          inviteStatus: guest.invitationStatus,
        }))}
        selectedGuestId={selectedGuest?.id ?? ""}
        onSelectGuest={setSelectedGuestId}
        onViewGuest={openGuestDetailModal}
        onEditGuest={openEditGuestModal}
        onDeleteGuest={openDeleteGuestDialog}
        onSendInvitation={sendInvitation}
      />

      {isGuestFormModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-0 sm:items-center sm:p-6"
          onClick={closeGuestFormModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="guest-form-modal-title"
            className="relative h-screen w-full overflow-hidden bg-white shadow-xl sm:h-auto sm:max-h-[90vh] sm:w-[min(100%,72rem)] sm:rounded-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-8">
              <h2 id="guest-form-modal-title" className="text-xl font-semibold text-slate-900">
                {guestFormMode === "edit" ? "Edit Guest" : "Add Guest"}
              </h2>
              <button
                type="button"
                onClick={closeGuestFormModal}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-300"
              >
                Close
              </button>
            </div>

            <div className="max-h-[calc(100vh-4.25rem)] overflow-y-auto px-5 pb-6 sm:max-h-[calc(90vh-4.25rem)] sm:px-8 sm:pb-8">
              <GuestForm
                className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                title={guestFormMode === "edit" ? "Edit Guest" : "Guest Details"}
                saveLabel={guestFormMode === "edit" ? "Save Changes" : "Save Guest"}
                values={guestFormMode === "edit" ? guestFormValues : undefined}
                onCancel={closeGuestFormModal}
                onSave={closeGuestFormModal}
              />
            </div>
          </div>
        </div>
      )}

      {isGuestDetailModalOpen && viewedGuest && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-0 sm:items-center sm:p-6"
          onClick={closeGuestDetailModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="guest-detail-modal-title"
            className="relative h-screen w-full overflow-hidden bg-white shadow-xl sm:h-auto sm:max-h-[90vh] sm:w-[min(100%,72rem)] sm:rounded-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-8">
              <h2 id="guest-detail-modal-title" className="text-xl font-semibold text-slate-900">Guest Profile</h2>
              <button
                type="button"
                onClick={closeGuestDetailModal}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-300"
              >
                Close
              </button>
            </div>

            <div className="max-h-[calc(100vh-4.25rem)] overflow-y-auto px-5 pb-6 sm:max-h-[calc(90vh-4.25rem)] sm:px-8 sm:pb-8">
              <GuestDetailCard
                className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                guestName={viewedGuest.fullName}
                preferredName={viewedGuest.preferredName}
                phoneNumber={viewedGuest.phoneNumber}
                emailAddress={viewedGuest.emailAddress}
                guestFrom={viewedGuest.guestFrom}
                guestGroup={viewedGuest.guestGroup}
                onEdit={() => openEditGuestModal(viewedGuest.id)}
              />
            </div>
          </div>
        </div>
      )}

      {isDeleteGuestDialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4"
          onClick={closeDeleteGuestDialog}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-guest-dialog-title"
            className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="delete-guest-dialog-title" className="text-lg font-semibold text-slate-900">Delete Guest</h2>
            <p className="mt-2 text-sm text-slate-600">
              Are you sure you want to delete "{pendingDeleteGuest?.fullName ?? "this guest"}"?
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeDeleteGuestDialog}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteGuest}
                className="rounded-full bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function RSVPModuleView() {
  const initialRsvpRecords: RSVPRecord[] = [
    {
      id: "rsvp-1",
      guestName: "Rachel Tan",
      preferredName: "Rachel",
      guestFrom: "Bride's Side",
      status: "Confirmed",
      adults: 2,
      children: 1,
      responseDate: "2026-06-20",
      invitationSent: "Sent",
      mealPreference: "Vegetarian",
      assignedTable: "Table 1",
      relatedGuestGroup: "Family",
      emailAddress: "rachel@example.com",
      phoneNumber: "012-3456789",
      notes: "Family guest",
      specialRequests: "Baby chairs for 2 children",
    },
    {
      id: "rsvp-2",
      guestName: "John Lim",
      preferredName: "John",
      guestFrom: "Groom's Side",
      status: "Pending",
      adults: 1,
      children: 0,
      responseDate: "2026-06-22",
      invitationSent: "Sent",
      mealPreference: "Normal",
      assignedTable: null,
      relatedGuestGroup: "Friends",
      emailAddress: "john@example.com",
      phoneNumber: "012-9988776",
      notes: "Awaiting final confirmation",
      specialRequests: "",
    },
    {
      id: "rsvp-3",
      guestName: "Siti Rahman",
      preferredName: "Siti",
      guestFrom: "Both",
      status: "Declined",
      adults: 1,
      children: 0,
      responseDate: "2026-06-24",
      invitationSent: "Pending",
      mealPreference: "Halal",
      assignedTable: null,
      relatedGuestGroup: "Colleagues",
      emailAddress: "siti@example.com",
      phoneNumber: "012-5566778",
      notes: "Unable to attend",
      specialRequests: "",
    },
  ];

  const defaultRsvpFilters: RSVPFilters = {
    status: "All",
    guestFrom: "All",
    mealPreference: "All",
  };

  const [rsvpSearchQuery, setRsvpSearchQuery] = useState("");
  const [rsvpRecords, setRsvpRecords] = useState<RSVPRecord[]>(initialRsvpRecords);
  const [rsvpFilters, setRsvpFilters] = useState<RSVPFilters>(defaultRsvpFilters);
  const [selectedRsvpId, setSelectedRsvpId] = useState(initialRsvpRecords[0].id);
  const [isRsvpFormModalOpen, setIsRsvpFormModalOpen] = useState(false);
  const [rsvpFormMode, setRsvpFormMode] = useState<"add" | "edit">("add");
  const [editingRsvpId, setEditingRsvpId] = useState<string | null>(null);
  const [isRsvpDetailModalOpen, setIsRsvpDetailModalOpen] = useState(false);
  const [viewRsvpId, setViewRsvpId] = useState<string | null>(null);
  const [isDeleteRsvpDialogOpen, setIsDeleteRsvpDialogOpen] = useState(false);
  const [pendingDeleteRsvpId, setPendingDeleteRsvpId] = useState<string | null>(null);

  useEffect(() => {
    if (!isRsvpFormModalOpen && !isRsvpDetailModalOpen && !isDeleteRsvpDialogOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsRsvpFormModalOpen(false);
        setIsRsvpDetailModalOpen(false);
        setIsDeleteRsvpDialogOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isDeleteRsvpDialogOpen, isRsvpDetailModalOpen, isRsvpFormModalOpen]);

  const filteredRsvpRecords = useMemo(() => {
    const normalizedSearch = rsvpSearchQuery.trim().toLowerCase();

    return rsvpRecords.filter((record) => {
      const matchesSearch =
        normalizedSearch.length === 0
        || record.guestName.toLowerCase().includes(normalizedSearch)
        || record.preferredName.toLowerCase().includes(normalizedSearch)
        || record.status.toLowerCase().includes(normalizedSearch)
        || record.guestFrom.toLowerCase().includes(normalizedSearch)
        || record.relatedGuestGroup.toLowerCase().includes(normalizedSearch)
        || record.phoneNumber.toLowerCase().includes(normalizedSearch)
        || record.emailAddress.toLowerCase().includes(normalizedSearch);

      const matchesStatus = rsvpFilters.status === "All" || record.status === rsvpFilters.status;
      const matchesGuestFrom = rsvpFilters.guestFrom === "All" || record.guestFrom === rsvpFilters.guestFrom;
      const matchesMealPreference = rsvpFilters.mealPreference === "All" || record.mealPreference === rsvpFilters.mealPreference;

      return matchesSearch && matchesStatus && matchesGuestFrom && matchesMealPreference;
    });
  }, [rsvpFilters, rsvpRecords, rsvpSearchQuery]);

  const updateRsvpFilter = (key: keyof RSVPFilters, value: string) => {
    setRsvpFilters((current) => ({
      ...current,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (filteredRsvpRecords.length === 0) {
      return;
    }

    const hasSelected = filteredRsvpRecords.some((record) => record.id === selectedRsvpId);
    if (!hasSelected) {
      setSelectedRsvpId(filteredRsvpRecords[0].id);
    }
  }, [filteredRsvpRecords, selectedRsvpId]);

  const selectedRsvp = useMemo(() => {
    return filteredRsvpRecords.find((record) => record.id === selectedRsvpId) ?? filteredRsvpRecords[0];
  }, [filteredRsvpRecords, selectedRsvpId]);

  const viewedRsvp = useMemo(() => {
    if (!viewRsvpId) {
      return undefined;
    }

    return rsvpRecords.find((record) => record.id === viewRsvpId);
  }, [rsvpRecords, viewRsvpId]);

  const editingRsvp = useMemo(() => {
    if (!editingRsvpId) {
      return undefined;
    }

    return rsvpRecords.find((record) => record.id === editingRsvpId);
  }, [editingRsvpId, rsvpRecords]);

  const openAddRsvpModal = () => {
    setRsvpFormMode("add");
    setEditingRsvpId(null);
    setIsRsvpFormModalOpen(true);
  };

  const openEditRsvpModal = (rsvpId: string) => {
    setSelectedRsvpId(rsvpId);
    setRsvpFormMode("edit");
    setEditingRsvpId(rsvpId);
    setIsRsvpDetailModalOpen(false);
    setIsRsvpFormModalOpen(true);
  };

  const openViewRsvpModal = (rsvpId: string) => {
    setSelectedRsvpId(rsvpId);
    setViewRsvpId(rsvpId);
    setIsRsvpDetailModalOpen(true);
  };

  const closeRsvpFormModal = () => {
    setIsRsvpFormModalOpen(false);
    setEditingRsvpId(null);
  };

  const closeRsvpDetailModal = () => {
    setIsRsvpDetailModalOpen(false);
    setViewRsvpId(null);
  };

  const openDeleteRsvpDialog = (rsvpId: string) => {
    setPendingDeleteRsvpId(rsvpId);
    setIsDeleteRsvpDialogOpen(true);
  };

  const closeDeleteRsvpDialog = () => {
    setIsDeleteRsvpDialogOpen(false);
    setPendingDeleteRsvpId(null);
  };

  const pendingDeleteRsvp = pendingDeleteRsvpId
    ? rsvpRecords.find((record) => record.id === pendingDeleteRsvpId)
    : undefined;

  const confirmDeleteRsvp = () => {
    if (!pendingDeleteRsvpId) {
      return;
    }

    const fallbackRecord = filteredRsvpRecords.find((record) => record.id !== pendingDeleteRsvpId);

    setRsvpRecords((currentRecords) => currentRecords.filter((record) => record.id !== pendingDeleteRsvpId));

    if (selectedRsvpId === pendingDeleteRsvpId && fallbackRecord) {
      setSelectedRsvpId(fallbackRecord.id);
    }

    if (viewRsvpId === pendingDeleteRsvpId) {
      closeRsvpDetailModal();
    }

    closeDeleteRsvpDialog();
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">RSVP Management</h1>
            <p className="mt-1 text-sm text-slate-500">Track invitation responses, confirmations, and attendance updates.</p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto md:items-center md:justify-end">
            <input
              type="search"
              value={rsvpSearchQuery}
              onChange={(event) => setRsvpSearchQuery(event.target.value)}
              placeholder="Search RSVP"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 sm:min-w-64"
            />
            <button
              type="button"
              onClick={openAddRsvpModal}
              className="rounded-2xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600"
            >
              Add RSVP
            </button>
            <Link
              href="/rsvp/table-assignment"
              className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300"
            >
              Assign to Table
            </Link>
          </div>
        </div>
      </section>

      <RSVPStatistics />

      <RSVPFilter filters={rsvpFilters} updateFilter={updateRsvpFilter} />

      <RSVPTable
        records={filteredRsvpRecords}
        selectedRsvpId={selectedRsvp?.id ?? ""}
        onSelectRsvp={setSelectedRsvpId}
        onViewRsvp={openViewRsvpModal}
        onEditRsvp={openEditRsvpModal}
        onDeleteRsvp={openDeleteRsvpDialog}
      />

      {isRsvpFormModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-0 sm:items-center sm:p-6"
          onClick={closeRsvpFormModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="rsvp-form-modal-title"
            className="relative h-screen w-full overflow-hidden bg-white shadow-xl sm:h-auto sm:max-h-[90vh] sm:w-[min(100%,72rem)] sm:rounded-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-8">
              <h2 id="rsvp-form-modal-title" className="text-xl font-semibold text-slate-900">
                {rsvpFormMode === "edit" ? "Edit RSVP" : "Add RSVP"}
              </h2>
              <button
                type="button"
                onClick={closeRsvpFormModal}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-300"
              >
                Close
              </button>
            </div>

            <div className="max-h-[calc(100vh-4.25rem)] overflow-y-auto px-5 pb-6 sm:max-h-[calc(90vh-4.25rem)] sm:px-8 sm:pb-8">
              <RSVPForm
                className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
                title={rsvpFormMode === "edit" ? "Edit RSVP" : "RSVP Details"}
                saveLabel={rsvpFormMode === "edit" ? "Save Changes" : "Save RSVP"}
                guestName={editingRsvp?.guestName}
                preferredName={editingRsvp?.preferredName}
                phoneNumber={editingRsvp?.phoneNumber}
                emailAddress={editingRsvp?.emailAddress}
                guestFrom={editingRsvp?.guestFrom}
                guestGroup={editingRsvp?.relatedGuestGroup}
                adults={editingRsvp?.adults}
                children={editingRsvp?.children}
                rsvpStatus={editingRsvp?.status}
                normalMeals={editingRsvp?.mealPreference === "Normal" ? editingRsvp.adults + editingRsvp.children : 0}
                vegetarianMeals={editingRsvp?.mealPreference === "Vegetarian" ? editingRsvp.adults + editingRsvp.children : 0}
                halalMeals={editingRsvp?.mealPreference === "Halal" ? editingRsvp.adults + editingRsvp.children : 0}
                specialRequests={editingRsvp?.specialRequests}
                notes={editingRsvp?.notes}
                onCancel={closeRsvpFormModal}
                onSave={closeRsvpFormModal}
              />
            </div>
          </div>
        </div>
      )}

      {isRsvpDetailModalOpen && viewedRsvp && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-0 sm:items-center sm:p-6"
          onClick={closeRsvpDetailModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="rsvp-detail-modal-title"
            className="relative h-screen w-full overflow-hidden bg-white shadow-xl sm:h-auto sm:max-h-[90vh] sm:w-[min(100%,72rem)] sm:rounded-3xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-8">
              <h2 id="rsvp-detail-modal-title" className="text-xl font-semibold text-slate-900">RSVP Profile</h2>
              <button
                type="button"
                onClick={closeRsvpDetailModal}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-300"
              >
                Close
              </button>
            </div>

            <div className="max-h-[calc(100vh-4.25rem)] overflow-y-auto px-5 pb-6 sm:max-h-[calc(90vh-4.25rem)] sm:px-8 sm:pb-8">
              <RSVPDetailCard
                className="mt-6 rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50/80 p-6 shadow-sm sm:p-8"
                guestName={viewedRsvp.guestName}
                preferredName={viewedRsvp.preferredName}
                phoneNumber={viewedRsvp.phoneNumber}
                emailAddress={viewedRsvp.emailAddress}
                guestFrom={viewedRsvp.guestFrom}
                guestGroup={viewedRsvp.relatedGuestGroup}
                adults={viewedRsvp.adults}
                children={viewedRsvp.children}
                rsvpStatus={viewedRsvp.status}
                invitationSent={viewedRsvp.invitationSent}
                responseDate={viewedRsvp.responseDate}
                normalMeals={viewedRsvp.mealPreference === "Normal" ? viewedRsvp.adults + viewedRsvp.children : 0}
                vegetarianMeals={viewedRsvp.mealPreference === "Vegetarian" ? viewedRsvp.adults + viewedRsvp.children : 0}
                halalMeals={viewedRsvp.mealPreference === "Halal" ? viewedRsvp.adults + viewedRsvp.children : 0}
                specialRequests={viewedRsvp.specialRequests}
                notes={viewedRsvp.notes}
                onEdit={() => openEditRsvpModal(viewedRsvp.id)}
              />
            </div>
          </div>
        </div>
      )}

      {isDeleteRsvpDialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4"
          onClick={closeDeleteRsvpDialog}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-rsvp-dialog-title"
            className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="delete-rsvp-dialog-title" className="text-lg font-semibold text-slate-900">Delete RSVP</h2>
            <p className="mt-2 text-sm text-slate-600">
              Are you sure you want to delete RSVP for "{pendingDeleteRsvp?.guestName ?? "this guest"}"?
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeDeleteRsvpDialog}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteRsvp}
                className="rounded-full bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function LiveRundownModuleView() {
  const [liveRundownSearchQuery, setLiveRundownSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Live Rundown</h1>
            <p className="mt-1 text-sm text-slate-500">Keep wedding-day operations aligned with a shared live event timeline.</p>
          </div>

          <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto md:items-center md:justify-end">
            <input
              type="search"
              value={liveRundownSearchQuery}
              onChange={(event) => setLiveRundownSearchQuery(event.target.value)}
              placeholder="Search live rundown"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-100 sm:min-w-64"
            />
            <button
              type="button"
              className="rounded-2xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600"
            >
              Add Event
            </button>
          </div>
        </div>
      </section>

      <LiveRundownBoard />
    </div>
  );
}
