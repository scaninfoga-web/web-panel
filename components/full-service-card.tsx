'use client';
import React from 'react';
import MobilePentest from '@/public/Mobile_Application Pentest.svg';
import WebPentest from '@/public/Web_Application Pentest.svg';
import NetwrokPentest from '@/public/Network Pentest.svg';
import CloudPentest from '@/public/Cloud Pentest.svg';
import RedTeam from '@/public/Red-Team Assessment.svg';
import SourceCodeAudit from '@/public/Source_Code Audit.svg';

import Image from 'next/image';

const imageMap = new Map<string, any>([
  ['Mobile_Application Pentest', MobilePentest],
  ['Web_Application Pentest', WebPentest],
  ['Network Pentest', NetwrokPentest],
  ['Cloud Pentest', CloudPentest],
  ['Red-Team Assessment', RedTeam],
  ['Source_Code Audit', SourceCodeAudit],
]);

interface PageProps {
  title: string;
  description: string;
}

export default function FullServiceCard({ title, description }: PageProps) {
  const imageSrc = imageMap.get(title);
  return (
    <div className="flex h-screen items-center justify-between px-24">
      <div className="flex flex-col space-y-4">
        <h1 className="text-5xl font-semibold">{title}</h1>
        <h2 className="max-w-[35vw] text-lg text-white/75">{description}</h2>
      </div>
      <div>
        <Image src={imageSrc} alt="img" width={400} height={400} />
      </div>
    </div>
  );
}
