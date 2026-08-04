from datetime import date

from pydantic import BaseModel


class ExpenseCreate(BaseModel):
    amount: float
    category: str = ""
    description: str = ""
    date: date


class Expense(ExpenseCreate):
    id: str
    user_id: str
