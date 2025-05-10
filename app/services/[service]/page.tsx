import FullServiceCard from '@/components/full-service-card';
import { providedServices } from '@/lib/constant';
import React from 'react';

interface PageProps {
  params: Promise<{
    service: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { service } = await params;
  const matchedService = providedServices.find((s) => {
    return (
      s.title.toLowerCase().replace(/\s|_/g, '') ===
      service.toLowerCase().replace(/\s|_/g, '')
    );
  });
  if (!matchedService) {
    return (
      <div className="flex h-screen animate-pulse items-center justify-center text-xl font-semibold text-white/75">
        service is not found
      </div>
    );
  }

  return (
    <div>
      <FullServiceCard
        title={matchedService.title}
        description={matchedService.description}
      />
    </div>
  );
}
