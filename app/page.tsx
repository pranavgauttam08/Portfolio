"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Github,
  Linkedin,
  Mail,
  Eye,
  Grid3X3,
  RotateCcw,
  MousePointer,
  ArrowDown,
  Contrast,
  Camera,
} from "lucide-react"
import HeroCanvas from "@/components/HeroCanvas"
import ProjectCarousel from "@/components/ProjectCarousel"
import InteractiveAvatar from "@/components/InteractiveAvatar"
import ExperienceTimeline from "@/components/ExperienceTimeline"
import TechStackCloud from "@/components/TechStackCloud"

export default function Portfolio3D() {
  const [currentProject, setCurrentProject] = useState(null) // null for auto-rotation
  const [wireframe, setWireframe] = useState(false)
  const [cameraPreset, setCameraPreset] = useState("diagonal")
  const [isLoading, setIsLoading] = useState(true)
  const [highContrast, setHighContrast] = useState(false)

  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])

  const cameraPresets = [
    { id: "diagonal", label: "Diagonal", icon: <Eye className="w-4 h-4" /> },
    { id: "front", label: "Front", icon: <MousePointer className="w-4 h-4" /> },
    { id: "side", label: "Side", icon: <RotateCcw className="w-4 h-4" /> },
    { id: "top", label: "Top", icon: <Camera className="w-4 h-4" /> },
  ]

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", highContrast ? "high-contrast" : "normal")
  }, [highContrast])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Keyboard navigation & ARIA labels for all controls
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Tab") return // Allow normal tab navigation

      switch (event.key) {
        case "1":
          setCurrentProject("url-video-generator")
          break
        case "2":
          setCurrentProject("reviewrealm")
          break
        case "3":
          setCurrentProject("inventory")
          break
        case "0":
          setCurrentProject(null) // Auto-rotation
          break
        case "w":
          setWireframe(!wireframe)
          break
        case "c":
          setHighContrast(!highContrast)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [wireframe, highContrast])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900">
          <div className="text-center">
            <div className="loading-spinner mx-auto mb-4"></div>
            <p className="text-xl neon-text">Loading 3D Experience...</p>
            <p className="text-sm text-gray-400 mt-2">Preparing immersive portfolio</p>
          </div>
        </div>
      )}

      {/* Hero Section - Full-screen WebGL canvas that auto-rotates through 3D models */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-6 neon-text"
          >
            Hi, I'm Pranav Gauttam
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-8"
          >
            — Explore My Work in 3D
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex gap-4"
          >
            <button onClick={() => scrollToSection("projects")} className="control-btn px-8 py-3 text-lg">
              Explore Projects
            </button>
            <button onClick={() => scrollToSection("about")} className="control-btn px-8 py-3 text-lg">
              About Me
            </button>
          </motion.div>
        </motion.div>

        {/* Full-screen WebGL Canvas */}
        <div className="absolute inset-0">
          <HeroCanvas
            currentProject={currentProject}
            wireframe={wireframe}
            cameraPreset={cameraPreset}
            className="w-full h-full"
            autoRotate={true}
          />
        </div>

        {/* On-screen controls for camera presets */}
        <div className="absolute top-6 right-6 z-20 space-y-4">
          {/* Camera Presets (front/side/top) */}
          <div className="bg-black/50 backdrop-blur-md rounded-lg p-4 space-y-2">
            <h3 className="text-sm font-semibold text-cyan-400 mb-2">Camera Preset</h3>
            <div className="grid grid-cols-2 gap-2">
              {cameraPresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setCameraPreset(preset.id)}
                  className={`control-btn flex items-center gap-2 ${cameraPreset === preset.id ? "active" : ""}`}
                  aria-label={`Switch to ${preset.label} view`}
                >
                  {preset.icon}
                  <span className="hidden sm:inline">{preset.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Wireframe Toggle & High-contrast mode */}
          <div className="space-y-2">
            <button
              onClick={() => setWireframe(!wireframe)}
              className={`control-btn w-full ${wireframe ? "active" : ""}`}
              aria-label="Toggle wireframe mode"
            >
              <Grid3X3 className="w-4 h-4 mr-2" />
              Wireframe Toggle
            </button>

            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`control-btn w-full ${highContrast ? "active" : ""}`}
              aria-label="Toggle high contrast mode"
            >
              <Contrast className="w-4 h-4 mr-2" />
              High Contrast
            </button>
          </div>
        </div>

        {/* Keyboard navigation info */}
        <div className="absolute bottom-20 left-6 z-20 bg-black/50 backdrop-blur-md rounded-lg p-4">
          <h4 className="text-sm font-semibold text-cyan-400 mb-2">Keyboard Navigation</h4>
          <div className="text-xs text-gray-400 space-y-1">
            <div>1-3: Select projects</div>
            <div>0: Auto-rotation</div>
            <div>W: Toggle wireframe</div>
            <div>C: Toggle contrast</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center neon-border cursor-pointer"
            onClick={() => scrollToSection("projects")}
          >
            <ArrowDown className="w-4 h-4 mt-2 text-cyan-400" />
          </motion.div>
        </div>
      </section>

      {/* Project Carousel - Horizontal scroll of 2D cards */}
      <ProjectCarousel currentProject={currentProject} onProjectSelect={setCurrentProject} id="projects" />

      {/* About Section - Split-screen text + interactive 3D avatar */}
      <section id="about" className="py-20 px-6 bg-gray-800/50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 neon-text">About Me</h2>
              <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                <p>
                  I'm a third-year B.Tech Computer Science student at{" "}
                  <span className="text-cyan-400 font-semibold">
                    Thapar Institute of Engineering & Technology (TIET)
                  </span>
                  , passionate about building scalable systems and solving real-world problems through code.
                </p>
                <p>
                  With expertise in full-stack development, 3D graphics, and modern web technologies, I create immersive
                  digital experiences that push the boundaries of what's possible on the web.
                </p>
                <p>
                  Currently exploring the intersection of AI, 3D graphics, and web development to build the next
                  generation of interactive applications that bridge the gap between imagination and reality.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 mt-8">
                <a
                  href="https://github.com/pranavgauttam08"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="control-btn p-3"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/pranav-gauttam-2aa99a250"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="control-btn p-3"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="mailto:pranavgauttam04@gmail.com" className="control-btn p-3" aria-label="Send Email">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <InteractiveAvatar className="w-full h-96" />
              <p className="text-center text-gray-400 mt-4">
                <MousePointer className="w-4 h-4 inline mr-2" />
                Move your mouse to interact with the low-poly avatar
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section - Interactive 3D timeline ribbon */}
      <ExperienceTimeline id="experience" />

      {/* Tech Stack Section - Floating 3D tag-cloud */}
      <TechStackCloud id="tech" />

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 neon-text">Let's Create Something Amazing</h2>
            <p className="text-xl text-gray-400 mb-8">
              Ready to bring your ideas to life with cutting-edge 3D web experiences?
            </p>
            <div className="flex gap-4 justify-center">
              <a href="mailto:pranavgauttam04@gmail.com" className="control-btn px-8 py-4 text-lg neon-glow">
                Get In Touch
              </a>
              <a
                href="https://github.com/pranavgauttam08"
                target="_blank"
                rel="noopener noreferrer"
                className="control-btn px-8 py-4 text-lg"
              >
                View GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-800">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">Made with love ❤️</p>
        </div>
      </footer>
    </div>
  )
}
