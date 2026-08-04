import { api } from "@/lib/api";

interface ReportButtonsProps {
  userId: string;
}

export function ReportButtons({ userId }: ReportButtonsProps) {
  return (
    <div className="rounded-2xl border border-hairline bg-surface p-4">
      <p className="mb-3 text-sm font-semibold text-foreground">Reportes mensuales</p>
      <div className="flex gap-2">
        <a
          href={api.reportUrl(userId, "pdf")}
          className="flex-1 rounded-xl border border-hairline px-3 py-2 text-center text-sm font-semibold text-foreground hover:border-brand hover:text-brand"
        >
          Exportar PDF
        </a>
        <a
          href={api.reportUrl(userId, "excel")}
          className="flex-1 rounded-xl border border-hairline px-3 py-2 text-center text-sm font-semibold text-foreground hover:border-brand hover:text-brand"
        >
          Exportar Excel
        </a>
      </div>
    </div>
  );
}
