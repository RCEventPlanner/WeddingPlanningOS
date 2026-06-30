import { TaskSummary } from "../../components/TaskSummary";
import { TaskFilter } from "../../components/TaskFilter";
import { TaskTable } from "../../components/TaskTable";
import { TaskDetailCard } from "../../components/TaskDetailCard";

export default function TasksPage() {
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
      <TaskFilter />
      <TaskTable />
      <TaskDetailCard />
    </div>
  );
}
