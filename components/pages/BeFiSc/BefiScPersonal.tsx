import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  EsicDetailsType,
  Mobile360Type,
  MobileToDLAdvanceType,
  PanAllInOneType,
  ProfileAdvanceType,
} from '@/types/BeFiSc';
import { DashboardCard, InfoText } from '../dashboard/components/DashboardCard';
import CustomBadge from './sub/CustomBadge';
import { getValue } from './sub/CustomBeFiScCard';
import { LPGInfoTable } from './sub/LPGTable';
import { formatSentence } from '@/components/custom/functions/formatUtils';
import InfoText2 from '@/components/custom/components/InfoText2';
import M2DL from './sub/M2DL';

interface Props {
  aadharNumber: string;
  Mobile360Data: Mobile360Type | null;
  PanAllInOneData: PanAllInOneType | null;
  ProfileAdvanceData: ProfileAdvanceType | null;
  EsicsData: EsicDetailsType | null;
  mobileToDLAdvance: MobileToDLAdvanceType | null;
}

export default function BefiScPersonal({
  EsicsData,
  Mobile360Data,
  PanAllInOneData,
  ProfileAdvanceData,
  mobileToDLAdvance,
  aadharNumber,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="grid grid-cols-2 gap-4">
        <DashboardCard title="User Attributes" className="">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-400">PAN Number</p>
                <p className="font-medium text-blue-500">
                  {getValue(PanAllInOneData?.result?.pan_number)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Aadhaar Number</p>
                <p className="font-medium text-yellow-500">
                  {getValue(aadharNumber)}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Voter ID</p>
                <p className="font-medium">
                  {getValue(
                    ProfileAdvanceData?.result?.document_data?.voter_id?.[0]
                      ?.value,
                  )}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Driving License</p>
                <p className="font-medium">
                  {getValue(
                    ProfileAdvanceData?.result?.document_data
                      ?.driving_license?.[0]?.value ||
                      mobileToDLAdvance?.responseData?.[0]?.data?.result
                        ?.dl_number,
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

        <DashboardCard title="Employee Status" className="">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-400">Company</p>
                <p className="font-medium">----</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Position</p>
                <p className="font-medium">----</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Employee ID</p>
                <p className="font-medium">----</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Join Date</p>
                <p className="font-medium">----</p>
              </div>
            </div>
            <Separator className="bg-slate-800" />
            <div>
              <p className="text-xs text-slate-400">Status</p>
              <Badge className="mt-1 bg-emerald-500/20 text-emerald-500">
                Active
              </Badge>
            </div>
          </div>
        </DashboardCard>
      </div>

      {(mobileToDLAdvance?.responseData?.length || 0) > 0 && (
        <M2DL mobileToDLAdvance={mobileToDLAdvance} />
      )}

      {EsicsData?.result?.esic_details &&
        EsicsData?.result?.esic_details.length > 0 && (
          <div className="grid grid-cols-1">
            {EsicsData?.result?.esic_details?.map((item, index) => (
              <DashboardCard key={index} title="Esic Details" className="">
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-slate-400">ESIC Number</p>
                      <p className="font-medium text-blue-500">
                        {getValue(item?.esic_number)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Name</p>
                      <p className="font-medium text-yellow-500">
                        {formatSentence(item?.name)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">DOB</p>
                      <p className="font-medium text-yellow-500">
                        {item?.date_of_birth || '----'}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Age</p>
                      <p className="font-medium">{item?.age || '----'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Mobile</p>
                      <p className="font-medium">
                        {getValue(
                          item?.mobile || item?.employer_details.mobile,
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Email</p>
                      <p className="font-medium text-yellow-500">
                        {getValue(item?.employer_details?.email)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Bank Name</p>
                      <p className="font-medium">
                        {formatSentence(item?.bank_name)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Branch Name</p>
                      <p className="font-medium">
                        {formatSentence(item?.branch_name)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">
                        Registration Date
                      </p>
                      <p className="font-medium text-yellow-500">
                        {getValue(item?.registration_date)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">
                        First Date Of Appointment
                      </p>
                      <p className="font-medium text-yellow-500">
                        {getValue(item?.first_date_of_appointment)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">UAN Number</p>
                      <p className="font-medium text-blue-500">
                        {getValue(item?.uan_number)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">UHID Number</p>
                      <p className="font-medium">
                        {getValue(item?.uhid_number)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">Company Name</p>
                      <p className="font-medium">
                        {formatSentence(item?.employer_name)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Employer Code</p>
                      <p className="font-medium">
                        {getValue(item?.employer_code)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Disability Type</p>
                      <p className="font-medium">
                        {getValue(item?.disability_type)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Dispensary Name</p>
                      <p className="font-medium">
                        {getValue(item?.dispensary_name)}
                      </p>
                    </div>
                  </div>
                  <Separator className="bg-slate-800" />
                  <div className="flex space-x-4">
                    <div>
                      <p className="text-xs text-slate-400">
                        Bank Account Status
                      </p>
                      <Badge className="mt-1 bg-emerald-500/20 text-emerald-500">
                        {item?.bank_account_status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">ESIC Status</p>
                      <Badge className="mt-1 bg-emerald-500/20 text-emerald-500">
                        {item?.esic_status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </DashboardCard>
            ))}
          </div>
        )}
      {Mobile360Data?.result?.lpg_info?.data &&
        Mobile360Data?.result?.lpg_info?.data.length > 0 && (
          <DashboardCard title="LPG Details">
            <LPGInfoTable lpgInfo={Mobile360Data?.result?.lpg_info} />
          </DashboardCard>
        )}
      {Mobile360Data?.result?.esic_info?.data &&
        Mobile360Data.result.esic_info.data.length > 0 && (
          <DashboardCard
            title="ESIC History"
            className="scrollbar-custom overflow-auto"
          >
            <Table className="">
              <TableHeader>
                <TableRow className="border-slate-800">
                  <TableHead className="min-w-40 text-slate-400">
                    IFSC
                  </TableHead>
                  <TableHead className="min-w-52 text-slate-400">
                    Name
                  </TableHead>
                  <TableHead className="min-w-40 text-slate-400">
                    Mobile
                  </TableHead>
                  <TableHead className="min-w-40 text-slate-400">
                    Account Number
                  </TableHead>
                  <TableHead className="min-w-40 text-slate-400">
                    Bank Name
                  </TableHead>
                  <TableHead className="min-w-60 text-slate-400">
                    Branch Name
                  </TableHead>
                  <TableHead className="min-w-40 text-slate-400">
                    UAN Number
                  </TableHead>
                  <TableHead className="min-w-40 text-slate-400">
                    ESIC Number
                  </TableHead>
                  <TableHead className="min-w-40 text-slate-400">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="">
                {Mobile360Data?.result?.esic_info?.data?.map((item) => (
                  <TableRow
                    key={formatSentence(item?.esic_number)}
                    className="scrollbar-custom overflow-auto border-slate-800"
                  >
                    <TableCell>{item?.ifsc}</TableCell>
                    <TableCell className="min-w-40">
                      {formatSentence(item?.name)}
                    </TableCell>
                    <TableCell>{item?.mobile}</TableCell>
                    <TableCell>{item?.account_number}</TableCell>
                    <TableCell className="min-w-52">
                      {formatSentence(item?.bank_name)}
                    </TableCell>
                    <TableCell className="min-w-40">
                      {formatSentence(item?.branch_name)}
                    </TableCell>
                    <TableCell>{formatSentence(item?.uan_number)}</TableCell>
                    <TableCell className="min-w-52">
                      {formatSentence(item?.esic_number)}
                    </TableCell>
                    <TableCell className="min-w-52">
                      <CustomBadge value={item?.bank_account_status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </DashboardCard>
        )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* din */}
        <DashboardCard
          title="Din Info"
          className="scrollbar-custom max-h-[400px] overflow-auto"
        >
          {Mobile360Data?.result?.din_info?.data.map((val, index) => (
            <InfoText
              label={`${val?.data?.name}`}
              value={getValue(val.pan)}
              key={index}
            />
          ))}
        </DashboardCard>
        <DashboardCard
          title="Udyam Numbers"
          className="scrollbar-custom max-h-[400px] overflow-auto"
        >
          {Mobile360Data?.result?.msme_info?.data.map((val, index) => (
            <InfoText
              label={`${val?.udyam_number}`}
              value={
                val?.enterprise_name?.length > 34
                  ? val?.enterprise_name?.slice(0, 34) + '...'
                  : val?.enterprise_name
              }
              key={index}
            />
          ))}
        </DashboardCard>
      </div>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-5">
        <DashboardCard
          title="GST List"
          className="scrollbar-custom grid max-h-[400px] grid-cols-3 overflow-auto"
        >
          {Mobile360Data?.result?.gst_list?.data.map((val, index) => (
            <div key={index}>{val}</div>
          ))}
        </DashboardCard>
        <DashboardCard
          title="IEC List"
          className="scrollbar-custom grid max-h-[400px] grid-cols-3 overflow-auto"
        >
          {Mobile360Data?.result?.iec_list?.data.map((val, index) => (
            <div key={index}>{val}</div>
          ))}
        </DashboardCard>
        <DashboardCard
          title="EPFO Info"
          className="scrollbar-custom grid max-h-[400px] grid-cols-3 overflow-auto"
        >
          {Mobile360Data?.result?.epfo_info?.data.map((val, index) => (
            <div key={index}>{val}</div>
          ))}
        </DashboardCard>
        <DashboardCard
          title="ESIC Info"
          className="scrollbar-custom grid max-h-[400px] grid-cols-3 overflow-auto"
        >
          {Mobile360Data?.result?.esic_info?.data.map((val, index) => (
            <div key={index}>{val?.esic_number}</div>
          ))}
        </DashboardCard>
        <DashboardCard
          title="Director Pan Info"
          className="scrollbar-custom grid max-h-[400px] grid-cols-3 overflow-auto"
        >
          {Mobile360Data?.result?.director_pan_info?.data.map((val, index) => (
            <div key={index}>{val}</div>
          ))}
        </DashboardCard>
      </div>
    </div>
  );
}
