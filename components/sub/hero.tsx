// 'use client';

// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Button } from '@/components/ui/button';
// import { Shield, Lock, Database, Code } from 'lucide-react';
// import { Typewriter } from 'react-simple-typewriter';
// import { collectClientInfo } from '@/lib/naviagtorGeo';
// export default function Hero() {
//   const [typedText, setTypedText] = useState('');
//   const [typedHeading, setTypedHeading] = useState('');
//   const fullText = 'Secure. Protect. Defend.';
//   const fullHeading = 'Protecting Your Digital Assets in a Connected World';

//   // useEffect(() => {
//   //   let currentIndex = 0;
//   //   const typingInterval = setInterval(() => {
//   //     if (currentIndex <= fullText.length) {
//   //       setTypedText(fullText.slice(0, currentIndex));
//   //       currentIndex++;
//   //     } else {
//   //       clearInterval(typingInterval);

//   //       // Reset after a pause
//   //       setTimeout(() => {
//   //         currentIndex = 0;
//   //         const resetInterval = setInterval(() => {
//   //           if (currentIndex <= fullText.length) {
//   //             setTypedText(fullText.slice(0, currentIndex));
//   //             currentIndex++;
//   //           } else {
//   //             clearInterval(resetInterval);
//   //           }
//   //         }, 100);
//   //       }, 2000);
//   //     }
//   //   }, 100);

//   //   // Heading typing animation - starts after a delay
//   //   setTimeout(() => {
//   //     let headingIndex = 0;
//   //     const headingInterval = setInterval(() => {
//   //       if (headingIndex <= fullHeading.length) {
//   //         setTypedHeading(fullHeading.slice(0, headingIndex));
//   //         headingIndex++;
//   //       } else {
//   //         clearInterval(headingInterval);
//   //       }
//   //     }, 50); // Faster typing for the heading

//   //     return () => clearInterval(headingInterval);
//   //   }, 500); // Start after a short delay

//   //   return () => clearInterval(typingInterval);
//   // }, []);

//   return (
//     <section className="relative overflow-hidden bg-gradient-to-b from-black/70 via-black/40 to-transparent pb-16 pt-32 md:pb-24 min-h-[100vh]">
//       <div className="container mx-auto px-4 mt-4">
//         <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="space-y-6"
//           >
//             <div className="inline-block rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-500">
//               Leading Cybersecurity Solutions
//             </div>
//             <h1 className="min-h-[180px] font-bold tracking-tight text-4xl">
//               <div className='text-emerald-500 text-6xl mb-6'>Welcome to Scaninfoga</div>
//               <Typewriter
//                 words={['The Future of Cyber Security & Digital Investigations']}
//                 // loop={0}
//                 // cursor
//                 // cursorStyle='_'
//                 typeSpeed={50}
//                 deleteSpeed={0}
//                 delaySpeed={1}
//               />
//             </h1>
//             <p className="max-w-lg text-xl text-white/70">
//               Comprehensive cybersecurity services, education, and tools to
//               defend against evolving threats.
//             </p>
//             <div className="h-8 font-mono text-xl text-emerald-400">
//               <h1 className="font-mono text-2xl text-emerald-400">
//                 &gt; &nbsp;
//                 <Typewriter
//                   words={['Secure.', 'Defend.', 'Strengthen.']}
//                   loop={true}
//                   cursor
//                   cursorStyle="_"
//                   typeSpeed={100}
//                   deleteSpeed={50}
//                   delaySpeed={1000}
//                 />
//               </h1>
//             </div>
//             <div className="flex flex-wrap gap-4 pt-2">
//               <Button
//                 size="lg"
//                 className="bg-emerald-500 text-black hover:bg-emerald-600"
//               >
//                 Explore Services
//               </Button>
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="border-emerald-500/50 text-emerald-400 hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-300"
//               >
//                 Learn More
//               </Button>
//             </div>
//           </motion.div>

//           {/* <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="relative"
//           >
//             <div className="relative h-[400px] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 md:h-[500px]">
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="h-64 w-64 animate-pulse rounded-full bg-emerald-500/20"></div>
//               </div>

//               <motion.div
//                 animate={{
//                   y: [0, -10, 0],
//                   rotate: [0, 5, 0],
//                 }}
//                 transition={{
//                   repeat: Number.POSITIVE_INFINITY,
//                   duration: 5,
//                   ease: 'easeInOut',
//                 }}
//                 className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2 transform"
//               >
//                 <Shield className="h-16 w-16 text-emerald-500" />
//               </motion.div>

