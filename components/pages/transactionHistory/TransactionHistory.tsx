'use client';
import DashboardTitle from '@/components/common/DashboardTitle';
import TxnSubmissionForm from '@/components/common/TxnSubmissionForm';
import { CustomTable } from '@/components/ui/custom-table';
import { get } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { useEffect, useState } from 'react';

const TransactionHistory = () => {
  const [tableData, setTableData] = useState<any>([]);
  const columns = [
    {
      title: 'Transaction ID',
      dataIndex: 'txn_id',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      render: (text: string) => formatDate(text),
    },
  ];

  const populateTableData = async () => {
    try {
      const data = await get('/api/payments/getAllTxns');

      console.log('DATA: ', data);
      setTableData(data?.responseData || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    populateTableData();
  }, []);

  return (
    <>
      {/* <DashboardTitle title="Transactions" /> */}
      <div className="grid gap-x-2 md:grid-cols-2">
        {/* <div className="py-8 px-4 border border-gray-500">
        <TxnSubmissionForm />
        </div> */}
      </div>
      <DashboardTitle title="Transaction History" />
      <CustomTable columns={columns} dataSource={tableData} />
    </>
  );
};

export default TransactionHistory;
