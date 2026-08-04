from typing import List

from fastapi import APIRouter

from app.models.income import Income, IncomeCreate
from app.repositories.income_repository import IncomeRepository

router = APIRouter(prefix="/incomes", tags=["incomes"])
repository = IncomeRepository()


@router.post("/", response_model=Income)
def create_income(payload: IncomeCreate, user_id: str) -> Income:
    income = Income(id="", user_id=user_id, **payload.model_dump())
    return repository.add(income)


@router.get("/", response_model=List[Income])
def list_incomes(user_id: str) -> List[Income]:
    return repository.list(user_id)


@router.delete("/{income_id}")
def delete_income(income_id: str) -> dict:
    repository.delete(income_id)
    return {"status": "deleted"}
