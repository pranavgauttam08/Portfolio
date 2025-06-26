"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text } from "@react-three/drei"
import type { Mesh, Group } from "three"
import * as THREE from "three"

function Avatar({ mousePosition }) {
  const groupRef = useRef<Group>(null)
  const headRef = useRef<Mesh>(null)
  const eyeLeftRef = useRef<Mesh>(null)
  const eyeRightRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (headRef.current && mousePosition) {
      // Make head follow mouse movements
      const targetRotationY = (mousePosition.x - 0.5) * 0.5
      const targetRotationX = -(mousePosition.y - 0.5) * 0.3

      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotationY, 0.1)
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotationX, 0.1)
    }

    // Blinking animation
    if (eyeLeftRef.current && eyeRightRef.current) {
      const blink = Math.sin(Date.now() * 0.003) > 0.98 ? 0.1 : 1
      eyeLeftRef.current.scale.y = blink
      eyeRightRef.current.scale.y = blink
    }

    // Gentle floating animation
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Low-poly head */}
      <mesh ref={headRef} castShadow>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color="#00ffff" wireframe emissive="#00ffff" emissiveIntensity={0.1} />
      </mesh>

      {/* Eyes */}
      <mesh ref={eyeLeftRef} position={[-0.3, 0.2, 0.8]}>
        <sphereGeometry args={[0.1, 6, 6]} />
        <meshStandardMaterial color="#ffffff" emissive="#00ffff" emissiveIntensity={0.5} />
      </mesh>

      <mesh ref={eyeRightRef} position={[0.3, 0.2, 0.8]}>
        <sphereGeometry args={[0.1, 6, 6]} />
        <meshStandardMaterial color="#ffffff" emissive="#00ffff" emissiveIntensity={0.5} />
      </mesh>

      {/* Low-poly body */}
      <mesh position={[0, -1.5, 0]} castShadow>
        <boxGeometry args={[1.2, 1.8, 0.4]} />
        <meshStandardMaterial color="#ff00ff" wireframe emissive="#ff00ff" emissiveIntensity={0.1} />
      </mesh>

      {/* Arms */}
      <mesh position={[-1, -1, 0]} rotation={[0, 0, 0.3]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 1.2, 6]} />
        <meshStandardMaterial color="#00ffff" wireframe emissive="#00ffff" emissiveIntensity={0.1} />
      </mesh>

      <mesh position={[1, -1, 0]} rotation={[0, 0, -0.3]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 1.2, 6]} />
        <meshStandardMaterial color="#00ffff" wireframe emissive="#00ffff" emissiveIntensity={0.1} />
      </mesh>

      {/* Name label */}
      <Text
        position={[0, -3, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.ttf"
      >
        Pranav Gauttam
      </Text>
    </group>
  )
}

export default function InteractiveAvatar({ className = "" }) {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    })
  }

  return (
    <div className={`canvas-container ${className}`} onMouseMove={handleMouseMove}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ antialias: true, alpha: true }} shadows>
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#00ffff" castShadow />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#ff00ff" />

        {/* Interactive Avatar */}
        <Avatar mousePosition={mousePosition} />

        {/* Limited rotation controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI - Math.PI / 3}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  )
}
