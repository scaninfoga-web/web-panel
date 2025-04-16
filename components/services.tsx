"use client"

import { motion } from "framer-motion"
import { Shield, Search, FileCode, Server, Lock, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const services = [
  {
    icon: Shield,
    title: "Vulnerability Assessment",
    description: "Comprehensive scanning and assessment to identify security vulnerabilities in your systems.",
  },
  {
    icon: Search,
    title: "Penetration Testing",
    description: "Simulated cyber attacks to evaluate the security of your IT infrastructure.",
  },
  {
    icon: FileCode,
    title: "Secure Code Review",
    description: "Expert analysis of application source code to identify security flaws and vulnerabilities.",
  },
  {
    icon: Server,
    title: "Network Security",
    description: "Protection for your network infrastructure against unauthorized access and attacks.",
  },
  {
    icon: Lock,
    title: "Data Protection",
    description: "Solutions to safeguard sensitive data and ensure compliance with regulations.",
  },
  {
    icon: AlertTriangle,
    title: "Incident Response",
    description: "Rapid response to security breaches to minimize damage and restore operations.",
  },
]

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      scale: 1.03,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative text-center mb-16"
        >
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl"></div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative">
            Our{" "}
            <span className="text-emerald-500 relative inline-block">
              Security
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-500/50"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
              ></motion.span>
            </span>{" "}
            Services
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Comprehensive cybersecurity solutions to protect your digital assets from evolving threats
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
            >
              <Card className="bg-gray-900/50 border-gray-800 hover:border-emerald-500/50 transition-all duration-300 h-full group hover:translate-y-[-5px] hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 transition-all duration-300 group-hover:scale-110">
                    <service.icon className="w-6 h-6 text-emerald-500 group-hover:text-emerald-400" />
                  </div>
                  <CardTitle className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70 text-base group-hover:text-white/90 transition-colors duration-300">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
