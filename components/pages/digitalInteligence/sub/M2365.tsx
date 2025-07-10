import {
  formatKey,
  formatSentence,
} from '@/components/custom/functions/formatUtils';
import NotFound from '@/components/sub/NotFound';
import { Mobile360Type } from '@/types/BeFiSc';
import React from 'react';
import { DashboardCard } from '../../dashboard/components/DashboardCard';
import { getValue } from '../../BeFiSc/sub/CustomBeFiScCard';

interface PageProps {
  data: Mobile360Type | null;
}

const M2365: React.FC<PageProps> = ({ data }) => {
  return (
    <div className="max-h-[65vh] overflow-auto">
      {data?.result ? (
        <div className="p-2">
          <DashboardCard title="Digital Payment Info">
            <div className="mt-4 grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div>
                  <p className="text-sm text-gray-400">Name</p>
                  <p className="text-base font-medium">
                    {formatSentence(
                      data?.result?.digital_payment_id_info?.data?.name,
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Bank</p>
                  <p className="text-base font-medium">
                    {formatSentence(
                      data?.result?.digital_payment_id_info?.data?.bank,
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Branch</p>
                  <p className="text-base font-medium text-yellow-500">
                    {formatSentence(
                      data?.result?.digital_payment_id_info?.data?.branch,
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Branch Contact</p>
                  <p className="text-base font-medium">
                    {getValue(
                      data?.result?.digital_payment_id_info?.data?.contact,
                    )}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400">Branch Address</p>
                <p className="break-words text-base font-medium opacity-80">
                  {formatSentence(
                    data?.result?.digital_payment_id_info?.data?.address,
                  )}
                </p>
              </div>
            </div>
          </DashboardCard>
        </div>
      ) : (
        <NotFound value="UAN, ESIC Not Found" />
      )}
    </div>
  );
};

export default M2365;
