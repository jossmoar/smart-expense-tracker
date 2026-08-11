from typing import List, Optional

from app.core.firebase import db
from app.models.notification import Notification
from app.repositories.base import BaseRepository


class NotificationRepository(BaseRepository[Notification]):
    collection_name = "notifications"

    def add(self, item: Notification) -> Notification:
        ref = db.collection(self.collection_name).document()
        ref.set(item.model_dump(exclude={"id"}, mode="json"))
        return item.model_copy(update={"id": ref.id})

    def get(self, item_id: str) -> Optional[Notification]:
        doc = db.collection(self.collection_name).document(item_id).get()
        return Notification(id=doc.id, **doc.to_dict()) if doc.exists else None

    def list(self, user_id: str) -> List[Notification]:
        docs = db.collection(self.collection_name).where("user_id", "==", user_id).stream()
        return [Notification(id=d.id, **d.to_dict()) for d in docs]

    def update(self, item_id: str, data: dict) -> None:
        db.collection(self.collection_name).document(item_id).update(data)

    def delete(self, item_id: str) -> None:
        db.collection(self.collection_name).document(item_id).delete()
