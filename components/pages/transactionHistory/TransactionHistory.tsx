'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomTable } from '@/components/ui/custom-table';
import { get } from '@/lib/api';
import { formatDate } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Key } from 'lucide-react';
import Pagination from '@/components/common/Pagination';

const TransactionHistory = () => {
  const [tableData, setTableData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: 'Transaction ID',
      dataIndex: 'txn_id',
    },
    {
      title: 'Bank Reference ID',
      dataIndex: 'bank_reference',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Amount credited to wallet',
      dataIndex: 'credited_amount',
    },
    {
      title: 'Payment method',
      dataIndex: 'payment_group',
      render: (text: string) => text?.toUpperCase() || '',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text: string) => text.toUpperCase(),
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      render: (text: string) => formatDate(text),
    },
  ];

  const populateTableData = async () => {
    try {
      setLoading(true);
      const data = await get(
        `/api/payments/getAllTxns?page=${currentPage}&page_size=${pageSize}`,
      );
      setTableData(data?.responseData?.result || []);
      setTotalRecords(data?.responseData?.paginationDetails.count || 0);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch data when currentPage or pageSize changes
  useEffect(() => {
    populateTableData();
  }, [currentPage, pageSize]);

  // ✅ Reset to page 1 when page size changes
  const handlePageSizeChange = (size: number) => {
    setCurrentPage(1); // Reset to first page
    setPageSize(size);
  };

  return (
    <>
      <Card className="card-bg border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-500">
            <Key className="h-5 w-5" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CustomTable
            columns={columns}
            dataSource={tableData}
            loading={loading}
          />
          <Pagination
            currentPage={currentPage}
            totalRecords={totalRecords}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={handlePageSizeChange}
            pageSizeOptions={[5, 10, 20, 50]} // Optional: can configure sizes here
          />
        </CardContent>
      </Card>
    </>
  );
};

export default TransactionHistory;
