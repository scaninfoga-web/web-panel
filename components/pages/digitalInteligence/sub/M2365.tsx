import { formatSentence } from '@/components/custom/functions/formatUtils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import NotFound from '@/components/sub/NotFound';
import { Mobile360Type } from '@/types/BeFiSc';
import React, { useState } from 'react';
import {
  DashboardCard,
  InfoText,
} from '../../dashboard/components/DashboardCard';
import { getValue } from '../../BeFiSc/sub/CustomBeFiScCard';
import CustomBadge from '../../BeFiSc/sub/CustomBadge';
import { Badge } from '@/components/ui/badge';
import { IconBrandWhatsapp, IconLocation } from '@tabler/icons-react';
import { Separator } from '@/components/ui/separator';
import LPG from './LPG';
import CustomPopUp from '../../BeFiSc/sub/CustomPopUp';
import { Button } from '@/components/ui/button';
import { OlaGeoApiType } from '@/types/ola-geo-api';
import { getClientInfo, post } from '@/lib/api';
import { toast } from 'sonner';
import SentenceLoader from '../../BeFiSc/sub/SentenceLoader';
import Image from 'next/image';

interface PageProps {
  data: Mobile360Type | null;
}
const olaData: Map<string, OlaGeoApiType> = new Map();

const M2365: React.FC<PageProps> = ({ data }) => {
  const [addressData, setAddressData] = useState<null | {
    address: string;
    data: OlaGeoApiType;
  }>(null);
  const [mapLoading, setMapLoading] = useState(false);

  const handleView = async (address: string) => {
    const clientInfo = getClientInfo();
    try {
      setMapLoading(true);
      if (olaData.get(address)) {
        setAddressData({
          address,
          data: olaData.get(address)!,
        });
        return;
      }
      const res = await post('/api/auth/getmap', {
        userLng: clientInfo.longitude,
        userLat: clientInfo.latitude,
        address: address,
      });
      olaData.set(address, res);
      setAddressData({
        address,
        data: res,
      });
      toast.success('Map Fetched Successfully');
    } catch (error) {
      toast.error('Map Fetched Failed');
    } finally {
      setMapLoading(false);
    }
  };

  return (
    <div className="max-h-[65vh] overflow-auto">
      {data?.result ? (
        <div className="flex flex-col space-y-4 p-2">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <DashboardCard title="Digital Payment Info">
              <div className="mt-4 grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-gray-400">Name</p>
                    <p className="text-base font-medium">
                      {formatSentence(
                        data?.result?.digital_payment_id_info?.data?.name,
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Bank</p>
                    <p className="text-base font-medium">
                      {formatSentence(
                        data?.result?.digital_payment_id_info?.data?.bank,
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Branch</p>
                    <p className="text-base font-medium text-yellow-500">
                      {formatSentence(
                        data?.result?.digital_payment_id_info?.data?.branch,
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Branch Contact</p>
                    <p className="text-base font-medium">
                      {getValue(
                        data?.result?.digital_payment_id_info?.data?.contact,
                      )}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Branch Address</p>
                  <p className="break-words text-base font-medium opacity-80">
                    {formatSentence(
                      data?.result?.digital_payment_id_info?.data?.address,
                    )}
                  </p>
                </div>
                <CustomPopUp
                  dialogTitle={''}
                  triggerElement={
                    <Button
                      onClick={() => {
                        handleView(
                          data?.result?.digital_payment_id_info?.data?.address,
                        );
                      }}
                      size={'sm'}
                      variant={'ghost'}
                      className="text-emerald-500"
                    >
                      View Map
                    </Button>
                  }
                  children={
                    <div className="flex w-full justify-between gap-4 text-lg font-semibold">
                      <div className="flex flex-col space-y-6">
                        <div>
                          <p className={'text-xs text-slate-400'}>
                            Full Address
                          </p>
                          <p className="bg-opacity-75 text-base lg:max-w-[610px]">
                            {formatSentence(addressData?.address)}
                          </p>
                        </div>
                        <div className="flex space-x-8">
                          <div>
                            <p className="text-base text-slate-400">
                              Total Duration
                            </p>

                            {mapLoading ? (
                              <SentenceLoader />
                            ) : (
                              <p className="text-base font-medium text-emerald-500 lg:text-lg">
                                {formatSentence(
                                  addressData?.data?.responseData?.duration
                                    ?.readable_duration,
                                )}
                              </p>
                            )}
                          </div>
                          <div>
                            <p className="text-base text-slate-400">
                              Distance Kilometers
                            </p>
                            {mapLoading ? (
                              <SentenceLoader />
                            ) : (
                              <p className="text-base font-medium text-yellow-500 lg:text-lg">
                                {formatSentence(
                                  addressData?.data?.responseData?.distance
                                    ?.distance_kilometers,
                                )}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="">
                        {mapLoading ? (
                          <SentenceLoader className="min-h-[100px] min-w-[100px] lg:min-h-[280px] lg:w-[420px]" />
                        ) : (
                          <Image
                            src={`data:${addressData?.data?.responseData?.content_type};base64,${addressData?.data?.responseData?.image}`}
                            alt="map"
                            width={450}
                            height={450}
                            className="rounded-xl lg:h-72"
                            unoptimized={true}
                          />
                        )}
                      </div>
                    </div>
                  }
                />
              </div>
            </DashboardCard>
            <DashboardCard title="Number Details">
              <div className="scrollbar-custom h-[300px] overflow-auto pr-4">
                <div className="flex justify-between">
                  <p className="text-sm font-semibold text-slate-400">
                    Number Active
                  </p>
                  <CustomBadge
                    value={data?.result?.telco_info?.data?.is_valid}
                  />
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-semibold text-slate-400">
                    Country
                  </p>
                  <div className="my-0.5 pr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 900 600"
                    >
                      <rect width="900" height="200" fill="#FF9933" />
                      <rect y="200" width="900" height="200" fill="#FFFFFF" />
                      <rect y="400" width="900" height="200" fill="#138808" />
                      <circle
                        cx="450"
                        cy="300"
                        r="60"
                        stroke="#000080"
                        strokeWidth="4"
                        fill="none"
                      />
                      <g
                        transform="translate(450,300)"
                        stroke="#000080"
                        strokeWidth="2"
                      >
                        <line x1="0" y1="-60" x2="0" y2="60" />
                        <line x1="-60" y1="0" x2="60" y2="0" />
                        <line
                          x1="-42.426"
                          y1="-42.426"
                          x2="42.426"
                          y2="42.426"
                        />
                        <line
                          x1="42.426"
                          y1="-42.426"
                          x2="-42.426"
                          y2="42.426"
                        />
                        <line
                          x1="-21.213"
                          y1="-58.094"
                          x2="21.213"
                          y2="58.094"
                        />
                        <line
                          x1="58.094"
                          y1="-21.213"
                          x2="-58.094"
                          y2="21.213"
                        />
                        <line
                          x1="21.213"
                          y1="-58.094"
                          x2="-21.213"
                          y2="58.094"
                        />
                        <line
                          x1="-58.094"
                          y1="-21.213"
                          x2="58.094"
                          y2="21.213"
                        />
                        <line
                          x1="-36.742"
                          y1="-49.499"
                          x2="36.742"
                          y2="49.499"
                        />
                        <line
                          x1="49.499"
                          y1="-36.742"
                          x2="-49.499"
                          y2="36.742"
                        />
                        <line
                          x1="36.742"
                          y1="-49.499"
                          x2="-36.742"
                          y2="49.499"
                        />
                        <line
                          x1="-49.499"
                          y1="-36.742"
                          x2="49.499"
                          y2="36.742"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-semibold text-slate-400">
                    Country Prefix
                  </p>
                  <CustomBadge
                    value={
                      data?.result?.telco_info?.data?.current_service_provider
                        ?.country_prefix
                    }
                  />
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-semibold text-slate-400">
                    isRoaming
                  </p>
                  <CustomBadge
                    value={data?.result?.telco_info?.data?.is_roaming}
                  />
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-semibold text-slate-400">
                    Subscriber Status
                  </p>
                  <CustomBadge
                    value={data?.result?.telco_info?.data?.subscriber_status}
                  />
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-semibold text-slate-400">
                    Connection Type
                  </p>
                  <CustomBadge
                    value={data?.result?.telco_info?.data?.connection_type}
                  />
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-semibold text-slate-400">
                    Current Network Provider
                  </p>
                  <CustomBadge
                    value={
                      data?.result?.telco_info?.data?.current_service_provider
                        ?.network_name
                    }
                  />
                </div>

                <div className="flex justify-between">
                  <p className="text-sm font-semibold text-slate-400">
                    Current Network Region
                  </p>

                  <Badge className="mt-1 gap-x-0.5 whitespace-nowrap">
                    <IconLocation className="size-4" />
                    {formatSentence(
                      data?.result?.telco_info?.data?.current_service_provider
                        ?.network_region,
                    )}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-semibold text-slate-400">
                    Current Network Region
                  </p>

                  <Badge className="mt-1 gap-x-0.5">
                    <IconLocation className="size-4" />
                    {formatSentence(
                      data?.result?.telco_info?.data?.current_service_provider
                        ?.network_prefix,
                    )}
                  </Badge>
                </div>
                <Separator className="my-2.5 h-0.5 bg-slate-700" />
                <div className="flex justify-between">
                  <p className="text-sm font-semibold text-slate-400">
                    Original Network Provider
                  </p>
                  <CustomBadge
                    value={
                      data?.result?.telco_info?.data?.original_service_provider
                        ?.network_name
                    }
                  />
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-semibold text-slate-400">
                    Original Network Region
                  </p>
                  <CustomBadge
                    value={
                      data?.result?.telco_info?.data?.original_service_provider
                        ?.network_region
                    }
                  />
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-semibold text-slate-400">
                    Original Network Prefix
                  </p>

                  <CustomBadge
                    value={
                      data?.result?.telco_info?.data?.original_service_provider
                        ?.network_prefix
                    }
                  />
                </div>
                <Separator className="my-2.5 h-0.5 bg-slate-700" />

                <div className="flex justify-between">
                  <p className="text-sm font-semibold text-slate-400">IMSI</p>
                  <CustomBadge
                    value={data?.result?.telco_info?.data?.msisdn?.imsi}
                  />
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-semibold text-slate-400">
                    Ported Telecom
                  </p>
                  <CustomBadge
                    value={data?.result?.mobile_age_info?.data?.ported_telecom}
                  />
                </div>
                <Separator className="my-2.5 h-0.5 bg-slate-700" />

                <div className="flex justify-between">
                  <p className="text-sm font-semibold text-slate-400">
                    Mobile Age
                  </p>
                  <CustomBadge
                    value={data?.result?.mobile_age_info?.data?.mobile_age}
                  />
                </div>

                <div className="flex justify-between">
                  <p className="text-sm font-semibold text-slate-400">
                    Whatsapp Account
                  </p>
                  <Badge
                    className="mt-1 gap-x-0.5"
                    variant={
                      data?.result?.whatsapp_info?.data?.status ===
                      'Account Found'
                        ? 'default'
                        : 'danger'
                    }
                  >
                    <IconBrandWhatsapp className="size-4" />
                    {data?.result?.whatsapp_info?.data?.status ===
                    'Account Found'
                      ? 'Active'
                      : 'Inactive'}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-semibold text-slate-400">
                    Whatsapp Business Account
                  </p>
                  <CustomBadge
                    value={
                      data?.result?.whatsapp_info?.data?.is_business === '0'
                        ? 'No'
                        : 'Yes'
                    }
                  />
                </div>
                <Separator className="my-2.5 h-0.5 bg-slate-700" />

                <div className="flex justify-between">
                  <p className="text-sm font-semibold text-slate-400">
                    Revoke Date
                  </p>

                  <CustomBadge
                    value={data?.result?.revoke_info?.data?.revoke_date}
                  />
                </div>
                <div className="flex justify-between">
                  <p className="text-sm font-semibold text-slate-400">
                    Revoke Status
                  </p>

                  <CustomBadge
                    value={data?.result?.revoke_info?.data?.revoke_status}
                  />
                </div>
              </div>
            </DashboardCard>
          </div>
          {/* lpg */}
          {data?.result?.lpg_info?.data?.length > 0 && (
            <LPG data={{ lpg_info: data?.result?.lpg_info?.data }} />
          )}
          {/* ecisc history */}
          {data?.result?.esic_info?.data &&
            data.result.esic_info.data.length > 0 && (
              <DashboardCard
                title="ESIC History"
                className="scrollbar-custom max-w-[52vw] overflow-auto"
              >
                <Table className="">
                  <TableHeader>
                    <TableRow className="border-slate-800">
                      <TableHead className="min-w-40 text-slate-400">
                        IFSC
                      </TableHead>
                      <TableHead className="min-w-52 text-slate-400">
                        Name
                      </TableHead>
                      <TableHead className="min-w-40 text-slate-400">
                        Mobile
                      </TableHead>
                      <TableHead className="min-w-40 text-slate-400">
                        Account Number
                      </TableHead>
                      <TableHead className="min-w-40 text-slate-400">
                        Bank Name
                      </TableHead>
                      <TableHead className="min-w-60 text-slate-400">
                        Branch Name
                      </TableHead>
                      <TableHead className="min-w-40 text-slate-400">
                        UAN Number
                      </TableHead>
                      <TableHead className="min-w-40 text-slate-400">
                        ESIC Number
                      </TableHead>
                      <TableHead className="min-w-40 text-slate-400">
                        Status
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="">
                    {data?.result?.esic_info?.data?.map((item) => (
                      <TableRow
                        key={formatSentence(item?.esic_number)}
                        className="scrollbar-custom overflow-auto border-slate-800"
                      >
                        <TableCell>{item?.ifsc}</TableCell>
                        <TableCell className="min-w-40">
                          {formatSentence(item?.name)}
                        </TableCell>
                        <TableCell>{item?.mobile}</TableCell>
                        <TableCell>{item?.account_number}</TableCell>
                        <TableCell className="min-w-52">
                          {formatSentence(item?.bank_name)}
                        </TableCell>
                        <TableCell className="min-w-40">
                          {formatSentence(item?.branch_name)}
                        </TableCell>
                        <TableCell>
                          {formatSentence(item?.uan_number)}
                        </TableCell>
                        <TableCell className="min-w-52">
                          {formatSentence(item?.esic_number)}
                        </TableCell>
                        <TableCell className="min-w-52">
                          <CustomBadge value={item?.bank_account_status} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </DashboardCard>
            )}

          <div className="grid grid-cols-1 gap-4">
            {/* din */}
            <DashboardCard
              title="Din Info"
              className="scrollbar-custom max-h-[400px] overflow-auto"
            >
              {data?.result?.din_info?.data.map((val, index) => (
                <InfoText
                  label={`${val?.data?.name}`}
                  value={getValue(val.pan)}
                  key={index}
                />
              ))}
            </DashboardCard>
            <DashboardCard
              title="Udyam Numbers"
              className="scrollbar-custom max-h-[400px] overflow-auto"
            >
              {data?.result?.msme_info?.data.map((val, index) => (
                <InfoText
                  label={`${val?.udyam_number}`}
                  value={
                    val?.enterprise_name?.length > 34
                      ? val?.enterprise_name?.slice(0, 34) + '...'
                      : val?.enterprise_name
                  }
                  key={index}
                />
              ))}
            </DashboardCard>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <DashboardCard
              title="GST List"
              className="scrollbar-custom grid max-h-[400px] grid-cols-3 overflow-auto"
            >
              {data?.result?.gst_list?.data.map((val, index) => (
                <div key={index}>{val}</div>
              ))}
            </DashboardCard>
            <DashboardCard
              title="IEC List"
              className="scrollbar-custom grid max-h-[400px] grid-cols-3 overflow-auto"
            >
              {data?.result?.iec_list?.data.map((val, index) => (
                <div key={index}>{val}</div>
              ))}
            </DashboardCard>
            <DashboardCard
              title="EPFO Info"
              className="scrollbar-custom grid max-h-[400px] grid-cols-3 overflow-auto"
            >
              {data?.result?.epfo_info?.data.map((val, index) => (
                <div key={index}>{val}</div>
              ))}
            </DashboardCard>
            <DashboardCard
              title="ESIC Info"
              className="scrollbar-custom grid max-h-[400px] grid-cols-3 overflow-auto"
            >
              {data?.result?.esic_info?.data.map((val, index) => (
                <div key={index}>{val?.esic_number}</div>
              ))}
            </DashboardCard>
            <DashboardCard
              title="Director Pan Info"
              className="scrollbar-custom grid max-h-[400px] grid-cols-3 overflow-auto"
            >
              {data?.result?.director_pan_info?.data.map((val, index) => (
                <div key={index}>{val}</div>
              ))}
            </DashboardCard>
          </div>
        </div>
      ) : (
        <NotFound value="UAN, ESIC Not Found" />
      )}
    </div>
  );
};

export default M2365;
