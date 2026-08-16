"use client";

import { useTranslation } from "react-i18next";
import { formatCurrency } from "@/lib/currency";
import type { Prediction } from "@/lib/types";

interface PredictionCardProps {
  prediction: Prediction | null;
}

export function PredictionCard({ prediction }: PredictionCardProps) {
  const { t } = useTranslation();

  return (
    <div className="rounded-2xl border border-hairline bg-surface p-4">
      <p className="mb-1 text-sm font-semibold text-foreground">{t("prediction.title")}</p>
      {!prediction || prediction.based_on_months.length === 0 ? (
        <p className="text-sm text-muted">{t("prediction.empty")}</p>
      ) : (
        <>
          <p className="text-2xl font-bold text-brand">
            {formatCurrency(prediction.predicted_next_month)}
          </p>
          <p className="mt-1 text-xs text-muted">
            {t("prediction.basedOn", { months: prediction.based_on_months.join(", ") })}
          </p>
        </>
      )}
    </div>
  );
}
