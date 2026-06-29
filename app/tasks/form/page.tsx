import { TaskForm } from "../../../components/TaskForm";

export default function TaskFormPage() {
  return (
    <div className="p-8 sm:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Task Form</h1>
          <p className="mt-2 text-slate-600">
            Create or edit wedding preparation tasks using a reusable form.
          </p>
        </div>
      </div>

      <TaskForm />
    </div>
  );
}
