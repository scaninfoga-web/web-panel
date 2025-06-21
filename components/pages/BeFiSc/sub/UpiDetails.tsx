import { SingleUpiData, UPIType } from '@/types/BeFiSc';
import Image from 'next/image';
import {
  DashboardCard,
  InfoText,
} from '../../dashboard/components/DashboardCard';
import { formatSentence } from './APIUtils';
import { formatKey } from './CustomBeFiScCard';
import { Button } from '@/components/ui/button';
import { post } from '@/lib/api';
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
]);
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog';
import { formatDateTime } from './dateFormat';
import isEqual from 'lodash.isequal';
import { CustomCombox } from '@/components/sub/CustomComBox';
import { IconRefresh } from '@tabler/icons-react';

interface SingleUpi2AccItem {
  datetime: string;
  data: {
    result: {
      account_details: {
        account_ifsc: string;
        account_number: string;
        amount_deposited: string;
      };
      digital_payment_details: {
        digital_payment_id: string;
        account_holder_name: string;
      };
    };
    status: number;
    message: string;
    api_name: string;
    billable: boolean;
    api_category: string;
  };
}

export default function UpiDetails({
  UpiData,
  realName,
}: {
  UpiData: UPIType | null;
  realName: string;
}) {
  if (!UpiData) {
    return <></>;
  }
  const [loading, setLoading] = useState<boolean[]>([]);
  const [upi2AccountData, setUpi2AccountData] = useState<
    (UPI2AccountType | null)[]
  >([]);
  const [isViewDetails, setIsViewDetails] = useState(false);
  const [selectedData, setSelectedData] = useState<{
    UpiDetails: SingleUpiData | null;
    Upi2AccData: UPI2AccountType | null;
    selectedItem: SingleUpi2AccItem | null;
  } | null>(null);

  const [refreshLoading, setRefreshLoading] = useState(false);

  const handleCloseDetails = () => {
    setIsViewDetails(false);
  };

  useEffect(() => {
    if (UpiData?.responseData && Object.keys(UpiData.responseData).length > 0) {
      const length = Object.keys(UpiData.responseData).length;
      setUpi2AccountData(new Array(length).fill(null));
      setLoading(new Array(length).fill(false));
    }
  }, [UpiData]);

  const list =
    selectedData?.Upi2AccData?.responseData?.map((item) => {
      return {
        label: formatDateTime(item?.datetime),
        value: item?.datetime,
      };
    }) || [];

  const handleViewDetails = async (upiId: string, index: number) => {
    try {
      const data = upi2AccountData[index];
      if (data) {
        const isEqualData = isEqual(selectedData?.Upi2AccData, data);
        if (!isEqualData) {
          setSelectedData({
            UpiDetails: { upiId: UpiData?.responseData?.[upiId] },
            Upi2AccData: data,
            selectedItem: data?.responseData?.[data?.responseData?.length - 1],
          });
          setIsViewDetails(true);
          return true;
        } else {
          setIsViewDetails(true);
          return;
        }
      }
      setLoading((prev) => {
        const updated = [...prev];
        updated[index] = true;
        return updated;
      });
      const res = await post('/api/mobile/upi-to-account-full-data', {
        upi_id: upiId,
        realtimeData: false,
      });

      setUpi2AccountData((prev) => {
        const updated = [...prev];
        updated[index] = res;
        return updated;
      });
      setSelectedData({
        UpiDetails: { upiId: UpiData?.responseData?.[upiId] },
        Upi2AccData: res,
        selectedItem: res?.responseData?.[res?.responseData?.length - 1],
      });
      setIsViewDetails(true);
    } catch (error) {
      toast.error('Upi fetch error');
    } finally {
      setLoading((prev) => [
        ...prev.slice(0, index),
        false,
        ...prev.slice(index + 1),
      ]);
    }
  };

  const handleSelect = async (date: string) => {
    const data = selectedData?.Upi2AccData?.responseData?.find(
      (item) => item?.datetime === date,
    );
    if (data && selectedData) {
      setSelectedData({
        ...selectedData,
        selectedItem: data,
      });
    }
  };

  const handleRefresh = async (upiId: string, index: number) => {
    try {
      setRefreshLoading(true);
      await post('/api/mobile/upi-to-account', {
        upi_id: upiId,
        realtimeData: true,
      });
      await new Promise((resolve) => setTimeout(resolve, 7000));
      const res = await post('/api/mobile/upi-to-account-full-data', {
        upi_id: upiId,
        realtimeData: false,
      });
      setUpi2AccountData((prev) => {
        const updated = [...prev];
        updated[index] = res;
        return updated;
      });
      setSelectedData({
        UpiDetails: { upiId: UpiData?.responseData?.[upiId] },
        Upi2AccData: res,
        selectedItem: res?.responseData?.[res?.responseData?.length - 1],
      });
    } catch (error) {
      toast.error('Upi fetch error');
    } finally {
      setRefreshLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      {Object.entries(UpiData.responseData).map(([upiId, data], index) => {
        if (!data.success) {
          return null;
        }

        return (
          <>
            <DashboardCard
              notifytitle={
                data?.data?.result?.name
                  .trim()
                  .replace(/\s+/g, ' ')
                  .toLowerCase() === realName
                  ? null
                  : 'view details?'
              }
              icon={
                <Image
                  src={upiIcons.get(data.platform) || '/null.png'}
                  width={50}
                  height={50}
                  alt="icon"
                  className="relative -left-2 rounded-full bg-white p-0.5"
                />
              }
              titleBig={false}
              title={`${upiId}-${'  '}${data.platform}`}
              key={data.data.txn_id}
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
                loading={loading[index]}
                onClick={() => {
                  handleViewDetails(upiId || '', index);
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
                      <DialogTitle className="flex items-center justify-between space-x-44 font-bold text-emerald-500">
                        <span className="text-2xl">
                          {
                            selectedData?.selectedItem?.data?.result
                              ?.digital_payment_details?.digital_payment_id
                          }
                        </span>
                        <div className="group flex items-center justify-center space-x-2">
                          <CustomCombox
                            selected={selectedData?.selectedItem?.datetime}
                            onSelect={handleSelect}
                            list={list}
                            isDate={true}
                          />
                          <button
                            onClick={() => handleRefresh(upiId, index)}
                            className="group flex items-center space-x-1 font-medium text-blue-500 transition-opacity duration-300 hover:cursor-pointer hover:opacity-50"
                          >
                            <IconRefresh className="h-5 w-5" />
                            <span className="text-sm">Refresh</span>
                          </button>
                        </div>
                      </DialogTitle>
                      <DialogHeader className="mt-4 space-y-2 rounded-full"></DialogHeader>
                      <div className="relative flex min-h-full flex-col space-y-10 overflow-hidden">
                        <div className="flex flex-col text-lg">
                          <div className="space-x-1 font-semibold">
                            <span className="text-white/70">
                              Account Holder Name :
                            </span>
                            <span>
                              {formatSentence(
                                selectedData?.selectedItem?.data?.result
                                  ?.digital_payment_details
                                  ?.account_holder_name,
                              )}
                            </span>
                          </div>
                          <div className="space-x-1 font-semibold">
                            <span className="text-white/70">
                              Account Number :
                            </span>
                            <span>
                              {
                                selectedData?.selectedItem?.data?.result
                                  ?.account_details?.account_number
                              }
                            </span>
                          </div>
                          <div className="space-x-1 font-semibold">
                            <span className="text-white/70">
                              Account IFSC :
                            </span>
                            <span>
                              {
                                selectedData?.selectedItem?.data?.result
                                  ?.account_details?.account_ifsc
                              }
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between space-x-4">
                          <div className="flex flex-col space-y-2">
                            <div className="space-x-1 font-semibold">
                              <span className="text-white/70">Bank Name :</span>
                              <span>
                                {formatSentence(
                                  selectedData?.UpiDetails?.upiId?.data?.result
                                    ?.bank,
                                )}
                              </span>
                            </div>

                            <div className="space-x-1 font-semibold">
                              <span className="text-white/70">Branch :</span>
                              <span>
                                {formatSentence(
                                  selectedData?.UpiDetails?.upiId?.data?.result
                                    ?.branch,
                                )}
                              </span>
                            </div>
                            <div className="space-x-1 font-semibold">
                              <span className="text-white/70">Address :</span>
                              <span className="">
                                {formatSentence(
                                  selectedData?.UpiDetails?.upiId?.data?.result
                                    ?.address,
                                )}
                              </span>
                            </div>
                            <div className="space-x-1 font-semibold">
                              <span className="text-white/70">State :</span>
                              <span>
                                {formatSentence(
                                  selectedData?.UpiDetails?.upiId?.data?.result
                                    ?.state,
                                )}
                              </span>
                            </div>
                            <div className="space-x-1 font-semibold">
                              <span className="text-white/70">District :</span>
                              <span>
                                {formatSentence(
                                  selectedData?.UpiDetails?.upiId?.data?.result
                                    ?.district,
                                )}
                              </span>
                            </div>
                            <div className="space-x-1 font-semibold">
                              <span className="text-white/70">City :</span>
                              <span>
                                {formatSentence(
                                  selectedData?.UpiDetails?.upiId?.data?.result
                                    ?.city,
                                )}
                              </span>
                            </div>
                            <div className="space-x-1 font-semibold">
                              <span className="text-white/70">Center :</span>
                              <span>
                                {formatSentence(
                                  selectedData?.UpiDetails?.upiId?.data?.result
                                    ?.center,
                                )}
                              </span>
                            </div>
                            <div className="space-x-1 font-semibold">
                              <span className="text-white/70">Contact :</span>
                              <span>
                                {formatSentence(
                                  selectedData?.UpiDetails?.upiId?.data?.result
                                    ?.contact,
                                )}
                              </span>
                            </div>
                          </div>
                          <div className="min-w-60">
                            <div className="space-x-1 font-semibold">
                              <span className="text-white/70">ISCO3166 :</span>
                              <span>"IN-OR"</span>
                            </div>
                            <div className="space-x-1 font-semibold">
                              <span className="text-white/70">MICR :</span>
                              <span>"IN-OR"</span>
                            </div>
                            <div className="space-x-1 font-semibold">
                              <span className="text-white/70">NEFT :</span>
                              <span className="text-yellow-500">True</span>
                            </div>
                            <div className="space-x-1 font-semibold">
                              <span className="text-white/70">IMPS :</span>
                              <span className="text-yellow-500">True</span>
                            </div>
                            <div className="space-x-1 font-semibold">
                              <span className="text-white/70">SWIFT :</span>
                              <span className="text-yellow-500">True</span>
                            </div>
                            <div className="space-x-1 font-semibold">
                              <span className="text-white/70">UPI :</span>
                              <span className="text-yellow-500">True</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </DialogPortal>
                </Dialog>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
}
