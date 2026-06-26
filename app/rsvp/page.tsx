import { RSVPFilter } from "../../components/RSVPFilter";
import { RSVPSearchBar } from "../../components/RSVPSearchBar";
import { RSVPTable } from "../../components/RSVPTable";

export default function RSVPPage() {
  return (
    <div className="p-8 sm:p-10">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">RSVP</h1>
          <p className="mt-2 text-slate-600">
            Track guest responses and wedding confirmations from one place.
          </p>
        </div>

        <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
          Add RSVP
        </button>
      </div>

      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full lg:max-w-md">
          <RSVPSearchBar />
        </div>
        <RSVPFilter />
      </div>

      <RSVPTable />
    </div>
  );
}
