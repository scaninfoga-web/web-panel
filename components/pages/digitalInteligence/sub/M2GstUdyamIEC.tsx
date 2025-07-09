import { formatKey } from '@/components/custom/functions/formatUtils';
import NotFound from '@/components/sub/NotFound';
import React from 'react';

interface PageProps {
  data: {
    gst_list: string[];
    udyam_number: string[];
    iec_number: string[];
  };
}

const M2GstUdyamIEC: React.FC<PageProps> = ({ data }) => {
  return (
    <div className="max-h-[65vh] overflow-auto">
      {data?.gst_list?.length > 0 ||
      data?.udyam_number?.length > 0 ||
      data?.iec_number?.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 p-2">
          <div className="flex flex-col space-y-1">
            <span className="text-2xl font-semibold text-yellow-500">
              GST Numbers: {data?.gst_list?.length}
            </span>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {data?.gst_list?.map((gst) => (
                <div
                  className="flex items-center justify-center rounded-2xl border border-slate-800 py-0.5 text-lg font-semibold"
                  key={gst}
                >
                  {gst}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-2xl font-semibold text-yellow-500">
              Udyam Numbers: {data?.udyam_number?.length}
            </span>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {data?.udyam_number?.map((udyam) => (
                <div
                  className="flex items-center justify-center rounded-2xl border border-slate-800 py-0.5 text-lg font-semibold"
                  key={udyam}
                >
                  {udyam}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-2xl font-semibold text-yellow-500">
              IEC Numbers: {data?.iec_number?.length}
            </span>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {data?.iec_number?.map((iec) => (
                <div
                  className="flex items-center justify-center rounded-2xl border border-slate-800 py-0.5 text-lg font-semibold"
                  key={iec}
                >
                  {iec}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <NotFound value="GST, Udyam, IEC Not Found" />
      )}
    </div>
  );
};

export default M2GstUdyamIEC;
