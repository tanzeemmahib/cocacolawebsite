"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CinematicHero } from "@/components/cinematic-hero"
import { GlowingTimeline } from "@/components/glowing-timeline"
import { SecretFormula } from "@/components/secret-formula"
import { GlobalImpact } from "@/components/global-impact"
import { BottleGallery } from "@/components/bottle-gallery"
import { Sustainability } from "@/components/sustainability"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { Bottle3DViewer } from "@/components/bottle-3d-viewer"
import { FloatingCansBackground } from "@/components/floating-cans-background"
import { EnhancedAnimatedBackground } from "@/components/enhanced-animated-background"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HomePage() {
  const mainRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoaded || typeof window === "undefined") return

    try {
      // Smooth scroll to top on load
      window.scrollTo({ top: 0, behavior: "smooth" })

      // Global scroll animations with safety checks
      const initializeScrollAnimations = () => {
        const sections = document.querySelectorAll("section")
        if (sections && sections.length > 0) {
          sections.forEach((section, index) => {
            if (section) {
              gsap.fromTo(
                section,
                { opacity: 0.8, y: 50 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 1,
                  scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                  },
                },
              )
            }
          })
        }

        // Refresh ScrollTrigger after setup
        ScrollTrigger.refresh()
      }

      // Delay initialization to ensure all components are mounted
      const initTimer = setTimeout(initializeScrollAnimations, 1000)

      return () => {
        clearTimeout(initTimer)
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    } catch (error) {
      console.warn("Page animation initialization failed:", error)
    }
  }, [isLoaded])

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-red-900 to-black">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <div className="text-white text-3xl font-bold mb-2">Coca-Cola</div>
          <div className="text-white/70 text-lg">Loading Experience...</div>
        </div>
      </div>
    )
  }

  return (
    <div ref={mainRef} className="relative overflow-x-hidden">
      {/* Multiple Background Layers */}
      <FloatingCansBackground />
      <EnhancedAnimatedBackground />

      {/* Main Content */}
      <Navigation />
      <CinematicHero />
      <GlowingTimeline />
      <SecretFormula />
      <GlobalImpact />
      <BottleGallery />
      <Bottle3DViewer />
      <Sustainability />
      <Footer />
    </div>
  )
}
