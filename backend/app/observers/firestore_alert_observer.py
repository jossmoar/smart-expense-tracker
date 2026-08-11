from app.models.notification import Notification
from app.observers.base import BudgetObserver
from app.repositories.notification_repository import NotificationRepository


class FirestoreAlertObserver(BudgetObserver):
    """Persists a budget-exceeded alert so the frontend can show it as a
    notification, instead of the API silently allowing overspend."""

    def __init__(self) -> None:
        self._repository = NotificationRepository()

    def notify(self, user_id: str, category: str, spent: float, limit: float) -> None:
        self._repository.add(
            Notification(
                id="",
                user_id=user_id,
                category=category,
                spent=spent,
                limit=limit,
                message=f"Superaste el presupuesto de {category}: ${spent:.2f} de ${limit:.2f}",
                read=False,
            )
        )
