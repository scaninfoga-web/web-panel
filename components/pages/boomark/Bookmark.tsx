'use client';
import { useEffect, useState } from 'react';
import { CustomTable } from '@/components/ui/custom-table';
import { Column } from '@/types/table';
import { get, post } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import DashboardTitle from '@/components/common/DashboardTitle';
import { toast } from 'sonner';
import { Pencil, Trash2 } from 'lucide-react';
import CustomBadge from '../BeFiSc/sub/CustomBadge';
import EditBookmark from '../BeFiSc/sub/EditBookmark';
import { formatDateTime } from '@/components/custom/functions/formatUtils';

export interface UserBookmark {
  bookmark_page: number;
  created_at: string;
  id: number;
  payload?: {
    [key: string]: string | boolean | number;
  };
  case_type: string;
  case_description: string;
  investigator: string;
  latitude: number;
  longitude: number;
  caseNumber: string;
  status: 'pending' | 'success';
}
[];
const responsePageName = new Map([[1, 'scaninfogaIntelligence']]);

const Bookmark: React.FC = () => {
  const [activities, setActivities] = useState<UserBookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditShown, setIsEditShown] = useState(false);
  const [editBookmark, setEditBookmark] = useState<UserBookmark | null>(null);
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

  const handleEdit = (record: UserBookmark) => {
    setEditBookmark(record);
    setIsEditShown((c) => !c);
  };

  const deleteBookmark = async (id: number) => {
    try {
      await post('/api/auth/deleteBookmark', {
        caseId: id,
      });
      toast.success('Deleted ' + id);
      fetchActivities();
    } catch (error) {
      toast.error('error while deleting');
    }
  };
  const router = useRouter();
  const handleView = (record: any) => {
    const page = responsePageName.get(record?.bookmark_page || 1);
    if (page) {
      router.push(`/${page}/?mobile_number=${record?.payload?.mobileNumber}`);
    }
  };
  const columns: Column<UserBookmark>[] = [
    {
      title: 'Case Id',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <span className="">{text}</span>,
    },
    {
      title: 'Mobile',
      dataIndex: 'payload',
      key: 'payload',
      render: (payload: any) => (
        <span className="">{payload?.mobileNumber || ''}</span>
      ),
      width: '20px',
    },
    {
      title: 'Bookmarked At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text: string) => (
        <span className="opacity-80">{formatDateTime(text)}</span>
      ),
      width: '120px',
    },
    {
      title: 'Case Type',
      dataIndex: 'case_type',
      key: 'payload-CaseType',
      render: (text: string) => <span className="">{text}</span>,
      width: '180px',
    },

    {
      title: 'Investigator',
      dataIndex: 'investigator',
      key: 'payload_Officer',
      render: (investigator: string) => <span>{investigator}</span>,
      width: '20px',
    },
    {
      title: 'Case Status',
      dataIndex: 'status',
      key: 'payload_Status',
      render: (caseStatus: string) => <CustomBadge value={caseStatus} />,
      width: '20px',
    },
    {
      title: 'Location',
      dataIndex: 'id',
      key: 'payload-Location',
      render: (_, record) => {
        return (
          <span className="text-sm">
            {record?.latitude}, {record?.longitude}
          </span>
        );
      },
      width: '20px',
    },
    {
      title: 'Actions',
      dataIndex: 'payload',
      key: 'handleView',
      render: (_, record: UserBookmark) => (
        <div className="flex space-x-1">
          <Button
            className="rounded-2xl"
            size={'sm'}
            onClick={() => handleView(record)}
          >
            View
          </Button>
          <Button
            className="rounded-2xl"
            variant={'outline'}
            size={'sm'}
            onClick={() => handleEdit(record)}
          >
            <Pencil className="h-5 w-5" />
          </Button>
          <Button
            size={'sm'}
            variant={'destructive'}
            className="rounded-2xl"
            onClick={() => deleteBookmark(record?.id)}
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      ),
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
      <EditBookmark
        setIsEditShown={setIsEditShown}
        userBookmark={editBookmark}
        isShown={isEditShown}
        fetchActivities={fetchActivities}
      />
    </div>
  );
};

export default Bookmark;
