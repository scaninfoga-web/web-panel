"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Shield, Lock, AlertTriangle, Eye, FileCode, Database } from "lucide-react"

export default function SecurityAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor(canvas: HTMLCanvasElement) {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = `rgba(${Math.floor(Math.random() * 100 + 155)}, 255, ${Math.floor(
          Math.random() * 100 + 155,
        )}, ${Math.random() * 0.5 + 0.1})`
      }

      update(canvas: HTMLCanvasElement) {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x < 0 || this.x > canvas.width) {
          this.speedX = -this.speedX
        }

        if (this.y < 0 || this.y > canvas.height) {
          this.speedY = -this.speedY
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const particles: Particle[] = []
    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 10000))

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas))
    }

    // Connect particles with lines
    function connectParticles() {
      if (!ctx) return
      
      const maxDistance = 150

      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance
            ctx.strokeStyle = `rgba(100, 255, 180, ${opacity * 0.2})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Animation loop
    function animate() {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update(canvas)
        particle.draw(ctx)
      }

      connectParticles()
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  // Animation variants for the icons
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
      },
    },
  }

  const floatVariants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse" as const,
      },
    },
  }

  const rotateVariants = {
    rotate: {
      rotate: [0, 360],
      transition: {
        duration: 20,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      },
    },
  }

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Animated cyber elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Rotating hexagon grid */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <div className="w-full h-full bg-[url('/images/hexagon-grid.svg')] bg-repeat"></div>
        </motion.div>

        {/* Digital circuit */}
        <div className="absolute inset-0">
          <svg width="100%" height="100%" viewBox="0 0 1000 300" className="opacity-20">
            <motion.path
              d="M0,150 C100,50 200,250 300,150 C400,50 500,250 600,150 C700,50 800,250 900,150 L1000,150"
              stroke="#10b981"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
            <motion.path
              d="M0,100 C150,50 250,150 400,100 C550,50 650,150 800,100 L1000,100"
              stroke="#10b981"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
            />
            <motion.path
              d="M0,200 C150,250 250,150 400,200 C550,250 650,150 800,200 L1000,200"
              stroke="#10b981"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 3, delay: 1, ease: "easeInOut" }}
            />

            {/* Data pulse animations */}
            <motion.circle
              cx="0"
              cy="150"
              r="5"
              fill="#10b981"
              animate={{
                x: [0, 1000],
                opacity: [1, 0.8, 0],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                times: [0, 0.8, 1],
              }}
            />
            <motion.circle
              cx="0"
              cy="100"
              r="4"
              fill="#06b6d4"
              animate={{
                x: [0, 1000],
                opacity: [1, 0.8, 0],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: 2,
                times: [0, 0.8, 1],
              }}
            />
            <motion.circle
              cx="0"
              cy="200"
              r="4"
              fill="#06b6d4"
              animate={{
                x: [0, 1000],
                opacity: [1, 0.8, 0],
              }}
              transition={{
                duration: 12,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
                delay: 4,
                times: [0, 0.8, 1],
              }}
            />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Cybersecurity in an{" "}
            <motion.span
              className="text-emerald-500 relative inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Interconnected
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-500"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
              ></motion.span>
            </motion.span>{" "}
            World
          </h2>
          <p className="text-lg text-white/70 mb-8">
            Our network of security solutions works together to create a comprehensive defense system for your digital
            infrastructure.
          </p>
        </motion.div>

        {/* Animated security icons */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <motion.div
            className="flex flex-col items-center text-center"
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mb-3"
              variants={pulseVariants}
              animate="pulse"
            >
              <Shield className="w-8 h-8 text-emerald-500" />
            </motion.div>
            <h3 className="text-sm font-medium text-white">Threat Protection</h3>
          </motion.div>

          <motion.div
            className="flex flex-col items-center text-center"
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mb-3"
              variants={floatVariants}
              animate="float"
            >
              <Lock className="w-8 h-8 text-cyan-400" />
            </motion.div>
            <h3 className="text-sm font-medium text-white">Secure Access</h3>
          </motion.div>

          <motion.div
            className="flex flex-col items-center text-center"
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-3"
              variants={pulseVariants}
              animate="pulse"
            >
              <AlertTriangle className="w-8 h-8 text-purple-400" />
            </motion.div>
            <h3 className="text-sm font-medium text-white">Breach Detection</h3>
          </motion.div>

          <motion.div
            className="flex flex-col items-center text-center"
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mb-3"
              variants={floatVariants}
              animate="float"
            >
              <Eye className="w-8 h-8 text-amber-400" />
            </motion.div>
            <h3 className="text-sm font-medium text-white">Monitoring</h3>
          </motion.div>

          <motion.div
            className="flex flex-col items-center text-center"
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mb-3"
              variants={pulseVariants}
              animate="pulse"
            >
              <FileCode className="w-8 h-8 text-rose-400" />
            </motion.div>
            <h3 className="text-sm font-medium text-white">Secure Code</h3>
          </motion.div>

          <motion.div
            className="flex flex-col items-center text-center"
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
          >
            <motion.div
              className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mb-3"
              variants={floatVariants}
              animate="float"
            >
              <Database className="w-8 h-8 text-blue-400" />
            </motion.div>
            <h3 className="text-sm font-medium text-white">Data Security</h3>
          </motion.div>
        </motion.div>

        {/* Central security hub visualization */}
        <motion.div
          className="mt-16 relative max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="relative h-[200px]">
            {/* Central hub */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center z-10"
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(16, 185, 129, 0)",
                  "0 0 0 20px rgba(16, 185, 129, 0.1)",
                  "0 0 0 0 rgba(16, 185, 129, 0)",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-emerald-500/30 flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <Shield className="w-8 h-8 text-emerald-400" />
              </motion.div>
            </motion.div>

            {/* Orbiting elements */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2"
              variants={rotateVariants}
              animate="rotate"
            >
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <motion.div
                  key={i}
                  className="absolute w-10 h-10 rounded-full bg-gray-800/80 border border-gray-700 flex items-center justify-center"
                  style={{
                    top: `${50 + 40 * Math.sin((angle * Math.PI) / 180)}%`,
                    left: `${50 + 40 * Math.cos((angle * Math.PI) / 180)}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  whileHover={{ scale: 1.2, backgroundColor: "rgba(16, 185, 129, 0.2)" }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, delay: i * 0.3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {i % 6 === 0 && <Lock className="w-5 h-5 text-cyan-400" />}
                    {i % 6 === 1 && <AlertTriangle className="w-5 h-5 text-purple-400" />}
                    {i % 6 === 2 && <Eye className="w-5 h-5 text-amber-400" />}
                    {i % 6 === 3 && <FileCode className="w-5 h-5 text-rose-400" />}
                    {i % 6 === 4 && <Database className="w-5 h-5 text-blue-400" />}
                    {i % 6 === 5 && <Shield className="w-5 h-5 text-emerald-400" />}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: -1 }}>
              {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                <motion.line
                  key={i}
                  x1="50%"
                  y1="50%"
                  x2={`${50 + 40 * Math.cos((angle * Math.PI) / 180)}%`}
                  y2={`${50 + 40 * Math.sin((angle * Math.PI) / 180)}%`}
                  stroke="#10b981"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                  initial={{ opacity: 0.3 }}
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 3, delay: i * 0.5, repeat: Number.POSITIVE_INFINITY }}
                />
              ))}
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
