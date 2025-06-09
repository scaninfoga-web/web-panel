'use client';
import DashboardTitle from '@/components/common/DashboardTitle';
import { SearchBar2 } from '@/components/search/SearchBar2';
import CustomCheckBox from '@/components/sub/checkbox';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
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
import { AxiosError } from 'axios';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
// @ts-ignore
import NotFound from '@/components/sub/NotFound';
import { getClientInfo, post } from '@/lib/api';
import { GhuntData } from '@/types/ghunt';
import { OlaGeoApiType } from '@/types/ola-geo-api';
import { DashboardCard } from '../dashboard/components/DashboardCard';
import Ghunt from '../ghunt/Ghunt';
import BeFiScBusiness from './2/BeFiScBusiness';
import BeFiScDigitalFootprint, {
  getAddressesWithDifferentPincode,
  getOtherEmails,
  getOtherPhoneNumbers,
} from './2/BeFiScDigitalFootprint';
import BeFiScFinancial from './2/BeFiScFinancial';
import BefiScPersonal from './2/BefiScPersonal';
import MapLoading from './2/MapLoading';
import SentenceLoader from './2/SentenceLoader';
import {
  cleanAndCapitalize,
  formatSentence,
  numberToIndianRuppe,
} from './APIUtils';
import BeFiScLoadingSkeleton from './BeFiScLoadingSkeleton';
import CustomBadge from './CustomBadge';
import { BreachInfoType } from '@/types/BreachInfo';
import BeFiScBreachInfo from './2/BeFiScBreachInfo';

