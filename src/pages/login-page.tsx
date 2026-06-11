import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/features/auth/components/login-form";
import { useEffect } from "react";

export function LoginPage() {
  useEffect(() => {
    document.title = "Login | MaternityCare";
  }, []);

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="grid min-h-screen bg-slate-100 lg:grid-cols-2">
        <section className="hidden bg-blue-600 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold">MaternityCare</h1>
            <p className="mt-2 text-blue-100">
              Clinical screening system for maternal risk monitoring.
            </p>
          </div>

          <div>
            <h2 className="text-4xl font-bold leading-tight">
              Monitor risiko persalinan dengan sistem yang rapi dan terukur.
            </h2>
            <p className="mt-4 max-w-lg text-blue-100">
              Dashboard untuk perawat dan admin dalam mengelola data pasien,
              skrining, audit log, dan statistik risiko.
            </p>
          </div>

          <p className="text-sm text-blue-100">
            Frontend dummy mode — belum terhubung API.
          </p>
        </section>

        <section className="flex items-center justify-center p-6">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Masuk untuk mengakses dashboard skrining.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
