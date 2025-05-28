import React from 'react';

export default function NotFound({ value }: { value: string }) {
  return (
    <div className="flex h-[50vh] animate-pulse items-center justify-center text-2xl font-semibold text-neutral-600">
      {value}
    </div>
  );
}
