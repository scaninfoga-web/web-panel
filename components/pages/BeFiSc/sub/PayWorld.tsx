import { PayWorldType } from '@/types/payworld';
import React, { useState } from 'react';
import { DashboardCard } from '../../dashboard/components/DashboardCard';
import { IconRefresh } from '@tabler/icons-react';
import { formatSentence } from './APIUtils';
import CustomBadge from './CustomBadge';
import { getValue } from './CustomBeFiScCard';
import { CustomTable } from '@/components/ui/custom-table';
import BeFiScLoadingSkeleton from './BeFiScLoadingSkeleton';
import axios from 'axios';
import { toast } from 'sonner';
import NotFound from '@/components/sub/NotFound';
import { formatDateTime } from './dateFormat';
import { CustomCombox } from '@/components/sub/CustomComBox';
import Image from 'next/image';
import { post } from '@/lib/api';
import isEqual from 'lodash.isequal';

interface PageProps {
  PayWorldData: PayWorldType | null;
  mobileNo: string;
}

const bankIcons = new Map<string, string>([
  ['FinoPay', '/upi/FinoPay.png'],
  ['Axis Bank', '/upi/AxisBank.png'],
  ['State Bank Of India', '/upi/StateBankofIndia.png'],
  ['Airtel Payments Bank', '/upi/airtelpayments.png'],
  ['HDFC Bank', '/upi/HDFCBank.png'],
  ['IDFC FIRST Bank', '/upi/IDFCFIRSTBank.jpeg'],
  ['Jana Bank', '/upi/JanaBank.png'],
  ['Bajaj Finserv', '/upi/BajajFinserv.jpeg'],
  ['Bank of Baroda', '/upi/BankofBaroda.png'],
  ['Bandhan Bank Limited', '/upi/BandhanBankLimited.png'],
  ['Indian Overseas Bank', '/upi/IndianOverseasBank.png'],
  ['Icici Bank Limited', '/upi/ICICI_Bank_.jpeg'],
  ['Indusind Bank', '/upi/IndusInd_Bank_.png'],
  ['Kotak Mahindra Bank Limited', '/upi/KotakMahindraBankLimited.png'],
]);

const beneficiaryColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => formatSentence(text),
  },
  {
    title: 'Bank',
    dataIndex: 'bank',
    key: 'bank',
    render: (text: string) => (
      <span className="flex items-center space-x-2">
        <Image
          src={bankIcons.get(formatSentence(text)) || '/null.png'}
          alt="bank"
          width={35}
          height={35}
          className="rounded-full"
        />
        <span>{formatSentence(text)}</span>
      </span>
    ),
  },
  {
    title: 'Transfer Type',
    dataIndex: 'default_transfer_type',
    key: 'default_transfer_type',
    render: (text: string) => (
      <CustomBadge value={text?.[0]?.toUpperCase()} isFormat={false} />
    ),
  },
  {
    title: 'Account Number',
    dataIndex: 'account_number',
    key: 'account_number',
    render: (text: string) => <span className="text-yellow-500">{text}</span>,
  },
  {
    title: 'IFSC Code',
    dataIndex: 'ifsc_code',
    key: 'ifsc_code',
    render: (text: string) => text,
  },
];

