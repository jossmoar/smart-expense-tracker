from abc import ABC, abstractmethod
from typing import List

from app.models.expense import Expense


class AnalysisStrategy(ABC):
    @abstractmethod
    def analyze(self, expenses: List[Expense]) -> dict: ...
