import { MobileToDLAdvanceType } from '@/types/BeFiSc';
import React from 'react';
import { DashboardCard } from '../../dashboard/components/DashboardCard';
import {
  formatDateTime,
  formatSentence,
} from '@/components/custom/functions/formatUtils';
import InfoText2 from '@/components/custom/components/InfoText2';
import { getValue } from './CustomBeFiScCard';
import { Separator } from '@/components/ui/separator';
import CustomBadge from './CustomBadge';

export default function M2DL({
  mobileToDLAdvance,
}: {
  mobileToDLAdvance: MobileToDLAdvanceType | null;
}) {
  return (
    <div>
      {mobileToDLAdvance?.responseData?.map((item, index) => (
        <DashboardCard
          key={`${item?.datetime}--${index}`}
          title={`Driving Licence-${formatDateTime(item?.datetime)}`}
          className="scrollbar-custom overflow-auto"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InfoText2
                value={formatSentence(item?.data?.result?.user_full_name)}
                label="Full Name"
              />
              <InfoText2
                value={formatSentence(item?.data?.result?.user_blood_group)}
                label="Blood Group"
              />
              <InfoText2
                value={formatSentence(item?.data?.result?.father_or_husband)}
                label="Father or Husband"
              />
              <InfoText2
                value={getValue(item?.data?.result?.dl_number)}
                label="DL Number"
              />
              <InfoText2
                value={getValue(item?.data?.result?.endorse_date)}
                label="Endorsement Date"
              />
              <InfoText2
                value={getValue(item?.data?.result?.endorse_number)}
                label="Endorsement Number"
              />
              <InfoText2
                value={getValue(item?.data?.result?.issued_date)}
                label="Issued Date"
              />
              <InfoText2
                value={getValue(item?.data?.result?.expiry_date)}
                label="Expiry Date"
              />
              <InfoText2
                value={`${getValue(item?.data?.result?.transport_validity?.from)} - ${getValue(item?.data?.result?.transport_validity?.to)}`}
                label="Transport Validity"
              />
              <InfoText2
                value={`${getValue(item?.data?.result?.non_transport_validity?.from)} - ${getValue(item?.data?.result?.non_transport_validity?.to)}`}
                label="Non Transport Validity"
              />
            </div>
            <Separator className="bg-slate-800" />
            <div className="grid grid-cols-1 gap-4">
              {item?.data?.result?.vehicle_category_details?.map(
                (item, index) => (
                  <div
                    key={`${item?.cov}--${index}`}
                    className="grid grid-cols-3 gap-4"
                  >
                    <div>
                      <p className="text-xs text-slate-400">COV</p>
                      <CustomBadge value={item?.cov} />
                    </div>
                    <InfoText2
                      value={getValue(item?.issueDate)}
                      label="Issue Date"
                    />
                    <InfoText2
                      value={getValue(item?.expiryDate)}
                      label="Expiry Date"
                    />
                  </div>
                ),
              )}
            </div>
            <Separator className="bg-slate-800" />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {item?.data?.result?.user_address?.map((item, index) => (
                <div
                  key={`${item?.completeAddress}--${index}`}
                  className="grid grid-cols-1 gap-4"
                >
                  <div>
                    <p className="text-xs text-slate-400">Type</p>
                    <CustomBadge value={item?.type} />
                  </div>
                  <InfoText2
                    value={formatSentence(item?.completeAddress)}
                    label="Address"
                  />
                </div>
              ))}
            </div>
            <Separator className="bg-slate-800" />
            <div>
              <p className="text-xs text-slate-400">Status</p>
              <CustomBadge value={item?.data?.result?.status} />
            </div>
          </div>
        </DashboardCard>
      ))}
    </div>
  );
}
