import { AdminStatsSection } from "@/features/admin/components/admin-stats-section";
import { AuditLogSection } from "@/features/admin/components/audit-log-section";

export function AuditLogsPage() {
  return (
    <div className="space-y-6">
      <AdminStatsSection />

      <AuditLogSection />
    </div>
  );
}
