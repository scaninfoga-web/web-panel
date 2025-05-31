'use client';
import MapLoading from '@/components/pages/BeFiSc/2/MapLoading';
import axios from 'axios';
import React, { useState } from 'react';

export default function page() {
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    setLoading(!loading);
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <button className="border px-8 py-4" onClick={handleClick}>
        Click me
      </button>
      {loading && <MapLoading />}
    </div>
  );
}
