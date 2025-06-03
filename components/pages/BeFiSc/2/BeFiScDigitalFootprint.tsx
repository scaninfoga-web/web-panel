import {
  EquifaxV3Type,
  GstVerificationAdvanceType,
  Mobile360Type,
  PanAllInOneType,
  ProfileAdvanceType,
} from '@/types/BeFiSc';
import React from 'react';
import { DashboardCard } from '../../dashboard/components/DashboardCard';
import NotFound from '@/components/NotFound';
import { isValidIndianMobileNumber } from '../BeFiSc';
import { formatSentence } from '../APIUtils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import CustomBadge from '../CustomBadge';

export function getOtherPhoneNumbers(
  profileAdvanceData: ProfileAdvanceType | null,
  mobileNumber: string,
): string[] {
  if (!profileAdvanceData?.result?.alternate_phone?.length) return [];
  const filteredNumber: string[] = [];
  const seen = new Set<string>();
  const filtered = profileAdvanceData.result.alternate_phone.filter(
    (phone) =>
      phone?.value !== mobileNumber && isValidIndianMobileNumber(phone?.value),
  );
  filtered.forEach((phone) => {
    if (phone?.value && !seen.has(phone?.value)) {
      seen.add(phone?.value);
      filteredNumber.push(phone?.value);
    }
  });
  return filteredNumber;
}

function getOtherPhoneNumbers2(
  GstAdvanceData: GstVerificationAdvanceType | null,
  EquifaxData: EquifaxV3Type | null,
  profileAdvanceData: ProfileAdvanceType | null,
  mobileNumber: string,
): string[] {
  if (!profileAdvanceData?.result?.alternate_phone?.length) return [];
  const filteredNumber: string[] = [];
  const seen = new Set<string>();
  const filtered = profileAdvanceData.result.alternate_phone.filter(
    (phone) =>
      phone?.value !== mobileNumber && isValidIndianMobileNumber(phone?.value),
  );
  filtered.forEach((phone) => {
    if (phone?.value && !seen.has(phone?.value)) {
      seen.add(phone?.value);
      filteredNumber.push(phone?.value);
    }
  });

  EquifaxData?.result?.credit_report?.CCRResponse?.CIRReportDataLst?.forEach(
    (item) => {
      item?.CIRReportData?.IDAndContactInfo?.PhoneInfo?.map((phone) => {
        if (
          phone?.Number &&
          phone?.Number !== mobileNumber &&
          !seen.has(phone?.Number)
        ) {
          seen.add(phone?.Number);
          filteredNumber.push(phone?.Number);
        }
      });
    },
  );
  if (GstAdvanceData?.result?.business_mobile) {
    if (
      GstAdvanceData?.result?.business_mobile !== mobileNumber &&
      !seen.has(GstAdvanceData?.result?.business_mobile)
    ) {
      seen.add(GstAdvanceData?.result?.business_mobile);
      filteredNumber.push(GstAdvanceData?.result?.business_mobile);
    }
  }
  return filteredNumber;
}

export function getAddressesWithDifferentPincode(
  GstAdvanceData: GstVerificationAdvanceType | null,
  ProfileAdvanceData: ProfileAdvanceType | null,
  EquifaxData: EquifaxV3Type | null,
  pincode: string,
): {
  type: string;
  date_of_reporting: string;
  detailed_address: string;
}[] {
  if (!ProfileAdvanceData?.result?.address?.length) return [];

  const seen = new Set<string>();
  const addressArray: {
    type: string;
    date_of_reporting: string;
    detailed_address: string;
  }[] = [];

  for (const addr of ProfileAdvanceData.result.address) {
    if (
      addr?.pincode !== pincode &&
      addr?.detailed_address &&
      !seen.has(addr?.pincode)
    ) {
      seen.add(addr?.pincode);
      addressArray.push({
        type: addr?.type || '----',
        date_of_reporting: addr?.date_of_reporting || '----',
        detailed_address: addr?.detailed_address || '----',
      });
    }
  }

  EquifaxData?.result?.credit_report?.CCRResponse?.CIRReportDataLst?.forEach(
    (item) => {
      item?.CIRReportData?.IDAndContactInfo?.AddressInfo?.map((addre) => {
        if (
          addre?.Address &&
          addre?.Postal !== pincode &&
          !seen.has(addre?.Postal)
        ) {
          seen.add(addre?.Postal);
          addressArray.push({
            type: addre?.Type || '----',
            date_of_reporting: addre?.ReportedDate || '----',
            detailed_address: addre?.Address || '----',
          });
        }
      });
    },
  );
  if (GstAdvanceData?.result?.primary_business_address) {
    addressArray.push({
      type: 'Business Address',
      date_of_reporting:
        GstAdvanceData?.result?.primary_business_address?.last_updated_date ||
        '----',
      detailed_address:
        GstAdvanceData?.result?.primary_business_address?.registered_address ||
        '----',
    });
  }

  return addressArray;
}

