from pydantic import BaseModel


class WorkspaceRef(BaseModel):
    id: str
    name: str


class UserRef(BaseModel):
    id: str
    name: str
    email: str | None = None


class WorkspaceStats(BaseModel):
    repositories_analyzed: int
    issues_detected: int
    security_findings: int
    code_reviews: int
    tests_generated: int


class WorkspaceSummary(BaseModel):
    workspace: WorkspaceRef
    user: UserRef
    stats: WorkspaceStats
