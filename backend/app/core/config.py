from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    firebase_credentials_path: str = "serviceAccountKey.json"
    frontend_origin: str = "http://localhost:3000"

    class Config:
        env_file = ".env"


settings = Settings()
