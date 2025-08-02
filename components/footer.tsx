"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)
  const waveRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Wave animation
    if (waveRef.current) {
      gsap.to(waveRef.current, {
        backgroundPosition: "200px 0px",
        duration: 3,
        repeat: -1,
        ease: "none",
      })
    }

    // Social icons pulse
    const socialIcons = footerRef.current?.querySelectorAll(".social-icon")
    socialIcons?.forEach((icon, index) => {
      gsap.to(icon, {
        scale: 1.1,
        duration: 1,
        delay: index * 0.2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      })
    })
  }, [])

  return (
    <footer ref={footerRef} className="relative bg-black text-white overflow-hidden">
      {/* Animated Wave */}
      <div
        ref={waveRef}
        className="absolute top-0 left-0 w-full h-16 opacity-20"
        style={{
          background:
            'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><path d="M0,10 Q25,0 50,10 T100,10 V20 H0 Z" fill="%23fe0000"/></svg>\') repeat-x',
          backgroundSize: "100px 20px",
        }}
      />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="text-white font-bold text-xl">Coca-Cola</span>
            </div>
            <p className="text-white/70">Refreshing the world and inspiring moments of optimism and happiness.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-red-400 transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-red-400 transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-red-400 transition-colors">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-red-400 transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-red-400 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-red-400 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-red-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-red-400 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-bold text-lg mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <div className="social-icon w-10 h-10 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                <span className="text-white font-bold">f</span>
              </div>
              <div className="social-icon w-10 h-10 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                <span className="text-white font-bold">t</span>
              </div>
              <div className="social-icon w-10 h-10 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                <span className="text-white font-bold">i</span>
              </div>
              <div className="social-icon w-10 h-10 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
                <span className="text-white font-bold">y</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-white/70">
            © 2024 The Coca-Cola Company. All rights reserved. |
            <span className="text-red-400 ml-2">Taste the Feeling</span>
          </p>
        </div>
      </div>

      {/* Fizz Effect */}
      <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 100}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1 + Math.random()}s`,
            }}
          />
        ))}
      </div>
    </footer>
  )
}
