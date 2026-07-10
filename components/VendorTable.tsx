export type VendorRow = {
  id: string;
  category: string;
  vendorName: string;
  vendorPicName: string;
  vendorPicContact: string;
  email: string;
};

type VendorTableProps = {
  rows: VendorRow[];
  selectedVendorId: string;
  onSelectVendor: (vendorId: string) => void;
  onViewVendor: (vendorId: string) => void;
  onEditVendor: (vendorId: string) => void;
  onDeleteVendor?: (vendorId: string) => void;
};

export function VendorTable({
  rows,
  selectedVendorId,
  onSelectVendor,
  onViewVendor,
  onEditVendor,
  onDeleteVendor,
}: VendorTableProps) {
  return (
    <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-4">Category</th>
              <th className="px-4 py-4">Vendor Name</th>
              <th className="px-4 py-4">Vendor PIC Name</th>
              <th className="px-4 py-4">Vendor PIC Contact</th>
              <th className="px-4 py-4">Email</th>
              <th className="px-4 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-500">
                  No vendors match the current search and filters.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className={`cursor-pointer transition hover:bg-slate-50 ${selectedVendorId === row.id ? "bg-rose-50/60" : ""}`}
                  onClick={() => onSelectVendor(row.id)}
                >
                  <td className="px-4 py-4 text-slate-700">{row.category}</td>
                  <td className="px-4 py-4 font-medium text-slate-900">{row.vendorName}</td>
                  <td className="px-4 py-4 text-slate-700">{row.vendorPicName}</td>
                  <td className="px-4 py-4 text-slate-700">{row.vendorPicContact}</td>
                  <td className="px-4 py-4 text-slate-700">{row.email}</td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onViewVendor(row.id);
                        }}
                        className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-200"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          onEditVendor(row.id);
                        }}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-slate-300"
                      >
                        Edit
                      </button>
                      {onDeleteVendor && (
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            onDeleteVendor(row.id);
                          }}
                          className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700 transition hover:bg-rose-100"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
