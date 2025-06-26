"use client"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Calendar, MapPin, Users, Code, Award, MousePointer } from "lucide-react"

const experiences = [
  {
    id: "serviz",
    title: "Engineering Intern",
    company: "Serviz",
    period: "Dec 2024 – Jan 2025",
    location: "Remote",
    type: "internship",
    description:
      "Software engineering internship focused on full-stack development and microservices architecture for enterprise inventory management solutions.",
    responsibilities: [
      "Developed responsive web applications using AngularJS and Bootstrap framework",
      "Designed and implemented RESTful APIs with MongoDB for data persistence",
      "Built microservices architecture using Next.js for scalable backend services",
      "Optimized database queries and improved application performance by 40%",
      "Collaborated with senior developers on code reviews and best practices",
      "Participated in agile development processes and sprint planning",
    ],
    achievements: [
      "Successfully delivered inventory management system ahead of deadline",
      "Reduced API response time by 35% through query optimization",
      "Implemented automated testing suite with 90% code coverage",
    ],
    technologies: ["AngularJS", "Bootstrap", "Next.js", "MongoDB", "Node.js", "REST APIs"],
    icon: <Code className="w-5 h-5" />,
    color: "#00ffff",
    logo: "💼",
  },
  {
    id: "microsoft",
    title: "Joint Secretary",
    company: "Microsoft Learn Student Chapter, TIET",
    period: "Jun 2023 – Aug 2023",
    location: "Patiala, Punjab",
    type: "leadership",
    description:
      "Leadership role in student organization focused on technical education, community building, and event management for 500+ members.",
    responsibilities: [
      "Led frontend development team for official chapter website redesign",
      "Managed server infrastructure setup and deployment processes",
      "Coordinated HR activities including member recruitment and onboarding",
      "Organized technical workshops and coding bootcamps for 200+ students",
      "Established partnerships with industry professionals for guest lectures",
      "Managed social media presence and community engagement initiatives",
    ],
    achievements: [
      "Increased chapter membership by 60% during tenure",
      "Successfully organized 5 major technical events with 200+ participants each",
      "Launched mentorship program connecting 50+ junior students with seniors",
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Firebase", "AWS"],
    icon: <Users className="w-5 h-5" />,
    color: "#ff00ff",
    logo: "🏢",
  },
  {
    id: "mudra",
    title: "Management Head",
    company: "Mudra Society, TIET",
    period: "Jan 2023 – Jun 2024",
    location: "Patiala, Punjab",
    type: "leadership",
    description:
      "Executive leadership position in the largest campus cultural society, overseeing event operations, team management, and strategic planning.",
    responsibilities: [
      "Managed end-to-end event operations for 500+ participant cultural festivals",
      "Led cross-functional team of 15+ volunteers across different departments",
      "Coordinated with external vendors, sponsors, and venue management",
      "Developed event management protocols and standard operating procedures",
      "Handled budget planning and financial oversight for society activities",
      "Mentored junior members and conducted leadership development sessions",
    ],
    achievements: [
      "Successfully organized 3 major cultural festivals with 1000+ total attendance",
      "Increased society revenue by 45% through strategic sponsorship deals",
      "Implemented digital event management system reducing planning time by 50%",
      "Won 'Best Cultural Society' award for outstanding event management",
    ],
    technologies: ["Event Management", "Team Leadership", "Project Planning", "Budget Management", "Vendor Relations"],
    icon: <Award className="w-5 h-5" />,
    color: "#ffff00",
    logo: "🎭",
  },
]

// 3D Hover Card Preview Component
function HoverCard3D({ experience, isVisible }) {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.8, rotateX: 15 }}
      transition={{ duration: 0.3, type: "spring" }}
      className="absolute z-20 bg-gray-900/95 backdrop-blur-md border border-cyan-400/50 rounded-lg p-4 min-w-[300px] shadow-2xl"
      style={{
        transform: "perspective(1000px) rotateX(5deg)",
        boxShadow: `0 20px 40px rgba(0, 255, 255, 0.2), 0 0 20px ${experience.color}30`,
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="p-2 rounded-lg"
          style={{ backgroundColor: `${experience.color}20`, border: `1px solid ${experience.color}` }}
        >
          {experience.icon}
        </div>
        <div>
          <h4 className="font-bold text-white">{experience.title}</h4>
          <p className="text-sm text-cyan-400">{experience.company}</p>
        </div>
      </div>

      <div className="space-y-2">
        <h5 className="text-xs font-semibold text-cyan-400">Key Responsibilities:</h5>
        <ul className="space-y-1">
          {experience.responsibilities.slice(0, 2).map((resp, index) => (
            <li key={index} className="text-xs text-gray-300 flex items-start">
              <div className="w-1 h-1 bg-cyan-400 rounded-full mr-2 mt-1.5 flex-shrink-0" />
              {resp}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-3">
        <h5 className="text-xs font-semibold text-magenta-400 mb-1">Technologies:</h5>
        <div className="flex flex-wrap gap-1">
          {experience.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="px-2 py-1 bg-gray-800 text-cyan-400 text-xs rounded border border-cyan-400/30">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Timeline Node Component
function TimelineNode({ experience, isActive, onClick, index }) {
  const [isHovered, setIsHovered] = useState(false)
  const { scrollYProgress } = useScroll()
  const nodeY = useTransform(scrollYProgress, [0.4 + index * 0.1, 0.6 + index * 0.1], [50, 0])

  return (
    <motion.div
      style={{ y: nodeY }}
      className="relative"
      whileHover={{ scale: 1.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Timeline Node */}
      <div
        className="timeline-node cursor-pointer"
        style={{
          backgroundColor: isActive ? experience.color : "#1a1a1a",
          borderColor: experience.color,
          boxShadow: isActive ? `0 0 20px ${experience.color}50` : "none",
        }}
        onClick={onClick}
      />

      {/* Company Logo */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-2xl">{experience.logo}</div>

      {/* 3D Hover Card Preview */}
      <div className="absolute left-8 top-0">
        <HoverCard3D experience={experience} isVisible={isHovered} />
      </div>
    </motion.div>
  )
}

// Experience Card Component
function ExperienceCard({ experience, isActive }) {
  if (!isActive) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: -50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.9 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="timeline-card p-6"
      style={{ borderColor: experience.color }}
    >
      <div className="flex items-start gap-4">
        <div
          className="p-3 rounded-lg flex-shrink-0"
          style={{ backgroundColor: `${experience.color}20`, border: `1px solid ${experience.color}` }}
        >
          {experience.icon}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-white">{experience.title}</h3>
            <span className="px-2 py-1 bg-gray-800 text-xs rounded-full capitalize">{experience.type}</span>
          </div>

          <p className="text-cyan-400 font-semibold mb-1">{experience.company}</p>

          <div className="flex items-center gap-4 text-gray-400 text-sm mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {experience.period}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {experience.location}
            </div>
          </div>

          <p className="text-gray-300 mb-4">{experience.description}</p>

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div>
              <h4 className="text-sm font-semibold text-cyan-400 mb-2">Key Responsibilities:</h4>
              <ul className="space-y-1">
                {experience.responsibilities.slice(0, 4).map((responsibility, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-gray-300 text-sm flex items-start"
                  >
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2 mt-2 flex-shrink-0" />
                    {responsibility}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-green-400 mb-2">Key Achievements:</h4>
              <ul className="space-y-1">
                {experience.achievements.map((achievement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-gray-300 text-sm flex items-start"
                  >
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 mt-2 flex-shrink-0" />
                    {achievement}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-magenta-400 mb-2">Technologies & Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="px-2 py-1 bg-gray-800 text-cyan-400 text-xs rounded border border-cyan-400/30"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ExperienceTimeline({ className = "" }) {
  const [activeExperience, setActiveExperience] = useState(experiences[0].id)
  const { scrollYProgress } = useScroll()

  // Scroll-triggered camera fly-through effect
  const timelineOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
  const timelineY = useTransform(scrollYProgress, [0.3, 0.5], [100, 0])

  return (
    <section className={`py-20 px-6 ${className}`}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 neon-text">Experience Timeline</h2>
          <p className="text-xl text-gray-400">Interactive 3D timeline with hover-card previews</p>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm text-cyan-400">
            <MousePointer className="w-4 h-4" />
            <span>Click the timeline nodes on the left to explore each experience</span>
          </div>
        </motion.div>

        <motion.div style={{ opacity: timelineOpacity, y: timelineY }} className="relative">
          {/* Interactive 3D Timeline Ribbon */}
          <div className="timeline-ribbon absolute left-8 top-0 bottom-0 w-px" />

          {/* Experience Timeline */}
          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <div key={experience.id} className="relative flex items-start">
                {/* Timeline Node with 3D Hover Card */}
                <div className="absolute left-6">
                  <TimelineNode
                    experience={experience}
                    isActive={activeExperience === experience.id}
                    onClick={() => setActiveExperience(experience.id)}
                    index={index}
                  />
                </div>

                {/* Experience Card */}
                <div className="ml-20 w-full">
                  <ExperienceCard experience={experience} isActive={activeExperience === experience.id} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
