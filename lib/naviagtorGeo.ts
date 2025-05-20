'use client';
export async function collectClientInfo() {
  const location = await new Promise<{ lat: number; lon: number }>(
    (resolve) => {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        () => resolve({ lat: 0, lon: 0 }),
      );
    },
  );

  const userAgent = navigator.userAgent;
  const platform = navigator.platform;

  // Get IP address using a public API
  const ipRes = await fetch('https://api.ipify.org?format=json');
  const ipData = await ipRes.json();

  return {
    latitude: location.lat,
    longitude: location.lon,
    browser: userAgent,
    device: platform,
    ip: ipData.ip,
  };
}
