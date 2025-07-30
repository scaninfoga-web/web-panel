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
}
export const dangerKeyWords = [
  'Password',
  'Password(SHA-256)',
  'IP',
  'Phone',
  'Password(SHA1)',
  'Device',
  'Password(bcrypt)',
  'Amount',
];
export const yellowKeyWords = [
  'domain',
  'uri',
  'FullName',
  'NickName',
  'State',
  'LeakSite',
  'Latitude',
  'Longitude',
  'LastLogin',
  'Company',
  'Credits',
];
export const clickAble = ['Url', 'Site', 'Avatar', 'Password(SHA-256)', 'uri'];

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
}: PageProps) {
  const [activeTab, setActiveTab] = useState('breach');
  const [breachSubTab, setBreachSubTab] = useState('emails');
  const [hunterTab, setHunterTab] = useState('hunterVerify');
  const [leakTab, setLeakTab] = useState('leakHunter');
  const [extraData, setExtraData] = useState<
    {
      value: string;
      type: string;
      data: BreachInfoType | null;
    }[]
  >([]);

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

  const tabs = [
    { value: 'breach', label: 'Breach Watch' },
    { value: 'darkWeb', label: 'Dark Web' },
    { value: 'Expose360', label: 'Expose360' },
    { value: 'docking', label: 'Docking' },
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

  const gridColsClass = getGridCols(tabs.length);

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
                  <Accordion type="single" collapsible className="space-y-4">
                    {emails &&
                      emails?.map?.((item, index) => (
                        <AccordionItem
                          key={`outer-${index}`}
                          value={`item-${index}`}
                          className="overflow-hidden rounded-lg border border-slate-700/50 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl"
                        >
                          <AccordionTrigger className="px-6 py-4 text-left transition-colors hover:bg-slate-800/30 hover:no-underline">
                            <div className="flex items-center space-x-4">
                              <span className="text-lg font-medium text-white">
                                {item?.value}
                              </span>
                              <CustomBadge
                                blink={true}
                                variantToUse="warning"
                                isFormat={false}
                                value={item?.type}
                              />
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="flex flex-col space-y-4 px-6 pb-4 leading-relaxed text-slate-300">
                            {item?.data?.responseData?.data?.List &&
                              Object.entries(
                                item?.data?.responseData?.data?.List,
                              ).map(([key, value], index) => {
                                if (key === 'No results found') {
                                  return null;
                                }
                                return (
                                  <Accordion
                                    type="single"
                                    key={`innerAcc-${index}-${key}`}
                                    collapsible
                                    className="space-y-4"
                                  >
                                    <AccordionItem
                                      key={`innerAcc-${index}-${key}-${value}`}
                                      value={`index-${index}`}
                                      className="border-b border-slate-800"
                                    >
                                      <AccordionTrigger className="px-6 py-4 text-left transition-colors hover:bg-slate-800/30 hover:no-underline">
                                        <span className="text-lg font-medium text-white">
                                          {key || ''}
                                        </span>
                                      </AccordionTrigger>
                                      <AccordionContent>
                                        <div
                                          key={index}
                                          className="space-y-3 border-b border-slate-800 p-4"
                                        >
                                          <div className="space-y-4">
                                            {value?.Data?.map((item, index) => {
                                              return (
                                                <div
                                                  key={index}
                                                  className="grid grid-cols-3 gap-4 rounded-2xl border border-slate-800 p-3"
                                                >
                                                  {Object.entries(item).map(
                                                    ([key, value], index) => (
                                                      <div
                                                        key={`index-${index}`}
                                                        className="flex flex-col"
                                                      >
                                                        <span
                                                          className={`text-sm`}
                                                        >
                                                          {key || ''}
                                                        </span>
                                                        <span
                                                          className={cn(
                                                            'text-base',
                                                            dangerKeyWords?.includes(
                                                              key || '',
                                                            ) && 'text-red-500',
                                                            yellowKeyWords?.includes(
                                                              key || '',
                                                            ) &&
                                                              'text-yellow-500',
                                                            clickAble.includes(
                                                              key,
                                                            ) &&
                                                              'text-blue-400 underline transition-all duration-300 ease-in-out hover:cursor-pointer',
                                                          )}
                                                          onClick={() => {
                                                            if (
                                                              clickAble.includes(
                                                                key,
                                                              ) &&
                                                              value.includes(
                                                                'http://',
                                                              )
                                                            ) {
                                                              window.open(
                                                                value,
                                                                '_blank',
                                                              );
                                                            }
                                                          }}
                                                        >
                                                          {value?.length > 30
                                                            ? value?.slice(
                                                                0,
                                                                30,
                                                              ) + '....'
                                                            : getValue(value)}
                                                        </span>
                                                      </div>
                                                    ),
                                                  )}
                                                </div>
                                              );
                                            })}
                                          </div>
                                          <div className="p-4">
                                            <h1 className="text-sm">
                                              Description
                                            </h1>
                                            <div className="text-sm">
                                              {value?.InfoLeak}
                                            </div>
                                          </div>
                                        </div>
                                      </AccordionContent>
                                    </AccordionItem>
                                  </Accordion>
                                );
                              })}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                  </Accordion>
                  {/* <AddMoreBreachButton
                    setExtraData={setExtraData}
                    label="Email"
                  /> */}
                </div>
              )}
            </TabsContent>
            <TabsContent className="flex flex-col space-y-8" value="with91">
              <Accordion type="single" collapsible className="space-y-4">
                {with91?.map?.((item, index) => (
                  <AccordionItem
                    key={`outer-${index}`}
                    value={`item-${index}`}
                    className="overflow-hidden rounded-lg border border-slate-700/50 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl"
                  >
                    <AccordionTrigger className="px-6 py-4 text-left transition-colors hover:bg-slate-800/30 hover:no-underline">
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-medium text-white">
                          {item?.value || ''}
                        </span>
                        <CustomBadge
                          blink={true}
                          variantToUse="warning"
                          isFormat={false}
                          value={item?.type}
                        />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col space-y-4 px-6 pb-4 leading-relaxed text-slate-300">
                      {item?.data?.responseData?.data?.List &&
                        Object.entries(
                          item?.data?.responseData?.data?.List,
                        ).map(([key, value], index) => {
                          if (key === 'No results found') {
                            return (
                              <NotFound
                                key={`notFound-${index}`}
                                value="No Data found"
                                className="max-h-20"
                              />
                            );
                          }
                          return (
                            <Accordion
                              type="single"
                              key={`innerAcc-${index}`}
                              collapsible
                              className="space-y-4"
                            >
                              <AccordionItem
                                key={index}
                                value={`index-${index}`}
                                className="border-b border-slate-800"
                              >
                                <AccordionTrigger className="px-6 py-4 text-left transition-colors hover:bg-slate-800/30 hover:no-underline">
                                  <span className="text-lg font-medium text-white">
                                    {key || ''}
                                  </span>
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div
                                    key={index}
                                    className="space-y-3 border-b border-slate-800 p-4"
                                  >
                                    <div className="space-y-4">
                                      {value?.Data?.map((item, index) => {
                                        return (
                                          <div
                                            key={index}
                                            className="grid grid-cols-3 gap-4 rounded-2xl border border-slate-800 p-3"
                                          >
                                            {Object.entries(item).map(
                                              ([key, value], index) => (
                                                <div
                                                  key={`index-${index}`}
                                                  className="flex flex-col"
                                                >
                                                  <span className={`text-sm`}>
                                                    {key || ''}
                                                  </span>
                                                  <span
                                                    className={cn(
                                                      'text-base',
                                                      dangerKeyWords.includes(
                                                        key,
                                                      ) && 'text-red-500',
                                                      yellowKeyWords.includes(
                                                        key,
                                                      ) && 'text-yellow-500',
                                                      clickAble.includes(key) &&
                                                        'text-blue-400 underline transition-all duration-300 ease-in-out hover:cursor-pointer',
                                                    )}
                                                    onClick={() => {
                                                      if (
                                                        clickAble.includes(
                                                          key,
                                                        ) &&
                                                        value.includes(
                                                          'http://',
                                                        )
                                                      ) {
                                                        window.open(
                                                          value,
                                                          '_blank',
                                                        );
                                                      }
                                                    }}
                                                  >
                                                    {value?.length > 30
                                                      ? value?.slice(0, 30) +
                                                        '....'
                                                      : getValue(value)}
                                                  </span>
                                                </div>
                                              ),
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                    <div className="p-4">
                                      <h1 className="text-sm">Description</h1>
                                      <div className="text-sm">
                                        {value?.InfoLeak}
                                      </div>
                                    </div>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          );
                        })}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              {/* <AddMoreBreachButton setExtraData={setExtraData} label="Number" /> */}
            </TabsContent>
            <TabsContent value="without91" className="flex flex-col space-y-8">
              <Accordion type="single" collapsible className="space-y-4">
                {withOut91?.map?.((item, index) => (
                  <AccordionItem
                    key={`outer-${index}-${item?.value}`}
                    value={`item-${index}`}
                    className="overflow-hidden rounded-lg border border-slate-700/50 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl"
                  >
                    <AccordionTrigger className="px-6 py-4 text-left transition-colors hover:bg-slate-800/30 hover:no-underline">
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-medium text-white">
                          {item?.value}
                        </span>
                        <CustomBadge
                          blink={true}
                          variantToUse="warning"
                          isFormat={false}
                          value={item?.type}
                        />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col space-y-4 px-6 pb-4 leading-relaxed text-slate-300">
                      {item?.data?.responseData?.data?.List &&
                        Object.entries(
                          item?.data?.responseData?.data?.List,
                        ).map(([key, value], index) => {
                          if (key === 'No results found') {
                            return null;
                          }
                          return (
                            <Accordion
                              type="single"
                              key={`innerAcc-${index}-${key}`}
                              collapsible
                              className="space-y-4"
                            >
                              <AccordionItem
                                value={`index-${index}`}
                                className="border-b border-slate-800"
                              >
                                <AccordionTrigger className="px-6 py-4 text-left transition-colors hover:bg-slate-800/30 hover:no-underline">
                                  <span className="text-lg font-medium text-white">
                                    {key || ''}
                                  </span>
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div
                                    key={index}
                                    className="space-y-3 border-b border-slate-800 p-4"
                                  >
                                    <div className="space-y-4">
                                      {value?.Data?.map((item, index) => {
                                        return (
                                          <div
                                            key={`innerAcc-${index}-${key}`}
                                            className="grid grid-cols-3 gap-4 rounded-2xl border border-slate-800 p-3"
                                          >
                                            {Object.entries(item).map(
                                              ([key, value], index) => (
                                                <div
                                                  key={`innerAcc-${index}-${key}`}
                                                  className="flex flex-col"
                                                >
                                                  <span className={`text-sm`}>
                                                    {key || ''}
                                                  </span>
                                                  <span
                                                    className={cn(
                                                      'text-base',
                                                      dangerKeyWords.includes(
                                                        key,
                                                      ) && 'text-red-500',
                                                      yellowKeyWords.includes(
                                                        key,
                                                      ) && 'text-yellow-500',
                                                      clickAble.includes(key) &&
                                                        'text-blue-400 underline transition-all duration-300 ease-in-out hover:cursor-pointer',
                                                    )}
                                                    onClick={() => {
                                                      if (
                                                        clickAble.includes(
                                                          key,
                                                        ) &&
                                                        value?.includes(
                                                          'http://',
                                                        )
                                                      ) {
                                                        window.open(
                                                          value,
                                                          '_blank',
                                                        );
                                                      }
                                                    }}
                                                  >
                                                    {value?.length > 30
                                                      ? value?.slice(0, 30) +
                                                        '....'
                                                      : getValue(value)}
                                                  </span>
                                                </div>
                                              ),
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                    <div className="p-4">
                                      <h1 className="text-sm">Description</h1>
                                      <div className="text-sm">
                                        {value?.InfoLeak}
                                      </div>
                                    </div>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          );
                        })}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              {/* <AddMoreBreachButton setExtraData={setExtraData} label="Number" /> */}
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
        <TabsContent value="docking">
          <div className="grid grid-cols-1 gap-4">
            {rapidApiData?.map((item, index) => {
              if (item?.data?.responseData?.results?.length === 0) {
                return null;
              }
              return (
                <DashboardCard
                  key={`${item?.type}${item?.value}${index}`}
                  title={`${item?.data?.responseData?.search_term}`}
                  icon={
                    <CustomBadge
                      blink={true}
                      variantToUse="warning"
                      isFormat={false}
                      value={item?.type}
                    />
                  }
                  className="max-h-[400px] overflow-auto"
                >
                  <div className="flex flex-col space-y-2">
                    <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                      {item?.data?.responseData?.results?.map(
                        (result, index) => (
                          <div
                            className="flex flex-col space-y-1 rounded-2xl border border-slate-800 p-4"
                            key={index}
                          >
                            <InfoText
                              value={
                                <a
                                  href={result?.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-base font-medium text-blue-600 underline hover:cursor-pointer"
                                >
                                  {result?.url?.slice(0, 25)}
                                </a>
                              }
                              label="URL"
                            />
                            <InfoText value={result?.title} label="Title" />
                            <div
                              className={cn(
                                'break-words text-sm text-gray-400',
                              )}
                            >
                              {result?.description}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </DashboardCard>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
