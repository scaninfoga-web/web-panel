import DigitalIntelligence from '@/components/pages/digitalInteligence/DigitalIntelligence';
import { Loader } from '@/components/ui/loader';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <DigitalIntelligence />
    </Suspense>
  );
}
