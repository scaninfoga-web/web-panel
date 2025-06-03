import TransactionHistory from '@/components/pages/transactionHistory/TransactionHistory';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<Loader2 />}>
      <TransactionHistory />
    </Suspense>
  );
}
