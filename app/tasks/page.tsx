"use client";

import { useState } from "react";
import { TaskSummary } from "../../components/TaskSummary";
import { TaskFilter, type TaskFilters } from "../../components/TaskFilter";

export default function TasksPage() {
  const [filters, setFilters] = useState<TaskFilters>({ priority: "All", status: "All" });

  return (
    <div className="p-8 sm:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Tasks</h1>
          <p className="mt-2 text-slate-600">
            Manage your wedding preparation tasks in one place.
          </p>
        </div>
      </div>

      <TaskSummary />
      <TaskFilter filters={filters} onChange={setFilters} />
    </div>
  );
}
