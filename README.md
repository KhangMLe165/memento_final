# Memento

A digital legacy app: preserve memories with photos and written reflections, curated by AI (OpenAI) into a first-person narrative tribute.

- **Frontend:** React + Vite + Tailwind (port 8080 in dev)
- **Backend:** FastAPI, serves `/api/generate` and optional static frontend (port 8000)

## Quick start

1. **Backend** (from `backend/`):
   - Copy `backend/.env.example` to `backend/.env` and set `OPENAI_API_KEY=your-key`
   - `pip install -r requirements.txt` then `python -m uvicorn main:app --reload --port 8000`

2. **Frontend** (from `frontend/`):
   - `npm install` then `npm run dev` (app at http://localhost:8080; `/api` is proxied to 8000)

3. Open http://localhost:8080, go to "Start your memento", complete the flow, and generate your tribute.