//               <motion.div
//                 animate={{
//                   y: [0, 10, 0],
//                   rotate: [0, -5, 0],
//                 }}
//                 transition={{
//                   repeat: Number.POSITIVE_INFINITY,
//                   duration: 4,
//                   ease: 'easeInOut',
//                 }}
//                 className="absolute right-1/4 top-1/3 -translate-y-1/2 translate-x-1/2 transform"
//               >
//                 <Lock className="h-12 w-12 text-cyan-400" />
//               </motion.div>

//               <motion.div
//                 animate={{
//                   y: [0, -8, 0],
//                   rotate: [0, -3, 0],
//                 }}
//                 transition={{
//                   repeat: Number.POSITIVE_INFINITY,
//                   duration: 6,
//                   ease: 'easeInOut',
//                 }}
//                 className="absolute bottom-1/3 left-1/3 -translate-x-1/2 translate-y-1/2 transform"
//               >
//                 <Database className="h-14 w-14 text-purple-400" />
//               </motion.div>

//               <motion.div
//                 animate={{
//                   y: [0, 12, 0],
//                   rotate: [0, 8, 0],
//                 }}
//                 transition={{
//                   repeat: Number.POSITIVE_INFINITY,
//                   duration: 5.5,
//                   ease: 'easeInOut',
//                 }}
//                 className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 transform"
//               >
//                 <Code className="h-10 w-10 text-yellow-400" />
//               </motion.div>

//               <div className="absolute inset-0 overflow-hidden">
//                 {/* Digital code rain effect */}
//                 {/* <div className="code-rain-animation absolute inset-0 opacity-100"></div> */}

//                 {/* Animated security nodes */}
//                 {/* <div className="absolute inset-0">
//                   <svg
//                     width="100%"
//                     height="100%"
//                     viewBox="0 0 800 600"
//                     className="security-nodes"
//                   >
//                     <g className="nodes">
//                       {Array.from({ length: 15 }).map((_, i) => (
//                         <circle
//                           key={i}
//                           cx={100 + (i % 5) * 150}
//                           cy={100 + Math.floor(i / 5) * 150}
//                           r={3 + Math.random() * 3}
//                           className={`node-point node-${i}`}
//                           fill="#10b981"
//                         />
//                       ))}
//                     </g>
//                     <g className="connections">
//                       {Array.from({ length: 20 }).map((_, i) => (
//                         <path
//                           key={i}
//                           d={`M${100 + (i % 5) * 150},${100 + Math.floor(i / 5) * 150} L${100 + ((i + 1) % 5) * 150},${100 + Math.floor((i + 1) / 5) * 150}`}
//                           className={`connection connection-${i}`}
//                           stroke="#10b981"
//                           strokeWidth="1"
//                           strokeOpacity="0.3"
//                         />
//                       ))}
//                     </g>
//                     <g className="security-alerts">
//                       {Array.from({ length: 5 }).map((_, i) => (
//                         <circle
//                           key={i}
//                           cx={150 + i * 120}
//                           cy={300}
//                           r="8"
//                           className={`security-alert security-alert-${i}`}
//                           fill="#ef4444"
//                           opacity="0"
//                         />
//                       ))}
//                     </g>
//                     <g className="shields">
//                       {Array.from({ length: 3 }).map((_, i) => (
//                         <path
//                           key={i}
//                           d={`M${200 + i * 200},150 L${220 + i * 200},120 L${240 + i * 200},150 L${240 + i * 200},190 L${220 + i * 200},210 L${200 + i * 200},190 Z`}
//                           className={`shield shield-${i}`}
//                           stroke="#10b981"
//                           strokeWidth="2"
//                           fill="none"
//                         />
//                       ))}
//                     </g>
//                   </svg>
//                 </div> */}

//                 {/* Binary overlay */}
//                 {/* <div className="binary-overlay absolute inset-0 opacity-10"></div> */}

//                 {/* Grid pattern underneath */}
//                 {/* <div className="bg-grid-pattern absolute inset-0 opacity-20"></div>
//               </div>

//               <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent"></div>
//             </div> */}

//             {/* <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-emerald-500/30 blur-3xl"></div> */}
//             {/* <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-cyan-500/20 blur-2xl"></div> */}
//           {/* </motion.div>  */}

//           <video src='/video-home.mp4' autoPlay loop muted className="w-full h-full object-cover rounded-3xl" />
//         </div>
//       </div>
//     </section>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Database, Code } from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

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
    <section className="flex min-h-screen items-center overflow-hidden pb-8 pt-20">
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
