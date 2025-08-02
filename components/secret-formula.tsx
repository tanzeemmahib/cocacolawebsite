"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"

const secretFacts = [
  "Only 2 people know the complete formula at any time",
  "The recipe is stored in a vault in Atlanta",
  "The original formula contained cocaine (removed in 1903)",
  "Natural vanilla and cinnamon are key ingredients",
  "The exact blend of oils remains a mystery",
]

export function SecretFormula() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const vaultRef = useRef<HTMLDivElement>(null)
  const canRef = useRef<HTMLDivElement>(null)
  const [showFacts, setShowFacts] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Vault shimmer animation
      if (vaultRef.current) {
        gsap.to(vaultRef.current, {
          boxShadow: "0 0 50px #fe0000, 0 0 100px #fe0000, 0 0 150px #fe0000",
          duration: 2,
          repeat: -1,
          yoyo: true,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            end: "bottom 50%",
            toggleActions: "play none none pause",
          },
        })
      }

      // Floating can animation
      if (canRef.current) {
        gsap.to(canRef.current, {
          y: "+=15",
          rotation: "+=10",
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
        })
      }

      // Facts bubble animation
      if (showFacts) {
        gsap.fromTo(
          ".fact-bubble",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, stagger: 0.2, ease: "back.out(1.7)" },
        )
      }
    }
  }, [showFacts])

  return (
    <section
      id="formula"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-red-900 to-black relative overflow-hidden"
    >
      {/* Floating realistic can */}
      <div
        ref={canRef}
        className="absolute top-10 right-10 opacity-30 pointer-events-none"
        style={{ transform: "rotate(25deg)" }}
      >
        <img src="/coca-cola-can-realistic.png" alt="Floating Coca-Cola Can" className="w-20 h-auto drop-shadow-xl" />
      </div>

      {/* Another floating can */}
      <div
        className="absolute bottom-20 left-10 opacity-20 pointer-events-none"
        style={{ transform: "rotate(-30deg)" }}
      >
        <img src="/coca-cola-can-realistic.png" alt="Floating Coca-Cola Can" className="w-16 h-auto drop-shadow-xl" />
      </div>

      {/* Floating bubbles background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-5xl font-bold text-white mb-8">The Secret Formula</h2>
        <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto">
          For over 135 years, the world's most guarded recipe has remained a mystery
        </p>

        {/* Vault */}
        <div
          ref={vaultRef}
          className="w-64 h-64 mx-auto mb-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300 border-8 border-red-600"
          onClick={() => setShowFacts(!showFacts)}
        >
          <div className="text-center">
            <div className="text-6xl mb-2">🔒</div>
            <p className="text-white font-bold">TOP SECRET</p>
            <p className="text-red-400 text-sm">Click to reveal facts</p>
          </div>
        </div>

        {/* Secret Facts */}
        {showFacts && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {secretFacts.map((fact, index) => (
              <div
                key={index}
                className="fact-bubble bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-3xl mb-3">💡</div>
                <p className="text-white">{fact}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white bg-transparent"
          >
            Learn More About Our Heritage
          </Button>
        </div>
      </div>
    </section>
  )
}
