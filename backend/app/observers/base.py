from abc import ABC, abstractmethod


class BudgetObserver(ABC):
    @abstractmethod
    def notify(self, user_id: str, category: str, spent: float, limit: float) -> None: ...


class BudgetSubject:
    """Watches a category's spend against its limit and fans out to whoever
    subscribed — Firestore alerts today, could be email/push later without
    touching this class."""

    def __init__(self) -> None:
        self._observers: list[BudgetObserver] = []

    def subscribe(self, observer: BudgetObserver) -> None:
        self._observers.append(observer)

    def unsubscribe(self, observer: BudgetObserver) -> None:
        self._observers.remove(observer)

    def check_budget(self, user_id: str, category: str, spent: float, limit: float) -> bool:
        exceeded = spent >= limit
        if exceeded:
            for observer in self._observers:
                observer.notify(user_id, category, spent, limit)
        return exceeded
