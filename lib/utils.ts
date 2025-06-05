import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getClientInfo = async () => {
  const position = await new Promise<GeolocationPosition>((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject),
  );
  const latitude = position.coords.latitude.toFixed(6);
  const longitude = position.coords.longitude.toFixed(6);

  const res = await fetch('/api/ip');
  const data = await res.json();
  const ip = data.ip || 'Unknown';

  const userAgent = navigator.userAgent;

  // Basic browser detection using userAgent
  let browser = 'Unknown';
  if (/Chrome/.test(userAgent)) browser = 'Chrome';
  else if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent))
    browser = 'Safari';
  else if (/Firefox/.test(userAgent)) browser = 'Firefox';
  else if (/Edg/.test(userAgent)) browser = 'Edge';

  // Device type approximation
  let device = 'Unknown';
  if (/iPhone/.test(userAgent)) device = 'iPhone';
  else if (/iPad/.test(userAgent)) device = 'iPad';
  else if (/Android/.test(userAgent)) {
    const match = userAgent.match(/\((.*?)\)/);
    device = match ? match[1] : 'Android';
  } else if (/Macintosh/.test(userAgent)) device = 'Mac';
  else if (/Windows/.test(userAgent)) device = 'Windows PC';

  return {
    latitude,
    longitude,
    ip,
    browser,
    device,
  };
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
};
