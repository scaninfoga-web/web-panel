// 'use client';
// import { Clock, Monitor } from 'lucide-react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Key } from 'lucide-react';

// import { useEffect, useState } from 'react';
// import { toast } from 'sonner';
// import { get } from '@/lib/api';
// import { CustomTable } from '@/components/ui/custom-table';

// interface LoginRecord {
//   id: number;
//   timestamp: string;
//   device: string;
//   location: string;
//   ipAddress: string;
//   status: string;
// }

// const loginHistory: LoginRecord[] = [
//   {
//     id: 1,
//     timestamp: '2024-06-10 14:32:15',
//     device: 'Chrome - Windows 10',
//     location: 'New York, NY',
//     ipAddress: '192.168.1.1',
//     status: 'Success',
//   },
//   {
//     id: 2,
//     timestamp: '2024-06-09 09:45:22',
//     device: 'Safari - macOS',
//     location: 'San Francisco, CA',
//     ipAddress: '192.168.1.2',
//     status: 'Success',
//   },
//   {
//     id: 3,
//     timestamp: '2024-06-08 18:12:08',
//     device: 'Firefox - Ubuntu',
//     location: 'Los Angeles, CA',
//     ipAddress: '192.168.1.3',
//     status: 'Failed',
//   },
//   {
//     id: 4,
//     timestamp: '2024-06-07 11:28:45',
//     device: 'Chrome - Android',
//     location: 'Miami, FL',
//     ipAddress: '192.168.1.4',
//     status: 'Success',
//   },
// ];

// interface LoginHistorySchema {
//   id: number;
//   created_at: string;
//   ipAddress: string;
//   browser: string;
//   device: string;
//   latitude: string;
//   longitude: string;
// }

// const columns = [
//   {
//     title: 'Timestamp',
//     dataIndex: 'created_at',
//   },
//   {
//     title: 'Device',
//     dataIndex: 'device',
//   },
//   {
//     title: 'IP Address',
//     dataIndex: 'ipAddress',
//   },
//   {
//     title: 'Browser',
//     dataIndex: 'browser',
//   },
//   {
//     title: 'Latitude',
//     dataIndex: 'latitude',
//   },
//   {
//     title: 'Longitude',
//     dataIndex: 'longitude',
//   },
// ];

// export const LoginHistoryCard = () => {
//   const [loginHistory, setLoginHistory] = useState<LoginHistorySchema[]>([]);

//   const populateData = async () => {
//     try {
//       const data = await get('/api/auth/getSessionDtls');
//       setLoginHistory(data?.responseData || []);
//     } catch (error) {
//       toast.error('Error fetching login history');
//       console.log('Login history fetch error', error);
//     }
//   };

//   useEffect(() => {
//     populateData();
//   }, []);
//   return (
//     <Card className="card-bg border-slate-700">
//       <CardHeader>
//         <CardTitle className="flex items-center gap-2 text-emerald-500">
//           <Key className="h-5 w-5" />
//           Login History
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         {/* @ts-ignore */}
//         <CustomTable columns={columns} dataSource={loginHistory} />
//       </CardContent>
//     </Card>
//   );
// };

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
      console.log('Login history fetch error', error);
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
