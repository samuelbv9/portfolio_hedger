'use client'

import { useState } from 'react'
import Hero from './components/Hero'
import { InteractiveModule } from './components/InteractiveModule'
import { HowItWorks } from './components/HowItWorks'
import { Footer } from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero onExploreDemo={() => document.getElementById('interactive-module')?.scrollIntoView({ behavior: 'smooth' })} />
      
      <div id="interactive-module">
        <InteractiveModule />
      </div>
      
      <HowItWorks />
      <Footer />
    </main>
  )
}
