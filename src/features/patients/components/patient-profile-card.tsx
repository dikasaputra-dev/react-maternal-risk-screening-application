import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  calculateAgeFromDateOfBirth,
  formatDate,
  formatDateTime,
} from "@/lib/date";

import {
  educationLabelMap,
  religionLabelMap,
} from "../constants/patient-options";
import type { Patient } from "../types/patient.type";

type PatientProfileCardProps = {
  patient: Patient;
};

export function PatientProfileCard({ patient }: PatientProfileCardProps) {
  const profileItems = [
    {
      label: "Tanggal Lahir",
      value: formatDate(patient.dateOfBirth),
    },
    {
      label: "Usia",
      value: `${calculateAgeFromDateOfBirth(patient.dateOfBirth)} tahun`,
    },
    {
      label: "Agama",
      value: religionLabelMap[patient.religion],
    },
    {
      label: "Pendidikan",
      value: educationLabelMap[patient.education],
    },
    {
      label: "Pekerjaan",
      value: patient.occupation,
    },
    {
      label: "Ras",
      value: patient.race,
    },
    {
      label: "Terdaftar",
      value: formatDateTime(patient.createdAt),
    },
    {
      label: "Terakhir Diperbarui",
      value: formatDateTime(patient.updatedAt),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{patient.fullName}</CardTitle>

        <CardDescription>
          Data demografi dan identitas pasien bersalin.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <dl className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {profileItems.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <dt className="text-sm text-slate-500">{item.label}</dt>

              <dd className="mt-1 font-medium text-slate-900">{item.value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
