"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { CocaColaCan3D } from "./coca-cola-can-3d"
import { AnimatedText } from "./animated-text"

export function CinematicHero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const canContainerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const realCanRef = useRef<HTMLDivElement>(null)
  const backgroundCanRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [particlesCreated, setParticlesCreated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoaded || particlesCreated) return

    const createParticles = () => {
      try {
        const particleContainer = particlesRef.current
        if (!particleContainer) return

        // Clear existing particles
        particleContainer.innerHTML = ""

        // Create fizz particles (no sparkles)
        for (let i = 0; i < 50; i++) {
          const particle = document.createElement("div")
          particle.className = "absolute w-1 h-1 bg-white rounded-full opacity-70"
          particle.style.left = `${Math.random() * 100}%`
          particle.style.top = `${Math.random() * 100}%`
          particle.style.pointerEvents = "none"
          particleContainer.appendChild(particle)

          gsap.to(particle, {
            y: -window.innerHeight,
            x: `+=${Math.random() * 200 - 100}`,
            opacity: 0,
            duration: Math.random() * 3 + 2,
            repeat: -1,
            delay: Math.random() * 2,
            ease: "power2.out",
          })
        }

        setParticlesCreated(true)
      } catch (error) {
        console.warn("Particle creation failed:", error)
        setParticlesCreated(true)
      }
    }

    const initializeAnimations = () => {
      try {
        const tl = gsap.timeline()

        // Background can dramatic entrance
        if (backgroundCanRef.current) {
          tl.fromTo(
            backgroundCanRef.current,
            {
              scale: 0.3,
              rotation: -90,
              opacity: 0,
              y: 300,
              filter: "blur(10px)",
            },
            {
              scale: 1,
              rotation: 0,
              opacity: 0.8,
              y: 0,
              filter: "blur(0px)",
              duration: 3,
              ease: "elastic.out(1, 0.3)",
              delay: 0.2,
            },
          )
        }

        // Enhanced Logo entrance with multiple layers
        if (logoRef.current) {
          const logoMain = logoRef.current.querySelector(".logo-main")
          const logoHighlight = logoRef.current.querySelector(".logo-highlight")
          const shimmerOverlay = logoRef.current.querySelector(".shimmer-overlay")

          // Main logo entrance
          tl.fromTo(
            logoMain,
            {
              scale: 0.3,
              opacity: 0,
              y: 200,
              rotationY: 180,
              filter:
                "brightness(0) saturate(100%) invert(12%) sepia(100%) saturate(7500%) hue-rotate(0deg) brightness(100%) contrast(100%) drop-shadow(0 0 0px #fe0000)",
            },
            {
              scale: 1,
              opacity: 1,
              y: 0,
              rotationY: 0,
              filter:
                "brightness(0) saturate(100%) invert(12%) sepia(100%) saturate(7500%) hue-rotate(0deg) brightness(100%) contrast(100%) drop-shadow(0 0 50px #fe0000) drop-shadow(0 0 100px #fe0000)",
              duration: 3,
              ease: "elastic.out(1, 0.5)",
              delay: 1,
            },
            "-=2",
          )

          // Highlight flash effect
          tl.to(
            logoHighlight,
            {
              opacity: 0.8,
              duration: 0.3,
              ease: "power2.out",
            },
            "-=0.5",
          ).to(logoHighlight, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          })

          // Shimmer effect
          tl.to(
            shimmerOverlay,
            {
              x: "200%",
              duration: 1.5,
              ease: "power2.out",
            },
            "-=1",
          )
        }

        // Real can entrance animation
        if (realCanRef.current) {
          tl.fromTo(
            realCanRef.current,
            { scale: 0, rotation: -180, opacity: 0, y: 200 },
            {
              scale: 1,
              rotation: 0,
              opacity: 1,
              y: 0,
              duration: 2.5,
              ease: "elastic.out(1, 0.5)",
              delay: 0.8,
            },
            "-=2",
          )
        }

        // 3D Can entrance animation
        if (canContainerRef.current) {
          tl.fromTo(
            canContainerRef.current,
            { scale: 0, rotation: 360, opacity: 0 },
            {
              scale: 1,
              rotation: 0,
              opacity: 1,
              duration: 2,
              ease: "elastic.out(1, 0.5)",
              delay: 1.2,
            },
            "-=2",
          )
        }

        // CTA button entrance
        if (ctaRef.current) {
          tl.fromTo(
            ctaRef.current,
            { y: 100, opacity: 0, scale: 0.8 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 1.5,
              ease: "back.out(1.7)",
            },
            "-=0.5",
          )
        }

        // Continuous animations after entrance
        setTimeout(() => {
          // Background can floating animation
          if (backgroundCanRef.current) {
            gsap.to(backgroundCanRef.current, {
              y: "+=30",
              rotation: "+=10",
              duration: 6,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
            })

            // Pulsing glow effect
            gsap.to(backgroundCanRef.current, {
              filter: "drop-shadow(0 0 50px rgba(254, 0, 0, 0.5))",
              duration: 3,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
            })
          }

          // Enhanced Logo continuous animations
          if (logoRef.current) {
            const logoMain = logoRef.current.querySelector(".logo-main")
            const logoHighlight = logoRef.current.querySelector(".logo-highlight")
            const shimmerOverlay = logoRef.current.querySelector(".shimmer-overlay")

            // Continuous glow pulsing
            gsap.to(logoMain, {
              filter:
                "brightness(0) saturate(100%) invert(12%) sepia(100%) saturate(7500%) hue-rotate(0deg) brightness(100%) contrast(100%) drop-shadow(0 0 80px #fe0000) drop-shadow(0 0 160px #fe0000) drop-shadow(0 0 240px #fe0000)",
              duration: 4,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
            })

            // Subtle floating animation
            gsap.to(logoMain, {
              y: "+=15",
              duration: 6,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
            })

            // Periodic highlight flashes
            gsap.to(logoHighlight, {
              opacity: 0.6,
              duration: 0.2,
              repeat: -1,
              repeatDelay: 8,
              yoyo: true,
              ease: "power2.inOut",
            })

            // Continuous shimmer effect
            gsap.to(shimmerOverlay, {
              x: "200%",
              duration: 3,
              repeat: -1,
              repeatDelay: 5,
              ease: "power2.inOut",
            })

            // Scale breathing effect
            gsap.to(logoMain, {
              scale: 1.05,
              duration: 8,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
            })

            // Color transition effects
            gsap.to(logoMain, {
              filter:
                "brightness(0) saturate(100%) invert(12%) sepia(100%) saturate(7500%) hue-rotate(15deg) brightness(110%) contrast(110%) drop-shadow(0 0 60px #ff3333) drop-shadow(0 0 120px #fe0000)",
              duration: 10,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
            })
          }

          // Real can floating animation
          if (realCanRef.current) {
            gsap.to(realCanRef.current, {
              y: "+=25",
              rotation: "+=15",
              duration: 5,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
            })
          }

          // 3D can container floating
          if (canContainerRef.current) {
            gsap.to(canContainerRef.current, {
              y: "+=20",
              duration: 4,
              repeat: -1,
              yoyo: true,
              ease: "power2.inOut",
            })
          }
        }, 4000)

        // Continuous background animation
        if (heroRef.current) {
          gsap.to(heroRef.current, {
            backgroundPosition: "200% 200%",
            duration: 25,
            repeat: -1,
            ease: "none",
          })
        }
      } catch (error) {
        console.warn("Hero animation initialization failed:", error)
      }
    }

    createParticles()
    initializeAnimations()
  }, [isLoaded, particlesCreated])

  const scrollToNext = () => {
    try {
      const historySection = document.getElementById("history")
      if (historySection) {
        historySection.scrollIntoView({ behavior: "smooth" })
      }
    } catch (error) {
      console.warn("Scroll to history failed:", error)
    }
  }

  if (!isLoaded) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-red-900 to-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-2xl font-bold">Loading Coca-Cola Experience...</div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 80%, #fe0000 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, #8B0000 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, #fe0000 0%, transparent 50%),
          linear-gradient(135deg, #000000 0%, #1a0000 50%, #000000 100%)
        `,
        backgroundSize: "400% 400%",
      }}
    >
      {/* Fizz Particles (no sparkles) */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none overflow-hidden z-10" />

      {/* Animated Coke Liquid Waves */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-32 bg-gradient-to-r from-transparent via-red-600 to-transparent wave-animation"
            style={{
              bottom: `${i * 15}%`,
              animationDelay: `${i * 0.3}s`,
              transform: `rotate(${i * 3}deg)`,
              opacity: 0.3 - i * 0.03,
            }}
          />
        ))}
      </div>

      {/* Giant Background Coca-Cola Can behind logo */}
      <div
        ref={backgroundCanRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
        style={{ transform: "scale(1.2)" }}
      >
        <img
          src="/coca-cola-can-realistic.png"
          alt="Giant Background Coca-Cola Can"
          className="w-96 md:w-[600px] lg:w-[800px] h-auto opacity-80"
          style={{
            filter: "drop-shadow(0 30px 60px rgba(254, 0, 0, 0.4))",
            mixBlendMode: "multiply",
          }}
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-20">
        {/* Realistic Coca-Cola Can - Top Right */}
        <div ref={realCanRef} className="absolute top-20 right-10 md:right-20">
          <img
            src="/coca-cola-can-realistic.png"
            alt="Coca-Cola Can"
            className="w-32 md:w-48 h-auto drop-shadow-2xl"
            style={{
              filter: "drop-shadow(0 20px 40px rgba(254, 0, 0, 0.3))",
            }}
          />
        </div>

        {/* Another realistic can on the left with more animation */}
        <div className="absolute top-40 left-10 md:left-20" style={{ transform: "rotate(-15deg)" }}>
          <img
            src="/coca-cola-can-realistic.png"
            alt="Coca-Cola Can"
            className="w-24 md:w-36 h-auto drop-shadow-2xl opacity-80 animate-pulse"
            style={{
              filter: "drop-shadow(0 15px 30px rgba(254, 0, 0, 0.2))",
              animation: "float 4s ease-in-out infinite",
            }}
          />
        </div>

        {/* Bottom floating cans */}
        <div className="absolute bottom-20 right-20 opacity-60" style={{ transform: "rotate(30deg)" }}>
          <img
            src="/coca-cola-can-realistic.png"
            alt="Coca-Cola Can"
            className="w-20 md:w-28 h-auto drop-shadow-xl"
            style={{
              animation: "float 5s ease-in-out infinite reverse",
            }}
          />
        </div>

        <div className="absolute bottom-32 left-16 opacity-50" style={{ transform: "rotate(-45deg)" }}>
          <img
            src="/coca-cola-can-realistic.png"
            alt="Coca-Cola Can"
            className="w-16 md:w-24 h-auto drop-shadow-xl"
            style={{
              animation: "float 6s ease-in-out infinite",
            }}
          />
        </div>

        {/* 3D Coca-Cola Can */}
        <div ref={canContainerRef} className="w-64 h-64 mx-auto mb-8 relative z-30">
          <CocaColaCan3D scale={1.5} animated={true} />
          {/* Glow effect around 3D can */}
          <div className="absolute inset-0 bg-red-600 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        </div>

        {/* Epic Coca-Cola Logo with multiple animation layers */}
        <div ref={logoRef} className="relative z-10 mb-6">
          {/* Main logo with multiple effect layers */}
          <div className="relative">
            {/* Background glow layer 1 */}
            <img
              src="/coca-cola-logo-black-white.png"
              alt="Coca-Cola Logo Glow"
              className="absolute inset-0 w-96 md:w-[600px] lg:w-[800px] h-auto mx-auto opacity-30 blur-xl"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(12%) sepia(100%) saturate(7500%) hue-rotate(0deg) brightness(100%) contrast(100%) drop-shadow(0 0 100px #fe0000)",
              }}
            />

            {/* Background glow layer 2 */}
            <img
              src="/coca-cola-logo-black-white.png"
              alt="Coca-Cola Logo Glow"
              className="absolute inset-0 w-96 md:w-[600px] lg:w-[800px] h-auto mx-auto opacity-20 blur-2xl"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(12%) sepia(100%) saturate(7500%) hue-rotate(0deg) brightness(100%) contrast(100%) drop-shadow(0 0 200px #fe0000)",
              }}
            />

            {/* Main logo with red coloring and effects */}
            <img
              src="/coca-cola-logo-black-white.png"
              alt="Coca-Cola Logo"
              className="relative w-96 md:w-[600px] lg:w-[800px] h-auto mx-auto drop-shadow-2xl logo-main"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(12%) sepia(100%) saturate(7500%) hue-rotate(0deg) brightness(100%) contrast(100%) drop-shadow(0 0 50px #fe0000) drop-shadow(0 0 100px #fe0000)",
              }}
            />

            {/* Animated highlight overlay */}
            <img
              src="/coca-cola-logo-black-white.png"
              alt="Coca-Cola Logo Highlight"
              className="absolute inset-0 w-96 md:w-[600px] lg:w-[800px] h-auto mx-auto opacity-0 logo-highlight"
              style={{
                filter:
                  "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%) drop-shadow(0 0 30px #ffffff)",
              }}
            />

            {/* Shimmer effect overlay */}
            <div className="absolute inset-0 w-96 md:w-[600px] lg:w-[800px] h-auto mx-auto overflow-hidden rounded-lg">
              <div className="shimmer-overlay absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full"></div>
            </div>
          </div>
        </div>

        <AnimatedText
          effect="typewriter"
          duration={3}
          delay={3}
          className="text-3xl md:text-5xl font-bold text-yellow-300 mb-4 drop-shadow-lg"
        >
          Open Happiness
        </AnimatedText>

        <AnimatedText effect="fade" duration={1.5} delay={5} className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
          Experience the timeless taste that has brought joy to billions across 200+ countries for over 138 years. From
          a small pharmacy in Atlanta to the world's most beloved beverage.
        </AnimatedText>

        <div ref={ctaRef} className="space-y-4">
          <Button
            size="lg"
            onClick={scrollToNext}
            className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white text-xl px-12 py-6 rounded-full font-bold shadow-2xl hover:scale-110 transition-all duration-300 border-2 border-white/20 relative overflow-hidden"
          >
            <span className="relative z-10">Discover Our Legacy</span>
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 opacity-0 hover:opacity-30 transition-opacity duration-300"></div>
          </Button>

          <div className="flex justify-center space-x-4 mt-6">
            <div className="text-center bg-black/30 backdrop-blur-sm rounded-lg p-4 hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold text-red-400">1.9B</div>
              <div className="text-white/70 text-sm">Daily Servings</div>
            </div>
            <div className="text-center bg-black/30 backdrop-blur-sm rounded-lg p-4 hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold text-red-400">200+</div>
              <div className="text-white/70 text-sm">Countries</div>
            </div>
            <div className="text-center bg-black/30 backdrop-blur-sm rounded-lg p-4 hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold text-red-400">138</div>
              <div className="text-white/70 text-sm">Years</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div
          className="w-8 h-12 border-2 border-white rounded-full flex justify-center relative overflow-hidden cursor-pointer hover:scale-110 transition-transform duration-300"
          onClick={scrollToNext}
        >
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-600 opacity-30"></div>
          {/* Glow effect */}
          <div className="absolute inset-0 border-2 border-red-600 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
    </section>
  )
}
