import { RazorPayUpiType, SingleUpiRes, UPIType } from '@/types/BeFiSc';
import Image from 'next/image';
import {
  DashboardCard,
  InfoText,
} from '../../dashboard/components/DashboardCard';
import { Button } from '@/components/ui/button';
import { getClientInfo, post } from '@/lib/api';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { UPI2AccountType } from '@/types/Upi2Acc';
const upiIcons = new Map<string, string>([
  ['PhonePe', '/upi/phonepe.png'],
  ['FinoPay', '/upi/FinoPay.png'],
  ['Amazon Pay', '/upi/amazonpay.png'],
  ['Paytm', '/upi/paytm.png'],
  ['BHIM', '/upi/BHIM.svg'],
  ['Axis Bank', '/upi/AxisBank.png'],
  ['Groww', '/upi/Groww.svg'],
  ['Mobikwik', '/upi/Mobikwik.svg'],
  ['State Bank of India', '/upi/StateBankofIndia.png'],
  ['Airtel Payments Bank', '/upi/airtelpayments.png'],
  ['HDFC Bank', '/upi/HDFCBank.png'],
  ['IDFC FIRST Bank', '/upi/IDFCFIRSTBank.jpeg'],
  ['super.money', '/upi/super-money.jpeg'],
  ['QuikWallet', '/upi/QuikWallet.png'],
  ['Cheq', '/upi/Cheq.png'],
  ['Jana Bank', '/upi/JanaBank.png'],
  ['MyJio UPI', '/upi/MyJio UPI.svg'],
  ['Fampay', '/upi/Fampay.jpeg'],
  ['Bajaj Finserv', '/upi/BajajFinserv.jpeg'],
  ['PayZapp', '/upi/PayZap.png'],
  ['Zomato', '/upi/zomato.png'],
  ['Jupiter', '/upi/jupiter.svg'],
  ['Bank of Baroda', '/upi/BankofBaroda.png'],
  ['Indian Bank', '/upi/Indian_Bank_.png'],
  ['CRED', '/upi/cred.jpeg'],
  ['POPclub', '/upi/POPclub.png'],
]);
import {
  Dialog,
  DialogContent,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader } from '@/components/ui/loader';
import { OlaGeoApiType } from '@/types/ola-geo-api';
import NotFound from '@/components/sub/NotFound';
import {
  cleanToCompare,
  formatKey,
  formatSentence,
} from '@/components/custom/functions/formatUtils';

const mapState: Map<
  string,
  {
    razorPayUpi: RazorPayUpiType | null;
    Upi2AccData: UPI2AccountType | null;
    mapData: OlaGeoApiType | null;
  } | null
> = new Map();
const nameBank: string[] = [];

