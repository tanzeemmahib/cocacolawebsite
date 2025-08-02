"use client"

import { useRef, useMemo, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Points, PointMaterial, Stars } from "@react-three/drei"
import * as THREE from "three"

// Enhanced Fizz Particles Component with more effects
function EnhancedFizzParticles({ count = 1200 }: { count?: number }) {
  const points = useRef<THREE.Points>(null)

  const particlesData = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60
      positions[i * 3 + 1] = Math.random() * 60 - 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60

      velocities[i * 3] = (Math.random() - 0.5) * 0.03
      velocities[i * 3 + 1] = Math.random() * 0.08 + 0.02
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.03

      // More varied colors - red, white, and yellow
      const colorType = Math.random()
      if (colorType < 0.6) {
        // Red particles
        colors[i * 3] = 1
        colors[i * 3 + 1] = 0
        colors[i * 3 + 2] = 0
      } else if (colorType < 0.9) {
        // White particles
        colors[i * 3] = 1
        colors[i * 3 + 1] = 1
        colors[i * 3 + 2] = 1
      } else {
        // Yellow particles
        colors[i * 3] = 1
        colors[i * 3 + 1] = 1
        colors[i * 3 + 2] = 0
      }

      sizes[i] = Math.random() * 0.1 + 0.05
    }

    return { positions, velocities, colors, sizes }
  }, [count])

  useFrame((state) => {
    if (!points.current?.geometry?.attributes?.position?.array) return

    const positions = points.current.geometry.attributes.position.array as Float32Array
    const velocities = particlesData.velocities
    const time = state.clock.elapsedTime

    for (let i = 0; i < count; i++) {
      if (positions[i * 3 + 1] !== undefined) {
        // Add some wave motion
        positions[i * 3] += velocities[i * 3] + Math.sin(time + i * 0.01) * 0.001
        positions[i * 3 + 1] += velocities[i * 3 + 1]
        positions[i * 3 + 2] += velocities[i * 3 + 2] + Math.cos(time + i * 0.01) * 0.001

        // Reset particles that go too high
        if (positions[i * 3 + 1] > 30) {
          positions[i * 3 + 1] = -30
          positions[i * 3] = (Math.random() - 0.5) * 60
          positions[i * 3 + 2] = (Math.random() - 0.5) * 60
        }
      }
    }

    if (points.current.geometry.attributes.position) {
      points.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <Points ref={points} limit={count} positions={particlesData.positions}>
      <PointMaterial
        transparent
        vertexColors
        size={0.1}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Enhanced Coke Liquid Waves with more dynamic effects
function EnhancedCokeWaves() {
  const meshRef = useRef<THREE.Mesh>(null)
  const mesh2Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const time = state.clock.elapsedTime

    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.15
      meshRef.current.rotation.z = Math.sin(time * 0.3) * 0.08
      meshRef.current.position.y = Math.sin(time * 0.2) * 3
    }

    if (mesh2Ref.current) {
      mesh2Ref.current.rotation.x = Math.cos(time * 0.4) * 0.1
      mesh2Ref.current.rotation.z = Math.cos(time * 0.6) * 0.06
      mesh2Ref.current.position.y = Math.cos(time * 0.3) * 2
    }
  })

  return (
    <>
      {/* Primary wave */}
      <mesh ref={meshRef} position={[0, -12, -25]}>
        <planeGeometry args={[120, 120, 60, 60]} />
        <meshStandardMaterial
          color="#8B0000"
          transparent
          opacity={0.25}
          wireframe={false}
          side={THREE.DoubleSide}
          emissive="#fe0000"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Secondary wave */}
      <mesh ref={mesh2Ref} position={[0, -8, -30]}>
        <planeGeometry args={[100, 100, 40, 40]} />
        <meshStandardMaterial
          color="#fe0000"
          transparent
          opacity={0.15}
          wireframe={false}
          side={THREE.DoubleSide}
          emissive="#8B0000"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Add stars for depth */}
      <Stars radius={100} depth={50} count={200} factor={4} saturation={0} fade speed={1} />
    </>
  )
}

function BackgroundLoader() {
  return null
}

export function EnhancedAnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }} gl={{ alpha: true, antialias: true }}>
        <Suspense fallback={<BackgroundLoader />}>
          {/* Enhanced lighting setup */}
          <ambientLight intensity={0.4} />
          <pointLight position={[15, 15, 15]} intensity={2} color="#fe0000" />
          <pointLight position={[-15, -15, -15]} intensity={1.2} color="#ffffff" />
          <pointLight position={[0, 20, 10]} intensity={1.5} color="#ff6b6b" />
          <pointLight position={[10, -10, 5]} intensity={0.8} color="#ffff00" />

          <EnhancedFizzParticles count={1000} />
          <EnhancedCokeWaves />

          <fog attach="fog" args={["#000000", 20, 80]} />
        </Suspense>
      </Canvas>
    </div>
  )
}
