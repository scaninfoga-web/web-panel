'use client';
// @ts-ignore
import DashboardTitle from '@/components/common/DashboardTitle';
import { SearchBar2 } from '@/components/search/SearchBar2';
import CustomCheckBox from '@/components/sub/checkbox';
import NotFound from '@/components/sub/NotFound';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { get, getClientInfo, post } from '@/lib/api';
import { cn } from '@/lib/utils';
import {
  EquifaxV3Type,
  EsicDetailsType,
  GstTurnoverType,
  GstVerificationAdvanceType,
  Mobile360Type,
  MobileToAccountNumberType,
  MobileToDLAdvanceType,
  PanAllInOneType,
  ProfileAdvanceType,
  UPIType,
  VerifyUdyamType,
} from '@/types/BeFiSc';
import { BreachInfoType } from '@/types/BreachInfo';
import { GhuntData } from '@/types/ghunt';
import { OlaGeoApiType } from '@/types/ola-geo-api';
import { AxiosError } from 'axios';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { DashboardCard } from '../dashboard/components/DashboardCard';
import BeFiScBreachInfo from './BeFiScBreachInfo';
import BeFiScBusiness from './BeFiScBusiness';
import BeFiScFinancial from './BeFiScFinancial';
import BefiScPersonal from './BefiScPersonal';
import BeFiScLoadingSkeleton from './sub/BeFiScLoadingSkeleton';
import CustomBadge from './sub/CustomBadge';
import Ghunt from './sub/Ghunt';
import MapLoading from './sub/MapLoading';
import SentenceLoader from './sub/SentenceLoader';
import { HunterFindType, HunterVerifyType } from '@/types/hunter';
import { PayWorldType } from '@/types/payworld';
import { JobSeekerType, LeakHunterType } from '@/types/LeakHunter';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import BookmarkWidget from './sub/BookmarkWidget';
import { BookMarkOptionScaninFogaIntelligence } from './sub/BookmarkBeFiSc';
import { fetchWalletBalance } from '@/redux/walletSlice';
import BeFiScOverview from './BeFiScOverview';
import { CountScanType } from '@/types/countRequest';
import { HudsonEmailType } from '@/types/hudson';
import {
  getAddressesWithDifferentPincode,
  getOtherEmails,
  getOtherPhoneNumbers,
} from '@/components/custom/functions/befiscUtils';
import {
  cleanAndCapitalize,
  formatSentence,
  numberToIndianRuppe,
} from '@/components/custom/functions/formatUtils';
import BeFiScDigitalFootprint from './BeFiScDigitalFootprint';
import { isValidIndianMobileNumber } from '@/components/custom/functions/checkingUtils';
import { HoleheType } from '@/types/holhe';
import { DarkWebType, ObjectArrayLeakType } from '@/types/dark-web';
import { AddressTracingType } from '@/types/addressTrace';
import { RapidSearchAPIType } from '@/types/rapidAPI';
import { dummy2222 } from './dummy';

