'use client';

import { Alert } from '@/components/ui/alert';
import React, { useState } from 'react';

export default function Page() {
  const [showAlert, setShowAlert] = useState(false);

  const handleClick = () => {
    setShowAlert(true); // this will trigger re-render
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <button onClick={handleClick} className="mb-4">
        Click to show alert
      </button>
      {showAlert && <Alert>hell</Alert>}
    </div>
  );
}
