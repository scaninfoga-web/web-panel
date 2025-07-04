import { MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useEffect, useState } from 'react';
import { post } from '@/lib/api';
import { userLocation } from '@/types/ola-geo-api';
import { Loader } from '@/components/ui/loader';
import Image from 'next/image';

export const LocationOverviewCard = ({
  locationData,
  mapLoading,
}: {
  locationData: userLocation | null;
  mapLoading: boolean;
}) => {
  const info = useSelector((state: RootState) => state.info);

  return (
    <Card className="card-bg border-slate-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-emerald-500">
          <MapPin className="h-5 w-5 text-emerald-500" />
          Location Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">Latitude:</h3>
            <p className="text-gray-300">{info.latitude}</p>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">Longitude:</h3>
            <p className="text-gray-300">{info.longitude}</p>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">Device</h3>
            <p className="text-gray-300">{info.device}</p>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">Browser:</h3>
            <p className="text-gray-300">{info.browser}</p>
          </div>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">IP Address:</h3>
            <p className="text-gray-300">{info.ip}</p>
          </div>
        </div>
        <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-lg border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800">
          {mapLoading ? (
            <Loader />
          ) : locationData ? (
            <Image
              src={`data:${locationData?.responseData?.content_type};base64,${locationData?.responseData?.image}`}
              alt="map"
              width={600}
              height={500}
              // fill
              className="max-h-64 w-full rounded-xl"
              unoptimized={true}
            />
          ) : (
            <div className="text-center text-slate-400">
              <MapPin className="mx-auto mb-2 h-12 w-12 text-emerald-500" />
              <p className="text-lg font-medium">Interactive Map</p>
              <p className="text-sm">
                Map visualization will be displayed here
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
