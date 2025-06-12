'use client';
import { useEffect, useState } from 'react';
import { CustomTable } from '@/components/ui/custom-table';
import { Column } from '@/types/table';
import { get } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import DashboardTitle from '@/components/common/DashboardTitle';

interface UserActivity {
  id: number;
  email: string;
  api_called: string;
  activity_time: string;
  request_payload: any;
  browser: string;
  ip_address: string;
  latitude: string;
  longitude: string;
  location: string; // Add this property to store the formatted location string
  activity: string; // Add this property to store the formatted location string
}

const responsePageName = new Map([
  ['/api/mobile/getMobile360Dtls', 'Scaninfoga Intelligence'],
]);

const History: React.FC = () => {
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };

  const userType = useSelector((state: RootState) => state.user.user.userType);
  const fetchActivities = async () => {
    try {
      const url =
        userType === 'ADMIN'
          ? '/api/user-activities/get-all-user-activity'
          : '/api/user-activities/get-user-activity';
      const data = await get(url);
      if (data.responseStatus.status) {
        setActivities(data.responseData);
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();

  const columns: Column<UserActivity>[] = [
    {
      title: 'Page Visited',
      dataIndex: 'api_called',
      key: 'api_called',
      render: (text: string) => responsePageName.get(text) || text,
    },
    {
      title: 'Activity Time',
      dataIndex: 'activity_time',
      key: 'activity_time',
      render: (text: string) => formatDate(text),
      width: '200px',
    },
    {
      title: 'Request Payload',
      dataIndex: 'request_payload',
      key: 'request_payload',
      render: (payload: any) => (
        <pre className="max-w-xs overflow-x-auto text-sm">
          {/* {JSON.stringify(payload, null, 2)} */}
          {Object.entries(payload).map(([key, value]) => (
            <span key={key} className="flex">
              <span className="text-white/70">{key}:</span>
              <span className="font-semibold text-yellow-300 opacity-80">
                {String(value)}
              </span>
            </span>
          ))}
        </pre>
      ),
    },
    {
      title: 'Browser',
      dataIndex: 'browser',
      key: 'browser',
    },
    {
      title: 'IP Address',
      dataIndex: 'ip_address',
      key: 'ip_address',
    },
    {
      dataIndex: 'location', // Use latitude as the dataIndex for the location column
      title: 'Location',
      key: 'location',
      render: (_: string, record: UserActivity) => (
        <span>
          {record.latitude && record.longitude
            ? `${record.latitude}, ${record.longitude}`
            : '-'}
        </span>
      ),
    },
    {
      dataIndex: 'activity',
      title: 'Actions',
      key: 'activity',
      render: (_, record: UserActivity) => (
        <Button
          onClick={() =>
            router.push(
              `/scaninfogaIntelligence?mobile_number=${record.request_payload.mobile_number}`,
            )
          }
        >
          View Response
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <DashboardTitle title="Activity History"></DashboardTitle>
      <CustomTable
        // @ts-ignore
        columns={columns}
        dataSource={activities}
        loading={loading}
        scroll={{ x: true }}
      />
    </div>
  );
};

export default History;
