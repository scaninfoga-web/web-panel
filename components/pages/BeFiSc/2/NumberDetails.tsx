import React from 'react';
import ArrayCard from './ArrayCard';
import CustomBadge from './CustomBadge';
import { Mobile360Type } from '@/types/BeFiSc';
import { Badge } from '@/components/ui/badge';
import { IconBrandWhatsapp, IconLocation } from '@tabler/icons-react';
import { formatSentence } from './getValue';

export default function NumberDetails({
  mobile360Data,
}: {
  mobile360Data: Mobile360Type | null;
}) {
  return (
    <ArrayCard
      title="Number Details"
      description=""
      Component={
        <div>
          <div className="flex justify-between">
            <p className="text-sm font-semibold text-slate-400">Type</p>
            <CustomBadge
              value={mobile360Data?.result?.telco_info?.data?.msisdn?.type}
            />
          </div>
          <div className="flex justify-between">
            <p className="text-sm font-semibold text-slate-400">isRoaming</p>
            <CustomBadge
              value={mobile360Data?.result?.telco_info?.data?.is_roaming}
            />
          </div>
          <div className="flex justify-between">
            <p className="text-sm font-semibold text-slate-400">
              Connection Type
            </p>
            <CustomBadge
              value={mobile360Data?.result?.telco_info?.data?.connection_type}
            />
          </div>
          <div className="flex justify-between">
            <p className="text-sm font-semibold text-slate-400">
              Connection Status
            </p>
            <CustomBadge
              value={
                mobile360Data?.result?.telco_info?.data?.connection_status
                  ?.status_code
              }
            />
          </div>
          <div className="flex justify-between">
            <p className="text-sm font-semibold text-slate-400">
              Subscriber Status
            </p>
            <CustomBadge
              value={mobile360Data?.result?.telco_info?.data?.subscriber_status}
            />
          </div>
          <div className="flex justify-between">
            <p className="text-sm font-semibold text-slate-400">
              Current Network Provider
            </p>

            <Badge className="mt-1 gap-x-0.5">
              {formatSentence(
                mobile360Data?.result?.telco_info?.data
                  ?.current_service_provider?.network_name,
              )}
            </Badge>
          </div>

          <div className="flex justify-between">
            <p className="text-sm font-semibold text-slate-400">
              Current Network Region
            </p>

            <Badge className="mt-1 gap-x-0.5">
              <IconLocation className="size-4" />
              {formatSentence(
                mobile360Data?.result?.telco_info?.data
                  ?.current_service_provider?.network_region,
              )}
            </Badge>
          </div>
          <div className="flex justify-between">
            <p className="text-sm font-semibold text-slate-400">
              Original Network Provider
            </p>

            <Badge className="mt-1 gap-x-0.5">
              {formatSentence(
                mobile360Data?.result?.telco_info?.data
                  ?.original_service_provider?.network_name,
              )}
            </Badge>
          </div>

          <div className="flex justify-between">
            <p className="text-sm font-semibold text-slate-400">Mobile Age</p>

            <Badge className="mt-1 gap-x-0.5">
              {formatSentence(
                mobile360Data?.result?.mobile_age_info?.data?.mobile_age,
              )}
            </Badge>
          </div>

          <div className="flex justify-between">
            <p className="text-sm font-semibold text-slate-400">
              Original Network Region
            </p>

            <Badge className="mt-1 gap-x-0.5">
              <IconLocation className="size-4" />
              {formatSentence(
                mobile360Data?.result?.telco_info?.data
                  ?.original_service_provider?.network_region,
              )}
            </Badge>
          </div>

          <div className="flex justify-between">
            <p className="text-sm font-semibold text-slate-400">
              Whatsapp Account
            </p>
            <Badge
              className="mt-1 gap-x-0.5"
              variant={
                mobile360Data?.result?.whatsapp_info.data.status ===
                'Account Found'
                  ? 'default'
                  : 'danger'
              }
            >
              <IconBrandWhatsapp className="size-4" />
              {mobile360Data?.result?.whatsapp_info.data.status ===
              'Account Found'
                ? 'Active'
                : 'Inactive'}
            </Badge>
          </div>
        </div>
      }
    />
  );
}
