from fastapi import FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
import httpx
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_URL = "https://api.openai.com/v1/chat/completions"


def convert_anthropic_to_openai(body: dict) -> dict:
    """Convert Anthropic message format to OpenAI format."""
    openai_content = []

    for message in body.get("messages", []):
        content = message.get("content", "")
        if isinstance(content, str):
            openai_content.append({"type": "text", "text": content})
        elif isinstance(content, list):
            for block in content:
                if block.get("type") == "text":
                    openai_content.append({"type": "text", "text": block["text"]})
                elif block.get("type") == "image":
                    source = block.get("source", {})
                    if source.get("type") == "base64":
                        mime = source.get("media_type", "image/jpeg")
                        data = source.get("data", "")
                        openai_content.append({
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:{mime};base64,{data}",
                                "detail": "low"
                            }
                        })

    messages = [{"role": "user", "content": openai_content}]
    if "system" in body:
        messages.insert(0, {"role": "system", "content": body["system"]})

    return {
        "model": "gpt-4o-mini",
        "messages": messages,
        "max_tokens": body.get("max_tokens", 2500),
    }


def convert_openai_to_anthropic(openai_response: dict) -> dict:
    """Convert OpenAI response back to Anthropic format so the frontend works unchanged."""
    try:
        text = openai_response["choices"][0]["message"]["content"]
    except (KeyError, IndexError):
        text = ""
    return {"content": [{"type": "text", "text": text}]}


@app.post("/api/generate")
async def generate(request: Request):
    if not OPENAI_API_KEY:
        raise HTTPException(status_code=500, detail="OPENAI_API_KEY not set in .env")

    body = await request.json()
    openai_body = convert_anthropic_to_openai(body)

    async with httpx.AsyncClient(timeout=120.0) as client:
        response = await client.post(
            OPENAI_URL,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {OPENAI_API_KEY}",
            },
            json=openai_body,
        )

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)

    return convert_openai_to_anthropic(response.json())


# Serve the frontend
app.mount("/assets", StaticFiles(directory="static/assets"), name="assets")
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/{full_path:path}", response_class=HTMLResponse)
async def root(full_path: str):
    return FileResponse("static/index.html")
