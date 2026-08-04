from typing import List, Optional

from app.core.firebase import db
from app.models.income import Income
from app.repositories.base import BaseRepository


class IncomeRepository(BaseRepository[Income]):
    collection_name = "incomes"

    def add(self, item: Income) -> Income:
        ref = db.collection(self.collection_name).document()
        ref.set(item.model_dump(exclude={"id"}, mode="json"))
        return item.model_copy(update={"id": ref.id})

    def get(self, item_id: str) -> Optional[Income]:
        doc = db.collection(self.collection_name).document(item_id).get()
        return Income(id=doc.id, **doc.to_dict()) if doc.exists else None

    def list(self, user_id: str) -> List[Income]:
        docs = db.collection(self.collection_name).where("user_id", "==", user_id).stream()
        return [Income(id=d.id, **d.to_dict()) for d in docs]

    def update(self, item_id: str, data: dict) -> None:
        db.collection(self.collection_name).document(item_id).update(data)

    def delete(self, item_id: str) -> None:
        db.collection(self.collection_name).document(item_id).delete()
