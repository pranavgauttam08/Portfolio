"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Text, Float } from "@react-three/drei"
import type { Group } from "three"

function TechTag({ position, text, category, color = "#00ffff", delay = 0 }) {
  const ref = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.2
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + delay) * 0.3

      // Scale on hover
      const targetScale = hovered ? 1.2 : 1
      ref.current.scale.lerp({ x: targetScale, y: targetScale, z: targetScale }, 0.1)
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
      <group
        ref={ref}
        position={position}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        {/* Background plane */}
        <mesh position={[0, 0, -0.1]}>
          <planeGeometry args={[text.length * 0.3 + 0.8, 0.6]} />
          <meshBasicMaterial color={hovered ? color : "#1a1a1a"} transparent opacity={hovered ? 0.3 : 0.1} />
        </mesh>

        {/* Text */}
        <Text
          fontSize={0.3}
          color={hovered ? "#ffffff" : color}
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.ttf"
        >
          {text}
        </Text>

        {/* Category label */}
        <Text
          position={[0, -0.4, 0]}
          fontSize={0.15}
          color="#a0a0a0"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Regular.ttf"
        >
          {category}
        </Text>
      </group>
    </Float>
  )
}

export default function TechCloud({ className = "" }) {
  const technologies = [
    // Languages
    { name: "JavaScript", category: "Language", position: [2, 1, 0], color: "#f7df1e" },
    { name: "TypeScript", category: "Language", position: [-2, 0.5, 1], color: "#3178c6" },
    { name: "Python", category: "Language", position: [0, 2, -1], color: "#3776ab" },
    { name: "C++", category: "Language", position: [3, -1, 0], color: "#00599c" },
    { name: "C", category: "Language", position: [-3, 1.5, 0], color: "#a8b9cc" },
    { name: "HTML/CSS", category: "Language", position: [1, -1.5, 1], color: "#e34f26" },

    // Frameworks & Libraries
    { name: "React.js", category: "Framework", position: [-1, -0.5, -1], color: "#61dafb" },
    { name: "Next.js", category: "Framework", position: [0, 0, 2], color: "#000000" },
    { name: "Angular", category: "Framework", position: [2.5, 1.5, -0.5], color: "#dd0031" },
    { name: "Node.js", category: "Framework", position: [-2.5, -1, 0.5], color: "#339933" },
    { name: "Express.js", category: "Framework", position: [1.5, 0.8, 1.5], color: "#000000" },
    { name: "Three.js", category: "Framework", position: [-1.5, 2, -0.5], color: "#000000" },
    { name: "Bootstrap", category: "Framework", position: [0.5, -2, 0], color: "#7952b3" },
    { name: "Tailwind CSS", category: "Framework", position: [-0.5, 1.2, -1.5], color: "#06b6d4" },
    { name: "Go", category: "Language", position: [3.5, 0, 1], color: "#00add8" },

    // Developer Tools & Platforms
    { name: "Git", category: "Tool", position: [-3.5, 0.5, -1], color: "#f05032" },
    { name: "Docker", category: "Tool", position: [2, -0.8, -1.5], color: "#2496ed" },
    { name: "Firebase", category: "Platform", position: [-2, 2.5, 0], color: "#ffca28" },
    { name: "AWS", category: "Platform", position: [1, 2.8, 0.5], color: "#ff9900" },
    { name: "VS Code", category: "Tool", position: [-1, -2.5, 1], color: "#007acc" },
    { name: "MongoDB", category: "Database", position: [3, 2, 1], color: "#47a248" },
    { name: "PostgreSQL", category: "Database", position: [-3, -0.5, 1.5], color: "#336791" },
    { name: "SQL", category: "Database", position: [0, -1, -2], color: "#336791" },

    // Skills
    { name: "Problem Solving", category: "Skill", position: [4, 1, -1], color: "#ff6b6b" },
    { name: "Teamwork", category: "Skill", position: [-4, 1, 1], color: "#4ecdc4" },
    { name: "Management", category: "Skill", position: [2, 3, -1], color: "#45b7d1" },
    { name: "Software Engineering", category: "Skill", position: [-2, -3, -0.5], color: "#96ceb4" },
  ]

  return (
    <div className={`canvas-container ${className}`}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ antialias: true, alpha: true }}>
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00ffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />

        {/* Tech Tags */}
        {technologies.map((tech, index) => (
          <TechTag
            key={tech.name}
            position={tech.position}
            text={tech.name}
            category={tech.category}
            color={tech.color}
            delay={index * 0.2}
          />
        ))}
      </Canvas>
    </div>
  )
}
