import Profile from '@/components/pages/profile/Profile';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<Loader2 />}>
      <Profile />
    </Suspense>
  );
}
