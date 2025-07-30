import { TrucallerVerifyType } from '@/types/trucaller';
import React from 'react';
import { DashboardCard } from '../../dashboard/components/DashboardCard';
import {
  formatDateTime,
  formatSentence,
} from '@/components/custom/functions/formatUtils';
import InfoText2 from '@/components/custom/components/InfoText2';

interface Props {
  data: {
    trucallerVerifyData: TrucallerVerifyType | null | undefined;
  };
}

export default function TrucallerVerifyInfo({ data }: Props) {
  const { trucallerVerifyData } = data;
  if ((trucallerVerifyData?.responseData?.data || []).length === 0) {
    return null;
  }
  const latestData = trucallerVerifyData?.responseData?.data?.at(-1);
  const [timestamp, entries] = Object.entries(latestData || {})[0];
  const last_entry = entries?.at(-1);

  return (
    <DashboardCard title={`Trucaller-${last_entry?.number}`}>
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <InfoText2 label="Name" value={formatSentence(last_entry?.name)} />
          <InfoText2
            label="Spam Counter"
            value={formatSentence(last_entry?.spamCounter)}
          />
          <InfoText2 label="Timestamp" value={formatDateTime(timestamp)} />
        </div>
        <div className="grid grid-cols-1 gap-2">
          <span className="text-sm text-gray-400">Saved Names</span>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {last_entry?.names?.map((name, index) => (
              <span
                className="break-words rounded-2xl border border-slate-800 p-2 text-center"
                key={`${name?.name}-${index}`}
              >
                {name?.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </DashboardCard>
  );
}
