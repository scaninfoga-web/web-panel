import NotFound from '@/components/sub/NotFound';
import React, { useState } from 'react';
import { formatSentence } from '@/components/custom/functions/formatUtils';
import { DashboardCard } from '../../dashboard/components/DashboardCard';
import { MobileToAccountNumberType, RazorPayUpiType } from '@/types/BeFiSc';
import { getValue } from '../../BeFiSc/sub/CustomBeFiScCard';
import { getClientInfo, post } from '@/lib/api';
import { OlaGeoApiType } from '@/types/ola-geo-api';
import { toast } from 'sonner';
import SentenceLoader from '../../BeFiSc/sub/SentenceLoader';
import CustomPopUp from '../../BeFiSc/sub/CustomPopUp';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface PageProps {
  data: {
    razorPayData: RazorPayUpiType | null;
    mobileToBankData: MobileToAccountNumberType | null;
  };
}

const olaData: Map<string, OlaGeoApiType> = new Map();
const M2BankInfo: React.FC<PageProps> = ({ data }) => {
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
  console.log('RAXORZOR PAT', data);

  return (
    <div className="max-h-[65vh] overflow-auto">
      {Object.keys(data?.mobileToBankData?.result?.account_details || {})
        .length > 0 ? (
        <div className="p-2">
          <DashboardCard title={``}>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Account Holder Name</p>
                  <p className="text-base font-medium">
                    {formatSentence(
                      data?.mobileToBankData?.result?.vpa_details
                        ?.account_holder_name,
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Bank</p>
                  <p className="break-all text-base font-medium">
                    {formatSentence(
                      data?.razorPayData?.responseData?.data?.BANK,
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">VPA</p>
                  <p className="break-all text-base font-medium">
                    {getValue(
                      data?.mobileToBankData?.result?.vpa_details?.vpa?.toLowerCase(),
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Account IFSC</p>
                  <p className="text-base font-medium text-blue-500">
                    {getValue(
                      data?.mobileToBankData?.result?.account_details
                        ?.account_ifsc,
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Account Number</p>
                  <p className="text-base font-medium text-blue-500">
                    {formatSentence(
                      data?.mobileToBankData?.result?.account_details
                        ?.account_number,
                    )}
                  </p>
                </div>
                {/* raxorpay  */}
                <div>
                  <p className="text-sm text-gray-400">UPI</p>
                  <p className="text-base font-medium text-yellow-500">
                    {formatSentence(
                      data?.razorPayData?.responseData?.data?.UPI,
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">NEFT</p>
                  <p className="text-base font-medium text-yellow-500">
                    {formatSentence(
                      data?.razorPayData?.responseData?.data?.NEFT,
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">SWIFT</p>
                  <p className="text-base font-medium text-yellow-500">
                    {formatSentence(
                      data?.razorPayData?.responseData?.data?.SWIFT,
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">RTGS</p>
                  <p className="text-base font-medium text-yellow-500">
                    {formatSentence(
                      data?.razorPayData?.responseData?.data?.RTGS,
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">IMPS</p>
                  <p className="text-base font-medium text-yellow-500">
                    {formatSentence(
                      data?.razorPayData?.responseData?.data?.IMPS,
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">MICR</p>
                  <p className="text-base font-medium text-yellow-500">
                    {formatSentence(
                      data?.razorPayData?.responseData?.data?.MICR,
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">ISO3166</p>
                  <p className="text-base font-medium">
                    {data?.razorPayData?.responseData?.data?.ISO3166?.toUpperCase()}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400">Address</p>
                <div className="text-base font-medium">
                  {formatSentence(
                    data?.razorPayData?.responseData?.data?.ADDRESS,
                  )}
                  <CustomPopUp
                    dialogTitle={''}
                    triggerElement={
                      <Button
                        onClick={() => {
                          handleView(
                            data?.razorPayData?.responseData?.data?.ADDRESS ||
                              '',
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
              </div>
            </div>
          </DashboardCard>
        </div>
      ) : (
        <div>
          <NotFound value="No Account Detected" />
        </div>
      )}
    </div>
  );
};

export default M2BankInfo;
