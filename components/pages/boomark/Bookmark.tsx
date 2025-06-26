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
import { formatDateTime } from '../BeFiSc/sub/dateFormat';
import { toast } from 'sonner';
import { Delete, Trash2 } from 'lucide-react';

interface UserBookmark {
  bookmark_page: number;
  created_at: string;
  id: number;
  payload?: {
    [key: string]: string | boolean | number;
  };
  latitude: string;
  longitude: string;
}
[];

const responsePageName = new Map([[1, 'Scaninfoga Intelligence']]);

const Bookmark: React.FC = () => {
  const [activities, setActivities] = useState<UserBookmark[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);
  const fetchActivities = async () => {
    try {
      const data = await get('/api/auth/getBookmarkList');
      if (data.responseStatus.status) {
        setActivities(data.responseData);
      }
    } catch (error) {
      toast.error('Fetching failed');
    } finally {
      setLoading(false);
    }
  };

  const deleteBookmark = async (id: number) => {
    console.log('Bookmark id', id);
  };
  const router = useRouter();
  const columns: Column<UserBookmark>[] = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => text,
    },
    {
      title: 'Page',
      dataIndex: 'bookmark_page',
      key: 'bookmark_page',
      render: (text: number) => responsePageName.get(text) || text,
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
    {
      title: 'Bookmarked At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text: string) => formatDateTime(text),
      width: '300px',
    },
    {
      title: 'Request Payload',
      dataIndex: 'payload',
      key: 'payload',
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
      title: 'Action',
      dataIndex: 'id',
      key: 'delete_id',

      render: (id: number, record: UserBookmark) => (
        <>
          <Button variant={'destructive'} onClick={() => deleteBookmark(id)}>
            <Trash2 className="h-5 w-5" />
          </Button>
          <Button
            variant={'destructive'}
            onClick={() => console.log('Record: ', record)}
          >
            {/* <Trash2 className="h-5 w-5" /> */}
          </Button>
        </>
      ),
      width: '100px',
    },
  ];

  return (
    <div className="space-y-6">
      <DashboardTitle title="Bookmarks"></DashboardTitle>
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

export default Bookmark;
