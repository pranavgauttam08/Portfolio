"use client"

import { useRef, useEffect, useState, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Text, Environment, ContactShadows } from "@react-three/drei"
import { type Group, Vector3 } from "three"

// Project 3D Models - Replace with your actual GLTF models using GLTFLoader
function ProjectModel({ type, wireframe = false, color = "#00ffff", scale = 1 }) {
  const meshRef = useRef<Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.2
    }
  })

  // TO SWAP IN YOUR OWN MODELS:
  // 1. Place your .glb/.gltf files in public/models/
  // 2. Use useGLTF hook: const { scene } = useGLTF('/models/your-model.glb')
  // 3. Return: <primitive object={scene} scale={scale} />
  // 4. Apply wireframe/color modifications in useEffect

  const getGeometry = () => {
    switch (type) {
      case "url-video-generator":
        return <dodecahedronGeometry args={[1.5, 0]} />
      case "reviewrealm":
        return <octahedronGeometry args={[1.5, 0]} />
      case "inventory":
        return <torusGeometry args={[1.5, 0.5, 16, 100]} />
      default:
        return <boxGeometry args={[2, 2, 2]} />
    }
  }

  return (
    <group ref={meshRef} scale={scale}>
      <mesh castShadow receiveShadow>
        {getGeometry()}
        <meshStandardMaterial
          color={color}
          wireframe={wireframe}
          emissive={wireframe ? color : "#000000"}
          emissiveIntensity={wireframe ? 0.2 : 0}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
    </group>
  )
}

// Camera controller for different presets
function CameraController({ preset, target }) {
  const { camera } = useThree()

  useEffect(() => {
    const positions = {
      front: [0, 0, 5],
      side: [5, 0, 0],
      top: [0, 5, 0],
      diagonal: [3, 3, 3],
    }

    const position = positions[preset] || positions.diagonal
    camera.position.set(...position)
    camera.lookAt(target)
  }, [preset, target, camera])

  return null
}

// Auto-rotation through projects
function AutoRotator({ projects, currentIndex, onIndexChange }) {
  useEffect(() => {
    const interval = setInterval(() => {
      onIndexChange((prev) => (prev + 1) % projects.length)
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [projects.length, onIndexChange])

  return null
}

// Loading component
function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80">
      <div className="text-center">
        <div className="loading-spinner mx-auto mb-4"></div>
        <p className="text-cyan-400">Loading 3D Model...</p>
      </div>
    </div>
  )
}

// Main Hero Canvas Component
export default function HeroCanvas({
  currentProject,
  wireframe = false,
  cameraPreset = "diagonal",
  className = "",
  autoRotate = true,
}) {
  const [error, setError] = useState(false)
  const [autoIndex, setAutoIndex] = useState(0)

  const projects = [
    {
      id: "url-video-generator",
      name: "URL-to-Video Generator",
      type: "url-video-generator",
      color: "#ff6b6b",
      description: "AI-powered video generation from URLs",
    },
    {
      id: "reviewrealm",
      name: "ReviewRealm",
      type: "reviewrealm",
      color: "#00ffff",
      description: "NLP-based sentiment analysis platform",
    },
    {
      id: "inventory",
      name: "Inventory Management System",
      type: "inventory",
      color: "#ff00ff",
      description: "Microservices-based system with responsive frontend",
    },
  ]

  // Use auto-rotation or manual selection
  const activeProject = currentProject ? projects.find((p) => p.id === currentProject) : projects[autoIndex]

  return (
    <div className={`canvas-container ${className}`}>
      <Canvas
        camera={{ position: [3, 3, 3], fov: 50 }}
        onError={() => setError(true)}
        gl={{ antialias: true, alpha: true }}
        shadows
      >
        <Suspense fallback={null}>
          {/* Lighting Setup */}
          <ambientLight intensity={0.4} />
          <pointLight
            position={[10, 10, 10]}
            intensity={1}
            color="#00ffff"
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
          <spotLight
            position={[0, 10, 0]}
            angle={0.3}
            penumbra={1}
            intensity={1}
            castShadow
            color="#ffffff"
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          {/* Environment */}
          <Environment preset="night" />

          {/* Camera Controller */}
          <CameraController preset={cameraPreset} target={new Vector3(0, 0, 0)} />

          {/* Auto-rotation logic */}
          {!currentProject && <AutoRotator projects={projects} currentIndex={autoIndex} onIndexChange={setAutoIndex} />}

          {/* 3D Model */}
          <ProjectModel type={activeProject?.type} wireframe={wireframe} color={activeProject?.color} scale={1.2} />

          {/* Project Title */}
          <Text
            position={[0, -3, 0]}
            fontSize={0.4}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Inter-Bold.ttf"
            maxWidth={8}
            textAlign="center"
          >
            {activeProject?.name}
          </Text>

          {/* Project Description */}
          <Text
            position={[0, -3.8, 0]}
            fontSize={0.2}
            color="#a0a0a0"
            anchorX="center"
            anchorY="middle"
            font="/fonts/Inter-Regular.ttf"
            maxWidth={10}
            textAlign="center"
          >
            {activeProject?.description}
          </Text>

          {/* Ground Shadow */}
          <ContactShadows
            position={[0, -2.5, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
            resolution={256}
            color="#000000"
          />

          {/* Orbit Controls */}
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            autoRotate={autoRotate}
            autoRotateSpeed={0.5}
            minDistance={3}
            maxDistance={10}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI - Math.PI / 6}
          />
        </Suspense>
      </Canvas>

      {/* Canvas fallback image if WebGL unsupported */}
      {error && (
        <div className="webgl-fallback">
          <div>
            <h3 className="text-xl mb-2">WebGL not supported</h3>
            <p>Your browser doesn't support 3D graphics</p>
            <img
              src="/placeholder.svg?height=200&width=300"
              alt={activeProject?.name}
              className="mt-4 rounded-lg max-w-full h-auto"
            />
          </div>
        </div>
      )}
    </div>
  )
}
