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
} from '@/types/BeFiSc';
import Mobile360 from './Mobile360';
import VerifyUdyam from './VerifyUdyam';
import BeFiScLoadingSkeleton from './BeFiScLoadingSkeleton';
import GSTAdvance from './GSTAdvance';
import GstTurnover from './GstTurnover';
import ProfileAdvance from './ProfileAdvance';
import Esics from './Esics';
import MobileToAccountNumber from './MobileToAccount';
import EquifaxV3 from './EquiFaxV3';

function isValidIndianMobileNumber(input: string): boolean {
  const mobileRegex = /^(?:\+91[\-\s]?)?[6-9]\d{9}$/;
  return mobileRegex.test(input.trim());
}

export default function BeFiSc() {
  const [searchType, setSearchType] = useState<string>('');
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

  const setAllOnLoading = () => {
    setIsLoading(true);
    setVerifyUdyamLoading(true);
    setGstAdvanceLoading(true);
    setGstTurnoverLoading(true);
    setProfileAdvanceLoading(true);
    setEsicsLoading(true);
    setMobileToAccountLoading(true);
    setEquifaxV3Loading(false);
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
          } else {
            mobile360R = null;
            return false;
          }
        } catch (error) {
          return false;
        }
      };

      const retryUntilSuccess = async () => {
        return new Promise<void>((resolve) => {
          const attempt = async () => {
            const success = await tryFetch();

            if (success || Date.now() - startTime >= MAXDURATION) {
              if (!success)
                toast.error('Timed out after 2 minutes', { id: toastId });
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
        toast.error('Server timeout. Please try again later.', { id: toastId });
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
          {/* Mobile 360 */}
          {mobile360Data && <Mobile360 data={mobile360Data} />}
          {/* Profile Advance */}

          {profileAdvanceLoading ? (
            <BeFiScLoadingSkeleton />
          ) : (
            <ProfileAdvance ProfileAdvanceData={profileAdvanceData} />
          )}
          {/* Verify Udyam */}
          {verifyUdyamLoading ? (
            <BeFiScLoadingSkeleton />
          ) : (
            <VerifyUdyam verfiyUdyamData={verfiyUdyamData} />
          )}

          {/* Gst Advance */}
          {gstAdvanceLoading ? (
            <BeFiScLoadingSkeleton />
          ) : (
            <GSTAdvance GstAdvanceData={gstAdvanceData} />
          )}

          {/* Gst turnover */}
          {gstTurnoverLoading ? (
            <BeFiScLoadingSkeleton />
          ) : (
            <GstTurnover GstTurnoverData={gstTurnoverData} />
          )}

          {/* Esics */}
          {esicsLoading ? (
            <BeFiScLoadingSkeleton />
          ) : (
            <Esics EsicsData={esicsData} />
          )}

          {/* mobile to account */}
          {mobileToAccountLoading ? (
            <BeFiScLoadingSkeleton />
          ) : (
            <MobileToAccountNumber
              MobileToAccountNumberData={mobileToAccountData}
            />
          )}

          {/* Equifax V3 */}
          {EquifaxV3Loading ? (
            <BeFiScLoadingSkeleton />
          ) : (
            <EquifaxV3 EquifaxV3Data={EquifaxV3Data} />
          )}
        </div>
      ) : null}
    </div>
  );
}
