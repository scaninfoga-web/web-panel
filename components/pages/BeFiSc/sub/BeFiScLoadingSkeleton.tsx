import { Loader } from '@/components/ui/loader';
import React from 'react';

export default function BeFiScLoadingSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="flex h-44 w-full items-center justify-center border border-slate-800">
        <Loader />
      </div>
      <div className="mt-8 grid grid-cols-3 gap-6">
        <div className="flex h-72 items-center justify-center border border-slate-800">
          <Loader />
        </div>
        <div className="flex h-72 items-center justify-center border border-slate-800">
          <Loader />
        </div>
        <div className="flex h-72 items-center justify-center border border-slate-800">
          <Loader />
        </div>
        <div className="flex h-72 items-center justify-center border border-slate-800">
          <Loader />
        </div>
        <div className="flex h-72 items-center justify-center border border-slate-800">
          <Loader />
        </div>
        <div className="flex h-72 items-center justify-center border border-slate-800">
          <Loader />
        </div>
      </div>
    </div>
  );
}
