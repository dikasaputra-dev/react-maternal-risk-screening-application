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

import type {
  AuditAction,
  AuditModelName,
} from "@/features/admin/types/admin.type";
import { auditLogsMock } from "@/features/admin/data/admin.mock";
import { AuditLogTable } from "@/features/admin/components/audit-log-table";

type ActionFilter = "all" | AuditAction;
type ModelFilter = "all" | AuditModelName;

const actionOptions: {
  label: string;
  value: ActionFilter;
}[] = [
  { label: "Semua", value: "all" },
  { label: "Create", value: "CREATE" },
  { label: "Update", value: "UPDATE" },
  { label: "Delete", value: "DELETE" },
  { label: "Login", value: "LOGIN" },
  { label: "Logout", value: "LOGOUT" },
  { label: "Login Failed", value: "LOGIN_FAILED" },
];

const modelOptions: {
  label: string;
  value: ModelFilter;
}[] = [
  { label: "Semua Model", value: "all" },
  { label: "Patient", value: "Patient" },
  { label: "Screening", value: "Screening" },
  { label: "User", value: "User" },
  { label: "Auth", value: "Auth" },
];

export function AuditLogSection() {
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState<ActionFilter>("all");
  const [modelFilter, setModelFilter] = useState<ModelFilter>("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredLogs = useMemo(() => {
    return auditLogsMock.filter((log) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        !keyword ||
        log.userName.toLowerCase().includes(keyword) ||
        log.description.toLowerCase().includes(keyword) ||
        log.ipAddress?.toLowerCase().includes(keyword) ||
        log.objectId?.toLowerCase().includes(keyword);

      const matchAction = actionFilter === "all" || log.action === actionFilter;

      const matchModel = modelFilter === "all" || log.modelName === modelFilter;

      const matchStartDate = !startDate || log.createdAt >= startDate;
      const matchEndDate = !endDate || log.createdAt <= endDate;

      return (
        matchSearch &&
        matchAction &&
        matchModel &&
        matchStartDate &&
        matchEndDate
      );
    });
  }, [search, actionFilter, modelFilter, startDate, endDate]);

  const handleResetFilter = () => {
    setSearch("");
    setActionFilter("all");
    setModelFilter("all");
    setStartDate("");
    setEndDate("");
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <CardTitle>Audit Logs</CardTitle>
            <CardDescription>
              Pantau jejak aktivitas user dan perubahan data penting di sistem.
            </CardDescription>
          </div>

          <Button variant="outline" onClick={handleResetFilter}>
            Reset Filter
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-4 grid gap-3 xl:grid-cols-[1.5fr_1fr_1fr]">
          <Input
            placeholder="Cari user, IP, object ID, atau deskripsi..."
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

        <div className="mb-4 space-y-3">
          <div>
            <p className="mb-2 text-sm font-medium text-slate-700">
              Filter Action
            </p>

            <div className="flex flex-wrap gap-2">
              {actionOptions.map((option) => {
                const isActive = actionFilter === option.value;

                return (
                  <Button
                    key={option.value}
                    type="button"
                    size="sm"
                    variant={isActive ? "primary" : "outline"}
                    onClick={() => setActionFilter(option.value)}
                  >
                    {option.label}
                  </Button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-slate-700">
              Filter Model
            </p>

            <div className="flex flex-wrap gap-2">
              {modelOptions.map((option) => {
                const isActive = modelFilter === option.value;

                return (
                  <Button
                    key={option.value}
                    type="button"
                    size="sm"
                    variant={isActive ? "primary" : "outline"}
                    onClick={() => setModelFilter(option.value)}
                  >
                    {option.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        <AuditLogTable logs={filteredLogs} />
      </CardContent>
    </Card>
  );
}
