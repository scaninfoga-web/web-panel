'use client';
import Image from 'next/image';
import React from 'react';

interface PageProps {
  title: string;
  description: string;
}

export default function FullServiceCard({ title, description }: PageProps) {
  return (
    <div className="flex h-screen items-center justify-between">
      <div>
        <h1>{title}</h1>
        <h2>{description}</h2>
      </div>
      <div>
        {/* <Image
          // src={`/Mobile_Application-Pentest.svg`}
          src="/beam-green.png"
          width={500}
          height={500}
          alt="service_Img"
          className=""
        /> */}
        <img src="/hello.svg" alt="hello"></img>
      </div>
    </div>
  );
}
