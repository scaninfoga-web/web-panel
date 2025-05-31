import React from 'react';

export default function MapLoading() {
  return (
    <div className="flex h-[370px] w-full justify-between border border-white/10 p-4">
      <div className="grid grid-cols-2 py-10">
        <div>
          <p className="text-lg text-slate-400">Total Duration</p>
          <p className="mt-2 h-10 w-60 animate-pulse rounded-xl bg-slate-900"></p>
        </div>
        <div>
          <p className="text-lg text-slate-400">Distance Kilometers</p>
          <p className="mt-2 h-10 w-60 animate-pulse rounded-xl bg-slate-900"></p>
        </div>
        <div>
          <p className="text-lg text-slate-400">Address</p>
          <p className="h-20 min-w-[550px] animate-pulse rounded-xl bg-slate-900 opacity-50"></p>
        </div>
      </div>
      <div className="h-[340px] w-[450px] animate-pulse rounded-xl bg-slate-900"></div>
    </div>
  );
}
