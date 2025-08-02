import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { BreachInfoType } from '@/types/BreachInfo';
import React, { useMemo, useState } from 'react';
import NotFound from '@/components/sub/NotFound';
import CustomBadge from './sub/CustomBadge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HunterFindType, HunterVerifyType } from '@/types/hunter';
import { getValue } from './sub/CustomBeFiScCard';
import AddMoreBreachButton from './sub/AddMoreBreachButton';
import LeakHunter from './sub/LeakHunter';
import { JobSeekerType, LeakHunterType } from '@/types/LeakHunter';
import JobSeeker from './sub/JobSeeker';
import HunterVerify from './sub/HunterVerify';
import HunterFind from './sub/HunterFind';
import { HudsonEmailType } from '@/types/hudson';
import Hudson from './sub/Hudson';
import { HoleheType } from '@/types/holhe';
import { GhuntData } from '@/types/ghunt';
import EmailDetector from './sub/EmailDetector';
import { DarkWebType, ObjectArrayLeakType } from '@/types/dark-web';
import DarkWebComponent from './sub/DarkWebComponent';
import { RapidSearchAPIType } from '@/types/rapidAPI';
import { DashboardCard, InfoText } from '../dashboard/components/DashboardCard';
import InfoText2 from '@/components/custom/components/InfoText2';
import Docking from './sub/Docking';
import BreachComp from './sub/BreachComp';
import { PanAllInOneType } from '@/types/BeFiSc';

interface PageProps {
  data: {
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
  hudsonData: {
    value: string;
    type: string;
    data: HudsonEmailType | null;
  }[];
  holeheData: {
    value: string;
    type: string;
    data: HoleheType | null;
  }[];
  ghuntMultipleData: GhuntData[];
  zomatoLeakData: {
    value: string;
    type: string;
    data: DarkWebType | null;
  }[];
  coperateLeakData: {
    value: string;
    type: string;
    data: DarkWebType | null;
  }[];
  cbseLeakData: {
    value: string;
    type: string;
    data: DarkWebType | null;
  }[];
  olxLeakData: {
    value: string;
    type: string;
    data: ObjectArrayLeakType | null;
  }[];
  indiaMartLeakData: {
    value: string;
    type: string;
    data: ObjectArrayLeakType | null;
  }[];
  rapidApiData: {
    value: string;
    type: string;
    data: RapidSearchAPIType | null;
  }[];
  panAllInOneData: PanAllInOneType | null;
}
export const dangerKeyWords = [
  'password',
  'password(sha-256)',
  'ip',
  'password(sha1)',
  'device',
  'password(bcrypt)',
  'amount',
];
export const yellowKeyWords = [
  'phone',
  ...Array.from({ length: 15 }, (_, i) => `phone${i}`),
  'mobile',
  'domain',
  'uri',
  'fullname',
  'nickname',
  'state',
  'leaksite',
  'Latitude',
  'longitude',
  'lastlogin',
  'company',
  'credits',
  'passportnumber',
  'docnumber',
  ...Array.from({ length: 15 }, (_, i) => `docnumber${i}`),
];
export const clickAble = ['url', 'site', 'avatar', 'password(sha-256)', 'uri'];

export default function BeFiScBreachInfo({
  data,
  HunterVerifyData,
  HunterFindData,
  leakHunterData,
  jobSeekerData,
  hudsonData,
  holeheData,
  ghuntMultipleData,
  zomatoLeakData,
  coperateLeakData,
  cbseLeakData,
  olxLeakData,
  indiaMartLeakData,
  rapidApiData,
  panAllInOneData,
}: PageProps) {
  const [activeTab, setActiveTab] = useState('breach');
  const [breachSubTab, setBreachSubTab] = useState('emails');
  const [hunterTab, setHunterTab] = useState('hunterVerify');
  const [leakTab, setLeakTab] = useState('leakHunter');

  const with91: {
    value: string;
    type: string;
    data: BreachInfoType | null;
  }[] = [];
  const withOut91: {
    value: string;
    type: string;
    data: BreachInfoType | null;
  }[] = [];
  const emails: {
    value: string;
    type: string;
    data: BreachInfoType | null;
  }[] = [];
  data?.forEach((item) => {
    if (item?.value?.includes('+91')) {
      return with91.push(item);
    }
    if (item?.value?.includes('@')) {
      return emails.push(item);
    }
    withOut91.push(item);
  });
  const toShowDocking =
    rapidApiData?.length > 0 &&
    rapidApiData?.some((item) => {
      if ((item?.data?.responseData?.results?.length || 0) > 0) {
        return true;
      }
    });

  const tabs = [
    { value: 'breach', label: 'Breach Watch' },
    { value: 'darkWeb', label: 'Dark Web' },
    { value: 'Expose360', label: 'Expose360' },
    toShowDocking && { value: 'docking', label: 'Docking' },
  ];

  const getGridCols = (tabCount: number) => {
    const gridClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
      5: 'grid-cols-5',
      6: 'grid-cols-6',
      7: 'grid-cols-7',
      8: 'grid-cols-8',
    };
    return gridClasses[tabCount as keyof typeof gridClasses] || 'grid-cols-8';
  };

