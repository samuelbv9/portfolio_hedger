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

  const calculateHedges = () => {
    const portfolio = parseFloat(portfolioValue);
    const days = parseInt(coverageLength);
    const drop = parseFloat(dropPercentage);
    const budgetPct = parseFloat(budget);

    if (isNaN(portfolio) || isNaN(days) || isNaN(drop) || isNaN(budgetPct)) {
      return;
    }

    const contracts = Math.round(portfolio / 100 / 100);
    const maxBudget = (portfolio * budgetPct) / 100;

    const calculatedHedges: HedgeOption[] = [
      {
        name: "Maximum Protection",
        description: "Aggressive hedge protecting against any downturn",
        expiration: `${days} days`,
        strikePrice: 95,
        contractPrice: 3.50,
        contracts: contracts,
        totalCost: contracts * 350,
        costPercentage: (contracts * 350 / portfolio) * 100,
        protectionLevel: "High",
        breakeven: -((contracts * 350 / portfolio) * 100),
      },
      {
        name: "Balanced Coverage",
        description: "Moderate protection at reasonable cost",
        expiration: `${days} days`,
        strikePrice: 90,
        contractPrice: 2.10,
        contracts: contracts,
        totalCost: contracts * 210,
        costPercentage: (contracts * 210 / portfolio) * 100,
        protectionLevel: "Medium",
        breakeven: -((contracts * 210 / portfolio) * 100),
      },
      {
        name: "Crash-Only Protection",
        description: "Low-cost hedge for severe market drops",
        expiration: `${days} days`,
        strikePrice: 80,
        contractPrice: 0.75,
        contracts: contracts,
        totalCost: contracts * 75,
        costPercentage: (contracts * 75 / portfolio) * 100,
        protectionLevel: "Low",
        breakeven: -((contracts * 75 / portfolio) * 100),
      },
    ];

    setHedges(calculatedHedges);
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
          onClick={calculateHedges}
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