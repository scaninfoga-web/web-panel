'use client';
import DashboardTitle from '@/components/common/DashboardTitle';
import { SearchBar2 } from '@/components/search/SearchBar2';
import { useEffect, useRef, useState } from 'react';
import axios, { Axios, AxiosError } from 'axios';
import { toast } from 'sonner';
import CustomCheckBox from '@/components/checkbox';
import {
  Mobile360Type,
  VerifyUdyamType,
  GstVerificationAdvanceType,
  GstTurnoverType,
  ProfileAdvanceType,
  EsicDetailsType,
  MobileToAccountNumberType,
  EquifaxV3Type,
  PanAllInOneType,
  UPIType,
} from '@/types/BeFiSc';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

import Mobile360 from './Mobile360';
import VerifyUdyam from './VerifyUdyam';
import BeFiScLoadingSkeleton from './BeFiScLoadingSkeleton';
import GSTAdvance from './GSTAdvance';
import GstTurnover from './GstTurnover';
import ProfileAdvance from './ProfileAdvance';
import Esics from './Esics';
import MobileToAccountNumber from './MobileToAccount';
import EquifaxV3 from './EquiFaxV3';
import PanAllInOne from './PanAllInOne';
import { motion } from 'framer-motion';
import UpiDetails from './UpiDetails';

function isValidIndianMobileNumber(input: string): boolean {
  const mobileRegex = /^(?:\+91[\-\s]?)?[6-9]\d{9}$/;
  return mobileRegex.test(input.trim());
}

