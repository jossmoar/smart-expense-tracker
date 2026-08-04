from abc import ABC, abstractmethod
from typing import Generic, List, Optional, TypeVar

T = TypeVar("T")


class BaseRepository(ABC, Generic[T]):
    """Abstracts the data source (Firestore today, anything else tomorrow)
    away from the routers/services that consume it."""

    @abstractmethod
    def add(self, item: T) -> T: ...

    @abstractmethod
    def get(self, item_id: str) -> Optional[T]: ...

    @abstractmethod
    def list(self, user_id: str) -> List[T]: ...

    @abstractmethod
    def update(self, item_id: str, data: dict) -> None: ...

    @abstractmethod
    def delete(self, item_id: str) -> None: ...
