import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PatientTable } from "@/features/patients/components/patient-table";
import { patientsMock } from "@/features/patients/data/patients.mock";
import type { RiskCategory } from "@/features/patients/types/patient.type";
import { useMemo, useState } from "react";

type RiskFilter = "all" | RiskCategory;

const riskOptions: {
  label: string;
  value: RiskFilter;
}[] = [
  {
    label: "Semua",
    value: "all",
  },
  {
    label: "Tidak Berisiko",
    value: "no_risk",
  },
  {
    label: "Risiko Rendah",
    value: "low_risk",
  },
  {
    label: "Risiko Tinggi",
    value: "high_risk",
  },
]

export function PatientTableSection() {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState<RiskFilter>("all");

  const filteredPatients = useMemo(() => {
    return patientsMock.filter((patient) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        patient.fullName.toLowerCase().includes(keyword) ||
        patient.nik.toLowerCase().includes(keyword);

      const matchRisk =
        riskFilter === "all" || patient.riskCategory === riskFilter;

      return matchSearch && matchRisk;
    });
  }, [search, riskFilter]);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <CardTitle>Data Pasien</CardTitle>
            <CardDescription>
              Cari pasien berdasarkan nama, NIK, dan status risiko.
            </CardDescription>
          </div>

          <Button>Tambah Pasien</Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <Input
            placeholder="Cari nama atau NIK..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="lg:max-w-sm"
          />

          <div className="flex flex-wrap gap-2">
            {riskOptions.map((option) => {
              const isActive = riskFilter === option.value;

              return (
                <Button
                  key={option.value}
                  type="button"
                  size="sm"
                  variant={isActive ? "primary" : "outline"}
                  onClick={() => setRiskFilter(option.value)}
                >
                  {option.label}
                </Button>
              );
            })}
          </div>
        </div>

        <PatientTable patients={filteredPatients} />
      </CardContent>
    </Card>
  );
}