# Pydantic models for API requests/responses
from pydantic import BaseModel

class HedgeRequest(BaseModel):
    portfolio_value: float
    coverage_days: int
    drop_percentage: float
    budget_percentage: float

class HedgeOption(BaseModel):
    name: str
    description: str
    expiration: str
    strike_price: float
    contract_price: float
    contracts: int
    total_cost: float
    cost_percentage: float
    protection_level: str
    breakeven: float

class HedgeResponse(BaseModel):
    hedges: list[HedgeOption]

# TODO: Portfolio input model (stocks, quantities, prices)
# TODO: Position model (symbol, quantity, price, type)
# TODO: Hedging recommendation model
# TODO: Portfolio analysis result model
# TODO: Market data response model
