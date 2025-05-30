import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  EquifaxV3Type,
  Mobile360Type,
  MobileToAccountNumberType,
  ProfileAdvanceType,
} from '@/types/BeFiSc';
import React from 'react';
import { formatSentence, numberToIndianRuppe } from '../APIUtils';
import CustomBeFiScCard, { getValue } from '../CustomBeFiScCard';
import CustomBadge from '../CustomBadge';
import { DashboardCard } from '../../dashboard/components/DashboardCard';

interface PageProps {
  Mobile360Data: Mobile360Type | null;
  ProfileAdvance: ProfileAdvanceType | null;
  MobileToAccountData: MobileToAccountNumberType | null;
  EquifaxV3Data: EquifaxV3Type | null;
}

export default function BeFiScFinancial({
  Mobile360Data,
  ProfileAdvance,
  MobileToAccountData,
  EquifaxV3Data,
}: PageProps) {
  const [activeTab, setActiveTab] = React.useState('bank');
  let creditCount = 0;
  let loanCount = 0;
  EquifaxV3Data?.result?.credit_report?.CCRResponse?.CIRReportDataLst[0]?.CIRReportData?.RetailAccountDetails.map(
    (val) =>
      val?.AccountType === 'Credit Card'
        ? (creditCount = creditCount + 1)
        : (loanCount = loanCount + 1),
  );

  const tabs = [
    { value: 'bank', label: 'Bank Details' },
    { value: 'loan', label: 'Loan Details' },
  ];

  const getGridCols = (tabCount: number) => {
    const gridClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      7: 'grid-cols-7',
      8: 'grid-cols-8',
    };
    return gridClasses[tabCount as keyof typeof gridClasses] || 'grid-cols-8';
  };

  const gridColsClass = getGridCols(tabs.length);

  return (
    <div className="grid grid-cols-1 gap-2 space-y-4">
      <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
        <TabsList
          className={`grid h-auto w-full ${gridColsClass} rounded-lg border border-slate-800 bg-slate-900 p-1 text-white sm:w-auto`}
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-md data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-500"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="bank" className="mt-6 grid grid-cols-1">
          <DashboardCard title="Primary Account">
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-4">
              <div>
                <p className="text-sm text-gray-400">Holder Name</p>
                <p className="text-base font-medium">
                  {formatSentence(
                    MobileToAccountData?.result?.vpa_details
                      ?.account_holder_name,
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">VPA</p>
                <p className="text-base font-medium">
                  {getValue(MobileToAccountData?.result?.vpa_details?.vpa)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Bank Name</p>
                <p className="text-base font-medium text-yellow-500">
                  {formatSentence(
                    Mobile360Data?.result?.digital_payment_id_info?.data?.bank,
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Branch Name</p>
                <p className="text-base font-medium">
                  {formatSentence(
                    Mobile360Data?.result?.digital_payment_id_info?.data
                      ?.branch,
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Account Number</p>
                <p className="text-base font-medium text-yellow-500">
                  {getValue(
                    MobileToAccountData?.result?.account_details
                      ?.account_number,
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Account IFSC</p>
                <p className="text-base font-medium">
                  {getValue(
                    MobileToAccountData?.result?.account_details?.account_ifsc,
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Branch Contact</p>
                <p className="text-base font-medium">
                  {getValue(
                    Mobile360Data?.result?.digital_payment_id_info?.data
                      ?.contact,
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Account Verified</p>
                <p className="text-base font-medium">
                  <CustomBadge value="Verified" />
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Branch Address</p>
                <p className="min-w-[850px] text-base font-medium opacity-80">
                  {formatSentence(
                    getValue(
                      Mobile360Data?.result?.digital_payment_id_info?.data
                        ?.address,
                    ) +
                      ', ' +
                      getValue(
                        Mobile360Data?.result?.digital_payment_id_info?.data
                          ?.district,
                      ) +
                      ', ' +
                      getValue(
                        Mobile360Data?.result?.digital_payment_id_info?.data
                          ?.city,
                      ),
                  )}
                </p>
              </div>
            </div>
          </DashboardCard>
          {Mobile360Data?.result?.esic_info?.data?.length || 0 > 0 ? (
            <DashboardCard title="Secondary Account">
              <div
                className={`mt-4 grid gap-3 grid-cols-${Mobile360Data?.result?.esic_info?.data?.length}`}
              >
                {Mobile360Data?.result?.esic_info?.data?.map((item) => (
                  <div
                    key={item?.account_number}
                    className="mt-4 grid grid-cols-1 gap-4"
                  >
                    <div>
                      <p className="text-sm text-gray-400">Bank Name</p>
                      <p className="text-base font-medium">
                        {formatSentence(item?.bank_name)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Bank Branch</p>
                      <p className="text-base font-medium">
                        {formatSentence(item?.branch_name)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">IFSC</p>
                      <p className="text-base font-medium">{item?.ifsc}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Mobile</p>
                      <p className="text-base font-medium">
                        {formatSentence(item?.mobile)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>
          ) : (
            <></>
          )}
        </TabsContent>
        <TabsContent value="loan" className="mt-6">
          <div className="grid grid-cols-1 gap-2 space-y-2">
            <div className="flex flex-col pl-1 text-xl font-semibold uppercase">
              <span className="flex text-red-400">
                Total Loans :{' '}
                <p className="pl-2 text-yellow-500">{loanCount}</p>
              </span>
              <span className="flex text-red-400">
                Total Credit Cards :{' '}
                <p className="pl-2 text-yellow-500">{creditCount}</p>
              </span>
            </div>
            <DashboardCard
              title="Details"
              className="my-6 border border-gray-700 bg-[#0e1421] p-6 shadow-xl"
            >
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-5">
                <div>
                  <p className="text-sm text-gray-400">Name</p>
                  <p className="text-base font-medium">
                    {getValue(
                      EquifaxV3Data?.result?.credit_report?.CCRResponse
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
                    {getValue(EquifaxV3Data?.result?.id_number)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Mobile</p>
                  <p className="text-base font-medium">
                    {getValue(EquifaxV3Data?.result?.mobile) || '----'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Credit Score</p>
                  <p className="text-base font-medium text-yellow-500">
                    {getValue(EquifaxV3Data?.result?.credit_score) || '----'}
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
            </DashboardCard>

            <div className="grid gap-4">
              {EquifaxV3Data?.result?.credit_report?.CCRResponse?.CIRReportDataLst.map(
                (item, index) => (
                  <div key={index} className="space-y-4">
                    {/* Account Loans Details */}
                    <div>
                      {item?.CIRReportData?.RetailAccountDetails.map(
                        (val, index5) => (
                          <div key={index5} className="space-y-4">
                            <DashboardCard title={`${val?.AccountType}`}>
                              <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-6">
                                <div>
                                  <p className="text-sm text-gray-400">
                                    Institution
                                  </p>
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
                                  <p className="text-sm text-gray-400">
                                    Source
                                  </p>
                                  <p className="text-base font-medium">
                                    {getValue(val?.source) || '----'}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-400">
                                    Balance
                                  </p>
                                  <p className="text-base font-medium text-red-500">
                                    {getValue(val?.Balance) || '----'}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-400">
                                    Date Opened
                                  </p>
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
                                        {getValue(
                                          val?.SanctionAmount || '----',
                                        )}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-400">
                                        Repayment Tenure
                                      </p>
                                      <p className="text-base font-medium text-red-500">
                                        {getValue(
                                          val?.RepaymentTenure || '----',
                                        )}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-400">
                                        Installment Amount
                                      </p>
                                      <p className="text-base font-medium text-yellow-500">
                                        {getValue(
                                          val?.InstallmentAmount || '----',
                                        )}
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
                  </div>
                ),
              )}
            </div>

            <CustomBeFiScCard
              data={
                EquifaxV3Data?.result?.credit_report?.CCRResponse
                  ?.CIRReportDataLst[0]?.CIRReportData?.IDAndContactInfo
                  ?.AddressInfo
              }
              title="Address Info"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
