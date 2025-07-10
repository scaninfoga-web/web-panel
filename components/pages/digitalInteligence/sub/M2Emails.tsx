import NotFound from '@/components/sub/NotFound';
import { IconMailFilled } from '@tabler/icons-react';
import React from 'react';

interface PageProps {
  data: {
    email: string[];
  };
}

const M2Emails: React.FC<PageProps> = ({ data }) => {
  return (
    <div className="max-h-[65vh] overflow-auto">
      {data?.email?.length > 0 ? (
        <div className="flex flex-col space-y-2 p-2">
          <span className="text-lg font-medium text-yellow-500">
            Emails Found: {data?.email?.length}
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {data?.email?.map((email, index) => (
              <div
                className="flex items-center justify-center rounded-2xl border border-slate-800 p-2"
                key={`${email}-${index}`}
              >
                <IconMailFilled className="mr-2 h-5 w-5" />
                <span>{email?.toLowerCase()}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <NotFound value="No Emails Found" />
      )}
    </div>
  );
};

export default M2Emails;
