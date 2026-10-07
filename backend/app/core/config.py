from functools import lru_cache
from typing import Literal

from pydantic import SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """All configuration comes from environment variables (see .env.example)."""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "NEXUS API"
    app_version: str = "0.1.0"
    environment: Literal["development", "staging", "production"] = "development"
    log_level: str = "INFO"

    database_url: str = "postgresql+asyncpg://nexus:nexus@localhost:5432/nexus"
    cors_origins: list[str] = ["http://localhost:3000"]

    auth_provider: Literal["dev", "github"] = "dev"
    github_client_id: str = ""
    github_client_secret: SecretStr = SecretStr("")

    # AI layer: declared now so configuration is stable; consumed from Phase 3.
    llm_provider: str = "anthropic"
    llm_api_key: SecretStr = SecretStr("")
    llm_model: str = ""
    embedding_provider: str = ""
    embedding_api_key: SecretStr = SecretStr("")
    embedding_model: str = ""
    embedding_dimensions: int = 1536


@lru_cache
def get_settings() -> Settings:
    return Settings()
