import NotFound from '@/components/sub/NotFound';
import { Loader } from '@/components/ui/loader';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      {/* <CombinedDash /> */}
      <NotFound value="We will get back to you soon" />
    </Suspense>
  );
}
