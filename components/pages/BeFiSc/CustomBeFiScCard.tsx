import React from 'react';
import {
  DashboardCard,
  InfoText,
  StatusBadge,
} from '../dashboard/components/DashboardCard';

function formatKey(key: string): string {
  const withSpaces = key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
}

const getValue = (value: string | undefined | null | Array<any> | Boolean) => {
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
    return value && value.trim().length > 0 ? value : 'No Data';
  }
  if (typeof value === 'boolean') {
    return (
      <StatusBadge
        status={String(value)}
        variant={value ? 'outline' : 'destructive'}
      />
    );
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
  if (isValidObjectInsideObjectArrayData(data)) {
    return (
      <DashboardCard
        title={title}
        className="flex max-h-[450px] flex-col gap-y-2 pt-1"
      >
        <div className="scrollbar-custom grid max-h-[400px] grid-cols-1 gap-y-2 overflow-auto pb-4">
          {data.length > 0
            ? data.map((obj, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${data.length > 1 ? 'rounded-lg border border-white/10 p-3' : ''}`}
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
        className="flex max-h-[450px] flex-col gap-y-2 py-10 pt-1"
      >
        <div className="scrollbar-custom grid max-h-[350px] grid-rows-2 gap-6 overflow-auto pb-4">
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
        className="scrollbar-custom flex max-h-[350px] flex-col gap-y-2 overflow-auto pt-1"
      >
        {data.length > 0 ? (
          <div className="flex gap-2">
            {data.map((val, index) => (
              <div
                key={index}
                className="flex flex-col border border-slate-700 p-2"
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
        className="scrollbar-custom flex flex-col gap-y-2 overflow-auto pt-1"
      >
        {data.length > 0 ? (
          <div className="flex gap-2">
            {data.map((val, index) => (
              <div
                key={index}
                className="flex flex-col border border-slate-700 p-2"
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

  // return (
  //   // <DashboardCard
  //   //   title={formatKey(title)}
  //   //   className="flex max-h-[450px] flex-col gap-y-2 py-10 pt-1"
  //   // >
  //   //   <div className="scrollbar-custom grid max-h-[350px] grid-rows-2 gap-6 overflow-auto pb-4">
  //   //     <div className="flex flex-col font-semibold text-white/75">No Data</div>
  //   //   </div>
  //   // </DashboardCard>

  // );

  // if (objectData) {
  // return (
  //   <DashboardCard
  //     title={formatKey(title)}
  //     className="flex max-h-[450px] flex-col gap-y-2 py-10 pt-1"
  //   >
  //     <div className="scrollbar-custom grid max-h-[350px] grid-rows-2 gap-6 overflow-auto pb-4">
  //       <div className="flex flex-col">
  //         {Object.entries(objectData).map(([key, value]) => (
  //           <InfoText
  //             key={key}
  //             label={formatKey(key) || ''}
  //             value={getValue(value)}
  //           />
  //         ))}
  //       </div>
  //     </div>
  //   </DashboardCard>
  // );
  // }

  // if (stringArrayData) {
  //   return (
  //     <DashboardCard title={title} className="flex flex-col gap-y-2 pt-1">
  //       {stringArrayData.length > 0 ? (
  //         <div className="flex gap-2">
  //           {stringArrayData.map((val, index) => (
  //             <div
  //               key={index}
  //               className="flex flex-col border border-slate-700 p-2"
  //             >
  //               {getValue(val)}
  //             </div>
  //           ))}
  //         </div>
  //       ) : (
  //         <div className="text-base text-white/75">No Data</div>
  //       )}
  //     </DashboardCard>
  //   );
  // }

  // if (obectArrayData) {
  //   return (
  //     <DashboardCard title={title} className="flex flex-col gap-y-2 pt-1">
  //       <div className="grid grid-rows-2 gap-6">
  //         {obectArrayData.length > 0 ? (
  //           obectArrayData.map((val, index) => (
  //             <div key={index} className="flex flex-col">
  //               {Object.entries(val).map(([key, value]) => (
  //                 <InfoText
  //                   key={key}
  //                   label={formatKey(key) || ''}
  //                   value={getValue(value)}
  //                 />
  //               ))}
  //             </div>
  //           ))
  //         ) : (
  //           <div className="text-base text-white/75">No Data</div>
  //         )}
  //       </div>
  //     </DashboardCard>
  //   );
  // }

  // if (objectInsideObjectArrayData) {
  //   return (
  //     <DashboardCard
  //       title={title}
  //       className="flex max-h-[450px] flex-col gap-y-2 pt-1"
  //     >
  //       <div className="scrollbar-custom grid max-h-[400px] grid-cols-1 gap-y-2 overflow-auto pb-4">
  //         {objectInsideObjectArrayData.length > 0
  //           ? objectInsideObjectArrayData.map((obj, index) => (
  //               <div
  //                 key={index}
  //                 className={`flex flex-col ${objectInsideObjectArrayData.length > 1 ? 'rounded-lg border border-white/10 p-3' : ''}`}
  //               >
  //                 {Object.entries(obj).map(([key, value]) => {
  //                   if (typeof value === 'object' && value !== null) {
  //                     return (
  //                       <div key={key} className="flex flex-col">
  //                         {/* <span className="text-sm font-medium text-muted-foreground">
  //                         {formatKey(key)}
  //                       </span> */}
  //                         <div className="">
  //                           {Object.entries(value).map(
  //                             ([innerKey, innerValue]) => (
  //                               <InfoText
  //                                 key={innerKey}
  //                                 label={formatKey(innerKey)}
  //                                 value={getValue(innerValue)}
  //                               />
  //                             ),
  //                           )}
  //                         </div>
  //                       </div>
  //                     );
  //                   } else {
  //                     // Simple string value
  //                     return (
  //                       <InfoText
  //                         key={key}
  //                         label={formatKey(key)}
  //                         value={getValue(value)}
  //                       />
  //                     );
  //                   }
  //                 })}
  //               </div>
  //             ))
  //           : 'No Data'}
  //       </div>
  //     </DashboardCard>
  //   );
  // }
}
