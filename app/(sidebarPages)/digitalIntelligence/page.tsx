import DigitalIntelligence from '@/components/pages/digitalInteligence/DigitalIntelligence';
import NotFound from '@/components/sub/NotFound';
import { Loader } from '@/components/ui/loader';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <DigitalIntelligence />
      {/* <NotFound value="We are working on this tool" /> */}
    </Suspense>
  );
}
