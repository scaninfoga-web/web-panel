"use client"

import { motion } from "framer-motion"
import { BookOpen, GraduationCap, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const courses = [
  {
    title: "Ethical Hacking Fundamentals",
    description: "Learn the basics of ethical hacking and penetration testing techniques.",
    level: "Beginner",
    duration: "8 weeks",
    students: 1240,
    popular: true,
  },
  {
    title: "Advanced Network Security",
    description: "Master advanced techniques for securing network infrastructure against attacks.",
    level: "Intermediate",
    duration: "10 weeks",
    students: 856,
    popular: false,
  },
  {
    title: "Secure Coding Practices",
    description: "Develop secure applications by learning defensive coding techniques.",
    level: "Intermediate",
    duration: "6 weeks",
    students: 920,
    popular: false,
  },
  {
    title: "Digital Forensics",
    description: "Learn how to investigate security incidents and collect digital evidence.",
    level: "Advanced",
    duration: "12 weeks",
    students: 645,
    popular: true,
  },
]

export default function Education() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cybersecurity <span className="text-emerald-500">Education</span>
          </h2>
          <p className="text-lg text-white/70">
            Enhance your skills with our expert-led cybersecurity courses and training programs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gray-900/50 border-gray-800 hover:border-emerald-500/50 transition-all duration-300 h-full flex flex-col">
                <CardHeader>
                  {course.popular && (
                    <Badge className="self-start mb-2 bg-emerald-500 text-black hover:bg-emerald-600">Popular</Badge>
                  )}
                  <CardTitle className="text-xl text-white font-bold group-hover:text-emerald-400 transition-colors duration-300">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-white/70">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow">
                  <div className="flex items-center text-sm text-white/60">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    <span>Level: {course.level}</span>
                  </div>
                  <div className="flex items-center text-sm text-white/60">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span>Duration: {course.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-white/60">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    className="w-full text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                  >
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button size="lg" className="bg-emerald-500 text-black hover:bg-emerald-600">
            View All Courses <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