export default function PayWorld({ PayWorldData, mobileNo }: PageProps) {
  const [payWorldData, setPayworldData] = useState<PayWorldType | null>(
    PayWorldData,
  );

  const newestItem = Array.isArray(payWorldData?.responseData)
    ? payWorldData.responseData[payWorldData.responseData.length - 1]
    : undefined;

  const [selectedItem, setSelectedItem] = useState(
    Array.isArray(payWorldData?.responseData)
      ? payWorldData.responseData[payWorldData.responseData.length - 1]
      : undefined,
  );
  const [loading, setLoading] = useState(false);
  const list =
    payWorldData?.responseData?.map((item) => {
      return {
        label: formatDateTime(item?.datetime),
        value: item?.datetime,
      };
    }) || [];

  const handleClick = async () => {
    try {
      setLoading(true);
      const payworldResponse = await post('/api/secondary/payworld-data', {
        sender_mobile: mobileNo,
        realtimeData: true,
      });
      if (payworldResponse?.responseData) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const payworldResponse = await post(
          '/api/secondary/payworld-all-data',
          {
            sender_mobile: mobileNo,
          },
        );
        if (payworldResponse?.responseData?.length > 0) {
          setPayworldData(payworldResponse);
        }
        const isNewFound = isEqual(
          payworldResponse?.responseData,
          payWorldData?.responseData,
        );
        const toastID = toast.success(`Payworld data refreshed`);
        if (isNewFound) {
          toast.warning('New Records found', { id: toastID });
        } else {
          toast.warning('No New Records found', { id: toastID });
        }
      }
    } catch (error) {
      toast.error('Payworld Down');
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (date: string) => {
    const data = payWorldData?.responseData?.find(
      (item) => item?.datetime === date,
    );
    const dataBeneficiary = data?.data?.beneficiary_details?.length;
    const newestBeneficiary = newestItem?.data?.beneficiary_details?.length;
    if (data) {
      setSelectedItem(data);
      if (
        data?.data?.total_monthly_limit !==
        newestItem?.data?.total_monthly_limit
      ) {
        toast.info('Money Limit is changed');
      }
      if (
        data?.data?.total_available_limit !==
        newestItem?.data?.total_available_limit
      ) {
        toast.info('Available Limit is changed');
      }
      if (
        data?.data?.total_consumed_limit !==
        newestItem?.data?.total_consumed_limit
      ) {
        toast.info('Consumed Limit is changed');
      }
      if (
        newestBeneficiary &&
        dataBeneficiary &&
        newestBeneficiary < dataBeneficiary
      ) {
        toast.info('Beneficiary details is got deleted');
      }
      if (
        newestBeneficiary &&
        dataBeneficiary &&
        newestBeneficiary > dataBeneficiary
      ) {
        toast.info('New Transaction happened');
      }
    }
  };

  return (
    <>
      {loading ? (
        <BeFiScLoadingSkeleton />
      ) : (
        <>
          {payWorldData?.responseData ? (
            <DashboardCard title="PayWorld Details">
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
                <div className="absolute right-0 top-0 flex items-center justify-center space-x-2">
                  <CustomCombox
                    selected={selectedItem?.datetime}
                    onSelect={handleSelect}
                    list={list}
                  />
                  <button
                    onClick={handleClick}
                    className="group flex items-center space-x-1 font-medium text-blue-500 transition-opacity duration-300 hover:cursor-pointer hover:opacity-50"
                  >
                    <IconRefresh className="h-5 w-5" />
                    <span className="text-sm">Refresh</span>
                  </button>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Name</p>
                  <p className="text-base font-medium">
                    {formatSentence(selectedItem?.data?.name)}
                    {checkNew(
                      selectedItem?.data?.name,
                      newestItem?.data?.name,
                    ) && <NewBadge />}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Gender</p>
                  <p className="text-base font-medium">
                    {formatSentence(selectedItem?.data?.gender)}
                    {checkNew(
                      selectedItem?.data?.gender,
                      newestItem?.data?.gender,
                    ) && <NewBadge />}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">DOB</p>
                  <p className="text-base font-medium">
                    {formatSentence(selectedItem?.data?.dob)}
                    {checkNew(
                      selectedItem?.data?.dob,
                      newestItem?.data?.dob,
                    ) && <NewBadge />}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Junk Name</p>
                  <p className="text-base font-medium">
                    {getValue(selectedItem?.data?.is_junk_name)}
                    {checkNew(
                      selectedItem?.data?.is_junk_name,
                      newestItem?.data?.is_junk_name,
                    ) && <NewBadge />}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Pan Number</p>
                  <p className="text-base font-medium">
                    {formatSentence(selectedItem?.data?.pan_number)}
                    {checkNew(
                      selectedItem?.data?.pan_number,
                      newestItem?.data?.pan_number,
                    ) && <NewBadge />}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Proof Name</p>
                  <p className="text-base font-medium">
                    {formatSentence(selectedItem?.data?.proof_name)}
                    {checkNew(
                      selectedItem?.data?.proof_name,
                      newestItem?.data?.proof_name,
                    ) && <NewBadge />}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Proof Number</p>
                  <p className="text-base font-medium">
                    {formatSentence(selectedItem?.data?.proof_number)}
                    {checkNew(
                      selectedItem?.data?.proof_number,
                      newestItem?.data?.proof_number,
                    ) && <NewBadge />}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Add-bene By MPIN</p>
                  <p className="text-base font-medium text-yellow-500">
                    {formatSentence(selectedItem?.data?.add_bene_by_mpin)}
                    {checkNew(
                      selectedItem?.data?.add_bene_by_mpin,
                      newestItem?.data?.add_bene_by_mpin,
                    ) && <NewBadge />}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Monthly Limit</p>
                  <p className="text-base font-medium text-yellow-500">
                    {formatSentence(selectedItem?.data?.total_monthly_limit)}
                    {checkNew(
                      selectedItem?.data?.total_monthly_limit,
                      newestItem?.data?.total_monthly_limit,
                    ) && <NewBadge />}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Consumed Limit</p>
                  <p className="text-base font-medium text-yellow-500">
                    {formatSentence(selectedItem?.data?.total_consumed_limit)}
                    {checkNew(
                      selectedItem?.data?.total_consumed_limit,
                      newestItem?.data?.total_consumed_limit,
                    ) && <NewBadge />}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Available Limit</p>
                  <p className="text-base font-medium text-red-500">
                    {formatSentence(selectedItem?.data?.total_available_limit)}
                    {checkNew(
                      selectedItem?.data?.total_available_limit,
                      newestItem?.data?.total_available_limit,
                    ) && <NewBadge />}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">
                    Total Active Beneficiary
                  </p>
                  <p className="text-base font-medium text-yellow-500">
                    {formatSentence(
                      selectedItem?.data?.total_active_beneficiary,
                    )}
                    {checkNew(
                      selectedItem?.data?.total_active_beneficiary,
                      newestItem?.data?.total_active_beneficiary,
                    ) && <NewBadge />}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Total Inactive Beneficiary
                  </p>
                  <p className="text-base font-medium text-yellow-500">
                    {formatSentence(
                      selectedItem?.data?.total_inactive_beneficiary,
                    )}
                    {checkNew(
                      selectedItem?.data?.total_inactive_beneficiary,
                      newestItem?.data?.total_inactive_beneficiary,
                    ) && <NewBadge />}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">
                    Total Deleted Beneficiary
                  </p>
                  <p className="text-base font-medium text-yellow-500">
                    {formatSentence(
                      selectedItem?.data?.total_deleted_beneficiary,
                    )}
                    {checkNew(
                      selectedItem?.data?.total_deleted_beneficiary,
                      newestItem?.data?.total_deleted_beneficiary,
                    ) && <NewBadge />}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">KYC Status</p>
                  <p className="text-base font-medium">
                    <CustomBadge value={selectedItem?.data?.kyc_status} />
                    {checkNew(
                      selectedItem?.data?.kyc_status,
                      newestItem?.data?.kyc_status,
                    ) && <NewBadge />}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Pan Status</p>
                  <p className="text-base font-medium">
                    <CustomBadge value={selectedItem?.data?.pan_status} />
                    {checkNew(
                      selectedItem?.data?.pan_status,
                      newestItem?.data?.pan_status,
                    ) && <NewBadge />}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Image Status</p>
                  <p className="text-base font-medium">
                    <CustomBadge value={selectedItem?.data?.img_status} />
                    {checkNew(
                      selectedItem?.data?.img_status,
                      newestItem?.data?.img_status,
                    ) && <NewBadge />}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Address</p>
                  <p className="text-base font-medium">
                    {formatSentence(
                      `${selectedItem?.data?.address || '-'} ${selectedItem?.data?.state || '-'} ${selectedItem?.data?.pincode || '-'}`,
                    )}
                    {checkNew(
                      `${selectedItem?.data?.address || '-'} ${selectedItem?.data?.state || '-'} ${selectedItem?.data?.pincode || '-'}`,
                      `${newestItem?.data?.address || '-'} ${newestItem?.data?.state || '-'} ${newestItem?.data?.pincode || '-'}`,
                    ) && <NewBadge />}
                  </p>
                </div>
              </div>
            </DashboardCard>
          ) : (
            <NotFound value={'No Payworld Details'} />
          )}

          {selectedItem?.data?.beneficiary_details &&
            selectedItem?.data?.beneficiary_details?.length > 0 && (
              <DashboardCard
                title={`Beneficiary Details : ${selectedItem?.data?.beneficiary_details?.length}`}
              >
                <CustomTable
                  // @ts-ignore
                  columns={beneficiaryColumns}
                  dataSource={selectedItem?.data?.beneficiary_details}
                />
              </DashboardCard>
            )}
        </>
      )}
      {/* payWorld Data*/}
    </>
  );
}

function checkNew(newValue: any, oldValue: any) {
  return newValue !== oldValue;
}

function NewBadge() {
  return (
    <sup className="ml-0.5 rounded-full border border-emerald-500 px-1.5 py-0.5 text-xs text-emerald-100">
      New
    </sup>
  );
}
