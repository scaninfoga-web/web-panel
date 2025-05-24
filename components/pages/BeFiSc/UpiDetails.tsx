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

export default function UpiDetails({ UpiData }: { UpiData: UPIType | null }) {
  if (!UpiData) {
    return <></>;
  }

  return (
    <div className="grid grid-cols-1 gap-2 space-y-4">
      <Card className="border-slate-800 bg-slate-900 text-white">
        <CardHeader>
          <CardTitle>Multiple UPI IDs</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-800">
                  <TableHead className="text-slate-400">UPI ID</TableHead>
                  <TableHead className="text-slate-400">Bank</TableHead>
                  <TableHead className="text-slate-400">Platform</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(UpiData.responseData).map(([upiId, data]) => {
                  if (!data.success) {
                    return null;
                  }

                  return (
                    <TableRow key={upiId} className="border-slate-800">
                      <TableCell className="font-medium">{upiId}</TableCell>
                      <TableCell>
                        {data.success ? (
                          data.data?.result.bank
                        ) : (
                          <span className="text-red-500">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="bg-green-600 text-white"
                        >
                          {data?.platform}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
