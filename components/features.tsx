"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

export default function Features() {
  const features = [
    "Advanced threat detection and prevention",
    "Real-time monitoring and alerts",
    "Compliance with industry regulations",
    "Secure cloud infrastructure",
    "Data encryption and protection",
    "Regular security updates and patches",
    "User access control and authentication",
    "Backup and disaster recovery",
    "24/7 security support",
    "Custom security solutions",
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-transparent to-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-emerald-500/20">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent_70%)]"></div>

              {/* Code Matrix Animation */}
              <div className="absolute inset-0 overflow-hidden opacity-30">
                <div className="matrix-code-animation"></div>
              </div>

              {/* Hexagon Grid Pattern */}
              <div className="absolute inset-0 bg-[url('/images/hexagon-grid.svg')] bg-repeat opacity-10"></div>

              {/* Glowing Orb */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-32 h-32 rounded-full bg-emerald-500/20 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-emerald-500/30 animate-ping"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-emerald-500/40"></div>
              </div>

              {/* Digital Circuit Lines */}
              <div className="absolute inset-0">
                <svg width="100%" height="100%" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100,100 L200,150 L300,100 L400,150"
                    stroke="rgba(16,185,129,0.3)"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M100,200 L200,250 L300,200 L400,250"
                    stroke="rgba(16,185,129,0.3)"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M100,300 L200,350 L300,300 L400,350"
                    stroke="rgba(16,185,129,0.3)"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path d="M150,100 L150,400" stroke="rgba(16,185,129,0.2)" strokeWidth="1" fill="none" />
                  <path d="M250,100 L250,400" stroke="rgba(16,185,129,0.2)" strokeWidth="1" fill="none" />
                  <path d="M350,100 L350,400" stroke="rgba(16,185,129,0.2)" strokeWidth="1" fill="none" />
                </svg>
              </div>
            </div>

            {/* Glow effects */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Enterprise-Grade <span className="text-emerald-500">Security</span> Features
            </h2>
            <p className="text-lg text-white/70">
              Our comprehensive security platform provides cutting-edge protection for businesses of all sizes. We
              combine advanced technology with expert knowledge to deliver unmatched security.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-white/80">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
