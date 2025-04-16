"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Shield, Lock, Database, Code } from "lucide-react"

export default function Hero() {
  const [typedText, setTypedText] = useState("")
  const [typedHeading, setTypedHeading] = useState("")
  const fullText = "Secure. Protect. Defend."
  const fullHeading = "Protecting Your Digital Assets in a Connected World"

  useEffect(() => {
    // Original typing animation
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)

        // Reset after a pause
        setTimeout(() => {
          currentIndex = 0
          const resetInterval = setInterval(() => {
            if (currentIndex <= fullText.length) {
              setTypedText(fullText.slice(0, currentIndex))
              currentIndex++
            } else {
              clearInterval(resetInterval)
            }
          }, 100)
        }, 2000)
      }
    }, 100)

    // Heading typing animation - starts after a delay
    setTimeout(() => {
      let headingIndex = 0
      const headingInterval = setInterval(() => {
        if (headingIndex <= fullHeading.length) {
          setTypedHeading(fullHeading.slice(0, headingIndex))
          headingIndex++
        } else {
          clearInterval(headingInterval)
        }
      }, 50) // Faster typing for the heading

      return () => clearInterval(headingInterval)
    }, 500) // Start after a short delay

    return () => clearInterval(typingInterval)
  }, [])

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm font-medium">
              Leading Cybersecurity Solutions
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight min-h-[180px] md:min-h-[220px]">
              {typedHeading.includes("Digital") ? (
                <>
                  {typedHeading.split("Digital")[0]}Digital <br />
                  {typedHeading.includes("Assets") ? (
                    <>
                      <span className="text-emerald-500">Assets</span>
                      {typedHeading.includes("Assets in") ? (
                        <>
                          {" in "}
                          <br />
                          {typedHeading.split("Assets in ")[1]}
                        </>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                typedHeading
              )}
              <span className="animate-pulse">|</span>
            </h1>
            <p className="text-xl text-white/70 max-w-lg">
              Comprehensive cybersecurity services, education, and tools to defend against evolving threats.
            </p>
            <div className="h-8 font-mono text-emerald-400 text-xl">
              &gt; {typedText}
              <span className="animate-pulse">_</span>
            </div>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button size="lg" className="bg-emerald-500 text-black hover:bg-emerald-600">
                Explore Services
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500 hover:text-emerald-300"
              >
                Learn More
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-[400px] md:h-[500px] bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-2xl overflow-hidden border border-white/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-emerald-500/20 animate-pulse"></div>
              </div>

              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 5,
                  ease: "easeInOut",
                }}
                className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2"
              >
                <Shield className="w-16 h-16 text-emerald-500" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2"
              >
                <Lock className="w-12 h-12 text-cyan-400" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, -3, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 6,
                  ease: "easeInOut",
                }}
                className="absolute bottom-1/3 left-1/3 transform -translate-x-1/2 translate-y-1/2"
              >
                <Database className="w-14 h-14 text-purple-400" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 12, 0],
                  rotate: [0, 8, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 5.5,
                  ease: "easeInOut",
                }}
                className="absolute bottom-1/4 right-1/3 transform translate-x-1/2 translate-y-1/2"
              >
                <Code className="w-10 h-10 text-yellow-400" />
              </motion.div>

              <div className="absolute inset-0 overflow-hidden">
                {/* Digital code rain effect */}
                <div className="absolute inset-0 code-rain-animation opacity-20"></div>

                {/* Animated security nodes */}
                <div className="absolute inset-0">
                  <svg width="100%" height="100%" viewBox="0 0 800 600" className="security-nodes">
                    <g className="nodes">
                      {Array.from({ length: 15 }).map((_, i) => (
                        <circle
                          key={i}
                          cx={100 + (i % 5) * 150}
                          cy={100 + Math.floor(i / 5) * 150}
                          r={3 + Math.random() * 3}
                          className={`node-point node-${i}`}
                          fill="#10b981"
                        />
                      ))}
                    </g>
                    <g className="connections">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <path
                          key={i}
                          d={`M${100 + (i % 5) * 150},${100 + Math.floor(i / 5) * 150} L${100 + ((i + 1) % 5) * 150},${100 + Math.floor((i + 1) / 5) * 150}`}
                          className={`connection connection-${i}`}
                          stroke="#10b981"
                          strokeWidth="1"
                          strokeOpacity="0.3"
                        />
                      ))}
                    </g>
                    <g className="security-alerts">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <circle
                          key={i}
                          cx={150 + i * 120}
                          cy={300}
                          r="8"
                          className={`security-alert security-alert-${i}`}
                          fill="#ef4444"
                          opacity="0"
                        />
                      ))}
                    </g>
                    <g className="shields">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <path
                          key={i}
                          d={`M${200 + i * 200},150 L${220 + i * 200},120 L${240 + i * 200},150 L${240 + i * 200},190 L${220 + i * 200},210 L${200 + i * 200},190 Z`}
                          className={`shield shield-${i}`}
                          stroke="#10b981"
                          strokeWidth="2"
                          fill="none"
                        />
                      ))}
                    </g>
                  </svg>
                </div>

                {/* Binary overlay */}
                <div className="absolute inset-0 binary-overlay opacity-10"></div>

                {/* Grid pattern underneath */}
                <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent"></div>
            </div>

            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-500/30 rounded-full blur-3xl"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
