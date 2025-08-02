"use client"

import { useRef, useMemo, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"

// Fizz Particles Component
function FizzParticles({ count = 1500 }: { count?: number }) {
  const points = useRef<THREE.Points>(null)

  const particlesData = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = Math.random() * 50 - 25
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50

      velocities[i * 3] = (Math.random() - 0.5) * 0.02
      velocities[i * 3 + 1] = Math.random() * 0.05 + 0.02
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02
    }

    return { positions, velocities }
  }, [count])

  useFrame(() => {
    if (!points.current?.geometry?.attributes?.position?.array) return

    const positions = points.current.geometry.attributes.position.array as Float32Array
    const velocities = particlesData.velocities

    for (let i = 0; i < count; i++) {
      if (positions[i * 3 + 1] !== undefined) {
        positions[i * 3] += velocities[i * 3]
        positions[i * 3 + 1] += velocities[i * 3 + 1]
        positions[i * 3 + 2] += velocities[i * 3 + 2]

        // Reset particles that go too high
        if (positions[i * 3 + 1] > 25) {
          positions[i * 3 + 1] = -25
          positions[i * 3] = (Math.random() - 0.5) * 50
          positions[i * 3 + 2] = (Math.random() - 0.5) * 50
        }
      }
    }

    if (points.current.geometry.attributes.position) {
      points.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <Points ref={points} limit={count} positions={particlesData.positions}>
      <PointMaterial transparent color="#ffffff" size={0.05} sizeAttenuation={true} depthWrite={false} opacity={0.8} />
    </Points>
  )
}

// Coke Liquid Waves
function CokeWaves() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 2
    }
  })

  return (
    <mesh ref={meshRef} position={[0, -10, -20]}>
      <planeGeometry args={[100, 100, 50, 50]} />
      <meshStandardMaterial color="#8B0000" transparent opacity={0.3} wireframe={false} side={THREE.DoubleSide} />
    </mesh>
  )
}

function BackgroundLoader() {
  return null
}

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }} gl={{ alpha: true, antialias: true }}>
        <Suspense fallback={<BackgroundLoader />}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#fe0000" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />

          <FizzParticles count={1000} />
          <CokeWaves />

          <fog attach="fog" args={["#000000", 10, 50]} />
        </Suspense>
      </Canvas>
    </div>
  )
}
