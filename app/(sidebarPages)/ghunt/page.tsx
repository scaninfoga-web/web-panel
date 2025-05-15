import CombinedDash from '@/components/pages/combinedDash/CombinedDash';
import Ghunt from '@/components/pages/ghunt/Ghunt';
import { Loader } from '@/components/ui/loader';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <Ghunt />
    </Suspense>
  );
}
