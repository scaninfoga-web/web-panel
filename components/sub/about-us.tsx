'use client';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function AboutUsSection() {
  return (
    <section className="flex flex-col items-center justify-center overflow-hidden text-white">
      {/* <div className="absolute left-0 top-32 -z-30 hidden h-56 w-56 rounded-full bg-emerald-500 opacity-30 blur-3xl sm:h-72 sm:w-72 md:visible"></div> */}
      {/* <div className="absolute bottom-0 right-0 -z-30 hidden h-72 w-72 rounded-full bg-orange-800 opacity-30 blur-3xl sm:h-96 sm:w-96 md:visible"></div> */}

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={fadeUp}
        className="w-full max-w-6xl space-y-8 text-center sm:space-y-10"
      >
        <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          About Us
        </h2>

        <p className="text-xl text-gray-300 text-white/70 sm:text-lg md:text-2xl">
          At <span className="font-semibold text-emerald-400">scaninfoga</span>,
          we specialize in protecting businesses from cyber threats through
          advanced penetration testing and tailored security strategies. Our
          team of cybersecurity experts is committed to identifying and
          addressing vulnerabilities before they can compromise your
          organization.
        </p>

        <p className="text-xl text-gray-300 text-white/70 sm:text-lg md:text-2xl">
          We empower businesses to operate confidently, knowing they are
          safeguarded by cutting-edge solutions designed to stay ahead of the
          ever-changing cyber landscape.
        </p>
      </motion.div>

      <div className="my-16 flex w-full max-w-6xl flex-col items-center justify-center space-y-8 text-center sm:my-20 sm:space-y-10 md:my-24">
        <motion.h3
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-3xl font-bold text-white sm:text-4xl md:text-5xl"
        >
          Why Choose Us?
        </motion.h3>

        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="space-y-6 text-left text-base text-gray-300 text-white/70 sm:space-y-8 sm:text-lg md:text-2xl"
        >
          <li>
            <strong className="text-white/90">
              🔒 Expertise You Can Trust:
            </strong>{' '}
            Certified penetration testers with hands-on experience securing
            systems, applications, and networks.
          </li>
          <li>
            <strong className="text-white/90">🧩 Tailored Services:</strong>{' '}
            Customized testing to suit your organization’s specific needs.
          </li>
          <li>
            <strong className="text-white/90">
              📊 Comprehensive Reporting:
            </strong>{' '}
            Clear, actionable insights with mitigation strategies.
          </li>
          <li>
            <strong className="text-white/90">
              ⚙️ Cutting-Edge Tools and Techniques:
            </strong>{' '}
            We use modern tools, methodologies, and best practices to deliver
            thorough assessments.
          </li>
        </motion.ul>
      </div>

      <div className="mt-20 flex w-full max-w-6xl flex-col items-center justify-center space-y-4 sm:mt-28 sm:space-y-6 md:mt-32">
        <motion.h3
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-3xl font-bold text-white sm:text-4xl md:text-5xl"
        >
          Meet the Team
        </motion.h3>
        <div className="h-48 w-full rounded-xl border border-dashed border-gray-600 bg-gray-800/30 p-4 text-center text-sm text-gray-500 sm:h-56 sm:p-6 sm:text-base md:h-64 md:p-8">
          Team photo and member names coming soon.
        </div>
      </div>
    </section>
  );
}
