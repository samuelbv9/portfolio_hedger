import { AlertTriangle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-amber-400 mb-2 text-lg">
                Educational Tool - Important Disclaimers
              </h3>
              <div className="text-amber-100 space-y-2 text-sm leading-relaxed">
                <p>
                  <strong>Not Financial Advice:</strong> This tool is for educational purposes only and does not constitute financial, investment, or trading advice. Always consult with a qualified financial advisor before making investment decisions.
                </p>
                <p>
                  <strong>Simplified Calculations:</strong> The hedge recommendations use simplified options pricing models and do not account for factors like implied volatility, time decay (theta), dividends, interest rates, or transaction costs. Actual options pricing will vary significantly.
                </p>
                <p>
                  <strong>Risk Warning:</strong> Options trading involves substantial risk and is not suitable for all investors. You can lose more than your initial investment. Past performance does not guarantee future results.
                </p>
                <p>
                  <strong>Market Conditions:</strong> This tool assumes theoretical market conditions. Real markets may behave differently due to liquidity, volatility, and other factors.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-slate-400 text-sm">
          <p className="mb-2">
            © {new Date().getFullYear()} Hedge Helper. Educational tool for portfolio hedging concepts.
          </p>
          <p>
            Always conduct thorough research and consult professionals before implementing any hedging strategy.
          </p>
        </div>
      </div>
    </footer>
  );
}
