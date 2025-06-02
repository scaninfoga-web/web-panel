import { Card } from '@/components/ui/card';
import { EquifaxV3Type } from '@/types/BeFiSc';
import { DashboardCard, InfoText } from '../dashboard/components/DashboardCard';
import { numberToIndianRuppe } from './APIUtils';
import CustomBeFiScCard, { formatKey, getValue } from './CustomBeFiScCard';

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
  let creditCount = 0;
  let loanCount = 0;
  EquifaxV3Data?.result?.credit_report?.CCRResponse?.CIRReportDataLst[0]?.CIRReportData?.RetailAccountDetails.map(
    (val) =>
      val?.AccountType === 'Credit Card'
        ? (creditCount = creditCount + 1)
        : (loanCount = loanCount + 1),
  );

  return (
    <div className="grid grid-cols-1 gap-2 space-y-2">
      <div className="flex flex-col pl-1 text-xl font-semibold uppercase">
        <span className="flex text-red-400">
          Total Loans : <p className="pl-2 text-yellow-500">{loanCount}</p>
        </span>
        <span className="flex text-red-400">
          Total Credit Cards :{' '}
          <p className="pl-2 text-yellow-500">{creditCount}</p>
        </span>
      </div>
      <Card className="my-6 border border-gray-700 bg-[#0e1421] p-6 shadow-xl">
        <h1 className="text-2xl font-bold text-emerald-500">Equifax Details</h1>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-5">
          <div>
            <p className="text-sm text-gray-400">Name</p>
            <p className="text-base font-medium">
              {getValue(
                EquifaxV3Data.result?.credit_report?.CCRResponse
                  ?.CIRReportDataLst[0]?.CIRReportData?.IDAndContactInfo
                  ?.PersonalInfo?.Name?.FullName,
              )}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Age</p>
            <p className="text-base font-medium">
              {getValue(
                EquifaxV3Data?.result?.credit_report?.CCRResponse
                  ?.CIRReportDataLst[0]?.CIRReportData?.IDAndContactInfo
                  ?.PersonalInfo?.Age?.Age,
              )}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Gender</p>
            <p className="text-base font-medium">
              {getValue(
                EquifaxV3Data?.result?.credit_report?.CCRResponse
                  ?.CIRReportDataLst[0]?.CIRReportData?.IDAndContactInfo
                  ?.PersonalInfo?.Gender,
              )}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Pan Number</p>
            <p className="text-base font-medium text-blue-400">
              {getValue(EquifaxV3Data.result?.id_number)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Mobile</p>
            <p className="text-base font-medium">
              {getValue(EquifaxV3Data.result?.mobile) || '----'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Credit Score</p>
            <p className="text-base font-medium text-yellow-500">
              {getValue(EquifaxV3Data.result?.credit_score) || '----'}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Total Income</p>
            <p className="text-base font-medium text-yellow-500">
              {numberToIndianRuppe(
                EquifaxV3Data?.result?.credit_report?.CCRResponse
                  ?.CIRReportDataLst[0]?.CIRReportData?.IDAndContactInfo
                  ?.PersonalInfo?.TotalIncome || 0,
              )}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Occupation</p>
            <p className="text-base font-medium">
              {getValue(
                EquifaxV3Data?.result?.credit_report?.CCRResponse
                  ?.CIRReportDataLst[0]?.CIRReportData?.IDAndContactInfo
                  ?.PersonalInfo?.Occupation || '----',
              )}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Email Address</p>
            <p className="text-base font-medium">
              {getValue(
                EquifaxV3Data?.result?.credit_report?.CCRResponse
                  ?.CIRReportDataLst[0]?.CIRReportData?.IDAndContactInfo
                  ?.EmailAddressInfo?.[0]?.EmailAddress || '----',
              )}
            </p>
          </div>
        </div>
      </Card>

      <div className="grid gap-4">
        {EquifaxV3Data?.result?.credit_report?.CCRResponse?.CIRReportDataLst.map(
          (item, index) => (
            <div key={index} className="space-y-4">
              {/* other key ind & enquiry*/}

              {/* ID And contact INFO */}
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <CustomBeFiScCard
                    key={'PhoneInfo' + index}
                    data={item?.CIRReportData?.IDAndContactInfo?.PhoneInfo}
                    title="Phone Info"
                  />
                  <CustomBeFiScCard
                    key={'EmailAdderssInfo' + index}
                    data={
                      item?.CIRReportData?.IDAndContactInfo?.EmailAddressInfo
                    }
                    title="Email Address Info"
                  />
                </div>
                {/* IDentify info */}
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(
                    item?.CIRReportData?.IDAndContactInfo?.IdentityInfo,
                  ).map(([key, value], index2) => (
                    <CustomBeFiScCard
                      key={index2}
                      data={value}
                      title={formatKey(key)}
                    />
                  ))}
                </div>
              </div>

              {/* InquiryRequestInfo */}
              <div className="grid grid-cols-2 gap-4">
                <DashboardCard title="ID Details">
                  <div>
                    {item?.InquiryRequestInfo?.IDDetails?.map((val, index6) => (
                      <div key={index6} className="flex flex-col">
                        <InfoText
                          label={formatKey(val?.IDType) || ''}
                          value={getValue(val?.IDValue)}
                        />
                      </div>
                    ))}
                  </div>
                </DashboardCard>
                <DashboardCard title="Phones">
                  <div>
                    {item?.InquiryRequestInfo?.InquiryPhones?.map(
                      (val, index6) => (
                        <div key={index6} className="flex flex-col">
                          <InfoText
                            label={'Mobile Number'}
                            value={getValue(val?.Number)}
                          />
                        </div>
                      ),
                    )}
                  </div>
                </DashboardCard>
              </div>

              {/* Account Loans Details */}
              <div className="space-y-4 border">
                {item?.CIRReportData?.RetailAccountDetails.map(
                  (val, index5) => (
                    <div key={index5} className="my-4 space-y-4">
                      <DashboardCard title={`${val?.AccountType}`}>
                        <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-6">
                          <div>
                            <p className="text-sm text-gray-400">Institution</p>
                            <p className="text-base font-medium">
                              {getValue(val?.Institution) || '----'}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Open</p>
                            <p className="text-base font-medium">
                              {getValue(val?.Open) || '----'}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Source</p>
                            <p className="text-base font-medium">
                              {getValue(val?.source) || '----'}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Balance</p>
                            <p className="text-base font-medium text-red-500">
                              {getValue(val?.Balance) || '----'}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Date Opened</p>
                            <p className="text-base font-medium">
                              {getValue(val?.DateOpened) || '----'}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">
                              Date Reported
                            </p>
                            <p className="text-base font-medium">
                              {getValue(val?.DateReported) || '----'}
                            </p>
                          </div>

                          {val?.AccountType === 'Credit Card' ? (
                            <div>
                              <p className="text-sm text-gray-400">
                                Credit Limit
                              </p>
                              <p className="text-base font-medium text-yellow-500">
                                {getValue(val?.CreditLimit) || '----'}
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p className="text-sm text-gray-400">
                                Interest Rate
                              </p>
                              <p className="text-base font-medium text-yellow-500">
                                {getValue(val?.InterestRate) || '----'}
                              </p>
                            </div>
                          )}
                          {val?.AccountType === 'Credit Card' && (
                            <div>
                              <p className="text-sm text-gray-400">
                                HighCredit
                              </p>
                              <p className="text-base font-medium text-yellow-500">
                                {getValue(val?.HighCredit) || '----'}
                              </p>
                            </div>
                          )}

                          <div>
                            <p className="text-sm text-gray-400">
                              Account Status
                            </p>
                            <p className="text-base font-medium">
                              {getValue(val?.AccountStatus || '----')}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">
                              Ownership Type
                            </p>
                            <p className="text-base font-medium">
                              {getValue(val?.OwnershipType || '----')}
                            </p>
                          </div>
                          {val?.AccountType === 'Credit Card' ? (
                            <div>
                              <p className="text-sm text-gray-400">
                                LastPayment Amount
                              </p>
                              <p className="text-base font-medium text-red-500">
                                {val?.LastPayment || '----'}
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p className="text-sm text-gray-400">
                                PastDue Amount
                              </p>
                              <p className="text-base font-medium text-red-500">
                                {val?.PastDueAmount || '----'}
                              </p>
                            </div>
                          )}
                          {val?.AccountType === 'Credit Card' && (
                            <div>
                              <p className="text-sm text-gray-400">
                                WriteOffAmount
                              </p>
                              <p className="text-base font-medium text-red-500">
                                {val?.WriteOffAmount || '----'}
                              </p>
                            </div>
                          )}
                          {val?.AccountType !== 'Credit Card' && (
                            <>
                              <div>
                                <p className="text-sm text-gray-400">
                                  Term Frequency
                                </p>
                                <p className="text-base font-medium">
                                  {getValue(val?.TermFrequency || '----')}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-400">
                                  Sanction Amount
                                </p>
                                <p className="text-base font-medium text-red-500">
                                  {getValue(val?.SanctionAmount || '----')}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-400">
                                  Repayment Tenure
                                </p>
                                <p className="text-base font-medium text-red-500">
                                  {getValue(val?.RepaymentTenure || '----')}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-400">
                                  Installment Amount
                                </p>
                                <p className="text-base font-medium text-yellow-500">
                                  {getValue(val?.InstallmentAmount || '----')}
                                </p>
                              </div>
                            </>
                          )}
                          <div>
                            <p className="text-sm text-gray-400">
                              Account Number
                            </p>
                            <p className="text-base font-medium">
                              {getValue(val?.AccountNumber || '----')}
                            </p>
                          </div>
                        </div>
                      </DashboardCard>
                      <CustomBeFiScCard
                        title={`History48 Months ${val?.AccountType}`}
                        data={val?.History48Months}
                      />
                    </div>
                  ),
                )}
              </div>

              {/* RecentActivities && Retail Account Summary */}
              <div className="grid grid-cols-2 gap-4">
                <CustomBeFiScCard
                  key={'RecentActivities' + index}
                  data={item?.CIRReportData?.RecentActivities}
                  title="Recent Activities"
                />
                <CustomBeFiScCard
                  key={'RetailAccountSummary' + index}
                  data={item?.CIRReportData?.RetailAccountsSummary}
                  title="Retail Account Summary"
                />
              </div>
              {/* <div className="grid grid-cols-2 gap-4">
                <CustomBeFiScCard
                  key={'OtherKeyInd' + index}
                  data={item?.CIRReportData?.OtherKeyInd}
                  title="CIR Other Key IND"
                />
                <CustomBeFiScCard
                  key={'EnquirySummary' + index}
                  data={item?.CIRReportData?.EnquirySummary}
                  title="Enquiry Summary"
                />
              </div> */}
            </div>
          ),
        )}
      </div>

      <CustomBeFiScCard
        data={
          EquifaxV3Data?.result?.credit_report?.CCRResponse?.CIRReportDataLst[0]
            ?.CIRReportData?.IDAndContactInfo?.AddressInfo
        }
        title="Address Info"
      />
    </div>
  );
}
