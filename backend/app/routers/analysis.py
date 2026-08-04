from fastapi import APIRouter, HTTPException

from app.repositories.expense_repository import ExpenseRepository
from app.services.expense_analyzer import ExpenseAnalyzer
from app.strategies.category_breakdown_strategy import CategoryBreakdownStrategy
from app.strategies.monthly_average_strategy import MonthlyAverageStrategy
from app.strategies.prediction_strategy import PredictionStrategy

router = APIRouter(prefix="/analysis", tags=["analysis"])
repository = ExpenseRepository()

STRATEGIES = {
    "monthly-average": MonthlyAverageStrategy(),
    "category-breakdown": CategoryBreakdownStrategy(),
    "prediction": PredictionStrategy(),
}


@router.get("/{strategy_name}")
def analyze(strategy_name: str, user_id: str) -> dict:
    strategy = STRATEGIES.get(strategy_name)
    if strategy is None:
        raise HTTPException(status_code=404, detail=f"Unknown strategy: {strategy_name}")

    expenses = repository.list(user_id)
    analyzer = ExpenseAnalyzer(strategy)
    return analyzer.run(expenses)
