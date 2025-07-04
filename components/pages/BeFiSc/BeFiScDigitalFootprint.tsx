import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  EquifaxV3Type,
  EsicDetailsType,
  GstVerificationAdvanceType,
  PanAllInOneType,
  ProfileAdvanceType,
} from '@/types/BeFiSc';
import { DashboardCard } from '../dashboard/components/DashboardCard';
import CustomBadge from './sub/CustomBadge';
import {
  getAddressesWithDifferentPincode,
  getOtherEmails,
  getOtherPhoneNumbers,
} from '@/components/custom/functions/befiscUtils';
import { formatSentence } from '@/components/custom/functions/formatUtils';

interface PageProps {
  mobileNumber: string;
  EcicsData: EsicDetailsType | null;
  PanAllInOneData: PanAllInOneType | null;
  GstAdvanceData: GstVerificationAdvanceType | null;
  ProfileAdvanceData: ProfileAdvanceType | null;
  EquifaxData: EquifaxV3Type | null;
}

export default function BeFiScDigitalFootprint({
  EcicsData,
  mobileNumber,
  GstAdvanceData,
  ProfileAdvanceData,
  PanAllInOneData,
  EquifaxData,
}: PageProps) {
  const alternatePhoneNumbers = getOtherPhoneNumbers(
    EcicsData,
    GstAdvanceData,
    EquifaxData,
    ProfileAdvanceData,
    mobileNumber,
  );
  const addressesWithDifferentPincode = getAddressesWithDifferentPincode(
    EcicsData,
    GstAdvanceData,
    ProfileAdvanceData,
    EquifaxData,
    PanAllInOneData?.result?.address?.zip ||
      ProfileAdvanceData?.result?.address?.[0]?.pincode ||
      '0',
  );
  const otherEmails = getOtherEmails(
    EcicsData,
    GstAdvanceData,
    EquifaxData,
    ProfileAdvanceData,
    ProfileAdvanceData?.result?.email?.[0]?.value.toLowerCase() ||
      PanAllInOneData?.result?.email ||
      '',
  );
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex gap-4">
        {alternatePhoneNumbers.length > 0 ? (
          <DashboardCard title="Alternate Number" className="max-w-[490px]">
            {alternatePhoneNumbers.map((item, index) => (
              <div
                className="flex items-center justify-between space-x-2 border-b border-slate-800 pb-2"
                key={index}
              >
                <span>{item?.number}</span>
                <CustomBadge
                  blink={true}
                  variantToUse="warning"
                  isFormat={false}
                  value={item?.type}
                />
              </div>
            ))}
          </DashboardCard>
        ) : (
          <></>
        )}
        {otherEmails.length > 0 ? (
          <DashboardCard title="Alternate Emails" className="flex-1">
            {otherEmails.map((item, index) => (
              <div
                className="flex items-center justify-between border-b border-slate-800 pb-2"
                key={index}
              >
                <span>{item?.email}</span>
                <CustomBadge
                  blink={true}
                  variantToUse="warning"
                  isFormat={false}
                  value={item?.type}
                />
              </div>
            ))}
          </DashboardCard>
        ) : (
          <></>
        )}
      </div>

      <div className="scrollbar-custom min-w-full">
        {addressesWithDifferentPincode.length > 0 ? (
          <DashboardCard title="Alternate Addresses">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-40">Type</TableHead>
                  <TableHead className="min-w-40">Report Date</TableHead>
                  <TableHead>Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {addressesWithDifferentPincode.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="whitespace-nowrap">
                      <CustomBadge value={item?.type} variantToUse="default" />
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {formatSentence(item?.date_of_reporting)}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {formatSentence(item?.detailed_address)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DashboardCard>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
