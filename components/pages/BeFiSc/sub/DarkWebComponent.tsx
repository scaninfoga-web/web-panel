import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import NotFound from '@/components/sub/NotFound';
import CustomBadge from './CustomBadge';
import { InfoText } from '../../dashboard/components/DashboardCard';
import { getValue } from './CustomBeFiScCard';
import {
  formatKey,
  formatSentence,
} from '@/components/custom/functions/formatUtils';
import { DarkWebType, ObjectArrayLeakType } from '@/types/dark-web';

interface PageProps {
  isArrayObject?: boolean;
  leakData: {
    value: string;
    type: string;
    data: DarkWebType | null | ObjectArrayLeakType;
  }[];
}
const highlightKeys = ['Category'];

export default function DarkWebComponent({
  isArrayObject = false,
  leakData,
}: PageProps) {
  if (isArrayObject) {
    return (
      <>
        {leakData?.length === 0 ? (
          <NotFound value="No Data found" className="max-h-20" />
        ) : (
          leakData?.map?.((item, index) => {
            if (!item?.data?.responseData) {
              return null;
            }
            return (
              <Accordion type="single" collapsible className="space-y-4">
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
                  <AccordionContent className="grid grid-cols-1 gap-4 p-6 leading-relaxed text-slate-300 lg:grid-cols-2">
                    {item?.data?.responseData &&
                      Array.isArray(item?.data?.responseData) &&
                      item?.data?.responseData?.length > 0 &&
                      item?.data?.responseData?.map((value, index) => {
                        return (
                          <div
                            key={`${index}--${value?.id}`}
                            className="grid-col-1 grid gap-4 rounded-2xl border border-slate-600 p-4 lg:grid-cols-2"
                          >
                            {Object.entries(value).map(
                              ([key, value], index) => {
                                return (
                                  <InfoText
                                    key={`${key}-${index}`}
                                    label={formatKey(formatSentence(key)) || ''}
                                    value={formatSentence(value)}
                                    valueClassname={
                                      highlightKeys.includes(key)
                                        ? 'text-yellow-500 break-all'
                                        : 'break-all'
                                    }
                                  />
                                );
                              },
                            )}
                          </div>
                        );
                      })}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })
        )}
      </>
    );
  }
  return (
    <>
      {leakData?.length === 0 ? (
        <NotFound value="No Data found" className="max-h-20" />
      ) : (
        leakData?.map?.((item, index) => {
          if (!item?.data?.responseData) {
            return null;
          }
          return (
            <Accordion type="single" collapsible className="space-y-4">
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
                <AccordionContent className="grid grid-cols-2 gap-4 p-6 leading-relaxed text-slate-300">
                  {item?.data?.responseData &&
                    Object.keys(item?.data?.responseData)?.length > 0 &&
                    Object.entries(item?.data?.responseData).map(
                      ([key, value], index) => {
                        return (
                          <InfoText
                            key={`${key}-${index}`}
                            label={formatKey(key) || ''}
                            value={getValue(value)}
                          />
                        );
                      },
                    )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        })
      )}
    </>
  );
}
