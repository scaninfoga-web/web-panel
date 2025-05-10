'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';

interface PageProps {
  Svg: React.ReactNode;
  title: string;
  description: string;
}

export default function ServicesCard({ Svg, title, description }: PageProps) {
  return (
    <motion.div className="hover:bg-emeraland-900/50 group space-y-10 border border-slate-800 bg-slate-900 shadow-lg transition-all duration-500 hover:cursor-pointer hover:border-emerald-500">
      <Card className="group flex h-full flex-col border-gray-800 bg-gray-900/50 transition-all duration-300 hover:border-emerald-500/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-xl font-bold text-white transition-colors duration-300 group-hover:text-emerald-400">
            <span className="transition-all duration-500 group-hover:-rotate-45">
              {Svg}
            </span>
            <span>{title}</span>
          </CardTitle>
          <CardDescription className="text-white/70">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
          <div className="flex items-center text-sm text-white/60"></div>
          <div className="flex items-center text-sm text-white/60"></div>
          <div className="flex items-center text-sm text-white/60"></div>
        </CardContent>
        <CardFooter>
          <Button
            variant="ghost"
            className="w-full text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300"
          >
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
