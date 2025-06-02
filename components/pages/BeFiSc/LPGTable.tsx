import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DashboardCard } from '../dashboard/components/DashboardCard';
import { getValue } from './CustomBeFiScCard';
import { formatSentence } from './APIUtils';

type LPGInfo = {
  code: 'SUC';
  data: Array<{
    gas_provider: 'Indane Gas' | 'Bharat Gas' | 'HP Gas';
    name: string;
    consumer_details: {
      consumer_mobile: string;
      consumer_id: string;
      consumer_status: string;
      consumer_type: string;
    };
    address: string;
    distributor_details: {
      distributor_code: string;
      distributor_name: string;
      distributor_contact: string;
      distributor_address: string;
    };
  }>;
};

type LPGInfoTableProps = {
  lpgInfo: LPGInfo | null;
};

export function LPGInfoTable({ lpgInfo }: LPGInfoTableProps) {
  const length = lpgInfo?.data?.length || 0;
  if (!lpgInfo || length === 0) {
    return <></>;
  }

  return (
    <div className="w-full overflow-auto rounded-xl">
      <div className="scrollbar-custom min-w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">Gas Provider</TableHead>
              <TableHead className="whitespace-nowrap">Name</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead className="whitespace-nowrap">Consumer ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Address</TableHead>
              <TableHead className="whitespace-nowrap">
                Distributor Code
              </TableHead>
              <TableHead className="whitespace-nowrap">
                Distributor Name
              </TableHead>
              <TableHead className="whitespace-nowrap">
                Distributor Contact
              </TableHead>
              <TableHead className="whitespace-nowrap">
                Distributor Address
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lpgInfo.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={11} className="text-center">
                  ----
                </TableCell>
              </TableRow>
            ) : (
              lpgInfo.data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="whitespace-nowrap">
                    {getValue(item?.gas_provider)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {formatSentence(item?.name)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {item?.consumer_details.consumer_mobile}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {getValue(item?.consumer_details.consumer_id)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {getValue(item?.consumer_details.consumer_status)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {getValue(item?.consumer_details.consumer_type)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {formatSentence(item?.address.slice(0, 50))}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {getValue(item?.distributor_details.distributor_code)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {formatSentence(item?.distributor_details.distributor_name)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {getValue(item?.distributor_details.distributor_address)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {getValue(item?.distributor_details.distributor_address)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
