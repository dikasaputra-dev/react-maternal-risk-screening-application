import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PatientTableSection } from "@/features/patients/components/patient-table-section";

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Pasien</CardTitle>
            <CardDescription>Pasien terdaftar</CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-slate-900">128</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skrining Hari Ini</CardTitle>
            <CardDescription>Total pemeriksaan</CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-slate-900">24</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risiko Tinggi</CardTitle>
            <CardDescription>Butuh perhatian lanjutan</CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-bold text-red-600">7</p>
          </CardContent>
        </Card>
      </div>

      <PatientTableSection />
    </div>
  );
}
