import NotFound from '@/components/sub/NotFound';
import React, { useState } from 'react';
import {
  formatDateTime,
  formatSentence,
  numberToIndianRuppe,
} from '@/components/custom/functions/formatUtils';
import CustomBeFiScCard, { getValue } from '../../BeFiSc/sub/CustomBeFiScCard';
import { DashboardCard } from '../../dashboard/components/DashboardCard';
import CustomBadge from '../../BeFiSc/sub/CustomBadge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { getClientInfo, post } from '@/lib/api';
import { OlaGeoApiType } from '@/types/ola-geo-api';
import { toast } from 'sonner';
import CustomPopUp from '../../BeFiSc/sub/CustomPopUp';
import Image from 'next/image';
import SentenceLoader from '../../BeFiSc/sub/SentenceLoader';
import {
  EquifaxV3Type,
  MobileToAccountNumberType,
  PanAllInOneType,
  ProfileAdvanceType,
  RazorPayUpiType,
  UPIType,
} from '@/types/BeFiSc';
import { PayWorldType } from '@/types/payworld';
import M2UPI from './M2UPI';
import M2BankInfo from './M2BankInfo';
import PayWorld from '../../BeFiSc/sub/PayWorld';
import M2Address from './M2Address';
import { Badge } from '@/components/ui/badge';

interface PageProps {
  data: {
    panAllInOneData: PanAllInOneType | null;
    profileAdvanceData: ProfileAdvanceType | null;
    equifaxV3Data: EquifaxV3Type | null;
    payworldData: PayWorldType | null;
    upiDetailsData: any;
    mobileToAccountData: MobileToAccountNumberType | null;
    razorPayData: RazorPayUpiType | null;
  };
  mobileNo: string;
}

const olaData: Map<string, OlaGeoApiType> = new Map();

