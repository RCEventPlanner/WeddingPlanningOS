import { GuestFilter } from "../../components/GuestFilter";
import { GuestForm } from "../../components/GuestForm";
import { GuestSearchBar } from "../../components/GuestSearchBar";
import { GuestTable } from "../../components/GuestTable";

export default function GuestsPage() {
  return (
    <div className="p-8 sm:p-10">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Guests</h1>
          <p className="mt-2 text-slate-600">
            Track guest lists, seating ideas, and RSVP updates here.
          </p>
        </div>

        <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
          Add Guest
        </button>
      </div>

      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="w-full lg:max-w-md">
          <GuestSearchBar />
        </div>
        <GuestFilter />
      </div>

      <GuestTable />
      <GuestForm />
    </div>
  );
}
