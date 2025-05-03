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
    <motion.div className="hover:bg-emeraland-900/50 group min-w-[25vw] space-y-10 border-slate-800 border hover:border-emerald-500 bg-transparent px-4 py-4 shadow-lg transition-all duration-500 hover:cursor-pointer">
      <div className="flex items-center space-x-2 md:space-x-8">
        <div className="h-fit w-fit transition-all duration-500 group-hover:-rotate-45">
          {Svg}
        </div>
        <div className="flex flex-col px md:px-3 pt-3 text-2xl md:text-3xl font-extrabold tracking-wide">
          {title.split(' ').map((word, index) => (
            <span key={index}>{word}</span>
          ))}
        </div>
      </div>
      <div className="text-xl font-extralight tracking-wide transition-opacity duration-300 group-hover:opacity-75">
        {description}
      </div>
      <div className="flex font-semibold text-orange-500 transition-all duration-500 group-hover:space-x-2">
        <span className="text-2xl">Learn more</span>
        <ArrowRight className="size-8" />
      </div>
    </motion.div>
  );
}
