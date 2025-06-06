import CombinedDash from '@/components/pages/combinedDash/CombinedDash';
import { Loader } from '@/components/ui/loader';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <CombinedDash />
    </Suspense>
  );
}
