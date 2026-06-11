import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ErrorState } from "@/components/ui/error-state";
import { Input } from "@/components/ui/input";
import { TableSkeleton } from "@/components/ui/table-skeleton";

import { ScreeningHistoryTable } from "./screening-history-table";
import { useScreeningHistory } from "../hooks/use-screening-history";
import type { RiskCategory } from "../types/screening.type";

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
  const [risk, setRisk] = useState<RiskFilter>("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const {
    data: histories = [],
    isLoading,
    isError,
    refetch,
  } = useScreeningHistory({
    search,
    risk,
    startDate,
    endDate,
  });

  const handleResetFilter = () => {
    setSearch("");
    setRisk("all");
    setStartDate("");
    setEndDate("");
  };

  const handleExport = () => {
    const rows = histories.map((item) => ({
      patientName: item.patientName,
      nurseName: item.nurseName,
      screeningDate: item.screeningDate,
      riskScore: item.riskScore,
      riskCategory: item.riskCategory,
    }));

    console.table(rows);
    alert("Export dummy berhasil. Data tampil di console browser.");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <CardTitle>Screening History</CardTitle>
            <CardDescription>
              Riwayat skrining pasien berdasarkan filter pencarian, risiko, dan
              tanggal.
            </CardDescription>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={handleResetFilter}>
              Reset Filter
            </Button>

            <Button variant="outline" onClick={handleExport}>
              Export
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-4 grid gap-3 xl:grid-cols-[1.5fr_1fr_1fr]">
          <Input
            placeholder="Cari nama pasien atau perawat..."
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
            const isActive = risk === option.value;

            return (
              <Button
                key={option.value}
                type="button"
                size="sm"
                variant={isActive ? "primary" : "outline"}
                onClick={() => setRisk(option.value)}
              >
                {option.label}
              </Button>
            );
          })}
        </div>

        {isLoading ? (
          <TableSkeleton rows={5} columns={6} />
        ) : isError ? (
          <ErrorState
            title="Gagal memuat riwayat skrining"
            description="Terjadi kesalahan saat mengambil data riwayat skrining."
            action={
              <Button variant="outline" onClick={() => refetch()}>
                Coba Lagi
              </Button>
            }
          />
        ) : (
          <ScreeningHistoryTable histories={histories} />
        )}
      </CardContent>
    </Card>
  );
}