  const gridColsClass = getGridCols(
    toShowDocking ? tabs.length : tabs.length - 1,
  );

  const darkWebTabs = [
    leakHunterData?.length > 0 &&
    leakHunterData?.some((item) => {
      if (
        item?.data?.responseData?.password &&
        item?.data?.responseData?.password?.length > 0
      ) {
        return true;
      }
    })
      ? { value: 'leakHunter', label: 'Leak Hunter' }
      : null,
    jobSeekerData?.length > 0 &&
    jobSeekerData?.some((item) => {
      if (Object.keys(item?.data?.responseData || {}).length > 0) {
        return true;
      }
    })
      ? { value: 'jobSeeker', label: 'Job Seeker' }
      : null,

    zomatoLeakData?.length > 0 &&
    zomatoLeakData?.some((item) => {
      if (Object.keys(item?.data?.responseData || {}).length > 0) {
        return true;
      }
    })
      ? { value: 'zomatoLeak', label: 'Zomato Leak' }
      : null,
    coperateLeakData?.length > 0 &&
    coperateLeakData?.some((item) => {
      if (Object.keys(item?.data?.responseData || {}).length > 0) {
        return true;
      }
    })
      ? { value: 'coperateLeak', label: 'Cooperate Leak' }
      : null,
    cbseLeakData?.length > 0 &&
    cbseLeakData?.some((item) => {
      if (Object.keys(item?.data?.responseData || {}).length > 0) {
        return true;
      }
    })
      ? { value: 'cbseLeak', label: 'CBSE Leak' }
      : null,
    olxLeakData?.length > 0 &&
    olxLeakData?.some((item) => {
      if ((item?.data?.responseData?.length || 0) > 0) {
        return true;
      }
    })
      ? { value: 'olxLeak', label: 'OLX Leak' }
      : null,
    indiaMartLeakData?.length > 0 &&
    indiaMartLeakData?.some((item) => {
      if ((item?.data?.responseData?.length || 0) > 0) {
        return true;
      }
    })
      ? { value: 'indiaMartLeak', label: 'India Mart Leak' }
      : null,
  ];

  const Expose360Tabs = [
    HunterVerifyData?.length > 0 &&
    HunterVerifyData?.some((item) => {
      if (
        item?.data?.responseData?.data?.data?.sources &&
        item?.data?.responseData?.data?.data?.sources.length > 0
      ) {
        return true;
      }
    })
      ? { value: 'hunterVerify', label: 'Hunter Verify' }
      : null,

    HunterFindData?.length > 0 &&
    HunterFindData?.some((item) => {
      if (
        item?.data?.responseData?.data?.data?.person &&
        Object.keys(item?.data?.responseData?.data?.data?.person).length > 0
      ) {
        return true;
      }
    })
      ? { value: 'hunterFind', label: 'Hunter Find' }
      : null,

    hudsonData?.length > 0 &&
    hudsonData?.some((item) => {
      if (
        item?.data?.responseData?.stealers &&
        item?.data?.responseData?.stealers.length > 0
      ) {
        return true;
      }
    })
      ? { value: 'hudson', label: 'Hudson' }
      : null,
    holeheData?.length > 0 &&
    holeheData?.some((item) => {
      if (
        item?.data?.responseData?.results &&
        item?.data?.responseData?.results?.length > 0
      ) {
        return true;
      }
    })
      ? { value: 'holehe', label: 'Email Detector' }
      : null,
  ];

