'use client';
import DashboardTitle from '@/components/common/DashboardTitle';
import { SearchBar2 } from '@/components/search/SearchBar2';
import { Loader } from '@/components/ui/loader';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import CustomCheckBox from '@/components/checkbox';
import { mobile360DummyData, Mobile360Type } from '@/types/BeFiSc';
import Mobile360 from './Mobile360';

function isValidIndianMobileNumber(input: string): boolean {
  const mobileRegex = /^(?:\+91[\-\s]?)?[6-9]\d{9}$/;
  return mobileRegex.test(input.trim());
}

export default function BeFiSc() {
  const [searchType, setSearchType] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [mobile360Data, setMobile360Data] = useState<Mobile360Type | null>(
    null,
  );

  const resetAllData = () => {
    setMobile360Data(null);
  };

  const handleSearch = async (query: string, searchFilter: string) => {
    // setIsLoading(true)
    // await new Promise((resolve) => setTimeout(resolve, 1000))
    // setMobile360Data(mobile360DummyData)
    // setIsLoading(false)
    // return
    if (query.length < 1) {
      return;
    }
    const validation = isValidIndianMobileNumber(query);
    if (!validation) {
      toast.error('Invalid mobile number', { duration: 800 });
      return;
    }
    resetAllData();
    setIsLoading(true);
    setSearchType(searchFilter);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mobile360/getMobile360Dtls`,
        { mobileNumber: query, realtimeData: isChecked },
      );
      if (Number(data.responseData?.status) === 1) {
        setMobile360Data(data.responseData);
      } else {
        toast.error('Mobile 360 Data Not Found');
      }
      setIsLoading(false);
    } catch (err) {
      toast.error('Something went wrong');
      setIsLoading(false);
    }
  };

  const searchFilterOptions = [{ label: 'Mobile No', value: 'mobileNumber' }];

  return (
    <div className="space-y-4">
      <DashboardTitle
        title="BeFiSc"
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
          checked={isChecked}
          setChecked={setIsChecked}
        />
      </div>

      {isLoading ? (
        <div className="mt-8">
          <Loader />
        </div>
      ) : mobile360Data ? (
        <div className="grid grid-cols-1 pb-4">
          <Mobile360 data={mobile360Data} />
        </div>
      ) : null}
    </div>
  );
}
