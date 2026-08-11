from typing import List

from fastapi import APIRouter

from app.models.budget import Budget, BudgetCreate
from app.observers.base import BudgetSubject
from app.observers.firestore_alert_observer import FirestoreAlertObserver
from app.repositories.budget_repository import BudgetRepository
from app.repositories.expense_repository import ExpenseRepository
from app.repositories.notification_repository import NotificationRepository

router = APIRouter(prefix="/budgets", tags=["budgets"])
budget_repository = BudgetRepository()
expense_repository = ExpenseRepository()
notification_repository = NotificationRepository()


@router.post("/", response_model=Budget)
def create_budget(payload: BudgetCreate, user_id: str) -> Budget:
    budget = Budget(id="", user_id=user_id, **payload.model_dump())
    return budget_repository.add(budget)


@router.get("/", response_model=List[Budget])
def list_budgets(user_id: str) -> List[Budget]:
    return budget_repository.list(user_id)


@router.get("/{category}/check")
def check_budget(category: str, user_id: str) -> dict:
    budget = next(
        (b for b in budget_repository.list(user_id) if b.category == category),
        None,
    )
    if budget is None:
        return {"status": "no_budget_set"}

    spent = sum(
        e.amount for e in expense_repository.list(user_id) if e.category == category
    )
    exceeded = spent >= budget.amount

    already_alerted = any(
        n.category == category and not n.read
        for n in notification_repository.list(user_id)
    )
    if exceeded and not already_alerted:
        subject = BudgetSubject()
        subject.subscribe(FirestoreAlertObserver())
        subject.check_budget(user_id, category, spent, budget.amount)

    return {"spent": round(spent, 2), "limit": budget.amount, "exceeded": exceeded}
