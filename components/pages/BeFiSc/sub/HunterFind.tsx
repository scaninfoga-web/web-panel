import { HunterFindType } from '@/types/hunter';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { BreachInfoType } from '@/types/BreachInfo';
import React, { useState } from 'react';
import CustomBadge from './CustomBadge';
import { HunterVerifyType } from '@/types/hunter';
import CustomBeFiScCard, { formatKey, getValue } from './CustomBeFiScCard';
import { JobSeekerType, LeakHunterType } from '@/types/LeakHunter';
import isEqual from 'lodash.isequal';

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
const clickAble = ['Url', 'Site', 'Avatar', 'Password(SHA-256)', 'uri'];

export default function HunterFind({
  hunterFindData,
}: {
  hunterFindData: {
    value: string;
    type: string;
    data: HunterFindType | null;
  }[];
}) {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {hunterFindData?.map?.((item, index) => (
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
          <AccordionContent className="grid grid-cols-2 gap-4 p-6 leading-relaxed text-slate-300">
            {item?.data?.responseData?.data?.data?.person && (
              <CustomBeFiScCard
                title="Person"
                data={item?.data?.responseData?.data?.data?.person?.github}
              />
            )}
            {/* {item?.data?.responseData?.data?.data &&
              item?.data?.responseData?.data?.data?.sources?.length > 0 &&
              item?.data?.responseData?.data?.data?.sources.map(
                (data, index) => {
                  return (
                    <div key={index} className="border border-slate-800 p-4">
                      {data &&
                        Object.entries(data).map(([key, value], index) => (
                          <div
                            key={`index-${index}`}
                            className="flex justify-between"
                          >
                            <span className={`text-sm`}>
                              {formatKey(key) || ''}
                            </span>
                            <span
                              className={cn(
                                'text-base',
                                dangerKeyWords.includes(key) && 'text-red-500',
                                yellowKeyWords.includes(key) &&
                                  'text-yellow-500',
                                clickAble.includes(key) &&
                                  'text-blue-400 underline transition-all duration-300 ease-in-out hover:cursor-pointer',
                              )}
                              onClick={() => {
                                if (
                                  clickAble.includes(key) &&
                                  String(value)?.includes('http://')
                                ) {
                                  window.open(String(value), '_blank');
                                }
                              }}
                            >
                              {String(value)?.length > 30
                                ? String(value)?.slice(0, 30)
                                : getValue(value)}
                            </span>
                          </div>
                        ))}
                    </div>
                  );
                },
              )} */}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