const Fin365Intelligence: React.FC<PageProps> = ({ data, mobileNo }) => {
  const [addressData, setAddressData] = useState<null | {
    address: string;
    data: OlaGeoApiType;
  }>(null);
  const [mapLoading, setMapLoading] = useState(false);

  const handleView = async (address: string) => {
    const clientInfo = getClientInfo();
    try {
      setMapLoading(true);
      if (olaData.get(address)) {
        setAddressData({
          address,
          data: olaData.get(address)!,
        });
        return;
      }
      const res = await post('/api/auth/getmap', {
        userLng: clientInfo.longitude,
        userLat: clientInfo.latitude,
        address: address,
      });
      olaData.set(address, res);
      setAddressData({
        address,
        data: res,
      });
      toast.success('Map Fetched Successfully');
    } catch (error) {
      toast.error('Map Fetched Failed');
    } finally {
      setMapLoading(false);
    }
  };
  const getCount = () => {
    let creditCount = 0;
    let loanCount = 0;
    data?.equifaxV3Data?.result?.credit_report?.CCRResponse?.CIRReportDataLst[0]?.CIRReportData?.RetailAccountDetails.map(
      (val) =>
        val?.AccountType === 'Credit Card'
          ? (creditCount = creditCount + 1)
          : (loanCount = loanCount + 1),
    );
    return {
      creditCount,
      loanCount,
    };
  };

  return (
    <div className="max-h-[65vh] overflow-auto">
      <div className="grid grid-cols-1 gap-4 p-2">
        <DashboardCard title="User Attributes" className="">
          <div className="space-y-4 p-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-400">PAN Number</p>
                <p className="font-medium text-blue-500">
                  {getValue(data?.panAllInOneData?.result?.pan_number)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Aadhaar Number</p>
                <p className="font-medium text-yellow-500">
                  {getValue(data?.panAllInOneData?.result?.masked_aadhaar)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Voter ID</p>
                <p className="font-medium">
                  {getValue(
                    data?.profileAdvanceData?.result?.document_data
                      ?.voter_id?.[0]?.value,
                  )}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Driving License</p>
                <p className="font-medium">
                  {getValue(
                    data?.profileAdvanceData?.result?.document_data
                      ?.driving_license?.[0]?.value,
                  )}
                </p>
              </div>
            </div>
            <Separator className="bg-slate-800" />
            <div>
              <p className="text-xs text-slate-400">Verification Status</p>
              <Badge className="mt-1 bg-emerald-500/20 text-emerald-500">
                Verified
              </Badge>
            </div>
          </div>
        </DashboardCard>
        {data?.mobileToAccountData && (
          <M2BankInfo
            data={{
              razorPayData: data?.razorPayData,
              mobileToBankData: data?.mobileToAccountData,
            }}
          />
        )}
        {(data?.profileAdvanceData?.result?.address?.length || 0) > 0 && (
          <M2Address
            data={{ address: data?.profileAdvanceData?.result?.address || [] }}
          />
        )}

        {data?.payworldData && (
          <PayWorld PayWorldData={data?.payworldData} mobileNo={mobileNo} />
        )}
        {/* equifax data */}
        <div className="grid grid-cols-1 gap-2 space-y-2">
          <div className="flex flex-col pl-1 text-xl font-semibold uppercase">
            <span className="flex text-red-400">
              Total Loans :{' '}
              <p className="pl-2 text-yellow-500">{getCount().loanCount}</p>
            </span>
            <span className="flex text-red-400">
              Total Credit Cards :{' '}
              <p className="pl-2 text-yellow-500">{getCount().creditCount}</p>
            </span>
          </div>
          <DashboardCard title="Details">
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-5">
              <div>
                <p className="text-sm text-gray-400">Name</p>
                <p className="text-base font-medium">
                  {getValue(
                    data?.equifaxV3Data?.result?.credit_report?.CCRResponse
                      ?.CIRReportDataLst[0]?.CIRReportData?.IDAndContactInfo
                      ?.PersonalInfo?.Name?.FullName,
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Age</p>
                <p className="text-base font-medium">
                  {getValue(
                    data?.equifaxV3Data?.result?.credit_report?.CCRResponse
                      ?.CIRReportDataLst[0]?.CIRReportData?.IDAndContactInfo
                      ?.PersonalInfo?.Age?.Age,
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Gender</p>
                <p className="text-base font-medium">
                  {getValue(
                    data?.equifaxV3Data?.result?.credit_report?.CCRResponse
                      ?.CIRReportDataLst[0]?.CIRReportData?.IDAndContactInfo
                      ?.PersonalInfo?.Gender,
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Pan Number</p>
                <p className="text-base font-medium text-blue-400">
                  {getValue(data?.equifaxV3Data?.result?.id_number)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Mobile</p>
                <p className="text-base font-medium">
                  {getValue(data?.equifaxV3Data?.result?.mobile) || '----'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Credit Score</p>
                <p className="text-base font-medium text-yellow-500">
                  {getValue(data?.equifaxV3Data?.result?.credit_score) ||
                    '----'}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400">Total Income</p>
                <p className="text-base font-medium text-yellow-500">
                  {numberToIndianRuppe(
                    data?.equifaxV3Data?.result?.credit_report?.CCRResponse
                      ?.CIRReportDataLst[0]?.CIRReportData?.IDAndContactInfo
                      ?.PersonalInfo?.TotalIncome || 0,
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Occupation</p>
                <p className="text-base font-medium">
                  {formatSentence(
                    data?.equifaxV3Data?.result?.credit_report?.CCRResponse
                      ?.CIRReportDataLst[0]?.CIRReportData?.IDAndContactInfo
                      ?.PersonalInfo?.Occupation || '----',
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Email Address</p>
                <p className="text-base font-medium lowercase">
                  {getValue(
                    data?.equifaxV3Data?.result?.credit_report?.CCRResponse
                      ?.CIRReportDataLst[0]?.CIRReportData?.IDAndContactInfo
                      ?.EmailAddressInfo?.[0]?.EmailAddress || '----',
                  )}
                </p>
              </div>
            </div>
          </DashboardCard>

          <div className="grid gap-4">
            {data?.equifaxV3Data?.result?.credit_report?.CCRResponse?.CIRReportDataLst.map(
              (item, index) => (
                <div key={index} className="space-y-4">
                  {/* Account Loans Details */}
                  <div className="space-y-4">
                    {item?.CIRReportData?.RetailAccountDetails.map(
                      (val, index5) => (
                        <div key={index5} className="space-y-4">
                          <DashboardCard title={`${val?.AccountType}`}>
                            <div className="mt-4 grid grid-cols-2 gap-8 lg:grid-cols-4">
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
              data?.equifaxV3Data?.result?.credit_report?.CCRResponse
                ?.CIRReportDataLst[0]?.CIRReportData?.IDAndContactInfo
                ?.AddressInfo
            }
            title="Address Info"
          />
        </div>
        {data?.upiDetailsData && <M2UPI data={data?.upiDetailsData} />}
      </div>
    </div>
  );
};

export default Fin365Intelligence;
