import { LeakHunterType } from '@/types/LeakHunter';
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import NotFound from '@/components/sub/NotFound';
import CustomBadge from './CustomBadge';
import { IconEye, IconEyeClosed } from '@tabler/icons-react';
interface PageProps {
  emails: {
    value: string;
    type: string;
    data: LeakHunterType | null;
  }[];
}

function LeakHunterComponent({ emails }: PageProps) {
  const [isEyeOpen, setIsEyeOpen] = useState<boolean>(false);
  return (
    <>
      {emails?.length === 0 ? (
        <NotFound value="No Data found" className="max-h-20" />
      ) : (
        emails?.map?.((item, index) => {
          if (!item?.data?.responseData) {
            return null;
          }
          return (
            <Accordion type="single" collapsible className="space-y-4">
              <div className="flex w-full justify-center">
                {isEyeOpen ? (
                  <IconEyeClosed
                    onClick={() => setIsEyeOpen(false)}
                    className="h-5 w-5 cursor-pointer select-none text-white"
                  />
                ) : (
                  <IconEye
                    onClick={() => setIsEyeOpen(true)}
                    className="h-5 w-5 cursor-pointer select-none text-white"
                  />
                )}
              </div>
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
                    <span className="animate-pulse text-lg font-medium text-red-500">
                      Leaks :{item?.data?.responseData?.password?.length || 0}
                    </span>
                    <CustomBadge
                      blink={true}
                      variantToUse="warning"
                      isFormat={false}
                      value={item?.type}
                    />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="grid grid-cols-3 gap-4 p-6 leading-relaxed text-slate-300">
                  {item?.data?.responseData?.password &&
                    item?.data?.responseData?.password?.length > 0 &&
                    item?.data?.responseData?.password?.map((data, index) => {
                      return (
                        <div
                          key={index}
                          className="group border border-slate-800 p-4"
                        >
                          <div className="flex justify-between">
                            <span
                              className={cn(
                                'text-base text-red-500 transition duration-300 group-hover:blur-none',
                                isEyeOpen ? '' : 'blur-sm',
                              )}
                            >
                              {data}
                            </span>
                          </div>
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
const LeakHunter = React.memo(LeakHunterComponent, (prevProps, nextProps) => {
  return prevProps?.emails?.length === nextProps?.emails?.length;
});

export default LeakHunter;