export function isValidIndianMobileNumber(input: string): boolean {
  const mobileRegex = /^(?:\+91[\-\s]?)?[5-9]\d{9}$/;
  return mobileRegex.test(input.trim());
}

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

  const [ghuntMultipleData, setGhuntMultipleData] = useState<GhuntData[]>([]);
  const [ghuntMultipleLoading, setGhuntMultipleLoading] = useState(false);

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
      data: BreachInfoType;
    }[]
  >([]);

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
    setBreachInfoLoading(true);
  };
  const clearOldData = () => {
    // setGhuntData(null);
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
          }
          setProfileAdvanceLoading(false);
          const panNumber =
            ProfileAdvanceResponse.responseData.result?.document_data?.pan[0]
              .value || mobile360Data?.result?.din_info?.data[0]?.pan;
          const bankName =
            mobile360Data?.result?.digital_payment_id_info?.data?.name ||
            'Bank';
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
                toast.error(
                  'Equifax Data ' +
                    error.response?.data?.responseStatus?.message,
                  { id: toastRef.current! },
                );
              }
            }

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
                toast.error(
                  'PanData' + error.response?.data?.responseStatus?.message,
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
              'Profile Advance ' +
                error.response?.data?.responseStatus?.message,
              { id: toastRef.current! },
            );
          }
          setEquifaxV3Loading(false);
          setProfileAdvanceLoading(false);
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
            setEsicsLoading(false);
          } catch (error) {
            if (error instanceof AxiosError) {
              toast.error(
                'ESICS ' + error.response?.data?.responseStatus?.message,
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
            toast.error('' + error.response?.data?.responseStatus?.message, {
              id: toastRef.current!,
            });
          }
          setVerifyUdyamLoading(false);
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
            setGstAdvanceLoading(false);

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
            toast.error('' + error.response?.data?.responseStatus?.message, {
              id: toastRef.current!,
            });
          }
          setGstAdvanceLoading(false);
          setGstTurnoverLoading(false);
        }
        try {
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
        setIsLoading(false);
        toast.success(`${apiMessage.current!}`, { id: toastRef.current! });

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
            toast.error(
              'M2A ' + error.response?.data?.responseStatus?.message,
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
    query = query.replace(/^(\+91)/, '');
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
          const Mobile360Data = await post('/api/mobile/getMobile360Dtls', {
            mobile_number: query,
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
        return;
      } else {
        // await new Promise((resolve) => setTimeout(resolve, 5000));
        // toast.success(`${mobile360ResponseMessage}`, { id: toastId });
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.responseStatus?.message);
        setAllOffLoading();
        return;
      }
      toast.error('Something went wrong');
      setIsLoading(false);
      setAllOffLoading();
    }
  };

  const getImageUrl = (): string => {
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
    setOlaGeoApiLoading(true);
    const callGeoApi = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (!panAllInOneLoading && !profileAdvanceLoading) {
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
            toast.error(
              'Map!! ' + error.response?.data?.responseStatus?.message,
              { id: toastRef.current! },
            );
          }
        } finally {
          setOlaGeoApiLoading(false);
        }
      } else {
        setOlaGeoApiLoading(false);
      }
    };
    callGeoApi();
  }, [panAllInOneLoading, profileAdvanceLoading]);

  useEffect(() => {
    const callOtherAddressApis = async () => {
      if (isLoading && mobile360Data) {
        setOtherAddressOlaLoading(true);
        const clientInfo = getClientInfo();
        const otherAddressArray = getAddressesWithDifferentPincode(
          esicsData,
          gstAdvanceData,
          profileAdvanceData,
          EquifaxV3Data,
          panAllInOneData?.result?.address?.zip ||
            profileAdvanceData?.result?.address?.[0]?.pincode ||
            '0',
        );
        if (otherAddressArray.length > 0) {
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
        } else {
          setOtherAddressOlaLoading(false);
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

        otherNumber?.map((number) => {
          if (number?.number?.length === 10) {
            number.number = '+91' + number.number;
          }
        });

        if (otherNumber.length > 0 || otherEmails.length > 0) {
          setBreachInfoLoading(true);
          let finalArray: {
            value: string;
            type: string;
            data: BreachInfoType;
          }[] = [];
          if (otherEmails.length > 0) {
            try {
              const results = await Promise.all(
                otherEmails.map((email) =>
                  post('/api/mobile/breachinfo', {
                    request_body: email.email,
                    realtimeData: isRealtime,
                  }),
                ),
              );
              results.map((result, index) =>
                finalArray.push({
                  value: otherEmails[index]?.email,
                  type: otherEmails[index]?.type,
                  data: result,
                }),
              );
            } catch (error) {
              // setOtherAddressOlaLoading(false);
            }
          }
          if (otherNumber.length > 0) {
            try {
              const results = await Promise.all(
                otherNumber.map((number) =>
                  post('/api/mobile/breachinfo', {
                    request_body: number.number,
                    realtimeData: isRealtime,
                  }),
                ),
              );
              results.map((result, index) =>
                finalArray.push({
                  value: otherNumber[index]?.number,
                  type: otherNumber[index]?.type,
                  data: result,
                }),
              );
            } catch (error) {
              // setOtherAddressOlaLoading(false);
            }
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
        setGhuntMultipleLoading(true);
        const otherEmails = getOtherEmails(
          esicsData,
          gstAdvanceData,
          EquifaxV3Data,
          profileAdvanceData,
          '',
        );
        if (otherEmails.length > 0) {
          try {
            const results = await Promise.all(
              otherEmails.map((email) =>
                post('/api/ghunt/getEmailDetails', {
                  email: email.email,
                }),
              ),
            );
            const data = results.map((result) => result.responseData);
            setGhuntMultipleData(data);
            setGhuntMultipleLoading(false);
          } catch (error) {
            setGhuntMultipleLoading(false);
          }
        } else {
          setGhuntMultipleLoading(false);
        }
      }
    };
    callGhuntApis();
  }, [isLoading]);

  const OverviewData = [
    {
      title: 'Father Name',
      value: formatSentence(panAllInOneData?.result?.fname),
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
      valueClassname: '',
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
      valueClassname: 'max-w-24',
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
                  Digital Footprint
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

              <TabsContent
                value="profile"
                className="mt-6 flex flex-col space-y-4"
              >
                <DashboardCard title="" className="col-span-full lg:col-span-2">
                  <div className="mb-2 flex items-center gap-x-2">
                    <div className="group relative h-[65px] w-[65px]">
                      <Image
                        src={getImageUrl()}
                        alt="user"
                        width={65}
                        height={65}
                        className="rounded-full border hover:cursor-pointer"
                      />

                      {/* enlarged image */}
                      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 ease-in-out group-hover:pointer-events-auto group-hover:opacity-100">
                        <Image
                          src={getImageUrl()}
                          alt="user enlarged"
                          width={460}
                          height={460}
                          className="scale-75 transform rounded-full border shadow-xl transition-transform duration-300 ease-in-out group-hover:scale-100"
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
                              src={
                                `data:${olaGeoApiData?.responseData?.content_type};base64,${olaGeoApiData?.responseData?.image}` ||
                                '/null.png'
                              }
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
                            <div className="grid grid-cols-1 items-center gap-y-1">
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
                              className="h-[300px] min-w-[400px] rounded-xl"
                              unoptimized={true}
                            />
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
                />
              </TabsContent>
              <TabsContent value="financial" className="mt-6">
                <BeFiScFinancial
                  panAllInOneData={panAllInOneData}
                  upiDetailsLoading={upiDetailsLoading}
                  upiDetailsData={upiDetailsData}
                  Mobile360Data={mobile360Data}
                  profileAdvanceData={profileAdvanceData}
                  MobileToAccountData={mobileToAccountData}
                  EquifaxV3Data={EquifaxV3Data}
                />
              </TabsContent>
              <TabsContent value="business" className="mt-6 space-y-4">
                {gstAdvanceData ? (
                  <BeFiScBusiness
                    GstAdvanceData={gstAdvanceData}
                    GstTurnoverData={gstTurnoverData}
                    verfiyUdyamData={verfiyUdyamData}
                  />
                ) : (
                  <NotFound value="No business found" />
                )}
              </TabsContent>
              <TabsContent value="digitalInfo" className="mt-6">
                <BeFiScDigitalFootprint
                  EcicsData={esicsData}
                  email={
                    profileAdvanceData?.result?.email?.[0]?.value.toLowerCase() ||
                    panAllInOneData?.result?.email ||
                    ''
                  }
                  EquifaxData={EquifaxV3Data}
                  PanAllInOneData={panAllInOneData}
                  GstAdvanceData={gstAdvanceData}
                  ProfileAdvanceData={profileAdvanceData}
                  mobileNumber={mobileNo}
                />
              </TabsContent>
              <TabsContent value="breachInfo" className="mt-6">
                <BeFiScBreachInfo data={breachInfo} />
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
