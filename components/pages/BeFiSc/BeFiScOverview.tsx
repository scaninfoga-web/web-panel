import React, { useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import {
  Share2,
  Key,
  Globe,
  AlertTriangle,
  LineChart,
  PieChart as PieChartIcon,
} from 'lucide-react';
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
  User2,
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
  IconDeviceSim,
  IconLocation,
  IconMail,
} from '@tabler/icons-react';
import CustomBadge from './sub/CustomBadge';
import { CountScanType } from '@/types/countRequest';
import { Loader } from '@/components/ui/loader';
import { HudsonEmailType } from '@/types/hudson';
import Image from 'next/image';
import { BreachInfoType } from '@/types/BreachInfo';
import { HunterFindType, HunterVerifyType } from '@/types/hunter';
import { JobSeekerType, LeakHunterType } from '@/types/LeakHunter';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { DashboardCard, InfoText } from '../dashboard/components/DashboardCard';
import CustomPopUp from './sub/CustomPopUp';
import {
  formatSentence,
  timeAgo,
} from '@/components/custom/functions/formatUtils';

interface PageProps {
  _1tabLoading: boolean;
  _2tabLoading: boolean;
  deviceDetails: {
    topLogins: string[];
    topPasswords: string[];
    infected_Credentials: string;
    alert: 'Alert' | 'No Alert';
    ip: string;
    computerName: string;
    OS: string;
    dateCompromised: string;
    deviceLogo: 'window' | 'mac' | 'android' | null;
    totalIP: string[];
    totalPassword: string[];
    totalEmail: string[];
    securityScore: number;
    totalBreachFields: number;
  };

  addressesFound: number;
  numbersFound: number;
  ghuntLoading: boolean;
  totalGoogleAccount: number;
  upiLoading: boolean;
  upiData: UPIType | null;
  mobile360Data: Mobile360Type | null;
  lastScanData: CountScanType | null;
  hudsonData: {
    value: string;
    type: string;
    data: HudsonEmailType | null;
  }[];
  LeakPointApi: {
    value: string;
    type: string;
    data: BreachInfoType | null;
  }[];
  HunterVerifyData: {
    value: string;
    type: string;
    data: HunterVerifyType | null;
  }[];
  HunterFindData: {
    value: string;
    type: string;
    data: HunterFindType | null;
  }[];
  leakHunterData: {
    value: string;
    type: string;
    data: LeakHunterType | null;
  }[];
  jobSeekerData: {
    value: string;
    type: string;
    data: JobSeekerType | null;
  }[];
}

