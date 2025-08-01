import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { BreachInfoType } from '@/types/BreachInfo';
import CustomBadge from './CustomBadge';
import { clickAble, dangerKeyWords, yellowKeyWords } from '../BeFiScBreachInfo';
import { getValue } from './CustomBeFiScCard';
import { cn } from '@/lib/utils';
import AddressCustomPopComponent from '@/components/custom/components/AddressCustomPopComponent';
import { formatSentence } from '@/components/custom/functions/formatUtils';
import { PanAllInOneType } from '@/types/BeFiSc';
import { toast } from 'sonner';
interface BreachCompProps {
  data: {
    value: string;
    type: string;
    data: BreachInfoType | null;
  }[];
  panAllInOneData: PanAllInOneType | null;
}

export default function BreachComp({ data, panAllInOneData }: BreachCompProps) {
  const panNumber = panAllInOneData?.result?.pan_number || '';
  const lastFourDigitsAaddhar =
    panAllInOneData?.result?.masked_aadhaar?.slice(-4) || '';
  const checkForkey = (
    key: string,
    value: string,
  ): {
    key: string;
    validated: boolean;
  } => {
    if (panNumber === value) {
      return {
        key: 'Pan Number',
        validated: true,
      };
    }
    if (lastFourDigitsAaddhar === value.slice(-4) && value.length === 12) {
      return {
        key: 'Aadhaar Number',
        validated: true,
      };
    }
    return {
      key,
      validated: false,
    };
  };

  return (
    <Accordion type="single" collapsible className="space-y-4">
      {data &&
        data?.map?.((item, index) => (
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
                Object.entries(item?.data?.responseData?.data?.List).map(
                  ([key, value], index) => {
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
                                            {(() => {
                                              const result = checkForkey(
                                                key || '',
                                                value || '',
                                              );
                                              return (
                                                <span className="text-sm">
                                                  {result.validated ? (
                                                    <CustomBadge
                                                      value={result.key}
                                                      variantToUse="warning"
                                                    />
                                                  ) : (
                                                    key || ''
                                                  )}
                                                </span>
                                              );
                                            })()}

                                            <span
                                              className={cn(
                                                'text-base',
                                                dangerKeyWords?.includes(
                                                  key.toLowerCase() || '',
                                                ) && 'text-red-500',
                                                yellowKeyWords?.includes(
                                                  key?.toLowerCase() || '',
                                                ) && 'text-yellow-500',
                                                clickAble.includes(
                                                  key?.toLowerCase() || '',
                                                ) &&
                                                  'text-blue-400 underline transition-all duration-300 ease-in-out hover:cursor-pointer',
                                              )}
                                              onClick={() => {
                                                if (
                                                  clickAble.includes(key) &&
                                                  value.includes('http://')
                                                ) {
                                                  window.open(value, '_blank');
                                                }
                                              }}
                                            >
                                              {key
                                                .toLowerCase()
                                                .includes('address') ? (
                                                <AddressCustomPopComponent
                                                  address={value}
                                                  shorterAddress={true}
                                                />
                                              ) : value?.length > 30 ? (
                                                getValue(
                                                  value?.slice(0, 25) + '...',
                                                )
                                              ) : (
                                                getValue(value)
                                              )}
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
                                <div className="text-sm">{value?.InfoLeak}</div>
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
  );
}
