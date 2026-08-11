"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/lib/api";
import type {
  Budget,
  CategoryBreakdown,
  Expense,
  ExpenseInput,
  Income,
  IncomeInput,
  Notification,
  Prediction,
} from "@/lib/types";
import { Navbar } from "@/components/Navbar";
import { StatTile } from "@/components/StatTile";
import { ExpenseModal } from "@/components/ExpenseModal";
import { IncomeModal } from "@/components/IncomeModal";
import { TransactionList } from "@/components/TransactionList";
import { CategoryChart } from "@/components/CategoryChart";
import { BudgetsPanel } from "@/components/BudgetsPanel";
import { PredictionCard } from "@/components/PredictionCard";
import { ReportButtons } from "@/components/ReportButtons";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [breakdown, setBreakdown] = useState<CategoryBreakdown>({});
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showIncomeModal, setShowIncomeModal] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  const refresh = useCallback(async (userId: string) => {
    setDataLoading(true);
    setDataError(null);
    try {
      const [expensesData, incomesData, budgetsData, breakdownData, predictionData] =
        await Promise.all([
          api.listExpenses(userId),
          api.listIncomes(userId),
          api.listBudgets(userId),
          api.categoryBreakdown(userId),
          api.prediction(userId),
        ]);
      setExpenses(expensesData);
      setIncomes(incomesData);
      setBudgets(budgetsData);
      setBreakdown(breakdownData);
      setPrediction(predictionData);

      // Reconcile every budget against current spend — triggers the backend's
      // Observer, which persists an alert the first time a category goes over.
      await Promise.all(
        budgetsData.map((b) => api.checkBudget(userId, b.category).catch(() => null)),
      );
      setNotifications(await api.listNotifications(userId));
    } catch {
      setDataError(
        "No se pudo conectar con el backend. ¿Está corriendo en http://localhost:8000?",
      );
    } finally {
      setDataLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) refresh(user.uid);
  }, [user, refresh]);

  if (loading || !user) return null;

  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpense;

  async function handleAddExpense(data: ExpenseInput) {
    await api.createExpense(user!.uid, data);
    await refresh(user!.uid);
  }

  async function handleAddIncome(data: IncomeInput) {
    await api.createIncome(user!.uid, data);
    await refresh(user!.uid);
  }

  async function handleDeleteExpense(id: string) {
    await api.deleteExpense(id);
    await refresh(user!.uid);
  }

  async function handleDeleteIncome(id: string) {
    await api.deleteIncome(id);
    await refresh(user!.uid);
  }

  async function handleAddBudget(category: string, amount: number, month: string) {
    await api.createBudget(user!.uid, { category, amount, month });
    await refresh(user!.uid);
  }

  async function handleMarkNotificationRead(id: string) {
    await api.markNotificationRead(id);
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  return (
    <div className="flex flex-1 flex-col bg-background">
      <Navbar notifications={notifications} onMarkNotificationRead={handleMarkNotificationRead} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowIncomeModal(true)}
              className="rounded-xl bg-income px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              + Ingreso
            </button>
            <button
              onClick={() => setShowExpenseModal(true)}
              className="rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              + Gasto
            </button>
          </div>
        </div>

        {dataError && (
          <p className="mb-6 rounded-xl bg-expense/10 px-4 py-3 text-sm text-expense">
            {dataError}
          </p>
        )}

        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-3">
          <StatTile label="Ingresos" value={`$${totalIncome.toFixed(2)}`} accent="var(--color-income)" />
          <StatTile label="Gastos" value={`$${totalExpense.toFixed(2)}`} accent="var(--color-expense)" />
          <StatTile
            label="Balance"
            value={`$${balance.toFixed(2)}`}
            accent={balance >= 0 ? "var(--color-income)" : "var(--color-expense)"}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-span-2">
            <TransactionList
              expenses={expenses}
              incomes={incomes}
              onDeleteExpense={handleDeleteExpense}
              onDeleteIncome={handleDeleteIncome}
            />
          </div>

          <div className="flex flex-col gap-6">
            <CategoryChart breakdown={breakdown} />
            <PredictionCard prediction={prediction} />
            <BudgetsPanel budgets={budgets} spentByCategory={breakdown} onAddBudget={handleAddBudget} />
            <ReportButtons userId={user.uid} />
          </div>
        </div>

        {dataLoading && (
          <p className="mt-6 text-center text-sm text-muted">Cargando...</p>
        )}
      </main>

      {showExpenseModal && (
        <ExpenseModal onClose={() => setShowExpenseModal(false)} onSubmit={handleAddExpense} />
      )}
      {showIncomeModal && (
        <IncomeModal onClose={() => setShowIncomeModal(false)} onSubmit={handleAddIncome} />
      )}
    </div>
  );
}
