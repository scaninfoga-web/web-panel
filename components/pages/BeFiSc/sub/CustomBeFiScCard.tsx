import React from 'react';
import {
  DashboardCard,
  InfoText,
  StatusBadge,
} from '../../dashboard/components/DashboardCard';

export function formatKey(key: string): string {
  key = key.replaceAll('_', ' ');
  const withSpaces = key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}

const greenWord = [
  'Yes',
  'CONNECTED',
  'DELIVERED',
  'Filed',
  'postpaid',
  'postpaid',
];
const redWord = ['No', 'DISCONNECTED', 'NA'];
const yellowWord = ['Pending', 'In Progress'];

export const getValue = (
  value: string | undefined | null | Array<any> | Boolean,
) => {
  if (typeof value === 'undefined' || typeof value === null) {
    return '----';
  }
  if (typeof value === 'string') {
    if (value.length < 0) {
      return '----';
    }
    if (greenWord.includes(value)) {
      return (
        <StatusBadge
          status={String(value)}
          variant={value ? 'outline' : 'destructive'}
        />
      );
    }
    if (yellowWord.includes(value)) {
      return <StatusBadge status={value} variant={'outline'} />;
    }
    if (redWord.includes(value)) {
      return <StatusBadge status={value} variant={'destructive'} />;
    }
    if (value.length > 100) {
      return value.slice(0, 100) + '....';
    }
    return value && value.trim().length > 0 ? value : '--';
  }
  if (typeof value === 'boolean') {
    return (
      <StatusBadge
        status={String(value)}
        variant={value ? 'outline' : 'destructive'}
      />
    );
  }
  if (typeof value === 'number') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.join(', ');
  }

  return JSON.stringify(value);
};

function isValidObjectData(
  data: unknown,
): data is Record<string, string | boolean | Array<any>> {
  return (
    typeof data === 'object' &&
    data !== null &&
    !Array.isArray(data) &&
    Object.entries(data).every(
      ([_, value]) =>
        typeof value === 'string' ||
        typeof value === 'boolean' ||
        Array.isArray(value),
    )
  );
}
function isValidObjectInsideObjectArrayData(
  data: unknown,
): data is Array<{ [key: string]: string | boolean | Record<string, string> }> {
  return (
    Array.isArray(data) &&
    data.length > 0 &&
    data.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        !Array.isArray(item) &&
        Object.entries(item).every(
          ([_, value]) =>
            typeof value === 'string' ||
            typeof value === 'boolean' ||
            (typeof value === 'object' &&
              value !== null &&
              !Array.isArray(value) &&
              Object.values(value).every((v) => typeof v === 'string')),
        ),
    )
  );
}

interface PageProps {
  title: string;
  data?: any;
  obectArrayData?: Record<string, string>[] | undefined | null;
  stringArrayData?: string[] | undefined | null;
  objectData?: Record<string, string | boolean | Array<any> | undefined | null>;
  objectInsideObjectArrayData?:
    | Array<{
        [key1: string]: string | boolean | Record<string, string>;
      }>
    | undefined
    | null;
}

export default function CustomBeFiScCard({ title, data }: PageProps) {
  if (Array.isArray(data) && data.length === 0) {
    return <></>;
  }

  if (isValidObjectInsideObjectArrayData(data)) {
    return (
      <DashboardCard
        title={title}
        className="flex max-h-[450px] flex-col gap-y-2 pt-1 hover:scale-[1.015]"
      >
        <div className="scrollbar-custom grid max-h-[400px] grid-cols-1 gap-y-2 overflow-auto pb-4">
          {data.length > 0
            ? data.map((obj, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${data.length > 1 ? 'rounded-lg border-b border-white/10 p-3' : ''}`}
                >
                  {Object.entries(obj).map(([key, value]) => {
                    if (typeof value === 'object' && value !== null) {
                      return (
                        <div key={key} className="flex flex-col">
                          {/* <span className="text-sm font-medium text-muted-foreground">
                          {formatKey(key)}
                        </span> */}
                          <div className="">
                            {Object.entries(value).map(
                              ([innerKey, innerValue]) => (
                                <InfoText
                                  key={innerKey}
                                  label={formatKey(innerKey)}
                                  value={getValue(innerValue)}
                                />
                              ),
                            )}
                          </div>
                        </div>
                      );
                    } else {
                      // Simple string value
                      return (
                        <InfoText
                          key={key}
                          label={formatKey(key)}
                          value={getValue(value)}
                        />
                      );
                    }
                  })}
                </div>
              ))
            : 'No Data'}
        </div>
      </DashboardCard>
    );
  }

  if (isValidObjectData(data)) {
    return (
      <DashboardCard
        title={formatKey(title)}
        className="scrollbar-custom flex max-h-[350px] flex-col gap-y-2 overflow-auto pt-1 hover:scale-[1.015]"
      >
        <div className="scrollbar-custom mb-4 grid max-h-[350px] grid-rows-2 gap-6 pb-4">
          <div className="flex flex-col">
            {Object.entries(data).map(([key, value]) => (
              <InfoText
                key={key}
                label={formatKey(key) || ''}
                value={getValue(value)}
              />
            ))}
          </div>
        </div>
      </DashboardCard>
    );
  }

  if (
    Array.isArray(data) &&
    data.length > 0 &&
    data.every((item) => typeof item === 'string')
  ) {
    return (
      <DashboardCard
        title={title}
        className="scrollbar-custom flex max-h-[350px] flex-col gap-y-2 overflow-auto pb-2 pt-1 hover:scale-[1.015]"
      >
        {data.length > 0 ? (
          <div className="flex gap-2">
            {data.map((val, index) => (
              <div
                key={index}
                className="flex flex-col border-b border-slate-700 p-2"
              >
                {getValue(val)}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-base text-white/75">No Data</div>
        )}
      </DashboardCard>
    );
  }

  if (
    Array.isArray(data) &&
    data.length > 0 &&
    data.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        Object.values(item).every((value) => typeof value === 'string'),
    )
  ) {
    return (
      <DashboardCard
        title={title}
        className="scrollbar-custom flex flex-col gap-y-2 overflow-auto pb-2 pt-1 hover:scale-[1.015]"
      >
        {data.length > 0 ? (
          <div className="flex gap-2">
            {data.map((val, index) => (
              <div
                key={index}
                className="flex flex-col border-b border-slate-700 p-2"
              >
                {getValue(val)}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-base text-white/75">No Data</div>
        )}
      </DashboardCard>
    );
  }

  // return <div>{JSON.stringify(data)}</div>;
}