  return (
    <div>
      <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
        <TabsList
          className={`mb-6 grid h-auto w-full ${gridColsClass} rounded-lg border border-slate-800 bg-slate-900 p-1 text-white sm:w-auto`}
        >
          {tabs.map(
            (tab) =>
              tab && (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-md data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-500"
                >
                  {tab?.label}
                </TabsTrigger>
              ),
          )}
        </TabsList>
        <TabsContent value="breach">
          <Tabs
            value={breachSubTab}
            className="w-full"
            onValueChange={setBreachSubTab}
          >
            <TabsList
              className={`mb-6 grid h-auto w-full grid-cols-3 rounded-lg border border-slate-800 bg-slate-950 p-1 text-white sm:w-auto`}
            >
              {[
                { value: 'emails', label: 'Emails' },
                { value: 'with91', label: '+91 Numbers' },
                { value: 'without91', label: 'Numbers' },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-md data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-500"
                >
                  {tab?.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="emails">
              {emails && emails?.length === 0 ? (
                <div className="flex flex-col space-y-8">
                  <NotFound value="No Breach found" className="max-h-52" />
                  {/* <AddMoreBreachButton
                    setExtraData={setExtraData}
                    label="Email"
                  /> */}
                </div>
              ) : (
                <div className="flex flex-col space-y-8">
                  <BreachComp panAllInOneData={panAllInOneData} data={emails} />
                  {/* <AddMoreBreachButton
                    setExtraData={setExtraData}
                    label="Email"
                  /> */}
                </div>
              )}
            </TabsContent>
            <TabsContent className="flex flex-col space-y-8" value="with91">
              {with91 && with91?.length === 0 ? (
                <div className="flex flex-col space-y-8">
                  <NotFound value="No Breach found" className="max-h-52" />
                  {/* <AddMoreBreachButton
                    setExtraData={setExtraData}
                    label="Email"
                  /> */}
                </div>
              ) : (
                <div className="flex flex-col space-y-8">
                  <BreachComp panAllInOneData={panAllInOneData} data={with91} />

                  {/* <AddMoreBreachButton
                    setExtraData={setExtraData}
                    label="Email"
                  /> */}
                </div>
              )}
            </TabsContent>
            <TabsContent value="without91" className="flex flex-col space-y-8">
              {withOut91 && withOut91?.length === 0 ? (
                <div className="flex flex-col space-y-8">
                  <NotFound value="No Breach found" className="max-h-52" />
                  {/* <AddMoreBreachButton
                    setExtraData={setExtraData}
                    label="Email"
                  /> */}
                </div>
              ) : (
                <div className="flex flex-col space-y-8">
                  <BreachComp
                    panAllInOneData={panAllInOneData}
                    data={withOut91}
                  />

                  {/* <AddMoreBreachButton
                    setExtraData={setExtraData}
                    label="Email"
                  /> */}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="darkWeb">
          <Tabs value={leakTab} className="w-full" onValueChange={setLeakTab}>
            <TabsList
              className={`mb-6 grid h-auto w-full grid-cols-${darkWebTabs?.length} rounded-lg border border-slate-800 bg-slate-950 text-white sm:w-auto`}
            >
              {darkWebTabs.map(
                (tab) =>
                  tab && (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="rounded-md data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-500"
                    >
                      {tab?.label}
                    </TabsTrigger>
                  ),
              )}
            </TabsList>
            {leakHunterData?.length > 0 &&
              leakHunterData?.some(
                (item) =>
                  item?.data?.responseData?.password &&
                  item.data.responseData.password.length > 0,
              ) && (
                <TabsContent value="leakHunter">
                  <LeakHunter emails={leakHunterData} />
                </TabsContent>
              )}

            {jobSeekerData?.length > 0 &&
              jobSeekerData?.some(
                (item) =>
                  item?.data?.responseData &&
                  Object.keys(item?.data?.responseData).length > 0,
              ) && (
                <TabsContent value="jobSeeker">
                  <JobSeeker jobSeekerData={jobSeekerData} />
                </TabsContent>
              )}

            {zomatoLeakData?.length > 0 &&
              zomatoLeakData?.some((item) => {
                if (Object.keys(item?.data?.responseData || {}).length > 0) {
                  return true;
                }
              }) && (
                <TabsContent value="zomatoLeak">
                  <DarkWebComponent leakData={zomatoLeakData} />
                </TabsContent>
              )}
            {coperateLeakData?.length > 0 &&
              coperateLeakData?.some((item) => {
                if (Object.keys(item?.data?.responseData || {}).length > 0) {
                  return true;
                }
              }) && (
                <TabsContent value="coperateLeak">
                  <DarkWebComponent leakData={coperateLeakData} />
                </TabsContent>
              )}

            {cbseLeakData?.length > 0 &&
              cbseLeakData?.some((item) => {
                if (Object.keys(item?.data?.responseData || {}).length > 0) {
                  return true;
                }
              }) && (
                <TabsContent value="cbseLeak">
                  <DarkWebComponent leakData={cbseLeakData} />
                </TabsContent>
              )}
            {olxLeakData?.length > 0 &&
              olxLeakData?.some((item) => {
                if ((item?.data?.responseData?.length || 0) > 0) {
                  return true;
                }
              }) && (
                <TabsContent value="olxLeak">
                  <DarkWebComponent
                    leakData={olxLeakData}
                    isArrayObject={true}
                  />
                </TabsContent>
              )}
            {indiaMartLeakData?.length > 0 &&
              indiaMartLeakData?.some((item) => {
                if ((item?.data?.responseData?.length || 0) > 0) {
                  return true;
                }
              }) && (
                <TabsContent value="indiaMartLeak">
                  <DarkWebComponent
                    leakData={indiaMartLeakData}
                    isArrayObject={true}
                  />
                </TabsContent>
              )}
          </Tabs>
        </TabsContent>

        <TabsContent value="Expose360">
          <Tabs
            value={hunterTab}
            className="w-full"
            onValueChange={setHunterTab}
          >
            <TabsList
              className={`mb-6 grid h-auto w-full grid-cols-${Expose360Tabs?.length} rounded-lg border border-slate-800 bg-slate-950 p-1 text-white sm:w-auto`}
            >
              {Expose360Tabs?.map(
                (tab) =>
                  tab &&
                  tab.value && (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="rounded-md data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-500"
                    >
                      {tab?.label}
                    </TabsTrigger>
                  ),
              )}
            </TabsList>
            <TabsContent value="hunterVerify">
              {HunterVerifyData?.length > 0 &&
                HunterVerifyData?.some((item) => {
                  if (
                    item?.data?.responseData?.data?.data?.sources &&
                    item?.data?.responseData?.data?.data?.sources.length > 0
                  ) {
                    return true;
                  }
                }) && <HunterVerify HunterVerifyData={HunterVerifyData} />}
            </TabsContent>
            <TabsContent value="hunterFind">
              {HunterVerifyData?.length > 0 &&
                HunterFindData?.some((item) => {
                  if (
                    item?.data?.responseData?.data?.data?.person &&
                    Object.keys(item?.data?.responseData?.data?.data?.person)
                      .length > 0
                  ) {
                    return true;
                  }
                }) && <HunterFind hunterFindData={HunterFindData} />}
            </TabsContent>
            <TabsContent value="hudson">
              {hudsonData?.length > 0 &&
                hudsonData?.some((item) => {
                  if (
                    item?.data?.responseData?.stealers &&
                    item?.data?.responseData?.stealers.length > 0
                  ) {
                    return true;
                  }
                }) && <Hudson hudsonData={hudsonData} />}
            </TabsContent>
            <TabsContent value="holehe">
              {holeheData?.length > 0 &&
                holeheData?.some((item) => {
                  if (
                    item?.data?.responseData?.results &&
                    item?.data?.responseData?.results.length > 0
                  ) {
                    return true;
                  }
                }) && (
                  <EmailDetector
                    ghuntMultipleData={ghuntMultipleData}
                    holeheData={holeheData}
                  />
                )}
            </TabsContent>
          </Tabs>
        </TabsContent>
        {toShowDocking && (
          <TabsContent value="docking">
            <Docking rapidApiData={rapidApiData} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
