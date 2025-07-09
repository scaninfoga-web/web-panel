import NotFound from '@/components/sub/NotFound';
import React, { useState } from 'react';
import { formatSentence } from '@/components/custom/functions/formatUtils';
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
    lpg_info: {
      name: string;
      address: string;
      gas_provider: string;
      consumer_details: {
        consumer_id: string;
        consumer_type: string;
        consumer_mobile: string;
        consumer_status: string;
      };
      distributor_details: {
        distributor_code: string;
        distributor_name: string;
        distributor_address: string;
        distributor_contact: string;
      };
    }[];
  };
}

const olaData: Map<string, OlaGeoApiType> = new Map();

const LPG: React.FC<PageProps> = ({ data }) => {
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
      {data?.lpg_info?.length > 0 ? (
        <div className="space-y-2 p-2">
          <span className="text-lg font-medium text-yellow-500">
            LPG Connections : {data?.lpg_info?.length}
          </span>
          <div className="flex flex-col space-y-2">
            {data?.lpg_info?.map((item, index) => {
              return (
                <DashboardCard
                  title={`${formatSentence(item?.gas_provider)}`}
                  key={`${item?.gas_provider}${index}`}
                >
                  <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-[30%_70%]">
                      <div>
                        <p className="text-sm text-gray-400">Name</p>
                        <p className="text-base font-medium">
                          {formatSentence(item?.name)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Address</p>
                        <div className="text-base font-medium">
                          {formatSentence(item?.address)}
                          <CustomPopUp
                            dialogTitle={formatSentence(
                              `${item?.name} - ${item?.gas_provider}`,
                            )}
                            triggerElement={
                              <Button
                                onClick={() => {
                                  handleView(item?.address);
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
                                        <p className="text-base font-medium text-yellow-500 lg:text-lg">
                                          {formatSentence(
                                            addressData?.data?.responseData
                                              ?.distance?.distance_kilometers,
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
                    <Separator className="mt-4 bg-slate-800" />
                    <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
                      <div>
                        <p className="text-sm text-gray-400">Consumer Id</p>
                        <p className="break-all text-base font-medium">
                          {formatSentence(item?.consumer_details?.consumer_id)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Consumer Type</p>
                        <p className="text-base font-medium">
                          {formatSentence(
                            item?.consumer_details?.consumer_type,
                          )}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Consumer Mobile</p>
                        <p className="text-base font-medium text-blue-500">
                          {getValue(item?.consumer_details?.consumer_mobile)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Consumer Status</p>
                        <CustomBadge
                          value={item?.consumer_details?.consumer_status}
                        />
                      </div>
                    </div>
                    <Separator className="mt-4 bg-slate-800" />
                    <div className="mt-4 grid grid-cols-1 gap-4">
                      <div className="grid grid-cols-2 lg:grid-cols-3">
                        <div>
                          <p className="text-sm text-gray-400">
                            Distributor Code
                          </p>
                          <p className="text-base font-medium">
                            {getValue(
                              item?.distributor_details?.distributor_code,
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">
                            Distributor Name
                          </p>
                          <p className="text-base font-medium">
                            {formatSentence(
                              item?.distributor_details?.distributor_name,
                            )}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">
                            Distributor Contact
                          </p>
                          <p className="text-base font-medium text-blue-500">
                            {getValue(
                              item?.distributor_details?.distributor_contact,
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="">
                        <p className="text-sm text-gray-400">
                          Distributor Address
                        </p>
                        <div className="break-words text-base font-medium">
                          {formatSentence(
                            item?.distributor_details?.distributor_address,
                          )}
                          <CustomPopUp
                            dialogTitle={formatSentence(
                              `${item?.name} - ${item?.gas_provider}`,
                            )}
                            triggerElement={
                              <Button
                                onClick={() => {
                                  handleView(
                                    item?.distributor_details
                                      ?.distributor_address,
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
          <NotFound value="No LPG Connection Found" />
        </div>
      )}
    </div>
  );
};

export default LPG;
