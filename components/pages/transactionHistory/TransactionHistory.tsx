'use client';
import DashboardTitle from '@/components/common/DashboardTitle';
import TxnSubmissionForm from '@/components/common/TxnSubmissionForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomTable } from '@/components/ui/custom-table';
import { get } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Key, Mail } from 'lucide-react';

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
      <Card className="card-bg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-500">
            <Key className="h-5 w-5" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CustomTable columns={columns} dataSource={tableData} />
        </CardContent>
      </Card>
    </>
  );
};

export default TransactionHistory;
