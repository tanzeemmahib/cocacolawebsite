"use client"

import { useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Environment, Float, Sparkles } from "@react-three/drei"
import type * as THREE from "three"

function CocaColaCan({ scale = 1, animated = true }: { scale?: number; animated?: boolean }) {
  const canRef = useRef<THREE.Group>(null)
  const labelRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (animated && canRef.current) {
      canRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
      canRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.2
    }

    if (labelRef.current && labelRef.current.material) {
      const material = labelRef.current.material as THREE.MeshStandardMaterial
      if (material.emissiveIntensity !== undefined) {
        material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.2
      }
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={canRef} scale={scale}>
        {/* Can Body */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.8, 0.8, 3, 32]} />
          <meshStandardMaterial
            color="#fe0000"
            metalness={0.8}
            roughness={0.2}
            emissive="#fe0000"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* Can Top */}
        <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.8, 0.8, 0.1, 32]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Can Bottom */}
        <mesh position={[0, -1.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.8, 0.8, 0.1, 32]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Label Background */}
        <mesh ref={labelRef} position={[0, 0, 0.81]}>
          <planeGeometry args={[2.2, 1.8]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} transparent opacity={0.95} />
        </mesh>

        {/* Coca-Cola Text */}
        <Suspense fallback={null}>
          <Text
            position={[0, 0.3, 0.82]}
            fontSize={0.25}
            color="#fe0000"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Geist-Bold.ttf"
            outlineWidth={0.01}
            outlineColor="#000000"
          >
            Coca-Cola
          </Text>

          {/* Classic Ribbon */}
          <Text
            position={[0, -0.2, 0.82]}
            fontSize={0.12}
            color="#fe0000"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Geist-Regular.ttf"
          >
            Classic
          </Text>
        </Suspense>

        {/* Sparkles around the can */}
        <Sparkles count={30} scale={3} size={2} speed={0.5} opacity={0.6} color="#ffffff" />
      </group>
    </Float>
  )
}

function CanLoader() {
  return (
    <mesh>
      <cylinderGeometry args={[0.8, 0.8, 3, 8]} />
      <meshBasicMaterial color="#fe0000" wireframe />
    </mesh>
  )
}

export function CocaColaCan3D({
  scale = 1,
  animated = true,
  className = "",
}: {
  scale?: number
  animated?: boolean
  className?: string
}) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} shadows gl={{ alpha: true, antialias: true }}>
        <Suspense fallback={<CanLoader />}>
          <Environment preset="studio" />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[2, 2, 2]} intensity={0.5} color="#fe0000" />
          <pointLight position={[-2, -2, -2]} intensity={0.3} color="#ffffff" />

          <CocaColaCan scale={scale} animated={animated} />
        </Suspense>
      </Canvas>
    </div>
  )
}
