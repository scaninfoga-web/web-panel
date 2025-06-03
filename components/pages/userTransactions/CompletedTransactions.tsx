'use client';

import { get } from '@/lib/api';
import { useEffect, useState } from 'react';
import { txnColumns, TxnTableProps } from './columns';
import { CustomTable } from '@/components/ui/custom-table';
import { toast } from 'sonner';

const CompletedTransactions = () => {
  const [tableData, setTableData] = useState<TxnTableProps[]>([]);

  const populateTableData = async () => {
    try {
      const data = await get('/api/payments/getCompletedTxns');
      console.log('DATA: ', data);
      setTableData(data?.responseData.transactions || []);
    } catch (e) {
      console.log('ERROR: ', e);
      toast.error('Error fetching completed transactions');
    }
  };

  useEffect(() => {
    populateTableData();
  }, []);

  return (
    <div>
      <h1>Completed Transactions</h1>
      <CustomTable columns={txnColumns} dataSource={tableData} />
    </div>
  );
};

export default CompletedTransactions;
