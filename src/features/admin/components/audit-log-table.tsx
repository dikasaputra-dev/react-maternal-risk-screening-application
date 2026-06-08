import { EmptyState } from "@/components/ui/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AuditLogActionBadge } from "@/features/admin/components/audit-log-action-badge";
import type { AuditLog } from "@/features/admin/types/admin.type";

type AuditLogTableProps = {
  logs: AuditLog[];
};

export function AuditLogTable({ logs }: AuditLogTableProps) {
  if (logs.length === 0) {
    return (
      <EmptyState
        title="Audit log tidak ditemukan"
        description="Coba ubah kata kunci pencarian, action, model, atau rentang tanggal."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Model</TableHead>
          <TableHead>Object ID</TableHead>
          <TableHead>IP Address</TableHead>
          <TableHead>Tanggal</TableHead>
          <TableHead>Deskripsi</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {logs.map((log) => (
          <TableRow key={log.id}>
            <TableCell className="font-medium text-slate-900">
              {log.userName}
            </TableCell>

            <TableCell>
              <AuditLogActionBadge action={log.action} />
            </TableCell>

            <TableCell>{log.modelName}</TableCell>

            <TableCell>
              <span className="font-mono text-xs text-slate-500">
                {log.objectId ?? "-"}
              </span>
            </TableCell>

            <TableCell>
              <span className="font-mono text-xs text-slate-500">
                {log.ipAddress ?? "-"}
              </span>
            </TableCell>

            <TableCell>{log.createdAt}</TableCell>

            <TableCell className="max-w-xs text-slate-600">
              {log.description}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
