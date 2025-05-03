'use client';
import { motion } from 'framer-motion';
import ServicesCard from '@/components/services-card';
import {
  FluentPeopleTeamAdd20Filled,
  MaterialSymbolsEnterprise,
  MdiCloudSecurityOutline,
  MdiWeb,
  MeteorIconsAppStore,
  PhCodeDuotone,
  TablerNetwork,
} from '@/svg/constant';

interface Services {
  Svg: React.ReactNode;
  title: string;
  description: string;
}

const services: Services[] = [
  {
    Svg: <MeteorIconsAppStore width={72} height={72} />,
    title: 'Mobile_Application Pentest',
    description:
      'We test your Android/iOS apps for vulnerabilities like insecure storage, weak encryption, and exposed APIs to keep user data safe and secure.',
  },
  {
    Svg: <MdiWeb width={72} height={72} />,
    title: 'Web_Application Pentest',
    description:
      'We identify and fix security flaws in your web apps, including injection attacks, authentication issues, and misconfigurations—before hackers exploit them.',
  },
  {
    Svg: <TablerNetwork width={72} height={72} />,
    title: 'Network Pentest',
    description:
      'We simulate real-world attacks on your network to uncover weaknesses like open ports, outdated systems, and poor firewall rules.',
  },
  {
    Svg: <MdiCloudSecurityOutline width={72} height={72} />,
    title: 'Cloud Pentest',
    description:
      'We assess your cloud setup (AWS, Azure, GCP) for misconfigurations, weak access controls, and data exposure risks.',
  },
  {
    Svg: <FluentPeopleTeamAdd20Filled width={72} height={72} />,
    title: 'Red-Team Assessment',
    description:
      'A stealthy, real-world attack simulation that tests your organization’s detection, response, and resilience across people, processes, and technology.',
  },
  {
    Svg: <PhCodeDuotone width={72} height={72} />,
    title: 'Source_Code Audit',
    description:
      'Get an in-depth understanding of your enterprises security foundations. We take a magnifying glass to your source code to find undetected bugs and...',
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function ServicesSection() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center space-y-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-2xl md:text-4xl font-extrabold"
      >
        Services
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-x-4 gap-y-10 md:gap-y-20 md:grid-cols-2 lg:grid-cols-3"
      >
        {services.map((service, index) => (
          <motion.div key={index} variants={cardVariants}>
            <ServicesCard
              Svg={service.Svg}
              title={service.title}
              description={service.description}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
