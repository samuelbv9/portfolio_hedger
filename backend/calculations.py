# Financial calculation functions
from models import HedgeRequest, HedgeResponse, HedgeOption

def calculate_hedge_recommendations(request: HedgeRequest) -> HedgeResponse:
    portfolio = request.portfolio_value
    days = request.coverage_days
    drop = request.drop_percentage
    budget_pct = request.budget_percentage
    
    # Calculate number of contracts (simplified)
    contracts = round(portfolio / 100 / 100)
    
    # Create three hedge strategies
    hedges = [
        HedgeOption(
            name="Maximum Protection",
            description="Aggressive hedge protecting against any downturn",
            expiration=f"{days} days",
            strike_price=95,
            contract_price=3.50,
            contracts=contracts,
            total_cost=contracts * 350,
            cost_percentage=(contracts * 350 / portfolio) * 100,
            protection_level="High",
            breakeven=-((contracts * 350 / portfolio) * 100),
        ),
        HedgeOption(
            name="Balanced Coverage",
            description="Moderate protection at reasonable cost",
            expiration=f"{days} days",
            strike_price=90,
            contract_price=2.10,
            contracts=contracts,
            total_cost=contracts * 210,
            cost_percentage=(contracts * 210 / portfolio) * 100,
            protection_level="Medium",
            breakeven=-((contracts * 210 / portfolio) * 100),
        ),
        HedgeOption(
            name="Crash-Only Protection",
            description="Low-cost hedge for severe market drops",
            expiration=f"{days} days",
            strike_price=80,
            contract_price=0.75,
            contracts=contracts,
            total_cost=contracts * 75,
            cost_percentage=(contracts * 75 / portfolio) * 100,
            protection_level="Low",
            breakeven=-((contracts * 75 / portfolio) * 100),
        ),
    ]
    
    return HedgeResponse(hedges=hedges)