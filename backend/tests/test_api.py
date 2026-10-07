from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_liveness_and_request_id():
    r = client.get("/api/health/live")
    assert r.status_code == 200 and r.json() == {"status": "ok"}
    assert len(r.headers["x-request-id"]) >= 8


def test_request_id_is_echoed_when_valid():
    r = client.get("/api/health/live", headers={"X-Request-ID": "trace-12345678"})
    assert r.headers["x-request-id"] == "trace-12345678"


def test_health_shape_even_without_database():
    body = client.get("/api/health").json()
    assert body["status"] in {"ok", "degraded"}
    assert {c["name"] for c in body["components"]} == {"api", "database", "pgvector"}


def test_workspace_summary_is_typed_zeroes():
    body = client.get("/api/workspace/summary").json()
    assert body["workspace"]["id"] == "personal"
    assert all(v == 0 for v in body["stats"].values())


def test_structured_404():
    r = client.get("/api/nope")
    assert r.status_code == 404
    assert r.json()["error"]["code"] == "http_error"
    assert "request_id" in r.json()["error"]
