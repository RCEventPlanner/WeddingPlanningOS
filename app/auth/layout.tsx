import { AuthProvider } from "../../components/auth/AuthContext";
import { PublicRoute } from "../../components/auth/PublicRoute";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <PublicRoute>
        <div className="min-h-screen bg-slate-50">
          <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      </PublicRoute>
    </AuthProvider>
  );
}
