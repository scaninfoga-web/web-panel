"use client"

import React from 'react'
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { Button } from '@/components/ui/button';

const LeftSection = () => {
  return (
    <div>
      <motion.div
            initial={{ opacity: 0, x: 1000, scale: 0 }}
            animate={{ opacity: 1, x: 0, scale: 1}}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-500">
              Leading Cybersecurity Solutions
            </div>

            <h1 className="text-6xl font-bold">
              Protecting your <br />{' '}
              <span className="text-emerald-500"> Digital Assets </span> <br />
              In a Connected World !!!
            </h1>

            <p className="max-w-lg text-xl text-white/70">
              Comprehensive cybersecurity services, education, and tools to
              defend against evolving threats.
            </p>

            <h1 className="font-mono text-2xl text-emerald-400">
              &gt; &nbsp;
              <Typewriter
                words={['Secure.', 'Defend.', 'Strengthen.']}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={100}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h1>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                size="lg"
              >
                Explore Services
              </Button>
              <Button
                size="lg"
                variant="outline"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
    </div>
  )
}

export default LeftSection
