export interface OlaGeoApiType {
  responseStatus: {
    status: boolean;
    message: string;
  };
  responseData: {
    content_type: 'image/png' | string;
    duration: {
      total_duration_seconds: number;
      readable_duration: string;
      hours: number;
      minutes: number;
      seconds: number;
    };
    distance: {
      distance_meters: number;
      distance_kilometers: number;
      distance_miles: number;
    };
    image: string;
  };
}

export interface userLocation {
  responseStatus: {
    status: boolean;
    message: string;
  };
  responseData: {
    content_type: string;
    image: string;
  };
}
