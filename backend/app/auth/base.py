from typing import Protocol

from pydantic import BaseModel
from starlette.requests import Request


class CurrentUser(BaseModel):
    id: str
    name: str
    email: str | None = None


class AuthProvider(Protocol):
    """Swap implementations (dev, GitHub OAuth, ...) without touching route code."""

    async def authenticate(self, request: Request) -> CurrentUser: ...
