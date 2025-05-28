import { StatusBadge } from '../../dashboard/components/DashboardCard';

export const formatSentence = (value: string | undefined) => {
  if (!value) return '----';
  return value
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const getValueHigh = (
  value: string | undefined | null | Array<any> | Boolean,
) => {
  if (typeof value === 'string') {
    if (value.length < 0) {
      return 'No Data';
    }
    if (
      value === 'Yes' ||
      value === 'No' ||
      value === 'CONNECTED' ||
      value === 'DISCONNECTED' ||
      value === 'DELIVERED'
    ) {
      return (
        <StatusBadge
          status={value}
          variant={
            value === 'Yes' || value === 'CONNECTED' || value === 'DELIVERED'
              ? 'outline'
              : 'destructive'
          }
        />
      );
    }
    return value;
    // return CapitalizeName(value);
  }
  if (typeof value === 'boolean') {
    return (
      <StatusBadge
        status={String(value)}
        variant={value ? 'outline' : 'destructive'}
      />
    );
  }
  //   return JSON.stringify(value);
};
