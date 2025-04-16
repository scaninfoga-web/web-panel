"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    quote:
      "The cybersecurity training from ScanInfoga has been invaluable for our team. We've significantly improved our security posture and prevented several potential breaches.",
    name: "Sarah Johnson",
    title: "CTO, TechSolutions Inc.",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "Their penetration testing services uncovered vulnerabilities we had no idea existed. The detailed reports and remediation advice were extremely helpful.",
    name: "Michael Chen",
    title: "Security Director, DataSecure",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "The incident response team at ScanInfoga saved our business when we experienced a ransomware attack. Their quick action and expertise were remarkable.",
    name: "Emily Rodriguez",
    title: "CEO, CloudNine Systems",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900/50 to-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="text-emerald-500">Clients</span> Say
          </h2>
          <p className="text-lg text-white/70">
            Hear from organizations that have strengthened their security with our solutions
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute top-10 left-0 -translate-x-1/2 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-0 translate-x-1/2 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>

          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-900/40 border border-gray-800 rounded-2xl p-8 md:p-12 relative"
          >
            <Quote className="absolute top-8 left-8 h-12 w-12 text-emerald-500/20" />

            <div className="text-center">
              <p className="text-xl md:text-2xl italic text-white/90 mb-8 relative z-10">
                "{testimonials[currentIndex].quote}"
              </p>

              <Avatar className="w-16 h-16 mx-auto mb-4 border-2 border-emerald-500/30">
                <AvatarImage
                  src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                  alt={testimonials[currentIndex].name}
                />
                <AvatarFallback className="bg-emerald-500/10 text-emerald-500">
                  {testimonials[currentIndex].name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <h4 className="text-lg font-semibold">{testimonials[currentIndex].name}</h4>
              <p className="text-white/60">{testimonials[currentIndex].title}</p>
            </div>
          </motion.div>

          <div className="flex justify-center mt-8 space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="bg-gray-900/70 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500 hover:text-emerald-300 transition-all duration-300"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous testimonial</span>
            </Button>

            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-emerald-500 scale-125" : "bg-gray-700 hover:bg-emerald-500/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="bg-gray-900/70 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500 hover:text-emerald-300 transition-all duration-300"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
