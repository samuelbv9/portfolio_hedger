import { Shield, TrendingDown, DollarSign, ChartBar as BarChart3 } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: DollarSign,
      title: "Input Your Portfolio",
      description: "Enter your portfolio value and desired coverage period. This helps calculate the appropriate hedge size.",
    },
    {
      icon: Shield,
      title: "Choose Protection Level",
      description: "Select from different hedge strategies ranging from aggressive protection to crash-only coverage based on your risk tolerance.",
    },
    {
      icon: TrendingDown,
      title: "Understand Put Options",
      description: "Put options give you the right to sell at a specific price. They increase in value when markets fall, offsetting portfolio losses.",
    },
    {
      icon: BarChart3,
      title: "Visualize Outcomes",
      description: "See how different hedging strategies protect your portfolio across various market scenarios with interactive charts.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900">
            How It Works
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Learn how to protect your portfolio with put options in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-slate-200">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-sm font-semibold text-blue-600 mb-2">
                  Step {index + 1}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold mb-6 text-slate-900 text-center">
            Why Hedge Now?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">All-Time Highs</div>
              <p className="text-slate-700">Markets are at elevated levels, increasing downside risk</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">Portfolio Protection</div>
              <p className="text-slate-700">Hedging preserves gains while allowing upside participation</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">Risk Management</div>
              <p className="text-slate-700">Professional strategy used by institutional investors</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
