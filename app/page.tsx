import { Sidebar } from "../components/Sidebar";
import { TopNav } from "../components/TopNav";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 lg:flex">
      <Sidebar />

      <main className="flex-1 p-6 sm:p-8 lg:ml-72 lg:p-10">
        <TopNav title="Dashboard" />

        <h1 className="text-4xl font-bold text-slate-900">
          Wedding Planning OS
        </h1>

        <p className="mt-3 text-gray-600">
          Your All-in-One Wedding Planning Platform
        </p>
      </main>
    </div>
  );
}