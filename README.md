# NEXUS

Your AI Software Engineer.

> Status: **Phase 1 of 10** (project setup, API connection, landing page, dashboard shell).

## Structure

```
backend/    FastAPI app (config, logging, errors, auth abstraction, DB session, health + workspace routes)
frontend/   Next.js app (landing page, dashboard shell, typed API client)
infra/      Database bootstrap (pgvector extension)
docker-compose.yml   Local PostgreSQL + pgvector
```

## Getting started

```bash
# 1. Database
docker compose up -d db

# 2. Backend  (http://localhost:8000, docs at /docs)
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements-dev.txt
cp ../.env.example .env
uvicorn app.main:app --reload

# 3. Frontend (http://localhost:3000)
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

## Environment variables

See `.env.example`. Secrets (`LLM_API_KEY`, `GITHUB_CLIENT_SECRET`, ...) exist only on the backend. The frontend reads one public value: `NEXT_PUBLIC_API_URL`.

## Tests

```bash
cd backend && pytest        # API tests (no database required)
cd frontend && npm run typecheck && npm run build
```
