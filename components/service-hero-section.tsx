'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function ServiceHeroSection() {
  return (
    <section className="flex min-h-screen justify-center pt-20 md:pt-16">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col space-y-4 text-center"
      >
        <motion.span
          variants={item}
          className="z-20 text-4xl tracking-wide md:text-5xl"
        >
          Weed Out
        </motion.span>
        <motion.span
          variants={item}
          className="z-20 py-1 text-5xl font-extrabold tracking-wider text-emerald-500 selection:bg-emerald-300 md:py-4 md:text-8xl"
        >
          Vulnerabilities
        </motion.span>
        <motion.span variants={item} className="z-20 text-xl md:text-5xl">
          With Our Comprehensive
        </motion.span>
        <motion.span
          variants={item}
          className="z-20 text-4xl font-medium md:text-5xl"
        >
          Security Services
        </motion.span>
        <motion.span
          variants={item}
          className="z-20 md:max-w-[50vw] pt-16 text-2xl font-extralight opacity-70"
        >
          scaninfoga offers a wide variety of penetration testing services,
          providing targeted vulnerability redressal across a host of
          applications.
        </motion.span>
        <motion.a
          variants={item}
          className="group z-20 pt-16 text-2xl font-extralight opacity-70 hover:cursor-pointer"
        >
          <span className="max-w-60 bg-orange-600 p-4 font-semibold transition-opacity duration-500 group-hover:opacity-50">
            Talk To An Expert
          </span>
        </motion.a>
      </motion.div>
    </section>
  );
}
