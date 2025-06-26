"use client"

import { useRef, useEffect, useState, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Text, Environment, ContactShadows } from "@react-three/drei"
import { type Group, Vector3 } from "three"

// Fallback 3D shapes for projects (when models aren't available)
function ProjectModel({ type, wireframe = false, color = "#00ffff", scale = 1 }) {
  const meshRef = useRef<Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.2
    }
  })

  const getGeometry = () => {
    switch (type) {
      case "cube":
        return <boxGeometry args={[2, 2, 2]} />
      case "sphere":
        return <sphereGeometry args={[1.5, 32, 32]} />
      case "torus":
        return <torusGeometry args={[1.5, 0.5, 16, 100]} />
      case "cylinder":
        return <cylinderGeometry args={[1, 1, 2, 32]} />
      case "cone":
        return <coneGeometry args={[1, 2, 32]} />
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

// Camera controller for different views
function CameraController({ view, target }) {
  const { camera } = useThree()

  useEffect(() => {
    const positions = {
      front: [0, 0, 5],
      side: [5, 0, 0],
      top: [0, 5, 0],
      diagonal: [3, 3, 3],
    }

    const position = positions[view] || positions.diagonal
    camera.position.set(...position)
    camera.lookAt(target)
  }, [view, target, camera])

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

// Main 3D Scene Component
export default function Scene3D({
  currentProject,
  wireframe = false,
  cameraView = "diagonal",
  className = "",
  autoRotate = true,
}) {
  const [error, setError] = useState(false)

  const projects = [
    {
      id: "reviewrealm",
      name: "ReviewRealm",
      type: "cube",
      color: "#00ffff",
      description: "NLP-based product review platform",
    },
    {
      id: "hrms",
      name: "HR Management System",
      type: "sphere",
      color: "#ff00ff",
      description: "Full-stack HRMS with domain authentication",
    },
    {
      id: "inventory",
      name: "Inventory Management",
      type: "torus",
      color: "#ffff00",
      description: "Microservices-based inventory system",
    },
  ]

  const currentProjectData = projects.find((p) => p.id === currentProject) || projects[0]

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
          <CameraController view={cameraView} target={new Vector3(0, 0, 0)} />

          {/* 3D Model */}
          <ProjectModel
            type={currentProjectData.type}
            wireframe={wireframe}
            color={currentProjectData.color}
            scale={1.2}
          />

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
            {currentProjectData.name}
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
            {currentProjectData.description}
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

      {/* Error Fallback */}
      {error && (
        <div className="webgl-fallback">
          <div>
            <h3 className="text-xl mb-2">WebGL not supported</h3>
            <p>Your browser doesn't support 3D graphics</p>
            <img
              src="/fallback-project.jpg"
              alt={currentProjectData.name}
              className="mt-4 rounded-lg max-w-full h-auto"
            />
          </div>
        </div>
      )}
    </div>
  )
}
