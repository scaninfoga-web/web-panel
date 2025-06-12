import BeFiSc from '@/components/pages/BeFiSc/BeFiSc';
import { Loader } from '@/components/ui/loader';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <BeFiSc />
    </Suspense>
  );
}
