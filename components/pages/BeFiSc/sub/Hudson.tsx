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

import isEqual from 'lodash.isequal';
import { formatKey } from '@/components/custom/functions/formatUtils';
import { getValue } from './CustomBeFiScCard';
import { HudsonEmailType } from '@/types/hudson';
const dangerKeyWords = [
  'top_passwords',
  'malware_path',
  'ip',
  'Phone',
  'Password(SHA1)',
  'Device',
  'Password(bcrypt)',
  'Amount',
];
const yellowKeyWords = [
  'domain',
  'operating_system',
  'date_compromised',
  'antiviruses',
  'State',
  'LeakSite',
  'Latitude',
  'Longitude',
  'LastLogin',
  'Company',
  'Credits',
];
const clickAble = ['Url', 'Site', 'Avatar', 'Password(SHA-256)', 'uri'];

function HudsonComponent({
  hudsonData,
}: {
  hudsonData: {
    value: string;
    type: string;
    data: HudsonEmailType | null;
  }[];
}) {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {hudsonData?.map?.((item, index) => (
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
          <AccordionContent className="grid grid-cols-1 gap-4 p-6 leading-relaxed text-slate-300">
            {item?.data?.responseData?.stealers &&
              item?.data?.responseData?.stealers?.length > 0 &&
              item?.data?.responseData?.stealers?.map((data, index) => {
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
                              yellowKeyWords.includes(key) && 'text-yellow-500',
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
                            {String(value)?.length > 80
                              ? String(value)?.slice(0, 80)
                              : getValue(value)}
                          </span>
                        </div>
                      ))}
                  </div>
                );
              })}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

const Hudson = React.memo(HudsonComponent, (prevProps, nextProps) => {
  const isSame = isEqual(prevProps.hudsonData, nextProps.hudsonData);
  return isSame;
});

export default Hudson;
