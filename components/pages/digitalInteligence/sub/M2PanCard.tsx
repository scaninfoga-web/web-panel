import NotFound from '@/components/sub/NotFound';
import React, { useState } from 'react';
import { formatSentence } from '@/components/custom/functions/formatUtils';
import { DashboardCard } from '../../dashboard/components/DashboardCard';
import {
  MobileToAccountNumberType,
  PanAllInOneType,
  RazorPayUpiType,
} from '@/types/BeFiSc';
import { getClientInfo, post } from '@/lib/api';
import { OlaGeoApiType } from '@/types/ola-geo-api';
import { toast } from 'sonner';
import SentenceLoader from '../../BeFiSc/sub/SentenceLoader';
import CustomPopUp from '../../BeFiSc/sub/CustomPopUp';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import InfoText2 from '@/components/custom/components/InfoText2';
import CustomBeFiScCard, { getValue } from '../../BeFiSc/sub/CustomBeFiScCard';
import CustomBadge from '../../BeFiSc/sub/CustomBadge';

interface PageProps {
  data: PanAllInOneType | null;
}

const olaData: Map<string, OlaGeoApiType> = new Map();
const M2PanCard: React.FC<PageProps> = ({ data }) => {
  const [addressData, setAddressData] = useState<null | {
    address: string;
    data: OlaGeoApiType;
  }>(null);
  const [mapLoading, setMapLoading] = useState(false);

  const handleView = async (
    address: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (address?.length < 10) {
      e.stopPropagation();
      return toast.error('Address is too small', { id: 1 });
    }
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
  const fullAddress = `${data?.result?.address?.line_1 || ''} ${
    data?.result?.address?.line_2 || ''
  } ${data?.result?.address?.city || ''} ${
    data?.result?.address?.state || ''
  } ${data?.result?.address?.zip || ''} ${
    data?.result?.address?.country || ''
  }`;

  return (
    <div className="max-h-[65vh] overflow-auto">
      {Object.keys(data?.result || {}).length > 0 ? (
        <div className="grid grid-cols-1 gap-4 p-2">
          <DashboardCard title={`Details`}>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-3 gap-4">
                <InfoText2
                  label="Pan Number"
                  value={data?.result?.pan_number?.toUpperCase()}
                  valueClassName="text-yellow-500"
                />
                <InfoText2
                  label="Name"
                  value={formatSentence(data?.result?.full_name)}
                />
                <InfoText2
                  label="DOB"
                  value={formatSentence(data?.result?.dob || '')}
                />
                <InfoText2
                  label="Gender"
                  value={formatSentence(data?.result?.gender)}
                />
                <InfoText2
                  label="Phone Number"
                  value={formatSentence(data?.result?.phone_number)}
                  valueClassName="text-yellow-500"
                />
                <InfoText2
                  label="Aadhaar"
                  value={getValue(data?.result?.masked_aadhaar)}
                  valueClassName="text-yellow-500"
                />
                <InfoText2
                  label="Email"
                  value={formatSentence(data?.result?.email)}
                  valueClassName="text-yellow-500"
                />
                <InfoText2
                  label="Aadhaar Linked"
                  value={<CustomBadge value={data?.result?.aadhaar_linked} />}
                />
              </div>
              <div>
                <p className="text-sm text-gray-400">Address</p>
                <div className="text-base font-medium">
                  {formatSentence(fullAddress)}
                  <CustomPopUp
                    dialogTitle={''}
                    triggerElement={
                      <Button
                        onClick={(e) => {
                          handleView(fullAddress, e);
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
              </div>
            </div>
          </DashboardCard>
          <div className="grid grid-cols-2 gap-3">
            <CustomBeFiScCard
              data={data?.result?.is_sole_proprietor?.info}
              title="isSoleProprietor"
            />
            <CustomBeFiScCard
              data={data?.result?.is_director?.info}
              title="isDirector"
            />
          </div>
          <CustomBeFiScCard
            data={data?.result?.din_info?.company_list}
            title={`Din  Info: ${data?.result?.din_info?.din}`}
          />
        </div>
      ) : (
        <div>
          <NotFound value="No Pan Details Found" />
        </div>
      )}
    </div>
  );
};

export default M2PanCard;
