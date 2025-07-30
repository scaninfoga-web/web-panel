import React, { useState } from 'react';
import { formatSentence } from '../functions/formatUtils';
import CustomPopUp from '@/components/pages/BeFiSc/sub/CustomPopUp';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { getClientInfo, post } from '@/lib/api';
import { OlaGeoApiType } from '@/types/ola-geo-api';
import SentenceLoader from '@/components/pages/BeFiSc/sub/SentenceLoader';
import Image from 'next/image';
interface Props {
  title: string;
  address: string | undefined | null;
  className?: string;
}
const olaData: Map<string, OlaGeoApiType> = new Map();
export default function AddressCustomPopComponent({
  title,
  address,
  className,
}: Props) {
  const [addressData, setAddressData] = useState<null | {
    address: string;
    data: OlaGeoApiType;
  }>(null);
  const [mapLoading, setMapLoading] = useState(false);

  const handleView = async (
    address: string | undefined | null,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (!address || address?.length < 10) {
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
  return (
    <div>
      <p className="text-sm text-gray-400">{title}</p>
      <div className={`text-base font-medium ${className}`}>
        {formatSentence(address)}
        <CustomPopUp
          dialogTitle={title}
          triggerElement={
            <Button
              onClick={(e) => {
                handleView(address, e);
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
                  <p className={'text-xs text-slate-400'}>Full Address</p>
                  <p className="bg-opacity-75 text-base lg:max-w-[610px]">
                    {formatSentence(addressData?.address)}
                  </p>
                </div>
                <div className="flex space-x-8">
                  <div>
                    <p className="text-base text-slate-400">Total Duration</p>

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
  );
}
