from functools import lru_cache

from starlette.requests import Request

from app.auth.base import AuthProvider, CurrentUser
from app.core.config import get_settings
from app.core.errors import AppError


class DevAuthProvider:
    """Single local user for development. Refuses to run in production."""

    async def authenticate(self, request: Request) -> CurrentUser:
        if get_settings().environment == "production":
            raise AppError("auth_misconfigured", "Authentication is not configured.", 500)
        return CurrentUser(id="local-dev", name="Local developer", email=None)


class GitHubAuthProvider:
    """Placeholder wired in Phase 8 (GitHub OAuth)."""

    async def authenticate(self, request: Request) -> CurrentUser:
        raise AppError("auth_unavailable", "GitHub sign-in is not enabled yet.", 501)


@lru_cache
def get_auth_provider() -> AuthProvider:
    return GitHubAuthProvider() if get_settings().auth_provider == "github" else DevAuthProvider()
