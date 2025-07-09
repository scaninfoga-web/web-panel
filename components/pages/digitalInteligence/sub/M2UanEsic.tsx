import { formatKey } from '@/components/custom/functions/formatUtils';
import NotFound from '@/components/sub/NotFound';
import React from 'react';

interface PageProps {
  data: {
    esic_list: string[];
    uan_list: string[];
  };
}

const M2EsicUan: React.FC<PageProps> = ({ data }) => {
  return (
    <div className="max-h-[65vh] overflow-auto">
      {data?.esic_list?.length > 0 || data?.uan_list?.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 p-2">
          <div className="flex flex-col space-y-1">
            <span className="text-2xl font-semibold text-yellow-500">ESIC</span>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {data?.esic_list?.map((esic) => (
                <div
                  className="flex items-center justify-center rounded-2xl border border-slate-800 py-0.5 text-lg font-semibold"
                  key={esic}
                >
                  {esic}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-2xl font-semibold text-yellow-500">UAN</span>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {data?.uan_list?.map((uan) => (
                <div
                  className="flex items-center justify-center rounded-2xl border border-slate-800 py-0.5 text-lg font-semibold"
                  key={uan}
                >
                  {uan}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <NotFound value="UAN, ESIC Not Found" />
      )}
    </div>
  );
};

export default M2EsicUan;
