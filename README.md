# Smart Expense Tracker

Gestor inteligente de gastos personales: no solo registra ingresos y gastos,
también los analiza — clasificación automática por categoría, alertas cuando
un presupuesto está por superarse, y predicción del gasto del próximo mes.

## Stack

- **Frontend:** Next.js (TypeScript, Tailwind CSS, App Router) + Chart.js
- **Backend:** Python + FastAPI
- **Base de datos y auth:** Firebase Firestore + Firebase Authentication
- **Despliegue:** Vercel (frontend) + Render/Fly.io (backend)

## Estructura

```
smart-expense-tracker/
├── frontend/    → Next.js: dashboard, formularios, gráficos
└── backend/     → FastAPI: lógica de negocio, patrones de diseño
```

## Funcionalidad

- Registro / login (Firebase Auth)
- Agregar ingresos y gastos, con categorías
- Presupuestos por categoría con alertas
- Dashboard con métricas y gráficos (Chart.js)
- Reportes mensuales, exportables a PDF y Excel
- Clasificación automática de gastos por palabra clave
- Predicción del gasto del próximo mes

## Arquitectura del backend — patrones de diseño

| Patrón | Dónde vive | Qué resuelve |
|---|---|---|
| **Repository** | `backend/app/repositories/` | Aísla el acceso a Firestore del resto de la app — cambiar de base de datos no toca routers ni servicios. |
| **Factory** | `backend/app/factories/report_factory.py` | `ReportFactory.create("pdf" \| "excel")` devuelve el generador correcto sin que el caller conozca las clases concretas. |
| **Strategy** | `backend/app/strategies/` | Distintos métodos de análisis (promedio mensual, desglose por categoría, predicción) intercambiables en runtime vía `ExpenseAnalyzer`. |
| **Observer** | `backend/app/observers/` | `BudgetSubject` notifica a los observadores suscritos (hoy: alerta en Firestore) cuando un gasto supera su presupuesto. |

## Desarrollo local

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate      # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Copia `frontend/.env.example` → `frontend/.env.local` y `backend/.env.example` → `backend/.env`,
y completa con tus propios valores de Firebase. La clave de servicio de Firebase
(`backend/serviceAccountKey.json`) se descarga desde
**Firebase Console → Project settings → Service accounts** y nunca se sube al repo.
