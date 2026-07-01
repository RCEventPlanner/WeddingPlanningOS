import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <p className="text-sm font-medium text-slate-500">Recover access</p>
        <h1 className="text-2xl font-semibold text-slate-900">Forgot Password</h1>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-600">Email</label>
          <input
            type="email"
            placeholder="name@company.com"
            className="w-full rounded-2xl border border-slate-200 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-rose-300 focus:ring-2 focus:ring-rose-100"
          />
        </div>

        <button
          type="button"
          className="w-full rounded-2xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-600"
        >
          Reset Password
        </button>
      </div>

      <div className="mt-5 text-center text-sm text-slate-600">
        <Link href="/auth/login" className="font-semibold text-rose-500 hover:text-rose-600">
          Back to Login
        </Link>
      </div>
    </div>
  );
}
