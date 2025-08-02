"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const timelineEvents = [
  { year: "1886", event: "Dr. John Pemberton creates Coca-Cola in Atlanta", image: "/vintage-coca-cola-1886.png" },
  { year: "1893", event: "Coca-Cola trademark registered", image: "/coca-cola-trademark-1893.png" },
  { year: "1915", event: "Iconic contour bottle introduced", image: "/coca-cola-1915-bottle.png" },
  { year: "1928", event: "Coca-Cola and Santa Claus partnership begins", image: "/vintage-santa-coca-cola-1928.png" },
  { year: "1971", event: "I'd Like to Buy the World a Coke campaign", image: "/world-unity-1971.png" },
  { year: "1985", event: "New Coke introduced (and quickly changed back)", image: "/new-coke-1985.png" },
  { year: "2024", event: "Coca-Cola continues to refresh the world", image: "/modern-coca-cola-2024.png" },
]

export function HistoryTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const items = timelineRef.current?.querySelectorAll(".timeline-item")

      items?.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: index % 2 === 0 ? -100 : 100 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        )
      })
    }
  }, [])

  return (
    <section id="history" className="py-20 bg-gradient-to-b from-black to-red-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">Our Timeless Journey</h2>
          <p className="text-xl text-white/80">From a small pharmacy to a global icon</p>
        </div>

        <div ref={timelineRef} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-red-600"></div>

          {timelineEvents.map((event, index) => (
            <div
              key={event.year}
              className={`timeline-item flex items-center mb-16 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <h3 className="text-3xl font-bold text-red-400 mb-2">{event.year}</h3>
                  <p className="text-white text-lg">{event.event}</p>
                </div>
              </div>

              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full border-4 border-white"></div>

              <div className={`w-1/2 ${index % 2 === 0 ? "pl-8" : "pr-8"}`}>
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={`Coca-Cola ${event.year}`}
                  className="w-full h-48 object-cover rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
