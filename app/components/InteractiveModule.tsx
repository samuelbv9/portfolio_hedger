"use client";

import { useState } from "react";
import { DemoMode } from "./DemoMode";
import { TryYourselfMode } from "./TryYourselfMode";
import { BarChart3, Calculator } from "lucide-react";

export function InteractiveModule() {
  const [mode, setMode] = useState<"demo" | "custom">("demo");

  return (
    <section id="interactive-module" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 py-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full px-4 py-2 mb-8 border border-blue-200">
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm font-semibold">Portfolio Analysis Tool</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold mb-8 bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent leading-tight py-2">
            Explore Hedging Strategies
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            See example hedge scenarios or input your own portfolio details. 
            <span className="text-blue-600 font-semibold"> Select your preferred approach below.</span>
          </p>
        </div>

        {/* Enhanced mode switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-2xl bg-white shadow-xl border border-slate-200 p-2 backdrop-blur-sm">
            <button
              className={`group flex items-center gap-3 rounded-xl px-8 py-4 text-sm font-semibold transition-all duration-300 ${
                mode === "demo" 
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform scale-105" 
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              }`}
              onClick={() => setMode("demo")}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Demo Mode</span>
            </button>
            <button
              className={`group flex items-center gap-3 rounded-xl px-8 py-4 text-sm font-semibold transition-all duration-300 ${
                mode === "custom" 
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg transform scale-105" 
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              }`}
              onClick={() => setMode("custom")}
            >
              <Calculator className="w-5 h-5" />
              <span>Try Yourself</span>
            </button>
          </div>
        </div>

        {/* Content with enhanced styling */}
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-r from-blue-200/30 to-indigo-200/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
          
          {mode === "demo" ? <DemoMode /> : <TryYourselfMode />}
        </div>
      </div>
    </section>
  );
}