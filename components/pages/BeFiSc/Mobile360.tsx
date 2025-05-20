import { Mobile360Type } from '@/types/BeFiSc';
import { DashboardCard } from '../dashboard/components/DashboardCard';
import { LPGInfoTable } from './LPGTable';
import { Card } from '@/components/ui/card';
import { Loader } from '@/components/ui/loader';
import CustomBeFiScCard from './CustomBeFiScCard';

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
  const getValue = (value: string | undefined | null) =>
    value && value.trim().length > 0 ? value : 'No Data';

  const date = new Date(data.datetime?.replace(' ', 'T'));
  const formattedDate = date.toLocaleString('en-IN', options);
  return (
    <div className="grid grid-cols-1 gap-2 space-y-4">
      <div className="flex gap-x-1">
        <span className="text-base text-white/75">Response Data Date:</span>
        <span className="text-base font-semibold text-emerald-500">
          {formattedDate}
        </span>
      </div>
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

      {/* lpgInfo */}
      {data.result?.lpg_info?.data?.length > 0 && (
        <DashboardCard title="LPG Info">
          <LPGInfoTable lpgInfo={data.result?.lpg_info} />
        </DashboardCard>
      )}

      {/* light */}
      <div className="grid grid-cols-3 gap-4">
        <CustomBeFiScCard
          data={data.result?.msme_info?.data}
          title="MSME Info"
        />
        <CustomBeFiScCard
          title="EPFO Info"
          data={data.result?.epfo_info?.data}
        />
        <CustomBeFiScCard
          title="Director Pan Info"
          data={data.result?.director_pan_info?.data}
        />
        <CustomBeFiScCard data={data.result?.din_info?.data} title="Din Info" />
        <CustomBeFiScCard title="GST List" data={data.result?.gst_list?.data} />
        <CustomBeFiScCard
          title="Whatsapp Info"
          data={data.result?.whatsapp_info?.data}
        />
        <CustomBeFiScCard
          title="Revoke Info"
          data={data.result?.revoke_info?.data}
        />
        <CustomBeFiScCard
          title="ESIC Info"
          data={data.result?.esic_info?.data}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* telcoInfo */}
        <CustomBeFiScCard
          data={[data.result?.telco_info?.data]}
          title="Telco Info"
        />
        <CustomBeFiScCard
          data={[data.result?.mobile_age_info?.data]}
          title="Mobile Age Info"
        />
        <CustomBeFiScCard
          data={data.result?.key_highlights}
          title="Key Highlights"
        />
      </div>
    </div>
  );
}
