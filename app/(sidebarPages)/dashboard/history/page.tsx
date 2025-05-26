import History from '@/components/pages/history/History';
import { Loader } from '@/components/ui/loader';
import React, { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <History />
    </Suspense>
  );
}
