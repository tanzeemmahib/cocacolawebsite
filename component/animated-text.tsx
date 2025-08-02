"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { TextPlugin } from "gsap/TextPlugin"

if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin)
}

interface AnimatedTextProps {
  children: string
  className?: string
  delay?: number
  duration?: number
  effect?: "typewriter" | "fade" | "slide" | "glow" | "bounce"
}

export function AnimatedText({
  children,
  className = "",
  delay = 0,
  duration = 1,
  effect = "fade",
}: AnimatedTextProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current || !children) return

    const element = textRef.current

    switch (effect) {
      case "typewriter":
        element.textContent = ""
        gsap.to(element, {
          duration: duration * 2,
          delay,
          ease: "none",
          onUpdate: function () {
            const progress = this.progress()
            const currentLength = Math.floor(progress * children.length)
            element.textContent = children.substring(0, currentLength)
          },
        })
        break

      case "fade":
        gsap.fromTo(
          element,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease: "power3.out",
          },
        )
        break

      case "slide":
        gsap.fromTo(
          element,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration,
            delay,
            ease: "back.out(1.7)",
          },
        )
        break

      case "glow":
        gsap.fromTo(
          element,
          {
            opacity: 0,
            textShadow: "0 0 0px #fe0000",
          },
          {
            opacity: 1,
            textShadow: "0 0 20px #fe0000, 0 0 40px #fe0000, 0 0 60px #fe0000",
            duration,
            delay,
            ease: "power2.out",
          },
        )

        // Continuous glow pulse
        gsap.to(element, {
          textShadow: "0 0 30px #fe0000, 0 0 60px #fe0000, 0 0 90px #fe0000",
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: delay + duration,
        })
        break

      case "bounce":
        gsap.fromTo(
          element,
          { scale: 0, rotation: -180 },
          {
            scale: 1,
            rotation: 0,
            duration,
            delay,
            ease: "elastic.out(1, 0.5)",
          },
        )
        break
    }
  }, [children, delay, duration, effect])

  return (
    <div ref={textRef} className={className}>
      {effect === "typewriter" ? "" : children}
    </div>
  )
}
