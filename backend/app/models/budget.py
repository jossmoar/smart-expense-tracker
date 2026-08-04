from pydantic import BaseModel


class BudgetCreate(BaseModel):
    category: str
    amount: float
    month: str  # "YYYY-MM"


class Budget(BudgetCreate):
    id: str
    user_id: str
