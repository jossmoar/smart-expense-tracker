import type { Prediction } from "@/lib/types";

interface PredictionCardProps {
  prediction: Prediction | null;
}

export function PredictionCard({ prediction }: PredictionCardProps) {
  return (
    <div className="rounded-2xl border border-hairline bg-surface p-4">
      <p className="mb-1 text-sm font-semibold text-foreground">Predicción del próximo mes</p>
      {!prediction || prediction.based_on_months.length === 0 ? (
        <p className="text-sm text-muted">Agrega gastos de al menos un mes para estimar.</p>
      ) : (
        <>
          <p className="text-2xl font-bold text-brand">
            ${prediction.predicted_next_month.toFixed(2)}
          </p>
          <p className="mt-1 text-xs text-muted">
            Basado en el promedio de {prediction.based_on_months.join(", ")}
          </p>
        </>
      )}
    </div>
  );
}
