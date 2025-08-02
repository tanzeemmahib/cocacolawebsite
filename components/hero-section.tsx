"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const bottleRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const bubblesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // Logo fade in
    tl.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "back.out(1.7)" },
    )

    // Bottle spin in
    tl.fromTo(
      bottleRef.current,
      { opacity: 0, rotation: -180, x: 200 },
      { opacity: 1, rotation: 0, x: 0, duration: 2, ease: "power3.out" },
      "-=1",
    )

    // Tagline bounce
    tl.fromTo(taglineRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "bounce.out" }, "-=0.5")

    // Continuous bubble animation
    gsap.to(bubblesRef.current?.children || [], {
      y: -100,
      opacity: 0,
      duration: 3,
      stagger: 0.2,
      repeat: -1,
      ease: "power2.out",
    })
  }, [])

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-red-600 via-red-700 to-black overflow-hidden"
    >
      {/* Animated Background Bubbles */}
      <div ref={bubblesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: "-20px",
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Logo */}
        <div ref={logoRef} className="mb-8">
          <div className="inline-block p-6 bg-white rounded-full shadow-2xl">
            <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-4xl">C</span>
            </div>
          </div>
        </div>

        {/* Bottle */}
        <div ref={bottleRef} className="mb-8">
          <div className="w-32 h-48 mx-auto bg-gradient-to-b from-green-200 to-green-400 rounded-t-full rounded-b-lg relative shadow-2xl">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-8 h-6 bg-red-600 rounded-t-lg"></div>
            <div className="absolute inset-4 bg-gradient-to-b from-red-600 to-red-800 rounded-t-full rounded-b-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs transform -rotate-12">Coca-Cola</span>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div ref={taglineRef}>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 drop-shadow-2xl">
            Open
            <span className="block text-yellow-300">Happiness</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Experience the timeless taste that has brought joy to billions for over 135 years
          </p>
          <Button
            size="lg"
            className="bg-white text-red-600 hover:bg-red-50 text-xl px-8 py-4 rounded-full font-bold shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Explore Our Story
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
