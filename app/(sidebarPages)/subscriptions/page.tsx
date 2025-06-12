import Subscriptions from '@/components/pages/subscriptions/Subscriptions';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<Loader2 />}>
      <Subscriptions />
    </Suspense>
  );
}
