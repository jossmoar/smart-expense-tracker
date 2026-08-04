from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.routers import analysis, budgets, expenses, incomes, reports

app = FastAPI(title="Smart Expense Tracker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(expenses.router)
app.include_router(incomes.router)
app.include_router(budgets.router)
app.include_router(analysis.router)
app.include_router(reports.router)


@app.get("/")
def health_check() -> dict:
    return {"status": "ok"}
