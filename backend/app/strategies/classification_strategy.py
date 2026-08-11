from abc import ABC, abstractmethod


class ClassificationStrategy(ABC):
    @abstractmethod
    def classify(self, description: str) -> str: ...
