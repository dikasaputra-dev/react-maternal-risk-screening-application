import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { RiskCategory } from "@/features/screenings/types/screening.type";
import { screeningHistoryMock } from "@/features/screenings/data/screening-history.mock";
import { ScreeningHistoryTable } from "@/features/screenings/components/screening-history-table";

type RiskFilter = "all" | RiskCategory;

const riskOptions: {
  label: string;
  value: RiskFilter;
}[] = [
  { label: "Semua", value: "all" },
  { label: "Tidak Berisiko", value: "no_risk" },
  { label: "Risiko Rendah", value: "low_risk" },
  { label: "Risiko Tinggi", value: "high_risk" },
];

export function ScreeningHistorySection() {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState<RiskFilter>("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredHistories = useMemo(() => {
    return screeningHistoryMock.filter((item) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        item.patientName.toLowerCase().includes(keyword) ||
        item.nurseName.toLowerCase().includes(keyword);

      const matchRisk =
        riskFilter === "all" || item.riskCategory === riskFilter;

      const matchStartDate = !startDate || item.screeningDate >= startDate;

      const matchEndDate = !endDate || item.screeningDate <= endDate;

      return matchSearch && matchRisk && matchStartDate && matchEndDate;
    });
  }, [search, riskFilter, startDate, endDate]);

  const handleExport = () => {
    console.log("Export dummy:", filteredHistories);
    alert("Export dummy berhasil. Data bisa dilihat di console browser.");
  };

  const handleResetFilter = () => {
    setSearch("");
    setRiskFilter("all");
    setStartDate("");
    setEndDate("");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <CardTitle>Riwayat Skrining</CardTitle>
            <CardDescription>
              Pantau hasil skrining pasien berdasarkan tanggal dan kategori
              risiko.
            </CardDescription>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleResetFilter}>
              Reset Filter
            </Button>

            <Button onClick={handleExport}>Export</Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-4 grid gap-3 xl:grid-cols-[1.5fr_1fr_1fr]">
          <Input
            placeholder="Cari pasien atau perawat..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <Input
            type="date"
            label="Dari tanggal"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
          />

          <Input
            type="date"
            label="Sampai tanggal"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
          />
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
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

        <ScreeningHistoryTable histories={filteredHistories} />
      </CardContent>
    </Card>
  );
}
