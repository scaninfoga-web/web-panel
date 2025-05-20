import { VerifyUdyamType } from '@/types/BeFiSc';
import React from 'react';
import { Loader } from '@/components/ui/loader';
import CustomBeFiScCard from './CustomBeFiScCard';
import { Card } from '@/components/ui/card';

const getValue = (value: string | undefined | null) =>
  value && value.trim().length > 0 ? value : 'No Data';

export default function VerifyUdyam({
  verfiyUdyamData,
}: {
  verfiyUdyamData: VerifyUdyamType | null;
}) {
  if (!verfiyUdyamData) {
    return <div className="mt-8">no data</div>;
  }

  const remainingData = {
    mobile: verfiyUdyamData.result?.mobile,
    email: verfiyUdyamData.result?.email,
    dic: verfiyUdyamData.result?.dic,
    'msme-dfo': verfiyUdyamData.result?.['msme-dfo'],
    date_of_udyam_registeration:
      verfiyUdyamData.result?.date_of_udyam_registeration,
  };
  return (
    <div className="grid grid-cols-1 gap-2 space-y-4">
      {/* digitalPaymentIdInfo */}
      <Card className="my-6 border border-gray-700 bg-[#0e1421] p-6 shadow-xl">
        <h1 className="text-2xl font-bold text-emerald-500">Udyam Details</h1>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-5">
          <div>
            <p className="text-sm text-gray-400">Enterprise Name</p>
            <p className="text-base font-medium">
              {getValue(verfiyUdyamData.result?.enterprise_name)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Organisation Type</p>
            <p className="text-base font-medium">
              {getValue(verfiyUdyamData.result?.organisation_type)}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Service Type</p>
            <p className="text-base font-medium">
              {getValue(verfiyUdyamData.result?.service_type)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Gender</p>
            <p className="text-base font-medium">
              {getValue(verfiyUdyamData.result?.gender)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Social Category</p>
            <p className="text-base font-medium">
              {getValue(verfiyUdyamData.result?.social_category)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Date Of Incorporation</p>
            <p className="text-base font-medium">
              {getValue(verfiyUdyamData.result?.date_of_incorporation)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Date Of Commencement</p>
            <p className="text-base font-medium">
              {getValue(verfiyUdyamData.result?.date_of_commencement)}
            </p>
          </div>
        </div>
      </Card>

      {/* light */}
      <div className="grid grid-cols-3 gap-4">
        <CustomBeFiScCard
          data={verfiyUdyamData.result?.address}
          title="Address"
        />
        <CustomBeFiScCard title="Details" data={remainingData} />
        <CustomBeFiScCard
          title="Plant Details"
          data={verfiyUdyamData.result?.plant_details}
        />
        <CustomBeFiScCard
          title="Enterprise Type"
          data={verfiyUdyamData.result?.enterprise_type}
        />
        <CustomBeFiScCard
          data={verfiyUdyamData.result?.nic_code}
          title="NIC Code"
        />
      </div>
    </div>
  );
}
