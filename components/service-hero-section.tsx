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
        className="flex flex-col space-y-2 text-center"
      >
        <motion.span
          variants={item}
          className="z-20 text-2xl text-white/70 md:text-5xl"
        >
          Weed Out
        </motion.span>
        <motion.span
          variants={item}
          className="z-20 text-[43px] font-extrabold tracking-wider text-emerald-500 selection:bg-emerald-300 md:py-4 md:text-8xl"
        >
          Vulnerabilities
        </motion.span>
        <motion.span
          variants={item}
          className="z-20 text-2xl text-white/70 md:text-5xl"
        >
          With Our Comprehensive
        </motion.span>
        <motion.span
          variants={item}
          className="z-20 text-2xl text-white/70 md:text-5xl"
        >
          Security Services
        </motion.span>
        <motion.span
          variants={item}
          className="z-20 max-w-lg pt-16 text-xl text-white/70 md:max-w-[50vw]"
        >
          scaninfoga offers a wide variety of penetration testing services,
          providing targeted vulnerability redressal across a host of
          applications.
        </motion.span>
        <motion.a
          variants={item}
          className="group z-20 pt-16 text-2xl font-extralight opacity-70 hover:cursor-pointer"
        >
          <span className="bg-emerald-500 px-4 md:px-10 py-3 font-semibold text-black transition-opacity duration-500 group-hover:opacity-50">
            Talk To An Expert
          </span>
        </motion.a>
      </motion.div>
    </section>
  );
}
