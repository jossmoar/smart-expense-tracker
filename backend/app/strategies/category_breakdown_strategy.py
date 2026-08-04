from collections import defaultdict
from typing import List

from app.models.expense import Expense
from app.strategies.base_strategy import AnalysisStrategy


class CategoryBreakdownStrategy(AnalysisStrategy):
    """Total spent per category — feeds the dashboard's pie/bar chart."""

    def analyze(self, expenses: List[Expense]) -> dict:
        totals: dict[str, float] = defaultdict(float)
        for expense in expenses:
            totals[expense.category or "Otros"] += expense.amount

        return {category: round(total, 2) for category, total in totals.items()}
