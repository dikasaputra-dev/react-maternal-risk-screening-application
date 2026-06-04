import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginService } from "@/features/auth/services/auth.service";
import type { LoginFormValues } from "@/features/auth/types/auth.type";
import { saveAuthSession } from "@/features/auth/utils/auth-storage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginFormValues>({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof LoginFormValues, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);

      const session = await loginService(form);

      saveAuthSession(session);

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Login gagal. Silakan coba lagi.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <Input
        id="email"
        label="Email"
        type="email"
        placeholder="contoh: nurse@mail.com"
        value={form.email}
        onChange={(event) => handleChange("email", event.target.value)}
      />

      <Input
        id="password"
        label="Password"
        type="password"
        placeholder="Masukkan password"
        value={form.password}
        onChange={(event) => handleChange("password", event.target.value)}
      />

      <Button type="submit" loading={loading} className="w-full">
        Login
      </Button>

      <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
        <p className="font-medium text-slate-800">Dummy account:</p>
        <p>Admin: admin@mail.com / bebas</p>
        <p>Nurse: nurse@mail.com / bebas</p>
      </div>
    </form>
  );
}
