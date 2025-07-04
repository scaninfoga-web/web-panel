'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Database, Code } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const data = useSelector((state: RootState) => state.info);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  // Item animation variants
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="flex min-h-screen items-center overflow-hidden pb-8 pt-28 md:pt-20">
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-25 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute left-10 top-20 h-4 w-4 rotate-45 bg-emerald-500/20"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute right-20 top-40 h-6 w-6 rounded-full bg-cyan-400/20"
        />

        {/* Grid pattern */}
        {/* <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" /> */}

        {/* Gradient orbs */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
          className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"
        />
      </div>

      <div className="container relative z-10 mx-auto w-full px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid min-h-[80vh] grid-cols-1 items-center gap-8 lg:grid-cols-2"
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col justify-center space-y-6"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400 backdrop-blur-sm"
            >
              <Shield className="h-4 w-4" />
              Leading Cybersecurity Solutions
            </motion.div>

            {/* Main heading */}
            <div className="space-y-4">
              <motion.h1
                variants={itemVariants}
                className="text-4xl font-bold leading-tight text-emerald-400 md:text-6xl"
              >
                Welcome to Scaninfoga
              </motion.h1>

              <motion.div
                variants={itemVariants}
                className="min-h-[80px] text-xl font-bold leading-relaxed text-white md:text-3xl"
              >
                <Typewriter
                  words={[
                    'The Future of Cyber Security & Digital Investigations',
                  ]}
                  loop
                  typeSpeed={50}
                  deleteSpeed={40}
                  delaySpeed={2000}
                />
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl"
            >
              Accelerate every investigation.The all-in-one platform for
              cybercrime, telecom, dark web, and financial intelligence.and
              evidence{' '}
              <span className="text-2xl font-semibold text-emerald-500">
                99x faster
              </span>
              , with one powerful tool.
            </motion.p>

            {/* Terminal-style text */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="rounded-lg border border-emerald-500/20 bg-slate-900/50 p-4 font-mono text-lg text-emerald-400 backdrop-blur-sm md:text-xl"
            >
              <span className="text-emerald-300">&gt;</span>&nbsp;
              <Typewriter
                words={[
                  'Telecom Intelligence',
                  'Government Database Access.',
                  'Employee Monitoring.',
                  'Utility Connections.',
                  'Digital Footprint Analysis.',
                  'Dark Web Surveillance.',
                  'Google Profile & Web Presence Trace.',
                  'Multi-Mobile Number Extraction.',
                  'Multi-Email ID Discovery.',
                  'Device Fingerprinting.',
                  'IP Address Tracing.',
                  'Username Trace.',
                  'Website Investigation.',
                  'Cybercrime Investigation.',
                  'Business Track.',
                  'Financial Trace.',
                ]}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={100}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </motion.div>

            {/* Action buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-4 pt-4 sm:flex-row"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="rounded-2xl bg-emerald-500 px-8 py-6 text-lg font-semibold text-black shadow-lg transition-all duration-300 hover:bg-emerald-400 hover:shadow-emerald-500/25"
                >
                  Start Investigation
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-2xl border-2 border-emerald-500/50 px-8 py-6 text-lg font-semibold text-emerald-400 backdrop-blur-sm transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300"
                >
                  Explore Services
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right side - Video and floating icons */}
          <motion.div
            variants={itemVariants}
            className="relative flex h-full items-center justify-center"
          >
            {/* Video container */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative min-h-[360px] w-full max-w-2xl overflow-hidden border border-emerald-500/20 shadow-2xl shadow-emerald-500/10"
            >
              <video
                src="https://website-stuff-logos.s3.ap-south-1.amazonaws.com/video-home.mp4"
                autoPlay
                loop
                muted
                className="aspect-video h-full w-full object-cover"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
            </motion.div>

            {/* Floating security icons */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: 'easeInOut',
              }}
              whileHover={{ scale: 1.1 }}
              className="absolute -left-6 -top-6 rounded-2xl border border-emerald-500/30 bg-slate-900/80 p-4 shadow-xl backdrop-blur-sm"
            >
              <Shield className="h-8 w-8 text-emerald-400" />
            </motion.div>

            <motion.div
              animate={{
                y: [0, 12, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: 'easeInOut',
                delay: 1,
              }}
              whileHover={{ scale: 1.1 }}
              className="absolute -right-8 -top-4 rounded-2xl border border-cyan-500/30 bg-slate-900/80 p-4 shadow-xl backdrop-blur-sm"
            >
              <Lock className="h-6 w-6 text-cyan-400" />
            </motion.div>

            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 3, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 6,
                ease: 'easeInOut',
                delay: 2,
              }}
              whileHover={{ scale: 1.1 }}
              className="absolute -bottom-6 -left-8 rounded-2xl border border-purple-500/30 bg-slate-900/80 p-4 shadow-xl backdrop-blur-sm"
            >
              <Database className="h-7 w-7 text-purple-400" />
            </motion.div>

            <motion.div
              animate={{
                y: [0, 8, 0],
                rotate: [0, -3, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4.5,
                ease: 'easeInOut',
                delay: 0.5,
              }}
              whileHover={{ scale: 1.1 }}
              className="absolute -bottom-4 -right-6 rounded-2xl border border-yellow-500/30 bg-slate-900/80 p-4 shadow-xl backdrop-blur-sm"
            >
              <Code className="h-6 w-6 text-yellow-400" />
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-emerald-500/20 blur-2xl"
            />
            <motion.div
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-cyan-500/20 blur-xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
