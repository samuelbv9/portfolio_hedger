"use client";

import { useState, useRef, useCallback } from "react";
import { HedgeOption } from "./types";
import { X } from "lucide-react";

interface PayoffChartProps {
  hedges: HedgeOption[];
  portfolioValue: number;
}

export function PayoffChart({ hedges, portfolioValue }: PayoffChartProps) {
  const [hoveredX, setHoveredX] = useState<number | null>(0); // Default to 0% market move
  const [selectedHedges, setSelectedHedges] = useState<Set<number | null>>(new Set()); // Multi-select
  const svgRef = useRef<SVGSVGElement>(null);

  const width = 800;
  const height = 400;
  const padding = { top: 50, right: 50, bottom: 70, left: 80 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Data points every 2%
  const marketMoves: number[] = [];
  for (let i = -40; i <= 20; i += 2) {
    marketMoves.push(i);
  }

  const calculatePortfolioValue = (marketMove: number, hedge: HedgeOption) => {
    const portfolioChange = (portfolioValue * marketMove) / 100;
    const newPortfolioValue = portfolioValue + portfolioChange - hedge.totalCost;

    let hedgePayoff = 0;
    if (marketMove < 0) {
      const strikeValue = (hedge.strikePrice / 100) * portfolioValue;
      const currentValue = portfolioValue + portfolioChange;
      if (currentValue < strikeValue) {
        hedgePayoff = (strikeValue - currentValue) * (hedge.contracts / (portfolioValue / 10000));
      }
    }

    return newPortfolioValue + hedgePayoff;
  };

  const unhedgedValues = marketMoves.map((move) => portfolioValue + (portfolioValue * move) / 100);
  const hedgedValues = hedges.map((hedge) =>
    marketMoves.map((move) => calculatePortfolioValue(move, hedge))
  );

  const allValues = [...unhedgedValues, ...hedgedValues.flat()];
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);

  const xScale = (marketMove: number) => {
    return padding.left + ((marketMove + 40) / 60) * chartWidth;
  };

  const yScale = (value: number) => {
    return padding.top + chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;
  };

  const createPath = (values: number[]) => {
    return marketMoves
      .map((move, i) => {
        const x = xScale(move);
        const y = yScale(values[i]);
        return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
      })
      .join(" ");
  };

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    
    // Convert to SVG coordinate system using viewBox
    const svgWidth = rect.width;
    const svgHeight = rect.height;
    const viewBoxWidth = width;
    const viewBoxHeight = height;
    
    // Scale mouse coordinates to viewBox coordinates
    const scaledX = (x / svgWidth) * viewBoxWidth;
    
    // Convert to market move percentage
    const relativeX = scaledX - padding.left;
    const marketMove = (relativeX / chartWidth) * 60 - 40;
    const clampedMove = Math.max(-40, Math.min(20, marketMove));
    
    console.log('Raw X:', x, 'Scaled X:', scaledX, 'Relative X:', relativeX, 'Market move:', marketMove);
    
    setHoveredX(clampedMove);
  }, [chartWidth, width]);

  const handleMouseLeave = useCallback(() => {
    setHoveredX(0); // Return to 0% market move instead of null
  }, []);

  const colors = ["#3b82f6", "#10b981", "#f59e0b"];

  // Toggle hedge selection
  const toggleHedge = (hedgeIndex: number | null) => {
    const newSelected = new Set(selectedHedges);
    if (newSelected.has(hedgeIndex)) {
      newSelected.delete(hedgeIndex);
    } else {
      newSelected.add(hedgeIndex);
    }
    setSelectedHedges(newSelected);
  };

  // Clear all selections
  const clearSelection = () => {
    setSelectedHedges(new Set());
  };

  // Get values at current hover position
  const getCurrentValues = () => {
    if (hoveredX === null) return null;
    
    const unhedgedValue = portfolioValue + (portfolioValue * hoveredX) / 100;
    const hedgedValuesAtX = hedges.map((hedge) => calculatePortfolioValue(hoveredX, hedge));
    
    return {
      marketMove: hoveredX,
      unhedgedValue,
      hedgedValues: hedgedValuesAtX
    };
  };

  const currentValues = getCurrentValues();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2">Portfolio Protection Analysis</h3>
        <p className="text-sm text-slate-600">Click a strategy below to highlight it, then hover over the chart to see values</p>
      </div>

      {/* Strategy selection buttons */}
      <div className="mb-6 flex flex-wrap justify-center gap-3">
        {selectedHedges.size > 0 && (
          <button
            onClick={clearSelection}
            className="px-3 py-2 rounded-lg text-sm font-medium transition-all bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 hover:border-red-300 flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
        <button
          onClick={() => toggleHedge(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            selectedHedges.has(null)
              ? 'bg-slate-200 text-slate-900 border-2 border-slate-400'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-300'
          }`}
        >
          No Protection
        </button>
        {hedges.map((hedge, i) => (
          <button
            key={i}
            onClick={() => toggleHedge(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedHedges.has(i)
                ? 'text-white border-2 border-white'
                : 'text-slate-600 hover:opacity-80 border border-slate-300'
            }`}
            style={{
              backgroundColor: selectedHedges.has(i) ? colors[i] : '#f8fafc',
              borderColor: selectedHedges.has(i) ? colors[i] : '#e2e8f0'
            }}
          >
            {hedge.name}
          </button>
        ))}
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto cursor-crosshair"
        style={{ minWidth: "600px" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Background */}
        <rect x={padding.left} y={padding.top} width={chartWidth} height={chartHeight} fill="#fafafa" />

        {/* Grid lines - subtle */}
        {[-40, -30, -20, -10, 0, 10, 20].map((move) => (
          <g key={move}>
            <line
              x1={xScale(move)}
              y1={padding.top}
              x2={xScale(move)}
              y2={padding.top + chartHeight}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
            <text
              x={xScale(move)}
              y={height - padding.bottom + 20}
              textAnchor="middle"
              fontSize="12"
              fill="#6b7280"
            >
              {move > 0 ? `+${move}` : move}%
            </text>
          </g>
        ))}

        {/* Y-axis grid lines and labels */}
        {[0, 1, 2, 3, 4].map((i) => {
          const value = minValue + ((maxValue - minValue) / 4) * i;
          const y = yScale(value);
          return (
            <g key={i}>
              <line
                x1={padding.left}
                y1={y}
                x2={padding.left + chartWidth}
                y2={y}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
              <text
                x={padding.left - 10}
                y={y + 4}
                textAnchor="end"
                fontSize="12"
                fill="#6b7280"
              >
                ${(value / 1000).toFixed(0)}k
              </text>
            </g>
          );
        })}

        {/* Zero line */}
        <line
          x1={xScale(0)}
          y1={padding.top}
          x2={xScale(0)}
          y2={padding.top + chartHeight}
          stroke="#d1d5db"
          strokeWidth="2"
          strokeDasharray="4 2"
        />

        {/* Unhedged portfolio line */}
        <path
          d={createPath(unhedgedValues)}
          fill="none"
          stroke="#000000"
          strokeWidth={selectedHedges.has(null) ? 5 : 2}
          strokeDasharray="4 2"
          opacity={selectedHedges.size === 0 ? 1 : selectedHedges.has(null) ? 1 : 0.2}
        />

        {/* Hedged portfolio lines */}
        {hedgedValues.map((values, i) => (
          <path
            key={i}
            d={createPath(values)}
            fill="none"
            stroke={colors[i]}
            strokeWidth={selectedHedges.has(i) ? 5 : 2}
            opacity={selectedHedges.size === 0 ? 1 : selectedHedges.has(i) ? 1 : 0.2}
          />
        ))}

        {/* Interactive hover elements */}
        {currentValues && (
          <g>
            {/* Vertical line */}
            <line
              x1={xScale(currentValues.marketMove)}
              y1={padding.top}
              x2={xScale(currentValues.marketMove)}
              y2={padding.top + chartHeight}
              stroke="#ef4444"
              strokeWidth="2"
              opacity="0.8"
            />
            
            {/* Unhedged point */}
            <circle
              cx={xScale(currentValues.marketMove)}
              cy={yScale(currentValues.unhedgedValue)}
              r="5"
              fill="#9ca3af"
              stroke="white"
              strokeWidth="2"
            />
            
            {/* Hedged points */}
            {currentValues.hedgedValues.map((value, i) => (
              <circle
                key={i}
                cx={xScale(currentValues.marketMove)}
                cy={yScale(value)}
                r="5"
                fill={colors[i]}
                stroke="white"
                strokeWidth="2"
              />
            ))}
          </g>
        )}

        {/* Axis labels */}
        <text
          x={width / 2}
          y={height - 15}
          textAnchor="middle"
          fontSize="14"
          fontWeight="500"
          fill="#374151"
        >
          Market Movement (%)
        </text>

        <text
          x={25}
          y={height / 2}
          textAnchor="middle"
          fontSize="14"
          fontWeight="500"
          fill="#374151"
          transform={`rotate(-90, 25, ${height / 2})`}
        >
          Portfolio Value ($)
        </text>
      </svg>

      {/* Values display - always visible */}
      <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="text-center mb-3">
          <span className="text-sm text-blue-600 font-medium">
            {currentValues ? `Market Move: ${currentValues.marketMove > 0 ? '+' : ''}${currentValues.marketMove.toFixed(1)}%` : 'Hover over chart to see values'}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center bg-slate-100 rounded-lg p-3">
            <div className="text-xs text-slate-500 mb-1">No Protection</div>
            <div className="font-bold text-slate-700 text-lg">
              {currentValues ? `$${currentValues.unhedgedValue.toLocaleString()}` : 'Hover to see'}
            </div>
            <div className="text-xs text-slate-400 mt-1">Baseline</div>
          </div>
          {hedges.map((hedge, i) => {
            const difference = currentValues ? currentValues.hedgedValues[i] - currentValues.unhedgedValue : 0;
            const isPositive = difference > 0;
            const isNegative = difference < 0;
            
            // Calculate ranking among all hedges
            const allValues = currentValues ? currentValues.hedgedValues : [];
            const sortedValues = [...allValues].sort((a, b) => b - a);
            const currentValue = currentValues ? currentValues.hedgedValues[i] : 0;
            const rank = sortedValues.indexOf(currentValue) + 1;
            
            return (
              <div key={i} className={`text-center rounded-lg p-3 border-2 ${
                isPositive ? 'bg-green-50 border-green-200' : 
                isNegative ? 'bg-red-50 border-red-200' : 
                'bg-slate-50 border-slate-200'
              }`}>
                <div className="text-xs text-slate-500 mb-1">{hedge.name}</div>
                <div className="font-bold text-lg" style={{ color: colors[i] }}>
                  {currentValues ? `$${currentValues.hedgedValues[i].toLocaleString()}` : 'Hover to see'}
                </div>
                <div className={`text-xs font-semibold mt-1 ${
                  isPositive ? 'text-green-600' : 
                  isNegative ? 'text-red-600' : 
                  'text-slate-500'
                }`}>
                  {currentValues ? (
                    <>
                      {isPositive ? '+' : ''}${difference.toLocaleString()}
                      <div className="text-xs mt-1">
                        {isPositive ? `#${rank} Best` : isNegative ? 'Worse than baseline' : 'Same as baseline'}
                      </div>
                    </>
                  ) : 'Hover to see'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}