export default function BeFiSc() {
  const searchParams = useSearchParams();
  const apiMessage = useRef<string | null>(null);
  const mobileNumber = searchParams.get('mobile_number');
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileNo, setMobileNo] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef<string | null | number>(null);
  const [isRealtime, setisRealtime] = useState(false);
  const [mobile360Data, setMobile360Data] = useState<Mobile360Type | null>(
    null,
  );
  const wallet = useSelector((state: RootState) => state.wallet);
  const dispatch = useDispatch<AppDispatch>();

  const [ghuntMultipleData, setGhuntMultipleData] = useState<GhuntData[]>([]);
  const [ghuntMultipleLoading, setGhuntMultipleLoading] = useState(false);

  const [hudsonData, setHudsonData] = useState<
    {
      value: string;
      type: string;
      data: HudsonEmailType | null;
    }[]
  >([]);

  const [verfiyUdyamData, setVerfiyUdyamData] =
    useState<VerifyUdyamType | null>(null);

  const [gstAdvanceData, setGstAdvanceData] =
    useState<GstVerificationAdvanceType | null>(null);

  const [gstTurnoverData, setGstTurnoverData] =
    useState<GstTurnoverType | null>(null);

  const [profileAdvanceData, setProfileAdvanceData] =
    useState<ProfileAdvanceType | null>(null);

  const [esicsData, setEsicsData] = useState<EsicDetailsType | null>(null);
  const [lastScanData, setlastScanData] = useState<CountScanType | null>(null);
  const [mobileToAccountData, setMobileToAccountData] =
    useState<MobileToAccountNumberType | null>(null);

  const [EquifaxV3Data, setEquifaxV3Data] = useState<EquifaxV3Type | null>(
    null,
  );

  const [panAllInOneData, setPanAllInOneData] =
    useState<PanAllInOneType | null>(null);

  const [upiDetailsLoading, setUpiDetailsLoading] = useState(false);
  const [upiDetailsData, setUpiDetailsData] = useState<UPIType | null>(null);

  const [olaGeoApiLoading, setOlaGeoApiLoading] = useState(false);
  const [olaGeoApiData, setOlaGeoApiData] = useState<OlaGeoApiType | null>(
    null,
  );
  const [otherAddressOlaLoading, setOtherAddressOlaLoading] = useState(false);
  const [otherAdressOlaData, setOtherAdressOlaData] = useState<
    {
      addressData: {
        type: string;
        date_of_reporting: string;
        detailed_address: string;
      };
      olaData: OlaGeoApiType | null;
    }[]
  >([]);

  const [breachInfoLoading, setBreachInfoLoading] = useState(false);
  const [breachInfo, setBreachInfo] = useState<
    {
      value: string;
      type: string;
      data: BreachInfoType | null;
    }[]
  >([]);

  const [hunterVerifyData, setHunterVerifyData] = useState<
    {
      value: string;
      type: string;
      data: HunterVerifyType | null;
    }[]
  >([]);
  const [hunterFindData, setHunterFindData] = useState<
    {
      value: string;
      type: string;
      data: HunterFindType | null;
    }[]
  >([]);
  const [payworldData, setPayworldData] = useState<PayWorldType | null>(null);
  const [leakHunterData, setLeakHunterData] = useState<
    {
      value: string;
      type: string;
      data: LeakHunterType | null;
    }[]
  >([]);
  const [jobSeekerData, setJobSeekerData] = useState<
    {
      value: string;
      type: string;
      data: JobSeekerType | null;
    }[]
  >([]);
  const [holeheData, setHoleheData] = useState<
    {
      value: string;
      type: string;
      data: HoleheType | null;
    }[]
  >([]);
  const [zomatoLeakData, setZomatoLeakData] = useState<
    {
      value: string;
      type: string;
      data: DarkWebType | null;
    }[]
  >([]);
  const [coperateLeakData, setCoperateLeakData] = useState<
    {
      value: string;
      type: string;
      data: DarkWebType | null;
    }[]
  >([]);
  const [cbseLeakData, setcbseLeakData] = useState<
    {
      value: string;
      type: string;
      data: DarkWebType | null;
    }[]
  >([]);
  const [olxLeakData, setolxLeakData] = useState<
    {
      value: string;
      type: string;
      data: ObjectArrayLeakType | null;
    }[]
  >([]);
  const [indiaMartLeakData, setindiaMartLeakData] = useState<
    {
      value: string;
      type: string;
      data: ObjectArrayLeakType | null;
    }[]
  >([]);
  const numbersFoundRef = useRef<number>(0);
  const addressesFound = useRef<number>(0);
  const [_1tabLoading, set_1tabLoading] = useState(false);
  const [_2tabLoading, set_2tabLoading] = useState(false);
  const [deviceDetails, setDeviceDetails] = useState<{
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
  }>({
    topLogins: [],
    topPasswords: [],
    infected_Credentials: '',
    alert: 'No Alert',
    ip: '',
    computerName: '',
    OS: '',
    dateCompromised: '',
    deviceLogo: null,
    totalIP: [],
    totalPassword: [],
    totalEmail: [],
    securityScore: 0,
    totalBreachFields: 0,
  });

  const [ecomAddresses, setECOMAddresses] = useState<AddressTracingType | null>(
    null,
  );
  const [mobileToDLAdvance, setMobileToDLAdvance] =
    useState<MobileToDLAdvanceType | null>(null);

  const [rapidApiData, setRapidApiData] = useState<
    {
      value: string;
      type: string;
      data: RapidSearchAPIType | null;
    }[]
  >([]);

  const setAllOnLoading = () => {
    setIsLoading(true);
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
    setOlaGeoApiData(null);
    setOtherAdressOlaData([]);
    setGhuntMultipleData([]);
    setBreachInfo([]);
    setHunterVerifyData([]);
    setPayworldData(null);
    setLeakHunterData([]);
    setJobSeekerData([]);
    setHudsonData([]);
    numbersFoundRef.current = 0;
    addressesFound.current = 0;
    setDeviceDetails({
      topLogins: [],
      topPasswords: [],
      infected_Credentials: '',
      alert: 'No Alert',
      ip: '',
      computerName: '',
      OS: '',
      dateCompromised: '',
      deviceLogo: null,
      totalIP: [],
      totalPassword: [],
      totalEmail: [],
      securityScore: 0,
      totalBreachFields: 0,
    });
    setHoleheData([]);
    setZomatoLeakData([]);
    setCoperateLeakData([]);
    setcbseLeakData([]);
    setolxLeakData([]);
    setindiaMartLeakData([]);
    setECOMAddresses(null);
    setMobileToDLAdvance(null);
    setRapidApiData([]);
  };

  useEffect(() => {
    set_1tabLoading(true);
    let score = 100;
    let totalEmails: string[] = [];
    let totalPasswords: string[] = [];
    let totalBreachFields = 0;
    let totalIp: string[] = [];

    if (hudsonData?.length > 0) {
      hudsonData?.forEach((item) => {
        if (
          item?.data?.responseData?.total_corporate_services &&
          item?.data?.responseData?.total_user_services > 0
        ) {
        }
        item?.data?.responseData?.stealers?.forEach((steal) => {
          if (steal?.top_logins) {
            score -= steal?.top_logins?.length;
          }
          if (steal?.top_passwords) {
            score -= steal?.top_passwords?.length;
          }
          if (steal?.malware_path && steal?.malware_path?.length > 2) {
            score -= 10;
          }
        });
      });
    }
    if (hunterFindData?.length > 0) {
      hunterFindData?.forEach((item) => {
        if (
          item?.data?.responseData &&
          item?.data?.responseData?.data?.data?.company
        ) {
          score -= 5;
        }
      });
    }
    if (leakHunterData?.length > 0) {
      leakHunterData?.forEach((item) => {
        if (
          item?.data?.responseData?.password &&
          item?.data?.responseData?.password?.length > 0
        ) {
          score -= 10;
          item?.data?.responseData?.password?.map((item) =>
            totalPasswords.push(item),
          );
        }
      });
    }
    if (breachInfo?.length > 0) {
      breachInfo?.forEach((item) => {
        if (item?.value?.includes('@') && !totalEmails.includes(item?.value)) {
          totalEmails.push(item?.value);
        }
        let keysFound = Object.keys(
          item?.data?.responseData?.data?.List || {},
        ).length;
        if (keysFound > 0 && item?.data?.responseData?.data?.List) {
          score -= keysFound;
          totalBreachFields += keysFound;

          Object.entries(item?.data?.responseData?.data?.List).forEach(
            ([_, value]) => {
              value?.Data?.forEach((item) => {
                let email =
                  item?.Email?.toLowerCase()?.replace(/\s/g, '') ||
                  item?.email?.toLowerCase()?.replace(/\s/g, '') ||
                  '';
                let password =
                  item?.Password?.toLowerCase()?.replace(/\s/g, '') ||
                  item?.password?.toLowerCase()?.replace(/\s/g, '') ||
                  '';
                if (email.length > 0 && !totalEmails.includes(email)) {
                  totalEmails.push(email);
                }
                if (password.length > 0 && !totalPasswords.includes(password)) {
                  totalPasswords.push(password);
                }
                if (item?.IP && !totalIp.includes(item?.IP)) {
                  totalIp.push(item?.IP);
                }
              });
            },
          );
        }
      });
    }
    if (jobSeekerData.length > 0) {
      jobSeekerData?.forEach((item) => {
        if (item?.data?.responseData) {
          score -= Object.keys(item?.data?.responseData).length * 5;
        }
      });
    }
    if (hunterVerifyData?.length > 0) {
      hunterVerifyData?.forEach((item) => {
        if (item?.data?.responseData?.data?.data?.sources?.length || 0 > 0) {
          score -=
            (item?.data?.responseData?.data?.data?.sources?.length || 0) * 5;
        }
      });
    }
    if (hudsonData.length > 0) {
      set_2tabLoading(true);
      hudsonData.forEach((item) => {
        if (
          item?.data?.responseData?.stealers &&
          item?.data?.responseData?.stealers?.length > 0 &&
          item?.data?.responseData?.stealers?.map((steal) => {
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
                topPasswords: steal?.top_passwords || [],
                topLogins: steal?.top_logins || [],
                infected_Credentials: steal?.malware_path || '',
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
      set_2tabLoading(false);
    }
    setDeviceDetails((prev) => ({
      ...prev,
      totalIP: totalIp,
      totalPassword: totalPasswords,
      totalEmail: totalEmails,
      securityScore: score,
      totalBreachFields,
    }));
    if (totalIp.length > 0) {
      // calling hudsonIP
      let hudsonDataa: {
        value: string;
        type: string;
        data: HudsonEmailType | null;
      }[] = [];
      // calling hudsonIP

      const fetchByIP = async () => {
        try {
          const results = await Promise.allSettled(
            totalIp.map((ip) =>
              post('/api/hudson/search-by-ip', {
                ip,
                realtimeData: isRealtime,
              }),
            ),
          );
          results.forEach((item, index) => {
            if (item.status === 'fulfilled') {
              hudsonDataa.push({
                value: totalIp[index],
                type: 'Breach IP',
                data: item.value,
              });
            }
          });
          setHudsonData((prev) => [...prev, ...hudsonDataa]);
        } catch (error) {}
      };
      fetchByIP();
    }

    new Promise((resolve) =>
      setTimeout(() => {
        set_1tabLoading(false);
        resolve;
      }, 1000),
    );
  }, [
    hunterVerifyData,
    leakHunterData,
    breachInfo,
    jobSeekerData,
    hunterFindData,
  ]);

  useEffect(() => {
    if (mobile360Data) {
      const callOtherAPIs = async () => {
        // calling mobile to dl advance
        try {
          const dlAdvanceResponse = await post(
            '/api/mobile/mobile-to-dl-advance-full-data',
            {
              mobile: mobileNo,
            },
          );
          if (dlAdvanceResponse?.responseData) {
            setMobileToDLAdvance(dlAdvanceResponse);
          }
        } catch (error) {}

        // calling ecom address
        try {
          const ecomResponse = await post(
            '/api/mobile/address-trace-full-data',
            {
              mobile: mobileNo,
            },
          );
          if (
            ecomResponse.responseData &&
            ecomResponse.responseData.length > 0
          ) {
            setECOMAddresses(ecomResponse);
          }
        } catch (error) {}

        //calling payworldApi
        try {
          const payworldResponse = await post(
            '/api/secondary/payworld-all-data',
            {
              sender_mobile: mobileNo,
            },
          );
          if (
            payworldResponse.responseData &&
            Object.keys(payworldResponse.responseData)?.length > 0
          ) {
            setPayworldData(payworldResponse);
          }
        } catch (error) {}
        // countingApi that tells how much time this number is get called
        try {
          const res = await get(
            `/api/mobile/mobile-count?mobile_number=${mobileNo}`,
          );
          setlastScanData(res);
        } catch (error) {}

        // profile advance
        let profileAdvanceData = null;
        try {
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
            profileAdvanceData = ProfileAdvanceResponse;
            setProfileAdvanceData(ProfileAdvanceResponse.responseData);
          }
        } catch (error) {
          if (error instanceof AxiosError) {
          }
        }
        const panNumber =
          profileAdvanceData?.responseData.result?.document_data?.pan[0]
            .value ||
          mobile360Data?.result?.din_info?.data[0]?.pan ||
          mobile360Data?.result?.director_pan_info?.data[0];

        if (panNumber) {
          // calling panAllInone
          try {
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
            }
          }
        }

        const bankName =
          mobile360Data?.result?.digital_payment_id_info?.data?.name || 'Bank';
        if (panNumber && bankName) {
          try {
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
            }
          }
        }

        // epicsInfo
        const EsicsArray = mobile360Data.result?.key_highlights?.esic_number;
        if (EsicsArray?.length > 0) {
          try {
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
          } catch (error) {
            if (error instanceof AxiosError) {
            }
          }
        }

        // get verify udyam data
        try {
          const udyamNumberArray =
            mobile360Data.result.key_highlights?.udyam_numbers;

          if (udyamNumberArray?.length > 0) {
            const UdyamData = await post('/api/mobile/verifyudyam', {
              registration_no: udyamNumberArray[0],
              realtimeData: isRealtime,
            });
            if (Number(UdyamData.responseData?.status) === 1) {
              setVerfiyUdyamData(UdyamData.responseData);
            }
          }
        } catch (error) {
          if (error instanceof AxiosError) {
          }
        }

        // get gst advance data
        try {
          const gstAdvanceNumberArray =
            mobile360Data.result?.key_highlights?.gst_numbers;

          if (gstAdvanceNumberArray?.length > 0) {
            const GSTDATA = await post('/api/mobile/gstadvance', {
              gst_no: gstAdvanceNumberArray[0],
              realtimeData: isRealtime,
            });
            if (Number(GSTDATA.responseData?.status) === 1) {
              setGstAdvanceData(GSTDATA.responseData);
            }

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
          }
        } catch (error) {
          if (error instanceof AxiosError) {
          }
        }
        // mobile to account
        try {
          const ActDetails = await post('/api/mobile/getAcDtlsFromMobNo', {
            mobile_number: mobileNo,
            realtimeData: isRealtime,
          });
          if (ActDetails.responseData?.status === 1) {
            setMobileToAccountData(ActDetails.responseData);
          }
        } catch (error) {
          if (error instanceof AxiosError) {
          }
        }

        setIsLoading(false);
        new Promise((resolve) =>
          setTimeout(async () => {
            await dispatch(fetchWalletBalance());
            resolve;
          }, 5000),
        );
        toast.success('Fetced', { id: toastRef.current! });
        // calling upi details
        try {
          const UpiDetails = await post('/api/mobile/digitalpayment', {
            mobile_number: mobileNo,
            realtimeData: isRealtime,
          });
          if (UpiDetails.responseStatus?.status === true) {
            setUpiDetailsData(UpiDetails);
          }
        } catch (error) {
          if (error instanceof AxiosError) {
          }
        }
        setUpiDetailsLoading(false);
        setisRealtime(false);
        dispatch(fetchWalletBalance());
      };
      callOtherAPIs();
    }
  }, [mobile360Data]);

  const handleSearch = async (query: string, searchFilter: string) => {
    clearOldData();
    if (query.length < 1) {
      return;
    }

    const isValid = isValidIndianMobileNumber(query);
    if (!isValid.result) {
      toast.error(`Invalid mobile ${query.slice(0, 15)}`, { duration: 800 });
      return;
    }
    setMobileNo(isValid.fixedNumber);
    if (wallet?.balance < 3000) {
      const id = toast.error('Insufficient balance', { id: toastRef.current! });
      toastRef.current = id;
      return;
    }

    setAllOnLoading();
    let mobile360R: null | {
      responseData: Mobile360Type;
    } = null;

    try {
      const toastId = toast.loading('fetching data...');
      toastRef.current = toastId;
      let mobile360ResponseMessage = null;
      const MAXDURATION = 30 * 1000;
      const RETRYINTERVAL = 5000;
      const startTime = Date.now();

      const tryFetch = async () => {
        toast.loading('fetching data...', {
          id: toastId,
        });
        try {
          const Mobile360Data = await post('/api/mobile/getMobile360Dtls', {
            mobile_number: isValid.fixedNumber,
            realtimeData: isRealtime,
          });
          if (Number(Mobile360Data.responseData?.status) === 1) {
            setMobile360Data(Mobile360Data.responseData);
            mobile360R = Mobile360Data;
            mobile360ResponseMessage = Mobile360Data?.responseStatus?.message;
            apiMessage.current = mobile360ResponseMessage;
            return true;
          }
          mobile360R = null;
          return false;
        } catch (error) {
          if (error instanceof AxiosError) {
            if (error.status === 402) {
              toast.error('Insufficent balance api call failed');
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
              if (!success) {
                toast.error('Server Timeout. Try again after some time', {
                  id: toastId,
                });
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
        setIsLoading(false);
        return;
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error('Something went wrong');
        return;
      }
      toast.error('Something went wrong');
      setIsLoading(false);
    }
  };

  const getImageUrl = (): string => {
    if (mobileToDLAdvance?.responseData?.[0]?.data?.result?.user_image) {
      return `data:image/png;base64,${mobileToDLAdvance?.responseData?.[0]?.data?.result?.user_image}`;
    }

    if (ghuntMultipleData[0]?.profile?.profilePictureUrl) {
      return ghuntMultipleData[0]?.profile.profilePictureUrl;
    }
    const gender = panAllInOneData?.result?.gender;

    if (gender === 'M') {
      return '/male.jpg';
    }
    if (gender === 'F') {
      return '/female.jpg';
    }
    return '/null.png';
  };

  const firstAddress = panAllInOneData?.result?.address?.full;
  const eciscAddress =
    esicsData?.result?.esic_details[0]?.employer_details?.address?.split(
      ', employer',
    )[0] || '';
  const secondAddress =
    profileAdvanceData?.result?.address?.[0]?.detailed_address &&
    profileAdvanceData?.result?.address?.[0]?.detailed_address?.length > 10
      ? profileAdvanceData?.result?.address?.[0]?.detailed_address
      : eciscAddress;

  // location api
  useEffect(() => {
    const callGeoApi = async () => {
      setOlaGeoApiLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (!isLoading && mobile360Data) {
        const clientInfo = getClientInfo();
        setOlaGeoApiLoading(true);
        try {
          if (firstAddress && firstAddress.length > 5) {
            const imageData = await post('/api/auth/getmap', {
              userLng: clientInfo?.longitude,
              userLat: clientInfo?.latitude,
              address: firstAddress,
            });
            setOlaGeoApiData(imageData);
          } else if (secondAddress.length > 5) {
            const imageData = await post('/api/auth/getmap', {
              userLng: clientInfo?.longitude,
              userLat: clientInfo?.latitude,
              address: secondAddress,
            });
            setOlaGeoApiData(imageData);
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            toast.error('Map!! Failed');
          }
        } finally {
          setOlaGeoApiLoading(false);
        }
      }
    };
    callGeoApi();
  }, [isLoading, mobile360Data]);

  // other address api
  useEffect(() => {
    const callOtherAddressApis = async () => {
      if (!isLoading && mobile360Data) {
        const clientInfo = getClientInfo();
        const otherAddressArray = getAddressesWithDifferentPincode(
          esicsData,
          gstAdvanceData,
          profileAdvanceData,
          EquifaxV3Data,
          panAllInOneData?.result?.address?.zip ||
            profileAdvanceData?.result?.address?.[0]?.pincode ||
            '',
        );
        if (
          profileAdvanceData?.result?.address ||
          panAllInOneData?.result?.address?.zip
        ) {
          addressesFound.current = otherAddressArray.length + 1;
        } else {
          addressesFound.current = otherAddressArray.length;
        }
        if (otherAddressArray.length > 0) {
          setOtherAddressOlaLoading(true);
          try {
            const results = await Promise.all(
              otherAddressArray.map((addressObj) =>
                post('/api/auth/getmap', {
                  userLng: clientInfo.longitude,
                  userLat: clientInfo.latitude,
                  address: addressObj.detailed_address,
                }),
              ),
            );
            const updatedData = results.map((result, index) => ({
              olaData: result,
              addressData: otherAddressArray[index],
            }));
            setOtherAdressOlaData(updatedData);
            setOtherAddressOlaLoading(false);
          } catch (error) {
            setOtherAddressOlaLoading(false);
          }
        }
      }
    };
    callOtherAddressApis();
  }, [isLoading]);

  //caling breachInfo Api after
  useEffect(() => {
    const callBreachInfoApi = async () => {
      if (!isLoading && mobile360Data) {
        const otherEmails = getOtherEmails(
          esicsData,
          gstAdvanceData,
          EquifaxV3Data,
          profileAdvanceData,
          '',
        );

        const otherNumber = getOtherPhoneNumbers(
          esicsData,
          gstAdvanceData,
          EquifaxV3Data,
          profileAdvanceData,
          mobileNo,
          true,
        );
        numbersFoundRef.current = otherNumber.length - 1;

        if (otherNumber.length > 0 || otherEmails.length > 0) {
          setBreachInfoLoading(true);

          let holehe: {
            value: string;
            type: string;
            data: HoleheType | null;
          }[] = [];

          try {
            const results = await Promise.allSettled(
              otherEmails.map((email) =>
                post('/api/holehe/email_used_only', {
                  email: email?.email,
                }),
              ),
            );
            results.forEach((result, index) => {
              if (result.status === 'fulfilled') {
                holehe.push({
                  value: otherEmails[index]?.email,
                  type: otherEmails[index]?.type,
                  data: result.value,
                });
              } else {
                holehe.push({
                  value: otherEmails[index]?.email,
                  type: otherEmails[index]?.type,
                  data: null,
                });
              }
            });
            setHoleheData(holehe);
          } catch (error) {}

          let finalArray: {
            value: string;
            type: string;
            data: BreachInfoType | null;
          }[] = [];
          if (otherEmails.length > 0) {
            // otherEmails.push({
            //   type: 'dummy',
            //   email: 'Support@scaninfoga.in',
            // });
            let hudsonDataa: {
              value: string;
              type: string;
              data: HudsonEmailType | null;
            }[] = [];

            // calling hudsonEmail
            try {
              const results = await Promise.allSettled(
                otherEmails.map((email) =>
                  post('/api/hudson/search-by-email', {
                    email: email?.email,
                    realtimeData: isRealtime,
                  }),
                ),
              );
              results.forEach((result, index) => {
                if (result.status === 'fulfilled') {
                  hudsonDataa.push({
                    value: otherEmails[index]?.email,
                    type: otherEmails[index]?.type,
                    data: result.value,
                  });
                } else {
                  hudsonDataa.push({
                    value: otherEmails[index]?.email,
                    type: otherEmails[index]?.type,
                    data: null,
                  });
                }
              });
              setHudsonData(hudsonDataa);
            } catch (error) {}

            // leakHunterPassword
            let leakHunterData: {
              value: string;
              type: string;
              data: LeakHunterType | null;
            }[] = [];
            // otherEmails.push({
            //   type: 'Dummy',
            //   email: 'lucasonicleroy@gmail.com',
            // });
            try {
              const results = await Promise.allSettled(
                otherEmails.map((email) =>
                  post('/api/leak-data/get-password', {
                    email: email?.email,
                  }),
                ),
              );
              results.forEach((result, index) => {
                if (result.status === 'fulfilled') {
                  leakHunterData.push({
                    value: otherEmails[index]?.email,
                    type: otherEmails[index]?.type,
                    data: result.value,
                  });
                } else {
                  leakHunterData.push({
                    value: otherEmails[index]?.email,
                    type: otherEmails[index]?.type,
                    data: null,
                  });
                }
              });
              setLeakHunterData(leakHunterData);
            } catch (error) {}
            // otherEmails.push({
            //   type: 'Dummy email',
            //   email: 'rohan@scaninfoga.in',
            // });

            // calling hunterVerfy
            let hunterData: {
              value: string;
              type: string;
              data: HunterVerifyType | null;
            }[] = [];
            try {
              const results = await Promise.allSettled(
                otherEmails.map((email) =>
                  post('/api/mobile/hunterverify', {
                    email: email?.email,
                    realtimeData: isRealtime,
                  }),
                ),
              );
              results.map((result, index) => {
                if (result?.status === 'fulfilled') {
                  hunterData.push({
                    value: otherEmails[index]?.email,
                    type: otherEmails[index]?.type,
                    data: result.value,
                  });
                } else {
                  hunterData.push({
                    value: otherEmails[index]?.email,
                    type: otherEmails[index]?.type,
                    data: null,
                  });
                }
              });
              setHunterVerifyData(hunterData);
            } catch (error) {}

            // calling hunterFind
            let hunterFind: {
              value: string;
              type: string;
              data: HunterFindType | null;
            }[] = [];

            try {
              const results = await Promise.allSettled(
                otherEmails.map((email) =>
                  post('/api/mobile/hunterfind', {
                    email: email?.email,
                    realtimeData: isRealtime,
                  }),
                ),
              );
              results.map((result, index) => {
                if (result?.status === 'fulfilled') {
                  hunterFind.push({
                    value: otherEmails[index]?.email,
                    type: otherEmails[index]?.type,
                    data: result.value,
                  });
                } else {
                  hunterFind.push({
                    value: otherEmails[index]?.email,
                    type: otherEmails[index]?.type,
                    data: null,
                  });
                }
              });
              setHunterFindData(hunterFind);
            } catch (error) {
              if (error instanceof AxiosError) {
              }
            }

            try {
              const results = await Promise.allSettled(
                otherEmails.map((email) =>
                  post('/api/mobile/breachinfo', {
                    request_body: email?.email,
                    realtimeData: isRealtime,
                  }),
                ),
              );
              results.map((result, index) => {
                if (result?.status === 'fulfilled') {
                  finalArray.push({
                    value: otherEmails[index]?.email,
                    type: otherEmails[index]?.type,
                    data: result?.value,
                  });
                } else {
                  finalArray.push({
                    value: otherEmails[index]?.email,
                    type: otherEmails[index]?.type,
                    data: null,
                  });
                }
              });
            } catch (error) {}
          }
          if (otherNumber.length > 0) {
            // otherNumber.push({
            //   number: '9599374108',
            //   type: 'Demo purpose',
            // });
            // calling indiaMart Leaks
            let indiaMarkLeak: {
              value: string;
              type: string;
              data: ObjectArrayLeakType | null;
            }[] = [];
            // calling with emails
            if (otherEmails.length > 0) {
              try {
                const emailResults = await Promise.allSettled(
                  otherEmails.map((email) =>
                    post('/api/leak-data/get-india-mart', {
                      request_body: email?.email,
                    }),
                  ),
                );
                emailResults.forEach((result, index) => {
                  if (result.status === 'fulfilled') {
                    indiaMarkLeak.push({
                      value: otherEmails[index]?.email,
                      type: otherEmails[index]?.type,
                      data: result.value,
                    });
                  } else {
                    indiaMarkLeak.push({
                      value: otherEmails[index]?.email,
                      type: otherEmails[index]?.type,
                      data: null,
                    });
                  }
                });
              } catch (error) {}
            }
            // calling with number
            try {
              const numberResults = await Promise.allSettled(
                otherNumber.map((number) =>
                  post('/api/leak-data/get-india-mart', {
                    request_body: number.number,
                  }),
                ),
              );
              numberResults.forEach((result, index) => {
                if (result.status === 'fulfilled') {
                  indiaMarkLeak.push({
                    value: otherNumber[index]?.number,
                    type: otherNumber[index]?.type,
                    data: result.value,
                  });
                } else {
                  indiaMarkLeak.push({
                    value: otherNumber[index]?.number,
                    type: otherNumber[index]?.type,
                    data: null,
                  });
                }
              });
            } catch (error) {}
            setindiaMartLeakData(indiaMarkLeak);

            // calling olx leaks
            let olxLeak: {
              value: string;
              type: string;
              data: ObjectArrayLeakType | null;
            }[] = [];
            try {
              const results = await Promise.allSettled(
                otherNumber.map((number) =>
                  post('/api/leak-data/get-olx', {
                    mobile: number.number,
                  }),
                ),
              );
              results.forEach((result, index) => {
                if (result.status === 'fulfilled') {
                  olxLeak.push({
                    value: otherNumber[index]?.number,
                    type: otherNumber[index]?.type,
                    data: result.value,
                  });
                } else {
                  olxLeak.push({
                    value: otherNumber[index]?.number,
                    type: otherNumber[index]?.type,
                    data: null,
                  });
                }
              });
              setolxLeakData(olxLeak);
            } catch (error) {}

            // calling cbse leaks
            let cbseLeak: {
              value: string;
              type: string;
              data: DarkWebType | null;
            }[] = [];

            try {
              const results = await Promise.allSettled(
                otherNumber.map((number) =>
                  post('/api/leak-data/get-cbse', {
                    mobile: number.number,
                  }),
                ),
              );
              results.forEach((result, index) => {
                if (result.status === 'fulfilled') {
                  cbseLeak.push({
                    value: otherNumber[index]?.number,
                    type: otherNumber[index]?.type,
                    data: result.value,
                  });
                } else {
                  cbseLeak.push({
                    value: otherNumber[index]?.number,
                    type: otherNumber[index]?.type,
                    data: null,
                  });
                }
              });
              setcbseLeakData(cbseLeak);
            } catch (error) {}

            // calling coperate leaks
            let coperateLeak: {
              value: string;
              type: string;
              data: DarkWebType | null;
            }[] = [];

            try {
              const results = await Promise.allSettled(
                otherNumber.map((number) =>
                  post('/api/leak-data/get-corporate', {
                    mobile: number.number,
                  }),
                ),
              );
              results.forEach((result, index) => {
                if (result.status === 'fulfilled') {
                  coperateLeak.push({
                    value: otherNumber[index]?.number,
                    type: otherNumber[index]?.type,
                    data: result.value,
                  });
                } else {
                  coperateLeak.push({
                    value: otherNumber[index]?.number,
                    type: otherNumber[index]?.type,
                    data: null,
                  });
                }
              });
              setCoperateLeakData(coperateLeak);
            } catch (error) {}

            // calling zomato Leak
            let zomatoLeak: {
              value: string;
              type: string;
              data: DarkWebType | null;
            }[] = [];

            try {
              const results = await Promise.allSettled(
                otherNumber.map((number) =>
                  post('/api/leak-data/get-zomato', {
                    mobile: number.number,
                  }),
                ),
              );
              results.forEach((result, index) => {
                if (result.status === 'fulfilled') {
                  zomatoLeak.push({
                    value: otherNumber[index]?.number,
                    type: otherNumber[index]?.type,
                    data: result.value,
                  });
                } else {
                  zomatoLeak.push({
                    value: otherNumber[index]?.number,
                    type: otherNumber[index]?.type,
                    data: null,
                  });
                }
              });
              setZomatoLeakData(zomatoLeak);
            } catch (error) {}

            // calling jobSeeker
            let jobSeeker: {
              value: string;
              type: string;
              data: JobSeekerType | null;
            }[] = [];
            try {
              const results = await Promise.allSettled(
                otherNumber.map((number) =>
                  post('/api/leak-data/get-jobseeker', {
                    mobile: number.number,
                  }),
                ),
              );
              results.map((result, index) => {
                if (result?.status === 'fulfilled') {
                  jobSeeker.push({
                    value: otherNumber[index]?.number,
                    type: otherNumber[index]?.type,
                    data: result?.value,
                  });
                } else {
                  jobSeeker.push({
                    value: otherNumber[index]?.number,
                    type: otherNumber[index]?.type,
                    data: null,
                  });
                }
              });
              setJobSeekerData(jobSeeker);
            } catch (error) {}

            // calling breachInfo with also +91
            otherNumber?.map((number) => {
              if (number?.number?.length === 10) {
                otherNumber.push({
                  number: '+91' + number.number,
                  type: number.type,
                });
              }
            });
            try {
              const results = await Promise.allSettled(
                otherNumber.map((number) =>
                  post('/api/mobile/breachinfo', {
                    request_body: number.number,
                    realtimeData: isRealtime,
                  }),
                ),
              );
              results.map((result, index) => {
                if (result?.status === 'fulfilled') {
                  finalArray.push({
                    value: otherNumber[index]?.number,
                    type: otherNumber[index]?.type,
                    data: result?.value,
                  });
                } else {
                  finalArray.push({
                    value: otherNumber[index]?.number,
                    type: otherNumber[index]?.type,
                    data: null,
                  });
                }
              });
            } catch (error) {}
          }
          const numbersDetected = getOtherPhoneNumbers(
            esicsData,
            gstAdvanceData,
            EquifaxV3Data,
            profileAdvanceData,
            mobileNo,
            true,
            finalArray,
          );
          numbersFoundRef.current = numbersDetected.length - 1;
          const emailsDetected = getOtherEmails(
            esicsData,
            gstAdvanceData,
            EquifaxV3Data,
            profileAdvanceData,
            '',
            finalArray,
          );
          // calling search api after breach data
          if (emailsDetected.length > 0 || numbersDetected.length > 0) {
            let rapidApiData: {
              value: string;
              type: string;
              data: RapidSearchAPIType | null;
            }[] = [];
            const queries = [
              "AND 'email' OR 'address'",
              'intex:',
              'filetype:pdf OR filetype:doc',
            ];
            try {
              const flatPromises: Promise<RapidSearchAPIType>[] = [];
              numbersDetected.forEach((number) => {
                queries.forEach((query, index) => {
                  const q =
                    index === 1
                      ? `${query}'${number?.number}'`
                      : `'${number?.number} '${query}`;
                  flatPromises.push(
                    post('/api/secondary/rapid-search', { query: q }),
                  );
                });
              });
              const numberResults = await Promise.allSettled(flatPromises);
              numberResults.forEach((result, index) => {
                const correspondingIndex = Math.floor(index / queries.length);
                if (result.status === 'fulfilled') {
                  rapidApiData.push({
                    value: numbersDetected[correspondingIndex]?.number,
                    type: numbersDetected[correspondingIndex]?.type,
                    data: result.value as RapidSearchAPIType,
                  });
                } else {
                  finalArray.push({
                    value: numbersDetected[correspondingIndex]?.number,
                    type: numbersDetected[correspondingIndex]?.type,
                    data: null,
                  });
                }
              });
            } catch (error) {}

            try {
              // similary for emails
              const flatPromises2: Promise<RapidSearchAPIType>[] = [];
              emailsDetected.forEach((email) => {
                queries.forEach((query, index) => {
                  const q =
                    index === 1
                      ? `${query}'${email?.email}'`
                      : `'${email?.email} '${query}`;
                  flatPromises2.push(
                    post('/api/secondary/rapid-search', { query: q }),
                  );
                });
              });
              const emailsResult = await Promise.allSettled(flatPromises2);
              emailsResult.forEach((result, index) => {
                const correspondingIndex = Math.floor(index / queries.length);
                if (result.status === 'fulfilled') {
                  rapidApiData.push({
                    value: emailsDetected[correspondingIndex]?.email,
                    type: emailsDetected[correspondingIndex]?.type,
                    data: result.value as RapidSearchAPIType,
                  });
                } else {
                  finalArray.push({
                    value: emailsDetected[correspondingIndex]?.email,
                    type: emailsDetected[correspondingIndex]?.type,
                    data: null,
                  });
                }
              });
            } catch (error) {}
            // dummy2222.map((item) => (
            //   rapidApiData.push({
            //     value: item?.value,
            //     type: item?.type,
            //     data: item?.data,
            //   })
            // ))
            // console.log('HERE IS rapidApiData', rapidApiData);

            setRapidApiData(rapidApiData);
          }

          setBreachInfo(finalArray);
          setBreachInfoLoading(false);
        }
      }
    };
    callBreachInfoApi();
  }, [isLoading]);

  // here ghunt call
  useEffect(() => {
    const callGhuntApis = async () => {
      if (!isLoading && mobile360Data) {
        const otherEmails = getOtherEmails(
          esicsData,
          gstAdvanceData,
          EquifaxV3Data,
          profileAdvanceData,
          '',
        );
        if (otherEmails.length > 0) {
          setGhuntMultipleLoading(true);
          try {
            const results = await Promise.allSettled(
              otherEmails.map((email) =>
                post('/api/ghunt/getEmailDetails', {
                  email: email?.email,
                }),
              ),
            );
            let ghuntData: GhuntData[] = [];
            results.forEach((result) => {
              if (result.status === 'fulfilled') {
                ghuntData.push(result.value?.responseData);
              }
            });
            setGhuntMultipleData(ghuntData);
            setGhuntMultipleLoading(false);
          } catch (error) {
            setGhuntMultipleLoading(false);
          }
        }
      }
    };
    callGhuntApis();
  }, [isLoading, mobile360Data]);

  const OverviewData = [
    {
      title: 'Father Or Husband',
      value: formatSentence(
        panAllInOneData?.result?.fname ||
          mobileToDLAdvance?.responseData?.[0]?.data?.result?.father_or_husband,
      ),
      titleClassname: '',
      valueClassname: '',
    },
    {
      title: 'Gender',
      value:
        panAllInOneData?.result?.gender ||
        profileAdvanceData?.result?.personal_information?.gender ||
        esicsData?.result?.esic_details[0]?.gender ||
        '----',
      titleClassname: '',
      valueClassname: '',
    },
    {
      title: 'Date of Birth',
      value:
        panAllInOneData?.result?.dob ||
        esicsData?.result?.esic_details[0]?.date_of_birth ||
        '----',
      titleClassname: '',
      valueClassname: '',
    },
    {
      title: 'Age',
      value:
        profileAdvanceData?.result?.personal_information?.age ||
        esicsData?.result?.esic_details[0]?.age ||
        '----',
      titleClassname: '',
      valueClassname: '',
    },
    {
      title: 'Alternate Number',
      value:
        getOtherPhoneNumbers(
          esicsData,
          gstAdvanceData,
          EquifaxV3Data,
          profileAdvanceData,
          mobileNo,
        )[0]?.number || '----',
      titleClassname: '',
      valueClassname: 'text-yellow-500',
    },
    {
      title: 'Income',
      value: numberToIndianRuppe(
        Number(profileAdvanceData?.result?.personal_information?.income || '0'),
      ),
      titleClassname: '',
      valueClassname: 'text-yellow-500',
    },
    {
      title: 'PAN Number',
      value:
        panAllInOneData?.result?.pan_number ||
        profileAdvanceData?.result?.document_data?.pan?.[0]?.value ||
        mobile360Data?.result?.din_info?.data[0]?.pan ||
        '----',
      titleClassname: '',
      valueClassname: 'text-blue-400',
    },
    {
      title: 'Aadhaar Number',
      value: panAllInOneData?.result?.masked_aadhaar || '----',
      titleClassname: '',
      valueClassname: 'text-yellow-500',
    },
    {
      title: 'Email Address',
      value:
        getOtherEmails(
          esicsData,
          gstAdvanceData,
          EquifaxV3Data,
          profileAdvanceData,
          '',
        )[0]?.email || '----',
      titleClassname: '',
      valueClassname: 'max-w-24 text-yellow-500',
    },
    {
      title: 'isSole Proprietor',
      value: panAllInOneData?.result?.is_sole_proprietor?.found || '----',
      titleClassname: '',
      valueClassname: 'max-w-28 text-yellow-500',
    },
    {
      title: 'isDirector',
      value: panAllInOneData?.result?.is_director?.found || '----',
      titleClassname: '',
      valueClassname: 'max-w-28 text-yellow-500',
    },

    {
      title: 'Line1',
      value: formatSentence(
        panAllInOneData?.result?.address?.line_1?.toLowerCase() ||
          panAllInOneData?.result?.address?.line_2?.toLowerCase() ||
          '----',
      ),
      titleClassname: '',
      valueClassname: '',
    },
    {
      title: 'City',
      value: formatSentence(panAllInOneData?.result?.address?.city) || '----',
      titleClassname: '',
      valueClassname: '',
    },
    {
      title: 'Zip Code',
      value:
        panAllInOneData?.result?.address?.zip ||
        profileAdvanceData?.result?.address?.[0]?.pincode ||
        esicsData?.result?.esic_details[0]?.employer_details?.pincode ||
        '----',
      titleClassname: '',
      valueClassname: '',
    },
    {
      title: 'State',
      value: formatSentence(
        panAllInOneData?.result?.address?.state ||
          profileAdvanceData?.result?.address?.[0]?.state ||
          esicsData?.result?.esic_details[0]?.employer_details?.state ||
          '----',
      ),
      titleClassname: '',
      valueClassname: '',
    },
    {
      title: 'Country',
      value:
        formatSentence(panAllInOneData?.result?.address?.country) || '----',
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
      <div className="flex w-full justify-between">
        <DashboardTitle
          title="Scaninfoga Intelligence"
          subTitle="Get the info you are looking for"
        />
        {mobile360Data && (
          <BookmarkWidget
            isRealtime={isRealtime}
            mobileNo={mobileNo}
            bookmarkPage={1}
            title="Scaninfoga Intelligence Bookmark"
            tools={BookMarkOptionScaninFogaIntelligence}
          />
        )}
      </div>

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
        <div className="flex h-[400px] items-center justify-center">
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
                {[
                  { value: 'overview', label: 'Overview' },
                  { value: 'profile', label: 'Profile' },
                  { value: 'personal', label: 'Personal' },
                  { value: 'financial', label: 'Financial' },
                  { value: 'business', label: 'Business' },
                  { value: 'digitalInfo', label: 'Digital Footprint' },
                  { value: 'breachInfo', label: 'Breach Info' },
                  { value: 'googleProfile', label: 'Google Profile' },
                ].map((item) => (
                  <TabsTrigger
                    key={item.value}
                    value={item.value}
                    className="rounded-md data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-500"
                  >
                    {item.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <BeFiScOverview
                  deviceDetails={deviceDetails}
                  _1tabLoading={_1tabLoading}
                  _2tabLoading={_2tabLoading}
                  numbersFound={numbersFoundRef.current}
                  addressesFound={addressesFound.current}
                  hudsonData={hudsonData}
                  ghuntLoading={ghuntMultipleLoading}
                  totalGoogleAccount={ghuntMultipleData?.length}
                  upiLoading={upiDetailsLoading}
                  upiData={upiDetailsData}
                  lastScanData={lastScanData}
                  mobile360Data={mobile360Data}
                  HunterVerifyData={hunterVerifyData}
                  leakHunterData={leakHunterData}
                  LeakPointApi={breachInfo}
                  jobSeekerData={jobSeekerData}
                  HunterFindData={hunterFindData}
                />
              </TabsContent>

              <TabsContent
                value="profile"
                className="mt-6 flex flex-col space-y-4"
              >
                <DashboardCard title="" className="col-span-full lg:col-span-2">
                  <div className="mb-2 flex items-center gap-x-2">
                    <div className="group relative h-[65px] w-[65px] overflow-hidden rounded-full">
                      <Image
                        src={getImageUrl()}
                        alt="user"
                        fill
                        className="rounded-full border object-cover hover:cursor-pointer"
                      />

                      {/* enlarged image */}
                      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 ease-in-out group-hover:pointer-events-auto group-hover:opacity-100">
                        <Image
                          src={getImageUrl()}
                          alt="user enlarged"
                          width={460}
                          height={460}
                          className="scale-75 transform rounded-full border object-cover shadow-xl transition-transform duration-300 ease-in-out group-hover:scale-100"
                        />
                      </div>
                    </div>

                    <p className="text-2xl font-semibold">
                      {formatSentence(
                        panAllInOneData?.result?.full_name ||
                          profileAdvanceData?.result?.personal_information
                            ?.full_name ||
                          esicsData?.result?.esic_details[0]?.name,
                      )}
                    </p>
                  </div>
                  <div className="grid grid-cols-1">
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
                      <div className="flex w-full justify-between gap-4 text-lg font-semibold">
                        <div className="flex flex-col space-y-6">
                          <div>
                            <p className={'text-xs text-slate-400'}>
                              Full Address
                            </p>
                            <p className="max-w-[610px] bg-opacity-75 text-base">
                              {firstAddress && firstAddress?.length > 10
                                ? formatSentence(firstAddress)
                                : secondAddress.length > 10
                                  ? formatSentence(secondAddress)
                                  : formatSentence(
                                      mobile360Data?.result?.lpg_info?.data?.[0]
                                        ?.address.length > 10
                                        ? mobile360Data?.result?.lpg_info
                                            ?.data?.[0]?.address
                                        : '----',
                                    )}
                            </p>
                          </div>
                          <div className="flex space-x-8">
                            <div>
                              <p className="text-base text-slate-400">
                                Total Duration
                              </p>

                              {olaGeoApiLoading ? (
                                <SentenceLoader />
                              ) : (
                                <p className="text-lg font-medium text-emerald-500">
                                  {olaGeoApiData?.responseData?.duration
                                    ?.readable_duration || '----'}
                                </p>
                              )}
                            </div>
                            <div>
                              <p className="text-base text-slate-400">
                                Distance Kilometers
                              </p>
                              {olaGeoApiLoading ? (
                                <SentenceLoader />
                              ) : (
                                <p className="text-lg font-medium text-yellow-500">
                                  {olaGeoApiData?.responseData?.distance
                                    ?.distance_kilometers || '----'}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="">
                          {olaGeoApiLoading ? (
                            <SentenceLoader className="min-h-[280px] w-[420px]" />
                          ) : (
                            <Image
                              src={`data:${olaGeoApiData?.responseData?.content_type};base64,${olaGeoApiData?.responseData?.image}`}
                              alt="map"
                              width={450}
                              height={450}
                              className="max-h-72 rounded-xl"
                              unoptimized={true}
                            />
                          )}
                        </div>
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
                  </div>
                </DashboardCard>
                <div>
                  {otherAddressOlaLoading ? (
                    <div className="mt-10 grid grid-cols-1 gap-4">
                      <MapLoading />
                      <MapLoading />
                    </div>
                  ) : (
                    otherAdressOlaData.length > 0 && (
                      <div className="mt-10 grid grid-cols-1 gap-4">
                        {otherAdressOlaData.map((item, index) => (
                          <div
                            key={index}
                            className="flex w-full justify-between border border-white/10 p-4"
                          >
                            <div className="grid grid-cols-1 items-center gap-y-1 lg:grid-cols-2">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-slate-400">
                                    Date of reporting
                                  </p>
                                  <p className="pt-1">
                                    {item?.addressData?.date_of_reporting}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-slate-400">
                                    Address Type
                                  </p>

                                  <CustomBadge
                                    variantToUse={'default'}
                                    value={item?.addressData?.type}
                                  />
                                </div>
                                <div>
                                  <p className="text-sm text-slate-400">
                                    Total Duration
                                  </p>
                                  <p className="pt-1 text-emerald-500">
                                    {
                                      item?.olaData?.responseData?.duration
                                        ?.readable_duration
                                    }
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-slate-400">
                                    Distance Kilometers
                                  </p>
                                  <p className="pt-1 text-yellow-500">
                                    {
                                      item?.olaData?.responseData?.distance
                                        ?.distance_kilometers
                                    }
                                  </p>
                                </div>
                                <div>
                                  <p className="text-lg text-slate-400">
                                    Address
                                  </p>
                                  <p className="min-w-[430px] max-w-[430px] opacity-75">
                                    {formatSentence(
                                      item?.addressData.detailed_address,
                                    )}
                                  </p>
                                </div>
                              </div>

                              <Image
                                src={
                                  `data:${item?.olaData?.responseData?.content_type};base64,${item?.olaData?.responseData?.image}` ||
                                  '/null.png'
                                }
                                alt="map"
                                width={500}
                                height={500}
                                className="rounded-2xl object-contain lg:p-2"
                                unoptimized={true}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              </TabsContent>
              <TabsContent value="personal" className="mt-6 space-y-4">
                <BefiScPersonal
                  Mobile360Data={mobile360Data}
                  ProfileAdvanceData={profileAdvanceData}
                  EsicsData={esicsData}
                  PanAllInOneData={panAllInOneData}
                  mobileToDLAdvance={mobileToDLAdvance}
                />
              </TabsContent>
              <TabsContent value="financial" className="mt-6">
                <BeFiScFinancial
                  mobileNo={mobileNo}
                  panAllInOneData={panAllInOneData}
                  upiDetailsLoading={upiDetailsLoading}
                  upiDetailsData={upiDetailsData}
                  Mobile360Data={mobile360Data}
                  profileAdvanceData={profileAdvanceData}
                  MobileToAccountData={mobileToAccountData}
                  EquifaxV3Data={EquifaxV3Data}
                  payworldData={payworldData}
                />
              </TabsContent>
              <TabsContent value="business" className="mt-6 space-y-4">
                {gstAdvanceData ? (
                  <BeFiScBusiness
                    panAllInOneData={panAllInOneData}
                    GstAdvanceData={gstAdvanceData}
                    GstTurnoverData={gstTurnoverData}
                    verfiyUdyamData={verfiyUdyamData}
                  />
                ) : (
                  <NotFound value="No business found" />
                )}
              </TabsContent>
              <TabsContent value="digitalInfo" className="mt-6">
                {breachInfoLoading ? (
                  <BeFiScLoadingSkeleton />
                ) : (
                  <BeFiScDigitalFootprint
                    EcicsData={esicsData}
                    EquifaxData={EquifaxV3Data}
                    PanAllInOneData={panAllInOneData}
                    GstAdvanceData={gstAdvanceData}
                    ProfileAdvanceData={profileAdvanceData}
                    mobileNumber={mobileNo}
                    breachInfoLeakData={breachInfo}
                    breachInfoLoading={breachInfoLoading}
                    ECOMAddresses={ecomAddresses}
                  />
                )}
              </TabsContent>
              <TabsContent value="breachInfo" className="mt-6">
                {breachInfoLoading ? (
                  <BeFiScLoadingSkeleton />
                ) : (
                  <BeFiScBreachInfo
                    ghuntMultipleData={ghuntMultipleData}
                    holeheData={holeheData}
                    HunterVerifyData={hunterVerifyData}
                    leakHunterData={leakHunterData}
                    data={breachInfo}
                    jobSeekerData={jobSeekerData}
                    HunterFindData={hunterFindData}
                    hudsonData={hudsonData}
                    zomatoLeakData={zomatoLeakData}
                    coperateLeakData={coperateLeakData}
                    cbseLeakData={cbseLeakData}
                    olxLeakData={olxLeakData}
                    indiaMartLeakData={indiaMartLeakData}
                    rapidApiData={rapidApiData}
                  />
                )}
              </TabsContent>
              <TabsContent value="googleProfile" className="mt-6">
                {ghuntMultipleLoading ? (
                  <BeFiScLoadingSkeleton />
                ) : ghuntMultipleData?.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {ghuntMultipleData.map((item, index) => (
                      <Ghunt key={index} accountData={item} />
                    ))}
                  </div>
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
