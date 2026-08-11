from typing import List

from fastapi import APIRouter

from app.models.expense import Expense, ExpenseCreate
from app.repositories.expense_repository import ExpenseRepository
from app.strategies.classification_strategy import ClassificationStrategy
from app.strategies.keyword_classification_strategy import KeywordClassificationStrategy

router = APIRouter(prefix="/expenses", tags=["expenses"])
repository = ExpenseRepository()
classifier: ClassificationStrategy = KeywordClassificationStrategy()


@router.post("/", response_model=Expense)
def create_expense(payload: ExpenseCreate, user_id: str) -> Expense:
    category = payload.category or classifier.classify(payload.description)
    expense = Expense(id="", user_id=user_id, **{**payload.model_dump(), "category": category})
    return repository.add(expense)


@router.get("/", response_model=List[Expense])
def list_expenses(user_id: str) -> List[Expense]:
    return repository.list(user_id)


@router.delete("/{expense_id}")
def delete_expense(expense_id: str) -> dict:
    repository.delete(expense_id)
    return {"status": "deleted"}
