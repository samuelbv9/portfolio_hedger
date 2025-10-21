# Main FastAPI application - single file backend
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import HedgeRequest, HedgeResponse
from calculations import calculate_hedge_recommendations

app = FastAPI()

# allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all (ok for dev)
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/v1/health_check")
def health_check():
    return {"status": "healthy"}

@app.post("/api/v1/hedge_recommendations")
def get_hedge_recommendations(request: HedgeRequest) -> HedgeResponse:
    return calculate_hedge_recommendations(request)
