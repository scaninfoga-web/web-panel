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
  MobileToAccountNumberType,
  PanAllInOneType,
  ProfileAdvanceType,
  RazorPayUpiType,
} from '@/types/BeFiSc';
import { DashboardCard } from '../dashboard/components/DashboardCard';
import CustomBadge from './sub/CustomBadge';
import {
  getAddressesWithDifferentPincode,
  getOtherEmails,
  getOtherPhoneNumbers,
} from '@/components/custom/functions/befiscUtils';
import {
  formatDateTime,
  formatSentence,
} from '@/components/custom/functions/formatUtils';
import { BreachInfoType } from '@/types/BreachInfo';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import SentenceLoader from './sub/SentenceLoader';
import { OlaGeoApiType } from '@/types/ola-geo-api';
import { getClientInfo, post } from '@/lib/api';
import { toast } from 'sonner';
import CustomPopUp from './sub/CustomPopUp';
import Image from 'next/image';
import M2BankInfo from '../digitalInteligence/sub/M2BankInfo';
import { Loader } from '@/components/ui/loader';
import { TrucallerVerifyType } from '@/types/trucaller';
import TrucallerVerifyInfo from '../digitalInteligence/sub/TrucallerVerifyInfo';
import { AddressTracingType } from '@/types/addressTrace';
import { CustomTable } from '@/components/ui/custom-table';
import { formatDate } from '@/lib/utils';

interface PageProps {
  mobileNumber: string;
  EcicsData: EsicDetailsType | null;
  PanAllInOneData: PanAllInOneType | null;
  GstAdvanceData: GstVerificationAdvanceType | null;
  ProfileAdvanceData: ProfileAdvanceType | null;
  EquifaxData: EquifaxV3Type | null;
  breachInfoLeakData: {
    value: string;
    type: string;
    data: BreachInfoType | null;
  }[];
  breachInfoLoading: boolean;
  ECOMAddresses: AddressTracingType | null;
}

const data: Map<
  string,
  {
    mobile: string;
    razorPayData: RazorPayUpiType | null;
    mobileToBankData: MobileToAccountNumberType | null;
    trucallerVerifyData: TrucallerVerifyType | null;
  }
> = new Map();

export default function BeFiScDigitalFootprint({
  EcicsData,
  mobileNumber,
  GstAdvanceData,
  ProfileAdvanceData,
  PanAllInOneData,
  EquifaxData,
  breachInfoLeakData,
  breachInfoLoading,
  ECOMAddresses,
}: PageProps) {
  const [alternatePhoneNumbers, setAlternatePhoneNumbers] = useState<
    {
      number: string;
      type: string;
    }[]
  >([]);
  const [mobileData, setMobileData] = useState<null | {
    mobile: string;
    razorPayData: RazorPayUpiType | null;
    mobileToBankData: MobileToAccountNumberType | null;
    trucallerVerifyData: TrucallerVerifyType | null;
  }>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!breachInfoLoading) {
      const result = getOtherPhoneNumbers(
        EcicsData,
        GstAdvanceData,
        EquifaxData,
        ProfileAdvanceData,
        mobileNumber,
        false,
        breachInfoLeakData,
      );
      setAlternatePhoneNumbers(result);
    }
  }, [breachInfoLoading, breachInfoLeakData]);

  const handleView = async (mobile: string) => {
    const clientInfo = getClientInfo();
    try {
      setLoading(true);

      const mapData = data.get(mobile);

      if (mapData) {
        setMobileData({
          mobile,
          trucallerVerifyData: mapData.trucallerVerifyData,
          razorPayData: mapData.razorPayData,
          mobileToBankData: mapData.mobileToBankData,
        });
        return;
      }
      setMobileData({
        mobile,
        trucallerVerifyData: null,
        razorPayData: null,
        mobileToBankData: null,
      });

      const response = await post('/api/mobile/getAcDtlsFromMobNo', {
        mobile_number: mobile,
      });
      const ifsc =
        response?.responseData?.result?.account_details?.account_ifsc;
      let ifscData: RazorPayUpiType | null = null;
      try {
        if (ifsc) {
          const ifscRes = await post('/api/secondary/ifsc-data', {
            ifsc_code: ifsc,
            realtimeData: false,
          });
          ifscData = ifscRes;
        }
      } catch (error) {}
      let trucallerVerify: TrucallerVerifyType | null = null;
      try {
        if (ifsc) {
          const trucallerVerifyRes = await post('/api/verify/trucallerVerify', {
            mobile_number: mobile,
            realtimeData: false,
          });
          trucallerVerify = trucallerVerifyRes;
        }
      } catch (error) {}
      data.set(mobile, {
        mobile,
        trucallerVerifyData: trucallerVerify,
        razorPayData: ifscData,
        mobileToBankData: response.responseData,
      });
      setMobileData({
        mobile,
        trucallerVerifyData: trucallerVerify,
        razorPayData: ifscData,
        mobileToBankData: response.responseData,
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

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
    breachInfoLeakData,
  );

  const ecomAddressesColumns = [
    {
      title: 'First Name',
      dataIndex: 'fname',
      key: 'first_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text: string) => <span>{text?.toLowerCase()}</span>,
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: 'Address 1',
      dataIndex: 'address1',
      key: 'address1',
    },
    {
      title: 'Address 2',
      dataIndex: 'address2',
      key: 'address2',
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (text: string) => formatDate(text),
    },
    {
      title: 'Last Delivery At',
      dataIndex: 'last_delivery_at',
      key: 'last_delivery_at',
      render: (text: string) => formatDate(text),
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Pin Code',
      dataIndex: 'pincode',
      key: 'pincode',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
  ];

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
                <CustomPopUp
                  dialogTitle={mobileData?.mobile || ''}
                  triggerElement={
                    <Button
                      onClick={() => {
                        handleView(item?.number);
                      }}
                      size={'sm'}
                      variant={'ghost'}
                      className="text-emerald-500"
                    >
                      View
                    </Button>
                  }
                  children={
                    <div className="max-h-[70vh] min-w-full overflow-auto">
                      {loading ? (
                        <Loader className="max-h-[400px]" />
                      ) : (
                        <div className="grid grid-cols-1 gap-4">
                          <M2BankInfo
                            data={{
                              razorPayData: mobileData?.razorPayData,
                              mobileToBankData: mobileData?.mobileToBankData,
                            }}
                          />
                          <TrucallerVerifyInfo
                            data={{
                              trucallerVerifyData:
                                mobileData?.trucallerVerifyData,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  }
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

      <div className="max-h-[450px] min-w-full overflow-auto">
        {(ECOMAddresses?.responseData?.length || 0) > 0
          ? ECOMAddresses?.responseData?.map((item, index) => {
              return (
                <DashboardCard
                  key={item?.datetime}
                  title={`Ecom Address-${formatDateTime(item?.datetime)}`}
                >
                  <CustomTable
                    //@ts-ignore
                    columns={ecomAddressesColumns}
                    dataSource={item?.data?.result?.addresses || []}
                    loading={loading}
                  />
                </DashboardCard>
              );
            })
          : null}
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
