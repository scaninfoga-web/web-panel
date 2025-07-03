import { HunterFindType } from '@/types/hunter';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { BreachInfoType } from '@/types/BreachInfo';
import React, { useState } from 'react';
import CustomBadge from './CustomBadge';
import { HunterVerifyType } from '@/types/hunter';
import CustomBeFiScCard from './CustomBeFiScCard';
import { JobSeekerType, LeakHunterType } from '@/types/LeakHunter';
import { InfoText } from '../../dashboard/components/DashboardCard';
import { formatSentence } from '@/components/custom/functions/formatUtils';

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
      {hunterFindData?.map?.((item, index) => {
        if (!item?.data?.responseData?.data?.data?.company) {
          return <></>;
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
            <AccordionContent className="grid grid-cols-1 gap-4 p-6 leading-relaxed text-slate-300">
              <InfoText
                label="Github Handle"
                value={formatSentence(
                  item?.data?.responseData?.data?.data?.person?.github?.handle,
                )}
              />
              <InfoText
                label="Twitter Handle"
                value={formatSentence(
                  item?.data?.responseData?.data?.data?.person?.twitter?.handle,
                )}
              />
              <InfoText
                label="Facebook Handle"
                value={formatSentence(
                  item?.data?.responseData?.data?.data?.person?.facebook
                    ?.handle,
                )}
              />
              <InfoText
                label="Linkedin Handle"
                value={formatSentence(
                  item?.data?.responseData?.data?.data?.person?.linkedin
                    ?.handle,
                )}
              />
              <InfoText
                label="Googleplus Handle"
                value={formatSentence(
                  item?.data?.responseData?.data?.data?.person?.googleplus
                    ?.handle,
                )}
              />
              <div className="flex flex-col gap-4 border border-slate-800 p-4">
                <span className="font-bold">Phone Numbers</span>
                <div className="grid grid-cols-6 gap-4">
                  {item?.data?.responseData?.data?.data?.company?.site?.phoneNumbers?.map?.(
                    (item, index) => (
                      <span key={`${item}-${index}`}>
                        {formatSentence(item)}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4 border border-slate-800 p-4">
                <span className="font-bold">Email Addresses</span>
                <div className="grid grid-cols-4 gap-4">
                  {item?.data?.responseData?.data?.data?.company?.site?.emailAddresses?.map?.(
                    (item, index) => (
                      <span key={`${item}-${index}`}>
                        {formatSentence(item)}
                      </span>
                    ),
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4 border border-slate-800 p-4">
                <span className="font-bold">Tags</span>
                <div className="grid grid-cols-6 gap-4">
                  {item?.data?.responseData?.data?.data?.company?.tags?.map?.(
                    (item, index) => (
                      <span key={`${item}-${index}`}>
                        {formatSentence(item)}
                      </span>
                    ),
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4 border border-slate-800 p-4">
                <span className="font-bold">Tech</span>
                <div className="grid grid-cols-6 gap-4">
                  {item?.data?.responseData?.data?.data?.company?.tech?.map?.(
                    (item, index) => (
                      <span key={`${item}-${index}`}>
                        {formatSentence(item)}
                      </span>
                    ),
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4 border border-slate-800 p-4">
                <span className="font-bold">Metrics</span>
                <div className="grid grid-cols-4 gap-4">
                  {Object.entries(
                    item?.data?.responseData?.data?.data?.company?.metrics ||
                      {},
                  ).map(([key, value]) => (
                    <InfoText
                      label={formatSentence(key)}
                      value={formatSentence(value)}
                    />
                  ))}
                </div>
              </div>

              <InfoText
                label="Company Linkedin"
                value={formatSentence(
                  item?.data?.responseData?.data?.data?.company?.linkedin
                    ?.handle,
                )}
              />
              <InfoText
                label="Company Description"
                value={formatSentence(
                  item?.data?.responseData?.data?.data?.company?.description?.slice(
                    0,
                    100,
                  ),
                )}
              />
              <InfoText
                label="Email Provider"
                value={formatSentence(
                  item?.data?.responseData?.data?.data?.company?.emailProvider,
                )}
              />
              <CustomBeFiScCard
                title="Tech Categories"
                data={
                  item?.data?.responseData?.data?.data?.company?.techCategories
                }
              />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
