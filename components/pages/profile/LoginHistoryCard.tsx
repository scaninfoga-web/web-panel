import { Clock, Monitor } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface LoginRecord {
  id: number;
  timestamp: string;
  device: string;
  location: string;
  ipAddress: string;
  status: string;
}

const loginHistory: LoginRecord[] = [
  {
    id: 1,
    timestamp: '2024-06-10 14:32:15',
    device: 'Chrome - Windows 10',
    location: 'New York, NY',
    ipAddress: '192.168.1.1',
    status: 'Success',
  },
  {
    id: 2,
    timestamp: '2024-06-09 09:45:22',
    device: 'Safari - macOS',
    location: 'San Francisco, CA',
    ipAddress: '192.168.1.2',
    status: 'Success',
  },
  {
    id: 3,
    timestamp: '2024-06-08 18:12:08',
    device: 'Firefox - Ubuntu',
    location: 'Los Angeles, CA',
    ipAddress: '192.168.1.3',
    status: 'Failed',
  },
  {
    id: 4,
    timestamp: '2024-06-07 11:28:45',
    device: 'Chrome - Android',
    location: 'Miami, FL',
    ipAddress: '192.168.1.4',
    status: 'Success',
  },
];

export const LoginHistoryCard = () => {
  return (
    <Card className="card-bg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-emerald-500">
          <Clock className="h-5 w-5" />
          Login History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-slate-600">
              <TableHead className="font-semibold text-slate-300">
                Timestamp
              </TableHead>
              <TableHead className="font-semibold text-slate-300">
                Device
              </TableHead>
              <TableHead className="font-semibold text-slate-300">
                Location
              </TableHead>
              <TableHead className="font-semibold text-slate-300">
                IP Address
              </TableHead>
              <TableHead className="font-semibold text-slate-300">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loginHistory.map((login) => (
              <TableRow
                key={login.id}
                className="border-slate-600 hover:bg-slate-700/50"
              >
                <TableCell className="font-medium text-white">
                  {login.timestamp}
                </TableCell>
                <TableCell className="flex items-center gap-2 text-slate-300">
                  <Monitor className="h-4 w-4" />
                  {login.device}
                </TableCell>
                <TableCell className="text-slate-300">
                  {login.location}
                </TableCell>
                <TableCell className="text-slate-300">
                  {login.ipAddress}
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      login.status === 'Success'
                        ? 'bg-green-500 font-semibold text-white'
                        : 'bg-red-500 font-semibold text-white'
                    }
                  >
                    {login.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
