'use client';
import CustomCheckBox from '@/components/checkbox';
import DashboardTitle from '@/components/common/DashboardTitle';
import { SearchBar2 } from '@/components/search/SearchBar2';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  EquifaxV3Type,
  EsicDetailsType,
  GstTurnoverType,
  GstVerificationAdvanceType,
  Mobile360Type,
  MobileToAccountNumberType,
  PanAllInOneType,
  ProfileAdvanceType,
  UPIType,
  VerifyUdyamType,
} from '@/types/BeFiSc';
import axios, { AxiosError } from 'axios';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { useSearchParams } from 'next/navigation';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
// @ts-ignore
import {
  cleanAndCapitalize,
  formatSentence,
  numberToIndianRuppe,
} from './APIUtils';
import BeFiScLoadingSkeleton from './BeFiScLoadingSkeleton';
import CustomBadge from './CustomBadge';
import EquifaxV3 from './EquiFaxV3';
import Esics from './Esics';
import GSTAdvance from './GSTAdvance';
import GstTurnover from './GstTurnover';
import MobileToAccountNumber from './MobileToAccount';
import PanAllInOne from './PanAllInOne';
import ProfileAdvance from './ProfileAdvance';
import UpiDetails from './UpiDetails';
import { GhuntData } from '@/types/ghunt';
import GhuntComponent from './Ghunt';
import Mobile360 from './Mobile360';
import { get, post } from '@/lib/api';
import Ghunt from '../ghunt/Ghunt';
import VerifyUdyam from './VerifyUdyam';
import NotFound from '@/components/NotFound';
import ProfileAdvanceMobileToAcc360 from './360ProfileAdvanceMobileToAcc';
import BeFiScFinancial from './360ProfileAdvanceMobileToAcc';
import BefiScPersonal from './2/BefiScPersonal';

function isValidIndianMobileNumber(input: string): boolean {
  const mobileRegex = /^(?:\+91[\-\s]?)?[5-9]\d{9}$/;
  return mobileRegex.test(input.trim());
}

