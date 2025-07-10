import NotFound from '@/components/sub/NotFound';
import React, { useState } from 'react';
import {
  formatDateTime,
  formatSentence,
} from '@/components/custom/functions/formatUtils';
import { getValue } from '../../BeFiSc/sub/CustomBeFiScCard';
import { DashboardCard } from '../../dashboard/components/DashboardCard';
import CustomBadge from '../../BeFiSc/sub/CustomBadge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { getClientInfo, post } from '@/lib/api';
import { OlaGeoApiType } from '@/types/ola-geo-api';
import { toast } from 'sonner';
import CustomPopUp from '../../BeFiSc/sub/CustomPopUp';
import Image from 'next/image';
import SentenceLoader from '../../BeFiSc/sub/SentenceLoader';

interface PageProps {
  data: {
    address: {
      city: string;
      type: string;
      state: string;
      pincode: string;
      detailed_address: string;
      date_of_reporting: string;
    }[];
  };
}

const olaData: Map<string, OlaGeoApiType> = new Map();

const M2Address: React.FC<PageProps> = ({ data }) => {
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
  const pinCodes: string[] = [];
  const fillteredAddress = data?.address?.filter((item) => {
    if (pinCodes.includes(item?.pincode)) {
      return false;
    }
    pinCodes.push(item?.pincode);
    return true;
  });

  return (
    <div className="max-h-[65vh] overflow-auto">
      {data?.address?.length > 0 ? (
        <div className="space-y-2 p-2">
          <span className="text-lg font-medium text-yellow-500">
            Addresses Found: {fillteredAddress?.length}
          </span>
          <div className="flex flex-col space-y-2">
            {fillteredAddress?.map((item, index) => {
              return (
                <DashboardCard title="" key={`${item?.pincode}${index}`}>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        <div>
                          <p className="text-sm text-gray-400">Type</p>
                          <p className="text-base font-medium">
                            {formatSentence(item?.type)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">City</p>
                          <p className="text-base font-medium">
                            {formatSentence(item?.city)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">State</p>
                          <p className="text-base font-medium">
                            {formatSentence(item?.state)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Pincode</p>
                          <p className="text-base font-medium">
                            {formatSentence(item?.pincode)}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">
                          Date of Reporting
                        </p>
                        <p className="text-base font-medium text-yellow-500">
                          {formatSentence(item?.date_of_reporting)}
                        </p>
                      </div>
                    </div>

                    <Separator className="mt-4 bg-slate-800" />
                    <div className="mt-4 grid grid-cols-1 gap-4">
                      <div className="">
                        <p className="text-sm text-gray-400">
                          Detailed Address
                        </p>
                        <div className="break-words text-base font-medium">
                          {formatSentence(item?.detailed_address)}
                          <CustomPopUp
                            dialogTitle={''}
                            triggerElement={
                              <Button
                                onClick={() => {
                                  handleView(item?.detailed_address);
                                }}
                                size={'sm'}
                                variant={'ghost'}
                                className="text-emerald-500"
                              >
                                View Map
                              </Button>
                            }
                            children={
                              <div>
                                <div>
                                  <div className="flex w-full justify-between gap-4 text-lg font-semibold">
                                    <div className="flex flex-col space-y-6">
                                      <div>
                                        <p className={'text-xs text-slate-400'}>
                                          Full Address
                                        </p>
                                        <p className="max-w-[610px] bg-opacity-75 text-base">
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
                                            <p className="text-lg font-medium text-emerald-500">
                                              {formatSentence(
                                                addressData?.data?.responseData
                                                  ?.duration?.readable_duration,
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
                                            <p className="text-lg font-medium text-yellow-500">
                                              {formatSentence(
                                                addressData?.data?.responseData
                                                  ?.distance
                                                  ?.distance_kilometers,
                                              )}
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="">
                                      {mapLoading ? (
                                        <SentenceLoader className="min-h-[280px] w-[420px]" />
                                      ) : (
                                        <Image
                                          src={`data:${addressData?.data?.responseData?.content_type};base64,${addressData?.data?.responseData?.image}`}
                                          alt="map"
                                          width={450}
                                          height={450}
                                          className="max-h-72 rounded-xl"
                                          unoptimized={true}
                                        />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </DashboardCard>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <NotFound value="No Addresses Found" />
        </div>
      )}
    </div>
  );
};

export default M2Address;
