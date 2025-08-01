import React, { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SentenceLoaderProps extends HTMLAttributes<HTMLDivElement> {}

export default function SentenceLoader({
  className,
  ...props
}: SentenceLoaderProps) {
  return (
    <div
      className={cn(
        'mt-2 h-7 min-w-[180px] animate-pulse rounded-xl bg-slate-800 opacity-70',
        className,
      )}
      {...props}
    />
  );
}
