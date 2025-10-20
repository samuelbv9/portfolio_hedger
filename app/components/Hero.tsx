import { Shield, TrendingDown, ArrowRight, Sparkles } from "lucide-react";

interface HeroProps {
  onExploreDemo: () => void;
}

export default function Hero({ onExploreDemo }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-blue-800 to-indigo-900 text-white">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]" />
      
      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-400/20 via-transparent to-indigo-400/20" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-blue-500/10 to-transparent" />
      </div>
      
      {/* Subtle floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-indigo-400/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-slate-400/5 rounded-full blur-lg animate-pulse" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-sm font-medium">Interactive Portfolio Protection</span>
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-full p-6 shadow-2xl">
              <Shield className="w-16 h-16 text-white" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-tight">
            Portfolio Shield
          </h1>

          {/* Subheadline */}
          <p className="text-2xl sm:text-3xl mb-6 text-blue-100 font-semibold">
            Protect your portfolio from market crashes
          </p>

          {/* Description */}
          <p className="text-xl mb-12 text-blue-50 max-w-3xl mx-auto leading-relaxed">
            Discover how put options can shield your investments. See real examples, calculate your own scenarios, and understand the costs. 
            <span className="text-yellow-200 font-semibold"> Start exploring below.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button
              className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 hover:from-yellow-300 hover:to-orange-400 text-xl px-10 py-6 shadow-2xl rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
              onClick={onExploreDemo}
            >
              <span className="flex items-center gap-3">
                Try the Demo
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button
              className="group border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 text-xl px-10 py-6 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="flex items-center gap-3">
                Learn How It Works
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 text-blue-200">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm font-medium">Free to use</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-sm font-medium">No signup required</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-sm font-medium">Educational tool</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent" />
    </section>
  );
}