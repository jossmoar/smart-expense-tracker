from app.core.firebase import db
from app.observers.base import BudgetObserver


class FirestoreAlertObserver(BudgetObserver):
    """Persists a budget-exceeded alert so the frontend can show it as a
    notification, instead of the API silently allowing overspend."""

    def notify(self, user_id: str, category: str, spent: float, limit: float) -> None:
        db.collection("notifications").add(
            {
                "user_id": user_id,
                "category": category,
                "spent": spent,
                "limit": limit,
                "message": f"Superaste el presupuesto de {category}: ${spent:.2f} de ${limit:.2f}",
                "read": False,
            }
        )
