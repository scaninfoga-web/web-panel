import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { BreachInfoType } from '@/types/BreachInfo';
import React from 'react';
import NotFound from '@/components/sub/NotFound';
import CustomBadge from './sub/CustomBadge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
interface PageProps {
  data: {
    value: string;
    type: string;
    data: BreachInfoType;
  }[];
}
const dangerKeyWords = [
  'Password',
  'Password(SHA-256)',
  'IP',
  'Phone',
  'Password(SHA1)',
  'Device',
  'Password(bcrypt)',
  'Amount',
];
const yellowKeyWords = [
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
const clickAble = ['Url', 'Site', 'Avatar', 'Password(SHA-256)'];

export default function BeFiScBreachInfo({ data }: PageProps) {
  const [activeTab, setActiveTab] = React.useState('emails');
  const with91: {
    value: string;
    type: string;
    data: BreachInfoType;
  }[] = [];
  const withOut91: {
    value: string;
    type: string;
    data: BreachInfoType;
  }[] = [];
  const emails: {
    value: string;
    type: string;
    data: BreachInfoType;
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
    { value: 'emails', label: 'Emails' },
    { value: 'with91', label: '+91 Numbers' },
    { value: 'without91', label: 'Numbers' },
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

  return (
    <div>
      <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
        <TabsList
          className={`mb-6 grid h-auto w-full ${gridColsClass} rounded-lg border border-slate-800 bg-slate-900 p-1 text-white sm:w-auto`}
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-md data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-500"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="emails">
          {emails?.length === 0 ? (
            <NotFound value="No Breach found" className="max-h-52" />
          ) : (
            <Accordion type="single" collapsible className="space-y-4">
              {emails?.map?.((item, index) => (
                <AccordionItem
                  key={`outer-${index}`}
                  value={`item-${index}`}
                  className="overflow-hidden rounded-lg border border-slate-700/50 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl"
                >
                  <AccordionTrigger className="px-6 py-4 text-left transition-colors hover:bg-slate-800/30 hover:no-underline">
                    <div className="flex items-center space-x-4">
                      <span className="text-lg font-medium text-white">
                        {item.value}
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
                    {Object.entries(item.data?.responseData?.data?.List).map(
                      ([key, value], index) => {
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
                                  {key}
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
                                                  {key}
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
                                                      clickAble.includes(key) &&
                                                      value.includes('https://')
                                                    ) {
                                                      window.open(
                                                        value,
                                                        '_blank',
                                                      );
                                                    }
                                                  }}
                                                >
                                                  {clickAble.includes(key)
                                                    ? value.length > 30
                                                      ? value.slice(0, 30) +
                                                        '....'
                                                      : value
                                                    : value.length > 30
                                                      ? value.slice(0, 30)
                                                      : value}
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
                      },
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </TabsContent>
        <TabsContent value="with91">
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
                      {item.value}
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
                  {Object.entries(item.data?.responseData?.data?.List).map(
                    ([key, value], index) => {
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
                                {key}
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
                                                {key}
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
                                                    clickAble.includes(key) &&
                                                    value.includes('https://')
                                                  ) {
                                                    window.open(
                                                      value,
                                                      '_blank',
                                                    );
                                                  }
                                                }}
                                              >
                                                {clickAble.includes(key)
                                                  ? value.length > 30
                                                    ? value.slice(0, 30) +
                                                      '....'
                                                    : value
                                                  : value.length > 30
                                                    ? value.slice(0, 30)
                                                    : value}
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
                    },
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
        <TabsContent value="without91">
          <Accordion type="single" collapsible className="space-y-4">
            {withOut91?.map?.((item, index) => (
              <AccordionItem
                key={`outer-${index}`}
                value={`item-${index}`}
                className="overflow-hidden rounded-lg border border-slate-700/50 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl"
              >
                <AccordionTrigger className="px-6 py-4 text-left transition-colors hover:bg-slate-800/30 hover:no-underline">
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-medium text-white">
                      {item.value}
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
                  {Object.entries(item.data?.responseData?.data?.List).map(
                    ([key, value], index) => {
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
                                {key}
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
                                                {key}
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
                                                    clickAble.includes(key) &&
                                                    value.includes('https://')
                                                  ) {
                                                    window.open(
                                                      value,
                                                      '_blank',
                                                    );
                                                  }
                                                }}
                                              >
                                                {clickAble.includes(key)
                                                  ? value.length > 30
                                                    ? value.slice(0, 30) +
                                                      '....'
                                                    : value
                                                  : value.length > 30
                                                    ? value.slice(0, 30)
                                                    : value}
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
                    },
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>
    </div>
  );
}
