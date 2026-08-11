from typing import List

from fastapi import APIRouter

from app.models.notification import Notification
from app.repositories.notification_repository import NotificationRepository

router = APIRouter(prefix="/notifications", tags=["notifications"])
repository = NotificationRepository()


@router.get("/", response_model=List[Notification])
def list_notifications(user_id: str) -> List[Notification]:
    return repository.list(user_id)


@router.patch("/{notification_id}/read")
def mark_as_read(notification_id: str) -> dict:
    repository.update(notification_id, {"read": True})
    return {"status": "ok"}
