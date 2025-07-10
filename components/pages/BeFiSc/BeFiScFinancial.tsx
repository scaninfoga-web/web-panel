import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  EquifaxV3Type,
  Mobile360Type,
  MobileToAccountNumberType,
  PanAllInOneType,
  ProfileAdvanceType,
  UPIType,
} from '@/types/BeFiSc';
import React from 'react';

import { DashboardCard } from '../dashboard/components/DashboardCard';
import CustomBeFiScCard, { getValue } from './sub/CustomBeFiScCard';
import CustomBadge from './sub/CustomBadge';
import BeFiScLoadingSkeleton from './sub/BeFiScLoadingSkeleton';
import UpiDetails from './sub/UpiDetails';
import { PayWorldType } from '@/types/payworld';
import NotFound from '@/components/sub/NotFound';
import PayWorld from './sub/PayWorld';
import {
  formatSentence,
  numberToIndianRuppe,
} from '@/components/custom/functions/formatUtils';

interface PageProps {
  mobileNo: string;
  Mobile360Data: Mobile360Type | null;
  profileAdvanceData: ProfileAdvanceType | null;
  MobileToAccountData: MobileToAccountNumberType | null;
  EquifaxV3Data: EquifaxV3Type | null;
  upiDetailsLoading: boolean;
  upiDetailsData: UPIType | null;
  panAllInOneData: PanAllInOneType | null;
  payworldData: PayWorldType | null;
}

export default function BeFiScFinancial({
  mobileNo,
  Mobile360Data,
  profileAdvanceData,
  MobileToAccountData,
  EquifaxV3Data,
  upiDetailsLoading,
  upiDetailsData,
  panAllInOneData,
  payworldData,
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
    { value: 'digitalInfo', label: 'Digital Info' },
    { value: 'digitalTracker', label: 'Offline Digital Tracker' },
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

  const name =
    panAllInOneData?.result?.full_name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ') ||
    profileAdvanceData?.result?.personal_information?.full_name
      .trim()
      .replace(/\s+/g, ' ')
      .toLowerCase() ||
    MobileToAccountData?.result?.vpa_details?.account_holder_name
      .trim()
      .replace(/\s+/g, ' ')
      .toLowerCase();

  const realName =
    name && name.length > 0
      ? name
      : (Object.values(upiDetailsData?.responseData ?? {})[0]
          ?.data?.result?.name.trim()
          .replace(/\s+/g, ' ')
          .toLowerCase() ?? '');

  return (
    <div className="grid grid-cols-1 gap-2 space-y-4">
      <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
        <TabsList
          className={`grid h-auto w-full grid-cols-2 rounded-lg border border-slate-800 bg-slate-900 p-1 text-white sm:w-auto md:grid-cols-4`}
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

        <TabsContent value="bank" className="mt-6 grid grid-cols-1 space-y-4">
          <DashboardCard title="Primary Account">
            <div className="mt-4 grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div>
                  <p className="text-sm text-gray-400">Holder Name</p>
                  <p className="break-all text-base font-medium">
                    {formatSentence(
                      MobileToAccountData?.result?.vpa_details
                        ?.account_holder_name,
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">VPA</p>
                  <p className="break-all text-base font-medium">
                    {getValue(MobileToAccountData?.result?.vpa_details?.vpa)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Bank Name</p>
                  <p className="text-base font-medium text-yellow-500">
                    {formatSentence(
                      Mobile360Data?.result?.digital_payment_id_info?.data
                        ?.bank,
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
                      MobileToAccountData?.result?.account_details
                        ?.account_ifsc,
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
              </div>
              <div>
                <p className="text-sm text-gray-400">Branch Address</p>
                <p className="break-words text-base font-medium opacity-80">
                  {formatSentence(
                    Mobile360Data?.result?.digital_payment_id_info?.data
                      ?.address,
                  )}
                </p>
              </div>
            </div>
          </DashboardCard>
          {(Mobile360Data?.result?.esic_info?.data?.length || 0) > 0 && (
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
                      <p className="text-sm text-gray-400">Name</p>
                      <p className="text-base font-medium">
                        {formatSentence(item?.name)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Bank Name</p>
                      <p className="text-base font-medium text-yellow-500">
                        {formatSentence(item?.bank_name)}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">IFSC</p>
                      <p className="text-base font-medium">
                        {item?.ifsc?.toUpperCase()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Account Number</p>
                      <p className="text-base font-medium text-yellow-500">
                        {formatSentence(item?.account_number)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Mobile Number</p>
                      <p className="text-base font-medium">
                        {formatSentence(item?.mobile)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Branch Address</p>
                      <p className="text-base font-medium">
                        {formatSentence(item?.branch_name)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>
          )}
        </TabsContent>
        <TabsContent value="loan" className="">
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
            <DashboardCard title="Details">
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
                    {formatSentence(
                      EquifaxV3Data?.result?.credit_report?.CCRResponse
                        ?.CIRReportDataLst[0]?.CIRReportData?.IDAndContactInfo
                        ?.PersonalInfo?.Occupation || '----',
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email Address</p>
                  <p className="text-base font-medium lowercase">
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
                    <div className="space-y-4">
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

        <TabsContent value="digitalInfo" className="">
          {upiDetailsLoading ? (
            <BeFiScLoadingSkeleton />
          ) : Object.keys(upiDetailsData?.responseData || {}).length > 0 ? (
            <div className="flex flex-col space-y-4">
              <UpiDetails realName={realName} UpiData={upiDetailsData} />
            </div>
          ) : (
            <NotFound value="Upi Details Not Found" />
          )}
        </TabsContent>

        <TabsContent value="digitalTracker" className="space-y-4">
          <PayWorld PayWorldData={payworldData} mobileNo={mobileNo} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
