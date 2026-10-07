from app.auth.base import CurrentUser
from app.schemas.workspace import UserRef, WorkspaceRef, WorkspaceStats, WorkspaceSummary


async def get_summary(user: CurrentUser) -> WorkspaceSummary:
    """Phase 1: no repositories exist yet, so every counter is a true zero.

    Phase 2 replaces these with aggregate queries over the repositories/issues tables.
    """
    return WorkspaceSummary(
        workspace=WorkspaceRef(id="personal", name="Personal workspace"),
        user=UserRef(id=user.id, name=user.name, email=user.email),
        stats=WorkspaceStats(
            repositories_analyzed=0, issues_detected=0, security_findings=0, code_reviews=0, tests_generated=0
        ),
    )
