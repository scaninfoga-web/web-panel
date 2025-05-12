'use client';
import { motion } from 'framer-motion';
import React from 'react';
import LeftServiceComponent from './LeftServiceComponent';
import RightServiceComponent from './RightServiceComponent';

interface PageProps {
  leftRight: {
    imageUrl: string;
    title: string;
    description: string;
  }[];
}

export default function LeftRightComponents({ leftRight }: PageProps) {
  return (
    <div>
      <motion.div className="flex flex-col items-center justify-center space-y-16">
        <motion.div className="group relative flex flex-col p-2 text-4xl">
          <span className="text-5xl font-semibold">What we offer</span>
          <span className="absolute inset-x-0 -bottom-1 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-75"></span>
          <span className="duration-400 absolute inset-x-0 -bottom-1 mx-auto h-[4px] w-full bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 blur-sm transition-opacity group-hover:opacity-100"></span>
        </motion.div>
        <motion.div
          className="flex flex-col px-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {leftRight.map((card, index) => {
            return (
              <div key={index}>
                {index % 2 === 0 ? (
                  <LeftServiceComponent
                    imageUrl={card.imageUrl}
                    title={card.title}
                    description={card.description}
                  />
                ) : (
                  <RightServiceComponent
                    imageUrl={card.imageUrl}
                    title={card.title}
                    description={card.description}
                  />
                )}
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
