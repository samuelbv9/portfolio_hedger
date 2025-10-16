# Portfolio Hedger Backend - Simple MVP

Ultra-simple Python backend for portfolio hedging calculations.

## Structure
```
backend/
├── app.py              # Main FastAPI application
├── calculations.py     # Financial calculation functions
├── market_data.py      # Market data fetching
├── models.py           # Pydantic data models
├── requirements.txt    # Python dependencies
├── run.py             # Development server
└── README.md          # This file
```

## Setup
1. Install dependencies: `pip install -r requirements.txt`
2. Run server: `python run.py`
3. API docs: http://localhost:8000/docs

## API Endpoints (to implement)
- `POST /portfolio/analyze` - Analyze portfolio and get hedging recommendations
- `GET /market-data/{symbol}` - Get current stock price
- `GET /health` - Health check

## No Database Required
All calculations are done in-memory. Perfect for MVP!