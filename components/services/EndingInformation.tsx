'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function EndingInformation({
  endDescription,
}: {
  endDescription: string;
}) {
  return (
    <motion.div className="flex flex-col items-center justify-center space-y-16 py-20">
      <motion.div className="flex flex-col space-y-3 text-center text-5xl">
        <span>Get Complete Coverage On The Security posture Of Your</span>
        <span className="font-medium">Digital Assets</span>
      </motion.div>
      <motion.div>
        <div className="max-w-3xl text-center text-xl text-white/80">
          {endDescription}
        </div>
      </motion.div>
    </motion.div>
  );
}
