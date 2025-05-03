"use client"
import React from 'react';
import CTA from '@/components/cta';
import {motion} from "framer-motion"
export default function ContactSection() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="z-30 pt-8 text-5xl font-semibold text-emerald-500 sm:text-4xl md:text-7xl"
      >
        Feel Free
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="z-30 pt-4 text-2xl font-bold text-white md:text-3xl"
      >
        To Contact Us
      </motion.div>
      <CTA
        whiteTitle="The Future of"
        greenTitle="Security Testing"
        description="Our skilled security professionals are ready to support you with thorough audits and assessments. Reach out to us today for expert solutions!"
      />
    </main>
  );
}
