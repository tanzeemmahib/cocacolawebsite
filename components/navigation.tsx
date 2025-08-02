"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { CocaColaCan3D } from "./coca-cola-can-3d"
import type { HTMLNavElement, HTMLDivElement } from "react"

export function Navigation() {
  const navRef = useRef<HTMLNavElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (!isLoaded) return

    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, delay: 0.5, ease: "back.out(1.7)" },
      )
    }

    // Logo hover animation
    if (logoRef.current) {
      const logo = logoRef.current

      const handleMouseEnter = () => {
        gsap.to(logo, { scale: 1.1, duration: 0.3, ease: "back.out(1.7)" })
        const logoImg = logo.querySelector("img")
        if (logoImg) {
          gsap.to(logoImg, {
            filter:
              "brightness(0) saturate(100%) invert(12%) sepia(100%) saturate(7500%) hue-rotate(0deg) brightness(120%) contrast(120%) drop-shadow(0 0 20px #fe0000) drop-shadow(0 0 40px #fe0000)",
            duration: 0.3,
          })
        }
      }

      const handleMouseLeave = () => {
        gsap.to(logo, { scale: 1, duration: 0.3, ease: "back.out(1.7)" })
        const logoImg = logo.querySelector("img")
        if (logoImg) {
          gsap.to(logoImg, {
            filter:
              "brightness(0) saturate(100%) invert(12%) sepia(100%) saturate(7500%) hue-rotate(0deg) brightness(100%) contrast(100%) drop-shadow(0 0 10px #fe0000)",
            duration: 0.3,
          })
        }
      }

      logo.addEventListener("mouseenter", handleMouseEnter)
      logo.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        logo.removeEventListener("mouseenter", handleMouseEnter)
        logo.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [isLoaded])

  if (!isLoaded) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-red-600/30">
        <div className="container mx-auto px-4 py-3">
          <div className="text-white">Loading...</div>
        </div>
      </nav>
    )
  }

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-red-600/30"
      style={{
        boxShadow: "0 4px 30px rgba(254, 0, 0, 0.1)",
      }}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div ref={logoRef} className="flex items-center space-x-3 cursor-pointer">
          <div className="w-12 h-12">
            <CocaColaCan3D scale={0.8} animated={true} />
          </div>
          <img
            src="/coca-cola-logo-black-white.png"
            alt="Coca-Cola Logo"
            className="h-8 w-auto"
            style={{
              filter:
                "brightness(0) saturate(100%) invert(12%) sepia(100%) saturate(7500%) hue-rotate(0deg) brightness(100%) contrast(100%) drop-shadow(0 0 10px #fe0000)",
            }}
          />
        </div>

        <div className="hidden md:flex space-x-8">
          {[
            { href: "#hero", label: "Home" },
            { href: "#history", label: "History" },
            { href: "#formula", label: "Formula" },
            { href: "#impact", label: "Global Impact" },
            { href: "#gallery", label: "Gallery" },
            { href: "#3d-viewer", label: "3D Experience" },
          ].map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className="text-white hover:text-red-400 transition-all duration-300 relative group text-lg font-medium"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-400 to-red-600 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
