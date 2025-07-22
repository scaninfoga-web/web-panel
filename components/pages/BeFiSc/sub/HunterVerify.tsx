import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import CustomBadge from './CustomBadge';
import { HunterVerifyType } from '@/types/hunter';
import isEqual from 'lodash.isequal';
import { formatKey } from '@/components/custom/functions/formatUtils';
import { getValue } from './CustomBeFiScCard';
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

function HunterVerifyComponent({
  HunterVerifyData,
}: {
  HunterVerifyData: {
    value: string;
    type: string;
    data: HunterVerifyType | null;
  }[];
}) {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {HunterVerifyData?.map?.((item, index) => {
        if (
          !item?.data?.responseData?.data?.data.sources ||
          item?.data?.responseData?.data?.data.sources?.length === 0
        ) {
          return null;
        }

        return (
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
              {item?.data?.responseData?.data?.data?.sources &&
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
                                  dangerKeyWords.includes(key) &&
                                    'text-red-500',
                                  yellowKeyWords.includes(key) &&
                                    'text-yellow-500',
                                  clickAble.includes(key) &&
                                    'text-blue-400 underline transition-all duration-300 ease-in-out hover:cursor-pointer',
                                )}
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
                )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

const HunterVerify = React.memo(
  HunterVerifyComponent,
  (prevProps, nextProps) => {
    const isSame = isEqual(
      prevProps.HunterVerifyData,
      nextProps.HunterVerifyData,
    );
    return isSame;
  },
);

export default HunterVerify;
