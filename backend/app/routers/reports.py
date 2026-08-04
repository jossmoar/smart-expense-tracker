from fastapi import APIRouter, HTTPException, Response

from app.factories.report_factory import ReportFactory
from app.repositories.expense_repository import ExpenseRepository

router = APIRouter(prefix="/reports", tags=["reports"])
repository = ExpenseRepository()

MEDIA_TYPES = {
    "pdf": "application/pdf",
    "excel": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
}


@router.get("/{report_format}")
def download_report(report_format: str, user_id: str) -> Response:
    try:
        generator = ReportFactory.create(report_format)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    expenses = repository.list(user_id)
    content = generator.generate(expenses)
    extension = "pdf" if report_format == "pdf" else "xlsx"

    return Response(
        content=content,
        media_type=MEDIA_TYPES[report_format],
        headers={"Content-Disposition": f"attachment; filename=reporte-gastos.{extension}"},
    )