export default function BeFiSc() {
  const [searchType, setSearchType] = useState<string>('');
  const [activeTab, setActiveTab] = useState('overview');

  const [mobileNo, setMobileNo] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef<string | null | number>(null);
  const [isRealtime, setisRealtime] = useState(false);
  const [mobile360Data, setMobile360Data] = useState<Mobile360Type | null>(
    null,
  );
  const [verifyUdyamLoading, setVerifyUdyamLoading] = useState(false);
  const [verfiyUdyamData, setVerfiyUdyamData] =
    useState<VerifyUdyamType | null>(null);

  const [gstAdvanceLoading, setGstAdvanceLoading] = useState(false);
  const [gstAdvanceData, setGstAdvanceData] =
    useState<GstVerificationAdvanceType | null>(null);

  const [gstTurnoverLoading, setGstTurnoverLoading] = useState(false);
  const [gstTurnoverData, setGstTurnoverData] =
    useState<GstTurnoverType | null>(null);

  const [profileAdvanceLoading, setProfileAdvanceLoading] = useState(false);
  const [profileAdvanceData, setProfileAdvanceData] =
    useState<ProfileAdvanceType | null>(null);

  const [esicsLoading, setEsicsLoading] = useState(false);
  const [esicsData, setEsicsData] = useState<EsicDetailsType | null>(null);

  const [mobileToAccountLoading, setMobileToAccountLoading] = useState(false);
  const [mobileToAccountData, setMobileToAccountData] =
    useState<MobileToAccountNumberType | null>(null);

  const [EquifaxV3Loading, setEquifaxV3Loading] = useState(false);
  const [EquifaxV3Data, setEquifaxV3Data] = useState<EquifaxV3Type | null>(
    null,
  );

  const [panAllInOneLoading, setPanAllInOneLoading] = useState(false);
  const [panAllInOneData, setPanAllInOneData] =
    useState<PanAllInOneType | null>(null);

  const [upiDetailsLoading, setUpiDetailsLoading] = useState(false);
  const [upiDetailsData, setUpiDetailsData] = useState<UPIType | null>(null);

  const setAllOnLoading = () => {
    setIsLoading(true);
    setVerifyUdyamLoading(true);
    setGstAdvanceLoading(true);
    setGstTurnoverLoading(true);
    setProfileAdvanceLoading(true);
    setEsicsLoading(true);
    setMobileToAccountLoading(true);
    setEquifaxV3Loading(true);
    setPanAllInOneLoading(true);
    setUpiDetailsLoading(true);
  };
  const clearOldData = () => {
    setMobile360Data(null);
    setVerfiyUdyamData(null);
    setGstAdvanceData(null);
    setGstTurnoverData(null);
    setProfileAdvanceData(null);
    setEsicsData(null);
    setMobileToAccountData(null);
    setEquifaxV3Data(null);
    setPanAllInOneData(null);
    setUpiDetailsData(null);
  };

  const setAllOffLoading = () => {
    setIsLoading(false);
    setVerifyUdyamLoading(false);
    setGstAdvanceLoading(false);
    setGstTurnoverLoading(false);
    setProfileAdvanceLoading(false);
    setEsicsLoading(false);
    setMobileToAccountLoading(false);
    setEquifaxV3Loading(false);
    setPanAllInOneLoading(false);
    setUpiDetailsLoading(false);
  };

  useEffect(() => {
    if (mobile360Data) {
      const callOtherAPIs = async () => {
        // profile advance
        try {
          const { data: ProfileAdvanceResponse } = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mobile/profileadvance`,
            { mobile_number: mobileNo, realtimeData: isRealtime },
          );
          if (
            Number(ProfileAdvanceResponse.responseData?.status) === 1 ||
            Number(ProfileAdvanceResponse.responseData?.status) === 2
          ) {
            setProfileAdvanceData(ProfileAdvanceResponse.responseData);
          }
          setProfileAdvanceLoading(false);
          const panNumber =
            ProfileAdvanceResponse.responseData.result?.document_data?.pan[0]
              .value;
          const bankName =
            mobile360Data?.result?.digital_payment_id_info?.data?.name;
          if (panNumber && bankName) {
            try {
              const { data: EquifaxData } = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mobile/equifaxv3`,
                {
                  mobile: mobileNo,
                  name: bankName,
                  id_type: 'pan',
                  id_number: panNumber,
                  realtimeData: isRealtime,
                },
              );
              if (
                EquifaxData.responseData?.status === 1 ||
                EquifaxData.responseData?.status === 2
              ) {
                setEquifaxV3Data(EquifaxData.responseData);
              }
            } catch (error) {
              if (error instanceof AxiosError) {
                toast.error(
                  'Equifax Data Not Found' +
                    error.response?.data?.responseStatus?.message,
                  { id: toastRef.current! },
                );
              }
            }

            // calling panAllInone
            try {
              const { data: panAllInOne } = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mobile/panallinone`,
                {
                  pan_number: panNumber,
                  realtimeData: isRealtime,
                },
              );
              if (
                panAllInOne.responseData?.status === 1 ||
                panAllInOne.responseData?.status === 2
              ) {
                setPanAllInOneData(panAllInOne.responseData);
                console.log('panAllInOne', panAllInOne.responseData);
              }
            } catch (error) {
              if (error instanceof AxiosError) {
                toast.error(
                  'Pan All In One Data Not Found' +
                    error.response?.data?.responseStatus?.message,
                  { id: toastRef.current! },
                );
              }
            }
            setPanAllInOneLoading(false);
          }
          setEquifaxV3Loading(false);
        } catch (error) {
          if (error instanceof AxiosError) {
            toast.error(
              'Profile advance Data Not Found ' +
                error.response?.data?.responseStatus?.message,
              { id: toastRef.current! },
            );
          }
          setEquifaxV3Loading(false);
          setProfileAdvanceLoading(false);
        }

        // epicsInfo
        const EsicsArray = mobile360Data.result?.key_highlights?.esic_number;
        console.log('EsicsArray', EsicsArray);
        if (EsicsArray?.length > 0) {
          try {
            const { data: EsicsInfo } = await axios.post(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mobile/esicsearch`,
              { esic_number: EsicsArray[0], realtimeData: isRealtime },
            );
            if (
              Number(EsicsInfo.responseData?.status) === 1 ||
              Number(EsicsInfo.responseData?.status) === 2
            ) {
              setEsicsData(EsicsInfo.responseData);
            }
            setEsicsLoading(false);
          } catch (error) {
            if (error instanceof AxiosError) {
              toast.error(
                'Esics Data Not Found ' +
                  error.response?.data?.responseStatus?.message,
                { id: toastRef.current! },
              );
            }
            setEsicsLoading(false);
          }
        }

        // get verify udyam data
        try {
          const udyamNumberArray =
            mobile360Data.result.key_highlights?.udyam_numbers;

          if (udyamNumberArray?.length > 0) {
            const { data: UdyamData } = await axios.post(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mobile/verifyudyam`,
              {
                registration_no: udyamNumberArray[0],
                realtimeData: isRealtime,
              },
            );
            if (Number(UdyamData.responseData?.status) === 1) {
              setVerfiyUdyamData(UdyamData.responseData);
            }
            setVerifyUdyamLoading(false);
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            toast.error(
              'Udyam Number Not Found ' +
                error.response?.data?.responseStatus?.message,
              { id: toastRef.current! },
            );
          }
          setVerifyUdyamLoading(false);
        }

        // get gst advance data
        try {
          const gstAdvanceNumberArray =
            mobile360Data.result?.key_highlights?.gst_numbers;

          if (gstAdvanceNumberArray?.length > 0) {
            const { data: GSTDATA } = await axios.post(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mobile/gstadvance`,
              { gst_no: gstAdvanceNumberArray[0], realtimeData: isRealtime },
            );
            if (Number(GSTDATA.responseData?.status) === 1) {
              setGstAdvanceData(GSTDATA.responseData);
            }
            setGstAdvanceLoading(false);

            // calling gst turnover api
            const { data: GstTurnover } = await axios.post(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mobile/gstturnover`,
              {
                gst_no: gstAdvanceNumberArray[0],
                realtimeData: isRealtime,
                year: '2024-25',
              },
            );

            if (
              Number(GstTurnover.responseData?.status) === 1 ||
              Number(GstTurnover.responseData?.status) === 2
            ) {
              setGstTurnoverData(GstTurnover.responseData);
            }
            setGstTurnoverLoading(false);
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            toast.error(
              'GST Turnover Not Found' +
                error.response?.data?.responseStatus?.message,
              { id: toastRef.current! },
            );
          }
          setGstAdvanceLoading(false);
          setGstTurnoverLoading(false);
        }

        // calling upi details
        try {
          const { data: UpiDetails } = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mobile/digitalpayment`,
            {
              mobile_number: mobileNo,
              realtimeData: isRealtime,
            },
          );
          if (UpiDetails.responseStatus?.status === true) {
            setUpiDetailsData(UpiDetails);
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            toast.error(
              'Mobile To Account ' +
                error.response?.data?.responseStatus?.message,
              { id: toastRef.current! },
            );
          }
        }
        setUpiDetailsLoading(false);

        try {
          const { data: ActDetails } = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mobile/getAcDtlsFromMobNo`,
            {
              mobile_number: mobileNo,
              realtimeData: isRealtime,
            },
          );
          if (ActDetails.responseData?.status === 1) {
            setMobileToAccountData(ActDetails.responseData);
          }
          setMobileToAccountLoading(false);
        } catch (error) {
          if (error instanceof AxiosError) {
            toast.error(
              'Mobile To Account ' +
                error.response?.data?.responseStatus?.message,
              { id: toastRef.current! },
            );
          }
        }
        setAllOffLoading();
        setisRealtime(false);
      };
      callOtherAPIs();
    }
  }, [mobile360Data, mobileNo, isRealtime]);

  const handleSearch = async (query: string, searchFilter: string) => {
    clearOldData();
    if (query.length < 1) {
      return;
    }
    const validation = isValidIndianMobileNumber(query);
    if (!validation) {
      toast.error('Invalid mobile number', { duration: 800 });
      return;
    }
    setMobileNo(query);
    setAllOnLoading();
    let mobile360R: null | {
      responseData: Mobile360Type;
    } = null;
    try {
      const toastId = toast.loading('fetching data...');
      toastRef.current = toastId;
      let mobile360ResponseMessage = null;
      const MAXDURATION = 2 * 60 * 1000;
      const RETRYINTERVAL = 5000;
      const startTime = Date.now();

      const tryFetch = async () => {
        toast.loading('fetching data...', {
          id: toastId,
        });
        try {
          const { data: Mobile360Data } = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mobile/getMobile360Dtls`,
            { mobile_number: query, realtimeData: isRealtime },
          );

          if (Number(Mobile360Data.responseData?.status) === 1) {
            setMobile360Data(Mobile360Data.responseData);
            mobile360R = Mobile360Data;
            mobile360ResponseMessage = Mobile360Data?.responseStatus?.message;
            return true;
          }
          mobile360R = null;
          return false;
        } catch (error) {
          console.log(error);
          if (error instanceof AxiosError) {
            mobile360ResponseMessage =
              error.response?.data?.responseStatus?.message;
            if (
              mobile360ResponseMessage ===
              'No data found in database for this mobile number'
            ) {
              toast.error('Mobile number not found in the database', {
                id: toastId,
              });
              return true;
            }
          }
          return false;
        }
      };

      const retryUntilSuccess = async () => {
        return new Promise<void>((resolve) => {
          const attempt = async () => {
            const success = await tryFetch();

            if (success || Date.now() - startTime >= MAXDURATION) {
              if (!success)
                toast.error('Server Timeout. Try again after some time', {
                  id: toastId,
                });
              setIsLoading(false);
              resolve(); // Exit the loop
            } else {
              toast.loading('API server is not responding', {
                id: toastId,
              });
              setTimeout(attempt, RETRYINTERVAL);
            }
          };
          attempt();
        });
      };

      await retryUntilSuccess();
      if (!mobile360R) {
        // toast.error('Server timeout. Please try again later.', { id: toastId });
        return;
      } else {
        toast.success(`${mobile360ResponseMessage}`, { id: toastId });
      }
      setIsLoading(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.responseStatus?.message);
        setIsLoading(false);
        setAllOffLoading();
        return;
      }
      toast.error('Something went wrong');
      setIsLoading(false);
      setAllOffLoading();
    }
  };

  const searchFilterOptions = [{ label: 'Mobile No', value: 'mobileNumber' }];

  return (
    <div className="space-y-4">
      <DashboardTitle
        title="Scaninfoga Intelligence"
        subTitle="Get the info you are looking for"
      />
      <SearchBar2
        searchFilterOptions={searchFilterOptions}
        selectedFilter="mobileNumber"
        onSearch={handleSearch}
      />
      {/* checkbox */}
      <div className="flex w-full items-center justify-center">
        <CustomCheckBox
          title="Want realtime data? This costs you extra credits!!!"
          checked={isRealtime}
          setChecked={setisRealtime}
        />
      </div>

      {isLoading ? (
        <div className="mt-8">
          <BeFiScLoadingSkeleton />
        </div>
      ) : mobile360Data ? (
        <div className="grid grid-cols-1 gap-4 pb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Tabs
              value={activeTab}
              className="w-full"
              onValueChange={setActiveTab}
            >
              <TabsList className="grid h-auto w-full grid-cols-7 rounded-lg border border-slate-800 bg-slate-900 p-1 text-white sm:w-auto sm:grid-cols-7">
                <TabsTrigger
                  value="overview"
                  className="rounded-md data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-500"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="simTrace"
                  className="rounded-md data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-500"
                >
                  Profile Advance
                </TabsTrigger>
                <TabsTrigger
                  value="personal"
                  className="rounded-md data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-500"
                >
                  Personal
                </TabsTrigger>
                <TabsTrigger
                  value="financial"
                  className="rounded-md data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-500"
                >
                  Financial
                </TabsTrigger>
                <TabsTrigger
                  value="business"
                  className="rounded-md data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-500"
                >
                  Business
                </TabsTrigger>
                <TabsTrigger
                  value="digitalInfo"
                  className="rounded-md data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-500"
                >
                  Digital Info
                </TabsTrigger>
                <TabsTrigger
                  value="breachInfo"
                  className="rounded-md data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-500"
                >
                  Breach Info
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                {mobile360Data && <Mobile360 data={mobile360Data} />}
              </TabsContent>

              <TabsContent value="simTrace" className="mt-6">
                {profileAdvanceLoading ? (
                  <BeFiScLoadingSkeleton />
                ) : (
                  <ProfileAdvance ProfileAdvanceData={profileAdvanceData} />
                )}
              </TabsContent>
              <TabsContent value="personal" className="mt-6">
                {panAllInOneLoading ? (
                  <BeFiScLoadingSkeleton />
                ) : (
                  <PanAllInOne PanAllInOneData={panAllInOneData} />
                )}
                {esicsLoading ? (
                  <BeFiScLoadingSkeleton />
                ) : (
                  <Esics EsicsData={esicsData} />
                )}
              </TabsContent>
              <TabsContent value="financial" className="mt-6">
                {verifyUdyamLoading ? (
                  <BeFiScLoadingSkeleton />
                ) : (
                  <VerifyUdyam verfiyUdyamData={verfiyUdyamData} />
                )}
                {mobileToAccountLoading ? (
                  <BeFiScLoadingSkeleton />
                ) : (
                  <MobileToAccountNumber
                    MobileToAccountNumberData={mobileToAccountData}
                  />
                )}
              </TabsContent>
              <TabsContent value="business" className="mt-6">
                {gstAdvanceLoading ? (
                  <BeFiScLoadingSkeleton />
                ) : (
                  <GSTAdvance GstAdvanceData={gstAdvanceData} />
                )}
                {EquifaxV3Loading ? (
                  <BeFiScLoadingSkeleton />
                ) : (
                  <EquifaxV3 EquifaxV3Data={EquifaxV3Data} />
                )}
                {gstTurnoverLoading ? (
                  <BeFiScLoadingSkeleton />
                ) : (
                  <GstTurnover GstTurnoverData={gstTurnoverData} />
                )}
              </TabsContent>
              <TabsContent value="digitalInfo" className="mt-6">
                {upiDetailsLoading ? (
                  <BeFiScLoadingSkeleton />
                ) : (
                  <UpiDetails UpiData={upiDetailsData} />
                )}
              </TabsContent>
              <TabsContent value="breachInfo" className="mt-6"></TabsContent>
            </Tabs>
          </motion.div>
        </div>
      ) : null}
    </div>
  );
}
