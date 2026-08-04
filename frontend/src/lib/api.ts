import type {
  Budget,
  BudgetCheck,
  BudgetInput,
  CategoryBreakdown,
  Expense,
  ExpenseInput,
  Income,
  IncomeInput,
  MonthlyAverage,
  Prediction,
} from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${await res.text()}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  listExpenses: (userId: string) =>
    request<Expense[]>(`/expenses/?user_id=${userId}`),
  createExpense: (userId: string, data: ExpenseInput) =>
    request<Expense>(`/expenses/?user_id=${userId}`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  deleteExpense: (id: string) =>
    request<{ status: string }>(`/expenses/${id}`, { method: "DELETE" }),

  listIncomes: (userId: string) =>
    request<Income[]>(`/incomes/?user_id=${userId}`),
  createIncome: (userId: string, data: IncomeInput) =>
    request<Income>(`/incomes/?user_id=${userId}`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  deleteIncome: (id: string) =>
    request<{ status: string }>(`/incomes/${id}`, { method: "DELETE" }),

  listBudgets: (userId: string) =>
    request<Budget[]>(`/budgets/?user_id=${userId}`),
  createBudget: (userId: string, data: BudgetInput) =>
    request<Budget>(`/budgets/?user_id=${userId}`, {
      method: "POST",
      body: JSON.stringify(data),
    }),
  checkBudget: (userId: string, category: string) =>
    request<BudgetCheck>(
      `/budgets/${encodeURIComponent(category)}/check?user_id=${userId}`,
    ),

  categoryBreakdown: (userId: string) =>
    request<CategoryBreakdown>(`/analysis/category-breakdown?user_id=${userId}`),
  monthlyAverage: (userId: string) =>
    request<MonthlyAverage>(`/analysis/monthly-average?user_id=${userId}`),
  prediction: (userId: string) =>
    request<Prediction>(`/analysis/prediction?user_id=${userId}`),

  reportUrl: (userId: string, format: "pdf" | "excel") =>
    `${API_URL}/reports/${format}?user_id=${userId}`,
};
