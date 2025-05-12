'use client';
import ServicesCard from '@/components/services/ServicesCard';
import { providedServices } from '@/lib/constant';
import {
  FluentPeopleTeamAdd20Filled,
  MdiCloudSecurityOutline,
  MdiWeb,
  MeteorIconsAppStore,
  PhCodeDuotone,
  TablerNetwork,
} from '@/svg/constant';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const servicesSvg: {
  Svg: React.ReactNode;
}[] = [
  {
    Svg: <MeteorIconsAppStore width={25} height={25} />,
  },
  {
    Svg: <MdiWeb width={25} height={25} />,
  },
  {
    Svg: <TablerNetwork width={25} height={25} />,
  },
  {
    Svg: <MdiCloudSecurityOutline width={25} height={25} />,
  },
  {
    Svg: <FluentPeopleTeamAdd20Filled width={25} height={25} />,
  },
  {
    Svg: <PhCodeDuotone width={25} height={25} />,
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
  const router = useRouter();
  return (
    <section className="flex min-h-screen flex-col items-center justify-center space-y-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-4 text-3xl font-bold md:text-4xl"
      >
        Services
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-x-4 gap-y-10 md:grid-cols-2 md:gap-y-20 lg:grid-cols-3"
      >
        {providedServices.map((service, index) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              router.push(
                `/services/${service.title.replaceAll(/\s|_/g, '').toLowerCase()}`,
              );
            }}
            key={index}
            variants={cardVariants}
          >
            <ServicesCard
              Svg={servicesSvg[index].Svg}
              title={service.title}
              description={service.description}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