export default function BeFiSc() {
  const searchParams = useSearchParams();
  const mobileNumber = searchParams.get('mobile_number');

  const [searchType, setSearchType] = useState<string>('');
  const [activeTab, setActiveTab] = useState('overview');

  const [mobileNo, setMobileNo] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef<string | null | number>(null);
  const [isRealtime, setisRealtime] = useState(false);
  const [mobile360Data, setMobile360Data] = useState<Mobile360Type | null>(
    null,
  );
  const [ghuntData, setGhuntData] = useState<GhuntData | null>(null);
  const [ghuntLoading, setGhuntLoading] = useState(false);

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
    setGhuntLoading(true);
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
    setGhuntData(null);
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
    setGhuntLoading(false);
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
          // const { data: ProfileAdvanceResponse } = await axios.post(
          //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mobile/profileadvance`,
          //   { mobile_number: mobileNo, realtimeData: isRealtime },
          // );
          const ProfileAdvanceResponse = await post(
            '/api/mobile/profileadvance',
            {
              mobile_number: mobileNo,
              realtimeData: isRealtime,
            },
          );
          if (
            Number(ProfileAdvanceResponse.responseData?.status) === 1 ||
            Number(ProfileAdvanceResponse.responseData?.status) === 2
          ) {
            setProfileAdvanceData(ProfileAdvanceResponse.responseData);
            const emailAddress =
              ProfileAdvanceResponse.responseData?.result?.email?.[0]?.value;
            // calling ghunt api with emailaddess
            try {
              // const { data } = await axios.post(
              //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ghunt/getEmailDetails`,
              //   { email: emailAddress },
              // );
              const data = await post('/api/ghunt/getEmailDetails', {
                email: emailAddress,
              });
              setGhuntData(data.responseData);
              setGhuntLoading(false);
            } catch (error) {
              toast.error('Ghunt Data Not Found', { id: toastRef.current! });
            }
          }
          setProfileAdvanceLoading(false);
          const panNumber =
            ProfileAdvanceResponse.responseData.result?.document_data?.pan[0]
              .value;
          const bankName =
            mobile360Data?.result?.digital_payment_id_info?.data?.name;
          if (panNumber && bankName) {
            try {
              // const { data: EquifaxData } = await axios.post(
              //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mobile/equifaxv3`,
              //   {
              //     mobile: mobileNo,
              //     name: bankName,
              //     id_type: 'pan',
              //     id_number: panNumber,
              //     realtimeData: isRealtime,
              //   },
              // );
              const EquifaxData = await post('/api/mobile/equifaxv3', {
                mobile: mobileNo,
                name: bankName,
                id_type: 'pan',
                id_number: panNumber,
                realtimeData: isRealtime,
              });
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
              // const { data: panAllInOne } = await axios.post(
              //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mobile/panallinone`,
              //   {
              //     pan_number: panNumber,
              //     realtimeData: isRealtime,
              //   },
              // );
              const panAllInOne = await post('/api/mobile/panallinone', {
                pan_number: panNumber,
                realtimeData: isRealtime,
              });
              if (
                panAllInOne.responseData?.status === 1 ||
                panAllInOne.responseData?.status === 2
              ) {
                setPanAllInOneData(panAllInOne.responseData);
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
        setIsLoading(false);

        // epicsInfo
        const EsicsArray = mobile360Data.result?.key_highlights?.esic_number;
        console.log('Esics', EsicsArray);

        if (EsicsArray?.length > 0) {
          try {
            // const { data: EsicsInfo } = await axios.post(
            //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mobile/esicsearch`,
            //   { esic_number: EsicsArray[0], realtimeData: isRealtime },
            // );
            const EsicsInfo = await post('/api/mobile/esicsearch', {
              esic_number: EsicsArray[0],
              realtimeData: isRealtime,
            });
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
            // const { data: UdyamData } = await axios.post(
            //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mobile/verifyudyam`,
            //   {
            //     registration_no: udyamNumberArray[0],
            //     realtimeData: isRealtime,
            //   },
            // );
            const UdyamData = await post('/api/mobile/verifyudyam', {
              registration_no: udyamNumberArray[0],
              realtimeData: isRealtime,
            });
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
            // const { data: GSTDATA } = await axios.post(
            //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mobile/gstadvance`,
            //   { gst_no: gstAdvanceNumberArray[0], realtimeData: isRealtime },
            // );
            const GSTDATA = await post('/api/mobile/gstadvance', {
              gst_no: gstAdvanceNumberArray[0],
              realtimeData: isRealtime,
            });
            if (Number(GSTDATA.responseData?.status) === 1) {
              setGstAdvanceData(GSTDATA.responseData);
            }
            setGstAdvanceLoading(false);

            // calling gst turnover api
            // const { data: GstTurnover } = await axios.post(
            //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mobile/gstturnover`,
            //   {
            //     gst_no: gstAdvanceNumberArray[0],
            //     realtimeData: isRealtime,
            //     year: '2024-25',
            //   },
            // );
            const GstTurnover = await post('/api/mobile/gstturnover', {
              gst_no: gstAdvanceNumberArray[0],
              realtimeData: isRealtime,
              year: '2024-25',
            });

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
          // const { data: UpiDetails } = await axios.post(
          //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mobile/digitalpayment`,
          //   {
          //     mobile_number: mobileNo,
          //     realtimeData: isRealtime,
          //   },
          // );
          const UpiDetails = await post('/api/mobile/digitalpayment', {
            mobile_number: mobileNo,
            realtimeData: isRealtime,
          });
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
          // const { data: ActDetails } = await axios.post(
          //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mobile/getAcDtlsFromMobNo`,
          //   {
          //     mobile_number: mobileNo,
          //     realtimeData: isRealtime,
          //   },
          // );
          const ActDetails = await post('/api/mobile/getAcDtlsFromMobNo', {
            mobile_number: mobileNo,
            realtimeData: isRealtime,
          });
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
  }, [mobile360Data]);

  const handleSearch = async (query: string, searchFilter: string) => {
    clearOldData();
    if (query.length < 1) {
      return;
    }
    query = query
      .normalize('NFKD')
      .replace(/[\u200B-\u200D\uFEFF\u202C\u202D\u202E]/g, '')
      .trim();
    const validation = isValidIndianMobileNumber(query);
    if (!validation) {
      toast.error(`Invalid mobile ${query}`, { duration: 800 });
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
          // const { data: Mobile360Data } = await axios.post(
          //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mobile/getMobile360Dtls`,
          //   { mobile_number: query, realtimeData: isRealtime },
          // );

          // const data = await post(`/api/mobile/getMobile360Dtls`, {mobile_number: query, realtimeData: isRealtime});
          const Mobile360Data = await post('/api/mobile/getMobile360Dtls', {
            mobile_number: query,
            realtimeData: isRealtime,
          });

          if (Number(Mobile360Data.responseData?.status) === 1) {
            setMobile360Data(Mobile360Data.responseData);
            mobile360R = Mobile360Data;
            mobile360ResponseMessage = Mobile360Data?.responseStatus?.message;
            return true;
          }
          mobile360R = null;
          return false;
        } catch (error) {
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
        console.log('INSIDE RETRY UNTIL SYCCESS');
        return new Promise<void>((resolve) => {
          const attempt = async () => {
            const success = await tryFetch();

            console.log('SUCCESS: ', success);

            if (success || Date.now() - startTime >= MAXDURATION) {
              if (!success) {
                toast.error('Server Timeout. Try again after some time', {
                  id: toastId,
                });
                setIsLoading(false);
                setAllOffLoading();
              }
              resolve();
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
        await new Promise((resolve) => setTimeout(resolve, 2000));
        toast.success(`${mobile360ResponseMessage}`, { id: toastId });
      }
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

  const isAdult = () => {
    const currentYear = new Date().getFullYear();
    const age = Number(panAllInOneData?.result?.dob.split('-')[0]);
    if (!age) {
      return false;
    }
    const isAdult = currentYear - age >= 18;
    return isAdult;
  };

  const getImageUrl = (): string => {
    const gender = panAllInOneData?.result?.gender;

    if (isAdult()) {
      if (gender === 'M') {
        return '/male.jpg';
      }
      return '/female.jpg';
    }
    if (gender === 'M') {
      return '/boy.avif';
    }
    return 'female.jpg';
  };

  const firstAddress =
    panAllInOneData?.result?.address.line_1 +
    ' ' +
    panAllInOneData?.result?.address.line_2 +
    ' ' +
    panAllInOneData?.result?.address.city +
    ' ' +
    panAllInOneData?.result?.address.state +
    ' ' +
    panAllInOneData?.result?.address.zip +
    ' ' +
    panAllInOneData?.result?.address.country;

  const secondAddesss =
    profileAdvanceData?.result?.address?.[0]?.detailed_address;
  const OverviewData = [
    {
      title: 'Father Name',
      value: formatSentence(panAllInOneData?.result?.fname),
      titleClassname: '',
      valueClassname: '',
    },
    {
      title: 'Gender',
      value: panAllInOneData?.result?.gender === 'M' ? 'Male' : 'Female',
      titleClassname: '',
      valueClassname: '',
    },
    {
      title: 'Date of Birth',
      value: panAllInOneData?.result?.dob,
      titleClassname: '',
      valueClassname: '',
    },
    {
      title: 'Age',
      value: profileAdvanceData?.result?.personal_information?.age,
      titleClassname: '',
      valueClassname: '',
    },

    {
      title: 'Alternate Number',
      value:
        profileAdvanceData?.result?.alternate_phone?.[0].value ||
        panAllInOneData?.result?.phone_number,
      titleClassname: '',
      valueClassname: '',
    },

    {
      title: 'Income',
      value: numberToIndianRuppe(
        Number(profileAdvanceData?.result?.personal_information?.income),
      ),
      titleClassname: '',
      valueClassname: 'text-yellow-500',
    },
    {
      title: 'PAN Number',
      value: panAllInOneData?.result?.pan_number,
      titleClassname: '',
      valueClassname: 'text-blue-400',
    },
    {
      title: 'Aadhaar Number',
      value: panAllInOneData?.result?.masked_aadhaar,
      titleClassname: '',
      valueClassname: 'text-yellow-500',
    },
    {
      title: 'Email Address',
      value: profileAdvanceData?.result?.email?.[0]?.value.toLowerCase(),
      titleClassname: '',
      valueClassname: '',
    },
  ];

  const searchFilterOptions = [{ label: 'Mobile No', value: 'mobileNumber' }];

  useEffect(() => {
    if (mobileNumber) {
      handleSearch(mobileNumber, 'mobileNumber');
    }
  }, []);

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
        defaultFilter="mobileNumber"
        defaultQuery={mobileNumber || ''}
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
              <TabsList className="grid h-auto w-full grid-cols-2 rounded-lg border border-slate-800 bg-slate-900 p-1 text-white sm:w-auto sm:grid-cols-7 md:grid-cols-8">
                <TabsTrigger
                  value="overview"
                  className="rounded-md data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-500"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="profile"
                  className="rounded-md data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-500"
                >
                  Profile
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
                <TabsTrigger
                  value="googleProfile"
                  className="rounded-md data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-500"
                >
                  Google Profile
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6"></TabsContent>

              <TabsContent value="profile" className="mt-6 space-y-4">
                <div className="grid min-h-[450px] grid-cols-1 gap-6">
                  <Card className="col-span-full border-slate-800 bg-slate-900 text-white lg:col-span-2">
                    <CardHeader>
                      <CardDescription>
                        <div className="flex items-center gap-x-2">
                          <Image
                            src={getImageUrl()}
                            alt="user"
                            width={35}
                            height={35}
                            className="rounded-full border"
                          />
                          <p className="text-2xl font-semibold">
                            {formatSentence(panAllInOneData?.result?.full_name)}
                          </p>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1">
                      <div className="w-full space-y-4">
                        <div className="grid w-full grid-cols-4 gap-4">
                          {OverviewData.map((item, index) => {
                            return (
                              <div key={index} className="flex flex-col gap-2">
                                <p
                                  className={cn(
                                    'text-xs text-slate-400',
                                    item.titleClassname,
                                  )}
                                >
                                  {item.title}
                                </p>
                                <p
                                  className={cn(
                                    'font-medium',
                                    item.valueClassname,
                                  )}
                                >
                                  {item.value}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                        <Separator className="bg-slate-800" />
                        {/* addess live here */}
                        <div className="w-full text-sm font-semibold">
                          {firstAddress.length > 10
                            ? formatSentence(firstAddress)
                            : formatSentence(secondAddesss)}
                        </div>
                        <Separator className="bg-slate-800" />
                        <div className="flex space-x-2">
                          <CustomBadge
                            variantToUse={
                              panAllInOneData?.result?.email
                                ? 'default'
                                : 'danger'
                            }
                            isFormat={false}
                            value={
                              panAllInOneData?.result.email
                                ? `Email Linked with ${panAllInOneData?.result?.pan_number?.toUpperCase()}`
                                : `Email Not Linked with ${cleanAndCapitalize(panAllInOneData?.result?.pan_number.toUpperCase())}`
                            }
                          />
                          <CustomBadge
                            isFormat={false}
                            value={
                              panAllInOneData?.result.aadhaar_linked
                                ? `Aadhaar Linked with ${panAllInOneData?.result?.pan_number?.toUpperCase()}`
                                : `Aadhaar Not Linked with ${cleanAndCapitalize(panAllInOneData?.result?.pan_number.toUpperCase())}`
                            }
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="personal" className="mt-6 space-y-4">
                {/* {panAllInOneLoading ? (
                  <BeFiScLoadingSkeleton />
                ) : (
                  <PanAllInOne PanAllInOneData={panAllInOneData} />
                )}
                {mobile360Data && <Mobile360 data={mobile360Data} />}
                {profileAdvanceLoading ? (
                  <BeFiScLoadingSkeleton />
                ) : (
                  <ProfileAdvance ProfileAdvanceData={profileAdvanceData} />
                )}
                {esicsLoading ? (
                  <BeFiScLoadingSkeleton />
                ) : (
                  <Esics EsicsData={esicsData} />
                )} */}
                <BefiScPersonal
                  Mobile360Data={mobile360Data}
                  ProfileAdvanceData={profileAdvanceData}
                  EsicsData={esicsData}
                  PanAllInOneData={panAllInOneData}
                />
              </TabsContent>
              <TabsContent value="financial" className="mt-6">
                {/* {mobileToAccountLoading ? (
                  <BeFiScLoadingSkeleton />
                ) : (
                  <MobileToAccountNumber
                    MobileToAccountNumberData={mobileToAccountData}
                  />
                )}
                {EquifaxV3Loading ? (
                  <BeFiScLoadingSkeleton />
                ) : (
                  <EquifaxV3 EquifaxV3Data={EquifaxV3Data} />
                )} */}
                {
                  <BeFiScFinancial
                    Mobile360Data={mobile360Data}
                    ProfileAdvance={profileAdvanceData}
                    MobileToAccountData={mobileToAccountData}
                    EquifaxV3Data={EquifaxV3Data}
                  />
                }
              </TabsContent>
              <TabsContent value="business" className="mt-6 space-y-4">
                {gstAdvanceLoading ? (
                  <BeFiScLoadingSkeleton />
                ) : (
                  <GSTAdvance GstAdvanceData={gstAdvanceData} />
                )}
                {gstTurnoverLoading ? (
                  <BeFiScLoadingSkeleton />
                ) : (
                  <GstTurnover GstTurnoverData={gstTurnoverData} />
                )}
                {verifyUdyamLoading ? (
                  <BeFiScLoadingSkeleton />
                ) : (
                  <VerifyUdyam verfiyUdyamData={verfiyUdyamData} />
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
              <TabsContent value="googleProfile" className="mt-6">
                {ghuntLoading ? (
                  <BeFiScLoadingSkeleton />
                ) : ghuntData ? (
                  <Ghunt accountData={ghuntData} />
                ) : (
                  <NotFound value="No Email Found" />
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      ) : null}
    </div>
  );
}
