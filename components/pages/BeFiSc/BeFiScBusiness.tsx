import { Separator } from '@/components/ui/separator';
import {
  GstTurnoverType,
  GstVerificationAdvanceType,
  PanAllInOneType,
  VerifyUdyamType,
} from '@/types/BeFiSc';
import { DashboardCard } from '../dashboard/components/DashboardCard';
import CustomBeFiScCard, { getValue } from './sub/CustomBeFiScCard';
import CustomBadge from './sub/CustomBadge';
import { formatSentence } from '@/components/custom/functions/formatUtils';

interface Props {
  panAllInOneData: PanAllInOneType | null;
  GstAdvanceData: GstVerificationAdvanceType | null;
  GstTurnoverData: GstTurnoverType | null;
  verfiyUdyamData: VerifyUdyamType | null;
}

export default function BeFiScBusiness({
  panAllInOneData,
  GstAdvanceData,
  GstTurnoverData,
  verfiyUdyamData,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-2 space-y-4">
      <DashboardCard title="GST Information" className="">
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
              {formatSentence(GstAdvanceData?.result?.legal_name)}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Trade Name</p>
            <p className="text-base font-medium">
              {formatSentence(GstAdvanceData?.result?.trade_name)}
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
              {GstAdvanceData?.result?.business_email.toLowerCase()}
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
            <p className="text-sm text-gray-400">GST Filed Total</p>
            <p className="text-base font-medium text-yellow-500">
              {getValue(GstTurnoverData?.result?.gst_filed_total)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">GST Estimated Total</p>
            <p className="text-base font-medium text-yellow-500">
              {getValue(GstTurnoverData?.result?.gst_estimated_total)}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Pan Filed Total</p>
            <p className="text-base font-medium text-yellow-500">
              {getValue(GstTurnoverData?.result?.pan_filed_total)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Pan Estimated Total</p>
            <p className="text-base font-medium text-yellow-500">
              {getValue(GstTurnoverData?.result?.pan_estimated_total)}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Authorized Signatory</p>
            <p className="min-w-72 text-base font-medium">
              {getValue(GstAdvanceData?.result?.authorized_signatory)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">State Jurisdiction</p>
            <p className="min-w-[40vw] text-base font-medium">
              {getValue(GstAdvanceData?.result?.state_jurisdiction)}
            </p>
          </div>
        </div>
        <Separator className="mt-4 bg-slate-800" />
        <div className="flex space-x-2 pt-2">
          <CustomBadge value={GstTurnoverData?.result?.year} />
          <CustomBadge value={GstTurnoverData?.result?.gst_status} />
          <CustomBadge value={verfiyUdyamData?.result?.organisation_type} />
        </div>
      </DashboardCard>

      {/* verfiy udyma */}
      <div>
        <DashboardCard title="Udyam Details" className="">
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <p className="text-sm text-gray-400">Enterprise Name</p>
              <p className="text-base font-medium">
                {formatSentence(verfiyUdyamData?.result?.enterprise_name)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-base font-medium">
                {verfiyUdyamData?.result?.email.toLowerCase() || '----'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Gender</p>
              <p className="text-base font-medium text-yellow-500">
                {formatSentence(verfiyUdyamData?.result?.gender)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">MSME Info</p>
              <p className="text-base font-medium">
                {getValue(verfiyUdyamData?.result?.['msme-dfo'])}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">
                Date of Udyam Registeration
              </p>
              <p className="text-base font-medium text-blue-500">
                {getValue(verfiyUdyamData?.result?.date_of_udyam_registeration)}
              </p>
            </div>
          </div>
          <Separator className="mt-4 bg-slate-800" />
          <div className="flex space-x-2 pt-2">
            <CustomBadge value={verfiyUdyamData?.result?.organisation_type} />
            <CustomBadge value={verfiyUdyamData?.result?.organisation_type} />
          </div>
        </DashboardCard>
      </div>

      <CustomBeFiScCard
        data={
          GstAdvanceData?.result?.business_details?.bzsdtls ||
          GstAdvanceData?.result?.business_details?.bzgddtls
        }
        title="Business Details"
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
      <div className="grid grid-cols-2 gap-3">
        <CustomBeFiScCard
          data={panAllInOneData?.result?.is_sole_proprietor?.info}
          title="isSoleProprietor"
        />
        <CustomBeFiScCard
          data={panAllInOneData?.result?.is_director?.info}
          title="isDirector"
        />
      </div>
      <CustomBeFiScCard
        data={panAllInOneData?.result?.din_info?.company_list}
        title={`Din  Info: ${panAllInOneData?.result?.din_info?.din}`}
      />

      <div className="grid grid-cols-1 gap-4">
        {GstAdvanceData?.result?.filing_status.map((item, index) => {
          return (
            <CustomBeFiScCard data={item} title={`Filing Status`} key={index} />
          );
        })}
        <CustomBeFiScCard
          data={GstAdvanceData?.result?.primary_business_address}
          title="Primary Business Address"
        />
        {Object.keys(GstAdvanceData?.result?.other_business_address || {})
          .length > 0 && (
          <CustomBeFiScCard
            data={GstAdvanceData?.result?.other_business_address}
            title="Other Business Address"
          />
        )}
      </div>
    </div>
  );
}
