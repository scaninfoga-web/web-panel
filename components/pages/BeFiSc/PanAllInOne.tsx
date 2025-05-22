import {
  GstTurnoverType,
  GstVerificationAdvanceType,
  MobileToAccountNumberType,
  PanAllInOneType,
  VerifyUdyamType,
} from '@/types/BeFiSc';
import React from 'react';
import { Loader } from '@/components/ui/loader';
import CustomBeFiScCard, { getValue } from './CustomBeFiScCard';
import { Card } from '@/components/ui/card';
import { StatusBadge } from '../dashboard/components/DashboardCard';
import { Badge } from '@/components/ui/badge';

export default function PanAllInOne({
  PanAllInOneData,
}: {
  PanAllInOneData: PanAllInOneType | null;
}) {
  if (!PanAllInOneData) {
    return <></>;
  }

  const compelteAddress =
    PanAllInOneData?.result?.address?.line_1 +
    PanAllInOneData?.result?.address?.line_2 +
    PanAllInOneData?.result?.address?.city +
    PanAllInOneData?.result?.address?.state +
    PanAllInOneData?.result?.address?.country +
    PanAllInOneData?.result?.address?.zip;

  return (
    <div className="grid grid-cols-1 gap-2 space-y-4">
      <Card className="my-6 border border-gray-700 bg-[#0e1421] p-6 shadow-xl">
        <h1 className="text-2xl font-bold text-emerald-500">Pan Details</h1>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-5">
          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="text-base font-medium">
              {getValue(PanAllInOneData.result?.email)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">FullName</p>
            <p className="text-base font-medium">
              {getValue(PanAllInOneData.result?.full_name)}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Father Name</p>
            <p className="text-base font-medium">
              {getValue(PanAllInOneData.result?.fname)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Address</p>
            <p className="text-base font-medium">{getValue(compelteAddress)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Gender</p>
            <p className="text-base font-medium">
              {getValue(PanAllInOneData.result?.gender)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Category</p>
            <p className="text-base font-medium">
              {getValue(PanAllInOneData.result?.category)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Phone number</p>
            <p className="text-base font-medium">
              {getValue(PanAllInOneData.result?.phone_number)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Aadhaar Linked</p>
            <p className="text-base font-medium">
              {getValue(PanAllInOneData.result?.aadhaar_linked)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Massked Aadhaar</p>
            <p className="text-base font-medium">
              {getValue(PanAllInOneData.result?.masked_aadhaar)}
            </p>
          </div>
        </div>
      </Card>

      {/* light */}
      <div className="grid grid-cols-3 gap-4">
        <CustomBeFiScCard
          data={PanAllInOneData?.result?.address}
          title="Address Details"
        />
        <CustomBeFiScCard
          data={PanAllInOneData?.result?.din_info}
          title="Din Info"
        />
        <CustomBeFiScCard
          data={PanAllInOneData?.result?.is_sole_proprietor}
          title="Is Sole Proprietor"
        />
      </div>
    </div>
  );
}