export function getOtherEmails(
  GstAdvanceData: GstVerificationAdvanceType | null,
  EquifaxData: EquifaxV3Type | null,
  ProfileAdvanceData: ProfileAdvanceType | null,
  email: string,
): string[] {
  if (!ProfileAdvanceData?.result?.email?.length) return [];

  const seen = new Set<string>();
  const emailArray: string[] = [];

  for (const item of ProfileAdvanceData?.result?.email) {
    if (
      item?.value &&
      item.value.toLowerCase() !== email.toLowerCase() &&
      !seen.has(item.value.toLowerCase())
    ) {
      seen.add(item.value.toLowerCase());
      emailArray.push(item.value.toLowerCase());
    }
  }
  EquifaxData?.result?.credit_report?.CCRResponse?.CIRReportDataLst?.forEach(
    (item) => {
      item?.CIRReportData?.IDAndContactInfo?.EmailAddressInfo?.map(
        (emailData) => {
          if (
            emailData?.EmailAddress &&
            emailData?.EmailAddress?.toLowerCase() !== email.toLowerCase() &&
            !seen.has(emailData?.EmailAddress.toLowerCase())
          ) {
            seen.add(emailData?.EmailAddress.toLowerCase());
            emailArray.push(emailData?.EmailAddress.toLowerCase());
          }
        },
      );
    },
  );
  if (GstAdvanceData?.result?.business_email) {
    if (
      GstAdvanceData?.result?.business_email.toLowerCase() !==
        email.toLowerCase() &&
      !seen.has(GstAdvanceData?.result?.business_email.toLowerCase())
    ) {
      seen.add(GstAdvanceData?.result?.business_email.toLowerCase());
      emailArray.push(GstAdvanceData?.result?.business_email?.toLowerCase());
    }
  }

  return emailArray;
}

interface PageProps {
  email: string;
  mobileNumber: string;
  PanAllInOneData: PanAllInOneType | null;
  GstAdvanceData: GstVerificationAdvanceType | null;
  ProfileAdvanceData: ProfileAdvanceType | null;
  EquifaxData: EquifaxV3Type | null;
}

export default function BeFiScDigitalFootprint({
  email,
  mobileNumber,
  GstAdvanceData,
  ProfileAdvanceData,
  PanAllInOneData,
  EquifaxData,
}: PageProps) {
  const alternatePhoneNumbers = getOtherPhoneNumbers2(
    GstAdvanceData,
    EquifaxData,
    ProfileAdvanceData,
    mobileNumber,
  );
  const addressesWithDifferentPincode = getAddressesWithDifferentPincode(
    GstAdvanceData,
    ProfileAdvanceData,
    EquifaxData,
    PanAllInOneData?.result?.address?.zip ||
      ProfileAdvanceData?.result?.address?.[0]?.pincode ||
      '0',
  );
  const otherEmails = getOtherEmails(
    GstAdvanceData,
    EquifaxData,
    ProfileAdvanceData,
    email,
  );
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-2 gap-4">
        {alternatePhoneNumbers.length > 0 ? (
          <DashboardCard title="Alternate Number">
            {alternatePhoneNumbers.map((mobileNumber, index) => (
              <div key={index}>{mobileNumber}</div>
            ))}
          </DashboardCard>
        ) : (
          <DashboardCard title="Alternate Number">
            <NotFound className="max-h-32" value="No other numbers found" />
          </DashboardCard>
        )}
        {otherEmails.length > 0 ? (
          <DashboardCard title="Alternate Emails">
            {otherEmails.map((email, index) => (
              <div key={index}>{email}</div>
            ))}
          </DashboardCard>
        ) : (
          <DashboardCard title="Alternate Emails">
            <span>
              <NotFound className="max-h-32" value="No other emails found" />
            </span>
          </DashboardCard>
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
          <DashboardCard title="Alternate Addresses">
            <NotFound className="max-h-32" value="No other addresses found" />
          </DashboardCard>
        )}
      </div>
    </div>
  );
}
