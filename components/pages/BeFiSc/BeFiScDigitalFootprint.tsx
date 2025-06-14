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
import { isValidIndianMobileNumber } from './BeFiSc';
import { DashboardCard } from '../dashboard/components/DashboardCard';
import CustomBadge from './sub/CustomBadge';
import { formatSentence } from './sub/APIUtils';

export function getOtherPhoneNumbers(
  EcicsData: EsicDetailsType | null,
  GstAdvanceData: GstVerificationAdvanceType | null,
  EquifaxData: EquifaxV3Type | null,
  profileAdvanceData: ProfileAdvanceType | null,
  mobileNumber: string,
  isIncluded: boolean = false,
): {
  number: string;
  type: string;
}[] {
  const filteredNumber: {
    number: string;
    type: string;
  }[] = [];
  const seen = new Set<string>();
  if (isIncluded) {
    filteredNumber.push({
      number: mobileNumber,
      type: 'This is the number you have entered',
    });
    seen.add(mobileNumber);
  }

  profileAdvanceData?.result?.alternate_phone?.forEach((phone) => {
    const formattedNumber = isValidIndianMobileNumber(phone?.value || '');
    if (
      formattedNumber.result &&
      !seen.has(formattedNumber.fixedNumber) &&
      formattedNumber.fixedNumber !== mobileNumber
    ) {
      seen.add(formattedNumber.fixedNumber);
      filteredNumber.push({
        number: formattedNumber.fixedNumber,
        type: 'Obtained this number from profile',
      });
    }
  });

  EquifaxData?.result?.credit_report?.CCRResponse?.CIRReportDataLst?.forEach(
    (item) => {
      item?.CIRReportData?.IDAndContactInfo?.PhoneInfo?.map((phone) => {
        const formattedNumber = isValidIndianMobileNumber(phone?.Number || '');
        if (
          formattedNumber.result &&
          !seen.has(formattedNumber?.fixedNumber) &&
          formattedNumber.fixedNumber !== mobileNumber
        ) {
          seen.add(formattedNumber?.fixedNumber);
          filteredNumber.push({
            number: formattedNumber?.fixedNumber,
            type: 'This number is related from the Loans',
          });
        }
      });
    },
  );
  if (GstAdvanceData?.result?.business_mobile) {
    const formattedNumber = isValidIndianMobileNumber(
      GstAdvanceData?.result?.business_mobile || '',
    );
    if (
      !seen.has(formattedNumber.fixedNumber) &&
      formattedNumber.result &&
      formattedNumber.fixedNumber !== mobileNumber
    ) {
      seen.add(formattedNumber.fixedNumber);
      filteredNumber.push({
        number: formattedNumber.fixedNumber,
        type: 'Number is obtained from the gst details',
      });
    }
  }

  if (
    EcicsData?.result?.esic_details &&
    EcicsData?.result?.esic_details.length > 0
  ) {
    EcicsData?.result?.esic_details.forEach((item) => {
      const formattedNumber = isValidIndianMobileNumber(
        item?.employer_details?.mobile || '',
      );
      if (
        formattedNumber.fixedNumber !== mobileNumber &&
        !seen.has(formattedNumber.fixedNumber) &&
        formattedNumber.result
      ) {
        seen.add(formattedNumber.fixedNumber);
        filteredNumber.push({
          number: formattedNumber.fixedNumber,
          type: 'Mobile obtained from person working place',
        });
      }
    });
  }
  return filteredNumber;
}

export function getAddressesWithDifferentPincode(
  EcicsData: EsicDetailsType | null,
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

  if (
    EcicsData?.result?.esic_details &&
    EcicsData?.result?.esic_details.length > 0
  ) {
    EcicsData?.result?.esic_details.forEach((item) => {
      if (
        item?.employer_details?.address &&
        item?.employer_details?.pincode !== pincode &&
        !seen.has(item?.employer_details?.pincode)
      ) {
        seen.add(item?.employer_details?.pincode);
        addressArray.push({
          type: 'current address',
          date_of_reporting: item?.registration_date || '----',
          detailed_address: item?.employer_details?.address || '----',
        });
      }
    });
  }

  return addressArray;
}

export function getOtherEmails(
  EcicsData: EsicDetailsType | null,
  GstAdvanceData: GstVerificationAdvanceType | null,
  EquifaxData: EquifaxV3Type | null,
  ProfileAdvanceData: ProfileAdvanceType | null,
  email: string,
): {
  type: string;
  email: string;
}[] {
  const seen = new Set<string>();
  const emailArray: {
    type: string;
    email: string;
  }[] = [];

  if (ProfileAdvanceData?.result?.email) {
    for (const item of ProfileAdvanceData?.result?.email) {
      if (
        item?.value &&
        item.value.toLowerCase() !== email.toLowerCase() &&
        !seen.has(item.value.toLowerCase())
      ) {
        seen.add(item.value.toLowerCase());
        emailArray.push({
          type: 'Obtained this email from profile',
          email: item.value.toLowerCase(),
        });
      }
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
            emailArray.push({
              type: 'This email is related from the Loans',
              email: emailData?.EmailAddress.toLowerCase(),
            });
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
      emailArray.push({
        type: 'This email is related to business',
        email: GstAdvanceData?.result?.business_email.toLowerCase(),
      });
    }
  }
  if (
    EcicsData?.result?.esic_details &&
    EcicsData?.result?.esic_details.length > 0
  ) {
    EcicsData?.result?.esic_details.forEach((item) => {
      if (
        item?.employer_details?.email &&
        item?.employer_details?.email.toLowerCase() !== email.toLowerCase() &&
        !seen.has(item?.employer_details?.email.toLowerCase())
      ) {
        seen.add(item?.employer_details?.email.toLowerCase());
        emailArray.push({
          type: 'This email is related from the person working place',
          email: item?.employer_details?.email.toLowerCase(),
        });
      }
    });
  }
  return emailArray;
}

interface PageProps {
  email: string;
  mobileNumber: string;
  EcicsData: EsicDetailsType | null;
  PanAllInOneData: PanAllInOneType | null;
  GstAdvanceData: GstVerificationAdvanceType | null;
  ProfileAdvanceData: ProfileAdvanceType | null;
  EquifaxData: EquifaxV3Type | null;
}

export default function BeFiScDigitalFootprint({
  EcicsData,
  email,
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
    email,
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
