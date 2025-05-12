'use client';

import { motion } from 'framer-motion';
import {
  Shield,
  Search,
  FileCode,
  Server,
  Lock,
  AlertTriangle,
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const services = [
  {
    icon: Shield,
    title: 'Vulnerability Assessment',
    description:
      'Comprehensive scanning and assessment to identify security vulnerabilities in your systems.',
  },
  {
    icon: Search,
    title: 'Penetration Testing',
    description:
      'Simulated cyber attacks to evaluate the security of your IT infrastructure.',
  },
  {
    icon: FileCode,
    title: 'Secure Code Review',
    description:
      'Expert analysis of application source code to identify security flaws and vulnerabilities.',
  },
  {
    icon: Server,
    title: 'Network Security',
    description:
      'Protection for your network infrastructure against unauthorized access and attacks.',
  },
  {
    icon: Lock,
    title: 'Data Protection',
    description:
      'Solutions to safeguard sensitive data and ensure compliance with regulations.',
  },
  {
    icon: AlertTriangle,
    title: 'Incident Response',
    description:
      'Rapid response to security breaches to minimize damage and restore operations.',
  },
];

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    hover: {
      scale: 1.03,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <section className="relative py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative mb-16 text-center"
        >
          <div className="absolute -top-10 left-1/2 h-40 w-40 -translate-x-1/2 transform rounded-full bg-emerald-500/5 blur-3xl"></div>
          <h2 className="relative mb-4 text-3xl font-bold md:text-4xl">
            Our{' '}
            <span className="relative inline-block text-emerald-500">
              Security
              <motion.span
                className="absolute -bottom-1 left-0 h-0.5 w-full bg-emerald-500/50"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
              ></motion.span>
            </span>{' '}
            Services
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            Comprehensive cybersecurity solutions to protect your digital assets
            from evolving threats
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
            >
              <Card className="group h-full border-gray-800 bg-gray-900/50 transition-all duration-300 hover:translate-y-[-5px] hover:border-emerald-500/50 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-500/20">
                    <service.icon className="h-6 w-6 text-emerald-500 group-hover:text-emerald-400" />
                  </div>
                  <CardTitle className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-emerald-400">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-white/70 transition-colors duration-300 group-hover:text-white/90">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
