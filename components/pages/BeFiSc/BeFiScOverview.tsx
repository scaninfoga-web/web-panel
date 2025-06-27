import React, { useEffect, useState } from 'react';
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
  Activity,
  CreditCard,
  FileText,
  Info,
  Laptop2,
  Lock,
  Mail,
  MessageSquare,
  Phone,
  Shield,
  ShieldAlert,
  User,
  Users,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CustomProgress } from '@/components/ui/custom-progress';
import { Mobile360Type, UPIType } from '@/types/BeFiSc';
import {
  IconBrandWhatsapp,
  IconBuildingBank,
  IconLocation,
} from '@tabler/icons-react';
import CustomBadge from './sub/CustomBadge';
import { formatSentence, timeAgo } from './sub/APIUtils';
import { CountScanType } from '@/types/countRequest';
import { Loader } from '@/components/ui/loader';
import { HudsonEmailType } from '@/types/hudson';
import Image from 'next/image';

interface PageProps {
  ghuntLoading: boolean;
  lptConnection: number;
  totalGoogleAccount: number;
  upiLoading: boolean;
  upiData: UPIType | null;
  mobile360Data: Mobile360Type | null;
  lastScanData: CountScanType | null;
  hudsonEmailData: {
    value: string;
    type: string;
    data: HudsonEmailType | null;
  }[];
}