export default function M2UPI({
  data,
}: {
  data: {
    [key: string]: {
      data: {
        result: {
          bank: string;
          city: string;
          name: string;
          state: string;
          branch: string;
          center: string;
          address: string;
          contact: string;
          district: string;
        };
        status: number;
        txn_id: string;
        message: string;
        api_name: string;
        billable: boolean;
        datetime: string;
        api_category: string;
      };
      success: true;
      billable: true;
      platform: string;
      upi_handle: string;
    };
  };
}) {
  if (Object.keys(data).length === 0) {
    return <NotFound value="No data found" />;
  }

  const [loading, setLoading] = useState(false);
  const [isViewDetails, setIsViewDetails] = useState(false);
  const [selectedData, setSelectedData] = useState<{
    razorPayUpi: RazorPayUpiType | null;
    Upi2AccData: UPI2AccountType | null;
    mapData: OlaGeoApiType | null;
    upiData: SingleUpiRes | null;
    selectedUPI: string;
    selectDateTime: string;
  } | null>(null);
  const [metaData, setMetaData] = useState<{
    upiIds: number;
    totatUpiHandles: number;
    totalAccounts: number;
  }>({
    upiIds: 0,
    totatUpiHandles: 0,
    totalAccounts: 0,
  });

  const handleCloseDetails = () => {
    setIsViewDetails(false);
  };

  useEffect(() => {
    let totatUpiHandles: string[] = [];
    let totalAccounts: string[] = [];
    let upiIds = 0;

    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        if (value?.success) {
          if (!totatUpiHandles.includes(value?.platform)) {
            totatUpiHandles.push(value?.platform);
          }
          if (!totalAccounts.includes(value?.data?.result?.bank)) {
            totalAccounts.push(value?.data?.result?.bank);
          }
          upiIds++;
        }
      });
      setMetaData({
        upiIds,
        totatUpiHandles: totatUpiHandles.length,
        totalAccounts: totalAccounts.length,
      });
    }
  }, [data]);

  const handleFetch = async (UpiData: SingleUpiRes, upiId: string) => {
    const nameAndBank =
      cleanToCompare(UpiData?.data?.result?.bank) +
      cleanToCompare(UpiData?.data?.result?.name);

    if (!nameBank.includes(nameAndBank)) {
      try {
        const res = await post('/api/mobile/upi-to-account-full-data', {
          upi_id: upiId,
          realtimeData: false,
        });

        const ifsc =
          res?.responseData?.at(-1)?.data?.result?.account_details
            ?.account_ifsc;

        const razorPayRes = await post('/api/secondary/ifsc-data', {
          ifsc_code: ifsc,
          realtimeData: false,
        });
        try {
          const clientInfo = getClientInfo();
          const bankAddress =
            razorPayRes?.responseData?.data?.ADDRESS ||
            UpiData?.data?.result?.address;
          // call for map details
          const mapRes = await post('/api/auth/getmap', {
            userLng: clientInfo?.longitude,
            userLat: clientInfo?.latitude,
            address: bankAddress,
          });
          nameBank.push(nameAndBank);
          mapState.set(nameAndBank, {
            Upi2AccData: res,
            razorPayUpi: razorPayRes,
            mapData: mapRes,
          });
        } catch (error) {
          toast.error('Map fetch error');
          nameBank.push(nameAndBank);
          mapState.set(nameAndBank, {
            Upi2AccData: res,
            razorPayUpi: razorPayRes,
            mapData: null,
          });
        }
      } catch (error) {
        toast.error('Upi fetch error');
        setIsViewDetails(false);
      }
    }
  };

  const handleViewDetails = async (upiId: string, data: SingleUpiRes) => {
    try {
      setLoading(true);
      setIsViewDetails(true);
      await handleFetch(data, upiId);
      const nameAndBank =
        data.data?.result?.bank?.trim().replace(/\s+/g, '').toLowerCase() +
        data?.data?.result?.name?.trim().replace(/\s+/g, '').toLowerCase();
      const getData = mapState?.get(nameAndBank);
      if (getData) {
        const upi2dataLength = getData?.Upi2AccData?.responseData?.length || 1;
        setSelectedData({
          Upi2AccData: getData.Upi2AccData,
          razorPayUpi: getData.razorPayUpi,
          mapData: getData.mapData,
          selectedUPI: upiId,
          upiData: data,
          selectDateTime:
            getData?.Upi2AccData?.responseData?.[upi2dataLength - 1]
              ?.datetime || '',
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex max-h-[65vh] flex-col space-y-2 overflow-auto p-2">
      <div className="mb-2 grid grid-cols-1 gap-4 space-y-1 text-lg font-semibold text-yellow-500 lg:grid-cols-3">
        <div className="flex items-center space-x-1">
          <Image
            alt="upi"
            src={'/upi-payment-icon.png'}
            width={40}
            height={40}
            className="rounded-full border border-slate-400 bg-slate-200"
          />
          <span>UPI Handles: {metaData?.upiIds}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Image
            alt="upi"
            src={'/upi-payment-icon.png'}
            width={40}
            height={40}
            className="rounded-full border border-slate-400 bg-slate-200"
          />
          <span>UPI Platforms: {metaData?.totatUpiHandles}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Image
            alt="upi"
            src={'/bank-account.png'}
            width={40}
            height={40}
            className="rounded-full border border-slate-400 bg-slate-200"
          />
          <span>Account Detacted: {metaData?.totalAccounts}</span>
        </div>
      </div>
      <div className="grid max-h-[65vh] grid-cols-1 gap-2 overflow-auto lg:grid-cols-2">
        {Object.entries(data).map(([upiId, data]) => {
          if (!data.success) {
            return null;
          }

          return (
            <div key={data?.data?.txn_id}>
              <DashboardCard
                className=""
                icon={
                  <Image
                    src={upiIcons.get(data?.platform) || '/null.png'}
                    width={50}
                    height={50}
                    alt="icon"
                    className="relative -left-2 rounded-full bg-white p-0.5"
                  />
                }
                titleBig={false}
                title={`${upiId}-${'  '}${data?.platform}`}
              >
                <div>
                  {Object.entries(data?.data?.result).map(
                    ([key, value], index) => {
                      if (key === 'center') {
                        return null;
                      }
                      if (key === 'address') {
                        return (
                          <InfoText
                            key={index}
                            label={formatKey(key)}
                            value={formatSentence(value.slice(0, 30))}
                          />
                        );
                      }
                      return (
                        <InfoText
                          key={index}
                          label={formatKey(key)}
                          value={formatSentence(value)}
                        />
                      );
                    },
                  )}
                </div>
                <Button
                  onClick={() => {
                    handleViewDetails(upiId, data);
                  }}
                  className="mt-4 px-4 py-1"
                  variant={'default'}
                >
                  View Details
                </Button>
              </DashboardCard>

              {isViewDetails && (
                <div className="max-w-96 border">
                  <Dialog
                    open={isViewDetails}
                    onOpenChange={(open) => !open && handleCloseDetails()}
                  >
                    <DialogPortal>
                      <DialogContent className="min-[400px] flex min-w-[800px] flex-col rounded-lg border-slate-800 bg-slate-950 p-10 text-white shadow-2xl shadow-slate-800 backdrop-blur-3xl">
                        {loading ? (
                          <DialogTitle className="">
                            <Loader className="max-h-[400px]" />
                          </DialogTitle>
                        ) : (
                          <>
                            <DialogTitle className="flex items-center justify-between space-x-44 font-bold text-emerald-500">
                              <span className="text-2xl">
                                {selectedData?.selectedUPI}
                              </span>
                            </DialogTitle>
                            <div className="relative flex min-h-full flex-col space-y-10 overflow-hidden">
                              <div className="flex flex-col text-lg">
                                <div className="space-x-1 font-semibold">
                                  <span className="text-white/70">
                                    Account Holder Name :
                                  </span>
                                  <span>
                                    {formatSentence(
                                      selectedData?.Upi2AccData?.responseData?.at(
                                        -1,
                                      )?.data?.result?.digital_payment_details
                                        ?.account_holder_name,
                                    )}
                                  </span>
                                </div>
                                <div className="space-x-1 font-semibold">
                                  <span className="text-white/70">
                                    Account Number :
                                  </span>
                                  <span>
                                    {formatSentence(
                                      selectedData?.Upi2AccData?.responseData?.at(
                                        -1,
                                      )?.data?.result?.account_details
                                        ?.account_number,
                                    )}
                                  </span>
                                </div>
                                <div className="space-x-1 font-semibold">
                                  <span className="text-white/70">
                                    Account IFSC :
                                  </span>
                                  <span>
                                    {
                                      selectedData?.Upi2AccData?.responseData?.at(
                                        -1,
                                      )?.data?.result?.account_details
                                        ?.account_ifsc
                                    }
                                  </span>
                                </div>
                              </div>

                              <div className="flex justify-between space-x-4">
                                <div className="flex flex-col space-y-2">
                                  <div className="space-x-1 font-semibold">
                                    <span className="text-white/70">
                                      Bank Name :
                                    </span>
                                    <span>
                                      {formatSentence(
                                        selectedData?.razorPayUpi?.responseData
                                          ?.data?.BANK ||
                                          selectedData?.upiData?.data?.result
                                            ?.bank,
                                      )}
                                    </span>
                                  </div>

                                  <div className="space-x-1 font-semibold">
                                    <span className="text-white/70">
                                      Branch :
                                    </span>
                                    <span>
                                      {formatSentence(
                                        selectedData?.razorPayUpi?.responseData
                                          ?.data?.BRANCH ||
                                          selectedData?.upiData?.data?.result
                                            ?.branch,
                                      )}
                                    </span>
                                  </div>

                                  <div className="space-x-1 font-semibold">
                                    <span className="text-white/70">
                                      State :
                                    </span>
                                    <span>
                                      {formatSentence(
                                        selectedData?.razorPayUpi?.responseData
                                          ?.data?.STATE ||
                                          selectedData?.upiData?.data?.result
                                            ?.district,
                                      )}
                                    </span>
                                  </div>
                                  <div className="space-x-1 font-semibold">
                                    <span className="text-white/70">
                                      District :
                                    </span>
                                    <span>
                                      {formatSentence(
                                        selectedData?.razorPayUpi?.responseData
                                          ?.data?.DISTRICT ||
                                          selectedData?.upiData?.data?.result
                                            ?.district,
                                      )}
                                    </span>
                                  </div>
                                  <div className="space-x-1 font-semibold">
                                    <span className="text-white/70">
                                      City :
                                    </span>
                                    <span>
                                      {formatSentence(
                                        selectedData?.razorPayUpi?.responseData
                                          ?.data?.CITY ||
                                          selectedData?.upiData?.data?.result
                                            ?.city,
                                      )}
                                    </span>
                                  </div>
                                  <div className="space-x-1 font-semibold">
                                    <span className="text-white/70">
                                      Center :
                                    </span>
                                    <span>
                                      {formatSentence(
                                        selectedData?.razorPayUpi?.responseData
                                          ?.data?.CENTRE ||
                                          selectedData?.upiData?.data?.result
                                            ?.center,
                                      )}
                                    </span>
                                  </div>
                                  <div className="space-x-1 font-semibold">
                                    <span className="text-white/70">
                                      Contact :
                                    </span>
                                    <span>
                                      {formatSentence(
                                        selectedData?.razorPayUpi?.responseData
                                          ?.data?.CONTACT ||
                                          selectedData?.upiData?.data?.result
                                            ?.contact,
                                      )}
                                    </span>
                                  </div>
                                </div>
                                <div className="min-w-60">
                                  <div className="space-x-1 font-semibold">
                                    <span className="text-white/70">
                                      ISCO3166 :
                                    </span>
                                    <span className="text-yellow-500">
                                      {selectedData?.razorPayUpi?.responseData?.data?.ISO3166?.toUpperCase() ||
                                        '----'}
                                    </span>
                                  </div>
                                  <div className="space-x-1 font-semibold">
                                    <span className="text-white/70">
                                      MICR :
                                    </span>
                                    <span className="text-yellow-500">
                                      {formatSentence(
                                        selectedData?.razorPayUpi?.responseData
                                          ?.data?.MICR,
                                      )}
                                    </span>
                                  </div>
                                  <div className="space-x-1 font-semibold">
                                    <span className="text-white/70">
                                      NEFT :
                                    </span>
                                    <span className="text-yellow-500">
                                      {formatSentence(
                                        selectedData?.razorPayUpi?.responseData
                                          ?.data?.NEFT,
                                      )}
                                    </span>
                                  </div>
                                  <div className="space-x-1 font-semibold">
                                    <span className="text-white/70">
                                      IMPS :
                                    </span>
                                    <span className="text-yellow-500">
                                      {formatSentence(
                                        selectedData?.razorPayUpi?.responseData
                                          ?.data?.IMPS,
                                      )}
                                    </span>
                                  </div>
                                  <div className="space-x-1 font-semibold">
                                    <span className="text-white/70">
                                      SWIFT :
                                    </span>
                                    <span className="text-yellow-500">
                                      {formatSentence(
                                        selectedData?.razorPayUpi?.responseData
                                          ?.data?.SWIFT,
                                      )}
                                    </span>
                                  </div>
                                  <div className="space-x-1 font-semibold">
                                    <span className="text-white/70">UPI :</span>
                                    <span className="text-yellow-500">
                                      {formatSentence(
                                        selectedData?.razorPayUpi?.responseData
                                          ?.data?.UPI,
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex w-full justify-between gap-4 text-lg font-semibold">
                                <div className="flex flex-col space-y-6">
                                  <div>
                                    <p className={'text-xs text-slate-400'}>
                                      Address
                                    </p>
                                    <p className="max-w-[610px] bg-opacity-75 text-base">
                                      {formatSentence(
                                        selectedData?.razorPayUpi?.responseData
                                          ?.data?.ADDRESS ||
                                          selectedData?.upiData?.data?.result
                                            ?.address,
                                      )}
                                    </p>
                                  </div>
                                  <div className="flex space-x-8">
                                    <div>
                                      <p className="text-base text-slate-400">
                                        Total Duration
                                      </p>

                                      <p className="text-lg font-medium text-emerald-500">
                                        {formatSentence(
                                          selectedData?.mapData?.responseData
                                            ?.duration?.readable_duration,
                                        )}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-base text-slate-400">
                                        Distance Kilometers
                                      </p>
                                      <p className="text-lg font-medium text-emerald-500">
                                        {formatSentence(
                                          selectedData?.mapData?.responseData
                                            ?.distance?.distance_kilometers,
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="">
                                  <Image
                                    src={
                                      `data:${selectedData?.mapData?.responseData?.content_type};base64,${selectedData?.mapData?.responseData?.image}` ||
                                      '/null.png'
                                    }
                                    alt="map"
                                    width={350}
                                    height={350}
                                    className="max-h-64 rounded-xl"
                                    unoptimized={true}
                                  />
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </DialogContent>
                    </DialogPortal>
                  </Dialog>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
