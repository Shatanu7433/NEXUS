from typing import Literal

from pydantic import BaseModel


class ComponentHealth(BaseModel):
    name: str
    status: Literal["ok", "unavailable"]
    detail: str | None = None


class HealthResponse(BaseModel):
    status: Literal["ok", "degraded"]
    version: str
    environment: str
    components: list[ComponentHealth]
