# Memoir App

A memorial website generator powered by AI.

## Setup

### 1. Install dependencies
```bash
pip install -r requirements.txt
```

### 2. Create your .env file
```bash
# Mac/Linux:
cp .env.example .env

# Windows:
copy .env.example .env
```

Open `.env` and paste your OpenAI API key:
```
OPENAI_API_KEY=sk-your-real-key-here
```

### 3. Run the server
```bash
# Mac/Linux:
uvicorn main:app --reload

# Windows:
python -m uvicorn main:app --reload
```

### 4. Open the app
Go to http://localhost:8000

---

## How it works

1. Enter your name
2. Upload photos, videos, notes, and audio recordings
3. Answer 5 guided questions
4. AI reads your photos and writes a first-person memoir
5. AI designs a unique memorial website based on your content
6. Download the site as a self-contained HTML file or print as PDF

## Project structure

```
memoir-final/
├── main.py           # FastAPI backend
├── requirements.txt
├── .env              # Your API key — never commit this
├── .env.example      # Safe placeholder — commit this
├── .gitignore        # Keeps .env out of git
└── static/
    └── index.html    # The frontend
```

## Deploying online

To host publicly on Railway, Render, or Fly.io:
- Set OPENAI_API_KEY as an environment variable in your host dashboard
- Do NOT commit your .env file
