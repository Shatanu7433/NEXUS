from fastapi import APIRouter, Depends

from app.auth.base import CurrentUser
from app.auth.deps import get_current_user
from app.schemas.workspace import WorkspaceSummary
from app.services import workspace_service

router = APIRouter(prefix="/workspace", tags=["workspace"])


@router.get("/summary", response_model=WorkspaceSummary)
async def summary(user: CurrentUser = Depends(get_current_user)) -> WorkspaceSummary:
    return await workspace_service.get_summary(user)
