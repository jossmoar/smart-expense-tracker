from datetime import date

from pydantic import BaseModel


class IncomeCreate(BaseModel):
    amount: float
    source: str = ""
    date: date


class Income(IncomeCreate):
    id: str
    user_id: str
