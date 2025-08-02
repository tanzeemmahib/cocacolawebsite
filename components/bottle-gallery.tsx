"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Eye } from "lucide-react"

const bottles = [
  {
    year: "1894",
    name: "Hutchinson Bottle",
    image: "/coca-cola-hutchinson-1894.png",
    description: "The first Coca-Cola bottle with a wire stopper",
  },
  {
    year: "1915",
    name: "Contour Bottle",
    image: "/coca-cola-1915-bottle.png",
    description: "The iconic shape that defined Coca-Cola",
  },
  {
    year: "1955",
    name: "King Size",
    image: "/coca-cola-1955-king-size.png",
    description: "Larger size for sharing moments",
  },
  {
    year: "1977",
    name: "Plastic Bottle",
    image: "/placeholder.svg?height=300&width=200",
    description: "Innovation in packaging technology",
  },
  {
    year: "1993",
    name: "20oz Bottle",
    image: "/placeholder.svg?height=300&width=200",
    description: "Perfect size for on-the-go refreshment",
  },
  {
    year: "2009",
    name: "PlantBottle",
    image: "/placeholder.svg?height=300&width=200",
    description: "Sustainable packaging innovation",
  },
  {
    year: "2024",
    name: "100% Recycled",
    image: "/placeholder.svg?height=300&width=200",
    description: "Our commitment to sustainability",
  },
]

export function BottleGallery() {
  const galleryRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedBottle, setSelectedBottle] = useState<(typeof bottles)[0] | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const bottles = galleryRef.current?.querySelectorAll(".bottle-item")

      bottles?.forEach((bottle, index) => {
        gsap.fromTo(
          bottle,
          { opacity: 0, y: 100, rotationY: 45 },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 1,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: bottle,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        )
      })
    }
  }, [])

  const nextBottle = () => {
    setCurrentIndex((prev) => (prev + 1) % bottles.length)
  }

  const prevBottle = () => {
    setCurrentIndex((prev) => (prev - 1 + bottles.length) % bottles.length)
  }

  const scrollTo3DViewer = () => {
    const viewer = document.getElementById("3d-viewer")
    if (viewer) {
      viewer.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-red-800 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">Bottle Evolution</h2>
          <p className="text-xl text-white/80">130+ years of iconic design</p>
        </div>

        {/* Main Carousel */}
        <div className="relative mb-16">
          <div className="flex items-center justify-center">
            <Button variant="ghost" size="lg" onClick={prevBottle} className="text-white hover:text-red-400 mr-4">
              <ChevronLeft className="w-8 h-8" />
            </Button>

            <div className="w-80 h-96 relative">
              <div
                className="bottle-showcase bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-sm rounded-lg p-8 text-center hover:scale-105 transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedBottle(bottles[currentIndex])}
              >
                <img
                  src={bottles[currentIndex].image || "/placeholder.svg"}
                  alt={bottles[currentIndex].name}
                  className="w-full h-64 object-contain mb-4 hover:rotate-12 transition-transform duration-300"
                />
                <h3 className="text-2xl font-bold text-white mb-2">{bottles[currentIndex].year}</h3>
                <h4 className="text-xl text-red-400 mb-2">{bottles[currentIndex].name}</h4>
                <p className="text-white/80 text-sm">{bottles[currentIndex].description}</p>
              </div>
            </div>

            <Button variant="ghost" size="lg" onClick={nextBottle} className="text-white hover:text-red-400 ml-4">
              <ChevronRight className="w-8 h-8" />
            </Button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {bottles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-red-600 scale-125" : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* 3D Viewer CTA */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-red-600/20 to-red-800/20 backdrop-blur-sm rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">Experience in 3D</h3>
            <p className="text-white/80 mb-6">
              Get up close with our iconic bottles in stunning 3D detail. Rotate, zoom, and explore every curve and
              reflection.
            </p>
            <Button
              onClick={scrollTo3DViewer}
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <Eye className="w-5 h-5 mr-2" />
              View in 3D
            </Button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div ref={galleryRef} className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bottles.map((bottle, index) => (
            <div
              key={bottle.year}
              className="bottle-item bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-all duration-300 cursor-pointer hover:scale-105"
              onClick={() => setSelectedBottle(bottle)}
            >
              <img
                src={bottle.image || "/placeholder.svg"}
                alt={bottle.name}
                className="w-full h-32 object-contain mb-3 hover:rotate-6 transition-transform duration-300"
              />
              <h4 className="text-white font-bold">{bottle.year}</h4>
              <p className="text-red-400 text-sm">{bottle.name}</p>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedBottle && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedBottle(null)}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-md w-full text-center">
              <img
                src={selectedBottle.image || "/placeholder.svg"}
                alt={selectedBottle.name}
                className="w-full h-64 object-contain mb-4"
              />
              <h3 className="text-3xl font-bold text-white mb-2">{selectedBottle.year}</h3>
              <h4 className="text-2xl text-red-400 mb-4">{selectedBottle.name}</h4>
              <p className="text-white/90 mb-6">{selectedBottle.description}</p>
              <div className="flex space-x-4">
                <Button onClick={scrollTo3DViewer} className="bg-red-600 hover:bg-red-700 text-white flex-1">
                  <Eye className="w-4 h-4 mr-2" />
                  View in 3D
                </Button>
                <Button
                  onClick={() => setSelectedBottle(null)}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 flex-1"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
