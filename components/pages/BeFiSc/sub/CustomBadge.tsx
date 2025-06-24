import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
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
const warningBadge = ['CONNECTED', 'DISCONNECTED', 'PENDING', 'pending'];

export default function CustomBadge({
  variantToUse,
  value,
  isFormat = true,
  blink = false,
}: {
  variantToUse?: 'default' | 'danger' | 'warning' | 'outline';
  value: string | boolean | number | null | undefined;
  isFormat?: boolean;
  blink?: boolean;
}) {
  if (
    typeof value === 'undefined' ||
    (typeof value === 'string' && value.length < 0)
  ) {
    return (
      <Badge
        className={cn(
          'mt-1 gap-x-0.5 border-neutral-500 bg-neutral-800/40 text-neutral-400 hover:bg-neutral-800/10',
          blink && 'animate-pulse',
        )}
        variant={'outline'}
      >
        No Data
      </Badge>
    );
  }
  if (typeof value === 'string') {
    if (defaultBadge.includes(value)) {
      return (
        <Badge
          className={cn(
            'mt-1 gap-x-0.5',
            blink && 'animate-pulse duration-1000',
          )}
          variant={'default'}
        >
          {formatSentence(value)}
        </Badge>
      );
    }
    if (dangerBadge.includes(value)) {
      return (
        <Badge
          className={cn(
            'mt-1 gap-x-0.5',
            blink && 'animate-pulse duration-1000',
          )}
          variant={'danger'}
        >
          {formatSentence(value)}
        </Badge>
      );
    }
    if (warningBadge.includes(value)) {
      return (
        <Badge
          className={cn(
            'mt-1 gap-x-0.5',
            blink && 'animate-pulse duration-1000',
          )}
          variant={'warning'}
        >
          {formatSentence(value)}
        </Badge>
      );
    }
    if (!isFormat) {
      return (
        <Badge
          className={cn(
            'mt-1 gap-x-0.5',
            blink && 'animate-pulse duration-1000',
          )}
          variant={variantToUse || 'default'}
        >
          {value}
        </Badge>
      );
    }
    return (
      <Badge
        className={cn('mt-1 gap-x-0.5', blink && 'animate-pulse duration-1000')}
        variant={variantToUse || 'default'}
      >
        {formatSentence(value)}
      </Badge>
    );
  }
  if (typeof value === 'boolean') {
    return (
      <Badge
        className={cn('mt-1 gap-x-0.5', blink && 'animate-pulse duration-1000')}
        variant={value ? 'default' : 'danger'}
      >
        {value ? 'Yes' : 'No'}
      </Badge>
    );
  }

  return <span>{value}</span>;
}
