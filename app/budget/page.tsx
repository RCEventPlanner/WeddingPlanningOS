import { BudgetDetailCard } from "../../components/BudgetDetailCard";
import { BudgetFilter } from "../../components/BudgetFilter";
import { BudgetForm } from "../../components/BudgetForm";
import { BudgetOverview } from "../../components/BudgetOverview";
import { BudgetSearchBar } from "../../components/BudgetSearchBar";
import { BudgetStatistics } from "../../components/BudgetStatistics";
import { BudgetTable } from "../../components/BudgetTable";

export default function BudgetPage() {
  return (
    <div className="p-8 sm:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Budget</h1>
          <p className="mt-2 text-slate-600">
            Monitor spending, savings, and payments in this section.
          </p>
        </div>

        <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
          Add Expense
        </button>
      </div>

      <BudgetOverview />

      <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full lg:max-w-md">
          <BudgetSearchBar />
        </div>
        <BudgetFilter />
      </div>

      <BudgetTable />

      <BudgetForm />
      <BudgetDetailCard />
      <BudgetStatistics />
    </div>
  );
}
