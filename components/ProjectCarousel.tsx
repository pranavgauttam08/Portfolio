"use client"

import { motion } from "framer-motion"
import { Eye, Play, Code2 } from "lucide-react"

const projects = [
  {
    id: "url-video-generator",
    name: "URL-to-Video Generator",
    description:
      "AI-powered platform that automatically generates videos from any URL input using advanced algorithms to analyze web content and create engaging video presentations.",
    tech: ["JavaScript", "TypeScript", "React.js", "Node.js", "AI APIs", "CSS"],
    category: "AI & Video Generation",
    features: [
      "AI-powered video generation from URLs",
      "Automated content analysis and extraction",
      "Dynamic video creation with narration",
      "Real-time processing and preview",
      "Multiple video format exports",
      "Responsive web interface",
    ],
    type: "web-app",
    status: "Live",
    github: "https://github.com/pranavgauttam08/URL-to-Video-Generator",
    demo: "https://url-video-generator.vercel.app",
    color: "#ff6b6b",
    gradient: "from-red-500/20 to-orange-500/20",
  },
  {
    id: "reviewrealm",
    name: "ReviewRealm",
    description:
      "NLP-based sentiment analysis platform using Vader Sentiment Analysis, NLTK, and RAKE to provide valuable insights for smarter purchasing and marketing decisions.",
    tech: ["ReactJS", "Python", "MongoDB", "NLTK", "Jupyter Notebook", "Flask"],
    category: "NLP & Data Analysis",
    features: [
      "Sentiment analysis using Vader and NLTK",
      "RAKE algorithm for keyword extraction",
      "Word cloud visualization of sentiments",
      "Amazon URL scraping for review data",
      "Interactive dashboard for insights",
      "Real-time sentiment categorization",
    ],
    type: "web-app",
    status: "Live",
    github: "https://github.com/pranavgauttam08/ReaviewRealm",
    demo: "https://review-realm-xzg1.vercel.app",
    color: "#00ffff",
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    id: "inventory",
    name: "Inventory Management System",
    description:
      "Microservices-based inventory system with responsive frontend and CRUD APIs. Built with modern web technologies for scalable performance and real-time tracking.",
    tech: ["AngularJS", "Bootstrap", "Next.js", "MongoDB", "Node.js", "Express"],
    category: "Full-Stack Development",
    features: [
      "Responsive frontend using AngularJS and Bootstrap",
      "RESTful CRUD APIs with MongoDB integration",
      "Microservices architecture with Next.js",
      "Real-time inventory tracking and updates",
      "Optimized database queries for performance",
      "User authentication and role-based access",
    ],
    type: "web-app",
    status: "Completed",
    github: "https://github.com/pranavgauttam08/inventory-system",
    demo: "https://inventory-demo.vercel.app",
    color: "#ff00ff",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
]

export default function ProjectCarousel({ currentProject, onProjectSelect, className = "" }) {
  return (
    <section className={`py-20 px-6 ${className}`}>
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 neon-text">Featured Projects</h2>
          <p className="text-xl text-gray-400">Click a card to update the 3D canvas above</p>
        </motion.div>

        {/* 3D Vertical stack of project cards */}
        <div
          className="space-y-8"
          style={{
            perspective: "1500px",
          }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 100, rotateX: -20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{
                rotateX: 2,
                rotateY: 1,
                scale: 1.02,
                z: 30,
                transition: { duration: 0.3 },
              }}
              onClick={() => onProjectSelect(project.id)}
              className={`project-card-3d-vertical cursor-pointer ${currentProject === project.id ? "active-3d-vertical" : ""}`}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onProjectSelect(project.id)}
              role="button"
              aria-label={`Select ${project.name} project`}
              style={{
                transformStyle: "preserve-3d",
                background: `linear-gradient(135deg, 
                  rgba(26, 26, 26, 0.95) 0%, 
                  rgba(${project.color === "#ff6b6b" ? "255, 107, 107" : project.color === "#00ffff" ? "0, 255, 255" : "255, 0, 255"}, 0.1) 100%)`,
                border: `2px solid ${project.color}40`,
                borderRadius: "24px",
                boxShadow: `
                  0 30px 60px rgba(0, 0, 0, 0.4),
                  0 0 40px ${project.color}20,
                  inset 0 2px 0 rgba(255, 255, 255, 0.1),
                  inset 0 -2px 0 rgba(0, 0, 0, 0.2)
                `,
                backdropFilter: "blur(20px)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* 3D Depth Layers */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(45deg, transparent 0%, ${project.color}08 50%, transparent 100%)`,
                  transform: "translateZ(-15px)",
                  transformStyle: "preserve-3d",
                  borderRadius: "24px",
                }}
              />

              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${project.color}15, transparent 70%)`,
                  transform: "translateZ(-10px)",
                  transformStyle: "preserve-3d",
                  borderRadius: "24px",
                }}
              />

              {/* Animated Glow Effect */}
              <motion.div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(45deg, ${project.color}30, transparent, ${project.color}30)`,
                  filter: "blur(2px)",
                  borderRadius: "24px",
                }}
                animate={{
                  background: [
                    `linear-gradient(45deg, ${project.color}20, transparent, ${project.color}20)`,
                    `linear-gradient(135deg, ${project.color}30, transparent, ${project.color}30)`,
                    `linear-gradient(225deg, ${project.color}20, transparent, ${project.color}20)`,
                  ],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              />

              {/* Card Content */}
              <div className="relative z-10 p-6">
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  {/* Left Column - Main Info */}
                  <div className="space-y-6">
                    {/* Header with 3D floating elements */}
                    <div className="flex items-center justify-between">
                      <motion.div
                        whileHover={{ rotateX: 15, rotateY: 15, scale: 1.05 }}
                        className="relative"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <span
                          className="px-4 py-2 text-sm rounded-full font-bold"
                          style={{
                            background: `linear-gradient(135deg, ${project.color}50, ${project.color}30)`,
                            color: "#ffffff",
                            border: `2px solid ${project.color}70`,
                            boxShadow: `0 8px 16px ${project.color}30, inset 0 1px 0 rgba(255,255,255,0.2)`,
                            transform: "translateZ(8px)",
                            textShadow: `0 0 10px ${project.color}80`,
                          }}
                        >
                          {project.type}
                        </span>
                      </motion.div>

                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1],
                          rotate: [0, 180, 360],
                          boxShadow: [
                            `0 0 20px ${project.color}50`,
                            `0 0 30px ${project.color}80`,
                            `0 0 20px ${project.color}50`,
                          ],
                        }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                        className="w-5 h-5 rounded-full"
                        style={{
                          backgroundColor: project.color,
                          transform: "translateZ(5px)",
                        }}
                      />
                    </div>

                    {/* Project Title with 3D text effect */}
                    <motion.div style={{ transform: "translateZ(5px)" }}>
                      <h3
                        className="text-2xl lg:text-3xl font-bold mb-3"
                        style={{
                          background: `linear-gradient(135deg, #ffffff, ${project.color}, #ffffff)`,
                          backgroundClip: "text",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          textShadow: `0 4px 8px ${project.color}40`,
                          lineHeight: "1.2",
                        }}
                      >
                        {project.name}
                      </h3>

                      <p
                        className="text-lg font-semibold mb-4"
                        style={{
                          color: project.color,
                          textShadow: `0 0 15px ${project.color}60`,
                        }}
                      >
                        {project.category}
                      </p>
                    </motion.div>

                    <p className="text-gray-300 text-base leading-relaxed">{project.description}</p>

                    {/* Status and 3D Action Buttons */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center text-cyan-400 font-semibold">
                          <Eye className="w-5 h-5 mr-2" />
                          {currentProject === project.id ? "Viewing in 3D" : "View in 3D"}
                        </div>
                        <span
                          className={`px-3 py-1 text-sm rounded-full font-bold ${
                            project.status === "Live"
                              ? "bg-green-900 text-green-300 border-2 border-green-600"
                              : project.status === "Completed"
                                ? "bg-blue-900 text-blue-300 border-2 border-blue-600"
                                : "bg-yellow-900 text-yellow-300 border-2 border-yellow-600"
                          }`}
                          style={{
                            boxShadow:
                              project.status === "Live"
                                ? "0 0 20px rgba(34, 197, 94, 0.4)"
                                : "0 0 20px rgba(59, 130, 246, 0.4)",
                            transform: "translateZ(3px)",
                          }}
                        >
                          {project.status}
                        </span>
                      </div>

                      {/* 3D Action Buttons */}
                      <div className="flex gap-4">
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{
                            rotateX: -8,
                            rotateY: 8,
                            scale: 1.05,
                            transition: { duration: 0.2 },
                          }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 px-4 py-3 rounded-xl flex items-center justify-center gap-3 font-bold text-base"
                          style={{
                            background: `linear-gradient(135deg, ${project.color}60, ${project.color}40)`,
                            color: "#ffffff",
                            border: `2px solid ${project.color}80`,
                            boxShadow: `0 8px 16px ${project.color}40, inset 0 1px 0 rgba(255,255,255,0.2)`,
                            transform: "translateZ(8px)",
                            transformStyle: "preserve-3d",
                            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                          }}
                          aria-label="View live demo"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Play className="w-5 h-5" />
                          Live Demo
                        </motion.a>

                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{
                            rotateX: -8,
                            rotateY: -8,
                            scale: 1.05,
                            transition: { duration: 0.2 },
                          }}
                          whileTap={{ scale: 0.95 }}
                          className="flex-1 px-4 py-3 rounded-xl flex items-center justify-center gap-3 font-bold text-base"
                          style={{
                            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08))",
                            color: "#ffffff",
                            border: "2px solid rgba(255, 255, 255, 0.3)",
                            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
                            transform: "translateZ(8px)",
                            transformStyle: "preserve-3d",
                            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                          }}
                          aria-label="View source code"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Code2 className="w-5 h-5" />
                          Source Code
                        </motion.a>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Tech & Features */}
                  <div className="space-y-6">
                    {/* Tech Stack with 3D pills */}
                    <div>
                      <h4 className="text-base font-bold text-cyan-400 mb-4 flex items-center">
                        <div
                          className="w-2 h-2 rounded-full mr-3"
                          style={{
                            backgroundColor: "#00ffff",
                            boxShadow: "0 0 10px #00ffff80",
                            transform: "translateZ(2px)",
                          }}
                        />
                        Tech Stack
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            whileHover={{
                              rotateX: 10,
                              rotateY: 10,
                              scale: 1.05,
                              transition: { duration: 0.2 },
                            }}
                            className="px-2 py-1.5 text-sm rounded-lg font-semibold text-center"
                            style={{
                              background: `linear-gradient(135deg, rgba(0, 255, 255, 0.25), rgba(0, 255, 255, 0.15))`,
                              color: "#00ffff",
                              border: "1px solid rgba(0, 255, 255, 0.4)",
                              boxShadow: "0 4px 8px rgba(0, 255, 255, 0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
                              transform: `translateZ(${techIndex * 2 + 3}px)`,
                              transformStyle: "preserve-3d",
                              textShadow: "0 0 8px rgba(0, 255, 255, 0.5)",
                            }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Key Features with 3D styling */}
                    <div>
                      <h4 className="text-base font-bold text-magenta-400 mb-4 flex items-center">
                        <div
                          className="w-2 h-2 rounded-full mr-3"
                          style={{
                            backgroundColor: "#ff00ff",
                            boxShadow: "0 0 10px #ff00ff80",
                            transform: "translateZ(2px)",
                          }}
                        />
                        Key Features
                      </h4>
                      <ul className="space-y-3">
                        {project.features.slice(0, 4).map((feature, featureIndex) => (
                          <motion.li
                            key={feature}
                            className="text-gray-300 flex items-start"
                            style={{ transform: `translateZ(${featureIndex + 2}px)` }}
                            whileHover={{ x: 5, transition: { duration: 0.2 } }}
                          >
                            <div
                              className="w-2.5 h-2.5 rounded-full mr-3 mt-1.5 flex-shrink-0"
                              style={{
                                backgroundColor: project.color,
                                boxShadow: `0 0 10px ${project.color}70`,
                                transform: "translateZ(2px)",
                              }}
                            />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active state 3D indicator */}
              {currentProject === project.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0, rotateY: -180 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  className="absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}, ${project.color}80)`,
                    boxShadow: `0 0 30px ${project.color}80, 0 8px 16px rgba(0,0,0,0.3)`,
                    transform: "translateZ(15px)",
                    border: "2px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <Eye className="w-6 h-6 text-white" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* 3D Navigation hint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 text-lg">
            Hover for 3D effects • Click to view in canvas • Links open in new tabs
          </p>
        </motion.div>
      </div>
    </section>
  )
}
