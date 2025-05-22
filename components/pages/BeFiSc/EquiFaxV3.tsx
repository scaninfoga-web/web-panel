import { EquifaxV3Type } from '@/types/BeFiSc';
import React from 'react';
import { Loader } from '@/components/ui/loader';
import CustomBeFiScCard, { getValue } from './CustomBeFiScCard';
import { Card } from '@/components/ui/card';

// const getValue = (value: string | undefined | null) =>
//   value && value.trim().length > 0 ? value : 'No Data';

export default function EquifaxV3({
  EquifaxV3Data,
}: {
  EquifaxV3Data: EquifaxV3Type | null;
}) {
  if (!EquifaxV3Data) {
    return <></>;
  }

  const PersonalInfoRemaingData = {
    FullName: getValue(
      EquifaxV3Data?.result?.credit_report?.CCRResponse?.CIRReportDataLst[0]
        ?.CIRReportData?.IDAndContactInfo?.PersonalInfo?.Name?.FullName,
    ),
    Age: getValue(
      EquifaxV3Data?.result?.credit_report?.CCRResponse?.CIRReportDataLst[0]
        ?.CIRReportData?.IDAndContactInfo?.PersonalInfo?.Age?.Age,
    ),
    DateOfBirth: getValue(
      EquifaxV3Data?.result?.credit_report?.CCRResponse?.CIRReportDataLst[0]
        ?.CIRReportData?.IDAndContactInfo?.PersonalInfo?.DateOfBirth,
    ),
    Occupation: getValue(
      EquifaxV3Data?.result?.credit_report?.CCRResponse?.CIRReportDataLst[0]
        ?.CIRReportData?.IDAndContactInfo?.PersonalInfo?.Occupation,
    ),
    PlaceOfBirthInfo: getValue(
      JSON.stringify(
        EquifaxV3Data?.result?.credit_report?.CCRResponse?.CIRReportDataLst[0]
          ?.CIRReportData?.IDAndContactInfo?.PersonalInfo?.PlaceOfBirthInfo,
      ),
    ),
    TotalIncome: getValue(
      EquifaxV3Data?.result?.credit_report?.CCRResponse?.CIRReportDataLst[0]
        ?.CIRReportData?.IDAndContactInfo?.PersonalInfo?.TotalIncome,
    ),
  };

  return (
    <div className="grid grid-cols-1 gap-2 space-y-4">
      <Card className="my-6 border border-gray-700 bg-[#0e1421] p-6 shadow-xl">
        <h1 className="text-2xl font-bold text-emerald-500">EquiFax Details</h1>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-5">
          <div>
            <p className="text-sm text-gray-400">Pan Number</p>
            <p className="text-base font-medium">
              {getValue(EquifaxV3Data.result?.id_number)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Name</p>
            <p className="text-base font-medium">
              {getValue(EquifaxV3Data.result?.name)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Mobile</p>
            <p className="text-base font-medium">
              {getValue(EquifaxV3Data.result?.mobile)}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Credit Score</p>
            <p className="text-base font-medium">
              {getValue(EquifaxV3Data.result?.credit_score)}
            </p>
          </div>
        </div>
      </Card>

      {/* light */}
      <div className="grid grid-cols-3 gap-4">
        <CustomBeFiScCard
          data={EquifaxV3Data?.result?.credit_report?.InquiryResponseHeader}
          title="Inquiry Response Header"
        />
        <CustomBeFiScCard
          data={EquifaxV3Data?.result?.credit_report?.InquiryRequestInfo}
          title="Inquiry Request Info"
        />
        <CustomBeFiScCard
          data={EquifaxV3Data?.result?.credit_report?.Score}
          title="Score"
        />
        {/* <CustomBeFiScCard
          data={
            EquifaxV3Data?.result?.credit_report?.CCRResponse
              ?.CIRReportDataLst[0]?.CIRReportData?
          }
          title="CIR Enquiries"
        /> */}
        <CustomBeFiScCard
          data={
            EquifaxV3Data?.result?.credit_report?.CCRResponse
              ?.CIRReportDataLst[0]?.CIRReportData?.EnquirySummary
          }
          title="CIR EnquirySummary"
        />
        <CustomBeFiScCard
          data={
            EquifaxV3Data?.result?.credit_report?.CCRResponse
              ?.CIRReportDataLst[0]?.CIRReportData?.IDAndContactInfo
              ?.AddressInfo
          }
          title="CIR AddressInfo"
        />
        <CustomBeFiScCard
          data={
            EquifaxV3Data?.result?.credit_report?.CCRResponse
              ?.CIRReportDataLst[0]?.CIRReportData?.IDAndContactInfo
              ?.EmailAddressInfo
          }
          title="CIR EmailAddressInfo"
        />
        <CustomBeFiScCard
          data={
            EquifaxV3Data?.result?.credit_report?.CCRResponse
              ?.CIRReportDataLst[0]?.CIRReportData?.IDAndContactInfo
              ?.IdentityInfo?.PANId
          }
          title="CIR IdentityInfo PANId"
        />
        <CustomBeFiScCard
          data={
            EquifaxV3Data?.result?.credit_report?.CCRResponse
              ?.CIRReportDataLst[0]?.CIRReportData?.IDAndContactInfo
              ?.IdentityInfo?.OtherId
          }
          title="CIR IdentityInfo OtherId"
        />

        {/* hererere  erere */}
        <CustomBeFiScCard
          data={PersonalInfoRemaingData}
          title="CIR PersonalInfo Here"
        />

        <CustomBeFiScCard
          data={
            EquifaxV3Data?.result?.credit_report?.CCRResponse
              ?.CIRReportDataLst[0]?.CIRReportData?.IDAndContactInfo?.PhoneInfo
          }
          title="CIR PhoneInfo"
        />
        <CustomBeFiScCard
          data={
            EquifaxV3Data?.result?.credit_report?.CCRResponse
              ?.CIRReportDataLst[0]?.CIRReportData?.OtherKeyInd
          }
          title="CIR OtherKeyInd"
        />
        <CustomBeFiScCard
          data={
            EquifaxV3Data?.result?.credit_report?.CCRResponse
              ?.CIRReportDataLst[0]?.CIRReportData?.RecentActivities
          }
          title="CIR RecentActivities"
        />
        {EquifaxV3Data?.result?.credit_report?.CCRResponse?.CIRReportDataLst[0]?.CIRReportData?.RetailAccountDetails.map(
          (item, index) => {
            return (
              <CustomBeFiScCard
                key={index}
                data={item}
                title={`CIR RetailAccountDetails ${index}`}
              />
            );
          },
        )}
        {/* <CustomBeFiScCard
          data={
            EquifaxV3Data?.result?.credit_report?.CCRResponse
              ?.CIRReportDataLst[0]?.CIRReportData?.RetailAccountDetails
          }
          title="CIR RetailAccountDetails"
        /> */}
        <CustomBeFiScCard
          data={
            EquifaxV3Data?.result?.credit_report?.CCRResponse
              ?.CIRReportDataLst[0]?.CIRReportData?.RetailAccountsSummary
          }
          title="CIR RetailAccountsSummary"
        />

        {EquifaxV3Data?.result?.credit_report?.CCRResponse?.CIRReportDataLst[0]?.CIRReportData?.ScoreDetails.map(
          (item, index) => {
            return (
              <CustomBeFiScCard
                key={index}
                data={item}
                title={`CIR ScoreDetails ${index}`}
              />
            );
          },
        )}
        {/* <CustomBeFiScCard
          data={
            EquifaxV3Data?.result?.credit_report?.CCRResponse
              ?.CIRReportDataLst[0]?.CIRReportData?.ScoreDetails
          }
          title="CIR ScoreDetails"
        /> */}

        <CustomBeFiScCard
          data={
            EquifaxV3Data?.result?.credit_report?.CCRResponse
              ?.CIRReportDataLst[0]?.InquiryRequestInfo
          }
          title="CRR Inquiry Request Info"
        />
        <CustomBeFiScCard
          data={
            EquifaxV3Data?.result?.credit_report?.CCRResponse
              ?.CIRReportDataLst[0]?.InquiryResponseHeader
          }
          title="CRR Inquiry Response Header"
        />
      </div>
    </div>
  );
}
