from typing import List, Optional

from app.core.firebase import db
from app.models.budget import Budget
from app.repositories.base import BaseRepository


class BudgetRepository(BaseRepository[Budget]):
    collection_name = "budgets"

    def add(self, item: Budget) -> Budget:
        ref = db.collection(self.collection_name).document()
        ref.set(item.model_dump(exclude={"id"}, mode="json"))
        return item.model_copy(update={"id": ref.id})

    def get(self, item_id: str) -> Optional[Budget]:
        doc = db.collection(self.collection_name).document(item_id).get()
        return Budget(id=doc.id, **doc.to_dict()) if doc.exists else None

    def list(self, user_id: str) -> List[Budget]:
        docs = db.collection(self.collection_name).where("user_id", "==", user_id).stream()
        return [Budget(id=d.id, **d.to_dict()) for d in docs]

    def update(self, item_id: str, data: dict) -> None:
        db.collection(self.collection_name).document(item_id).update(data)

    def delete(self, item_id: str) -> None:
        db.collection(self.collection_name).document(item_id).delete()
