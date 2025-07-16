import React from 'react';

interface PageProps {
  label: string;
  value: string | React.JSX.Element | undefined;
  labelClassName?: string;
  valueClassName?: string;
}

export default function InfoText2({
  label,
  value,
  labelClassName,
  valueClassName,
}: PageProps) {
  return (
    <div>
      <p className={`text-sm text-gray-400 ${labelClassName}`}>{label}</p>
      <p className={`text-base font-medium ${valueClassName}`}>{value}</p>
    </div>
  );
}
