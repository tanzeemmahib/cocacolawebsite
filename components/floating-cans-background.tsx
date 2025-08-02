"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

interface FloatingCan {
  id: number
  x: number
  y: number
  rotation: number
  scale: number
  speed: number
  direction: number
  opacity: number
}

export function FloatingCansBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [cans, setCans] = useState<FloatingCan[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    // Create floating cans with more variety
    const createCans = () => {
      const newCans: FloatingCan[] = []
      const canCount = 12 // Increased for more immersion

      for (let i = 0; i < canCount; i++) {
        newCans.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          rotation: Math.random() * 360,
          scale: 0.2 + Math.random() * 0.6, // More size variety
          speed: 0.3 + Math.random() * 1.2,
          direction: Math.random() * Math.PI * 2,
          opacity: 0.1 + Math.random() * 0.15, // Varied opacity
        })
      }

      setCans(newCans)
    }

    createCans()

    // Enhanced animation system (no sparkles)
    const animateCans = () => {
      if (!containerRef.current) return

      const canElements = containerRef.current.querySelectorAll(".floating-can")

      canElements.forEach((canElement, index) => {
        if (canElement && cans[index]) {
          const can = cans[index]

          // Main floating animation
          gsap.to(canElement, {
            x: `+=${Math.cos(can.direction) * can.speed}`,
            y: `+=${Math.sin(can.direction) * can.speed}`,
            rotation: `+=${can.speed * 0.3}`,
            duration: 0.1,
            ease: "none",
            repeat: -1,
            onUpdate: () => {
              // Wrap around screen edges
              const rect = canElement.getBoundingClientRect()
              if (rect.left > window.innerWidth + 100) {
                gsap.set(canElement, { x: -200 })
              }
              if (rect.right < -100) {
                gsap.set(canElement, { x: window.innerWidth + 200 })
              }
              if (rect.top > window.innerHeight + 100) {
                gsap.set(canElement, { y: -200 })
              }
              if (rect.bottom < -100) {
                gsap.set(canElement, { y: window.innerHeight + 200 })
              }
            },
          })

          // Enhanced bobbing motion
          gsap.to(canElement, {
            y: `+=${15 + Math.random() * 25}`,
            duration: 4 + Math.random() * 3,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: Math.random() * 3,
          })

          // Rotation animation
          gsap.to(canElement, {
            rotation: `+=${360}`,
            duration: 25 + Math.random() * 15,
            repeat: -1,
            ease: "none",
          })

          // Scale pulsing
          gsap.to(canElement, {
            scale: `+=${0.1}`,
            duration: 3 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: Math.random() * 2,
          })

          // Opacity flickering for depth
          gsap.to(canElement, {
            opacity: can.opacity + 0.1,
            duration: 2 + Math.random() * 3,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: Math.random() * 4,
          })
        }
      })
    }

    if (cans.length > 0) {
      const animationTimer = setTimeout(animateCans, 100)
      return () => clearTimeout(animationTimer)
    }
  }, [isLoaded, cans])

  if (!isLoaded) return null

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {cans.map((can) => (
        <div
          key={can.id}
          className="floating-can absolute"
          style={{
            left: can.x,
            top: can.y,
            transform: `scale(${can.scale}) rotate(${can.rotation}deg)`,
            opacity: can.opacity,
            filter: "blur(0.5px) drop-shadow(0 5px 15px rgba(254, 0, 0, 0.2))",
          }}
        >
          <img src="/coca-cola-can-realistic.png" alt="Floating Coca-Cola Can" className="w-24 h-auto" />
        </div>
      ))}
    </div>
  )
}
