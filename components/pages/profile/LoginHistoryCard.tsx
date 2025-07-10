'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Key } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { get } from '@/lib/api';
import { CustomTable } from '@/components/ui/custom-table';
import Pagination from '@/components/common/Pagination';

interface LoginHistorySchema {
  id: number;
  created_at: string;
  ipAddress: string;
  browser: string;
  device: string;
  latitude: string;
  longitude: string;
}

const columns = [
  {
    title: 'Timestamp',
    dataIndex: 'created_at',
    key: 'created_at',
  },
  {
    title: 'Device',
    dataIndex: 'device',
    key: 'device',
  },
  {
    title: 'IP Address',
    dataIndex: 'ipAddress',
    key: 'ipAddress',
  },
  {
    title: 'Browser',
    dataIndex: 'browser',
    key: 'browser',
  },
  {
    title: 'Latitude',
    dataIndex: 'latitude',
    key: 'latitude',
  },
  {
    title: 'Longitude',
    dataIndex: 'longitude',
    key: 'longitude',
  },
];

export const LoginHistoryCard = () => {
  const [loginHistory, setLoginHistory] = useState<LoginHistorySchema[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);

  const populateData = async () => {
    try {
      setLoading(true);
      const data = await get(
        `/api/auth/getSessionDtls?page=${currentPage}&page_size=${pageSize}`,
      );

      setLoginHistory(data?.responseData?.result || []);
      setTotalRecords(data?.responseData?.paginationDetails?.count || 0);
    } catch (error) {
      toast.error('Error fetching login history');
    } finally {
      setLoading(false);
    }
  };

  // Refetch data when page or pageSize changes
  useEffect(() => {
    populateData();
  }, [currentPage, pageSize]);

  const handlePageSizeChange = (size: number) => {
    setCurrentPage(1); // Reset to first page when page size changes
    setPageSize(size);
  };

  return (
    <Card className="card-bg border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-emerald-500">
          <Key className="h-5 w-5" />
          Login History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CustomTable
          // @ts-ignore
          columns={columns}
          dataSource={loginHistory}
          loading={loading}
        />
        <Pagination
          currentPage={currentPage}
          totalRecords={totalRecords}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={handlePageSizeChange}
          pageSizeOptions={[5, 10, 20, 50]}
        />
      </CardContent>
    </Card>
  );
};
