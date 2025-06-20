import Bookmark from '@/components/pages/boomark/Bookmark';
import { Loader } from '@/components/ui/loader';
import React, { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <Bookmark />
    </Suspense>
  );
}
