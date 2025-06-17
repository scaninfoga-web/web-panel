import { PayWorldType } from '@/types/payworld';
import React, { useState } from 'react';
import {
  DashboardCard,
  InfoText,
} from '../../dashboard/components/DashboardCard';
import { IconRefresh } from '@tabler/icons-react';
import { formatSentence } from './APIUtils';
import CustomBadge from './CustomBadge';
import { formatKey, getValue } from './CustomBeFiScCard';
import { CustomTable } from '@/components/ui/custom-table';
import { cn } from '@/lib/utils';
import BeFiScLoadingSkeleton from './BeFiScLoadingSkeleton';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { post } from '@/lib/api';
import NotFound from '@/components/sub/NotFound';

interface PageProps {
  payWorldData: PayWorldType | null;
  mobileNo: string;
}

const ignoreKeys = [
  'provider_name',
  'provider_id',
  'otp_verified',
  'provider_sender_id',
  'sender_id',
  'provider_order',
  'engine_sender_id',
  'Sender details id',
  'paysprint_bene_id',
  'bank_logo',
  'default_otp_verified',
  'new_bene',
  'provider_beneficiary_details',
];

const beneficiaryColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => formatSentence(text) || text,
  },
  {
    title: 'Bank',
    dataIndex: 'bank',
    key: 'bank',
    render: (text: string) => formatSentence(text) || text,
  },
  {
    title: 'Bank',
    dataIndex: 'bank',
    key: 'name',
    render: (text: string) => formatSentence(text) || text,
  },
  {
    title: 'Account Number',
    dataIndex: 'account_number',
    key: 'account_number',
    render: (text: string) => formatSentence(text) || text,
  },
  {
    title: 'IFSC Code',
    dataIndex: 'ifsc_code',
    key: 'ifsc_code',
    render: (text: string) => text,
  },
];

export default function PayWorld({ payWorldData, mobileNo }: PageProps) {
  const [payworldData, setPayworldData] = useState<PayWorldType | null>(
    payWorldData,
  );
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const payworldResponse = await post('/api/secondary/payworld-data', {
        sender_mobile: mobileNo,
        realtimeData: true,
      });
      if (payworldResponse.responseData) {
        setPayworldData(payworldResponse);
        toast.success('Payworld data refreshed');
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error('Payworld' + error.response?.data?.responseStatus?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <BeFiScLoadingSkeleton />
      ) : (
        <>
          {payworldData?.responseData ? (
            <DashboardCard title="PayWorld Details">
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
                <button
                  onClick={handleClick}
                  className="group absolute right-0 top-0 flex items-center space-x-1 font-medium text-blue-500 transition-opacity duration-300 hover:cursor-pointer hover:opacity-50"
                >
                  <IconRefresh className="h-5 w-5" />
                  <span className="text-sm">Refresh</span>
                </button>
                <div>
                  <p className="text-sm text-gray-400">Name</p>
                  <p className="text-base font-medium">
                    {formatSentence(payworldData?.responseData?.name)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Gender</p>
                  <p className="text-base font-medium">
                    {formatSentence(payworldData?.responseData?.gender)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">DOB</p>
                  <p className="text-base font-medium">
                    {formatSentence(payworldData?.responseData?.dob)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Junk Name</p>
                  <p className="text-base font-medium">
                    {getValue(payworldData?.responseData?.is_junk_name)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Pan Number</p>
                  <p className="text-base font-medium">
                    {formatSentence(payworldData?.responseData?.pan_number)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Proof Name</p>
                  <p className="text-base font-medium">
                    {formatSentence(payworldData?.responseData?.proof_name)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Proof Number</p>
                  <p className="text-base font-medium">
                    {formatSentence(payworldData?.responseData?.proof_number)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Add-bene By MPIN</p>
                  <p className="text-base font-medium text-yellow-500">
                    {formatSentence(
                      payworldData?.responseData?.add_bene_by_mpin,
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Monthly Limit</p>
                  <p className="text-base font-medium text-yellow-500">
                    {formatSentence(
                      payworldData?.responseData?.total_monthly_limit,
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Consumed Limit</p>
                  <p className="text-base font-medium text-yellow-500">
                    {formatSentence(
                      payworldData?.responseData?.total_consumed_limit,
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Available Limit</p>
                  <p className="text-base font-medium text-red-500">
                    {formatSentence(
                      payworldData?.responseData?.total_available_limit,
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">
                    Total Active Beneficiary
                  </p>
                  <p className="text-base font-medium text-yellow-500">
                    {formatSentence(
                      payworldData?.responseData?.total_active_beneficiary,
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">
                    Total Inactive Beneficiary
                  </p>
                  <p className="text-base font-medium text-yellow-500">
                    {formatSentence(
                      payworldData?.responseData?.total_inactive_beneficiary,
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">
                    Total Deleted Beneficiary
                  </p>
                  <p className="text-base font-medium text-yellow-500">
                    {formatSentence(
                      payworldData?.responseData?.total_deleted_beneficiary,
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">KYC Status</p>
                  <p className="text-base font-medium">
                    <CustomBadge
                      value={payworldData?.responseData?.kyc_status}
                    />
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Pan Status</p>
                  <p className="text-base font-medium">
                    <CustomBadge
                      value={payworldData?.responseData?.pan_status}
                    />
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Image Status</p>
                  <p className="text-base font-medium">
                    <CustomBadge
                      value={payworldData?.responseData?.img_status}
                    />
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Address</p>
                  <p className="text-base font-medium">
                    {formatSentence(
                      `${payworldData?.responseData?.address || '-'} ${payworldData?.responseData?.state || '-'} ${payworldData?.responseData?.pincode || '-'}`,
                    )}
                  </p>
                </div>
              </div>
            </DashboardCard>
          ) : (
            <NotFound value={'No Payworld Details'} />
          )}

          {payworldData?.responseData?.beneficiary_details &&
            payworldData?.responseData?.beneficiary_details?.length > 0 && (
              <DashboardCard title="Beneficiary Details">
                <CustomTable
                  // @ts-ignore
                  columns={beneficiaryColumns}
                  dataSource={payworldData?.responseData?.beneficiary_details}
                />
              </DashboardCard>
            )}
        </>
      )}
      {/* payWorld Data*/}
    </>
  );
}
