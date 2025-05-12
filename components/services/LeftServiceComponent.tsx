import Image from 'next/image';
import React from 'react';

interface PageProps {
  imageUrl: string;
  title: string;
  description: string;
}

export default function LeftServiceComponent({
  imageUrl,
  title,
  description,
}: PageProps) {
  return (
    <div className="flex w-full items-center justify-between space-x-40 px-10">
      <Image src={imageUrl} width={600} height={600} alt="service-image" />
      <div className="flex flex-col space-y-8">
        <div className="text-5xl font-semibold">{title}</div>
        <div className="text-2xl text-white/80">{description}</div>
      </div>
    </div>
  );
}
