import { Mobile360Type } from '@/types/BeFiSc';
import { DashboardCard, InfoText } from '../dashboard/components/DashboardCard';
import { LPGInfoTable } from './LPGTable';
import { Card } from '@/components/ui/card';
import { Loader } from '@/components/ui/loader';
import CustomBeFiScCard, { getValue } from './CustomBeFiScCard';
import React from 'react';
import CustomBadge from './CustomBadge';
import { Badge } from '@/components/ui/badge';
import { IconBrandWhatsapp, IconLocation } from '@tabler/icons-react';
import ArrayCard from './ArrayCard';
import { formatSentence } from './APIUtils';

interface PageProps {
  data: Mobile360Type | null;
}

export default function Mobile360({ data }: PageProps) {
  if (!data) {
    return <></>;
  }
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  const date = new Date(data.datetime?.replace(' ', 'T'));
  const formattedDate = date.toLocaleString('en-IN', options);
  return (
    <div className="grid grid-cols-1 gap-2 space-y-4">
      {/* digitalPaymentIdInfo */}
      <Card className="my-6 border border-gray-700 bg-[#0e1421] p-6 shadow-xl">
        <h1 className="text-2xl font-bold text-emerald-500">Banking Info</h1>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-5">
          <div>
            <p className="text-sm text-gray-400">Name</p>
            <p className="text-base font-medium">
              {getValue(data.result?.digital_payment_id_info?.data?.name)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Bank</p>
            <p className="text-base font-medium">
              {getValue(data.result?.digital_payment_id_info?.data?.bank)}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Branch Address</p>
            <p className="text-sm font-medium">
              {getValue(data.result?.digital_payment_id_info?.data?.address) +
                ', ' +
                getValue(data.result?.digital_payment_id_info?.data?.district) +
                ', ' +
                getValue(data.result?.digital_payment_id_info?.data?.city)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Branch Contact</p>
            <p className="text-base font-medium">
              {getValue(data.result?.digital_payment_id_info?.data?.contact)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">State</p>
            <p className="text-base font-medium">
              {getValue(data.result?.digital_payment_id_info?.data?.state)}
            </p>
          </div>
        </div>
      </Card>
      <NumberDetails mobile360Data={data} />

      {/* lpgInfo */}
      {data.result?.lpg_info?.data?.length > 0 && (
        <DashboardCard title="LPG Info">
          <LPGInfoTable lpgInfo={data.result?.lpg_info} />
        </DashboardCard>
      )}

      <div className="grid grid-cols-2 gap-4">
        {/* din */}
        <DashboardCard
          title="Din Info"
          className="scrollbar-custom max-h-[400px] overflow-auto"
        >
          {data.result?.din_info?.data.map((val, index) => (
            <InfoText
              label={`${val?.data?.name}`}
              value={getValue(val.pan)}
              key={index}
            />
          ))}
        </DashboardCard>
        <DashboardCard
          title="Udyam Numbers"
          className="scrollbar-custom max-h-[400px] overflow-auto"
        >
          {data.result?.msme_info?.data.map((val, index) => (
            <InfoText
              label={`${val?.udyam_number}`}
              value={
                val?.enterprise_name?.length > 38
                  ? val?.enterprise_name?.slice(0, 38) + '...'
                  : val?.enterprise_name
              }
              key={index}
            />
          ))}
        </DashboardCard>
      </div>

      <div className="grid grid-cols-5 gap-2">
        <DashboardCard
          title="GST List"
          className="scrollbar-custom grid max-h-[400px] grid-cols-3 overflow-auto"
        >
          {data.result?.gst_list?.data.map((val, index) => (
            <div key={index}>{val}</div>
          ))}
        </DashboardCard>
        <DashboardCard
          title="IEC List"
          className="scrollbar-custom grid max-h-[400px] grid-cols-3 overflow-auto"
        >
          {data.result?.iec_list?.data.map((val, index) => (
            <div key={index}>{val}</div>
          ))}
        </DashboardCard>
        <DashboardCard
          title="EPFO Info"
          className="scrollbar-custom grid max-h-[400px] grid-cols-3 overflow-auto"
        >
          {data.result?.epfo_info?.data.map((val, index) => (
            <div key={index}>{val}</div>
          ))}
        </DashboardCard>
        <DashboardCard
          title="ESIC Info"
          className="scrollbar-custom grid max-h-[400px] grid-cols-3 overflow-auto"
        >
          {data.result?.epfo_info?.data.map((val, index) => (
            <div key={index}>{val}</div>
          ))}
        </DashboardCard>
        <DashboardCard
          title="Director Pan Info"
          className="scrollbar-custom grid max-h-[400px] grid-cols-3 overflow-auto"
        >
          {data.result?.director_pan_info?.data.map((val, index) => (
            <div key={index}>{val}</div>
          ))}
        </DashboardCard>
      </div>
    </div>
  );
}

function NumberDetails({
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
