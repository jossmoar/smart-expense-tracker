from collections import defaultdict
from statistics import mean
from typing import List

from app.models.expense import Expense
from app.strategies.base_strategy import AnalysisStrategy


class PredictionStrategy(AnalysisStrategy):
    """Predicts next month's spend as a simple moving average of the last 3 months.

    Deliberately simple (no external ML deps) so it's cheap to run on every
    request — swapping in a heavier model later only means adding another
    strategy class, no changes to the callers.
    """

    WINDOW = 3

    def analyze(self, expenses: List[Expense]) -> dict:
        by_month: dict[str, float] = defaultdict(float)
        for expense in expenses:
            key = expense.date.strftime("%Y-%m")
            by_month[key] += expense.amount

        months_sorted = sorted(by_month.keys())
        window = months_sorted[-self.WINDOW :]

        if not window:
            return {"predicted_next_month": 0.0, "based_on_months": []}

        predicted = mean(by_month[month] for month in window)
        return {
            "predicted_next_month": round(predicted, 2),
            "based_on_months": window,
        }
