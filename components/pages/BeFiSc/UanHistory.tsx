import { UanHistoryType } from '@/types/BeFiSc';
import React from 'react';
import { DashboardCard, InfoText } from '../dashboard/components/DashboardCard';
import { Loader } from '@/components/ui/loader';
interface PageProps {
  data: UanHistoryType | null;
}
export default function UanHistory({ data }: PageProps) {
  if (!data) {
    return (
      <div className="mt-8">
        <Loader />
      </div>
    );
  }
  return (
    <div>
      <DashboardCard title="UAN History" className="flex flex-col gap-y-2 pt-1">
        <div className="flex flex-col">
          <InfoText label="Name" value={data.result.name} />
          <InfoText label="isBusiness" value={data.result.dob} />
        </div>
      </DashboardCard>
      <DashboardCard
        title="Employment History"
        className="flex flex-col gap-y-2 pt-1"
      >
        <div className="flex flex-col gap-2">
          {data.result.employmentHistory.map((val, index) => (
            <div key={index} className="flex flex-col">
              <InfoText label="Company Name" value={val.companyName} />
              <InfoText label="Company Address" value={val.companyAddress} />
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  );
}
