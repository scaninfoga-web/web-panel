import Image from 'next/image';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import CustomBadge from './CustomBadge';
import isEqual from 'lodash.isequal';
import {
  formatKey,
  formatSentence,
} from '@/components/custom/functions/formatUtils';
import { getValue } from './CustomBeFiScCard';
import CustomPopUp from './CustomPopUp';
import { Button } from '@/components/ui/button';
import { HoleheType } from '@/types/holhe';
import { DashboardCard } from '../../dashboard/components/DashboardCard';
import { GhuntData } from '@/types/ghunt';
const dangerKeyWords = [
  'top_passwords',
  'malware_path',
  'ip',
  'Phone',
  'Password(SHA1)',
  'Device',
  'Password(bcrypt)',
  'Amount',
];
const yellowKeyWords = [
  'domain',
  'operating_system',
  'date_compromised',
  'antiviruses',
  'State',
  'LeakSite',
  'Latitude',
  'Longitude',
  'LastLogin',
  'Company',
  'Credits',
];
const clickAble = ['Url', 'Site', 'Avatar', 'Password(SHA-256)', 'uri'];

function EmailDetectorComponent({
  ghuntMultipleData,
  holeheData,
}: {
  ghuntMultipleData: GhuntData[];
  holeheData: {
    value: string;
    type: string;
    data: HoleheType | null;
  }[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  const getProfileIcon = (email: string): string => {
    const ghuntData = ghuntMultipleData?.find((data) => data?.email === email);
    if (ghuntData?.profile?.profilePictureUrl) {
      return ghuntData?.profile?.profilePictureUrl;
    }
    return '/null.png';
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {holeheData?.map((item) => {
        if (
          !item?.data?.responseData?.results ||
          item?.data?.responseData?.results?.length === 0
        ) {
          return <></>;
        }
        return (
          <DashboardCard
            icon={
              <Image
                src={getProfileIcon(
                  item?.data?.responseData?.metadata?.email || 'john@gmail.com',
                )}
                width={50}
                height={50}
                alt="icon"
                className="relative -left-2 rounded-full bg-white p-0.5"
              />
            }
            titleBig={false}
            title={`${item?.value}`}
          >
            <div className="flex flex-col space-y-2">
              {item?.data?.responseData?.results?.map((dom, index) => {
                if (index > 10) {
                  return <></>;
                }
                return (
                  <div
                    key={`${dom?.name}-${index}`}
                    className="flex justify-between"
                  >
                    <div className="flex items-center justify-center space-x-1">
                      <Image
                        src={`/emailDetect/${dom?.domain}/${dom?.name}.png`}
                        width={35}
                        height={35}
                        alt="icon"
                        className="my-1 rounded-full border border-slate-800"
                      />
                      <span className="text-lg font-medium">{dom?.name}</span>
                    </div>
                    <span className="text-slate-400">{dom?.domain}</span>
                  </div>
                );
              })}
              {item?.data?.responseData?.results.length > 10 && (
                <CustomPopUp
                  dialogTitle={`${item?.value}`}
                  triggerElement={<Button>View More</Button>}
                  children={
                    <div className="flex flex-col">
                      {item?.data?.responseData?.results?.map((dom, index) => (
                        <div
                          key={`${dom?.name}-${index}`}
                          className="flex items-center justify-between gap-x-10"
                        >
                          <div className="flex items-center justify-center space-x-1">
                            <Image
                              src={`/emailDetect/${dom?.domain}/${dom?.name}.png`}
                              width={35}
                              height={35}
                              alt="icon"
                              className="my-1 rounded-full border border-slate-800"
                            />
                            <span className="text-lg font-medium">
                              {dom?.name}
                            </span>
                          </div>
                          <span className="text-slate-400">{dom?.domain}</span>
                        </div>
                      ))}
                    </div>
                  }
                />
              )}
            </div>
          </DashboardCard>
        );
      })}
    </div>
  );
}

const EmailDetector = React.memo(
  EmailDetectorComponent,
  (prevProps, nextProps) => {
    const isSame = isEqual(prevProps.holeheData, nextProps.holeheData);
    return isSame;
  },
);

export default EmailDetector;
