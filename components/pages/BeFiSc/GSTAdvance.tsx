import { GstVerificationAdvanceType, VerifyUdyamType } from '@/types/BeFiSc';
import React from 'react';
import { Loader } from '@/components/ui/loader';
import CustomBeFiScCard, { getValue } from './CustomBeFiScCard';
import { Card } from '@/components/ui/card';

export default function GSTAdvance({
  GstAdvanceData,
}: {
  GstAdvanceData: GstVerificationAdvanceType | null;
}) {
  if (!GstAdvanceData) {
    return <></>;
  }

  return (
    <div className="grid grid-cols-1 gap-2 space-y-4">
      <Card className="my-6 border border-gray-700 bg-[#0e1421] p-6 shadow-xl">
        <h1 className="text-2xl font-bold text-emerald-500">GST Information</h1>
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-4">
          <div>
            <p className="text-sm text-gray-400">GST Number</p>
            <p className="text-base font-medium">
              {getValue(GstAdvanceData?.result?.gstin)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Legel Name</p>
            <p className="text-base font-medium">
              {getValue(GstAdvanceData?.result?.legal_name)}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Trade Name</p>
            <p className="text-base font-medium">
              {getValue(GstAdvanceData?.result?.trade_name)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Register Date</p>
            <p className="text-base font-medium">
              {getValue(GstAdvanceData?.result?.register_date)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Business Mobile</p>
            <p className="text-base font-medium text-blue-500">
              {getValue(GstAdvanceData?.result?.business_mobile)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Business Email</p>
            <p className="text-base font-medium text-blue-500">
              {getValue(GstAdvanceData?.result?.business_email)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Tax Payer Type</p>
            <p className="text-base font-medium text-yellow-500">
              {getValue(GstAdvanceData?.result?.tax_payer_type)}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Business Nature</p>
            <p className="text-base font-medium text-yellow-500">
              {getValue(GstAdvanceData?.result?.business_nature)}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Compliance Rating</p>
            <p className="text-base font-medium">
              {getValue(GstAdvanceData?.result?.compliance_rating)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Mandate EInvoice</p>
            <p className="text-base font-medium">
              {getValue(GstAdvanceData?.result?.mandate_e_invoice)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Gross Total Income</p>
            <p className="text-base font-medium text-yellow-500">
              {getValue(GstAdvanceData?.result?.gross_total_income)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Aggregate Turnover</p>
            <p className="text-base font-medium text-yellow-500">
              {getValue(GstAdvanceData?.result?.aggregate_turn_over)}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">State Jurisdiction</p>
            <p className="min-w-72 text-base font-medium">
              {getValue(GstAdvanceData?.result?.authorized_signatory)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">State Jurisdiction</p>
            <p className="min-w-72 text-base font-medium">
              {getValue(GstAdvanceData?.result?.state_jurisdiction)}
            </p>
          </div>
        </div>
      </Card>

      {/* light */}
      <div className="grid grid-cols-3 gap-4">
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
