'use client';
import CloudPentest from '@/public/services-image/Cloud Pentesting.svg';
import MobilePentest from '@/public/services-image/Mobile_App Pentesting.svg';
import NetwrokPentest from '@/public/services-image/Network Pentesting.svg';
import RedTeam from '@/public/services-image/Red-Team Assessment.svg';
import SourceCodeAudit from '@/public/services-image/Source_Code Audit.svg';
import WebPentest from '@/public/services-image/Web_App Pentesting.svg';
import Image from 'next/image';
import { motion } from 'framer-motion';

const imageMap = new Map<string, any[]>([
  ['Mobile_App Pentesting', [MobilePentest]],
  ['Web_App Pentesting', [WebPentest]],
  ['Network Pentesting', [NetwrokPentest]],
  ['Cloud Pentesting', [CloudPentest]],
  ['Red-Team Assessment', [RedTeam]],
  ['Source_Code Audit', [SourceCodeAudit]],
]);

interface PageProps {
  title: string;
  smallDescription: string;
  longDescription: string;
}

export default function FullServiceHeroSection({
  title,
  smallDescription,
  longDescription,
}: PageProps) {
  const imageSrc = imageMap.get(title)?.[0];
  const spacedTitle = title.replaceAll('_', ' ');

  return (
    <div className="flex min-h-screen flex-col items-center justify-between px-24">
      <div className="flex h-screen w-full items-center justify-between">
        <div className="flex flex-col space-y-8">
          <h1 className="text-6xl font-semibold">{spacedTitle}</h1>
          <h2 className="max-w-[35vw] pl-1 text-xl text-white/75">
            {smallDescription}
          </h2>
        </div>
        <div>
          <Image src={imageSrc} alt="img" width={500} height={500} />
        </div>
      </div>
      <motion.div className="flex flex-col items-center justify-center space-y-8">
        <div className="space-x-2 text-4xl font-bold tracking-tight">
          <span className="">
            <span className="text-emerald-500">Scan</span>infoga
          </span>
          <span>Advantages</span>
        </div>
        <div className="text-center text-xl font-medium">{longDescription}</div>
      </motion.div>
    </div>
  );
}
