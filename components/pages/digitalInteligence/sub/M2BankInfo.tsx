import NotFound from '@/components/sub/NotFound';
import React from 'react';
import { formatSentence } from '@/components/custom/functions/formatUtils';
import { DashboardCard } from '../../dashboard/components/DashboardCard';
import { MobileToAccountNumberType } from '@/types/BeFiSc';
import { getValue } from '../../BeFiSc/sub/CustomBeFiScCard';

interface PageProps {
  data: MobileToAccountNumberType | null;
}

const M2BankInfo: React.FC<PageProps> = ({ data }) => {
  return (
    <div className="max-h-[65vh] overflow-auto">
      {Object.keys(data?.result?.account_details || {}).length > 0 ? (
        <div className="p-2">
          <DashboardCard title={``}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">Account Holder Name</p>
                <p className="text-base font-medium">
                  {formatSentence(
                    data?.result?.vpa_details?.account_holder_name,
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">VPA</p>
                <p className="text-base font-medium">
                  {getValue(data?.result?.vpa_details?.vpa?.toLowerCase())}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Account IFSC</p>
                <p className="text-base font-medium text-blue-500">
                  {getValue(data?.result?.account_details?.account_ifsc)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Account Number</p>
                <p className="text-base font-medium text-blue-500">
                  {formatSentence(
                    data?.result?.account_details?.account_number,
                  )}
                </p>
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
