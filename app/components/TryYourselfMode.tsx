"use client";

import { useState } from "react";
import { HedgeCard } from "./HedgeCard";
import { PayoffChart } from "./PayoffChart";
import { HedgeOption } from "./types";
import { Calculator } from "lucide-react";

export function TryYourselfMode() {
  const [portfolioValue, setPortfolioValue] = useState("100000");
  const [coverageLength, setCoverageLength] = useState("90");
  const [dropPercentage, setDropPercentage] = useState("15");
  const [budget, setBudget] = useState("2");
  const [hedges, setHedges] = useState<HedgeOption[] | null>(null);

  const getHedgeRecommendations = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/hedge_recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          portfolio_value: parseFloat(portfolioValue),
          coverage_days: parseInt(coverageLength),
          drop_percentage: parseFloat(dropPercentage),
          budget_percentage: parseFloat(budget)
        })
      });
      const data = await response.json();
      // Convert snake_case to camelCase for frontend compatibility
      const convertedHedges = data.hedges.map((hedge: any) => ({
        name: hedge.name,
        description: hedge.description,
        expiration: hedge.expiration,
        strikePrice: hedge.strike_price,
        contractPrice: hedge.contract_price,
        contracts: hedge.contracts,
        totalCost: hedge.total_cost,
        costPercentage: hedge.cost_percentage,
        protectionLevel: hedge.protection_level,
        breakeven: hedge.breakeven,
      }));
      setHedges(convertedHedges);
    } catch (error) {
      console.error("Error fetching hedge recommendations:", error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="w-6 h-6 text-blue-600" />
          <h3 className="text-2xl font-bold text-slate-900">
            Portfolio Details
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="portfolio" className="block text-base font-medium text-slate-700 mb-2">
              Portfolio Value ($)
            </label>
            <input
              id="portfolio"
              type="number"
              value={portfolioValue}
              onChange={(e) => setPortfolioValue(e.target.value)}
              placeholder="100000"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="coverage" className="block text-base font-medium text-slate-700 mb-2">
              Coverage Length (days)
            </label>
            <input
              id="coverage"
              type="number"
              value={coverageLength}
              onChange={(e) => setCoverageLength(e.target.value)}
              placeholder="90"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="drop" className="block text-base font-medium text-slate-700 mb-2">
              Expected Drop to Hedge (%)
            </label>
            <input
              id="drop"
              type="number"
              value={dropPercentage}
              onChange={(e) => setDropPercentage(e.target.value)}
              placeholder="15"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="budget" className="block text-base font-medium text-slate-700 mb-2">
              Hedging Budget (% of portfolio)
            </label>
            <input
              id="budget"
              type="number"
              step="0.1"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="2"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          onClick={getHedgeRecommendations}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 px-6 rounded-lg text-lg transition-colors duration-200"
        >
          Calculate Hedge Options
        </button>
      </div>

      {hedges && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {hedges.map((hedge, index) => (
              <HedgeCard key={index} hedge={hedge} />
            ))}
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6 text-center text-slate-900">
              Portfolio Value vs Market Movement
            </h3>
            <PayoffChart hedges={hedges} portfolioValue={parseFloat(portfolioValue)} />
          </div>
        </>
      )}
    </div>
  );
}