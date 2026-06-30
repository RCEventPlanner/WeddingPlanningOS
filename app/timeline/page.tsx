import { LiveRundownBoard } from "../../components/LiveRundownBoard";

export default function TimelinePage() {
  return (
    <div className="p-8 sm:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Live Rundown</h1>
          <p className="mt-2 text-slate-600">
            Keep the wedding day operations aligned with a shared, live schedule.
          </p>
        </div>
      </div>

      <LiveRundownBoard />
    </div>
  );
}
