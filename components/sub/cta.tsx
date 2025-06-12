/* eslint-disable react/jsx-no-duplicate-props */
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, Mail, ArrowRight, Lock, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface PageProps {
  whiteTitle: string;
  greenTitle: string;
  description: string;
}

export default function CTA({
  greenTitle,
  whiteTitle,
  description,
}: PageProps) {
  const [formHovered, setFormHovered] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.03, 1],
      boxShadow: [
        '0 0 0 0 rgba(16, 185, 129, 0)',
        '0 0 0 10px rgba(16, 185, 129, 0.1)',
        '0 0 0 0 rgba(16, 185, 129, 0)',
      ],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: 'loop',
      },
    },
  };

  const floatingIconVariants = {
    animate: (i: number) => ({
      y: [0, -15, 0],
      x: [0, i % 2 === 0 ? 10 : -10, 0],
      transition: {
        duration: 3 + i,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: 'loop',
        ease: 'easeInOut',
      },
    }),
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800"
        >
          <div className="absolute inset-0 bg-[url('/images/circuit-pattern.svg')] bg-cover bg-no-repeat opacity-5"></div>

          <motion.div
            className="absolute right-0 top-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl"
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'reverse',
            }}
          ></motion.div>

          <motion.div
            className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: 'reverse',
              delay: 2,
            }}
          ></motion.div>

          {/* Floating security icons */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <motion.div
              custom={1}
              variants={floatingIconVariants}
              animate="animate"
              className="absolute left-[10%] top-[20%]"
            >
              <Shield className="h-6 w-6 text-emerald-500/30" />
            </motion.div>

            <motion.div
              custom={2}
              variants={floatingIconVariants}
              animate="animate"
              className="absolute right-[15%] top-[30%]"
            >
              <Lock className="h-8 w-8 text-cyan-500/20" />
            </motion.div>

            <motion.div
              custom={3}
              variants={floatingIconVariants}
              animate="animate"
              className="absolute bottom-[25%] left-[20%]"
            >
              <CheckCircle className="h-5 w-5 text-emerald-500/20" />
            </motion.div>
          </div>

          <div className="relative p-8 md:p-12 lg:p-16">
            <motion.div
              className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div className="space-y-6" variants={containerVariants}>
                <motion.div
                  variants={itemVariants}
                  className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5"
                >
                  <Shield className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm font-medium text-emerald-500">
                    Protect Your Business
                  </span>
                </motion.div>

                <motion.h2
                  variants={itemVariants}
                  className="text-3xl font-bold md:text-4xl lg:text-5xl"
                >
                  {whiteTitle} <br />
                  <motion.span
                    className="inline-block text-emerald-500"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {greenTitle}
                  </motion.span>
                  ?
                </motion.h2>

                <motion.p
                  variants={itemVariants}
                  className="text-lg text-white/70"
                >
                  {description}
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-col gap-4 sm:flex-row"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <Button
                      size="lg"
                      className="bg-emerald-500 text-black hover:bg-emerald-600"
                    >
                      Schedule a Consultation
                    </Button>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-emerald-500/50 text-emerald-400 hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-300"
                    >
                      View Services <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={() => setFormHovered(true)}
                onHoverEnd={() => setFormHovered(false)}
                variants={pulseVariants}
                animate={formHovered ? 'pulse' : ''}
                className="rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-all duration-300 md:p-8"
              >
                <motion.h3
                  className="mb-6 text-xl font-bold"
                  variants={itemVariants}
                >
                  Get a Free Security Assessment
                </motion.h3>

                <motion.form className="space-y-4" variants={containerVariants}>
                  <motion.div
                    className="space-y-2"
                    variants={itemVariants}
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-white/70"
                    >
                      Full Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      className="border-gray-700 bg-gray-800/50 transition-all duration-300 focus:border-emerald-500"
                    />
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    variants={itemVariants}
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-white/70"
                    >
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="border-gray-700 bg-gray-800/50 transition-all duration-300 focus:border-emerald-500"
                    />
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    variants={itemVariants}
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <label
                      htmlFor="company"
                      className="text-sm font-medium text-white/70"
                    >
                      Company
                    </label>
                    <Input
                      id="company"
                      placeholder="Enter your company name"
                      className="border-gray-700 bg-gray-800/50 transition-all duration-300 focus:border-emerald-500"
                    />
                  </motion.div>

                  <motion.div
                    className="space-y-2"
                    variants={itemVariants}
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-white/70"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Tell us about your security needs"
                      className="w-full rounded-md border border-gray-700 bg-gray-800/50 p-3 text-white transition-all duration-300 focus:border-emerald-500 focus:outline-none"
                    ></textarea>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-emerald-500 text-black hover:bg-emerald-600"
                    >
                      <Mail className="mr-2 h-4 w-4" /> Request Assessment
                    </Button>
                  </motion.div>
                </motion.form>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
