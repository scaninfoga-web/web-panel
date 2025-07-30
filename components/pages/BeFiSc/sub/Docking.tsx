import { RapidSearchAPIType } from '@/types/rapidAPI';
import React from 'react';
import {
  DashboardCard,
  InfoText,
} from '../../dashboard/components/DashboardCard';
import CustomBadge from './CustomBadge';
import { cn } from '@/lib/utils';

interface DockingProps {
  rapidApiData: {
    value: string;
    type: string;
    data: RapidSearchAPIType | null;
  }[];
}

export default function Docking({ rapidApiData }: DockingProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {rapidApiData?.map((item, index) => {
        if (item?.data?.responseData?.results?.length === 0) {
          return null;
        }
        return (
          <DashboardCard
            key={`${item?.type}${item?.value}${index}`}
            title={`${item?.data?.responseData?.search_term}`}
            icon={
              <CustomBadge
                blink={true}
                variantToUse="warning"
                isFormat={false}
                value={item?.type}
              />
            }
            className="max-h-[400px] overflow-auto"
          >
            <div className="flex flex-col space-y-2">
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                {item?.data?.responseData?.results?.map((result, index) => (
                  <div
                    className="flex flex-col space-y-1 rounded-2xl border border-slate-800 p-4"
                    key={index}
                  >
                    <InfoText
                      value={
                        <a
                          href={result?.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base font-medium text-blue-600 underline hover:cursor-pointer"
                        >
                          {result?.url?.slice(0, 25)}
                        </a>
                      }
                      label="URL"
                    />
                    <InfoText value={result?.title} label="Title" />
                    <div className={cn('break-words text-sm text-gray-400')}>
                      {result?.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DashboardCard>
        );
      })}
    </div>
  );
}
