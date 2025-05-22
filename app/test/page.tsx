'use client';
import axios from 'axios';
import React from 'react';

export default function page() {
  const handleClick = async () => {
    const res = await axios.get('/api/ip');
    console.log(res.data);
  };
  return (
    <div className="flex h-screen items-center justify-center">
      <button className="border px-8 py-4" onClick={handleClick}>
        Click me
      </button>
    </div>
  );
}
