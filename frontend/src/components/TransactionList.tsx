import type { Expense, Income } from "@/lib/types";

type Transaction =
  | { kind: "expense"; item: Expense }
  | { kind: "income"; item: Income };

interface TransactionListProps {
  expenses: Expense[];
  incomes: Income[];
  onDeleteExpense: (id: string) => void;
  onDeleteIncome: (id: string) => void;
}

export function TransactionList({
  expenses,
  incomes,
  onDeleteExpense,
  onDeleteIncome,
}: TransactionListProps) {
  const transactions: Transaction[] = [
    ...expenses.map((item): Transaction => ({ kind: "expense", item })),
    ...incomes.map((item): Transaction => ({ kind: "income", item })),
  ].sort((a, b) => b.item.date.localeCompare(a.item.date));

  if (transactions.length === 0) {
    return (
      <p className="rounded-2xl border border-hairline bg-surface p-6 text-center text-sm text-muted">
        Todavía no tienes movimientos registrados.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-hairline rounded-2xl border border-hairline bg-surface">
      {transactions.map((t) => {
        const isExpense = t.kind === "expense";
        const label = isExpense ? t.item.category : t.item.source;
        const amountLabel = `${isExpense ? "-" : "+"}$${t.item.amount.toFixed(2)}`;

        return (
          <li key={`${t.kind}-${t.item.id}`} className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted">{t.item.date}</p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className="text-sm font-semibold"
                style={{ color: isExpense ? "var(--color-expense)" : "var(--color-income)" }}
              >
                {amountLabel}
              </span>
              <button
                onClick={() =>
                  isExpense ? onDeleteExpense(t.item.id) : onDeleteIncome(t.item.id)
                }
                aria-label="Eliminar"
                className="text-muted hover:text-expense"
              >
                ×
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
