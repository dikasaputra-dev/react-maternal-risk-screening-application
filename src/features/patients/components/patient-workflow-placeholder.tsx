import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type PatientWorkflowPlaceholderProps = {
  title: string;
  description: string;
  canCreate: boolean;
  createLabel: string;
};

export function PatientWorkflowPlaceholder({
  title,
  description,
  canCreate,
  createLabel,
}: PatientWorkflowPlaceholderProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle>{title}</CardTitle>

            <CardDescription>{description}</CardDescription>
          </div>

          <Badge variant={canCreate ? "info" : "default"}>
            {canCreate ? "Dapat Menambahkan Data" : "Hanya Lihat"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <h3 className="font-semibold text-slate-900">
            Fondasi halaman telah tersedia
          </h3>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600">
            {canCreate
              ? `${createLabel} akan tersedia pada phase implementasi form berikutnya.`
              : "Anda dapat melihat data, tetapi tidak memiliki izin untuk menambahkan atau mengubah data."}
          </p>

          <p className="mx-auto mt-4 max-w-xl text-xs leading-5 text-slate-500">
            Data yang sudah tersimpan tidak dapat diedit atau dihapus oleh
            nurse. Perubahan data hanya dapat dilakukan oleh admin dan harus
            tercatat dalam audit log.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
