'use client';
import DashboardTitle from '@/components/common/DashboardTitle';
import { SearchBar2 } from '@/components/search/SearchBar2';
import { Loader } from '@/components/ui/loader';
import { useState } from 'react';
import axios, { Axios, AxiosError } from 'axios';
import { toast } from 'sonner';
import CustomCheckBox from '@/components/checkbox';
import {
  dummyUdyamResponse,
  mobile_360_dummy_data,
  Mobile360Type,
  VerifyUdyamType,
  GstVerificationAdvanceType,
  GstTurnoverType,
  ProfileAdvanceType,
  EsicDetailsType,
} from '@/types/BeFiSc';
import Mobile360 from './Mobile360';
import VerifyUdyam from './VerifyUdyam';
import BeFiScLoadingSkeleton from './BeFiScLoadingSkeleton';
import { CustomAxios } from '@/lib/Axios';
import GSTAdvance from './GSTAdvance';
import GstTurnover from './GstTurnover';
import ProfileAdvance from './ProfileAdvance';
import Esics from './Esics';

function isValidIndianMobileNumber(input: string): boolean {
  const mobileRegex = /^(?:\+91[\-\s]?)?[6-9]\d{9}$/;
  return mobileRegex.test(input.trim());
}

export default function BeFiSc() {
  const [searchType, setSearchType] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
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

  const setAllOnLoading = () => {
    setIsLoading(true);
    setVerifyUdyamLoading(true);
    setGstAdvanceLoading(true);
    setGstTurnoverLoading(true);
    setProfileAdvanceLoading(true);
    setEsicsLoading(true);
  };
  const clearOldData = () => {
    setMobile360Data(null);
    setVerfiyUdyamData(null);
    setGstAdvanceData(null);
    setGstTurnoverData(null);
    setProfileAdvanceData(null);
    setEsicsData(null);
  };

  const setAllOffLoading = () => {
    setIsLoading(false);
    setVerifyUdyamLoading(false);
    setGstAdvanceLoading(false);
    setGstTurnoverLoading(false);
    setProfileAdvanceLoading(false);
    setEsicsLoading(false);
  };

  const handleSearch = async (query: string, searchFilter: string) => {
    // setIsLoading(true);
    // setVerifyUdyamLoading(true);
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // setMobile360Data(mobile360DummyData);
    // setIsLoading(false);
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    // setVerfiyUdyamData(dummyUdyamResponse);
    // setVerifyUdyamLoading(false);
    // return;
    clearOldData();

    if (query.length < 1) {
      return;
    }
    const validation = isValidIndianMobileNumber(query);
    if (!validation) {
      toast.error('Invalid mobile number', { duration: 800 });
      return;
    }
    setAllOnLoading();
    // setSearchType(searchFilter);
    try {
      // get mobile 360 data
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mobile/getMobile360Dtls`,
        { mobile_number: query, realtimeData: isRealtime },
      );
      toast.success(data?.responseStatus?.message);
      if (Number(data.responseData?.status) === 1) {
        setMobile360Data(data.responseData);
      } else {
        toast.error('Mobile 360 Data Not Found');
      }
      setIsLoading(false);

      // profile advance
      try {
        const { data: ProfileAdvance } = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mobile/profileadvance`,
          { mobile_number: query, realtimeData: isRealtime },
        );
        if (
          Number(ProfileAdvance.responseData?.status) === 1 ||
          Number(ProfileAdvance.responseData?.status) === 2
        ) {
          setProfileAdvanceData(ProfileAdvance.responseData);
        }
      } catch (error) {
        toast.error('Profile advance Data Not Found');
        setProfileAdvanceLoading(false);
      }

      // epicsInfo
      const EsicsArray = data.responseData?.result?.key_highlights?.epics_info;
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
          setEsicsLoading(false);
          toast.error('Esics Data Not Found');
        }
      }

      // get verify udyam data
      try {
        const udyamNumberArray =
          data.responseData.result.key_highlights?.udyam_numbers;

        if (udyamNumberArray?.length > 0) {
          const { data: UdyamData } = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mobile/verifyudyam`,
            { registration_no: udyamNumberArray[0], realtimeData: isRealtime },
          );
          if (Number(UdyamData.responseData?.status) === 1) {
            setVerfiyUdyamData(UdyamData.responseData);
          } else {
            toast.error('Udyam Data Not Found');
          }
          setVerifyUdyamLoading(false);
        }
      } catch (error) {
        toast.error('Udyam Number Not Found');
        setVerifyUdyamLoading(false);
      }

      // get gst advance data
      try {
        const gstAdvanceNumberArray =
          data.responseData.result?.key_highlights?.gst_numbers;

        if (gstAdvanceNumberArray?.length > 0) {
          const { data: GSTDATA } = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mobile/gstadvance`,
            { gst_no: gstAdvanceNumberArray[0], realtimeData: isRealtime },
          );
          // toast.success(data.message);
          if (Number(GSTDATA.responseData?.status) === 1) {
            setGstAdvanceData(GSTDATA.responseData);
          } else {
            toast.error('GST Not Found');
          }
          setGstAdvanceLoading(false);

          // calling gst turnover api
          const { data: GstTurnover } = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mobile/gstturnover`,
            {
              gst_no: gstAdvanceNumberArray[0],
              realtimeData: isRealtime,
              year: '2022-23',
            },
          );

          if (
            Number(GstTurnover.responseData?.status) === 1 ||
            Number(GstTurnover.responseData?.status) === 2
          ) {
            setGstTurnoverData(GstTurnover.responseData);
          } else {
            toast.error('GST Turnover Not Found');
          }
          setGstTurnoverLoading(false);
        }
      } catch (error) {
        toast.error('GST Not Found');
        setGstAdvanceLoading(false);
        setGstTurnoverLoading(false);
      }
      setAllOffLoading();
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
        </div>
      ) : null}
    </div>
  );
}
