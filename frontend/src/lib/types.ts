export interface Expense {
  id: string;
  user_id: string;
  amount: number;
  category: string;
  description: string;
  date: string; // ISO yyyy-mm-dd
}

export interface ExpenseInput {
  amount: number;
  category?: string;
  description: string;
  date: string;
}

export interface Income {
  id: string;
  user_id: string;
  amount: number;
  source: string;
  date: string;
}

export interface IncomeInput {
  amount: number;
  source: string;
  date: string;
}

export interface Budget {
  id: string;
  user_id: string;
  category: string;
  amount: number;
  month: string; // YYYY-MM
}

export interface BudgetInput {
  category: string;
  amount: number;
  month: string;
}

export interface BudgetCheck {
  status?: "no_budget_set";
  spent?: number;
  limit?: number;
  exceeded?: boolean;
}

export interface CategoryBreakdown {
  [category: string]: number;
}

export interface MonthlyAverage {
  [month: string]: number;
}

export interface Prediction {
  predicted_next_month: number;
  based_on_months: string[];
}

export interface Notification {
  id: string;
  user_id: string;
  category: string;
  spent: number;
  limit: number;
  message: string;
  read: boolean;
}
