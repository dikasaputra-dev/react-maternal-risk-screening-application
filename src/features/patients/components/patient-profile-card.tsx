import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RiskBadge } from "@/features/patients/components/risk-badge";
import type { Patient } from "@/features/patients/types/patient.type";

type PatientProfileCardProps = {
  patient: Patient;
};

export function PatientProfileCard({ patient }: PatientProfileCardProps) {
  const profileItems = [
    {
      label: "NIK",
      value: patient.nik,
    },
    {
      label: "Usia",
      value: `${patient.age} tahun`,
    },
    {
      label: "No. HP",
      value: patient.phone || "-",
    },
    {
      label: "Alamat",
      value: patient.address || "-",
    },
    {
      label: "Skrining Terakhir",
      value: patient.lastScreeningDate,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <CardTitle>{patient.fullName}</CardTitle>
            <CardDescription>
              Detail identitas pasien dan status risiko terakhir.
            </CardDescription>
          </div>

          <RiskBadge risk={patient.riskCategory} />
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {profileItems.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-1 font-medium text-slate-900">{item.value}</p>
            </div>
          ))}

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Status Data</p>

            <div className="mt-2">
              <Badge variant="success">Aktif</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
