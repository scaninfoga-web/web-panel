import NotFound from '@/components/sub/NotFound';
import { IconMailFilled, IconPhoneFilled } from '@tabler/icons-react';
import React from 'react';

interface PageProps {
  mobileNo: string;
  data: {
    alternate_numbers: string[];
  };
}

const M2MobileNumber: React.FC<PageProps> = ({ data, mobileNo }) => {
  const filteredNumbers = data?.alternate_numbers?.filter(
    (number) => number !== mobileNo,
  );
  return (
    <div className="max-h-[65vh] overflow-auto">
      {filteredNumbers?.length > 0 ? (
        <div className="flex flex-col space-y-2 p-2">
          <span className="text-lg font-medium text-yellow-500">
            Numbers Found: {filteredNumbers?.length}
          </span>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {filteredNumbers?.map((phoneNo, index) => (
              <div
                className="flex items-center justify-center rounded-2xl border border-slate-800 p-2"
                key={`${phoneNo}-${index}`}
              >
                <IconPhoneFilled className="mr-2 h-5 w-5" />
                <span>{phoneNo}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <NotFound value="Alternate Number Not Found" />
      )}
    </div>
  );
};

export default M2MobileNumber;
