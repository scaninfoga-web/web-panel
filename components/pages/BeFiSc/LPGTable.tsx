import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DashboardCard } from '../dashboard/components/DashboardCard';

type LPGInfo = {
  code: 'SUC';
  data: Array<{
    gasProvider: 'Indane Gas' | 'Bharat Gas' | 'HP Gas';
    name: string;
    consumerDetails: {
      consumerMobile: string;
      consumerId: string;
      consumerStatus: string;
      consumerType: string;
    };
    address: string;
    distributorDetails: {
      distributorCode: string;
      distributorName: string;
      distributorContact: string;
      distributorAddress: string;
    };
  }>;
};

type LPGInfoTableProps = {
  lpgInfo: LPGInfo | null;
};

export function LPGInfoTable({ lpgInfo }: LPGInfoTableProps) {
  const getValue = (value: string | undefined | null) =>
    value && value.trim().length > 0 ? value : 'No Data';

  if (!lpgInfo) {
    return <DashboardCard title="LPG Info"> Data Not Found</DashboardCard>;
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl">
      <div className="scrollbar-custom min-w-full">
        {' '}
        {/* Increased min-width for better scroll */}
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
                  No data found
                </TableCell>
              </TableRow>
            ) : (
              lpgInfo.data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="whitespace-nowrap">
                    {getValue(item.gasProvider)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {getValue(item.name)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {getValue(item.consumerDetails.consumerMobile)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {getValue(item.consumerDetails.consumerId)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {getValue(item.consumerDetails.consumerStatus)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {getValue(item.consumerDetails.consumerType)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {getValue(item.address)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {getValue(item.distributorDetails.distributorCode)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {getValue(item.distributorDetails.distributorName)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {getValue(item.distributorDetails.distributorContact)}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {getValue(item.distributorDetails.distributorAddress)}
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
