"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

const globalStats = [
  { number: "200+", label: "Countries & Territories", icon: "🌍" },
  { number: "1.9B", label: "Servings Per Day", icon: "🥤" },
  { number: "500+", label: "Brands in Portfolio", icon: "🏷️" },
  { number: "700K+", label: "Employees Worldwide", icon: "👥" },
]

export function GlobalImpact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const [animatedStats, setAnimatedStats] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Map pins animation
      const pins = mapRef.current?.querySelectorAll(".map-pin")
      pins?.forEach((pin, index) => {
        gsap.fromTo(
          pin,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              onEnter: () => setAnimatedStats(true),
            },
          },
        )
      })

      // Stats counter animation
      if (animatedStats) {
        globalStats.forEach((stat, index) => {
          const element = document.querySelector(`#stat-${index}`)
          if (element) {
            gsap.fromTo(
              element,
              { textContent: "0" },
              {
                textContent: stat.number,
                duration: 2,
                delay: index * 0.2,
                ease: "power2.out",
              },
            )
          }
        })
      }
    }
  }, [animatedStats])

  return (
    <section id="impact" ref={sectionRef} className="py-20 bg-gradient-to-b from-black to-red-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">Global Impact</h2>
          <p className="text-xl text-white/80">Refreshing the world, one sip at a time</p>
        </div>

        {/* World Map Visualization */}
        <div
          ref={mapRef}
          className="relative mb-16 h-96 bg-gradient-to-b from-blue-900 to-blue-800 rounded-lg overflow-hidden"
        >
          <img src="/dark-blue-world-silhouette.png" alt="World Map" className="w-full h-full object-cover opacity-50" />

          {/* Animated pins */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="map-pin absolute w-4 h-4 bg-red-600 rounded-full animate-pulse"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                boxShadow: "0 0 20px #fe0000",
              }}
            />
          ))}

          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="text-4xl font-bold text-white drop-shadow-2xl">Available Worldwide</h3>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {globalStats.map((stat, index) => (
            <div
              key={index}
              className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div id={`stat-${index}`} className="text-4xl font-bold text-red-400 mb-2">
                {animatedStats ? stat.number : "0"}
              </div>
              <p className="text-white">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Impact Statement */}
        <div className="text-center mt-16 max-w-4xl mx-auto">
          <div className="bg-red-600/20 backdrop-blur-sm rounded-lg p-8">
            <h3 className="text-3xl font-bold text-white mb-4">More Than Just a Beverage</h3>
            <p className="text-lg text-white/90">
              Coca-Cola has been bringing people together, creating moments of happiness, and supporting communities
              around the world for over a century. From local bottling partners to global sustainability initiatives,
              we're committed to making a positive impact wherever we operate.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
