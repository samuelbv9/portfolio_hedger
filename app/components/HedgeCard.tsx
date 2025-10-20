import { HedgeOption } from "./types";
import { Shield, Calendar, DollarSign, TrendingDown } from "lucide-react";

interface HedgeCardProps {
  hedge: HedgeOption;
}

export function HedgeCard({ hedge }: HedgeCardProps) {
  const getHedgeColor = (name: string) => {
    switch (name) {
      case "Maximum Protection":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Balanced Coverage":
        return "bg-green-100 text-green-800 border-green-200";
      case "Crash-Only Protection":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border-2 border-slate-200 h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-slate-900">{hedge.name}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getHedgeColor(hedge.name)}`}>
          {hedge.protectionLevel}
        </span>
      </div>

      <p className="text-slate-600 mb-6 text-sm flex-grow">{hedge.description}</p>

      <div className="space-y-4 mt-auto">
        <div className="flex items-center gap-3 text-sm">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span className="text-slate-600">Expiration:</span>
          <span className="font-semibold text-slate-900">{hedge.expiration}</span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <TrendingDown className="w-4 h-4 text-slate-400" />
          <span className="text-slate-600">Strike Price:</span>
          <span className="font-semibold text-slate-900">{hedge.strikePrice}% of current</span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <Shield className="w-4 h-4 text-slate-400" />
          <span className="text-slate-600">Contracts:</span>
          <span className="font-semibold text-slate-900">{hedge.contracts}</span>
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-slate-600 text-sm">Contract Price:</span>
            <span className="font-semibold text-slate-900">
              ${hedge.contractPrice.toFixed(2)}
            </span>
          </div>

          <div className="flex items-baseline justify-between mb-2">
            <span className="text-slate-600 text-sm">Total Cost:</span>
            <span className="font-bold text-lg text-slate-900">
              ${hedge.totalCost.toLocaleString()}
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-slate-600 text-sm">Cost % of Portfolio:</span>
            <span className="font-semibold text-blue-600">
              {hedge.costPercentage.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="bg-slate-50 rounded-lg p-3 mt-4">
          <div className="text-xs text-slate-500 mb-1">Breakeven Point</div>
          <div className="text-lg font-bold text-slate-900">
            {hedge.breakeven.toFixed(2)}%
          </div>
        </div>
      </div>
    </div>
  );
}
