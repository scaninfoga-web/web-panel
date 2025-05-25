import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';
import { DashboardCard } from '../dashboard/components/DashboardCard';

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
    <DashboardCard title={`${title}`} className="p-0">
      <div>
        <ScrollArea className="h-[300px]">{Component}</ScrollArea>
      </div>
    </DashboardCard>
  );
}
