'use client';

import { get, post } from '@/lib/api';
import { useEffect, useState } from 'react';
import { txnColumns, TxnTableProps } from './columns';
import { CustomTable } from '@/components/ui/custom-table';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { TxnModal } from './TxnModal';

type txnStatus = 'approved' | 'rejected' | 'pending';

const PendingTransactions = () => {
  const [tableData, setTableData] = useState<TxnTableProps[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [txnStatus, setTxnStatus] = useState<txnStatus>('approved');
  const [txnId, setTxnId] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const populateTableData = async () => {
    try {
      setLoading(true);
      const data = await get('/api/payments/getPendingTxns');
      setTableData(data?.responseData.transactions || []);
    } catch (e) {
      toast.error('Error fetching completed transactions');
    } finally {
      setLoading(false);
    }
  };

  const performAction = async (action: string, record: TxnTableProps) => {
    setIsOpen(true);
    setTxnId(record.txn_id);
    setAmount(parseFloat(record.amount));
    setTxnStatus(action as txnStatus);
  };

  const updatedColumns = [
    ...txnColumns,
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text: string, record: TxnTableProps) => (
        <div className="flex gap-2">
          <Button onClick={() => performAction('approved', record)}>
            Approve
          </Button>
          <Button
            variant="destructive"
            onClick={() => performAction('rejected', record)}
          >
            Reject
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    populateTableData();
  }, []);

  return (
    <div>
      <h1>Completed Transactions</h1>
      <CustomTable
        // @ts-ignore
        columns={updatedColumns}
        dataSource={tableData}
        loading={loading}
      />
      <TxnModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        txn_id={txnId}
        status={txnStatus}
        amount={amount}
        populateTableData={populateTableData}
      />
    </div>
  );
};

export default PendingTransactions;
