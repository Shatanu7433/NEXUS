import asyncio
import logging

from sqlalchemy import text

from app.core.config import get_settings
from app.db.session import get_sessionmaker
from app.schemas.health import ComponentHealth, HealthResponse

log = logging.getLogger("nexus.health")


async def _check_database() -> list[ComponentHealth]:
    try:
        async with asyncio.timeout(3):
            async with get_sessionmaker()() as session:
                await session.execute(text("SELECT 1"))
                row = await session.execute(text("SELECT 1 FROM pg_extension WHERE extname = 'vector'"))
                has_vector = row.first() is not None
    except Exception as exc:  # report the failure class, never connection details
        log.warning("database_check_failed", extra={"error_type": type(exc).__name__})
        return [
            ComponentHealth(name="database", status="unavailable", detail="Cannot connect to PostgreSQL."),
            ComponentHealth(name="pgvector", status="unavailable", detail="Unknown until the database is reachable."),
        ]
    return [
        ComponentHealth(name="database", status="ok"),
        ComponentHealth(
            name="pgvector",
            status="ok" if has_vector else "unavailable",
            detail=None if has_vector else "Run: CREATE EXTENSION vector;",
        ),
    ]


async def get_health() -> HealthResponse:
    settings = get_settings()
    components = [ComponentHealth(name="api", status="ok"), *await _check_database()]
    overall = "ok" if all(c.status == "ok" for c in components) else "degraded"
    return HealthResponse(
        status=overall, version=settings.app_version, environment=settings.environment, components=components
    )
