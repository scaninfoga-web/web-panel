import { UPIType } from '@/types/BeFiSc';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DashboardCard } from '../dashboard/components/DashboardCard';

export default function UpiDetails({ UpiData }: { UpiData: UPIType | null }) {
  if (!UpiData) {
    return <></>;
  }

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
      {Object.entries(UpiData.responseData).map(([upiId, data]) => {
        if (!data.success) {
          return null;
        }

        return (
          <DashboardCard title={`${upiId}`} key={data.data.txn_id}>
            <div>
              {Object.entries(data?.data?.result).map(([key, value], index) => {
                if (key === 'center') {
                  return null;
                }
                if (key === 'address') {
                  return (
                    <div className="flex justify-between" key={index}>
                      <span className="text-sm font-medium text-gray-200">
                        {key}
                      </span>
                      <span className="h-10 whitespace-pre-wrap pl-9 text-xs font-medium text-gray-400">
                        {value}
                      </span>
                    </div>
                  );
                }
                return (
                  <div className="flex justify-between" key={index}>
                    <span className="text-sm font-medium text-gray-200">
                      {key}
                    </span>
                    <span className="text-sm font-medium text-gray-400">
                      {value}
                    </span>
                  </div>
                );
              })}
              {/* <Badge variant="secondary" className="bg-green-600 text-white">
                {data?.platform}
              </Badge> */}
            </div>
          </DashboardCard>
        );
      })}
    </div>
  );
}
