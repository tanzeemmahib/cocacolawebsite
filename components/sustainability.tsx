"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const sustainabilityGoals = [
  {
    title: "World Without Waste",
    description: "Collect and recycle a bottle or can for every one we sell by 2030",
    icon: "♻️",
    progress: 75,
  },
  {
    title: "Water Stewardship",
    description: "Replenish 100% of water used in our beverages",
    icon: "💧",
    progress: 85,
  },
  {
    title: "Sustainable Packaging",
    description: "Make 100% of packaging recyclable by 2025",
    icon: "📦",
    progress: 90,
  },
  {
    title: "Carbon Neutral",
    description: "Achieve net-zero carbon emissions by 2050",
    icon: "🌱",
    progress: 60,
  },
]

export function Sustainability() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cards = sectionRef.current?.querySelectorAll(".sustainability-card")

      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, rotationX: 45 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        )

        // Progress bar animation
        const progressBar = card.querySelector(".progress-bar")
        if (progressBar) {
          gsap.fromTo(
            progressBar,
            { width: "0%" },
            {
              width: `${sustainabilityGoals[index].progress}%`,
              duration: 2,
              delay: index * 0.2 + 0.5,
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
              },
            },
          )
        }
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-black to-green-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">Sustainability Commitment</h2>
          <p className="text-xl text-white/80">Building a better shared future</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {sustainabilityGoals.map((goal, index) => (
            <div
              key={goal.title}
              className="sustainability-card bg-white/10 backdrop-blur-sm rounded-lg p-8 hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">{goal.icon}</span>
                <h3 className="text-2xl font-bold text-white">{goal.title}</h3>
              </div>
              <p className="text-white/80 mb-6">{goal.description}</p>

              {/* Progress Bar */}
              <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                <div
                  className="progress-bar bg-green-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: "0%" }}
                ></div>
              </div>
              <p className="text-green-400 font-bold">{goal.progress}% Complete</p>
            </div>
          ))}
        </div>

        {/* Before/After Comparison */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
          <h3 className="text-3xl font-bold text-white text-center mb-8">Our Progress</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <h4 className="text-xl font-bold text-red-400 mb-4">Before</h4>
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Before sustainability efforts"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-white/80">Traditional packaging with limited recycling</p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-bold text-green-400 mb-4">After</h4>
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="After sustainability efforts"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-white/80">100% recyclable packaging made from recycled materials</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
