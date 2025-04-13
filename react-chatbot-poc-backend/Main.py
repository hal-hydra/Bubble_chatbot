from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS setup so frontend (even if hosted elsewhere) can talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat(req: Request):
    data = await req.json()
    user_input = data.get("message", "")

    # Mock logic
    dummy_response = f"Received your message: '{user_input}'. This is a mock reply for PoC!"
    return {"reply": dummy_response}