export default function BeFiScOverview({
  _1tabLoading,
  _2tabLoading,
  deviceDetails,
  addressesFound,
  numbersFound,
  ghuntLoading,
  totalGoogleAccount,
  upiLoading,
  upiData,
  mobile360Data,
  lastScanData,
  hudsonData,
  HunterVerifyData,
  leakHunterData,
  jobSeekerData,
  HunterFindData,
  LeakPointApi,
}: PageProps) {
  const [totalAccount, setTotalAccount] = useState(0);
  const [totalUpiPlatforms, setTotalUpiPlatforms] = useState(0);

  const breachData = [
    { name: 'Passwords', value: 40 },
    { name: 'Personal Info', value: 30 },
    { name: 'Financial', value: 20 },
    { name: 'Other', value: 10 },
  ];
  const COLORS = ['#10B981', '#3B82F6', '#EF4444', '#F59E0B'];

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
        <div className="grid gap-4 md:grid-cols-2">
          {/* <Card className="border-slate-800 bg-[#0e1421]/30 backdrop-blur-xl text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Profile Info
              </CardTitle>
              <User2 className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="space-y-0.5 pt-2">
                <InfoText
                  value={
                    <CustomBadge
                      value={
                        mobile360Data?.result?.gst_list?.data &&
                        mobile360Data?.result?.gst_list?.data?.length > 0
                          ? 'Business'
                          : 'Personal'
                      }
                    />
                  }
                  label="Profile"
                />
                <InfoText
                  value={<CustomBadge value={isSoleProprietor} />}
                  label="isSoleProprietor"
                />
                <InfoText
                  value={<CustomBadge value={isDirector} />}
                  label="isDirector"
                />
              </div>
              {scoreLoading ? (
                <Loader className="h-16 p-4" />
              ) : (
                <div>
                  <div className="text-2xl font-bold">{securityScore}/100</div>
                  <p
                    className={cn(
                      'text-xs',
                      securityScore < 60 ? 'text-red-500' : 'text-slate-400',
                    )}
                  >
                    {securityScore < 60
                      ? 'Your most of credentials are not secure'
                      : securityScore > 90
                        ? 'Your credentials are secure'
                        : 'Your credentials are almost secure'}
                  </p>
                  <CustomProgress
                    value={securityScore}
                    variant={securityScore < 60 ? 'danger' : 'default'}
                    className="mt-3"
                  />
                </div>
              )}
            </CardContent>
          </Card> */}
          <DashboardCard
            title={
              mobile360Data?.result?.gst_list?.data &&
              mobile360Data?.result?.gst_list?.data?.length > 0
                ? 'Business Profile'
                : 'Personal Profile'
            }
            className="max-h-[300px]"
            icon={<PieChartIcon className="mr-2 h-5 w-5 text-emerald-500" />}
          >
            {_1tabLoading ? (
              <Loader className="h-44 p-4" />
            ) : (
              <div className="flex items-center space-x-16">
                <div className="ml-4 h-40 w-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        stroke="#0f172a"
                        strokeWidth={2}
                        data={breachData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        // label={({ name, value }) => `${name}: ${value}%`}
                        labelLine={false}
                      >
                        {breachData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          border: '1px solid #374151',
                          color: '#E5E7EB',
                        }}
                        itemStyle={{
                          color: '#E5E7EB',
                        }}
                        labelStyle={{
                          color: '#E5E7EB',
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-1">
                  <InfoText
                    value={
                      <span
                        className={cn(
                          'text-xl font-bold',
                          deviceDetails?.securityScore < 60
                            ? 'text-red-500'
                            : 'text-emerald-500',
                        )}
                      >
                        {deviceDetails?.securityScore}
                      </span>
                    }
                    label="Security Score"
                  />
                  <InfoText
                    value={String(deviceDetails?.totalBreachFields)}
                    label="Total Breach Fields"
                  />
                  <InfoText
                    value={String(deviceDetails?.totalPassword?.length)}
                    label="Total Leaked Password"
                  />
                  <InfoText
                    value={String(deviceDetails?.totalIP?.length)}
                    label="Total IP Detected"
                  />
                  <InfoText
                    value={String(deviceDetails?.totalEmail?.length)}
                    label="Total Email Detected"
                  />
                  <InfoText
                    value={String(numbersFound)}
                    label="Total Phone Detected"
                  />
                  <InfoText
                    value={String(addressesFound)}
                    label="Total Addresses Found"
                  />
                </div>
              </div>
            )}
          </DashboardCard>

          <div className="grid grid-cols-2 gap-4 overflow-hidden">
            <Card className="max-h-[300px] border-slate-800 bg-[#0e1421]/30 text-white backdrop-blur-xl">
              {_2tabLoading ? (
                <Loader className="h-44 p-4" />
              ) : (
                <div className="flex flex-col">
                  <CardHeader className="flex max-h-16 flex-row items-center justify-between">
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
                      width={45}
                      height={45}
                      className="rounded-full"
                    />
                  </CardHeader>
                  <CardContent className="flex flex-col space-y-4">
                    <div className="lg:relative lg:-top-6">
                      <div className="pb-1 text-2xl font-bold">
                        {formatSentence(deviceDetails?.computerName)}
                      </div>
                      <div className="flex flex-col text-xs text-slate-400">
                        <span>IP : {formatSentence(deviceDetails?.ip)}</span>
                        <span>OS : {formatSentence(deviceDetails?.OS)}</span>
                        <span>
                          Date Compromised :{' '}
                          {timeAgo(deviceDetails?.dateCompromised)}
                        </span>
                        <p className="whitespace-normal break-words pt-2 text-xs text-slate-400">
                          {deviceDetails?.infected_Credentials}
                        </p>
                      </div>
                      <CustomProgress
                        value={
                          deviceDetails?.topLogins &&
                          deviceDetails?.topLogins?.length > 0
                            ? deviceDetails?.topLogins?.length * 10
                            : 0
                        }
                        className="mt-3"
                        variant={
                          deviceDetails?.topLogins &&
                          deviceDetails?.topLogins?.length > 0
                            ? 'danger'
                            : 'default'
                        }
                      />
                    </div>

                    <CustomPopUp
                      dialogTitle={'Leaked Information'}
                      triggerElement={
                        <Button
                          variant={'ghost'}
                          className="border border-slate-700 p-0 px-0 py-0"
                        >
                          view
                        </Button>
                      }
                      children={
                        <div className="flex w-full space-x-5">
                          <div className="flex flex-col space-y-1">
                            <span className="text-lg font-bold">
                              Top Logins
                            </span>
                            <div className="flex flex-col">
                              {deviceDetails?.topLogins?.map((item, index) => (
                                <span className="text-base" key={index}>
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <span className="text-lg font-bold">
                              Top Passwords
                            </span>
                            <div className="flex flex-col">
                              {deviceDetails?.topPasswords?.map(
                                (item, index) => (
                                  <span className="text-base" key={index}>
                                    {item}
                                  </span>
                                ),
                              )}
                            </div>
                            <div className="flex flex-col">
                              {deviceDetails?.topPasswords?.map(
                                (item, index) => (
                                  <span className="text-base" key={index}>
                                    {item}
                                  </span>
                                ),
                              )}
                            </div>
                          </div>
                        </div>
                      }
                    />
                  </CardContent>
                </div>
              )}
            </Card>
            <Card className="border-slate-800 bg-[#0e1421]/30 text-white backdrop-blur-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Last Real Scan
                </CardTitle>
                <Activity className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent className="-top-8 lg:relative">
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
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-full border-slate-800 bg-[#0e1421]/30 text-white backdrop-blur-xl lg:col-span-2">
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
                  //   name: 'Address Detected',
                  //   status: addressesFound,
                  //   icon: IconMail,
                  //   color: 'text-red-500',
                  //   loading: false,
                  // },
                  // {
                  //   name: 'Email Detected',
                  //   status: deviceDetails?.totalEmail?.length,
                  //   icon: IconMail,
                  //   color: 'text-red-500',
                  //   loading: _1tabLoading,
                  // },
                  // {
                  //   name: 'Alternate Mobile Numbers',
                  //   status: numbersFound,
                  //   icon: IconDeviceSim,
                  //   color: 'text-red-500',
                  //   loading: false,
                  // },
                  {
                    name: 'GST Numbers',
                    status:
                      mobile360Data?.result?.gst_list?.data &&
                      mobile360Data?.result?.gst_list?.data?.length > 0
                        ? mobile360Data?.result?.gst_list?.data?.length
                        : 0,
                    icon: Users,
                    color: 'text-red-500',
                    loading: false,
                  },
                  {
                    name: 'Udyam Numbers',
                    status:
                      mobile360Data?.result?.msme_info?.data &&
                      mobile360Data?.result?.msme_info?.data?.length > 0
                        ? mobile360Data?.result?.msme_info?.data?.length
                        : 0,
                    icon: Users,
                    color: 'text-red-500',
                    loading: false,
                  },
                  {
                    name: 'ESIC Info',
                    status:
                      mobile360Data?.result?.esic_info?.data?.length || 0 > 0
                        ? 'Found'
                        : 'Not Found',
                    icon: Users,
                    color: 'text-red-500',
                    loading: false,
                  },
                  {
                    name: 'EPFO Info',
                    status:
                      mobile360Data?.result?.epfo_info?.data?.length || 0 > 0
                        ? 'Found'
                        : 'Not Found',
                    icon: Users,
                    color: 'text-red-500',
                    loading: false,
                  },
                  {
                    name: 'IEC Info',
                    status:
                      mobile360Data?.result?.iec_list?.data?.length || 0 > 0
                        ? 'Found'
                        : 'Not Found',
                    icon: Users,
                    color: 'text-red-500',
                    loading: false,
                  },
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
                  {
                    name: 'LPG Connections',
                    status: mobile360Data?.result?.lpg_info?.data?.length || 0,
                    icon: Info,
                    color: 'text-emerald-500',
                    loading: false,
                  },
                  {
                    name: 'WhatsApp Data',
                    status: 'Secure',
                    icon: MessageSquare,
                    color: 'text-emerald-500',
                    loading: false,
                  },
                  {
                    name: 'Gmail Data',
                    status: hudsonData?.length > 0 ? 'Warning' : 'Secure',
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

        <Card className="border-slate-800 bg-[#0e1421]/30 text-white backdrop-blur-xl">
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
                    mobile360Data?.result?.whatsapp_info?.data?.status ===
                    'Account Found'
                      ? 'default'
                      : 'danger'
                  }
                >
                  <IconBrandWhatsapp className="size-4" />
                  {mobile360Data?.result?.whatsapp_info?.data?.status ===
                  'Account Found'
                    ? 'Active'
                    : 'Inactive'}
                </Badge>
              </div>
              <div className="flex justify-between">
                <p className="text-sm font-semibold text-slate-400">
                  Whatsapp Business Account
                </p>
                <CustomBadge
                  value={
                    mobile360Data?.result?.whatsapp_info?.data?.is_business ===
                    '0'
                      ? 'No'
                      : 'Yes'
                  }
                />
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
