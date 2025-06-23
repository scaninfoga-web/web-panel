import BeFiSc from '@/components/pages/BeFiSc/BeFiSc';
import NotFound from '@/components/sub/NotFound';
import { Loader } from '@/components/ui/loader';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <BeFiSc />
      {/* <NotFound value="We are working on this tool" /> */}
    </Suspense>
  );
}
