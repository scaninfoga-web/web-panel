'use client';
import React from 'react';
import Marquee from 'react-fast-marquee';

export default function Featured() {
  return (
    <div className="min-h-40 w-full text-center">
      <span className="text-lg opacity-75">FEATURED IN</span>
      <Marquee></Marquee>
    </div>
  );
}
