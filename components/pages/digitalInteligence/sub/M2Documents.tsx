import { formatKey } from '@/components/custom/functions/formatUtils';
import NotFound from '@/components/sub/NotFound';
import React from 'react';

interface PageProps {
  data: {
    document_data: {
      [key: string]: string[];
    };
  };
}

const M2Documents: React.FC<PageProps> = ({ data }) => {
  return (
    <div className="max-h-[65vh] overflow-auto">
      {Object.keys(data?.document_data)?.length > 0 ? (
        <div className="grid grid-cols-1 p-2">
          {Object.keys(data?.document_data)?.map((key, index) => (
            <div className="flex flex-col p-2" key={`${key}-${index}`}>
              <span className="text-2xl font-bold text-yellow-500">
                {formatKey(key)}
              </span>
              <div className="grid grid-cols-2 p-2 lg:grid-cols-3">
                {data?.document_data[key]?.map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 p-2"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <NotFound value="No Documents Found" />
      )}
    </div>
  );
};

export default M2Documents;
