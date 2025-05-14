'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

import {
  IconRadar2,
  IconShieldCheck,
  IconBug,
  IconCloudLock,
  IconProps,
  Icon,
} from '@tabler/icons-react';

const iconMap = new Map<
  string,
  ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>
>([['IconRadar2', IconRadar2]]);

interface PageProps {
  title: string;
  serviceCard: {
    icon: string;
    iconStyle: string;
    title: string;
    description: string;
  }[];
}

export default function ServicesMiniCards({ title, serviceCard }: PageProps) {
  const Icon = iconMap.get(serviceCard?.[0].title);
  return (
    <motion.div className="flex flex-col items-center justify-center space-y-16 py-20">
      <motion.div className="max-w-2xl text-center text-4xl font-medium">
        {title}
      </motion.div>
      <motion.div className="grid grid-cols-3 items-stretch gap-6 gap-x-20">
        {serviceCard.map((card, index) => {
          const CardIcon = iconMap.get(card.icon);
          return (
            <div
              key={index}
              className="flex h-full min-h-[320px] max-w-[300px] flex-col justify-between space-y-4 rounded-xl bg-[#1e2031] p-4 shadow-[5px_5px_0px_rgba(235,235,235,0.32),-4px_-4px_93.03px_rgba(0,0,0,0.27)] transition hover:scale-[1.01]"
            >
              <div>
                {CardIcon ? (
                  <CardIcon className={`size-16 ${card.iconStyle}`} />
                ) : null}
              </div>
              <div className="text-3xl font-semibold">{card.title}</div>
              <div className="pt-3 text-xl font-light">{card.description}</div>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
