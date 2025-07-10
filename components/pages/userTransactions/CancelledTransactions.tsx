'use client';

import { get } from '@/lib/api';
import { useEffect, useState } from 'react';
import { txnColumns, TxnTableProps } from './columns';
import { CustomTable } from '@/components/ui/custom-table';
import { toast } from 'sonner';

const CancelledTransactions = () => {
  const [tableData, setTableData] = useState<TxnTableProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const populateTableData = async () => {
    try {
      setLoading(true);
      const data = await get('/api/payments/getFailedTxns');

      setTableData(data?.responseData.transactions || []);
    } catch (e) {
      toast.error('Error fetching completed transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    populateTableData();
  }, []);

  return (
    <div>
      <h1>Completed Transactions</h1>
      <CustomTable
        // @ts-ignore
        columns={txnColumns}
        dataSource={tableData}
        loading={loading}
      />
    </div>
  );
};

export default CancelledTransactions;