export default function BeFiScOverview({
  lptConnection,
  ghuntLoading,
  totalGoogleAccount,
  upiLoading,
  upiData,
  mobile360Data,
  lastScanData,
  hudsonEmailData,
}: PageProps) {
  const [totalAccount, setTotalAccount] = useState(0);
  const [totalUpiPlatforms, setTotalUpiPlatforms] = useState(0);
  const [deviceDetails, setDeviceDetails] = useState<{
    alert: 'Alert' | 'No Alert';
    ip: string;
    computerName: string;
    OS: string;
    dateCompromised: string;
    deviceLogo: 'window' | 'mac' | 'android' | null;
  }>({
    alert: 'No Alert',
    ip: '',
    computerName: '',
    OS: '',
    dateCompromised: '',
    deviceLogo: null,
  });

  useEffect(() => {
    if (hudsonEmailData.length > 0) {
      let isAlert = false;
      hudsonEmailData.forEach((item) => {
        if (
          item?.data?.responseData?.stealers &&
          item?.data?.responseData?.stealers?.length > 0 &&
          item?.data?.responseData?.stealers?.map((steal) => {
            isAlert = true;
            if (steal?.computer_name && steal?.computer_name?.length > 2) {
              let deviceLogo: 'window' | 'mac' | 'android' | null = null;
              if (steal?.operating_system?.toLowerCase().includes('mac')) {
                deviceLogo = 'mac';
              }
              if (steal?.operating_system?.toLowerCase().includes('window')) {
                deviceLogo = 'window';
              }
              if (steal?.operating_system?.length > 2 && !deviceLogo) {
                deviceLogo = 'android';
              }
              setDeviceDetails({
                ...deviceDetails,
                alert: 'Alert',
                ip: steal?.ip,
                deviceLogo,
                computerName: steal?.computer_name,
                OS: steal?.operating_system,
                dateCompromised: steal?.date_compromised,
              });
            }
          })
        )
          return;
      });
    }
  }, [hudsonEmailData]);

  useEffect(() => {
    if (upiData?.responseData) {
      let count = 0;
      let upiCount = 0;
      const bankname: string[] = [];
      const upiPlatforms: string[] = [];
      Object.entries(upiData.responseData).map(([upiId, data]) => {
        const nameAndBank = data.data?.result?.bank
          ?.trim()
          .replace(/\s+/g, '')
          .toLowerCase();
        const platForm = data?.platform
          ?.trim()
          .replace(/\s+/g, '')
          .toLowerCase();
        if (data.success) {
          if (!bankname.includes(nameAndBank)) {
            count++;
            bankname?.push(nameAndBank);
          }
          if (!upiPlatforms.includes(platForm)) {
            upiCount++;
            upiPlatforms.push(platForm);
          }
        }
      });
      setTotalAccount(count);
      setTotalUpiPlatforms(upiCount);
    }
  }, [upiData]);

  return (
    <motion.div className="flex flex-col gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-slate-800 bg-slate-900 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Security Score
              </CardTitle>
              <ShieldAlert className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78/100</div>
              <p className="text-xs text-slate-400">3 issues need attention</p>
              <CustomProgress value={78} className="mt-3" />
            </CardContent>
          </Card>
          <Card className="border-slate-800 bg-slate-900 text-white">
            <CardHeader className="relative bottom-2 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">
                Infected Device
              </CardTitle>
              <Image
                src={
                  deviceDetails?.deviceLogo
                    ? `/${deviceDetails?.deviceLogo}.png`
                    : '/null.png'
                }
                alt="dv"
                width={40}
                height={40}
                className="rounded-full"
              />
            </CardHeader>
            <CardContent className="relative bottom-8">
              <div className="text-2xl font-bold">
                {formatSentence(deviceDetails?.computerName)}
              </div>
              <div className="flex flex-col text-xs text-slate-400">
                <span>IP : {formatSentence(deviceDetails?.ip)}</span>
                <span>OS : {formatSentence(deviceDetails?.OS)}</span>
                <span>
                  Date Compromised : {timeAgo(deviceDetails?.dateCompromised)}
                </span>
              </div>
              <CustomProgress value={25} className="mt-3" variant="danger" />
            </CardContent>
          </Card>
          <Card className="border-slate-800 bg-slate-900 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Infected Credentials
              </CardTitle>
              <Users className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-slate-400">All accounts secure</p>
              <CustomProgress value={100} className="mt-3" />
            </CardContent>
          </Card>
          <Card className="border-slate-800 bg-slate-900 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Last Real Scan
              </CardTitle>
              <Activity className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {timeAgo(
                  lastScanData?.responseData?.last_updated_at ||
                    Date.now().toString(),
                )}
              </div>
              <p className="text-xs text-slate-400">
                Total Scans {lastScanData?.responseData?.call_count || '--'}
              </p>
              {lastScanData?.responseData?.call_count && (
                <CustomProgress
                  value={
                    lastScanData?.responseData?.call_count > 100
                      ? lastScanData?.responseData?.call_count / 10
                      : lastScanData?.responseData?.call_count
                  }
                  className="mt-3"
                />
              )}
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full border-slate-800 bg-slate-900 text-white lg:col-span-2">
          <CardHeader>
            <CardTitle>Security Overview</CardTitle>
            <CardDescription className="text-slate-400">
              Summary of your security status across all monitored data points
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-auto">
            <div className="scrollbar-custom h-[300px] pr-4">
              <div className="grid gap-4">
                {[
                  {
                    name: 'Accounts Detected',
                    status: totalAccount,
                    icon: IconBuildingBank,
                    color: 'text-emerald-500',
                    loading: upiLoading,
                  },
                  {
                    name: 'UPI Platforms',
                    status: totalUpiPlatforms,
                    icon: IconBuildingBank,
                    color: 'text-emerald-500',
                    loading: upiLoading,
                  },
                  // {
                  //   name: 'Employee Status',
                  //   status: 'Verified',
                  //   icon: Users,
                  //   color: 'text-emerald-500',
                  //   loading: true,
                  // },
                  // {
                  //   name: 'ESIC History',
                  //   status: 'Complete',
                  //   icon: FileText,
                  //   color: 'text-emerald-500',
                  //   loading: false,
                  // },
                  {
                    name: 'Google Account',
                    status: totalGoogleAccount,
                    icon: Mail,
                    color: 'text-amber-500',
                    loading: ghuntLoading,
                  },
                  {
                    name: 'Infected Credentials',
                    status: deviceDetails.alert,
                    icon: ShieldAlert,
                    color: 'text-red-500',
                    loading: false,
                  },
                  // {
                  //   name: 'Info Stealer Intelligence',
                  //   status: 'Secure',
                  //   icon: Shield,
                  //   color: 'text-emerald-500',
                  //   loading: false,
                  // },
                  {
                    name: 'LPG Connections',
                    status: lptConnection,
                    icon: Info,
                    color: 'text-emerald-500',
                    loading: false,
                  },
                  // {
                  //   name: 'Mobile Email Detection',
                  //   status: 'Secure',
                  //   icon: Mail,
                  //   color: 'text-emerald-500',
                  //   loading: false,
                  // },
                  // {
                  //   name: 'Mobile Details',
                  //   status: 'Secure',
                  //   icon: Phone,
                  //   color: 'text-emerald-500',
                  //   loading: false,
                  // },
                  // {
                  //   name: 'Multiple UPI IDs',
                  //   status: 'Warning',
                  //   icon: CreditCard,
                  //   color: 'text-amber-500',
                  // },
                  // {
                  //   name: 'UAN Passbook',
                  //   status: 'Secure',
                  //   icon: FileText,
                  //   color: 'text-emerald-500',
                  //   loading: false,
                  // },
                  // {
                  //   name: 'User Attributes',
                  //   status: 'Secure',
                  //   icon: User,
                  //   color: 'text-emerald-500',
                  //   loading: false,
                  // },
                  {
                    name: 'WhatsApp Data',
                    status: 'Secure',
                    icon: MessageSquare,
                    color: 'text-emerald-500',
                    loading: false,
                  },
                  {
                    name: 'Gmail Data',
                    status: 'Warning',
                    icon: Mail,
                    color: 'text-amber-500',
                  },
                ].map((item, index) => {
                  return item.loading ? (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.03 }}
                      className="flex max-h-14 items-center justify-between rounded-lg border border-slate-800 bg-slate-950/50 p-3 pr-4"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`rounded-full bg-slate-800 p-2 ${item.color}`}
                        >
                          <item.icon className="h-4 w-4" />
                        </div>
                        <span>{item.name}</span>
                      </div>
                      <Loader loaderStyle="h-5 w-5" className="max-w-20 p-0" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.03 }}
                      className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/50 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`rounded-full bg-slate-800 p-2 ${item.color}`}
                        >
                          <item.icon className="h-4 w-4" />
                        </div>
                        <span>{item.name}</span>
                      </div>
                      <CustomBadge value={item?.status} />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-800 bg-slate-900 text-white">
          <CardHeader>
            <CardTitle>Number Details</CardTitle>
          </CardHeader>
          <CardContent className="overflow-auto">
            <div className="scrollbar-custom h-[300px] pr-4">
              <div className="flex justify-between">
                <p className="text-sm font-semibold text-slate-400">
                  Number Active
                </p>
                <CustomBadge
                  value={mobile360Data?.result?.telco_info?.data?.is_valid}
                />
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-semibold text-slate-400">Country</p>
                <div className="my-0.5 pr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 900 600"
                  >
                    <rect width="900" height="200" fill="#FF9933" />
                    <rect y="200" width="900" height="200" fill="#FFFFFF" />
                    <rect y="400" width="900" height="200" fill="#138808" />
                    <circle
                      cx="450"
                      cy="300"
                      r="60"
                      stroke="#000080"
                      stroke-width="4"
                      fill="none"
                    />
                    <g
                      transform="translate(450,300)"
                      stroke="#000080"
                      stroke-width="2"
                    >
                      <line x1="0" y1="-60" x2="0" y2="60" />
                      <line x1="-60" y1="0" x2="60" y2="0" />
                      <line x1="-42.426" y1="-42.426" x2="42.426" y2="42.426" />
                      <line x1="42.426" y1="-42.426" x2="-42.426" y2="42.426" />
                      <line x1="-21.213" y1="-58.094" x2="21.213" y2="58.094" />
                      <line x1="58.094" y1="-21.213" x2="-58.094" y2="21.213" />
                      <line x1="21.213" y1="-58.094" x2="-21.213" y2="58.094" />
                      <line x1="-58.094" y1="-21.213" x2="58.094" y2="21.213" />
                      <line x1="-36.742" y1="-49.499" x2="36.742" y2="49.499" />
                      <line x1="49.499" y1="-36.742" x2="-49.499" y2="36.742" />
                      <line x1="36.742" y1="-49.499" x2="-36.742" y2="49.499" />
                      <line x1="-49.499" y1="-36.742" x2="49.499" y2="36.742" />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-semibold text-slate-400">
                  Country Prefix
                </p>
                <CustomBadge
                  value={
                    mobile360Data?.result?.telco_info?.data
                      ?.current_service_provider?.country_prefix
                  }
                />
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-semibold text-slate-400">
                  isRoaming
                </p>
                <CustomBadge
                  value={mobile360Data?.result?.telco_info?.data?.is_roaming}
                />
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-semibold text-slate-400">
                  Subscriber Status
                </p>
                <CustomBadge
                  value={
                    mobile360Data?.result?.telco_info?.data?.subscriber_status
                  }
                />
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-semibold text-slate-400">
                  Connection Type
                </p>
                <CustomBadge
                  value={
                    mobile360Data?.result?.telco_info?.data?.connection_type
                  }
                />
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-semibold text-slate-400">
                  Current Network Provider
                </p>
                <CustomBadge
                  value={
                    mobile360Data?.result?.telco_info?.data
                      ?.current_service_provider?.network_name
                  }
                />
              </div>

              <div className="flex justify-between">
                <p className="text-sm font-semibold text-slate-400">
                  Current Network Region
                </p>

                <Badge className="mt-1 gap-x-0.5 whitespace-nowrap">
                  <IconLocation className="size-4" />
                  {formatSentence(
                    mobile360Data?.result?.telco_info?.data
                      ?.current_service_provider?.network_region,
                  )}
                </Badge>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-semibold text-slate-400">
                  Current Network Region
                </p>

                <Badge className="mt-1 gap-x-0.5">
                  <IconLocation className="size-4" />
                  {formatSentence(
                    mobile360Data?.result?.telco_info?.data
                      ?.current_service_provider?.network_prefix,
                  )}
                </Badge>
              </div>
              <Separator className="my-2.5 h-0.5 bg-slate-700" />
              <div className="flex justify-between">
                <p className="text-sm font-semibold text-slate-400">
                  Original Network Provider
                </p>
                <CustomBadge
                  value={
                    mobile360Data?.result?.telco_info?.data
                      ?.original_service_provider?.network_name
                  }
                />
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-semibold text-slate-400">
                  Original Network Region
                </p>
                <CustomBadge
                  value={
                    mobile360Data?.result?.telco_info?.data
                      ?.original_service_provider?.network_region
                  }
                />
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-semibold text-slate-400">
                  Original Network Prefix
                </p>

                <CustomBadge
                  value={
                    mobile360Data?.result?.telco_info?.data
                      ?.original_service_provider?.network_prefix
                  }
                />
              </div>
              <Separator className="my-2.5 h-0.5 bg-slate-700" />

              <div className="flex justify-between">
                <p className="text-sm font-semibold text-slate-400">IMSI</p>
                <CustomBadge
                  value={mobile360Data?.result?.telco_info?.data?.msisdn?.imsi}
                />
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-semibold text-slate-400">
                  Ported Telecom
                </p>
                <CustomBadge
                  value={
                    mobile360Data?.result?.mobile_age_info?.data?.ported_telecom
                  }
                />
              </div>
              <Separator className="my-2.5 h-0.5 bg-slate-700" />

              <div className="flex justify-between">
                <p className="text-sm font-semibold text-slate-400">
                  Mobile Age
                </p>
                <CustomBadge
                  value={
                    mobile360Data?.result?.mobile_age_info?.data?.mobile_age
                  }
                />
              </div>

              <div className="flex justify-between">
                <p className="text-sm font-semibold text-slate-400">
                  Whatsapp Account
                </p>
                <Badge
                  className="mt-1 gap-x-0.5"
                  variant={
                    mobile360Data?.result?.whatsapp_info.data.status ===
                    'Account Found'
                      ? 'default'
                      : 'danger'
                  }
                >
                  <IconBrandWhatsapp className="size-4" />
                  {mobile360Data?.result?.whatsapp_info.data.status ===
                  'Account Found'
                    ? 'Active'
                    : 'Inactive'}
                </Badge>
              </div>
              <Separator className="my-2.5 h-0.5 bg-slate-700" />

              <div className="flex justify-between">
                <p className="text-sm font-semibold text-slate-400">
                  Revoke Date
                </p>

                <CustomBadge
                  value={mobile360Data?.result?.revoke_info?.data?.revoke_date}
                />
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-semibold text-slate-400">
                  Revoke Status
                </p>

                <CustomBadge
                  value={
                    mobile360Data?.result?.revoke_info?.data?.revoke_status
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
