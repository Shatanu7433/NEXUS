from fastapi import Depends
from starlette.requests import Request

from app.auth.base import AuthProvider, CurrentUser
from app.auth.providers import get_auth_provider


async def get_current_user(request: Request, provider: AuthProvider = Depends(get_auth_provider)) -> CurrentUser:
    return await provider.authenticate(request)
