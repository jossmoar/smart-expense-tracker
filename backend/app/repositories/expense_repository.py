from typing import List, Optional

from app.core.firebase import db
from app.models.expense import Expense
from app.repositories.base import BaseRepository


class ExpenseRepository(BaseRepository[Expense]):
    collection_name = "expenses"

    def add(self, item: Expense) -> Expense:
        ref = db.collection(self.collection_name).document()
        ref.set(item.model_dump(exclude={"id"}, mode="json"))
        return item.model_copy(update={"id": ref.id})

    def get(self, item_id: str) -> Optional[Expense]:
        doc = db.collection(self.collection_name).document(item_id).get()
        return Expense(id=doc.id, **doc.to_dict()) if doc.exists else None

    def list(self, user_id: str) -> List[Expense]:
        docs = db.collection(self.collection_name).where("user_id", "==", user_id).stream()
        return [Expense(id=d.id, **d.to_dict()) for d in docs]

    def update(self, item_id: str, data: dict) -> None:
        db.collection(self.collection_name).document(item_id).update(data)

    def delete(self, item_id: str) -> None:
        db.collection(self.collection_name).document(item_id).delete()
