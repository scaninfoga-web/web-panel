import {
  GstTurnoverType,
  GstVerificationAdvanceType,
  MobileToAccountNumberType,
  VerifyUdyamType,
} from '@/types/BeFiSc';
import React from 'react';
import { Loader } from '@/components/ui/loader';
import CustomBeFiScCard, { getValue } from './CustomBeFiScCard';
import { Card } from '@/components/ui/card';

export default function MobileToAccountNumber({
  MobileToAccountNumberData,
}: {
  MobileToAccountNumberData: MobileToAccountNumberType | null;
}) {
  if (!MobileToAccountNumberData) {
    return <></>;
  }

  return (
    <div className="grid grid-cols-1 gap-2 space-y-4">
      <Card className="my-6 border border-gray-700 bg-[#0e1421] p-6 shadow-xl">
        <h1 className="text-2xl font-bold text-emerald-500">Account Advance</h1>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div>
            <p className="text-sm text-gray-400">Holder Name</p>
            <p className="text-base font-medium">
              {getValue(
                MobileToAccountNumberData?.result?.vpa_details
                  ?.account_holder_name,
              )}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">VPA</p>
            <p className="text-base font-medium">
              {getValue(MobileToAccountNumberData?.result?.vpa_details?.vpa)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Account Number</p>
            <p className="text-base font-medium">
              {getValue(
                MobileToAccountNumberData?.result?.account_details
                  ?.account_number,
              )}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Account IFSC</p>
            <p className="text-base font-medium">
              {getValue(
                MobileToAccountNumberData?.result?.account_details
                  ?.account_ifsc,
              )}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
