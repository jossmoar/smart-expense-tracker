"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import type { CategoryBreakdown } from "@/lib/types";

ChartJS.register(ArcElement, Tooltip, Legend);

const PALETTE = ["#4f46e5", "#0ca30c", "#fab219", "#d03b3b", "#4cc9f0", "#7209b7"];

interface CategoryChartProps {
  breakdown: CategoryBreakdown;
}

export function CategoryChart({ breakdown }: CategoryChartProps) {
  const categories = Object.keys(breakdown);

  if (categories.length === 0) {
    return (
      <p className="rounded-2xl border border-hairline bg-surface p-6 text-center text-sm text-muted">
        Agrega gastos para ver el desglose por categoría.
      </p>
    );
  }

  const data = {
    labels: categories,
    datasets: [
      {
        data: categories.map((c) => breakdown[c]),
        backgroundColor: categories.map((_, i) => PALETTE[i % PALETTE.length]),
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="rounded-2xl border border-hairline bg-surface p-4">
      <p className="mb-3 text-sm font-semibold text-foreground">Gasto por categoría</p>
      <div className="mx-auto max-w-[260px]">
        <Doughnut
          data={data}
          options={{ plugins: { legend: { position: "bottom", labels: { boxWidth: 10, font: { size: 11 } } } } }}
        />
      </div>
    </div>
  );
}
