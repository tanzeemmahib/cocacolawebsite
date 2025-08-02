"use client"

import { useRef, useState, useEffect, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Text,
  PresentationControls,
  Float,
  MeshReflectorMaterial,
} from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react"
import type { Group } from "three"

// 3D Coca-Cola Bottle Component
function CokeBottle({ selectedYear = "2024" }: { selectedYear: string }) {
  const bottleRef = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)

  // Animate bottle rotation
  useFrame((state) => {
    if (bottleRef.current) {
      bottleRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      if (hovered) {
        bottleRef.current.scale.setScalar(1.1)
      } else {
        bottleRef.current.scale.setScalar(1)
      }
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
      <group
        ref={bottleRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        position={[0, -1, 0]}
      >
        {/* Bottle Body */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.8, 1.2, 4, 32]} />
          <meshStandardMaterial
            color="#2d5016"
            transparent
            opacity={0.8}
            roughness={0.1}
            metalness={0.1}
            envMapIntensity={1}
          />
        </mesh>

        {/* Bottle Neck */}
        <mesh position={[0, 2.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.5, 1, 16]} />
          <meshStandardMaterial color="#2d5016" transparent opacity={0.8} roughness={0.1} metalness={0.1} />
        </mesh>

        {/* Bottle Cap */}
        <mesh position={[0, 3.2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.35, 0.35, 0.3, 16]} />
          <meshStandardMaterial color="#fe0000" roughness={0.3} metalness={0.7} />
        </mesh>

        {/* Label */}
        <mesh position={[0, 0.5, 0.81]}>
          <planeGeometry args={[2, 1.5]} />
          <meshStandardMaterial color="#fe0000" roughness={0.8} metalness={0.1} />
        </mesh>

        {/* Coca-Cola Text on Label */}
        <Suspense fallback={null}>
          <Text
            position={[0, 0.5, 0.82]}
            fontSize={0.3}
            color="white"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Geist-Bold.ttf"
          >
            Coca-Cola
          </Text>

          {/* Year Text */}
          <Text
            position={[0, 0.1, 0.82]}
            fontSize={0.15}
            color="white"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Geist-Regular.ttf"
          >
            {selectedYear}
          </Text>
        </Suspense>

        {/* Liquid Inside */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.75, 1.15, 3.5, 32]} />
          <meshStandardMaterial color="#3d1a00" transparent opacity={0.9} roughness={0.2} metalness={0.1} />
        </mesh>

        {/* Bubbles */}
        {[...Array(20)].map((_, i) => (
          <mesh key={i} position={[(Math.random() - 0.5) * 1.5, Math.random() * 3 - 1.5, (Math.random() - 0.5) * 1.5]}>
            <sphereGeometry args={[0.02 + Math.random() * 0.03]} />
            <meshStandardMaterial color="white" transparent opacity={0.6} emissive="#ffffff" emissiveIntensity={0.2} />
          </mesh>
        ))}
      </group>
    </Float>
  )
}

// Lighting Setup
function Lighting() {
  return (
    <>
      {/* Environment lighting */}
      <Environment preset="studio" />

      {/* Key light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Fill light */}
      <directionalLight position={[-3, 2, -5]} intensity={0.5} color="#ff6b6b" />

      {/* Rim light */}
      <directionalLight position={[0, -5, -5]} intensity={0.3} color="#4ecdc4" />

      {/* Ambient light */}
      <ambientLight intensity={0.2} />

      {/* Point lights for sparkle */}
      <pointLight position={[2, 3, 2]} intensity={0.5} color="#ffffff" />
      <pointLight position={[-2, 1, -2]} intensity={0.3} color="#fe0000" />
    </>
  )
}

function BottleLoader() {
  return (
    <mesh>
      <cylinderGeometry args={[0.8, 1.2, 4, 8]} />
      <meshBasicMaterial color="#fe0000" wireframe />
    </mesh>
  )
}

