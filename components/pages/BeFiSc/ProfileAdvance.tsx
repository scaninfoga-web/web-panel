import {
  GstVerificationAdvanceType,
  ProfileAdvanceType,
  VerifyUdyamType,
} from '@/types/BeFiSc';
import React from 'react';
import { Loader } from '@/components/ui/loader';
import CustomBeFiScCard from './CustomBeFiScCard';
import { Card } from '@/components/ui/card';

export default function ProfileAdvance({
  ProfileAdvanceData,
}: {
  ProfileAdvanceData: ProfileAdvanceType | null;
}) {
  if (!ProfileAdvanceData) {
    return <></>;
  }
  return (
    <div className="grid grid-cols-1 gap-2 space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <CustomBeFiScCard
          title="Profile Address"
          data={ProfileAdvanceData?.result?.address}
        />
        <CustomBeFiScCard
          title="Document data"
          data={ProfileAdvanceData?.result?.document_data?.pan}
        />
      </div>
    </div>
  );
}
