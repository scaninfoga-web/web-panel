import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';
import { DashboardCard } from '../../dashboard/components/DashboardCard';

interface PageProps {
  title: string;
  Component: React.ReactNode;
}

export default function ArrayCard({ title, Component }: PageProps) {
  return (
    <DashboardCard title={`${title}`}>
      <ScrollArea className="h-[300px]">{Component}</ScrollArea>
    </DashboardCard>
  );
}
