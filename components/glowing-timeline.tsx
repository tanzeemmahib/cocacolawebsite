"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const historicalEvents = [
  {
    year: "1886",
    title: "The Birth of Coca-Cola",
    description:
      "Dr. John Stith Pemberton, a pharmacist in Atlanta, Georgia, creates the original Coca-Cola formula in his backyard. The syrup was first sold at Jacob's Pharmacy for 5 cents a glass.",
    image: "/vintage-coca-cola-1886.png",
    facts: [
      "Originally contained cocaine from coca leaves",
      "First year sales: 9 drinks per day",
      "Cost 5 cents per glass",
    ],
  },
  {
    year: "1887",
    title: "First Advertisement",
    description:
      "Asa Griggs Candler acquires the Coca-Cola formula and begins aggressive marketing. The first newspaper ad appears in The Atlanta Journal.",
    image: "/coca-cola-trademark-1893.png",
    facts: ["First ad budget: $150", "Candler bought the formula for $2,300", "Free sample coupons distributed"],
  },
  {
    year: "1893",
    title: "Trademark Registration",
    description:
      "The Coca-Cola trademark is officially registered. The distinctive Spencerian script logo is created, which remains largely unchanged today.",
    image: "/coca-cola-trademark-1893.png",
    facts: [
      "Logo designed by Frank Mason Robinson",
      "Spencerian script chosen for distinctiveness",
      "First international trademark",
    ],
  },
  {
    year: "1899",
    title: "Bottling Revolution",
    description:
      "Benjamin Thomas and Joseph Whitehead secure bottling rights for $1. This decision transforms Coca-Cola from a fountain drink to a portable beverage.",
    image: "/coca-cola-1915-bottle.png",
    facts: [
      "Bottling rights sold for just $1",
      "First bottling plant in Chattanooga",
      "Revolutionized beverage distribution",
    ],
  },
  {
    year: "1915",
    title: "The Iconic Contour Bottle",
    description:
      "The Root Glass Company designs the distinctive contour bottle. The design is so unique it can be recognized by touch alone or when broken.",
    image: "/coca-cola-1915-bottle.png",
    facts: [
      "Inspired by coca bean and kola nut",
      "Patented design prevents imitation",
      "Recognizable even in the dark",
    ],
  },
  {
    year: "1928",
    title: "Santa Claus Partnership",
    description:
      "Artist Haddon Sundblom creates the modern image of Santa Claus for Coca-Cola advertisements, establishing the red-suited, jolly figure we know today.",
    image: "/vintage-santa-coca-cola-1928.png",
    facts: ["Sundblom painted Santa for 33 years", "Helped standardize Santa's appearance", "Campaign ran until 1964"],
  },
  {
    year: "1955",
    title: "Global Expansion Accelerates",
    description:
      "Coca-Cola becomes available in over 100 countries. The company introduces different bottle sizes including the King Size.",
    image: "/coca-cola-1955-king-size.png",
    facts: ["Available in 100+ countries", "King Size bottle introduced", "Post-war global expansion"],
  },
  {
    year: "1971",
    title: "I'd Like to Buy the World a Coke",
    description:
      "The famous 'Hilltop' commercial airs, featuring young people from around the world singing on an Italian hilltop. It becomes one of the most beloved ads ever.",
    image: "/world-unity-1971.png",
    facts: ["Filmed on Italian hilltop", "Song reached #7 on Billboard", "Symbol of global unity"],
  },
  {
    year: "1985",
    title: "New Coke Controversy",
    description:
      "Coca-Cola changes its formula for the first time in 99 years. Public outcry is so intense that the original formula returns as 'Coca-Cola Classic' after 79 days.",
    image: "/new-coke-1985.png",
    facts: ["79 days of public outcry", "400,000 calls and letters of complaint", "Taught the power of brand loyalty"],
  },
  {
    year: "1993",
    title: "Always Coca-Cola Campaign",
    description:
      "The 'Always Coca-Cola' campaign launches, featuring polar bears and becoming one of the longest-running advertising campaigns in Coca-Cola history.",
    image: "/placeholder.svg?height=300&width=400",
    facts: ["Polar bears became iconic mascots", "Campaign lasted over a decade", "Featured in Super Bowl commercials"],
  },
  {
    year: "2009",
    title: "Sustainability Initiative",
    description:
      "Coca-Cola introduces the PlantBottle, made partially from plant materials. The company commits to ambitious environmental goals.",
    image: "/placeholder.svg?height=300&width=400",
    facts: ["First PlantBottle technology", "30% plant-based materials", "Reduced carbon footprint by 25%"],
  },
  {
    year: "2024",
    title: "Digital Innovation Era",
    description:
      "Coca-Cola embraces AI, personalization, and sustainable packaging. The company continues to innovate while maintaining its classic appeal.",
    image: "/modern-coca-cola-2024.png",
    facts: ["AI-powered personalization", "100% recyclable packaging goal", "Digital-first marketing approach"],
  },
]

