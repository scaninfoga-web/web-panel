'use client';
import React from 'react';

export default function page() {
  const handleClick = async () => {
    const res = await fetch('/api/logger', {
      method: 'POST',
      body: JSON.stringify({ logType: 'info', method: 'root page' }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <button onClick={handleClick} className="border px-10 py-4">
        Click to send
      </button>
    </div>
  );
}