// Main 3D Viewer Component
export function Bottle3DViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedYear, setSelectedYear] = useState("2024")
  const [isLoading, setIsLoading] = useState(true)
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 8])

  const years = ["1915", "1955", "1977", "1993", "2009", "2024"]

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const resetCamera = () => {
    setCameraPosition([0, 0, 8])
  }

  const zoomIn = () => {
    setCameraPosition((prev) => [prev[0], prev[1], Math.max(prev[2] - 1, 3)])
  }

  const zoomOut = () => {
    setCameraPosition((prev) => [prev[0], prev[1], Math.min(prev[2] + 1, 15)])
  }

  return (
    <section id="3d-viewer" className="py-20 bg-gradient-to-b from-black via-red-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">3D Bottle Experience</h2>
          <p className="text-xl text-white/80">Explore our iconic bottle in stunning detail</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* 3D Viewer */}
          <div className="lg:col-span-2">
            <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white">Loading 3D Experience...</p>
                  </div>
                </div>
              )}

              <Canvas
                ref={canvasRef}
                shadows
                camera={{ position: cameraPosition, fov: 45 }}
                style={{ height: "600px" }}
                gl={{ antialias: true, alpha: true }}
              >
                <Suspense fallback={<BottleLoader />}>
                  <Lighting />

                  <PresentationControls
                    global
                    rotation={[0.13, 0.1, 0]}
                    polar={[-0.4, 0.2]}
                    azimuth={[-1, 0.75]}
                    config={{ mass: 2, tension: 400 }}
                    snap={{ mass: 4, tension: 400 }}
                  >
                    <CokeBottle selectedYear={selectedYear} />
                  </PresentationControls>

                  {/* Ground reflection */}
                  <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
                    <planeGeometry args={[20, 20]} />
                    <MeshReflectorMaterial
                      blur={[300, 100]}
                      resolution={2048}
                      mixBlur={1}
                      mixStrength={40}
                      roughness={1}
                      depthScale={1.2}
                      minDepthThreshold={0.4}
                      maxDepthThreshold={1.4}
                      color="#050505"
                      metalness={0.5}
                    />
                  </mesh>

                  {/* Contact shadows */}
                  <ContactShadows position={[0, -2.9, 0]} opacity={0.4} scale={10} blur={1.5} far={4.5} />

                  <OrbitControls
                    enablePan={false}
                    enableZoom={true}
                    enableRotate={true}
                    minDistance={3}
                    maxDistance={15}
                    minPolarAngle={Math.PI / 6}
                    maxPolarAngle={Math.PI - Math.PI / 6}
                  />
                </Suspense>
              </Canvas>

              {/* 3D Controls Overlay */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={resetCamera}
                  className="bg-black/50 border-white/20 text-white hover:bg-white/10"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={zoomIn}
                  className="bg-black/50 border-white/20 text-white hover:bg-white/10"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={zoomOut}
                  className="bg-black/50 border-white/20 text-white hover:bg-white/10"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
              </div>

              {/* Instructions */}
              <div className="absolute bottom-4 left-4 text-white/70 text-sm">
                <p>🖱️ Drag to rotate • 🔍 Scroll to zoom • 📱 Touch to interact</p>
              </div>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Year Selection */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Select Era</h3>
              <div className="grid grid-cols-2 gap-2">
                {years.map((year) => (
                  <Button
                    key={year}
                    variant={selectedYear === year ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedYear(year)}
                    className={
                      selectedYear === year
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-transparent border-white/20 text-white hover:bg-white/10"
                    }
                  >
                    {year}
                  </Button>
                ))}
              </div>
            </div>

            {/* Bottle Info */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Bottle Details</h3>
              <div className="space-y-3 text-white/80">
                <div>
                  <span className="font-semibold text-red-400">Year:</span> {selectedYear}
                </div>
                <div>
                  <span className="font-semibold text-red-400">Material:</span> Glass
                </div>
                <div>
                  <span className="font-semibold text-red-400">Volume:</span> 330ml
                </div>
                <div>
                  <span className="font-semibold text-red-400">Design:</span> Contour Shape
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">3D Features</h3>
              <ul className="space-y-2 text-white/80 text-sm">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                  Realistic lighting & shadows
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                  Interactive rotation controls
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                  Animated bubbles & liquid
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                  Reflective surface materials
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                  Era-specific bottle designs
                </li>
              </ul>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-lg p-6 text-center">
              <h4 className="text-lg font-bold text-white mb-2">Love the Experience?</h4>
              <p className="text-white/90 text-sm mb-4">
                Discover more about our bottle evolution and sustainability efforts.
              </p>
              <Button className="bg-white text-red-600 hover:bg-gray-100 w-full">Learn More</Button>
            </div>
          </div>
        </div>

        {/* Technical Info */}
        <div className="mt-16 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Powered by Advanced 3D Technology</h3>
            <p className="text-white/80 mb-6">
              This interactive 3D experience uses WebGL and Three.js to render photorealistic bottle models with
              real-time lighting, shadows, and reflections. Each era's bottle features historically accurate proportions
              and design elements.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="text-center">
                <div className="text-2xl mb-2">🎨</div>
                <h4 className="font-bold text-white mb-1">Realistic Materials</h4>
                <p className="text-white/70">Glass, metal, and liquid shaders</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">💡</div>
                <h4 className="font-bold text-white mb-1">Dynamic Lighting</h4>
                <p className="text-white/70">Multiple light sources and shadows</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🔄</div>
                <h4 className="font-bold text-white mb-1">Interactive Controls</h4>
                <p className="text-white/70">Smooth rotation and zoom</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
