import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <p className="text-sm font-medium text-slate-500">Create account</p>
        <h1 className="text-2xl font-semibold text-slate-900">Register</h1>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Company Name</label>
          <input
            type="text"
            placeholder="RC Event Planner"
            className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Full Name</label>
          <input
            type="text"
            placeholder="Ava Thompson"
            className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Email</label>
          <input
            type="email"
            placeholder="name@company.com"
            className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">Password</label>
            <input
              type="password"
              placeholder="Create password"
              className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-600">Confirm Password</label>
            <input
              type="password"
              placeholder="Repeat password"
              className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
            />
          </div>
        </div>

        <button
          type="button"
          className="w-full rounded-2xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600"
        >
          Create Account
        </button>
      </div>

      <div className="mt-5 text-center text-sm text-slate-600">
        Already have an account? {" "}
        <Link href="/auth/login" className="font-semibold text-rose-500 hover:text-rose-600">
          Login
        </Link>
      </div>
    </div>
  );
}
