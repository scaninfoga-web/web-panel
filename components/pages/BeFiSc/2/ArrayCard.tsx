import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import React from 'react';

interface PageProps {
  title: string;
  description: string;
  Component: React.ReactNode;
}

export default function ArrayCard({
  title,
  description,
  Component,
}: PageProps) {
  return (
    <Card className="border-slate-800 bg-slate-900 text-white">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-slate-400">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {/* <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex gap-3 rounded-lg border border-red-900/50 bg-red-950/20 p-3"
            >
              <AlertCircle className="h-5 w-5 text-red-500" />
              <div>
                <p className="font-medium text-red-500">
                  Infected Credentials Detected
                </p>
                <p className="text-xs text-slate-400">
                  Your email password was found in a data breach
                </p>
                <p className="mt-1 text-xs text-slate-500">2 days ago</p>
              </div>
            </motion.div> */}
            {Component}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
