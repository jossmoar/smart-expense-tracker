from pydantic import BaseModel


class NotificationCreate(BaseModel):
    category: str
    spent: float
    limit: float
    message: str
    read: bool = False


class Notification(NotificationCreate):
    id: str
    user_id: str
