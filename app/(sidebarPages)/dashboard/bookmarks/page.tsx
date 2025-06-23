import Bookmark from '@/components/pages/boomark/Bookmark';
import NotFound from '@/components/sub/NotFound';
import { Loader } from '@/components/ui/loader';
import React, { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      {/* <Bookmark /> */}
      <NotFound value="We will get back to you soon" />
    </Suspense>
  );
}
