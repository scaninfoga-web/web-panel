'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface PageProps {
  Svg: React.ReactNode;
  title: string;
  description: string;
}

export default function ServicesCard({ Svg, title, description }: PageProps) {
  return (
    <motion.div className="hover:bg-emeraland-900/50 group space-y-10 border border-slate-800 bg-transparent p-4 shadow-lg transition-all duration-500 hover:cursor-pointer hover:border-emerald-500">
      <div className="flex items-center space-x-2 md:space-x-8">
        <div className="h-fit w-fit transition-all duration-500 group-hover:-rotate-45">
          {Svg}
        </div>
        <div className="px flex flex-col pt-3 text-xl font-extrabold md:px-3 md:text-2xl">
          {title.split(' ').map((word, index) => (
            <span key={index}>{word}</span>
          ))}
        </div>
      </div>
      <div className=" text-base md:text-xl text-white/70 transition-opacity duration-300 group-hover:opacity-75">
        {description}
      </div>
      <div className="flex font-semibold text-emerald-500 transition-all duration-500 group-hover:space-x-2">
        <span className="text-2xl">Learn more</span>
        <ArrowRight className="size-8" />
      </div>
    </motion.div>
  );
}
