import { Badge } from '@/components/ui/badge';
import React from 'react';
import { formatSentence } from './APIUtils';

const defaultBadge = [
  'Yes',
  'CONNECTED',
  'DELIVERED',
  'Account Found',
  'MOBILE',
  'prepaid',
  'postpaid',
  'Email Linked',
  'Verified',
];
const dangerBadge = [
  'No',
  'DISCONNECTED',
  'Account Not Found',
  'Email Not Linked',
  'Not Verified',
];
const warningBadge = ['CONNECTED', 'DISCONNECTED'];

export default function CustomBadge({
  variantToUse,
  value,
  isFormat = true,
}: {
  variantToUse?: 'default' | 'danger' | 'warning' | 'outline';
  value: string | boolean | number | null | undefined;
  isFormat?: boolean;
}) {
  if (
    typeof value === 'undefined' ||
    (typeof value === 'string' && value.length < 0)
  ) {
    return (
      <Badge
        className="mt-1 gap-x-0.5 border-neutral-500 bg-neutral-800/40 text-neutral-400 hover:bg-neutral-800/10"
        variant={'outline'}
      >
        No Data
      </Badge>
    );
  }
  if (typeof value === 'string') {
    if (defaultBadge.includes(value)) {
      return (
        <Badge className="mt-1 gap-x-0.5" variant={'default'}>
          {formatSentence(value)}
        </Badge>
      );
    }
    if (dangerBadge.includes(value)) {
      return (
        <Badge className="mt-1 gap-x-0.5" variant={'danger'}>
          {formatSentence(value)}
        </Badge>
      );
    }
    if (warningBadge.includes(value)) {
      return (
        <Badge className="mt-1 gap-x-0.5" variant={'warning'}>
          {formatSentence(value)}
        </Badge>
      );
    }
    if (!isFormat) {
      return (
        <Badge className="mt-1 gap-x-0.5" variant={variantToUse || 'default'}>
          {value}
        </Badge>
      );
    }
    return (
      <Badge className="mt-1 gap-x-0.5" variant={variantToUse || 'default'}>
        {formatSentence(value)}
      </Badge>
    );
  }
  if (typeof value === 'boolean') {
    return (
      <Badge className="mt-1 gap-x-0.5" variant={value ? 'default' : 'danger'}>
        {value ? 'Yes' : 'No'}
      </Badge>
    );
  }

  return <span>{value}</span>;
}
// return (
//   <Badge className="mt-1 gap-x-0.5" variant={'outline'}>
//     No Data
//   </Badge>
// );

//   return (
//     <div>CustomBadge</div>
//   )
