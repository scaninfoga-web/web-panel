import AdminLogin from '@/components/pages/auth/AdminLogin';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<Loader2 />}>
      <AdminLogin />
    </Suspense>
  );
}
