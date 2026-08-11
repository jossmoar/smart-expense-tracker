from app.strategies.classification_strategy import ClassificationStrategy

CATEGORY_KEYWORDS: dict[str, list[str]] = {
    "Comida": ["restaurante", "super", "soda", "walmart", "auto mercado", "uber eats", "pali", "maxi bodega"],
    "Transporte": ["uber", "gasolina", "bus", "taxi", "parqueo", "riteve"],
    "Entretenimiento": ["netflix", "spotify", "cine", "steam", "disney"],
    "Servicios": ["ice", "aya", "internet", "telefono", "kolbi", "claro", "movistar"],
    "Salud": ["farmacia", "clinica", "hospital", "doctor", "ebais"],
    "Vivienda": ["alquiler", "renta", "hipoteca"],
}


class KeywordClassificationStrategy(ClassificationStrategy):
    """Rule-based classification: transparent, needs no training data, and is
    easy to extend by editing CATEGORY_KEYWORDS. Swapping in a trained model
    later means adding another ClassificationStrategy — routers/expenses.py
    doesn't change."""

    def classify(self, description: str) -> str:
        text = description.lower()
        for category, keywords in CATEGORY_KEYWORDS.items():
            if any(keyword in text for keyword in keywords):
                return category
        return "Otros"
