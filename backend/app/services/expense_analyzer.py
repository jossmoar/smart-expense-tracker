from typing import List

from app.models.expense import Expense
from app.strategies.base_strategy import AnalysisStrategy


class ExpenseAnalyzer:
    """Strategy context: holds whichever analysis algorithm the caller picked
    and runs it, without knowing (or caring) how that algorithm works."""

    def __init__(self, strategy: AnalysisStrategy) -> None:
        self._strategy = strategy

    def set_strategy(self, strategy: AnalysisStrategy) -> None:
        self._strategy = strategy

    def run(self, expenses: List[Expense]) -> dict:
        return self._strategy.analyze(expenses)
