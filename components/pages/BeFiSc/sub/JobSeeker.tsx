import { cn } from '@/lib/utils';
import { JobSeekerType } from '@/types/LeakHunter';
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
import { formatKey } from '@/components/custom/functions/formatUtils';

interface PageProps {
  jobSeekerData: {
    value: string;
    type: string;
    data: JobSeekerType | null;
  }[];
}

function JobSeekerComponent({ jobSeekerData }: PageProps) {
  return (
    <>
      {jobSeekerData?.length === 0 ? (
        <NotFound value="No Data found" className="max-h-20" />
      ) : (
        <Accordion type="single" collapsible className="space-y-4">
          {jobSeekerData?.map?.((item, index) => (
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
          ))}
        </Accordion>
      )}
    </>
  );
}
const JobSeeker = React.memo(JobSeekerComponent, (prevProps, nextProps) => {
  return prevProps?.jobSeekerData?.length === nextProps?.jobSeekerData?.length;
});

export default JobSeeker;
