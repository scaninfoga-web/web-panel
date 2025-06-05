import { TabbedView } from '@/components/common/TabbedView';
import UserTransactions from '@/components/pages/userTransactions/UserTransactions';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

export default function page() {
  const tabData = [
    {
      label: 'Overview',
      value: 'overview',
      content: <div>Overview Content</div>,
    },
    { label: 'Profile', value: 'profile', content: <div>Profile Content</div> },
    {
      label: 'Personal',
      value: 'personal',
      content: <div>Personal Content</div>,
    },
    {
      label: 'Financial',
      value: 'financial',
      content: <div>Financial Content</div>,
    },
    {
      label: 'Business',
      value: 'business',
      content: <div>Business Content</div>,
    },
    {
      label: 'Digital Info',
      value: 'digitalInfo',
      content: <div>Digital Info Content</div>,
    },
    {
      label: 'Breach Info',
      value: 'breachInfo',
      content: <div>Breach Info Content</div>,
    },
    {
      label: 'Google Profile',
      value: 'googleProfile',
      content: <div>Google Profile Content</div>,
    },
  ];

  return (
    <Suspense fallback={<Loader2 />}>
      {/* <div>
        <h1>User Transactions</h1>
        <TabbedView tabs={tabData} />
      </div> */}
      <UserTransactions />
    </Suspense>
  );
}
