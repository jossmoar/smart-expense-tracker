from collections import defaultdict
from typing import List

from app.models.expense import Expense
from app.strategies.base_strategy import AnalysisStrategy


class MonthlyAverageStrategy(AnalysisStrategy):
    """Average daily spend per month — flags months with unusually high burn rate."""

    def analyze(self, expenses: List[Expense]) -> dict:
        by_month: dict[str, list[float]] = defaultdict(list)
        for expense in expenses:
            key = expense.date.strftime("%Y-%m")
            by_month[key].append(expense.amount)

        return {
            month: round(sum(amounts) / len(amounts), 2)
            for month, amounts in by_month.items()
        }
