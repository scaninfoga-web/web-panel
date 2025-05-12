import React from 'react';
import CloudIcon from '@/public/icons/cloud-icon.jpg';
import {
  AlertTriangle,
  ShieldCheck,
  Smartphone,
  Bug,
  Code2,
  FileText,
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import Image from 'next/image';

const services = [
  {
    icon: ShieldCheck,
    title: 'Authentication & Authorization"',
    description:
      'Detect flaws in login, session management, and access control.',
  },
  {
    icon: Smartphone,
    title: 'Insecure Storage',
    description:
      'Ensure sensitive data is not exposed in local storage or logs.',
  },
  {
    icon: Bug,
    title: 'Runtime & Reverse Engineering',
    description:
      'Expert analysis of application source code to identify security flaws and vulnerabilities.',
  },
  {
    icon: Code2,
    title: 'API Vulnerabilities"',
    description:
      'Catch broken object-level authorization, insecure endpoints, and data leaks.',
  },
  {
    icon: FileText,
    title: 'Actionable Reports',
    description:
      'Get clear, developer-friendly reports with CVSS scores and remediation steps.',
  },
  {
    icon: AlertTriangle,
    title: 'Incident Response',
    description:
      'Rapid response to security breaches to minimize damage and restore operations.',
  },
];
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
interface PageProps {
  longDescription: string;
}

export default function ServicesExplainedComponent({
  longDescription,
}: PageProps) {
  return (
    <motion.div className="min-h-screen space-y-32">
      <motion.div className="flex flex-col items-center justify-center space-y-8">
        <div className="space-x-2 text-4xl font-bold tracking-tight">
          <span className="">
            <span className="text-emerald-500">Scan</span>infoga
          </span>
          <span>Advantages</span>
        </div>
        <div className="text-center text-xl font-medium">{longDescription}</div>
      </motion.div>
      <motion.div className="flex flex-col items-center justify-center space-y-16">
        <motion.div className="group relative flex flex-col p-2 text-4xl">
          <span>What we offers</span>
          <span className="absolute inset-x-0 -bottom-1 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-75"></span>
          <span className="duration-400 absolute inset-x-0 -bottom-1 mx-auto h-[4px] w-full bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 blur-sm transition-opacity group-hover:opacity-100"></span>
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
        <motion.div className="flex flex-col items-center justify-center space-y-16 py-20">
          <motion.div className="flex flex-col space-y-3 text-center text-5xl">
            <span>Get Complete Coverage On The Security posture Of Your</span>
            <span className="font-medium">Digital Assets</span>
          </motion.div>
          <motion.div className="grid grid-cols-3 gap-20">
            <CardService
              title="Realistic Simulations"
              description="Our team of experts uses advanced techniques to simulate real-world attacks, giving you a comprehensive evaluation of your business security."
              imageUrl="https://securelayer7.net/new/assets/image/services-page/benefit-icon/benefit-icon21.png"
            />
            <CardService
              title="Realistic Simulations"
              description="Our team of experts uses advanced techniques to simulate real-world attacks, giving you a comprehensive evaluation of your business security."
              imageUrl="https://securelayer7.net/new/assets/image/services-page/benefit-icon/benefit-icon21.png"
            />
            <CardService
              title="Realistic Simulations"
              description="Our team of experts uses advanced techniques to simulate real-world attacks, giving you a comprehensive evaluation of your business security."
              imageUrl="https://securelayer7.net/new/assets/image/services-page/benefit-icon/benefit-icon21.png"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
function CardService({
  imageUrl,
  title,
  description,
}: {
  imageUrl: string;
  title: string;
  description: string;
}) {
  const splittedTitle = title.split(' ');
  return (
    <div className="flex max-w-80 flex-col space-y-4">
      <div className="flex items-center justify-between pr-20">
        <Image
          src={imageUrl}
          className=""
          alt="icon img"
          width={100}
          height={100}
        />
        <div className="flex flex-col space-y-0.5 text-2xl font-semibold">
          <span>{splittedTitle[0]}</span>
          <span>{splittedTitle[1]}</span>
        </div>
      </div>
      <div className="text-lg">{description}</div>
    </div>
  );
}
