'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Database, Code } from 'lucide-react';

const RightSection = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, scale: 0, x: -1000 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        <div className="relative h-[400px] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 md:h-[500px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-64 w-64 animate-pulse rounded-full bg-emerald-500/20"></div>
          </div>

          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 5,
              ease: 'easeInOut',
            }}
            className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2 transform"
          >
            <Shield className="h-16 w-16 text-emerald-500" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, 10, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 4,
              ease: 'easeInOut',
            }}
            className="absolute right-1/4 top-1/3 -translate-y-1/2 translate-x-1/2 transform"
          >
            <Lock className="h-12 w-12 text-cyan-400" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, -3, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 6,
              ease: 'easeInOut',
            }}
            className="absolute bottom-1/3 left-1/3 -translate-x-1/2 translate-y-1/2 transform"
          >
            <Database className="h-14 w-14 text-purple-400" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, 12, 0],
              rotate: [0, 8, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 5.5,
              ease: 'easeInOut',
            }}
            className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 transform"
          >
            <Code className="h-10 w-10 text-yellow-400" />
          </motion.div>

          <div className="absolute inset-0 overflow-hidden">
            {/* Digital code rain effect */}
            <div className="code-rain-animation absolute inset-0 opacity-100"></div>

            {/* Animated security nodes */}
            <div className="absolute inset-0">
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 800 600"
                className="security-nodes"
              >
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
            <div className="binary-overlay absolute inset-0 opacity-10"></div>

            {/* Grid pattern underneath */}
            <div className="bg-grid-pattern absolute inset-0 opacity-20"></div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent"></div>
        </div>

        <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-emerald-500/30 blur-3xl"></div>
        <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-cyan-500/20 blur-2xl"></div>
      </motion.div>
    </div>
  );
};

export default RightSection;
