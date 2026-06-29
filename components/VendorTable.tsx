type VendorRow = {
  category: string;
  vendorName: string;
  vendorPicName: string;
  vendorPicContact: string;
};

const vendorRows: VendorRow[] = [
  {
    category: "Venue",
    vendorName: "The Garden Hall",
    vendorPicName: "Alicia Tan",
    vendorPicContact: "012-3456789",
  },
  {
    category: "Photography",
    vendorName: "ABC Photography",
    vendorPicName: "Evan Lim",
    vendorPicContact: "019-1234567",
  },
  {
    category: "Decoration",
    vendorName: "Dream Decoration",
    vendorPicName: "Siti Rahman",
    vendorPicContact: "011-9876543",
  },
];

export function VendorTable() {
  return (
    <section className="mt-6 overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-4">Category</th>
            <th className="px-4 py-4">Vendor Name</th>
            <th className="px-4 py-4">Vendor PIC Name</th>
            <th className="px-4 py-4">Vendor PIC Contact</th>
            <th className="px-4 py-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {vendorRows.map((row) => (
            <tr key={row.vendorName} className="hover:bg-slate-50">
              <td className="px-4 py-4 text-slate-700">{row.category}</td>
              <td className="px-4 py-4 font-medium text-slate-900">{row.vendorName}</td>
              <td className="px-4 py-4 text-slate-700">{row.vendorPicName}</td>
              <td className="px-4 py-4 text-slate-700">{row.vendorPicContact}</td>
              <td className="px-4 py-4">
                <button className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-200">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
