import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  clickAble,
  dangerKeyWords,
  yellowKeyWords,
} from '../../BeFiSc/BeFiScBreachInfo';
import NotFound from '@/components/sub/NotFound';
import { BreachInfoType } from '@/types/BreachInfo';
import React from 'react';
import { getValue } from '../../BeFiSc/sub/CustomBeFiScCard';
import { cn } from '@/lib/utils';

interface PageProps {
  data: {
    mobile: string;
    data: BreachInfoType | null;
  }[];
}

const M2Breach: React.FC<PageProps> = ({ data }) => {
  return (
    <div className="max-h-[65vh] overflow-auto">
      {data?.length > 0 ? (
        <Accordion type="single" collapsible className="space-y-4">
          {data?.map?.((item, index) => (
            <AccordionItem
              key={`outer-${index}`}
              value={`item-${index}`}
              className="overflow-hidden rounded-lg border border-slate-700/50 bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl"
            >
              <AccordionTrigger className="px-6 py-4 text-left transition-colors hover:bg-slate-800/30 hover:no-underline">
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-medium text-white">
                    {item?.mobile}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col space-y-4 px-6 pb-4 leading-relaxed text-slate-300">
                {item?.data?.responseData?.data?.List &&
                  Object.entries(item?.data?.responseData?.data?.List).map(
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
                                        className="grid grid-cols-2 gap-4 rounded-2xl border border-slate-800 p-3"
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
                                                  'break-all text-base',
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
                                                    value?.includes('http://')
                                                  ) {
                                                    window.open(
                                                      value,
                                                      '_blank',
                                                    );
                                                  }
                                                }}
                                              >
                                                {value?.length > 30
                                                  ? value?.slice(0, 30) + '....'
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
                    },
                  )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <NotFound value="Alternate Number Not Found" />
      )}
    </div>
  );
};

export default M2Breach;
