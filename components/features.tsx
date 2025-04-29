'use client';

import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function Features() {
  const features = [
    'Advanced threat detection and prevention',
    'Real-time monitoring and alerts',
    'Compliance with industry regulations',
    'Secure cloud infrastructure',
    'Data encryption and protection',
    'Regular security updates and patches',
    'User access control and authentication',
    'Backup and disaster recovery',
    '24/7 security support',
    'Custom security solutions',
  ];

  return (
    <section className="bg-gradient-to-b from-transparent to-gray-900/50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[400px] w-full overflow-hidden rounded-2xl border border-emerald-500/20 md:h-[500px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent_70%)]"></div>

              {/* Code Matrix Animation */}
              <div className="absolute inset-0 overflow-hidden opacity-30">
                <div className="matrix-code-animation"></div>
              </div>

              {/* Hexagon Grid Pattern */}
              <div className="absolute inset-0 bg-[url('/images/hexagon-grid.svg')] bg-repeat opacity-10"></div>

              {/* Glowing Orb */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                <div className="h-32 w-32 animate-pulse rounded-full bg-emerald-500/20"></div>
                <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 transform animate-ping rounded-full bg-emerald-500/30"></div>
                <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-emerald-500/40"></div>
              </div>

              {/* Digital Circuit Lines */}
              <div className="absolute inset-0">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 500 500"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                  <path
                    d="M150,100 L150,400"
                    stroke="rgba(16,185,129,0.2)"
                    strokeWidth="1"
                    fill="none"
                  />
                  <path
                    d="M250,100 L250,400"
                    stroke="rgba(16,185,129,0.2)"
                    strokeWidth="1"
                    fill="none"
                  />
                  <path
                    d="M350,100 L350,400"
                    stroke="rgba(16,185,129,0.2)"
                    strokeWidth="1"
                    fill="none"
                  />
                </svg>
              </div>
            </div>

            {/* Glow effects */}
            <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl"></div>
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold md:text-4xl">
              Enterprise-Grade{' '}
              <span className="text-emerald-500">Security</span> Features
            </h2>
            <p className="text-lg text-white/70">
              Our comprehensive security platform provides cutting-edge
              protection for businesses of all sizes. We combine advanced
              technology with expert knowledge to deliver unmatched security.
            </p>

            <div className="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-3"
                >
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                  <span className="text-white/80">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
