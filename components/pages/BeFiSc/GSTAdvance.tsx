import { GstVerificationAdvanceType, VerifyUdyamType } from '@/types/BeFiSc';
import React from 'react';
import { Loader } from '@/components/ui/loader';
import CustomBeFiScCard from './CustomBeFiScCard';
import { Card } from '@/components/ui/card';

const getValue = (value: string | undefined | null) =>
  value && value.trim().length > 0 ? value : 'No Data';

export default function GSTAdvance({
  GstAdvanceData,
}: {
  GstAdvanceData: GstVerificationAdvanceType | null;
}) {
  if (!GstAdvanceData) {
    return <></>;
  }

  const remainData = {
    aggregate_turn_over: GstAdvanceData?.result?.aggregate_turn_over,
    business_constitution: GstAdvanceData?.result?.business_constitution,
    can_flag: GstAdvanceData?.result?.can_flag,
    central_jurisdiction: GstAdvanceData?.result?.central_jurisdiction,
    compliance_rating: GstAdvanceData?.result?.compliance_rating,
    current_registration_status:
      GstAdvanceData?.result?.current_registration_status,

    gstin: GstAdvanceData?.result?.gstin,
    is_field_visit_conducted: GstAdvanceData?.result?.is_field_visit_conducted,
    legal_name: GstAdvanceData?.result?.legal_name,
    mandate_e_invoice: GstAdvanceData?.result?.mandate_e_invoice,
  };

  return (
    <div className="grid grid-cols-1 gap-2 space-y-4">
      {/* digitalPaymentIdInfo */}
      {/* <Card className="my-6 border border-gray-700 bg-[#0e1421] p-6 shadow-xl">
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
      </Card> */}

      {/* light */}
      <div className="grid grid-cols-3 gap-4">
        <CustomBeFiScCard data={remainData} title="GST Advance" />
        <CustomBeFiScCard
          data={GstAdvanceData?.result?.authorized_signatory}
          title="Authorized Signatory"
        />
        <CustomBeFiScCard
          data={GstAdvanceData?.result?.business_nature}
          title="Business Nature"
        />
        <CustomBeFiScCard
          data={GstAdvanceData?.result?.business_details}
          title="Business Details"
        />
        {GstAdvanceData?.result?.filing_status.map((item, index) => {
          return (
            <CustomBeFiScCard data={item} title={`Filing Status`} key={index} />
          );
        })}
        {/* <CustomBeFiScCard
          data={GstAdvanceData?.result?.filing_status}
          title="Filing Status"
        /> */}
        <CustomBeFiScCard
          data={GstAdvanceData?.result?.other_business_address}
          title="Other Business Address"
        />
        <CustomBeFiScCard
          data={GstAdvanceData?.result?.primary_business_address}
          title="Primary Business Address"
        />
        <CustomBeFiScCard
          data={{
            register_cancellation_date:
              GstAdvanceData?.result?.register_cancellation_date,
            register_date: GstAdvanceData?.result?.register_date,
            state_jurisdiction: GstAdvanceData?.result?.state_jurisdiction,
            tax_payer_type: GstAdvanceData?.result?.tax_payer_type,
            trade_name: GstAdvanceData?.result?.trade_name,
            gross_total_income: GstAdvanceData?.result?.gross_total_income,
            gross_total_income_financial_year:
              GstAdvanceData?.result?.gross_total_income_financial_year,
            business_email: GstAdvanceData?.result?.business_email,
            business_mobile: GstAdvanceData?.result?.business_mobile,
          }}
          title="GST Details"
        />
      </div>
    </div>
  );
}
