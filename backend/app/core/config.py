from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    firebase_credentials_path: str = "serviceAccountKey.json"
    # Comma-separated in production (e.g. the Vercel URL); localhost is
    # always included below so local dev never breaks when this is set.
    frontend_origin: str = "http://localhost:3000"

    class Config:
        env_file = ".env"

    @property
    def frontend_origins(self) -> list[str]:
        origins = {o.strip() for o in self.frontend_origin.split(",") if o.strip()}
        origins.add("http://localhost:3000")
        return list(origins)


settings = Settings()
