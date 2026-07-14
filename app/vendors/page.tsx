"use client";

import { useState } from "react";
import { VendorSummary } from "../../components/VendorSummary";
import { VendorFilter, type VendorFilters } from "../../components/VendorFilter";

export default function VendorsPage() {
  const [filters, setFilters] = useState<VendorFilters>({ category: "All", vendorName: "All" });

  return (
    <div className="p-8 sm:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Vendors</h1>
          <p className="mt-2 text-slate-600">
            Keep vendor contacts, quotes, and confirmations here.
          </p>
        </div>

        <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700">
          + Add Vendor
        </button>
      </div>

      <VendorSummary />
      <VendorFilter filters={filters} vendorOptions={[]} onChange={setFilters} />
    </div>
  );
}
