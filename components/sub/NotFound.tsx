import { cn } from '@/lib/utils';
import React from 'react';

export default function NotFound({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex h-[50vh] animate-pulse items-center justify-center text-2xl font-semibold text-neutral-600',
        className,
      )}
    >
      {value}
    </div>
  );
}