export function GlowingTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [animationsInitialized, setAnimationsInitialized] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoaded || typeof window === "undefined" || animationsInitialized) return

    const initializeAnimations = () => {
      try {
        // Animate the main timeline line
        if (lineRef.current && timelineRef.current) {
          gsap.fromTo(
            lineRef.current,
            { height: "0%" },
            {
              height: "100%",
              duration: 2,
              ease: "power2.out",
              scrollTrigger: {
                trigger: timelineRef.current,
                start: "top 80%",
                end: "bottom 20%",
                scrub: 1,
              },
            },
          )
        }

        // Animate each timeline item
        const timelineContainer = timelineRef.current
        if (timelineContainer) {
          const items = timelineContainer.querySelectorAll(".timeline-item")

          if (items && items.length > 0) {
            items.forEach((item, index) => {
              if (item) {
                const isEven = index % 2 === 0

                // Main item animation
                gsap.fromTo(
                  item,
                  {
                    opacity: 0,
                    x: isEven ? -200 : 200,
                    scale: 0.8,
                    rotationY: isEven ? -45 : 45,
                  },
                  {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    rotationY: 0,
                    duration: 1.5,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                      trigger: item,
                      start: "top 85%",
                      end: "bottom 15%",
                      toggleActions: "play none none reverse",
                    },
                  },
                )

                // Glow effect on scroll
                gsap.to(item, {
                  boxShadow: "0 0 30px #fe0000, 0 0 60px #fe0000, 0 0 90px #fe0000",
                  duration: 0.5,
                  scrollTrigger: {
                    trigger: item,
                    start: "top 60%",
                    end: "bottom 40%",
                    toggleActions: "play reverse play reverse",
                  },
                })

                // Floating animation
                gsap.to(item, {
                  y: "+=10",
                  duration: 3,
                  repeat: -1,
                  yoyo: true,
                  ease: "power2.inOut",
                  delay: index * 0.2,
                })
              }
            })
          }

          // Animate timeline dots
          const dots = timelineContainer.querySelectorAll(".timeline-dot")
          if (dots && dots.length > 0) {
            dots.forEach((dot, index) => {
              if (dot) {
                gsap.fromTo(
                  dot,
                  { scale: 0, opacity: 0 },
                  {
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.5)",
                    scrollTrigger: {
                      trigger: dot,
                      start: "top 80%",
                      toggleActions: "play none none reverse",
                    },
                  },
                )

                // Pulsing glow effect
                gsap.to(dot, {
                  boxShadow: "0 0 20px #fe0000, 0 0 40px #fe0000",
                  scale: 1.2,
                  duration: 2,
                  repeat: -1,
                  yoyo: true,
                  ease: "power2.inOut",
                  delay: index * 0.3,
                })
              }
            })
          }
        }

        setAnimationsInitialized(true)
      } catch (error) {
        console.warn("Timeline animation initialization failed:", error)
        setAnimationsInitialized(true)
      }
    }

    // Delay initialization to ensure DOM is ready
    const initTimer = setTimeout(initializeAnimations, 500)
    return () => clearTimeout(initTimer)
  }, [isLoaded, animationsInitialized])

  if (!isLoaded) {
    return (
      <section className="py-32 bg-gradient-to-b from-black via-red-950 to-black">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-2xl">Loading Timeline...</div>
        </div>
      </section>
    )
  }

  return (
    <section id="history" className="py-32 bg-gradient-to-b from-black via-red-950 to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-red-500 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-6 bg-gradient-to-r from-red-400 via-red-600 to-red-800 bg-clip-text text-transparent">
            Our Epic Journey
          </h2>
          <p className="text-2xl text-white/80 max-w-3xl mx-auto">
            From a small pharmacy experiment to the world's most beloved beverage - witness 138 years of innovation,
            joy, and global connection
          </p>
        </div>

        <div ref={timelineRef} className="relative max-w-6xl mx-auto">
          {/* Main Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-600 via-red-500 to-red-600 opacity-50">
            <div
              ref={lineRef}
              className="w-full bg-gradient-to-b from-red-400 to-red-600 shadow-lg"
              style={{
                boxShadow: "0 0 20px #fe0000, 0 0 40px #fe0000",
                height: "0%",
              }}
            />
          </div>

          {historicalEvents.map((event, index) => (
            <div
              key={`${event.year}-${index}`}
              className={`timeline-item relative flex items-center mb-24 ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {/* Content Card */}
              <div className={`w-5/12 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"}`}>
                <div className="bg-gradient-to-br from-black/80 to-red-900/30 backdrop-blur-sm rounded-2xl p-8 border border-red-500/30 hover:border-red-400/60 transition-all duration-500 relative overflow-hidden">
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <h3 className="text-4xl font-bold text-red-400 mb-3 bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                      {event.year}
                    </h3>
                    <h4 className="text-2xl font-bold text-white mb-4">{event.title}</h4>
                    <p className="text-white/90 text-lg mb-6 leading-relaxed">{event.description}</p>

                    {/* Facts */}
                    <div className="space-y-2">
                      {event.facts.map((fact, factIndex) => (
                        <div key={`${event.year}-fact-${factIndex}`} className="flex items-center text-red-300 text-sm">
                          <div className="w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse" />
                          {fact}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Dot */}
              <div className="timeline-dot absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-red-500 to-red-700 rounded-full border-4 border-white z-10" />

              {/* Image */}
              <div className={`w-5/12 ${index % 2 === 0 ? "pl-12" : "pr-12"}`}>
                <div className="relative group">
                  <img
                    src={event.image || "/placeholder.svg?height=300&width=400"}
                    alt={`Coca-Cola ${event.year}`}
                    className="w-full h-64 object-cover rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-500 border border-red-500/30"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=300&width=400"
                    }}
                  />

                  {/* Image overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-red-900/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Year overlay */}
                  <div className="absolute bottom-4 left-4 text-white font-bold text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {event.year}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Summary */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-red-900/30 to-black/50 backdrop-blur-sm rounded-2xl p-12 max-w-4xl mx-auto border border-red-500/30">
            <h3 className="text-4xl font-bold text-white mb-6">138 Years of Innovation</h3>
            <p className="text-xl text-white/90 mb-8">
              From a 5-cent fountain drink to a global phenomenon serving 1.9 billion people daily, Coca-Cola's journey
              represents more than business success—it's a story of human connection, innovation, and the simple joy of
              sharing a moment of happiness.
            </p>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-red-400 mb-2">1886</div>
                <div className="text-white/70">Founded</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-400 mb-2">200+</div>
                <div className="text-white/70">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-400 mb-2">1.9B</div>
                <div className="text-white/70">Daily Servings</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-400 mb-2">500+</div>
                <div className="text-white/70">Brands</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
