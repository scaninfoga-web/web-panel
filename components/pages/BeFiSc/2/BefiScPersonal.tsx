import {
  EsicDetailsType,
  Mobile360Type,
  PanAllInOneType,
  ProfileAdvanceType,
} from '@/types/BeFiSc';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import CustomBadge from '../CustomBadge';
import { formatSentence } from '../APIUtils';
import { getValue } from '../CustomBeFiScCard';

interface Props {
  Mobile360Data: Mobile360Type | null;
  PanAllInOneData: PanAllInOneType | null;
  ProfileAdvanceData: ProfileAdvanceType | null;
  EsicsData: EsicDetailsType | null;
}

export default function BefiScPersonal({
  Mobile360Data,
  PanAllInOneData,
  ProfileAdvanceData,
  EsicsData,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-slate-800 bg-slate-900 text-white">
          <CardHeader>
            <CardTitle>User Attributes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-400">PAN Number</p>
                  <p className="font-medium">
                    {getValue(PanAllInOneData?.result?.pan_number)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Aadhaar Number</p>
                  <p className="font-medium">
                    {getValue(PanAllInOneData?.result?.masked_aadhaar)}
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
                  <p className="text-xs text-slate-400">Passport Number</p>
                  <p className="font-medium"></p>
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
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900 text-white">
          <CardHeader>
            <CardTitle>Employee Status</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>

      <Card className="scrollbar-custom overflow-auto border-slate-800 bg-slate-900 text-white">
        <CardHeader>
          <CardTitle>ESIC History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="">
            <TableHeader>
              <TableRow className="border-slate-800">
                <TableHead className="text-slate-400">IFSC</TableHead>
                <TableHead className="text-slate-400">Name</TableHead>
                <TableHead className="text-slate-400">Mobile</TableHead>
                <TableHead className="text-slate-400">Account Number</TableHead>
                <TableHead className="text-slate-400">Bank Name</TableHead>
                <TableHead className="text-slate-400">Branch Name</TableHead>
                <TableHead className="text-slate-400">UAN Number</TableHead>
                <TableHead className="text-slate-400">ESIC Number</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
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
        </CardContent>
      </Card>
    </div>
  );
}
