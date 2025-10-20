import { HedgeCard } from "./HedgeCard";
import { PayoffChart } from "./PayoffChart";
import { type HedgeOption } from "./types";
import { TrendingUp, Shield, DollarSign } from "lucide-react";

const demoHedges: HedgeOption[] = [
  {
    name: "Maximum Protection",
    description: "Aggressive hedge protecting against any downturn",
    expiration: "90 days",
    strikePrice: 95,
    contractPrice: 3.50,
    contracts: 10,
    totalCost: 3500,
    costPercentage: 3.5,
    protectionLevel: "High",
    breakeven: -3.5,
  },
  {
    name: "Balanced Coverage",
    description: "Moderate protection at reasonable cost",
    expiration: "90 days",
    strikePrice: 90,
    contractPrice: 2.10,
    contracts: 10,
    totalCost: 2100,
    costPercentage: 2.1,
    protectionLevel: "Medium",
    breakeven: -7.9,
  },
  {
    name: "Crash-Only Protection",
    description: "Low-cost hedge for severe market drops",
    expiration: "90 days",
    strikePrice: 80,
    contractPrice: 0.75,
    contracts: 10,
    totalCost: 750,
    costPercentage: 0.75,
    protectionLevel: "Low",
    breakeven: -19.25,
  },
];

export function DemoMode() {
  return (
    <div className="space-y-12">
      {/* Enhanced demo assumptions */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-8 text-center shadow-lg">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full p-3">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Demo Portfolio</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white/60 rounded-xl p-4 border border-blue-200">
            <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-900">$100,000</div>
            <div className="text-sm text-slate-600">Portfolio Value</div>
          </div>
          <div className="bg-white/60 rounded-xl p-4 border border-blue-200">
            <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-900">SPY</div>
            <div className="text-sm text-slate-600">Underlying Asset</div>
          </div>
          <div className="bg-white/60 rounded-xl p-4 border border-blue-200">
            <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-900">90 Days</div>
            <div className="text-sm text-slate-600">Coverage Period</div>
          </div>
        </div>
        
        <p className="text-blue-800 font-semibold text-lg">
          🎯 Three different hedge strategies for comparison
        </p>
      </div>

      {/* Enhanced chart section */}
      <div className="mt-16 bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 shadow-xl border border-slate-200">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full px-6 py-3 mb-4">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
            <span className="text-indigo-800 font-semibold">Interactive Analysis</span>
          </div>
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-indigo-800 bg-clip-text text-transparent">
            Portfolio Value vs Market Movement
          </h3>
          <p className="text-slate-600 text-lg">
            Hover over the chart to see how each strategy protects your portfolio
          </p>
        </div>
        <PayoffChart hedges={demoHedges} portfolioValue={100000} />
      </div>

      {/* Enhanced hedge cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {demoHedges.map((hedge, index) => (
          <div key={index} className="transform hover:scale-105 transition-all duration-300">
            <HedgeCard hedge={hedge} />
          </div>
        ))}
      </div>
    </div>
  );
}
