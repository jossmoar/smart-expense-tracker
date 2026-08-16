"use client";

import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { formatCurrency } from "@/lib/currency";
import type { Budget, CategoryBreakdown } from "@/lib/types";

interface BudgetsPanelProps {
  budgets: Budget[];
  spentByCategory: CategoryBreakdown;
  onAddBudget: (category: string, amount: number, month: string) => Promise<void>;
}

const currentMonth = () => new Date().toISOString().slice(0, 7);

export function BudgetsPanel({ budgets, spentByCategory, onAddBudget }: BudgetsPanelProps) {
  const { t } = useTranslation();
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    try {
      await onAddBudget(category, parseFloat(amount), currentMonth());
      setCategory("");
      setAmount("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-2xl border border-hairline bg-surface p-4">
      <p className="text-sm font-semibold text-foreground">{t("budgets.title")}</p>
      <p className="mb-3 text-xs text-muted">{t("budgets.hint")}</p>

      {budgets.length === 0 ? (
        <p className="text-sm text-muted">{t("budgets.empty")}</p>
      ) : (
        <ul className="mb-4 flex flex-col gap-3">
          {budgets.map((budget) => {
            const spent = spentByCategory[budget.category] ?? 0;
            const ratio = Math.min(spent / budget.amount, 1);
            const exceeded = spent >= budget.amount;

            return (
              <li key={budget.id}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">{budget.category}</span>
                  <span className={exceeded ? "text-expense" : "text-muted"}>
                    {t("budgets.spentOfLimit", {
                      spent: formatCurrency(spent),
                      limit: formatCurrency(budget.amount),
                    })}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-black/5">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${ratio * 100}%`,
                      backgroundColor: exceeded ? "var(--color-expense)" : "var(--color-brand)",
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 border-t border-hairline pt-4">
        <input
          type="text"
          required
          placeholder={t("budgets.categoryPlaceholder")}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-hairline bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
        />
        <input
          type="number"
          step="1"
          min="0"
          required
          placeholder={t("budgets.amountPlaceholder")}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="rounded-xl border border-hairline bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-brand px-3 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
        >
          {submitting ? t("common.saving") : t("budgets.submit")}
        </button>
      </form>
    </div>
  );
}
