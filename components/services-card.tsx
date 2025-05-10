import React from 'react';
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
    <Card className="flex h-full flex-col justify-between border border-slate-800 bg-slate-900 shadow-lg transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-900/10">
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
      <CardContent className="flex-grow" />
      <CardFooter>
        <Button
          variant="ghost"
          className="w-full text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300"
        >
          Learn More <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
