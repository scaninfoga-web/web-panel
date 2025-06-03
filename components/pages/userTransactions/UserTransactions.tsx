import DashboardTitle from '@/components/common/DashboardTitle';
import PendingTransactions from './PendingTransactions';
import CompletedTransactions from './CompletedTransactions';
import CancelledTransactions from './CancelledTransactions';
import { TabbedView } from '@/components/common/TabbedView';

const UserTransactions: React.FC = () => {
  const tabData = [
    { label: 'Pending', value: 'pending', content: <PendingTransactions /> },
    {
      label: 'Completed',
      value: 'completed',
      content: <CompletedTransactions />,
    },
    {
      label: 'Cancelled',
      value: 'cancelled',
      content: <CancelledTransactions />,
    },
  ];
  return (
    <>
      <DashboardTitle title="User Transactions" />
      <TabbedView tabs={tabData} />
    </>
  );
};

export default UserTransactions;
