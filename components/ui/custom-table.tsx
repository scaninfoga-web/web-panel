// import * as React from "react"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"

// interface Column<T> {
//   title: string
//   dataIndex: keyof T
//   key: string
//   render?: (text: any, record: T) => React.ReactNode
// }

// interface CustomTableProps<T> {
//   columns: Column<T>[]
//   dataSource: T[]
//   loading?: boolean
// }

// export function CustomTable<T extends object>({
//   columns,
//   dataSource,
//   loading = false
// }: CustomTableProps<T>) {
//   return (
//     <div className="rounded-md border">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             {columns.map((column) => (
//               <TableHead key={column.key}>{column.title}</TableHead>
//             ))}
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {loading ? (
//             <TableRow>
//               <TableCell colSpan={columns.length} className="text-center">
//                 Loading...
//               </TableCell>
//             </TableRow>
//           ) : dataSource.length === 0 ? (
//             <TableRow>
//               <TableCell colSpan={columns.length} className="text-center">
//                 No data
//               </TableCell>
//             </TableRow>
//           ) : (
//             dataSource.map((record, index) => (
//               <TableRow key={index}>
//                 {columns.map((column) => (
//                   <TableCell key={column.key}>
//                     {column.render
//                       ? column.render(record[column.dataIndex], record)
//                       : String(record[column.dataIndex] || '-')}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))
//           )}
//         </TableBody>
//       </Table>
//     </div>
//   )
// }

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { Loader } from './loader';

interface Column<T> {
  title: string;
  dataIndex: keyof T;
  key?: string;
  width?: string | number;
  render?: (text: any, record: T) => React.ReactNode;
}

interface CustomTableProps<T> {
  columns: Column<T>[];
  dataSource: T[];
  loading?: boolean;
  scroll?: {
    x?: boolean | string | number;
  };
}

export function CustomTable<T extends object>({
  columns,
  dataSource,
  loading = false,
  scroll,
}: CustomTableProps<T>) {
  return (
    <div
      className={`overflow-auto border border-slate-600 ${scroll?.x ? 'overflow-x-auto' : ''}}`}
    >
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead
                className="sticky top-0 whitespace-nowrap bg-emerald-500 text-base font-medium text-black"
                key={`${column.key}-${index}`}
                style={
                  column.width
                    ? { width: column.width, minWidth: column.width }
                    : undefined
                }
              >
                {column.title}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                <Loader className="max-h-20" />
              </TableCell>
            </TableRow>
          ) : dataSource.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No data
              </TableCell>
            </TableRow>
          ) : (
            dataSource.map((record, index) => (
              <TableRow key={index}>
                {columns.map((column, index) => (
                  <TableCell
                    className={cn()}
                    key={`${column.key}-${index}`}
                    style={column.width ? { width: column.width } : undefined}
                  >
                    {column.render
                      ? column.render(record[column.dataIndex], record)
                      : String(record[column.dataIndex] ?? '-')}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
