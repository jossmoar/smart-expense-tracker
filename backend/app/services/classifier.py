"""Keyword-based auto-categorization for expenses with no category set.

Intentionally rule-based rather than an ML model: it's transparent, needs no
training data, and is easy to extend by editing CATEGORY_KEYWORDS. Swapping
in a trained classifier later is a drop-in replacement for classify_expense.
"""

CATEGORY_KEYWORDS: dict[str, list[str]] = {
    "Comida": ["restaurante", "super", "soda", "walmart", "auto mercado", "uber eats", "pali", "maxi bodega"],
    "Transporte": ["uber", "gasolina", "bus", "taxi", "parqueo", "riteve"],
    "Entretenimiento": ["netflix", "spotify", "cine", "steam", "disney"],
    "Servicios": ["ice", "aya", "internet", "telefono", "kolbi", "claro", "movistar"],
    "Salud": ["farmacia", "clinica", "hospital", "doctor", "ebais"],
    "Vivienda": ["alquiler", "renta", "hipoteca"],
}


def classify_expense(description: str) -> str:
    text = description.lower()
    for category, keywords in CATEGORY_KEYWORDS.items():
        if any(keyword in text for keyword in keywords):
            return category
    return "Otros"
