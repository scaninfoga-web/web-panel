import Dashboard from '@/components/pages/dashboard/Dashboard';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Dashboard />
    </Suspense>
  );
}
