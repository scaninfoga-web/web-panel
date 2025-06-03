import { formatDate } from '@/lib/utils';

export const txnColumns = [
  {
    title: 'Transaction ID',
    dataIndex: 'txn_id',
    key: 'txnId',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Created At',
    dataIndex: 'created_at',
    key: 'createdAt',
    render: (text: string) => formatDate(text),
  },
  {
    title: 'Updated At',
    dataIndex: 'updated_at',
    key: 'createdAt',
    render: (text: string) => formatDate(text),
  },
];

export interface TxnTableProps {
  txn_id: string;
  amount: string;
  created_at: string;
  updated_at: string;
  status?: string;
}
